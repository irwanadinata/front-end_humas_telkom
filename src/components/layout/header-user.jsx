import { useNavigate } from "react-router-dom";
import ArrowLeft from "@/assets/icon/arrow-left";

const HeaderUser = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-16 px-6 items-center gap-3 border-b-[1px] shadow-md">
      <div className="cursor-pointer" onClick={() => navigate("/user/dashboard")}>
        <ArrowLeft className="w-4 h-4 text-[#bf131d]" />
      </div>
      <h3 className="text-lg font-bold text-[#bf131d]">{title}</h3>
    </div>
  );
};

export default HeaderUser;
