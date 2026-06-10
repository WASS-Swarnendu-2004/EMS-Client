import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      alert("Name is required.")
      return
    }
    if (!email.trim()) {
      alert("Email is required.")
      return
    }
    if (!password.trim() ) {
      alert("Password is required.")
      return
    }
    if (password.length <= 8) {
      alert("Password must be at least 8 character.")
      return
    }

    alert("Regitration Sucessfull")
    navigate('/login')

  }
  return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

      <h2 className="text-3xl font-bold text-center mb-6">
        Register
      </h2>

      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Register
        </button>
        </form>
        <p className="text-center mt-4 text-sm">
         Already have an account?
         <span onClick={() => navigate("/login")} className="text-blue-600 cursor-pointer ml-1">
            Login
          </span>
        </p>

    </div>
  </div>
);
}

export default Register