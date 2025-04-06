import {
  Newspaper,
  Handshake,
  Cctv,
  Printer,
  Download,
  History,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import NavbarUser from "@/components/layout/navbar-user";

function DashboardUser() {
  return (
    <div className="bg-[#F4F6F9] min-h-screen">
      <NavbarUser />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 p-5 lg:gap-16 lg:p-16">
        <NavLink to="/user/history">
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center lg:h-40 hover:bg-[#bf131d] hover:text-[#FFFF] active:bg-[#a8393b]">
            <History className="mb-2 " />
            <p>Riwayat</p>
            <p>Pengajuan</p>
          </div>
        </NavLink>

        <NavLink to="/user/liputan-kegiatan">
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center lg:h-40 hover:bg-[#bf131d] hover:text-[#FFFF] active:bg-[#a8393b]">
            <Cctv className="mb-2 " />
            <p className="text-">Layanan</p>
            <p>Liputan Kegiatan</p>
          </div>
        </NavLink>

        <NavLink to="/user/penerbitan-berita">
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center lg:h-40 hover:bg-[#bf131d] hover:text-[#FFFF] active:bg-[#a8393b]">
            <Newspaper className="mb-2 " />
            <p>Layanan</p>
            <p>Penerbitan Berita</p>
          </div>
        </NavLink>

        <NavLink to="/user/peminjaman-alat">
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center lg:h-40 hover:bg-[#bf131d] hover:text-[#FFFF] active:bg-[#a8393b]">
            <Printer className="mb-2 " />
            <p>Layanan</p>
            <p>Peminjaman Alat</p>
          </div>
        </NavLink>

        <NavLink to="/user/kemitraan">
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center lg:h-40 hover:bg-[#bf131d] hover:text-[#FFFF] active:bg-[#a8393b]">
            <Handshake className="mb-2 " />
            <p>Layanan</p>
            <p>Kemitraan</p>
          </div>
        </NavLink>

        <a
          href="https://drive.google.com/drive/folders/1G07h5_-Glbb6WStUjff_ubC0YKaHYStP"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center lg:h-40 hover:bg-[#bf131d] hover:text-[#FFFF] active:bg-[#a8393b]">
            <Download className="mb-2 " />
            <p>Download</p>
            <p>Template</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default DashboardUser;
