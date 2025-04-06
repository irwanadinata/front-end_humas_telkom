import { Rabbit } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <Rabbit className="text-[#bf131d]"/>
      </div>
      <div className="text-center mt-4 font-semibold text-[#bf131d]">
        Maaf, halaman yang Anda cari tidak ditemukan
      </div>
    </div>
  );
};

export default Index;