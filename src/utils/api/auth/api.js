import axiosWithConfig from "../axiosWithConfig";

export const login = async (email, password) => {
  try {
    const response = await axiosWithConfig.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Email atau kata sandi salah");
  }
};