import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .refine((email) => !!email, { message: "Email is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

const SignupSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name must contain only letters and spaces",
    })
    .refine((name) => !!name, { message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .refine((email) => !!email, { message: "Email is required" }),
  password: z
    .string()
    .min(6)
    .refine(
      (password) => {
        return (
          /[A-Z]/.test(password) &&
          /[a-z]/.test(password) &&
          /[^a-zA-Z0-9\s]/.test(password)
        );
      },
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
      }
    ),
});

export { LoginSchema, SignupSchema };
