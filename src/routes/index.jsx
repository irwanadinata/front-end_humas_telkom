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
    ]);
  
    return (
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
  }