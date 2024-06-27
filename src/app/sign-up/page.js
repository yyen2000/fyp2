'use client'

import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import SignUp from '../components/form/signUpForm';

const RegistrationForm = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request to load the registration form
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
        <SignUp />
      )}
    </div>
  );
};

export default RegistrationForm;
