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

export const register = async (
  fullname,
  email,
  password
) => {
  try {
    const response = await axiosWithConfig.post("/auth/register", {
      fullname,
      from_school,
      graduation_year,
      email,
      username,
      password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Ada data yang tidak valid");
  }
};
