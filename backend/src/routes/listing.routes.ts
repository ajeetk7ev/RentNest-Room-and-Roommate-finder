import Router from 'express';
import { createListing, deleteListing, getAllListings, getListingById, updateListing } from '../controllers/listing.controller';
import { protect } from '../middlewares/auth.middleware';
const router = Router();


// Create a new listing (authenticated + file upload)
router.post("/", protect, createListing);

// Get all listings (public, with pagination & filters)
router.get("/", getAllListings);

// Get single listing by ID (public)
router.get("/:id", getListingById);

// Update listing (authenticated + optional file upload)
router.put("/:id", protect, updateListing);

// Delete listing (authenticated + ownership check)
router.delete("/:id", protect, deleteListing);

export default router;