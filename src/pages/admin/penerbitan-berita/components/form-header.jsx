import { useNavigate } from "react-router-dom";
import ArrowLeft from "@/assets/icon/arrow-left";

const FormHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-16 px-8 items-center gap-3 border-b-[1px]">
      <div className="cursor-pointer" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 text-[#bf131d]" />
      </div>
      <h3 className="text-lg font-bold text-[#bf131d]">
        {title === "edit"
          ? "Edit Penerbitan Berita"
          : title === "detail"
          ? "Detail Penerbitan Berita"
          : title === "add"
          ? "Tambah Penerbitan Berita"
          : ""}
      </h3>
    </div>
  );
};

export default FormHeader;