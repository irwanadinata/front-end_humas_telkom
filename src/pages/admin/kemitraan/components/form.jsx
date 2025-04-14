import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SkeletonForm from "./skeleton/skeleton-form";
import FileInput from "@/components/ui/input-file";
import { ArrowDownToLine } from "lucide-react";
import { getKemitraanById, editKemitraan } from "@/utils/api/kemitraan/index";
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

const KemitraanForm = ({ action, id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [detail, setDetail] = useState(null);
  const [processing, setProcessing] = useState(false);
  const form = useForm({
    defaultValues: {
      nama: "",
      perusahaan: "",
      posisi: "",
      email: "",
      nomorwa: "",
      jeniskemitraan: "",
      deskripsi: "",
      lampiran: null,
      status: "",
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

  const getDetailKemitraan = async (id) => {
    setLoading(true);
    try {
      const data = await getKemitraanById(id);
      const {
        nama,
        perusahaan,
        posisi,
        email,
        nomorwa,
        jeniskemitraan,
        deskripsi,
        lampiran,
        status,
      } = data;

      setDetail(data);

      form.reset({
        nama,
        perusahaan,
        posisi,
        email,
        nomorwa,
        jeniskemitraan,
        deskripsi,
        lampiran,
        status,
      });
      setLoading(false);
    } catch (error) {
      Toast.fire({ icon: "error", title: error });
      navigate("/admin/kemitraan");
    }
  };

  useEffect(() => {
    getDetailKemitraan(id);
  }, []);

  const onSubmit = async (data) => {
    const editedData = { ...data };
    setProcessing(true);

    try {
      const message = await editKemitraan(id, editedData);
      navigate("/admin/kemitraan");
      Toast.fire({ icon: "success", title: message });
    } catch (error) {
      navigate("/admin/kemitraan");
      Toast.fire({ icon: "error", title: error });
    } finally {
      setProcessing(false);
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
            <div className="flex justify-center">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-1/6">
                    <FormLabel
                      htmlFor="status"
                      className="block text-center font-bold"
                    >
                      STATUS
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        disabled={action === "detail"}
                      >
                        <SelectTrigger className="w-full border rounded-md px-3 py-2 bg-white text-gray-900 focus:ring-1">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border rounded-md shadow-md">
                          <SelectItem value="pending">Menunggu</SelectItem>
                          <SelectItem value="accepted">Diterima</SelectItem>
                          <SelectItem value="rejected">Ditolak</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="input-kemitraan-name">
                    Nama Lengkap
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-kemitraan-name"
                      className="disabled:opacity-50"
                      disabled={action === "detail"}
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
                  <FormLabel htmlFor="input-kemitraan-perusahaan">
                    Perusahaan/Instansi
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-kemitraan-perusahaan"
                      className="disabled:opacity-50"
                      disabled={action === "detail"}
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
                  <FormLabel htmlFor="input-kemitraan-posisi">Posisi</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-kemitraan-posisi"
                      className="disabled:opacity-50"
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
                  <FormLabel htmlFor="input-kemitraan-email">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-kemitraan-email"
                      className="disabled:opacity-50"
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
                  <FormLabel htmlFor="input-kemitraan-nomor">
                    Nomor WhatsApp
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-kemitraan-nomor"
                      className="disabled:opacity-50"
                      disabled={action === "detail"}
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
                  <FormLabel htmlFor="input-kemitraan-jenis">
                    Jenis Kemitraan
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-kemitraan-jenis"
                      className="disabled:opacity-50"
                      disabled={action === "detail"}
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
                  <FormLabel htmlFor="input-kemitraan-deskripsi">
                    Deskripsi Kemitraan
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="input-kemitraan-description"
                      className="min-h-[100px] disabled:opacity-50"
                      disabled={action === "detail"}
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
                  <FormLabel htmlFor="input-lampiran">Lampiran</FormLabel>
                  {detail?.lampiran && (
                    <div className="mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-3">
                        <span>{detail.lampiran}</span>
                        <a
                          href={`${import.meta.env.VITE_BASE_URL}/uploads/${
                            detail.lampiran
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm"
                          download
                        >
                          <ArrowDownToLine className="text-blue-700" />
                        </a>
                      </div>
                    </div>
                  )}
                  <FormControl>
                    {action !== "detail" && (
                      <>
                        <FileInput
                          id="input-lampiran"
                          disabled={action === "detail"}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            field.onChange(file);
                            if (action !== "detail") {
                              setFileInfo(
                                file
                                  ? {
                                      name: file.name,
                                      size: (file.size / 1024).toFixed(2),
                                    }
                                  : null
                              );
                            }
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
                    )}
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
                onClick={() => navigate("/admin/kemitraan")}
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
export default KemitraanForm;
