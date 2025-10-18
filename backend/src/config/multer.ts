import multer from 'multer';
import { Request } from 'express';

// Define the storage configuration
const storage = multer.diskStorage({
  // Specify the destination folder for uploaded files
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/'); 
  },
  
  // Define how the file should be named
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    // Generate a unique filename: timestamp-originalFilename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Create the Multer instance with the storage configuration
export const upload = multer({ 
  storage: storage,
  // Optional: Add file size limits (e.g., 5MB)
  limits: { 
    fileSize: 1024 * 1024 * 5 
  }
});