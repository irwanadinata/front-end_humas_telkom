import Swal from "sweetalert2";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import FileInput from "@/components/ui/input-file";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { id as Id } from "date-fns/locale";
import { addLiputanKegiatan } from "@/utils/api/liputan-kegiatan/index";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NavbarUser from "@/components/layout/navbar-user";
import HeaderUser from "@/components/layout/header-user";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { liputanKegiatanSchema } from "@/utils/api/liputan-kegiatan/index";

function LiputanKegiatanUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  const form = useForm({
    resolver: zodResolver(liputanKegiatanSchema),
    defaultValues: {
      nama: "",
      unit: "",
      nomorwa: "",
      acara: "",
      deskripsi: "",
      tanggal_mulai: "",
      tanggal_selesai: "",
      waktu_mulai: "",
      waktu_selesai: "",
      tempat: "",
      lampiran: null,
      status: "pending",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const message = await addLiputanKegiatan(data);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: message,
        confirmButtonText: "OK",
        willOpen: () => {
          document
            .querySelector(".swal2-confirm")
            .classList.add("bg-[#bf131d]", "hover:bg-[#a8393b]", "text-white");
        },
      });
      navigate("/user/history");
    } catch (error) {
      const errorMessage = error.message;
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMessage,
        confirmButtonText: "OK",
        willOpen: () => {
          document
            .querySelector(".swal2-confirm")
            .classList.add("bg-[#bf131d]", "hover:bg-[#a8393b]", "text-white");
        },
      });
      navigate("/user/liputan-kegiatan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarUser />
      <HeaderUser title="Layanan Liputan Kegiatan" />
      <Form {...form}>
        <form
          className="px-6 lg:px-12 py-6 mb-6 flex flex-col gap-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="input-liputan-kegiatan-name" className="text-[#000000]">
                  Nama Lengkap
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-liputan-kegiatan-name"
                    className="disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="input-liputan-kegiatan-unit" className="text-[#000000]">
                  Unit/Prodi/Ormawa
                </FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-full border rounded-md px-3 py-2 bg-white text-gray-900 focus:ring-1">
                      <SelectValue placeholder="Pilih Unit/Prodi/Ormawa" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border rounded-md shadow-md">
                      <SelectItem value="Prodi - Teknik Informatika">
                        Prodi - Teknik Informatika
                      </SelectItem>
                      <SelectItem value="Prodi - Rekayasa Perangkat Lunak">
                        Prodi - Rekayasa Perangkat Lunak
                      </SelectItem>
                      <SelectItem value="Prodi - Sistem Informasi">
                        Prodi - Sistem Informasi
                      </SelectItem>
                      <SelectItem value="Prodi - Data Science">
                        Prodi - Data Science
                      </SelectItem>
                      <SelectItem value="Prodi - D3 Teknik Telekomunikasi">
                        Prodi - D3 Teknik Telekomunikasi
                      </SelectItem>
                      <SelectItem value="Prodi - S1 Teknik Telekomunikasi">
                        Prodi - S1 Teknik Telekomunikasi
                      </SelectItem>
                      <SelectItem value="Prodi - Teknik Biomedis">
                        Prodi - Teknik Biomedis
                      </SelectItem>
                      <SelectItem value="Prodi - Teknik Elektro">
                        Prodi - Teknik Elektro
                      </SelectItem>
                      <SelectItem value="Prodi - Teknologi Pangan">
                        Prodi - Teknologi Pangan
                      </SelectItem>
                      <SelectItem value="Prodi - Desain Komunikasi Visual">
                        Prodi - Desain Komunikasi Visual
                      </SelectItem>
                      <SelectItem value="Prodi - Teknik Industri">
                        Prodi - Teknik Industri
                      </SelectItem>
                      <SelectItem value="Prodi - Bisnis Digital">
                        Prodi - Bisnis Digital
                      </SelectItem>
                      <SelectItem value="Prodi - Desain Produk">
                        Prodi - Desain Produk
                      </SelectItem>
                      <SelectItem value="Prodi - Teknik Logistik">
                        Prodi - Teknik Logistik
                      </SelectItem>
                      <SelectItem value="Bidang I - LPPM">
                        Bidang I - LPPM
                      </SelectItem>
                      <SelectItem value="Bidang I - Sentra Inovasi">
                        Bidang I - Sentra Inovasi
                      </SelectItem>
                      <SelectItem value="Bidang I - Perpustakaan">
                        Bidang I - Perpustakaan
                      </SelectItem>
                      <SelectItem value="Bidang I - Akademik & Pusat Bahasa">
                        Bidang I - Akademik & Pusat Bahasa
                      </SelectItem>
                      <SelectItem value="Bidang II - SDM">
                        Bidang II - SDM
                      </SelectItem>
                      <SelectItem value="Bidang II - Keuangan">
                        Bidang II - Keuangan
                      </SelectItem>
                      <SelectItem value="Bidang II - Sistefo">
                        Bidang II - Sistefo
                      </SelectItem>
                      <SelectItem value="Bidang II - Logistik">
                        Bidang II - Logistik
                      </SelectItem>
                      <SelectItem value="Bidang III - Pemasaran & Admisi">
                        Bidang III - Pemasaran & Admisi
                      </SelectItem>
                      <SelectItem value="Bidang III - Karir & Konseling">
                        Bidang III - Karir & Konseling
                      </SelectItem>
                      <SelectItem value="Bidang III - Kemahasiswaan">
                        Bidang III - Kemahasiswaan
                      </SelectItem>
                      <SelectItem value="Bidang Rektorat - Sekpim dan SAI">
                        Bidang Rektorat - Sekpim dan SAI
                      </SelectItem>
                      <SelectItem value="Bidang Rektorat - Satuan Penjamin Mutu">
                        Bidang Rektorat - Satuan Penjamin Mutu
                      </SelectItem>
                      <SelectItem value="Bidang Rektorat - KUI">
                        Bidang Rektorat - KUI
                      </SelectItem>
                      <SelectItem value="Ormawa - BEM">Ormawa - BEM</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nomorwa"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="input-liputan-kegiatan-nomorwa" className="text-[#000000]">
                  Nomor WhatsApp
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-liputan-kegiatan-nomorwa"
                    className="disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acara"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="input-liputan-kegiatan-acara" className="text-[#000000]">
                  Nama Acara
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-liputan-kegiatan-acara"
                    className="disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deskripsi"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="input-liputan-kegiatan-deskripsi" className="text-[#000000]">
                  Deskripsi
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="input-liputan-kegiatan-description"
                    className="min-h-[100px] disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-8">
            <FormField
              control={form.control}
              name="tanggal_mulai"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="input-liputan-kegiatan-tanggal_mulai" className="text-[#000000]">
                    Tanggal Mulai
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="input-liputan-kegiatan-tanggal_mulai"
                        variant="outline"
                        className="w-full"
                      >
                        {field.value
                          ? format(new Date(field.value), "PPP", {
                              locale: Id,
                            })
                          : "Pilih Tanggal Mulai"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : null}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tanggal_selesai"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="input-liputan-kegiatan-tanggal_selesai" className="text-[#000000]">
                    Tanggal Selesai
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="input-liputan-kegiatan-tanggal_selesai"
                        variant="outline"
                        className="w-full"
                      >
                        {field.value
                          ? format(new Date(field.value), "PPP", {
                              locale: Id,
                            })
                          : "Pilih Tanggal Selesai"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : null}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="waktu_mulai"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="input-liputan-kegiatan-waktu_mulai" className="text-[#000000]">
                    Waktu Mulai
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="time"
                      id="input-liputan-kegiatan-waktu_mulai"
                      className="disabled:opacity-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waktu_selesai"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="input-liputan-kegiatan-waktu_selesai" className="text-[#000000]">
                    Waktu Selesai
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="time"
                      id="input-liputan-kegiatan-waktu_selesai"
                      className="disabled:opacity-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="tempat"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="input-liputan-kegiatan-tempat" className="text-[#000000]">
                  Tempat Pelaksanaan
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-liputan-kegiatan-tempat"
                    className="disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lampiran"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="input-lampiran" className="text-[#000000]">Lampiran (<small>Poster/Dokumen Max 500 KB</small>)</FormLabel>
                <FormControl>
                  <>
                    <FileInput
                      id="input-lampiran"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        field.onChange(file);
                        setFileInfo(
                          file
                            ? {
                                name: file.name,
                                size: (file.size / 1024).toFixed(2),
                              }
                            : null
                        );
                      }}
                    />
                    {fileInfo && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>
                          <span className="font-medium text-gray-800">
                            Name:
                          </span>{" "}
                          {fileInfo.name}
                        </p>
                        <p>
                          <span className="font-medium text-gray-800">
                            Size:
                          </span>{" "}
                          {fileInfo.size} KB
                        </p>
                      </div>
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            id="btn-submit"
            aria-label="btn-submit-form"
            className="w-full h-[3 rem] bg-[#bf131d] hover:bg-[#a8393b] text-white mb-8 mt-5"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Kirim"}
          </Button>
        </form>
      </Form>
    </>
  );
}
export default LiputanKegiatanUser;
