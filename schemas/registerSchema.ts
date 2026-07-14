import { z } from 'zod';

export const RegisterSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  phoneNumber: z.string().regex(/^\d{10,15}$/, 'Phone number must be between 10 and 15 digits.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export type IRegisterFormData = z.infer<typeof RegisterSchema>;