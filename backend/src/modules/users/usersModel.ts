import { z } from "zod";

// Schema for creating a user
export const CreateUserSchema = z.object({
  body: z.object({
    title: z.string().max(10),
    fname: z.string().max(50),
    lname: z.string().max(50),
    phone: z.string().min(10).max(15),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

// Schema for updating a user
export const UpdateUserSchema = z.object({
  body: z.object({
    user_Id: z.string().uuid(),
    title: z.string().max(10).optional(),
    fname: z.string().max(50).optional(),
    lname: z.string().max(50).optional(),
    phone: z.string().min(10).max(15).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
  }),
});

// Schema for getting a user by ID
export const GetUserSchema = z.object({
  params: z.object({
    user_Id: z.string().uuid(),
  }),
});
