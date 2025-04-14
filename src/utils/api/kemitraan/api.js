import axiosWithConfig from "../axiosWithConfig";

export const getKemitraan = async () => {
  try {
    const response = await axiosWithConfig.get(`/kemitraan`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getKemitraanById = async (id) => {
  try {
    const response = await axiosWithConfig.get(`kemitraan/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addKemitraan = async ({ ...data }) => {
  try {
    await axiosWithConfig.post(
      "/kemitraan",
      { ...data },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return "SUKSES menambah kemitraan";
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error.response?.data?.message || "GAGAL menambah kemitraan";
    throw new Error(errorMessage);
  }
};

export const editKemitraan = async (id, { ...data }) => {
  try {
    await axiosWithConfig.put(
      `kemitraan/${id}`,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return "Berhasil mengedit data Kemitraan";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteKemitraan = async (id) => {
  try {
    await axiosWithConfig.delete(`kemitraan/${id}`);
    return "Berhasil menghapus data Kemitraan";
  } catch (error) {
    console.error(error);
    throw error;
  }
};
