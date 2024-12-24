import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/pages/auth/index";
import ProtectedRoute from "./protected-route";
import { AuthProvider } from "@/utils/context/auth-context";
import Register from "@/pages/auth/register";
// import Dashboard from "@/pages/admin/dashboard/index";
// import Kemitraan from "@/pages/admin/kemitraan/index";
// import LiputanKegiatan from "@/pages/admin/liputan-kegiatan/index"
// import PeminjamanAlat from "@/pages/admin/peminjaman-alat/index"
// import PenerbitanBerita from "@/pages/admin/penerbitan-berita/index"

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    // {
    //   path: "admin/dashboard",
    //   element: (
    //     <ProtectedRoute>
    //       <Dashboard />
    //     </ProtectedRoute>
    //   ),
    // },
    // {
    //   path: "admin/liputan-kegiatan",
    //   element: (
    //     <ProtectedRoute>
    //       <LiputanKegiatan />
    //     </ProtectedRoute>
    //   ),
    // },
    // {
    //   path: "admin/liputan-kegiatan/:id",
    //   element: (
    //     <ProtectedRoute>
    //       <DetailUser />
    //     </ProtectedRoute>
    //   ),
    // },
    // {
    //   path: "admin/liputan-kegiatan/create",
    //   element: (
    //     <ProtectedRoute>
    //       <AddUser />
    //     </ProtectedRoute>
    //   ),
    // },
    // {
    //   path: "admin/penerbitan-berita",
    //   element: (
    //     <ProtectedRoute>
    //       <PenerbitanBerita />
    //     </ProtectedRoute>
    //   ),
    // },
    // {
    //   path: "admin/penerbitan-berita/:id",
    //   element: (
    //     <ProtectedRoute>
    //       <DetailUser />
    //     </ProtectedRoute>
    //   ),
    // },
    // {
    //   path: "admin/penerbitan-berita/create",
    //   element: (
    //     <ProtectedRoute>
    //       <AddUser />
    //     </ProtectedRoute>
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
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}