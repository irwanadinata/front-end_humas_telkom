import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/pages/auth/components/layout";
import { Link } from "react-router-dom";
import { login, loginSchema } from "@/utils/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import { InputLabel } from "@/components/ui/input-with-label";
import iconEyeOpen from "@/assets/icon/icon-eye-open.svg";
import iconEyeClose from "@/assets/icon/icon-eye-close.svg";
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
    console.log(data)
    try {
      const response = await login(email, password);
      const token = response.token;
      const role = response.role;
      console.log(role)
      Toast.fire({ icon: "success", title: "Login berhasil" });
      contextLogin(token);
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "user") {
        navigate("/user/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setChangeIcon(!changeIcon);
  };

  return (
    <Layout label="Layanan HUMAS - Login">
      <form aria-label="form-input" onSubmit={handleSubmit(handleLogin)}>
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
          <p className="text-sm">Belum memiliki akun? {" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link></p>
        </div>
        <Button
          id="btn-submit"
          aria-label="btn-submit-form"
          className="w-full h-[3 rem] bg-[#bf131d] hover:bg-[#a8393b] text-white mb-3"
        >Login
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

export default Login;