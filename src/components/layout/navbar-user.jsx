import logotelu1 from "@/assets/logo/telu-logo1.png";
import Swal from "sweetalert2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProfile } from "@/utils/api/dashboard";
import { LogOut } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/context/auth-context"; 

const NavbarUser = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const {logout } = useAuth();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  // Fungsi untuk membatasi maksimal kata nama
  const truncateText = (text, maxChars) => {
    if (!text) return "";
    if (text.length > maxChars) {
      return text.slice(0, maxChars);
    }
    return text;
  };
  
  const fetchName = async () => {
    try {
      const response = await getProfile();
      setName(response.nama);
    } catch (error) {
      console.error("Gagal mengambil profil user:", error);
    }
  };
  
  const handleLogout = () => {
    logout();
    Toast.fire({
      icon: "success",
      title: "Logout berhasil!",
    });
    navigate("/");
  };

  useEffect(() => {
    fetchName();
  }, []);

  return (
    <div className="bg-gradient-to-l from-[#bf131d] via-[#bf131d] to-[#580c0e] py-4">
      <div className="flex justify-between items-center mx-auto px-6">
        <div className="flex items-center lg:ml-[5%] gap-4">
          <NavLink to="/user/dashboard">
            <img
              src={logotelu1}
              alt="logo"
              className="w-10 h-10 md:w-14 md:h-14"
            />
          </NavLink>

          <p className="text-[#FFFF] font-bold text-sm leading-tight block lg:hidden">
            Layanan HUMAS <br /> Universitas Telkom <br /> Purwokerto
          </p>
          <p className="text-[#FFFF] font-bold text-base leading-tight hidden lg:block">
            Layanan HUMAS <br /> Universitas Telkom Purwokerto
          </p>
        </div>
        <div className="flex text-[#FFFF] text-sm md:text-base lg:text-base font-semibold lg:mr-[5%]">
          <DropdownMenu>
            <DropdownMenuTrigger
              id="toggling-profile-dropdown"
              className="text-white flex items-center gap-x-0 lg:gap-x-2"
            >
              <p className="md:hidden block">Hi, {truncateText(name, 6)}</p>
              <p className="hidden md:block">Hi, {truncateText(name, 20)}</p>
              <ChevronDown />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <div className="px-3 py-2 text-[#F64C4C] cursor-pointer flex gap-2" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
                <p className="mt-[-0.125rem]" >Keluar</p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
