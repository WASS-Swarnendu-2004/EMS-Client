import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Register = () => {
  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleRegister =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await api.post(
          "/api/auth/register",
          formData
        );

        alert(
          "Registration Successful"
        );

        navigate("/login");
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Registration Failed"
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
          Create Account
        </h1>

        <p
          className="
          text-center
          text-gray-300
          mb-8
          "
        >
          Register to continue
        </p>

        <form
          onSubmit={
            handleRegister
          }
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={
              formData.name
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
            "
            required
          />

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
            "
            required
          />

          <button
            disabled={loading}
            className="
            w-full
            bg-green-600
            hover:bg-green-700
            text-white
            py-4
            rounded-xl
            font-semibold
            transition
            "
          >
            {loading
              ? "Creating..."
              : "Register"}
          </button>
        </form>

        <p
          className="
          text-center
          text-gray-300
          mt-6
          "
        >
          Already have an
          account?
          <Link
            to="/login"
            className="
            text-blue-400
            ml-2
            hover:underline
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;