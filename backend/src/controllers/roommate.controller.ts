import { Request, Response } from "express";
import Roommate from "../models/Roommate";
import {
  createRoommateSchema,
  updateRoommateSchema,
} from "../validation/roommate.validation";
import mongoose from "mongoose";
import uploadFileToCloudinary from "../utils/fileUpload";
import User from "../models/User";

// ✅ Create Roommate
export const createRoommate = async (req: Request, res: Response) => {
  try {
    const parsed = createRoommateSchema.safeParse({
      ...req.body,
      age: Number(req.body.age),
      budget: Number(req.body.budget),
      preferences: req.body.preferences ? JSON.parse(req.body.preferences) : [],
    });

    if (!parsed.success) {
      const errorDetails = parsed.error.flatten();
      return res.status(400).json({
        success: false,
        message: "Validation failed. Please check the error details.",
        details: errorDetails,
      });
    }

    // Handle images (single or multiple)
    const imageFiles = Array.isArray((req as any).files.images)
      ? (req as any).files.images
      : [(req as any).files.images];

    const imageUploadPromises = imageFiles.map((file: any) =>
      uploadFileToCloudinary(file.tempFilePath, "images")
    );

    const uploadedImages = await Promise.all(imageUploadPromises);
    const imageUrls = uploadedImages.map((file) => file.secure_url);

    const roommate = await Roommate.create({
      ...parsed.data,
      user: (req as any).user._id,
      images: imageUrls,
    });

    await User.findByIdAndUpdate(
      (req as any).user._id,
      { $push: { roommates: roommate._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Roommate Listing created successfully",
      roommate,
    });
  } catch (error: any) {
    console.log("Failed to create roommate listing ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get All Roommates (with pagination)
export const getAllRoommates = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      city,
      gender,
      occupation,
      minBudget,
      maxBudget,
      minAge,
      maxAge,
    } = req.query;

    const filters: any = {};

    // ✅ City filter (case-insensitive)
    if (city) filters.city = { $regex: new RegExp(city as string, "i") };

    // ✅ Gender filter
    if (gender) filters.gender = gender;

    // ✅ Occupation filter (case-insensitive)
    if (occupation)
      filters.occupation = { $regex: new RegExp(occupation as string, "i") };

    // ✅ Budget filter (range-based)
    if (minBudget || maxBudget) {
      filters.budget = {};
      if (minBudget) filters.budget.$gte = Number(minBudget);
      if (maxBudget) filters.budget.$lte = Number(maxBudget);
    }

    // ✅ Age filter (range-based)
    if (minAge || maxAge) {
      filters.age = {};
      if (minAge) filters.age.$gte = Number(minAge);
      if (maxAge) filters.age.$lte = Number(maxAge);
    }

    // ✅ Pagination + sorting
    const roommates = await Roommate.find(filters)
      .populate("user", "firstname lastname phone image email")
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .sort({ createdAt: -1 });

    const total = await Roommate.countDocuments(filters);

    return res.status(200).json({
      succsess: true,
      message: "Roommate listings fetched successfully",
      total,
      page: +page,
      totalPages: Math.ceil(total / +limit),
      roommates,
    });
  } catch (error: any) {
    console.error("Error fetching roommates:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get Roommate by ID
export const getRoommateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid roommate ID" });

    const roommate = await Roommate.findById(id).populate(
      "user",
      "firstname lastname phone email image"
    );
    if (!roommate)
      return res.status(404).json({ message: "Roommate not found" });

    return res.status(200).json({
      success: true,
      message: "Roommate listing fetched successfully",
      roommate,
    });
  } catch (error: any) {
    console.error("Error fetching roommate listing:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Update Roommate
export const updateRoommate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid roommate ID" });

    const roommate = await Roommate.findById(id);
    if (!roommate)
      return res.status(404).json({ message: "Roommate not found" });

    const userId = (req as any).user._id.toString();
    if (roommate.user.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    const parsed = updateRoommateSchema.safeParse({
      ...req.body,
      age: req.body.age ? Number(req.body.age) : undefined,
      budget: req.body.budget ? Number(req.body.budget) : undefined,
      preferences: req.body.preferences
        ? JSON.parse(req.body.preferences)
        : undefined,
    });

    if (!parsed.success) {
      const errorDetails = parsed.error.flatten();

      return res.status(400).json({
        success: false,
        // Provide a general, high-level error message
        message: "Validation failed. Please check the error details.",

        // Include the structured error details for the client
        details: errorDetails,
      });
    }

    const updated = await Roommate.findByIdAndUpdate(
      id,
      { ...parsed.data },
      { new: true, runValidators: true }
    );

    return res
      .status(200)
      .json({
        success: true,
        message: "Roommate updated successfully",
        roommate: updated,
      });
  } catch (error: any) {
    console.error("Error updating roommate listing:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Delete Roommate
export const deleteRoommate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid roommate ID" });

    const roommate = await Roommate.findById(id);
    if (!roommate)
      return res.status(404).json({ message: "Roommate not found" });

    const userId = (req as any).user._id.toString();
    if (roommate.user.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    await roommate.deleteOne();
    return res.status(200).json({success:true, message: "Roommate listing deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting listing:", error);
    return res.status(500).json({success:false, message: "Server error" });
  }
};
