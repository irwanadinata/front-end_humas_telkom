import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/pages/auth/index";
import ProtectedRoute from "./protected-route";
import { AuthProvider } from "@/utils/context/auth-context";
import Register from "@/pages/auth/register";
import DashboardAdmin from "@/pages/admin/dashboard/index";
import Kemitraan from "@/pages/admin/kemitraan/index";
import LiputanKegiatan from "@/pages/admin/liputan-kegiatan/index";
import PeminjamanAlat from "@/pages/admin/peminjaman-alat/index";
import PenerbitanBerita from "@/pages/admin/penerbitan-berita/index";
import DetailLiputanKegiatan from "@/pages/admin/liputan-kegiatan/detail-liputan-kegiatan";
import DashboardUser from "@/pages/user/dashboard";
import NotFound from "@/pages/404/index";
import DetailPenerbitanBerita from "@/pages/admin/penerbitan-berita/detail-penerbitan-berita";
import DetailPeminjamanAlat from "@/pages/admin/peminjaman-alat/detail-peminjaman-alat";
import DetailKemitraan from "@/pages/admin/kemitraan/detail-kemitraan";
import LiputanKegiatanUser from "@/pages/user/liputan-kegiatan";
import PenerbitanBeritaUser from "@/pages/user/penerbitan-berita";
import PeminjamanAlatUser from "@/pages/user/peminjaman-alat";
import KemitraanUser from "@/pages/user/kemitraan";
import History from "@/pages/user/history";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />,
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
        <ProtectedRoute roleAllowed="admin">
          <DashboardAdmin />
        </ProtectedRoute>
      ),
    },
    {
      path: "admin/liputan-kegiatan",
      element: (
        <ProtectedRoute roleAllowed="admin">
          <LiputanKegiatan />
        </ProtectedRoute>
      ),
    },
    {
      path: "admin/liputan-kegiatan/:id",
      element: (
        <ProtectedRoute roleAllowed="admin">
          <DetailLiputanKegiatan />
        </ProtectedRoute>
      ),
    },
    {
      path: "admin/penerbitan-berita",
      element: (
        <ProtectedRoute roleAllowed="admin">
          <PenerbitanBerita />
        </ProtectedRoute>
      ),
    },
    {
      path: "admin/penerbitan-berita/:id",
      element: (
        <ProtectedRoute roleAllowed="admin">
          <DetailPenerbitanBerita />
        </ProtectedRoute>
      ),
    },
    {
      path: "admin/peminjaman-alat",
      element: (
        <ProtectedRoute roleAllowed="admin">
          <PeminjamanAlat />
        </ProtectedRoute>
      ),
    },
    {
      path: "admin/peminjaman-alat/:id",
      element: (
        <ProtectedRoute roleAllowed="admin">
          <DetailPeminjamanAlat />
        </ProtectedRoute>
      ),
    },
    {
      path: "admin/kemitraan",
      element: (
        <ProtectedRoute roleAllowed="admin">
          <Kemitraan />
        </ProtectedRoute>
      ),
    },
    {
      path: "admin/kemitraan/:id",
      element: (
        <ProtectedRoute roleAllowed="admin">
          <DetailKemitraan />
        </ProtectedRoute>
      ),
    },
    {
      path: "user/dashboard",
      element: (
        <ProtectedRoute roleAllowed="user">
          <DashboardUser />
        </ProtectedRoute>
      ),
    },
    {
      path: "user/liputan-kegiatan",
      element: (
        <ProtectedRoute roleAllowed="user">
          <LiputanKegiatanUser />
        </ProtectedRoute>
      ),
    },
    {
      path: "user/penerbitan-berita",
      element: (
        <ProtectedRoute roleAllowed="user">
          <PenerbitanBeritaUser />
        </ProtectedRoute>
      ),
    },
    {
      path: "user/peminjaman-alat",
      element: (
        <ProtectedRoute roleAllowed="user">
          <PeminjamanAlatUser />
        </ProtectedRoute>
      ),
    },
    {
      path: "user/kemitraan",
      element: (
        <ProtectedRoute roleAllowed="user">
          <KemitraanUser />
        </ProtectedRoute>
      ),
    },
    {
      path: "user/history",
      element: (
        <ProtectedRoute roleAllowed="user">
          <History/>
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
