import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong" })
    .email({ message: "Format email tidak valid" }),
  password: z
    .string()
    .min(1, { message: "Password tidak boleh kosong" })
    .min(8, { message: "Password minimal 8 karakter" }),
});

export const registerSchema = z.object({
  nama: z
    .string()
    .min(1, { message: "Nama tidak boleh kosong" })
    .regex(/^[a-zA-Z\s]*$/, { message: "Nama hanya boleh berisi huruf dan spasi" }),
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong" })
    .email({ message: "Format email tidak valid" }),
  password: z
    .string()
    .min(1, { message: "Password tidak boleh kosong" })
    .min(8, { message: "Password minimal 8 karakter" }),
});
