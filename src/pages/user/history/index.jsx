import HeaderUser from "@/components/layout/header-user";
import NavbarUser from "@/components/layout/navbar-user";
import HistoryLiputanKegiatan from "./components/history-liputan-kegiatan";
import HistoryPenerbitanBerita from "./components/history-penerbitan-berita";
import HistoryPeminjamanAlat from "./components/history-peminjaman-alat";
import HistoryKemitraan from "./components/history-kemitraan";

const History = () => {
  return (
    <>
      <NavbarUser />
      <HeaderUser title="Riwayat Pengajuan" />
      <div className="px-2 lg:px-6">
        <HistoryLiputanKegiatan />
        <HistoryPenerbitanBerita />
        <HistoryPeminjamanAlat />
        <HistoryKemitraan />
      </div>
    </>
  );
};

export default History;
