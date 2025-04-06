import logotelu1 from "@/assets/logo/telu-logo1.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const NavbarUser = () => {
  const [name, setName] = useState("Irwan Adinata");

  // Fungsi untuk membatasi maksimal kata nama
  const truncateText = (text, maxChars) => {
    if (text.length > maxChars) {
      return text.slice(0, maxChars);
    }
    return text;
  };

  useEffect(() => {});

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
              <div className="px-3 py-2 text-[#F64C4C] cursor-pointer flex gap-2">
                <LogOut className="w-5 h-5" />
                <p className="mt-[-0.125rem]">Keluar</p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
