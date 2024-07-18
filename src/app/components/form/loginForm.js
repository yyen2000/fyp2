'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';

export default function LoginPage() {
  const [matricNumber, setMatricNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);  // Set loading to true when the form is submitted
    try {
      const response = await axios.post('/api/login', {
        matricNumber,
        password,
      });
      alert(response.data.message);
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/home/homepage'); 
      }
    } catch (error) {
      console.error(error.response?.data?.message || 'Login failed');
      setErrorMessage(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);  // Set loading to false when the request is complete
    }
  };

  return (
    <div className="flex items-center justify-center py-6 px-4 sm:px-6 lg:px-60">
      <div className="absolute top-2 right-2 text-md">
        <Link href="/" className="hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l"> 
          Student
        </Link>
        <span>|</span>
        <Link href="/admin" className="mt-6 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r"> 
          Admin
        </Link>
      </div>
      <div className="max-w-2xl w-auto space-y-2 lg:ml-30">
        <div>
          <h2 className="text-center text-5xl font-bold text-teal-900">
            FYPBot
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Sign in to your account
          </p>
        </div>  
        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          <input type="hidden" defaultValue="true" />
          <div className="space-y-6">
            <div>
              <label htmlFor="matric-number" className="sr-only">
                Matric Number
              </label>
              <input
                id="matric-number"
                name="matricNumber"
                type="text"
                required
                className="appearance-none rounded-full relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg"
                placeholder="Matric Number"
                value={matricNumber}
                onChange={(e) => setMatricNumber(e.target.value)}
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
              <div className="flex items-center justify-between">
                <div className="flex items-center"></div>
                <div className="text-sm mt-1">
                  <a href="/" className="font-small text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>
          </div>
          {errorMessage && (
            <p className="text-center text-red-500">{errorMessage}</p>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-teal-800 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}  // Disable the button when loading
            >
              {loading ? (
                <ClipLoader size={24} color={"#ffffff"} />
              ) : (
                'Log In'
              )}
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don’t have an account?
              <a href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
