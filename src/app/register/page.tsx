"use client";

import Layout from '../components/Layout';
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Add your registration logic here
    console.log('Registering with', { email, password });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label className="block mb-4">
          <span className="block mb-1">Email</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="block mb-1">Password</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="block mb-1">Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </label>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Register
        </button>
      </form>
    </div>
  );
}
