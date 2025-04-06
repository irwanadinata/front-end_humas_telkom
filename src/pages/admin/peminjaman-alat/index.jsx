import Header from "@/components/layout/header";
import Layout from "@/components/layout/layout";
import { useEffect, useState } from "react";
import { getPeminjamanAlat } from "@/utils/api/peminjaman-alat";
import TableData from "./components/peminjaman-alat-table";
import { columns } from "./components/peminjaman-alat-coloms";
import TableHeader from "@/components/table/table-header";
import TableLayout from "@/components/table/table-layout";

function PeminjamanAlat() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeminjamanAlat()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setData([]);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <Header titleHeader="Peminjaman Alat" />
      <TableLayout>
        <TableHeader heading="List Peminjaman Alat" />
        <TableData data={data} columns={columns} loading={loading} />
      </TableLayout>
    </Layout>
  );
}

export default PeminjamanAlat;
