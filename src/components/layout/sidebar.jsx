import { NavLink } from "react-router-dom";
import { House, Newspaper, Handshake, Cctv, Printer, Download } from "lucide-react";
import logotelu1 from "@/assets/logo/telu-logo1.png"

function Sidebar({ isOpen }) {
  return (
    <div
      style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
      className={`${
        isOpen ? "w-72" : "w-20"
      } h-screen bg-white shadow-xl duration-300`}
    >
      <div className="flex justify-center items-center py-5 mb-5">
        <img src={logotelu1} style={{ width: "80px" }} alt="Tel-U Logo" />
      </div>
      <ul className={`flex flex-col ${isOpen && "gap-4"}`}>
        <li>
          <p
            className={`text-slate-500 text-xs font-medium ms-3 ${
              !isOpen && "hidden"
            }`}
          >
            DASHBOARD
          </p>
          <NavLink
            id="navigate-to-dashboard"
            to="/admin/dashboard"
            className={({ isActive }) =>
              `text-slate-400 text-sm cursor-pointer h-14 flex hover:bg-slate-200 ${
                isActive ? "bg-[#E5E9F4]" : ""
              }`
            }
          >
            {({ isActive }) => (
              <div
                className={`flex w-full py-2 self-center gap-3 border-l-[5px] ${
                  isActive ? "border-[#bf131d]" : "border-transparent"
                } ${!isOpen ? "justify-center" : "gap-2"}`}
              >
                <House
                  className={`w-5 h-5 ${isOpen ? "ms-3" : "ms-[-5px]"} ${
                    isActive ? "text-[#bf131d]" : "text-[#4B4B4B99]"
                  }`}
                />
                <span
                  className={`font-bold whitespace-nowrap ${
                    !isOpen && "hidden"
                  } ${isActive ? "text-[#bf131d]" : "text-[#4B4B4B99]"}`}
                >
                  Dashboard
                </span>
              </div>
            )}
          </NavLink>
        </li>

        <li>
          <p
            className={`text-slate-500 text-xs font-medium ms-3 ${
              !isOpen && "hidden"
            }`}
          >
            LAYANAN
          </p>
          <NavLink
            id="navigate-to-liputan-kegiatan"
            to="/admin/liputan-kegiatan"
            className={({ isActive }) =>
              `text-slate-400 text-sm cursor-pointer h-14 flex hover:bg-slate-200 ${
                isActive ? "bg-[#E5E9F4]" : ""
              }`
            }
          >
            {({ isActive }) => (
              <div
                className={`flex w-full py-2 self-center gap-3 border-l-[5px] ${
                  isActive ? "border-[#bf131d]" : "border-transparent"
                } ${!isOpen ? "justify-center" : "gap-2"}`}
              >
                <Cctv
                  className={`w-5 h-5 ${isOpen ? "ms-3" : "ms-[-5px]"} ${
                    isActive ? "text-[#bf131d]" : "text-[#4B4B4B99]"
                  }`}
                />
                <span
                  className={`font-bold whitespace-nowrap ${
                    !isOpen && "hidden"
                  } ${isActive ? "text-[#bf131d]" : "text-[#4B4B4B99]"}`}
                >
                  Liputan Kegiatan
                </span>
              </div>
            )}
          </NavLink>
          <NavLink
            id="navigate-to-berita"
            to="/admin/penerbitan-berita"
            className={({ isActive }) =>
              `text-slate-400 text-sm cursor-pointer h-14 flex hover:bg-slate-200 ${
                isActive ? "bg-[#E5E9F4]" : ""
              }`
            }
          >
            {({ isActive }) => (
              <div
                className={`flex w-full py-2 self-center gap-3 border-l-[5px] ${
                  isActive ? "border-[#bf131d]" : "border-transparent"
                } ${!isOpen ? "justify-center" : "gap-2"}`}
              >
                <Newspaper
                  className={`w-5 h-5 ${isOpen ? "ms-3" : "ms-[-5px]"} ${
                    isActive ? "text-[#bf131d]" : "text-[#4B4B4B99]"
                  }`}
                />
                <span
                  className={`font-bold whitespace-nowrap ${
                    !isOpen && "hidden"
                  } ${isActive ? "text-[#bf131d]" : "text-[#4B4B4B99]"}`}
                >
                  Penerbitan Berita
                </span>
              </div>
            )}
          </NavLink>
          <NavLink
            id="navigate-to-peminjaman-alat"
            to="/admin/peminjaman-alat"
            className={({ isActive }) =>
              `text-slate-400 text-sm cursor-pointer h-14 flex hover:bg-slate-200 ${
                isActive ? "bg-[#E5E9F4]" : ""
              }`
            }
          >
            {({ isActive }) => (
              <div
                className={`flex w-full py-2 self-center gap-3 border-l-[5px] ${
                  isActive ? "border-[#bf131d]" : "border-transparent"
                } ${!isOpen ? "justify-center" : "gap-2"}`}
              >
                <Printer
                  className={`w-5 h-5 ${isOpen ? "ms-3" : "ms-[-5px]"} ${
                    isActive ? "text-[#bf131d]" : "text-[#4B4B4B99]"
                  }`}
                />
                <span
                  className={`font-bold whitespace-nowrap ${
                    !isOpen && "hidden"
                  } ${isActive ? "text-[#bf131d]" : "text-[#4B4B4B99]"}`}
                >
                  Peminjaman Alat
                </span>
              </div>
            )}
          </NavLink>
          <NavLink
            id="navigate-to-kemitraan"
            to="/admin/kemitraan"
            className={({ isActive }) =>
              `text-slate-400 text-sm cursor-pointer h-14 flex hover:bg-slate-200 ${
                isActive ? "bg-[#E5E9F4]" : ""
              }`
            }
          >
            {({ isActive }) => (
              <div
                className={`flex w-full py-2 self-center gap-3 border-l-[5px] ${
                  isActive ? "border-[#bf131d]" : "border-transparent"
                } ${!isOpen ? "justify-center" : "gap-2"}`}
              >
                <Handshake
                  className={`w-5 h-5 ${isOpen ? "ms-3" : "ms-[-5px]"} ${
                    isActive ? "text-[#bf131d]" : "text-[#4B4B4B99]"
                  }`}
                />
                <span
                  className={`font-bold whitespace-nowrap ${
                    !isOpen && "hidden"
                  } ${isActive ? "text-[#bf131d]" : "text-[#4B4B4B99]"}`}
                >
                  Kemitraan
                </span>
              </div>
            )}
          </NavLink>
          <NavLink
            id="navigate-to-download-template"
            to="https://drive.google.com/drive/folders/1G07h5_-Glbb6WStUjff_ubC0YKaHYStP"
            className={({ isActive }) =>
              `text-slate-400 text-sm cursor-pointer h-14 flex hover:bg-slate-200 ${
                isActive ? "bg-[#E5E9F4]" : ""
              }`
            }
          >
            {({ isActive }) => (
              <div
                className={`flex w-full py-2 self-center gap-3 border-l-[5px] ${
                  isActive ? "border-[#bf131d]" : "border-transparent"
                } ${!isOpen ? "justify-center" : "gap-2"}`}
              >
                <Download
                  className={`w-5 h-5 ${isOpen ? "ms-3" : "ms-[-5px]"} ${
                    isActive ? "text-[#bf131d]" : "text-[#4B4B4B99]"
                  }`}
                />
                <span
                  className={`font-bold whitespace-nowrap ${
                    !isOpen && "hidden"
                  } ${isActive ? "text-[#bf131d]" : "text-[#4B4B4B99]"}`}
                >
                  Download Template
                </span>
              </div>
            )}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
