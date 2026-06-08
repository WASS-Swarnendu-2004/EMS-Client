import React from 'react'
import { useNavigate } from 'react-router-dom'

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
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login