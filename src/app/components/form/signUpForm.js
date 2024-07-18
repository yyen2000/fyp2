'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ProgressBar from '../progressBar';
import SelectOptions from '../singleSelector';
import MultipleInterestTopics from '../multipleSelector';
import { setCookie } from 'nookies'; 

export default function SignUp() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [program, setProgram] = useState('');
  const [interests, setInterests] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (step === 0) {
      // Initial registration step
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      if (!/^\d{5}$/.test(studentId)) {
        setErrorMessage('Student ID must be a 5-digit number');
        return;
      }

      setStep(step + 1);
    } else if (step === 1) {
      // Profile creation step
      if (!name || !program || interests.length === 0) {
        setErrorMessage('Please fill in all fields');
        return;
      }

      // Proceed to the next step
      setStep(step + 1);
    } else {
      // Final confirmation step - Make the final API call
      registerUser();
    }
  };

  const registerUser = async () => {
    try {
      const response = await axios.post('/api/register', {
        studentId,
        password,
        name,
        program,
        interests,
      });

      alert(response.data.message);

      // Save interests to cookies
      setCookie(null, 'userInterests', interests.join(','), {
        maxAge: 86400,
        path: '/',
      });

      router.push('/');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-60">
      <div className="max-w-2xl w-auto lg:ml-30">
        <div>
          <h2 className="mt-8 text-center text-5xl font-bold text-teal-900">
            FYPBot
          </h2>
          <p className="mt-4 text-center text-sm text-gray-600">
            Registration
          </p>
        </div>
        <ProgressBar step={step} />
        <form className="mt-2 space-y-6" onSubmit={handleNext}>
          <input type="hidden" name="remember" defaultValue="true" />
          {step === 0 && (
            <div className="rounded-md shadow-sm space-y-6">
              <div>
                <label htmlFor="student-id" className="sr-only">
                  Student ID
                </label>
                <input
                  id="student-id"
                  name="studentId"
                  type="text"
                  maxLength="5"
                  required
                  className="appearance-none rounded-full relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg"
                  placeholder="Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
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
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-full relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-full relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-full relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="program" className="sr-only">
                  Program
                </label>
                <SelectOptions 
                  value={program} 
                  onChange={(value) => setProgram(value)} 
                />
              </div>
              <div className="space-y-1">
                <MultipleInterestTopics
                  value={interests}
                  onChange={(value) => setInterests(value)}
                />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="rounded-md shadow-sm space-y-6 text-center">
              <p className="text-lg">Thank you for registering!</p>
              <p className="text-sm text-gray-600">Your account has been successfully created.</p>
            </div>
          )}
          {errorMessage && (
            <p className="text-center text-red-500">{errorMessage}</p>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-auto flex justify-center py-2 px-20 mx-10 border border-transparent text-lg font-medium rounded-full text-white bg-teal-800 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {step === 2 ? 'Finish' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
