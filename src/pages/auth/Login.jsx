import React from 'react'
import { useNavigate, Link } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigate = useNavigate()
 
  const handleLogin = (e) => {
  e.preventDefault();

  if (!email.trim()) {
    alert('Email is required');
    return;
  }

  if (!password.trim()) {
    alert('Password is required');
    return;
  }

  
  const role = email === "admin@gmail.com" ? "admin" : "employee";

  const user = {
    email,
    role
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert('Login successful');

  
  if (role === "admin") {
    navigate("/admin/dashboard");
  } else {
    navigate("/employee/dashboard");
  }
};

  return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

      <h2 className="text-3xl font-bold text-center mb-6">
        Login
      </h2>

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        Don't have an account?{" "}
        <Link to="/register"className="text-blue-600 hover:underline">
         Register
       </Link>
      </p>
    </div>
  </div>
);
}

export default Login