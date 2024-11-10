import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./provider/AuthProvider.jsx";
import ProfileProvider from "./provider/ProfileProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProfileProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ProfileProvider>
  </StrictMode>
);
