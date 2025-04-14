import Swal from "sweetalert2";
import HeaderUser from "@/components/layout/header-user";
import NavbarUser from "@/components/layout/navbar-user";
import { useNavigate } from "react-router-dom";
import { addPenerbitanBerita } from "@/utils/api/penerbitan-berita";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { penerbitanBeritaSchema } from "@/utils/api/penerbitan-berita";

function PenerbitanBeritaUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(penerbitanBeritaSchema),
    defaultValues: {
      nama: "",
      peran: "",
      unit: "",
      nomorwa: "",
      email: "",
      materi: "",
      media: "",
      linkmateri: "",
      judul: "",
      status: "pending",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const message = await addPenerbitanBerita(data);
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
      navigate("/user/penerbitan-berita");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <NavbarUser />
      <HeaderUser title="Layanan Penerbitan Berita" />
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
                <FormLabel htmlFor="input-penerbitan-berita-nama" className="text-[#000000]">
                  Nama Lengkap
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-penerbitan-berita-nama"
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
                <FormLabel htmlFor="input-penerbitan-berita-email" className="text-[#000000]">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-penerbitan-berita-email"
                    className="disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="peran"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="input-penerbitan-berita-peran" className="text-[#000000]">
                  Peran
                </FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-full border rounded-md px-3 py-2 bg-white text-gray-900 focus:ring-1">
                      <SelectValue placeholder="Pilih Peran" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border rounded-md shadow-md">
                      <SelectItem
                        className="cursor-pointer hover:text-white"
                        value="dosen"
                      >
                        Dosen
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer hover:text-white"
                        value="pegawai"
                      >
                        Pegawai
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer hover:text-white"
                        value="mahasiswa"
                      >
                        Mahasiswa
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="input-penerbitan-berita-unit" className="text-[#000000]">
                  Unit/Prodi/Ormawa
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-penerbitan-berita-unit"
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
                <FormLabel htmlFor="input-penerbitan-berita-nomor" className="text-[#000000]">
                  Nomor WhatsApp
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-penerbitan-berita-nomor"
                    className="disabled:opacity-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="judul"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="input-penerbitan-berita-judul" className="text-[#000000]">
                  Judul Berita
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="input-liputan-kegiatan-deskripsi"
                    className="min-h-[50px] disabled:opacity-50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="materi"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="input-penerbitan-berita-materi" className="text-[#000000]">
                  Output Materi
                </FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-full border rounded-md px-3 py-2 bg-white text-gray-900 focus:ring-1">
                      <SelectValue placeholder="Pilih Materi" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border rounded-md shadow-md">
                      <SelectItem
                        className="cursor-pointer hover:text-white"
                        value="artikel"
                      >
                        Artikel
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer hover:text-white"
                        value="berita"
                      >
                        Berita
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer hover:text-white"
                        value="video"
                      >
                        Video
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="media" className="text-[#000000]">Media Publikasi</FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-full border rounded-md px-3 py-2 bg-white text-gray-900 focus:ring-1">
                      <SelectValue placeholder="Pilih Media Publikasi" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border rounded-md shadow-md">
                      <SelectItem
                        className="cursor-pointer hover:text-white"
                        value="instagram"
                      >
                        Instagram Official TUP
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer hover:text-white"
                        value="youtube"
                      >
                        Youtube Official TUP
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer hover:text-white"
                        value="website"
                      >
                        Website Official TUP
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer hover:text-white"
                        value="portal"
                      >
                        Portal Berita Media Partner
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkmateri"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="link_materi" className="text-[#000000]">
                  Link Materi & Dokumentasi
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="link_materi"
                    className="min-h-[100px] disabled:opacity-50"
                  />
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

export default PenerbitanBeritaUser;
