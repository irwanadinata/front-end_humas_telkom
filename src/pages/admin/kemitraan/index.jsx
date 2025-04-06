import Header from "@/components/layout/header";
import Layout from "@/components/layout/layout";
import { useEffect, useState } from "react";
import { getKemitraan } from "@/utils/api/kemitraan";
import TableData from "./components/kemitraan-table";
import { columns } from "./components/kemitraan-coloms";
import TableHeader from "@/components/table/table-header";
import TableLayout from "@/components/table/table-layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Kemitraan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getKemitraan()
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
      <Header titleHeader="Kemitraan" />
      <TableLayout>
        <TableHeader heading="List Kemitraan" hasAction={true}>
            <div className="flex justify-end">
            <Button
            id="btn-add-kemitraan"
            size="sm"
            className="rounded-full bg-[#bf131d] hover:bg-[#bf131d]/80"
            asChild
          >
            <Link to="/admin/kemitraan/create">Buat Liputan</Link>
          </Button>
            </div>
          
        </TableHeader>
        <TableData
          data={data}
          columns={columns}
          loading={loading}
        />
      </TableLayout>
    </Layout>
  );
}

export default Kemitraan;