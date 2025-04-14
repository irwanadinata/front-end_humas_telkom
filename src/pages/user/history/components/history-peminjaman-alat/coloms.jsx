import { Badge } from "@/components/ui/badge";
import { formatTanggal } from "@/utils/formatter/date";

export const columns = [
  {
    header: "No",
    accessorFn: (originalRow, index) => index + 1,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const originalStatus = row.original.status;
      let status = "Menunggu";

      switch (originalStatus) {
        case "pending":
          status = "Menunggu";
          break;
        case "returned":
          status = "Dikembalikan";
          break;
        case "borrowed":
          status = "Dipinjam";
          break;
        default:
          status = originalStatus;
          break;
      }

      const badgeClass =
        status === "Menunggu"
          ? "border-[#FFAF0F] bg-white hover:bg-[#FFAF0F] text-[#FFAF0F] hover:text-white"
          : status === "Dipinjam"
          ? "border-[#E31F1F] bg-white hover:bg-[#E31F1F] text-[#E31F1F] hover:text-white"
          : "border-[#166648] bg-white hover:bg-[#166648] text-[#166648] hover:text-white";

      return (
        <Badge
          className={`font-bold flex w-24 py-2 justify-center border ${badgeClass}`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    header: "Nama",
    accessorKey: "nama",
  },
  {
    header: "NIM",
    accessorKey: "nim",
  },
  {
    header: "Nomor WA",
    accessorKey: "nomorwa",
  },
  {
    header: "Keperluan",
    accessorKey: "keperluan",
  },
  {
    header: "Tanggal Mulai",
    accessorKey: "tanggal_mulai",
    cell: ({ getValue }) => formatTanggal(getValue()),
  },
  {
    header: "Tanggal Selesai",
    accessorKey: "tanggal_selesai",
    cell: ({ getValue }) => formatTanggal(getValue()),
  },
  {
    header: "Lampiran",
    accessorKey: "lampiran",
  },
];
