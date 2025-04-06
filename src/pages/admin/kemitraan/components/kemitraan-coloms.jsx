import { Link } from "react-router-dom";
import PencilIcon from "@/assets/icon/pencil";
import InfoIcon from "@/assets/icon/info";
import { Button } from "@/components/ui/button";
import ButtonDelete from "@/pages/admin/kemitraan/components/alert-dialog";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    header: "No",
    accessorFn: (originalRow, index) => index + 1,
  },
  {
    header: "Nama",
    accessorKey: "nama",
  },
  {
    header: "Perusahaan",
    accessorKey: "perusahaan",
  },
  {
    header: "Posisi",
    accessorKey: "posisi",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Nomor WA",
    accessorKey: "nomorwa",
  },
  {
    header: "Deskripsi",
    accessorKey: "tanggal",
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
        case "accepted":
          status = "Diterima";
          break;
        case "rejected":
          status = "Ditolak";
          break;
        default:
          status = originalStatus;
          break;
      }

      const badgeClass =
        status === "Menunggu"
          ? "border-[#FFAF0F] bg-white hover:bg-[#FFAF0F] text-[#FFAF0F] hover:text-white"
          : status === "Ditolak"
          ? "border-[#E31F1F] bg-white hover:bg-[#E31F1F] text-[#E31F1F] hover:text-white"
          : "border-[#166648] bg-white hover:bg-[#166648] text-[#166648] hover:text-white";

      return (
        <Badge className={`font-bold flex w-24 py-2 justify-center border ${badgeClass}`}>
          {status}
        </Badge>
      );
    },
  },

  {
    header: "Aksi",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <div className="flex gap-2">
          <Button
            asChild
            size="icon"
            className="bg-[#E28100] hover:bg-[#E28100]/80"
            style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
          >
            <Link to={`/admin/kemitraan/${id}?edit=true`}>
              <PencilIcon className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="icon"
            id={`btn-detail-kemitraan-${id}`}
            className="bg-[#166648] hover:bg-[#166648]/80"
            style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
          >
            <Link to={`/admin/kemitraan/${id}`}>
              <InfoIcon className="w-4 h-4" />
            </Link>
          </Button>
          <ButtonDelete id={id} />
        </div>
      );
    },
  },
];