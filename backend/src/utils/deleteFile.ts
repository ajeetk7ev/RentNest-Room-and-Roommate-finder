import cloudinary from "../config/cloudinary";
// Delete image by URL
export const deleteFromCloudinary = async (url: string) => {
  try {
    // Extract public_id from URL
    const parts = url.split("/");
    const fileNameWithExt = parts[parts.length - 1];
    const publicId = `rentnest_listings/${fileNameWithExt.split(".")[0]}`;

    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    // continue deletion even if image fails
  }
};