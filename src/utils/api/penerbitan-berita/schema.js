import { z } from "zod";

export const penerbitanBeritaSchema = z.object({
  nama: z.string().min(1, "Nama harus diisi"),
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Format email tidak valid"),
  peran: z.string().min(1, "Peran harus dipilih"),
  unit: z.string().min(1, "Unit/Prodi/Ormawa harus diisi"),
  nomorwa: z
      .string()
      .min(10, "Nomor WA minimal 10 digit")
      .regex(/^08\d{8,11}$/, "Nomor WA tidak valid (harus diawali 08)"),
  judul: z.string().min(1, "Judul Berita harus diisi"),
  materi: z.string().min(1, "Output Materi harus dipilih"),
  media: z.string().min(1, "Media Publikasi harus dipilih"),
  linkmateri: z
    .string()
    .min(1, "Link Materi & Dokumentasi harus diisi")
    .url("Link harus berupa URL valid"),
});
