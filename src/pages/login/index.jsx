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