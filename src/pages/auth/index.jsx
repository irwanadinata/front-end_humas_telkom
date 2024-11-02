import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LayoutLogin } from "@/components/card-login";
import { login, loginSchema } from "@/utils/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonClick } from "@/components/ui/button";
import { InputLabel } from "@/components/input-with-label";
import iconEyeOpen from "@/assets/logo/icon-eye-open.svg";
import iconEyeClose from "@/assets/logo/icon-eye-close.svg";
import { useAuth } from "@/utils/context/auth-context";

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

function Login() {
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth();
  const [changeIcon, setChangeIcon] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data) {
    const { email, password } = data;

    try {
      if (email !== "admin@gmail.com") {
        Toast.fire({
          icon: "info",
          title: "Hanya admin yang bisa mengakses halaman ini",
        });
        throw new Error("Hanya admin yang bisa mengakses halaman ini");
      }
      const response = await login(email, password);
      const token = response.token;
      Toast.fire({ icon: "success", title: "Login berhasil" });
      contextLogin(token);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setChangeIcon(!changeIcon);
  };

  return (
    <LayoutLogin label="SIMABA - Login" route="/">
      <form aria-label="form-input" onSubmit={handleSubmit(handleLogin)}>
        <InputLabel
          id="email"
          aria-label="email"
          label="Email"
          type="text"
          isLogin={true}
          placeholder="Masukkan email anda"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <div className="flex justify-between items-center font-bold text-sm">
          <label htmlFor="password">Password</label>
        </div>
        <div className="relative mb-[2.5rem]">
          <InputLabel
            id="password"
            isLogin={true}
            aria-label="password"
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password anda"
            name="password"
            register={register}
            error={errors.password?.message}
          />
          <img
            src={changeIcon ? iconEyeOpen : iconEyeClose}
            alt="iconeye"
            className="absolute right-[3%] top-[-6%] translate-y-[100%] cursor-pointer"
            onClick={toggleShowPassword}
          />
        </div>

        <ButtonClick
          id="btn-submit"
          aria-label="btn-submit-form"
          label="Login"
          className="w-full h-[3 rem] bg-[#293066] hover:bg-[#293066] text-white mb-3"
        />
      </form>
      {errorMessage && (
        <p className="text-[#FC544B] text-center font-base text-base">
          {errorMessage}
        </p>
      )}
    </LayoutLogin>
  );
}

export default Login;