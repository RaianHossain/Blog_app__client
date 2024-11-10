import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import BlogsProvider from "../provider/BlogsProvider";

function Layout(props) {
  return (
    <BlogsProvider>
      <div className="bg-[#030317] text-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        {/*<Footer />*/}
      </div>
    </BlogsProvider>
  );
}

export default Layout;
