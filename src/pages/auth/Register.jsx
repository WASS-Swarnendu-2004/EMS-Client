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
    <form onSubmit={handleRegister}>
      <input type="text" placeholder='Enter name'
        value={name} onChange={(e) => setName(e.target.value)}
      />
      <input type="text" placeholder='Enter email'
        value={email} onChange={(e) => setEmail(e.target.value)}
      />
      <input type="password" placeholder='Enter password'
        value={password} onChange={(e) => setPassword(e.target.value)}
      />

      <button type='submit'>Register</button>
    </form>
  )
}

export default Register