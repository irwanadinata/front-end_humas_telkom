import TableData from "./table";
import { useState, useEffect } from "react";
import { getPenerbitanBeritaByUser } from "@/utils/api/history";
import { columns } from "./coloms";

function Index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPenerbitanBeritaByUser()
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
    <>
      <h1 className="text-[#bf131d] font-bold text-center pb-4 pt-6  border-t border-gray-300">Layanan Penerbitan Berita</h1>
      <TableData data={data} columns={columns} loading={loading} />
    </>
  );
}

export default Index;
