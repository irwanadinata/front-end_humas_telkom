import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/pages/auth/index";
// import ProtectedRoute from "./protected-route";
import { AuthProvider } from "@/utils/context/auth-context";
import Register from "@/pages/auth/register";
import DashboardAdmin from "@/pages/admin/dashboard/index";
import Kemitraan from "@/pages/admin/kemitraan/index";
import LiputanKegiatan from "@/pages/admin/liputan-kegiatan/index"
import PeminjamanAlat from "@/pages/admin/peminjaman-alat/index"
import PenerbitanBerita from "@/pages/admin/penerbitan-berita/index"
import DetailLiputanKegiatan from "@/pages/admin/liputan-kegiatan/detail-liputan-kegiatan";
import DashboardUser from "@/pages/user/dashboard";
import NotFound from "@/pages/404/index"
import DetailPenerbitanBerita from "@/pages/admin/penerbitan-berita/detail-penerbitan-berita";
import DetailPeminjamanAlat from "@/pages/admin/peminjaman-alat/detail-peminjaman-alat";
import DetailKemitraan from "@/pages/admin/kemitraan/detail-kemitraan";
import LiputanKegiatanUser from "@/pages/user/liputan-kegiatan";
import PenerbitanBeritaUser from "@/pages/user/penerbitan-berita";
import PeminjamanAlatUser from "@/pages/user/peminjaman-alat";
import KemitraanUser from "@/pages/user/kemitraan";

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
    {
      path: "admin/peminjaman-alat",
      element: (  
          <PeminjamanAlat />
      ),
    },
    {
      path: "admin/peminjaman-alat/:id",
      element: (  
          <DetailPeminjamanAlat />
      ),
    },
    {
      path: "admin/kemitraan",
      element: (
          <Kemitraan />
      ),
    },
    {
      path: "admin/kemitraan/:id",
      element: (
          <DetailKemitraan/>
      ),
    },
    {
      path: "user/dashboard",
      element: (
         <DashboardUser/>
      ),
    },
    {
      path: "user/liputan-kegiatan",
      element: (
        <LiputanKegiatanUser/>
      )
    },
    {
      path: "user/penerbitan-berita",
      element: (
        <PenerbitanBeritaUser/>
      )
    },
    {
      path: "user/peminjaman-alat",
      element: (
        <PeminjamanAlatUser/>
      )
    },
    {
      path: "user/kemitraan",
      element: (
        <KemitraanUser/>
      )
    }
    
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}