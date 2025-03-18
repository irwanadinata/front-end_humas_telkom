import Swal from "sweetalert2";
import { CalendarIcon, Loader2 } from "lucide-react";
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
  addLiputanKegiatan,
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

const LiputanKegiatanForm = ({ action, id }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [processing, setProcessing] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      unit: "",
      nomorwa: "",
      acara: "",
      deskripsi: "",
      tanggal_mulai: "",
      tanggal_selesai: "",
      waktu_mulai: "",
      waktu_selesai: "",
      tempat: "",
      lampiran: "",
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
        name,
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

      setPreview(lampiran);

      form.reset({
        name,
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
    if (action !== "add") {
      getDetailLiputanKegiatan(id);
    }
  }, [id, action]);

  const onSubmit = (data) => {
    const {
      name,
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

    if (action === "add") {
      setProcessing(true);
      addLiputanKegiatan({
        name,
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
      })
        .then((message) => {
          navigate("/admin/liputan-kegiatan");
          Toast.fire({ icon: "success", title: message });
        })
        .catch((message) => {
          navigate("/admin/liputan-kegiatan");
          Toast.fire({ icon: "error", title: message });
        })
        .finally(() => {
          setProcessing(false);
        });
    } else if (action === "edit") {
      setProcessing(true);
      const editedData = {
        name,
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
      };

      editLiputanKegiatan(id, editedData)
        .then((message) => {
          navigate("/admin/liputan-kegiatan");
          Toast.fire({ icon: "success", title: message });
        })
        .catch((message) => {
          navigate("/admin/liputan-kegiatan");
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
                  <FormLabel htmlFor="input-liputan-kegiatan-name">
                    Nama
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-liputan-kegiatan-name"
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
              name="unit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="input-liputan-kegiatan-unit">
                    Unit/Prodi/Ormawa
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      id="status"
                      className="border rounded-md px-3 py-2 w-full"
                      disabled={action === "detail"}
                    >
                      <option value="ti">Prodi - Teknik Informatika</option>
                      <option value="rpl">
                        Prodi - Rekayasa Perangkat Lunak
                      </option>
                      <option value="si">Prodi - Sistem Informasi</option>
                      <option value="ds">Prodi - Data Science</option>
                      <option value="d3tt">
                        Prodi - D3 Teknik Telekomunikasi
                      </option>
                      <option value="s1tt">
                        Prodi - S1 Teknik Telekomunikasi
                      </option>
                      <option value="tb">Prodi - Teknik Biomedis</option>
                      <option value="te">Prodi - Teknik Elektro</option>
                      <option value="tp">Prodi - Teknologi Pangan</option>
                      <option value="dkv">
                        Prodi - Desain Komunikasi Visual
                      </option>
                      <option value="tii">Prodi - Teknik Industri</option>
                      <option value="bd">Prodi - Bisnis Digital</option>
                      <option value="dp">Prodi - Desain Produk</option>
                      <option value="tl">Prodi - Teknik Logistik</option>
                      <option value="bidang1-lppm">Bidang I - LPPM</option>
                      <option value="bidang1-inovasi">
                        Bidang I - Sentra Inovasi
                      </option>
                      <option value="bidang1-perpus">
                        Bidang I - Perpustakaan
                      </option>
                      <option value="bidang1-akademik">
                        Bidang I - Akademik & Pusat Bahasa
                      </option>
                      <option value="bidang2-sdm">Bidang II - SDM</option>
                      <option value="bidang2-keuangan">
                        Bidang II - Keuangan
                      </option>
                      <option value="bidang2-sistefo">
                        Bidang II - Sistefo
                      </option>
                      <option value="bidang2-logistik">
                        Bidang II - Logistik
                      </option>
                      <option value="bidang3-pemasaran">
                        Bidang III - Pemasaran & Admisi
                      </option>
                      <option value="bidang3-karir">
                        Bidang III - Karir & Konseling
                      </option>
                      <option value="bidang3-kemahasiswaan">
                        Bidang III - Kemahasiswaan
                      </option>
                      <option value="rektorat-sekpim">
                        Bidang Rektorat - Sekpim dan SAI
                      </option>
                      <option value="rektorat-mutu">
                        Bidang Rektorat - Satuan Penjamin Mutu waktu_selesai,nan
                        Mutu
                      </option>
                      <option value="rektorat-kui">
                        Bidang Rektorat - KUI
                      </option>
                      <option value="ormawa-bem">Ormawa - BEM</option>
                    </select>
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
              name="deskripsi"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="input-liputan-kegiatan-deskripsi">
                    Deskripsi
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-liputan-kegiatan-deskripsi"
                      className="disabled:opacity-100"
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
                        className="disabled:opacity-100"
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
              name="lampiran"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="input-lampiran-lampiran">
                    Poster
                  </FormLabel>
                  <FormControl>
                    <FileInput
                      preview={preview}
                      id="input-lampiran-lampiran"
                      disabled={action === "detail"}
                      onChange={(e) => {
                        field.onChange(e.target.files[0]);

                        if (action !== "detail") {
                          setPreview(
                            e.target.files[0]
                              ? URL.createObjectURL(e.target.files[0])
                              : null
                          );
                        }
                      }}
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
