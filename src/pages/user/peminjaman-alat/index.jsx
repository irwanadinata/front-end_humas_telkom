import { useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarIcon, Loader2 } from "lucide-react";
import HeaderUser from "@/components/layout/header-user";
import NavbarUser from "@/components/layout/navbar-user";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addPeminjamanAlat } from "@/utils/api/peminjaman-alat";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { id as Id } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import FileInput from "@/components/ui/input-file";
import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import { peminjamanAlatSchema } from "@/utils/api/peminjaman-alat";

function PeminjamanAlatUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  const form = useForm({
    resolver: zodResolver(peminjamanAlatSchema),
    defaultValues: {
      nama: "",
      nim: "",
      unit: "",
      nomorwa: "",
      keperluan: "",
      tanggal_mulai: "",
      tanggal_selesai: "",
      lampiran: null,
      status: "pending",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data)

    try {
      const message = await addPeminjamanAlat(data);
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
      navigate("/user/peminjaman-alat");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <NavbarUser />
      <HeaderUser title="Layanan Peminjaman Alat" />
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
                <FormLabel htmlFor="input-peminjaman-alat-nama" className="text-[#000000]">
                  Nama Lengkap
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-peminjaman-alat-nama"
                    className="disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nim"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="input-peminjaman-alat-nim" className="text-[#000000]">NIM</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-peminjaman-alat-nomorwa"
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
                <FormLabel htmlFor="input-peminjaman-alat-unit" className="text-[#000000]">
                  Unit/Prodi/Ormawa
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-peminjaman-alat-nomorwa"
                    className="disabled:opacity-100"
                  />
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
                <FormLabel htmlFor="input-peminjaman-alat-nomorwa" className="text-[#000000]">
                  Nomor WhatsApp
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-peminjaman-alat-nomorwa"
                    className="disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keperluan"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="input-peminjaman-alat-keperluan" className="text-[#000000]">
                  Keperluan
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-peminjaman-alat-keperluan"
                    className="disabled:opacity-100"
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
                  <FormLabel className="text-[#000000]">Tanggal Mulai</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full">
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
                  <FormLabel className="text-[#000000]">Tanggal Selesai</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full">
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

          <FormField
            control={form.control}
            name="lampiran"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="input-lampiran" className="text-[#000000]">
                  Lampiran <small>(Dokumen Max 500 KB) <i className="text-[#bf131d]">Opsional</i></small>
                </FormLabel>
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

export default PeminjamanAlatUser;
