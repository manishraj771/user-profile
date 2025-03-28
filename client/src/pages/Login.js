import React, { useContext, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', form);
      login(res.data.accessToken);
      navigate('/profile');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4 bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <input name="email" className="w-full border px-4 py-2 rounded" placeholder="Email" onChange={handleChange} required />
      <input name="password" className="w-full border px-4 py-2 rounded" placeholder="Password" type="password" onChange={handleChange} required />
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full" type="submit">Login</button>
    </form>
  );
};

export default Login;
