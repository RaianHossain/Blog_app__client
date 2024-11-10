import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

function LoginPage(props) {
  const location = useLocation();
  const { from } = location.state || { from: "/" };

  return (
    <main>
      <section className="container">
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <LoginForm from={from} />
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
