import * as z from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Min 8 characters")
  .regex(/[A-Z]/, "Include an uppercase letter")
  .regex(/[a-z]/, "Include a lowercase letter")
  .regex(/[0-9]/, "Include a number");

export const profileSchema = z.object({
  fullName: z.string().min(2, "Name too short").max(50),
});
