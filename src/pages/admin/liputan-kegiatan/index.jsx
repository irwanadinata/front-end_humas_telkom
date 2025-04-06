import Header from "@/components/layout/header";
import Layout from "@/components/layout/layout";
import { useEffect, useState } from "react";
import { getLiputanKegiatan } from "@/utils/api/liputan-kegiatan";
import TableData from "./components/liputan-kegiatan-table";
import { columns } from "./components/liputan-kegiatan-coloms";
import TableHeader from "@/components/table/table-header";
import TableLayout from "@/components/table/table-layout";

function LiputanKegiatan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getLiputanKegiatan()
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
      <Header titleHeader="Liputan Kegiatan" />
      <TableLayout>
        <TableHeader heading="List Liputan Kegiatan"/>
        <TableData data={data} columns={columns} loading={loading} />
      </TableLayout>
    </Layout>
  );
}

export default LiputanKegiatan;
