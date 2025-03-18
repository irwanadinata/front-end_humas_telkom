import Header from "@/components/layout/header";
import Layout from "@/components/layout/layout";
import PeminjamanAlatForm from "./components/form";
import FormLayout from "./components/form-layout";
import FormHeader from "./components/form-header";
import { useParams, useSearchParams } from "react-router-dom";

function DetailPeminjamanAlat() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const isEdit = searchParams.get("edit");
  let action = "detail";

  if (isEdit) {
    action = "edit";
  }

  return (
    <Layout>
      <Header titleHeader="Peminjaman Alat" />
      <FormLayout>
        <FormHeader title={action} />
        <PeminjamanAlatForm action={action} id={id} />
      </FormLayout>
    </Layout>
  );
}

export default DetailPeminjamanAlat;