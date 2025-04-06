import axiosWithConfig from "../axiosWithConfig"

export const getTotalDataLiputanKegiatan = async () => {
    try {
        const response = await axiosWithConfig.get(`/liputan-kegiatan/total`);
        return response.data.total_user;
    } catch (error) {
        console.error(error)
        return 0;
    }
}

export const getTotalDataPenerbitanBerita = async () => {
    try {
        const response = await axiosWithConfig.get(`/penerbitan-berita/total`);
        return response.data.total_question;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export const getTotalDataPeminjamanAlat = async () => {
    try {
        const response = await axiosWithConfig.get(`/peminjaman-alat/total`);
        return response.data.total_rangking;
    } catch (error) {
        console.error(error);
        return 0;
    }
}
export const getTotalDataKemitraan = async () => {
    try {
        const response = await axiosWithConfig.get(`/kemitraan/total`);
        return response.data.total_rangking;
    } catch (error) {
        console.error(error);
        return 0;
    }
}