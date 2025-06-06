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
  getLiputanKegiatanById,
  editLiputanKegiatan,
} from "@/utils/api/liputan-kegiatan/index";
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
import { Textarea } from "@/components/ui/textarea";

const LiputanKegiatanForm = ({ action, id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [detail, setDetail] = useState(null);
  const [processing, setProcessing] = useState(false);
  const form = useForm({
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

  const getDetailLiputanKegiatan = async (id) => {
    setLoading(true);
    try {
      const data = await getLiputanKegiatanById(id);
      const {
        nama,
        unit,
        nomorwa,
        acara,
        deskripsi,
        tanggal_mulai,
        tanggal_selesai,
        waktu_mulai,
        waktu_selesai,
        tempat,
        lampiran,
        status,
      } = data;

      setDetail(data);

      form.reset({
        nama,
        unit,
        nomorwa,
        acara,
        deskripsi,
        tanggal_mulai,
        tanggal_selesai,
        waktu_mulai,
        waktu_selesai,
        tempat,
        lampiran,
        status,
      });
      setLoading(false);
    } catch (error) {
      Toast.fire({ icon: "error", title: error });
      navigate("/admin/liputan-kegiatan");
    }
  };

  useEffect(() => {
    getDetailLiputanKegiatan(id);
  }, []);

  const onSubmit = async (data) => {
    const editedData = {
      ...data,
      tanggal_mulai: data.tanggal_mulai?.slice(0, 10),
      tanggal_selesai: data.tanggal_selesai?.slice(0, 10),
    };
    setProcessing(true);

    try {
      const message = await editLiputanKegiatan(id, editedData);
      navigate("/admin/liputan-kegiatan");
      Toast.fire({ icon: "success", title: message });
    } catch (error) {
      navigate("/admin/liputan-kegiatan");
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
                  <FormLabel htmlFor="input-liputan-kegiatan-name">
                    Nama Lengkap
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-liputan-kegiatan-name"
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
                  <FormLabel htmlFor="input-liputan-kegiatan-unit">
                    Unit/Prodi/Ormawa
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                      disabled={action === "detail"}
                    >
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
                        <SelectItem value="Ormawa - BEM">
                          Ormawa - BEM
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
              name="nomorwa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="input-liputan-kegiatan-nomorwa">
                    Nomor WhatsApp
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-liputan-kegiatan-nomorwa"
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
              name="acara"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="input-liputan-kegiatan-acara">
                    Nama Acara
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-liputan-kegiatan-acara"
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
                  <FormLabel htmlFor="input-liputan-kegiatan-deskripsi">
                    Deskripsi
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="input-liputan-kegiatan-deskripsi"
                      className="min-h-[100px] disabled:opacity-50"
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

            <div className="flex gap-8">
              <FormField
                control={form.control}
                name="waktu_mulai"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="input-liputan-kegiatan-waktu_mulai">
                      Waktu Mulai
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        id="input-liputan-kegiatan-waktu_mulai"
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
                name="waktu_selesai"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="input-liputan-kegiatan-waktu_selesai">
                      Waktu Selesai
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        id="input-liputan-kegiatan-waktu_selesai"
                        className="disabled:opacity-50"
                        disabled={action === "detail"}
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
                  <FormLabel htmlFor="input-liputan-kegiatan-tempat">
                    Tempat Pelaksanaan
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-liputan-kegiatan-tempat"
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
                onClick={() => navigate("/admin/liputan-kegiatan")}
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
export default LiputanKegiatanForm;
