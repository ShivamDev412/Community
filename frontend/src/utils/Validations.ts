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

export const NewEventSchema = z
  .object({
    name: z.string().min(1, { message: "Event Name is required" }),
    image: z.any().refine(
      (value) => {
        return value !== null;
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
