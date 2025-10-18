import { z } from "zod";

export const createRoommateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  age: z
    .number({ message: "Age must be a number" })
    .int()
    .min(15, "Minimum age is 18")
    .max(100, "Maximum age is 100"),
  gender: z.enum(["male", "female", "other"]),
  occupation: z.string().min(2, "Occupation is required"),
  city: z.string().min(2, "City is required"),
  budget: z
    .number({ message: "Budget must be a number" }),
  description: z.string().optional(),
  preferences: z.array(z.string()).optional(),
});

export const updateRoommateSchema = createRoommateSchema.partial();
