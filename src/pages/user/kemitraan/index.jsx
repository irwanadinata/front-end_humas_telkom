import Swal from "sweetalert2";
import HeaderUser from "@/components/layout/header-user";
import NavbarUser from "@/components/layout/navbar-user";
import { useNavigate } from "react-router-dom";
import { addKemitraan } from "@/utils/api/kemitraan";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FileInput from "@/components/ui/input-file";
import { zodResolver } from "@hookform/resolvers/zod";
import { kemitraanSchema } from "@/utils/api/kemitraan/index";

function KemitraanUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const form = useForm({
    resolver: zodResolver(kemitraanSchema),
    defaultValues: {
      nama: "",
      perusahaan: "",
      posisi: "",
      email: "",
      nomorwa: "",
      jeniskemitraan: "",
      deskripsi: "",
      lampiran: null,
      status: "pending",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const message = await addKemitraan(data);
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
      navigate("/user/kemitraan");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <NavbarUser />
      <HeaderUser title="Layanan Kemitraan" />
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
                <FormLabel htmlFor="input-kemitraan-nama" className="text-[#000000]">
                  Nama Lengkap
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-kemitraan-nama"
                    className="disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="perusahaan"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="input-kemitraan-perusahaan" className="text-[#000000]">
                  Perusahaan/Instansi
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-kemitraan-perusahaan"
                    className="disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="posisi"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="input-kemitraan-posisi" className="text-[#000000]">Posisi</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-kemitraan-posisi"
                    className="disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="input-kemitraan-email" className="text-[#000000]">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-kemitraan-email"
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
              <FormItem className="w-full">
                <FormLabel htmlFor="input-kemitraan-nomor" className="text-[#000000]">
                  Nomor WhatsApp
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-kemitraan-nomor"
                    className="disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jeniskemitraan"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="input-kemitraan-jenis" className="text-[#000000]">
                  Jenis Kemitraan
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-kemitraan-jenis"
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
                <FormLabel htmlFor="input-kemitraan-deskripsi" className="text-[#000000]">
                  Deskripsi Kemitraan
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="input-kemitraan-description"
                    className="min-h-[100px] disabled:opacity-100"
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
                <FormLabel htmlFor="input-lampiran" className="text-[#000000]">
                  Lampiran (<small>Dokumen Max 500 KB</small>)
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

export default KemitraanUser;
