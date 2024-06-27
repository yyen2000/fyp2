'use client'

import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import LoginPage from '../components/form/loginForm';

const LoginUser = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request to load the login page
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default LoginUser;
