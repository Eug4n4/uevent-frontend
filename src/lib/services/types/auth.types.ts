import z from "zod";
import type { AccountAttributes } from "./account.types";
import type { ProfileAttributes } from "./profile.types";


export const LoginAttributes = z.object({
  email: z.email("Email is invalid").trim().min(1),
  password: z.string().trim().min(6, "Password must be at least of length 6")
})

const LoginData = z.object({
  type: z.literal("account"),
  attributes: LoginAttributes
}) 

export const RegisterAttributes = LoginAttributes.extend({
  username: z.string().min(3, { message: "Username must be at least of length 3" })
})

const RegisterData = z.object({
  type: z.literal("account"),
  attributes: RegisterAttributes
})

const RegisterSchema = z.object({
  data: RegisterData
})

const LoginSchema = z.object({
  data: LoginData
}) 

export type LoginDto = z.infer<typeof LoginSchema>
export type LoginDetails = z.infer<typeof LoginAttributes>

export type RegisterDto = z.infer<typeof RegisterSchema>
export type RegisterDetails = z.infer<typeof RegisterAttributes>
export type AuthDetails = LoginDetails & Partial<RegisterDetails>
export type AuthResponse = AccountAttributes & ProfileAttributes & { id: string };
