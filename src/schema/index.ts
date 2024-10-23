import {z} from "zod";

const upperCaseRegex = /(?=.*[A-Z])\w+/;
const numberRegex = /\d/;
const specialCharacterRegex = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).email({
        message: "Email is invalid",
    }),
    password: z.string({
        required_error: "Password is required",
    }).min(8, {
        message: "Password should be at least 8 characters",
    })
})

export const newPasswordSchema = z.object({
    password: z.string({
        required_error: "Password is required",
    }).min(8, {
        message: "Password should be at least 8 characters",
    }).refine(
        (value) => upperCaseRegex.test(value),
        'Password must contain at least an uppercase.'
    ).refine(
        (value) => numberRegex.test(value),
        'Password must contain at least a number.'
    ).refine(
        (value) => specialCharacterRegex.test(value),
        'Password must contain atleast a special character.'
    )
})