import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Field from "../common/Field";

function LoginForm({ from }) {
  const navigate = useNavigate();
  const { setAuth, setAuthStorage } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    console.log(formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );
      if (response.status === 200) {
        const user = response.data.user;
        const authToken = response.data.token.accessToken;
        const refreshToken = response.data.token.refreshToken;
        setAuth({ user, authToken, refreshToken });
        setAuthStorage({ user, authToken, refreshToken });
        navigate(`${from}`);
      }
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.error ?? error.message;
      setError("root.random", {
        type: "random",
        message,
      });
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(submitForm)}>
      <div className="mb-6">
        <Field error={errors.email?.message} htmlFor={"email"} label={"Email"}>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            id="email"
            name="email"
            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </Field>
      </div>
      <div className="mb-6">
        <Field
          htmlFor={"password"}
          label={"Password"}
          error={errors.password?.message}
        >
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            id="password"
            name="password"
            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </Field>
      </div>
      {errors.root?.random && (
        <p className="text-red-500">{errors.root?.random.message}</p>
      )}
      <div className="mb-6">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          Login
        </button>
      </div>
      <p className="text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
