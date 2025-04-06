import { Skeleton } from "@/components/ui/skeleton";

function Card({ children, title, count , loading }) {
  return (
    <div className="bg-[#FFFF] p-6 border rounded-xl flex items-center gap-4 shadow-md hover:shadow-lg hover:bg-[#F4F6F9] transition-all h-32">
      <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-[#bf131d] text-[#FFFF]">
        {children}
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-[16px] font-bold pb-1">{title}</p>
        {loading ? (
          <Skeleton className="h-6 w-20" />
        ) : (
          <div className="flex items-center">
            <p className="text-[#bf131d] text-2xl font-bold pr-2">{count}</p>
            <p className="font-semibold text-gray-500">Total Data</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
