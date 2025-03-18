import axiosWithConfig from "../axiosWithConfig";

export const getLiputanKegiatan = async () => {
  try {
    const response = await axiosWithConfig.get(`/liputan-kegiatan/admin`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLiputanKegiatanById = async (id) => {
  try {
    const response = await axiosWithConfig.get(`/liputan-kegiatan/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addLiputanKegiatan = async ({ ...data }) => {
  try {
    await axiosWithConfig.post(
      "/liputan-kegiatan",
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return "Berhasil menambah liputan kegiatan";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editLiputanKegiatan = async (id, { ...data }) => {
  try {
    await axiosWithConfig.put(
      `/liputan-kegiatan/${id}`,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return "Berhasil mengedit data liputan kegiatan";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteLiputanKegiatan = async (id) => {
  try {
    await axiosWithConfig.delete(`/liputan-kegiatan/${id}`);
    return "Berhasil menghapus data liputan kegiatan";
  } catch (error) {
    console.error(error);
    throw error;
  }
};