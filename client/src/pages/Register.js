import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/register', form);
      localStorage.setItem("accessToken", res.data.token);
      navigate('/profile');
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4 bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <input className="w-full border px-4 py-2 rounded" name="name" placeholder="Name" onChange={handleChange} required />
      <input className="w-full border px-4 py-2 rounded" name="email" placeholder="Email" onChange={handleChange} required />
      <input className="w-full border px-4 py-2 rounded" name="address" placeholder="Address" onChange={handleChange} required />
      <input className="w-full border px-4 py-2 rounded" name="password" placeholder="Password" type="password" onChange={handleChange} required />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full" type="submit">Register</button>
    </form>
  );
};

export default Register;
