import axiosWithConfig from "../axiosWithConfig";

export const getPeminjamanAlat = async () => {
  try {
    const response = await axiosWithConfig.get(`/peminjaman-alat`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPeminjamanAlatById = async (id) => {
  try {
    const response = await axiosWithConfig.get(`/peminjaman-alat/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addPeminjamanAlat = async ({ ...data }) => {
  try {
    await axiosWithConfig.post(
      "/peminjaman-alat",
      { ...data },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return "SUKSES menambah peminjaman alat";
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error.response?.data?.message || "GAGAL menambah peminjaman alat";
    throw new Error(errorMessage);
  }
};

export const editPeminjamanAlat = async (id, { ...data }) => {
  try {
    await axiosWithConfig.put(
      `/peminjaman-alat/${id}`,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return "Berhasil mengedit data peminjaman alat & inventaris";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePeminjamanAlat = async (id) => {
  try {
    await axiosWithConfig.delete(`/peminjaman-alat/${id}`);
    return "Berhasil menghapus data peminjaman alat & inventaris";
  } catch (error) {
    console.error(error);
    throw error;
  }
};
