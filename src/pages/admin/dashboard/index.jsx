import Layout from "@/components/layout/layout";
import Header from "@/components/layout/header";
import Cards from "./components/card";
import { useEffect, useState } from "react";
import {
  getTotalDataLiputanKegiatan,
  getTotalDataPenerbitanBerita,
  getTotalDataPeminjamanAlat,
  getTotalDataKemitraan,
} from "@/utils/api/dashboard";
import { Newspaper, Handshake, Cctv, Printer } from "lucide-react";
import { NavLink } from "react-router-dom";

function DashboardAdmin() {
  const [loading, setLoading] = useState(true);
  const [totalDataLiputanKegiatan, setTotalDataLiputanKegiatan] = useState(0);
  const [totalDataPenerbitanBerita, setTotalDataPenerbitanBerita] = useState(0);
  const [totalDataPeminjamanAlat, setTotalDataPeminjamanAlat] = useState(0);
  const [totalDataKemitraan, setTotalDataKemitraan] = useState(0);

  const fetchTotalDataLiputanKegiatan = async () => {
    try {
      const total = await getTotalDataLiputanKegiatan();
      setTotalDataLiputanKegiatan(total);
    } catch (error) {
      console.error("Error fetching total data liputan kegiatan:", error);
    }
  };

  const fetchTotalDataPenerbitanBerita = async () => {
    try {
      const total = await getTotalDataPenerbitanBerita();
      setTotalDataPenerbitanBerita(total);
    } catch (error) {
      console.error("Error fetching total data penerbitan berita:", error);
    }
  };

  const fetchTotalDataPeminjamanAlat = async () => {
    try {
      const total = await getTotalDataPeminjamanAlat();
      setTotalDataPeminjamanAlat(total);
    } catch (error) {
      console.error("Error fetching total data peminjaman alat:", error);
    }
  };
  const fetchTotalDataKemitraan = async () => {
    try {
      const total = await getTotalDataKemitraan();
      setTotalDataKemitraan(total);
    } catch (error) {
      console.error("Error fetching total data kemitraan:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    try {
      Promise.all([
        fetchTotalDataLiputanKegiatan(),
        fetchTotalDataPenerbitanBerita(),
        fetchTotalDataPeminjamanAlat(),
        fetchTotalDataKemitraan(),
      ]).then(() => {
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  return (
    <Layout>
      <Header titleHeader="Dashboard" />
      <div className="grid grid-cols-2 gap-6 p-4">
        <NavLink to="/admin/liputan-kegiatan">
          <Cards
            title="Liputan Kegiatan"
            loading={loading}
            count={totalDataLiputanKegiatan}
          >
            <Cctv className="w-8 h-8" />
          </Cards>
        </NavLink>
        <NavLink to="/admin/penerbitan-berita">
          <Cards
            title="Penerbitan Berita"
            loading={loading}
            count={totalDataPenerbitanBerita}
          >
            <Newspaper className="w-8 h-8" />
          </Cards>
        </NavLink>
        <NavLink to="/admin/peminjaman-alat">
          <Cards
            title="Peminjaman Alat"
            loading={loading}
            count={totalDataPeminjamanAlat}
          >
            <Printer className="w-8 h-8" />
          </Cards>
        </NavLink>
        <NavLink to="/admin/kemitraan">
          <Cards title="Kemitraan" loading={loading} count={totalDataKemitraan}>
            <Handshake className="w-8 h-8" />
          </Cards>
        </NavLink>
      </div>
    </Layout>
  );
}

export default DashboardAdmin;
