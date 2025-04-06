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
  const [preview, setPreview] = useState("");
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

      setPreview(lampiran);

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
    getDetailLiputanKegiatan();
  }, []);

  const onSubmit = async (data) => {
    const editedData = { ...data };
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
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      disabled={action === "detail"}
                    >
                      <SelectTrigger className="w-full border rounded-md px-3 py-2 bg-white text-gray-900 focus:ring-1">
                        <SelectValue placeholder="Pilih Unit/Prodi/Ormawa" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border rounded-md shadow-md">
                        <SelectItem value="ti">
                          Prodi - Teknik Informatika
                        </SelectItem>
                        <SelectItem value="rpl">
                          Prodi - Rekayasa Perangkat Lunak
                        </SelectItem>
                        <SelectItem value="si">
                          Prodi - Sistem Informasi
                        </SelectItem>
                        <SelectItem value="ds">Prodi - Data Science</SelectItem>
                        <SelectItem value="d3tt">
                          Prodi - D3 Teknik Telekomunikasi
                        </SelectItem>
                        <SelectItem value="s1tt">
                          Prodi - S1 Teknik Telekomunikasi
                        </SelectItem>
                        <SelectItem value="tb">
                          Prodi - Teknik Biomedis
                        </SelectItem>
                        <SelectItem value="te">
                          Prodi - Teknik Elektro
                        </SelectItem>
                        <SelectItem value="tp">
                          Prodi - Teknologi Pangan
                        </SelectItem>
                        <SelectItem value="dkv">
                          Prodi - Desain Komunikasi Visual
                        </SelectItem>
                        <SelectItem value="tii">
                          Prodi - Teknik Industri
                        </SelectItem>
                        <SelectItem value="bd">
                          Prodi - Bisnis Digital
                        </SelectItem>
                        <SelectItem value="dp">
                          Prodi - Desain Produk
                        </SelectItem>
                        <SelectItem value="tl">
                          Prodi - Teknik Logistik
                        </SelectItem>
                        <SelectItem value="bidang1-lppm">
                          Bidang I - LPPM
                        </SelectItem>
                        <SelectItem value="bidang1-inovasi">
                          Bidang I - Sentra Inovasi
                        </SelectItem>
                        <SelectItem value="bidang1-perpus">
                          Bidang I - Perpustakaan
                        </SelectItem>
                        <SelectItem value="bidang1-akademik">
                          Bidang I - Akademik & Pusat Bahasa
                        </SelectItem>
                        <SelectItem value="bidang2-sdm">
                          Bidang II - SDM
                        </SelectItem>
                        <SelectItem value="bidang2-keuangan">
                          Bidang II - Keuangan
                        </SelectItem>
                        <SelectItem value="bidang2-sistefo">
                          Bidang II - Sistefo
                        </SelectItem>
                        <SelectItem value="bidang2-logistik">
                          Bidang II - Logistik
                        </SelectItem>
                        <SelectItem value="bidang3-pemasaran">
                          Bidang III - Pemasaran & Admisi
                        </SelectItem>
                        <SelectItem value="bidang3-karir">
                          Bidang III - Karir & Konseling
                        </SelectItem>
                        <SelectItem value="bidang3-kemahasiswaan">
                          Bidang III - Kemahasiswaan
                        </SelectItem>
                        <SelectItem value="rektorat-sekpim">
                          Bidang Rektorat - Sekpim dan SAI
                        </SelectItem>
                        <SelectItem value="rektorat-mutu">
                          Bidang Rektorat - Satuan Penjamin Mutu
                        </SelectItem>
                        <SelectItem value="rektorat-kui">
                          Bidang Rektorat - KUI
                        </SelectItem>
                        <SelectItem value="ormawa-bem">Ormawa - BEM</SelectItem>
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
                  <Textarea
                      {...field}
                      id="input-fundraise-description"
                      className="min-h-[100px] disabled:opacity-100"
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
                    Lampiran
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
