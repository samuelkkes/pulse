import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    code: z.optional(z.string().min(6))
})