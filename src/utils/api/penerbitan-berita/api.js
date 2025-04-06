import axiosWithConfig from "../axiosWithConfig";

export const getPenerbitanBerita = async () => {
  try {
    const response = await axiosWithConfig.get(`/penerbitan-berita/admin`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPenerbitanBeritaById = async (id) => {
  try {
    const response = await axiosWithConfig.get(`/penerbitan-berita/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addPenerbitanBerita = async ({ ...data }) => {
  try {
    await axiosWithConfig.post(
      "/penerbitan-berita",
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return "Berhasil menambah penerbitan-berita";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editPenerbitanBerita = async (id, { ...data }) => {
  try {
    await axiosWithConfig.put(
      `/penerbitan-berita/${id}`,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return "Berhasil mengedit data penerbiian berita";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePenerbitanBerita = async (id) => {
  try {
    await axiosWithConfig.delete(`/penerbitan-berita/${id}`);
    return "Berhasil menghapus data penerbitan berita";
  } catch (error) {
    console.error(error);
    throw error;
  }
};