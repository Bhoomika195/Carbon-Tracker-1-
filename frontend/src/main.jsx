import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppFixed from "./AppFixed";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppFixed />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
