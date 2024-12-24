import React from "react";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import logotelu2 from "@/assets/logo/telu-logo2.png";

export const LayoutLogin = ({ children, label, id }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#F4F6F9] min-h-screen px-4">
      <div className="w-full max-w-md bg-white">
        <div className="flex flex-col items-center bg-[#F4F6F9]">
          <img
            src={logotelu2}
            alt="logo"
            className="w-32 h-32 md:w-[9rem] md:h-[9rem]"
          />
        </div>
        <hr className="border-2 border-[#bf131d] w-full" />
        <div className="px-4 py-6 md:px-8 md:py-8">
          <div
            className="flex items-center gap-2 mb-4"
          >
            <Label htmlFor={id} className="text-lg md:text-xl font-bold">
              {label}
            </Label>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
