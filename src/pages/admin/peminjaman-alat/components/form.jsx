import Swal from "sweetalert2";
import { ArrowDownToLine, CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import SkeletonForm from "./skeleton/skeleton-form";
import {
  getPeminjamanAlatById,
  editPeminjamanAlat,
} from "@/utils/api/peminjaman-alat/index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const PeminjamanAlatForm = ({ action, id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [detail, setDetail] = useState(null);
  const [processing, setProcessing] = useState(false);
  const form = useForm({
    defaultValues: {
      nama: "",
      nim: "",
      unit: "",
      nomorwa: "",
      keperluan: "",
      tanggal_mulai: "",
      tanggal_selesai: "",
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

  const getDetailPeminjamanAlat = async (id) => {
    setLoading(true);
    try {
      const data = await getPeminjamanAlatById(id);
      const {
        nama,
        nim,
        unit,
        nomorwa,
        keperluan,
        tanggal_mulai,
        tanggal_selesai,
        lampiran,
        status,
      } = data;

      setDetail(data);

      form.reset({
        nama,
        nim,
        unit,
        nomorwa,
        keperluan,
        tanggal_mulai,
        tanggal_selesai,
        lampiran,
        status,
      });
      setLoading(false);
    } catch (error) {
      Toast.fire({ icon: "error", title: error });
      navigate("/admin/peminjaman-alat");
    }
  };

  useEffect(() => {
    getDetailPeminjamanAlat(id);
  }, []);

  const onSubmit = async (data) => {
    const editedData = {
      ...data,
      tanggal_mulai: data.tanggal_mulai?.slice(0, 10),
      tanggal_selesai: data.tanggal_selesai?.slice(0, 10),
    };
    setProcessing(true);

    try {
      const message = await editPeminjamanAlat(id, editedData);
      navigate("/admin/peminjaman-alat");
      Toast.fire({ icon: "success", title: message });
    } catch (error) {
      navigate("/admin/peminjaman-alat");
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
                          <SelectItem value="returned">Dikembalikan</SelectItem>
                          <SelectItem value="borrowed">Dipinjam</SelectItem>
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
                  <FormLabel htmlFor="input-peminjaman-alat-name">
                    Nama Lengkap
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-peminjaman-alat-name"
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
              name="nim"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="input-peminjaman-alat-nim">NIM</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-peminjaman-alat-nomorwa"
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
              name="unit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="input-peminjaman-alat-unit">
                    Unit/Prodi/Ormawa
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-peminjaman-alat-nomorwa"
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
                <FormItem>
                  <FormLabel htmlFor="input-peminjaman-alat-nomorwa">
                    Nomor WhatsApp
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-peminjaman-alat-nomorwa"
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
              name="keperluan"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="input-peminjaman-alat-keperluan">
                    Keperluan
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-peminjaman-alat-keperluan"
                      className="disabled:opacity-50"
                      disabled={action === "detail"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-8">
              <FormField
                control={form.control}
                name="tanggal_mulai"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tanggal Mulai</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full"
                          disabled={action === "detail"}
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
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
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
                    <FormLabel>Tanggal Selesai</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full"
                          disabled={action === "detail"}
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
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
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
                onClick={() => navigate("/admin/peminjaman-alat")}
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
export default PeminjamanAlatForm;
