import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
export const SignupSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .regex(/^[a-zA-Z]+$/, "Name should only contain letters"),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .regex(/^[a-zA-Z]+$/, "Name should only contain letters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character"
    ),
});
export const NewGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  groupType: z.string().min(1, "Group Type is required"),
  image: z.any().refine(
    (value) => {
      return value !== null;
    },
    {
      message: "Group Image is required",
    }
  ),
  location: z.string().min(1, "Group Location is required"),
});
