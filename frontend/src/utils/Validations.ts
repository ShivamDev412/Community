import { z, ZodIssueCode } from "zod";
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
export const ForgotPassword = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});
export const ResetPasswordSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    newPassword: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character"
      ),
    confirmPassword: z.string(),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New Password and Confirm Password do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const NewGroupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  groupType: z.string().min(1, "Group Type is required"),
  image: z.any().refine(
    (value) => {
      if (typeof value === "string" || value instanceof FileList) {
        return true;
      }
      return false;
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
        if (typeof value === "string" || value instanceof FileList) {
          return true;
        }
        return false;
      },
      {
        message: "Group Image is required",
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
    event_end_time: z.string().min(1, { message: "Event End Time is required" }),
    address: z.string().optional(),
    link: z.string().optional(),

  })
  .superRefine(
    ({ type, address, link, time, event_end_time }, refinementContext) => {
      if (type === "in-person") {
        if (!address || address.length < 1) {
          refinementContext.addIssue({
            code: ZodIssueCode.custom,
            message: "Address is required for in-person events",
            path: ["address"],
          });
        }
      } 
      else if (type === "online") {
        if (!link || link.length < 1) {
          refinementContext.addIssue({
            code: ZodIssueCode.custom,
            message: "Link is required for online events",
            path: ["link"],
          });
        }
      }
      const startTime = new Date(`01/01/2000 ${time}`);
      const endTime = new Date(`01/01/2000 ${event_end_time}`);
      const timeDifferenceInMinutes =
        (endTime.getTime() - startTime.getTime()) / (1000 * 60);
      if (endTime <= startTime || timeDifferenceInMinutes < 30) {
        refinementContext.addIssue({
          code: ZodIssueCode.custom,
          message: "Event should be at least of 30 minutes.",
          path: ["event_end_time"],
        });
      }
    }
  );

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
    if (currentPassword === newPassword) {
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
