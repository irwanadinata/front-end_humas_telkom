import * as z from "zod";

export const peminjamanAlatSchema = z.object({
  nama: z.string().min(1, "Nama harus diisi"),
  nim: z.string().min(1, "NIM harus diisi"),
  unit: z.string().min(1, "Unit/Prodi/Ormawa harus diisi"),
  nomorwa: z
    .string()
    .min(10, "Nomor WA minimal 10 digit")
    .regex(/^08\d{8,11}$/, "Nomor WA tidak valid (harus diawali 08)"),
  keperluan: z.string().min(1, "Keperluan harus diisi"),
  tanggal_mulai: z.string().min(1, "Tanggal mulai harus diisi"),
  tanggal_selesai: z.string().min(1, "Tanggal selesai harus diisi"),
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
