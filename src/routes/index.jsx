import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/pages/login";
import User from "@/pages/user";
import DetailUser from "@/pages/user/detail-user";
import AddUser from "@/pages/user/add-user";
import Questions from "@/pages/questions";
import DetailQuestion from "@/pages/questions/detail-questions";
import AddQuestion from "@/pages/questions/add-questions";
import Ranking from "@/pages/ranking";
import Dashboard from "@/pages/dashboard";
import ProtectedRoute from "./protected-route";
import { AuthProvider } from "@/utils/context/auth-context";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/liputan-kegiatan",
      element: (
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
      ),
    },
    {
      path: "/liputan-kegiatan/:id",
      element: (
        <ProtectedRoute>
          <DetailUser />
        </ProtectedRoute>
      ),
    },
    {
      path: "/liputan-kegiatan/create",
      element: (
        <ProtectedRoute>
          <AddUser />
        </ProtectedRoute>
      ),
    },
    {
      path: "/penerbitan-berita",
      element: (
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
      ),
    },
    {
      path: "/penerbitan-berita/:id",
      element: (
        <ProtectedRoute>
          <DetailUser />
        </ProtectedRoute>
      ),
    },
    {
      path: "/penerbitan-berita/create",
      element: (
        <ProtectedRoute>
          <AddUser />
        </ProtectedRoute>
      ),
    },
    {
      path: "/peminjaman-alat",
      element: (
        <ProtectedRoute>
          <Questions />
        </ProtectedRoute>
      ),
    },
    {
      path: "/peminjaman-alat/:id",
      element: (
        <ProtectedRoute>
          <DetailQuestion />
        </ProtectedRoute>
      ),
    },
    {
      path: "/peminjaman-alat/create",
      element: (
        <ProtectedRoute>
          <AddQuestion />
        </ProtectedRoute>
      ),
    },
    {
      path: "/kemitraan",
      element: (
        <ProtectedRoute>
          <Ranking />
        </ProtectedRoute>
      ),
    },
    {
      path: "/kemitraan/:id",
      element: (
        <ProtectedRoute>
          <Ranking />
        </ProtectedRoute>
      ),
    },
    {
      path: "/kemitraan/create",
      element: (
        <ProtectedRoute>
          <AddQuestion />
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