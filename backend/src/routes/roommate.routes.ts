import express from "express";
import { protect } from "../middlewares/auth.middleware";
import {
  createRoommate,
  getAllRoommates,
  getRoommateById,
  updateRoommate,
  deleteRoommate,
} from "../controllers/roommate.controller";

const router = express.Router();

// ✅ Create new roommate listing (auth required)
router.post("/", protect, createRoommate);

// ✅ Get all roommates (with filters & pagination)
router.get("/", getAllRoommates);

// ✅ Get roommate by ID
router.get("/:id", getRoommateById);

// ✅ Update roommate (auth required)
router.put("/:id", protect, updateRoommate);

// ✅ Delete roommate (auth required)
router.delete("/:id", protect, deleteRoommate);

export default router;
