import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/pages/auth/components/layout";
import { Link } from "react-router-dom";
import { register as registerUser, registerSchema } from "@/utils/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { InputLabel } from "@/components/ui/input-with-label";
import iconEyeOpen from "@/assets/icon/icon-eye-open.svg";
import iconEyeClose from "@/assets/icon/icon-eye-close.svg";

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

function Register() {
  const navigate = useNavigate();
  const [changeIcon, setChangeIcon] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(data) {
    const { nama, email, password } = data;
    try {
      await registerUser(nama, email, password);
      Toast.fire({ icon: "success", title: "Daftar Akun Berhasil, <br/> Silahkan Login" });
      navigate("/");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setChangeIcon(!changeIcon);
  };

  return (
    <Layout label="Layanan HUMAS - Register">
      <form aria-label="form-input" onSubmit={handleSubmit(handleRegister)}>
        <InputLabel
          id="nama"
          aria-label="nama"
          label="Nama"
          type="text"
          isLogin={true}
          placeholder="Masukkan nama"
          name="nama"
          register={register}
          error={errors.name?.message}
        />
        <InputLabel
          id="email"
          aria-label="email"
          label="Email"
          type="text"
          isLogin={true}
          placeholder="Masukkan email"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <div className="flex justify-between items-center font-bold text-sm">
          <label htmlFor="password">Password</label>
        </div>
        <div className="relative">
          <InputLabel
            id="password"
            isLogin={true}
            aria-label="password"
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password"
            name="password"
            register={register}
            error={errors.password?.message}
          />
          <img
            src={changeIcon ? iconEyeOpen : iconEyeClose}
            alt="iconeye"
            className="absolute right-[3%] top-[50%] translate-y-[-50%] cursor-pointer"
            onClick={toggleShowPassword}
          />
        </div>
        <div className="flex justify-end mb-4">
          <p className="text-sm">Sudah Memiliki akun? {" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Login
            </Link></p>
        </div>
        <Button
          id="btn-submit"
          aria-label="btn-submit-form"
          className="w-full h-[3 rem] bg-[#bf131d] hover:bg-[#a8393b] text-white mb-3"
        >Register
        </Button>
      </form>
      {errorMessage && (
        <p className="text-[#bf131d] text-center font-base text-sm">
          {errorMessage}
        </p>
      )}
    </Layout>
  );
}

export default Register;