import Header from "@/components/layout/header";
import Layout from "@/components/layout/layout";
import { useEffect, useState } from "react";
import { getPenerbitanBerita } from "@/utils/api/penerbitan-berita";
import TableData from "./components/penerbitan-berita-table";
import { columns } from "./components/penerbitan-berita-coloms";
import TableHeader from "@/components/table/table-header";
import TableLayout from "@/components/table/table-layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function PenerbitanBerita() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPenerbitanBerita()
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
      <Header titleHeader="Penerbitan Berita" />
      <TableLayout>
        <TableHeader heading="List Penerbitan Berita" hasAction={true}>
            <div className="flex justify-end">
            <Button
            id="btn-add-penerbitan-berita"
            size="sm"
            className="rounded-full bg-[#bf131d] hover:bg-[#bf131d]/80"
            asChild
          >
            <Link to="/admin/penerbitan-berita/create">Buat Penerbitan Berita</Link>
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

export default PenerbitanBerita;