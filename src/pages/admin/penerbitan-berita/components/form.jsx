import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SkeletonForm from "./skeleton/skeleton-form";
import {
  getPenerbitanBeritaById,
  editPenerbitanBerita,
} from "@/utils/api/penerbitan-berita/index";
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

const PenerbitanBeritaForm = ({ action, id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const form = useForm({
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

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const getDetailPenerbitanBerita = async (id) => {
    setLoading(true);
    try {
      const data = await getPenerbitanBeritaById(id);
      const {
        nama,
        peran,
        unit,
        nomorwa,
        email,
        materi,
        media,
        linkmateri,
        judul,
        status,
      } = data;

      form.reset({
        nama,
        peran,
        unit,
        nomorwa,
        email,
        materi,
        media,
        linkmateri,
        judul,
        status,
      });
      setLoading(false);
    } catch (error) {
      Toast.fire({ icon: "error", title: error });
      navigate("/admin/penerbitan-berita");
    }
  };

  useEffect(() => {
    getDetailPenerbitanBerita(id);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    const editedData = { ...data };
    setProcessing(true);
    editPenerbitanBerita(id, editedData)
      .then((message) => {
        navigate("/admin/penerbitan-berita");
        Toast.fire({ icon: "success", title: message });
      })
      .catch((message) => {
        navigate("/admin/penerbitan-berita");
        Toast.fire({ icon: "error", title: message });
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  return (
    <Form {...form}>
      <form
        className="px-6 py-6 mb-6 flex flex-col gap-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {loading ? (
          <SkeletonForm />
        ) : (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="input-penerbitan-berita-name">
                    Nama Lengkap
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-penerbitan-berita-name"
                      className="disabled:opacity-100"
                      disabled={action === "detail"}
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
                  <FormLabel htmlFor="input-penerbitan-berita-email">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-penerbitan-berita-email"
                      className="disabled:opacity-100"
                      disabled={action === "detail"}
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
                  <FormLabel htmlFor="input-penerbitan-berita-peran">
                    Peran
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      disabled={action === "detail"}
                    >
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
                  <FormLabel htmlFor="input-penerbitan-berita-unit">
                    Unit/Prodi
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-penerbitan-berita-unit"
                      className="disabled:opacity-100"
                      disabled={action === "detail"}
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
                  <FormLabel htmlFor="input-penerbitan-berita-nomor">
                    Nomor WhatsApp
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-penerbitan-berita-nomor"
                      className="disabled:opacity-100"
                      disabled={action === "detail"}
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
                  <FormLabel htmlFor="input-penerbitan-berita-judul">
                    Judul Berita
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-penerbitan-berita-judul"
                      className="disabled:opacity-100"
                      disabled={action === "detail"}
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
                  <FormLabel htmlFor="input-penerbitan-berita-materi">
                    Output Materi
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      disabled={action === "detail"}
                    >
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
                  <FormLabel htmlFor="media">Media Publikasi</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      disabled={action === "detail"}
                    >
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
                  <FormLabel htmlFor="link_materi">
                    Link Materi & Dokumentasi
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="link_materi"
                      className="disabled:opacity-100"
                      disabled={action === "detail"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      id="status"
                      className="border rounded-md px-3 py-2 w-full"
                      disabled={action === "detail"}
                    >
                      <option value="pending">Menunggu</option>
                      <option value="accepted">Diterima</option>
                      <option value="rejected">Ditolak</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-5">
              <Button
                size="sm"
                type="reset"
                id="btn-action-negative"
                disabled={processing}
                onClick={() => navigate("/admin/penerbitan-berita")}
                className={`bg-white w-24 text-[#bf131d] border-solid border-2 border-[#bf131d] hover:bg-[#bf131d] hover:text-white ${
                  action === "detail" ? "hidden" : ""
                }`}
              >
                Kembali
              </Button>
              <Button
                size="sm"
                type="submit"
                id="btn-action-positive"
                className={`bg-[#bf131d] w-24 hover:bg-[#bf131d]/80 ${
                  action === "detail" ? "hidden" : ""
                }`}
              >
                {processing ? (
                  <Loader2 className="animate-spin w-7 h-7" />
                ) : action === "edit" ? (
                  "Edit data"
                ) : (
                  "Tambah"
                )}
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
};
export default PenerbitanBeritaForm;
