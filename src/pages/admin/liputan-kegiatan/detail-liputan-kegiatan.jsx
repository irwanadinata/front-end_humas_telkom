import Header from "@/components/layout/header";
import Layout from "@/components/layout/layout";
import LiputanKegiatanForm from "./components/form";
import FormLayout from "./components/form-layout";
import FormHeader from "./components/form-header";
import { useParams, useSearchParams } from "react-router-dom";

function DetailLiputanKegiatan() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const isEdit = searchParams.get("edit");
  const action = isEdit ? "edit" : "detail";

  return (
    <Layout>
      <Header titleHeader="Liputan Kegiatan" />
      <FormLayout>
        <FormHeader title={action} />
        <LiputanKegiatanForm action={action} id={id} />
      </FormLayout>
    </Layout>
  );
}

export default DetailLiputanKegiatan;