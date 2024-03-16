import { z } from "zod";
import moment from "moment";

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
    image: z.any().refine(
      (value) => {
        if (value instanceof FileList) {
          return value.length > 0; 
        }
          value !== null && value !== undefined;
      },
      {
        message: "Profile Image is required",
      }
    ),
});
export const NewGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  groupType: z.string().min(1, "Group Type is required"),
  image: z.any().refine(
    (value) => {
      if (value instanceof FileList) {
        return value.length > 0; 
      }
        value !== null && value !== undefined;
    },
    {
      message: "Group Image is required",
    }
  ),
  location: z.string().min(1, "Group Location is required"),
});

export const NewEventSchema = z
  .object({
    name: z.string().min(1, { message: "Event Name is required" }),
    image: z.any().refine(
      (value) => {
        if (value instanceof FileList) {
          return value.length > 0; 
        }
          value !== null && value !== undefined;
      },
      {
        message: "Event Image is required",
      }
    ),
    type: z.string().min(1, { message: "Event Type is required" }),
    details: z.string().min(1, { message: "Event Details are required" }),
    group: z.string().min(1, { message: "Group is required" }),
    tags: z.array(z.string()).refine(
      (value) => {
        return value.length !== 0;
      },
      {
        message: "At least one tag is required",
      }
    ),
    date: z.string().min(1, { message: "Event Date is required" }),
    time: z.string().min(1, { message: "Event Time is required" }),
    address: z
      .string()
      .min(1, { message: "Event Address is required" })
      .optional(),
    link: z.string().min(1, { message: "Event Link is required" }).optional(),
  })
  .superRefine(({ type, address, link }, refinementContext) => {
    if (type === "in-person" && (!address || address.length < 1)) {
      refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address"],
      });
    } else if (type === "online" && (!link || link.length < 1)) {
      refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["link"],
      });
    }
  });
export const EditProfileSchema = z.object({
  image: z.any().refine(
    (value) => {
      if (value instanceof FileList) {
        return value.length > 0; 
      }
        value !== null && value !== undefined;
    },
    {
      message: "Profile Image is required",
    }
  ),
  firstName: z
    .string()
    .min(1, "First Name is required")
    .regex(/^[a-zA-Z]+$/, "Name should only contain letters"),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .regex(/^[a-zA-Z]+$/, "Name should only contain letters"),
  address: z.any().optional(),
  bio: z.string().optional(),
});

export const PersonalInfoSchema = z.object({
  birthday: z
    .string()
    .refine(
      (value) => {
        // if (!value) return true;
        const birthDate = moment(value, "YYYY-MM-DD", true);
        if (!birthDate.isValid()) return false;
        const age = moment().diff(birthDate, "years");
        return age >= 18 && age <= 60;
      },
      {
        message: "You must be at least 18 years old and at most 60 years old.",
      }
    )
    .optional(),
  gender: z.string().optional(),
  lookingFor: z.array(z.string()).optional(),
  lifeStages: z.array(z.string()).optional(),
});
export const AccountManagementSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current Password is required"),
    newPassword: z
      .string()
      .min(1, "New Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character"
      ),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .superRefine(({ confirmPassword, newPassword, currentPassword }, ctx) => {
    if(currentPassword === newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Your old password and new password should not be same",
        path: ["newPassword"],
      });
    }
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New Password and Confirm Password do not match",
        path: ["confirmPassword"],
      });
    }
  });
