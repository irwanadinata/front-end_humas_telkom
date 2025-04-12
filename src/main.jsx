import React from "react";
import ReactDOM from "react-dom/client";
import App from '@/routes/index'
import '@/styles/index.css'
import { AuthProvider } from "./utils/context/auth-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </React.StrictMode>
);
