import * as z from "zod";

export const liputanKegiatanSchema = z.object({
  nama: z.string().min(1, "Nama harus diisi"),
  unit: z.string().min(1, "Unit/Prodi/Ormawa harus dipilih"),
  nomorwa: z
    .string()
    .min(10, "Nomor WA minimal 10 digit")
    .max(14, "Nomor WA maksimal 14 digit")
    .regex(/^08\d{8,11}$/, "Nomor WA tidak valid (harus diawali 08)"),
  acara: z.string().min(1, "Nama acara harus diisi"),
  deskripsi: z
    .string()
    .min(1, "Deskripsi wajib diisi")
    .refine(
      (val) => val.trim().split(/\s+/).length <= 40,
      "Deskripsi maksimal 40 kata"
    ),
   tanggal_mulai: z
    .string()
    .min(1, "Tanggal mulai harus diisi")
    .transform((val) => val.slice(0, 10)),
  tanggal_selesai: z
    .string()
    .min(1, "Tanggal selesai harus diisi")
    .transform((val) => val.slice(0, 10)),
  waktu_mulai: z.string().min(1, "Waktu mulai harus diisi"),
  waktu_selesai: z.string().min(1, "Waktu selesai harus diisi"),
  tempat: z.string().min(1, "Tempat harus diisi"),
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
