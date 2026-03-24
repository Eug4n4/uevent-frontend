import z from "zod";


const LoginAttributes = z.object({
  email: z.email(),
  password: z.string()
})

const LoginData = z.object({
  type: z.literal("account"),
  attributes: LoginAttributes
}) 

const RegisterAttributes = LoginAttributes.extend({
  username: z.string()
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
