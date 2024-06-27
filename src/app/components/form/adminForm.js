'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginAdmin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/login_admin', {
        username,
        password,
        userType: 'admin', // Indicate user type as admin
      });
      alert(response.data.message);
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/admin/upload'); 
      }
    } catch (error) {
      console.error(error.response?.data?.message || 'Login failed');
      setErrorMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-60">
      <div className="max-w-2xl w-auto space-y-10 lg:ml-30">
      <div className="absolute top-2 right-2 text-md"> 
        <Link href="/" className="hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l"> 
          Student
        </Link>
        <span>|</span>
        <Link href="/admin" className="mt-6 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r"> 
          Admin
        </Link>
      </div>
        <div>
          <h2 className="mt-8 text-center text-5xl font-bold text-teal-900">
            FYPBot
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Sign in to admin account
          </p>
        </div>
        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          <input type="hidden" defaultValue="true" />
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-full relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-full relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {errorMessage && (
            <p className="text-center text-red-500">{errorMessage}</p>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-teal-800 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
