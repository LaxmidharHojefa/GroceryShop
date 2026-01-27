const { z, email } = require("zod");

const signupSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .trim()
        .min(3, { message: "Name must be of 3 character" })
        .max(255, { message: "Name must be less than 255 character" }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Name must be of 3 character" })
        .max(255, { message: "Name must be less than 255 character" }),
    phone: z
        .string({ required_error: "Phone number is required" })
        .trim()
        .min(10, { message: "Name must be of 10 character" })
        .max(10, { message: "Name must be of 10 character"}),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(7, { message: "Name must be of 3 character" })
        .max(53, { message: "Name must be less than 255 character"})
})

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(7, { message: "Password must be at least 7 characters" })
        .max(53, { message: "Password must be less than 53 characters" })
})

module.exports = { signupSchema, loginSchema };
