import { z } from "zod";

export const patientSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .regex(/^[A-Za-z\u0600-\u06FF\s]+$/, "Name must contain only letters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[A-Za-z\u0600-\u06FF\s]+$/, "Name must contain only letters"),

  email: z.string().email("Invalid email").optional().or(z.literal("")),

  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian mobile number"),

  reasonForVisit: z
    .string()
    .min(5, "Reason must be at least 5 characters")
    .regex(
      /^[A-Za-z\u0600-\u06FF\s]+$/,
      "Reason must contain letters only (no numbers or symbols)"
    ),
});
