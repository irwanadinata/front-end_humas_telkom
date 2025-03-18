import Header from "@/components/layout/header";
import Layout from "@/components/layout/layout";
import PenerbitanBeritaForm from "./components/form";
import FormLayout from "./components/form-layout";
import FormHeader from "./components/form-header";
import { useParams, useSearchParams } from "react-router-dom";

function DetailPenerbitanBerita() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const isEdit = searchParams.get("edit");
  let action = "detail";

  if (isEdit) {
    action = "edit";
  }

  return (
    <Layout>
      <Header titleHeader="Liputan Kegiatan" />
      <FormLayout>
        <FormHeader title={action} />
        <PenerbitanBeritaForm action={action} id={id} />
      </FormLayout>
    </Layout>
  );
}

export default DetailPenerbitanBerita;