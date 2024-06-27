'use client'

import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import LoginAdmin from '../components/form/adminForm';

const LoginAdminUser = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request to load the login page
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  return (
    <div>
      <LoginAdmin />
    </div>
  );
};

export default LoginAdminUser;
