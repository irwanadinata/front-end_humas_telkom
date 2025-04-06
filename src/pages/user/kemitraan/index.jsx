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

function KemitraanUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      perusahaan: "",
      posisi: "",   
      email: "",
      nomorwa: "",
      deskripsi: "",
      status: "pending",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
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
      navigate("/user/kemitraan");
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
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="input-kemitraan-name">
                  Nama Lengkap
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-kemitraan-name"
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
                <FormLabel htmlFor="input-kemitraan-perusahaan">
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
                <FormLabel htmlFor="input-kemitraan-posisi">
                  Posisi
                </FormLabel>
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
                <FormLabel htmlFor="input-kemitraan-email">Email</FormLabel>
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
                <FormLabel htmlFor="input-kemitraan-nomor">
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
                      className="min-h-[100px] disabled:opacity-100"
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

export default KemitraanUser;
