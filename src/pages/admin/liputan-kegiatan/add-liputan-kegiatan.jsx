import Header from "@/components/header";
import Layout from "@/components/layout";
import LiputanKegiatanForm from "./components/form";
import FormLayout from "./components/form-layout";
import FormHeader from "./components/form-header";

function AddLiputanKegiatan() {
  return (
    <Layout>
      <Header titleHeader="Liputan Kegiatan" />
      <FormLayout>
        <FormHeader title="add" />
        <LiputanKegiatanForm action="add" />
      </FormLayout>
    </Layout>
  );
}

export default AddLiputanKegiatan;