import { z, ZodType } from "zod"; 


  export const UserSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(1, "Password is required")
  });

  export type IFormData = z.infer<typeof UserSchema>;