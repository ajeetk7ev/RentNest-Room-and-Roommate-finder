import { z } from "zod";

export const createListingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  city: z.string().min(2, "City name must be valid"),
  address: z.string().min(5, "Address must be valid"),
  price: z.number().positive("Price must be a positive number"),
  type: z.enum(["apartment", "room", "villa", "flat", "pg"]),
  furnished: z.boolean(),
});

export const updateListingSchema = createListingSchema.partial(); 

export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
