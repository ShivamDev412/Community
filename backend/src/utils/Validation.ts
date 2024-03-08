import { z } from "zod";
import moment from "moment";
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
export const NewGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  about: z.string().min(1, "About is required"),
  group_type: z.string().min(1, "Group Type is required"),
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
export const EditProfileSchema = z.object({
  image: z.string().optional(),
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name should only contain letters"),

  address: z.string().optional(),
  bio: z.string().optional(),
});
export const PersonalInfoSchema = z.object({
  birthday: z.string().refine((value) => {
    if (!value) return true
    const birthDate = moment(value);
    const age = moment().diff(birthDate, 'years');
    return age >= 18 && age <= 60;
  }, {
    message: "You must be at least 18 years old and at most 60 years old.",
  }).optional(),
  gender:z.string().optional(),
  lookingFor: z.array(z.string()).optional(),
  lifeStages: z.array(z.string()).optional()
});
export { LoginSchema, SignupSchema };
