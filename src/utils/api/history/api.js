import axiosWithConfig from "../axiosWithConfig";

export const getKemitraanByUser = async () => {
    try {
      const response = await axiosWithConfig.get(`/kemitraan/user`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
export const getLiputanKegiatanByUser = async () => {
    try {
      const response = await axiosWithConfig.get(`/liputan-kegiatan/user`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
export const getPeminjamanAlatByUser = async () => {
    try {
      const response = await axiosWithConfig.get(`/peminjaman-alat/user`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
export const getPenerbitanBeritaByUser = async () => {
    try {
      const response = await axiosWithConfig.get(`/penerbitan-berita/user`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };