import * as z from "zod";

export const kemitraanSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  perusahaan: z.string().min(1, "Perusahaan/Instansi wajib diisi"),
  posisi: z.string().min(1, "Posisi wajib diisi"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  nomorwa: z
    .string()
    .min(10, "Nomor WA minimal 10 digit")
    .max(14, "Nomor WA maksimal 14 digit")
    .regex(/^08\d{8,11}$/, "Nomor WA tidak valid (harus diawali 08)"),
  jeniskemitraan: z.string().min(1, "Posisi wajib diisi"),
  deskripsi: z
    .string()
    .min(1, "Deskripsi wajib diisi")
    .refine(
      (val) => val.trim().split(/\s+/).length <= 40,
      "Deskripsi maksimal 40 kata"
    ),
  lampiran: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, "Lampiran tidak valid")
    .refine((file) => !file || file.size <= 500 * 1024, "Ukuran maksimal 500KB")
    .refine(
      (file) =>
        !file ||
        [
          "image/jpeg",
          "image/png",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "Lampiran hanya boleh JPG, PNG, PDF, atau Word"
    ),
});
