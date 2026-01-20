import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "user"], {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
  status: z.enum(["active", "suspended", "pending"]),
});

export const userSchema2 = z.object({
  id: z.string(),
  profile: z.object({
    nickname: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email"),
    avatar: z.string().url().optional(),
    age: z.number().min(18),
    gender: z.enum(["Male", "Female", "Other"]),
    totalCompletion: z.number().min(0).max(100),
  }),
  role: z.enum(["USER", "ADMIN"]),
  account: z.object({
    createdAt: z.string(),
    status: z.enum(["Active", "Inactive"]),
    isPremium: z.boolean(),
    authMethod: z.enum(["Email", "Phone", "Google", "Apple"]),
    banDetails: z.object({
      isBanned: z.boolean(),
      reason: z.string().optional(),
    }),
  }),
});
