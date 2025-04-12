import axiosWithConfig from "../axiosWithConfig"

export const getTotalDataLiputanKegiatan = async () => {
    try {
        const response = await axiosWithConfig.get(`/liputan-kegiatan/total`);
        return response.data.total;
    } catch (error) {
        console.error(error)
        return 0;
    }
}

export const getTotalDataPenerbitanBerita = async () => {
    try {
        const response = await axiosWithConfig.get(`/penerbitan-berita/total`);
        return response.data.total;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export const getTotalDataPeminjamanAlat = async () => {
    try {
        const response = await axiosWithConfig.get(`/peminjaman-alat/total`);
        return response.data.total;
    } catch (error) {
        console.error(error);
        return 0;
    }
}
export const getTotalDataKemitraan = async () => {
    try {
        const response = await axiosWithConfig.get(`/kemitraan/total`);
        return response.data.total;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export const getProfile = async () => {
    try {
        const response = await axiosWithConfig.get(`/auth/profile`);
        return response.data
    } catch (error) {
        console.error(error)
    }
}