import { Request, Response } from "express";
import Listing from "../models/Listing";
import {
  createListingSchema,
  updateListingSchema,
} from "../validation/listing.validation";
import uploadFileToCloudinary from "../utils/fileUpload";
import mongoose from "mongoose";
import { deleteFromCloudinary } from "../utils/deleteFile";
import User from "../models/User";

//Create Listing (Owner only)
export const createListing = async (req: Request, res: Response) => {
  try {
    // Parse and validate input using Zod
    const parsedData = createListingSchema.safeParse({
      ...req.body,
      price: Number(req.body.price), // ensure numeric
      furnished: req.body.furnished === "true" || req.body.furnished === true,
    });

    if (!parsedData.success) {
      const errorDetails = parsedData.error.flatten();
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

    const imageUploadPromises = imageFiles.map((file:any) =>
     uploadFileToCloudinary(file.tempFilePath,"images")
    );

    const uploadedImages = await Promise.all(imageUploadPromises);
    const imageUrls = uploadedImages.map((file) => file.secure_url);
    // Create listing
    const ownerId = (req as any).user._id;
    const listing = await Listing.create({
      ...parsedData.data,
      images: imageUrls,
      owner: ownerId,
    });

    await User.findByIdAndUpdate(
      ownerId,
      { $push: { listings: listing._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      listing,
    });
  } catch (error) {
    console.log("Failed to create listing ", error);
    return res.status(500).json({
      success: false,
      message: "Sever error",
    });
  }
};

// GET /api/listings?page=1&limit=10&city=Delhi&type=apartment&search=cozy
export const getAllListings = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "10",
      city,
      type,
      furnished,
      search,
    } = req.query as Record<string, string>;

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    // Build MongoDB filter dynamically
    const filter: any = {};

    if (city) filter.city = { $regex: new RegExp(city, "i") };
    if (type) filter.type = type;
    if (furnished !== undefined) filter.furnished = furnished === "true";
    if (search)
      filter.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
      ];

    // Fetch listings
    const listings = await Listing.find(filter)
      .populate("owner", "firstname lastname phone image email") // optional: show owner info
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Listing.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNum);

    return res.status(200).json({
      message: "Listings fetched successfully",
      pagination: {
        total,
        totalPages,
        currentPage: pageNum,
        limit: limitNum,
      },
      listings,
    });
  } catch (error: any) {
    console.error("Error fetching listings:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getListingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    // Fetch listing and populate owner details (optional)
    const listing = await Listing.findById(id).populate(
      "owner",
      "firstname lastname phone email image"
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({
      success: true,
      message: "Listing fetched successfully",
      listing,
    });
  } catch (error: any) {
    console.error("Error fetching listing:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    // Find existing listing
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check ownership
    const userId = (req as any).user._id.toString();
    if (listing.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this listing" });
    }

    // Parse and validate request body using Zod
    const parsedData = updateListingSchema.safeParse({
      ...req.body,
      price: req.body.price ? Number(req.body.price) : undefined,
      furnished:
        req.body.furnished !== undefined
          ? req.body.furnished === "true" || req.body.furnished === true
          : undefined,
    });

    if (!parsedData.success) {
      const errorDetails = parsedData.error.flatten();

      return res.status(400).json({
        success: false,
        // Provide a general, high-level error message
        message: "Validation failed. Please check the error details.",

        // Include the structured error details for the client
        details: errorDetails,
      });
    }

    const updates = parsedData.data;

    // Update the listing
    const updatedListing = await Listing.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Listing updated successfully",
      listing: updatedListing,
    });
  } catch (error: any) {
    console.error("Error updating listing:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid listing ID" });
    }

    // Find listing
    const listing = await Listing.findById(id);
    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    // Ownership check
    const userId = (req as any).user._id.toString();
    if (listing.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this listing",
      });
    }

    // Delete images from Cloudinary
    if (listing.images && listing.images.length > 0) {
      for (const url of listing.images) {
        await deleteFromCloudinary(url);
      }
    }

    // Delete listing from DB
    await listing.deleteOne();

    await User.findByIdAndUpdate(
      userId,
      { $pull: { listings: listing._id } },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Listing deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ successS: false, message: "Server error" });
  }
};
