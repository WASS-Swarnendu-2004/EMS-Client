import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(
        "/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert(
        "Login Successful"
      );

      const role =
        res.data.role ||
        "employee";

      if (
        role.toLowerCase() ===
        "admin"
      ) {
        navigate(
          "/admin/dashboard"
        );
      } else {
        navigate(
          "/employee/dashboard"
        );
      }
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-900
      via-blue-900
      to-slate-900
      flex
      items-center
      justify-center
      px-4
      "
    >
      <div
        className="
        w-full
        max-w-md
        bg-white/10
        backdrop-blur-lg
        border
        border-white/20
        rounded-3xl
        p-8
        shadow-2xl
        "
      >
        <h1
          className="
          text-4xl
          font-bold
          text-center
          text-white
          mb-2
          "
        >
          Welcome Back
        </h1>

        <p
          className="
          text-center
          text-gray-300
          mb-8
          "
        >
          Login to continue
        </p>

        <form
          onSubmit={
            handleLogin
          }
          className="space-y-5"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-white/20
            text-white
            placeholder-gray-300
            border
            border-white/20
            focus:outline-none
            "
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-white/20
            text-white
            placeholder-gray-300
            border
            border-white/20
            focus:outline-none
            "
            required
          />

          <button
            disabled={loading}
            className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-4
            rounded-xl
            font-semibold
            transition
            "
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p
          className="
          text-center
          text-gray-300
          mt-6
          "
        >
          Don't have an
          account?
          <Link
            to="/register"
            className="
            text-blue-400
            ml-2
            hover:underline
            "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;