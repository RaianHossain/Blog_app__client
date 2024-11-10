import React from "react";
import { useLocation } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

function RegisterPage(props) {
  const location = useLocation();
  const { from } = location.state || { from: "/" };

  return (
    <main>
      <section className="container">
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <RegisterForm from={from} />
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;