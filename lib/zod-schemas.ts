import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 chars long")
    .max(24, "Password must be at most 24 chars long"),
});

export const registerSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 chars long")
    .max(24, "Password must be at most 24 chars long"),
  name: z.string().max(36, "Name must be at most 36 chars long").optional(),
});
