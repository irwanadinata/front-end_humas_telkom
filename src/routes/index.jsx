import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/pages/auth/index";
// import ProtectedRoute from "./protected-route";
import { AuthProvider } from "@/utils/context/auth-context";
import Register from "@/pages/auth/register";
import DashboardAdmin from "@/pages/admin/dashboard/index";
// import Kemitraan from "@/pages/admin/kemitraan/index";
import LiputanKegiatan from "@/pages/admin/liputan-kegiatan/index"
// import PeminjamanAlat from "@/pages/admin/peminjaman-alat/index"
import PenerbitanBerita from "@/pages/admin/penerbitan-berita/index"
import DetailLiputanKegiatan from "@/pages/admin/liputan-kegiatan/detail-liputan-kegiatan";
import DashboardUser from "@/pages/user/dashboard";
import NotFound from "@/pages/404/index"
import DetailPenerbitanBerita from "@/pages/admin/penerbitan-berita/detail-penerbitan-berita";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound/>,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "admin/dashboard",
      element: (
          <DashboardAdmin />
      ),
    },
    {
      path: "admin/liputan-kegiatan",
      element: (
          <LiputanKegiatan />
      ),
    },
    {
      path: "admin/liputan-kegiatan/:id",
      element: (
          <DetailLiputanKegiatan />
      ),
    },
    // {
    //   path: "admin/liputan-kegiatan/create",
    //   element: (
    //     <ProtectedRoute>
    //       <AddUser />
    //     </ProtectedRoute>
    //   ),
    // },
    {
      path: "admin/penerbitan-berita",
      element: (
          <PenerbitanBerita />
      ),
    },
    {
      path: "admin/penerbitan-berita/:id",
      element: (
          <DetailPenerbitanBerita />
      ),
    },
    // {
    //   path: "admin/penerbitan-berita/create",
    //   element: (
    //       <AddUser />
    //   ),
    // },
    // {
    //   path: "admin/peminjaman-alat",
    //   element: (
    //     <ProtectedRoute>
    //       <PeminjamanAlat />
    //     </ProtectedRoute>
    //   ),
    // },
    // {
    //   path: "admin/peminjaman-alat/:id",
    //   element: (
    //     <ProtectedRoute>
    //       <DetailQuestion />
    //     </ProtectedRoute>
    //   ),
    // },
    // {
    //   path: "admin/peminjaman-alat/create",
    //   element: (
    //     <ProtectedRoute>
    //       <AddQuestion />
    //     </ProtectedRoute>
    //   ),
    // },
    // {
    //   path: "admin/kemitraan",
    //   element: (
    //     <ProtectedRoute>
    //       <Kemitraan />
    //     </ProtectedRoute>
    //   ),
    // },
    // {
    //   path: "admin/kemitraan/:id",
    //   element: (
    //     <ProtectedRoute>
    //       <Ranking />
    //     </ProtectedRoute>
    //   ),
    // },
    // {
    //   path: "admin/kemitraan/create",
    //   element: (
    //     <ProtectedRoute>
    //       <AddQuestion />
    //     </ProtectedRoute>
    //   ),
    // },
    {
      path: "user/dashboard",
      element: (
         <DashboardUser/>
      ),
    },
    
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}