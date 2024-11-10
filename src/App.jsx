import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import BlogPage from "./pages/BlogPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CreateBlog from "./pages/CreateBlog";
import EditBlogPage from "./pages/EditBlogPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoutes from "./routes/PrivateRoutes";


function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Layout />}>
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/edit/:blogId" element={<EditBlogPage />} />
        </Route>
      </Route>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:profileId" element={<ProfilePage />} />
        <Route path="/blog/:blogId" element={<BlogPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
