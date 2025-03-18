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
  addPenerbitanBerita,
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

const PenerbitanBeritaForm = ({ action, id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      peran: "",
      unit: "",
      nomorwa: "",
      email: "",
      materi: "",
      media: "",
      linkmateri: "",
      judul: "",
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
        name,
        peran,
        unit,
        nomorwa,
        email,
        materi,
        media,
        linkmateri,
        judul,
      } = data;

      form.reset({
        name,
        peran,
        unit,
        nomorwa,
        email,
        materi,
        media,
        linkmateri,
        judul,
      });
      setLoading(false);
    } catch (error) {
      Toast.fire({ icon: "error", title: error });
      navigate("/admin/penerbitan-berita");
    }
  };

  useEffect(() => {
    if (action !== "add") {
      getDetailPenerbitanBerita(id);
    }
  }, [id, action]);

  const onSubmit = (data) => {
    const {
      name,
      peran,
      unit,
      nomorwa,
      email,
      materi,
      media,
      linkmateri,
      judul,
    } = data;

    if (action === "add") {
      setProcessing(true);
      addPenerbitanBerita({
        name,
        peran,
        unit,
        nomorwa,
        email,
        materi,
        media,
        linkmateri,
        judul,
      })
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
    } else if (action === "edit") {
      setProcessing(true);
      const editedData = {
        name,
        peran,
        unit,
        nomorwa,
        email,
        materi,
        media,
        linkmateri,
        judul,
      };

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
    }
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
              name="peran"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="input-penerbitan-berita-peran">
                    Peran
                  </FormLabel>
                  <FormControl>
                  <select
                      {...field}
                      id="input-penerbitan-berita-peran"
                      className="border rounded-md px-3 py-2 w-full"
                      disabled={action === "detail"}
                    >
                      <option value="dosen">Dosen</option>
                      <option value="pegawai">Pegawai</option>
                      <option value="mahasiswa">Mahasiswa</option>
                    </select>
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
              name="materi"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="input-penerbitan-berita-materi">
                    Output Materi
                  </FormLabel>
                  <FormControl>
                  <select
                      {...field}
                      id="input-penerbitan-berita-materi"
                      className="border rounded-md px-3 py-2 w-full"
                      disabled={action === "detail"}
                    >
                      <option value="artikel">Artikel</option>
                      <option value="berita">Berita</option>
                      <option value="video">Video</option>
                    </select>
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
                  <FormLabel htmlFor="media">
                    Media Publikasi
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      id="media"
                      className="border rounded-md px-3 py-2 w-full"
                      disabled={action === "detail"}
                    >
                      <option value="instagram">Instagram Official TUP</option>
                      <option value="youtube">Youtube Official TUP</option>
                      <option value="website">Website Official TUP</option>
                      <option value="portal">Portal Berita Media Partner</option>
                    </select>
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
