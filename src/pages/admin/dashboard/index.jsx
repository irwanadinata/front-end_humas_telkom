import Layout from "@/components/layout/layout";
// import Header from "@/components/header";
// import Cards from "./components/card";
// import { User } from "lucide-react";
// import HandIcon from "@/assets/icon/hand";
// import RankingIcon from "@/assets/icon/ranking";
// import { useEffect, useState } from "react";
// import { getTotalDataUser,getTotalDataQuestions, getTotalDataRanking } from "@/utils/api/dashboard";

function DashboardAdmin() {
//   const [loading, setLoading] = useState(true);
//   const [totalDataUser, setTotalDataUser] = useState(0);
//   const [totalDataQuestions, setTotalDataQuestions] = useState(0);
//   const [totalDataRanking, setTotalDataRanking] = useState(0);

//   const fetchTotalDataUser = async () => {
//     try {
//       const total = await getTotalDataUser();
//       setTotalDataUser(total);
//     } catch (error) {
//       console.error("Error fetching customer data:", error);
//     }
//   };

//   const fetchTotalDataQuestions = async () => {
//     try {
//       const total = await getTotalDataQuestions();
//       setTotalDataQuestions(total);
//     } catch (error) {
//       console.error("Error fetching customer data:", error);
//     }
//   };

//   const fetchTotalDataRanking = async () => {
//     try {
//       const total = await getTotalDataRanking();
//       setTotalDataRanking(total);
//     } catch (error) {
//       console.error("Error fetching customer data:", error);
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     try {
//       Promise.all([
//         fetchTotalDataUser(),
//         fetchTotalDataQuestions(),
//         fetchTotalDataRanking(),
//       ]).then(() => {
//         setLoading(false);
//       });
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   }, []);

  return (
    <Layout>
      {/* <Header titleHeader="Dashboard" />
      <div className="w-full flex gap-3 mt-6">
        <Cards title="Liputan Kegiatan" loading={loading} count={totalDataKegiatan}>
          <User className="text-white w-9 h-9" />
        </Cards>
        <Cards loading={loading} title="Berita" count={totalDataBerita}>
          <HandIcon className="text-white w-9 h-9" />
        </Cards>
        <Cards loading={loading} title="Ranking" count={totalDataRanking}>
          <RankingIcon className="text-white w-9 h-9" />
        </Cards>
      </div> */}
    </Layout>
  );
}

export default DashboardAdmin;