import { z } from "zod";

// For Signup
export const userSignupSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(7, { message: "Password must be at least 7 characters long." }),
  contact: z
    .string()
    .min(10, { message: "Please enter a valid mobile number." })
    .regex(/^\d+$/, { message: "Contact must contain only digits." }),
});

export type SignupInputState = z.infer<typeof userSignupSchema>;

// For Login
export const userLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(7, { message: "Password must be at least 7 characters long." }),
});

export type LoginInputState = z.infer<typeof userLoginSchema>;
