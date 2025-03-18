import image404 from "@/assets/logo/404-image.png";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <img
          src={image404}
          alt="404 Image"
          className="h-80 w-80 mx-auto my-auto"
        />
      </div>
      <div className="text-center mt-4 font-bold text-[#bf131d]">
        Maaf, halaman yang Anda cari tidak ditemukan
      </div>
    </div>
  );
};

export default Index;