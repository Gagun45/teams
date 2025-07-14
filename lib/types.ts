import type z from "zod";
import type { loginSchema, newTeamSchema, registerSchema } from "./zod-schemas";

export type RegisterFormType = z.infer<typeof registerSchema>;
export type LoginFormType = z.infer<typeof loginSchema>;
export type NewTeamType = z.infer<typeof newTeamSchema>