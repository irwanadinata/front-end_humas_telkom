import axiosWithConfig from "../axiosWithConfig";

export const login = async (email, password) => {
  try {
    const response = await axiosWithConfig.post("/auth/login", {
      email,
      password,
    });
    console.log(response)
    return response.data;
  } catch (error) {
    throw new Error("Email atau kata sandi salah");
  }
};

export const register = async (
  nama,
  email,
  password
) => {
  try {
    const response = await axiosWithConfig.post("/auth/register", {
      nama,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Ada data yang tidak valid");
  }
};
