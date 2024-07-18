'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import Link from 'next/link';
import SelectOptions from '@/app/components/singleSelector';
import MultipleInterestTopics from '@/app/components/multipleSelector';

export default function Profile() {
  const [studentName, setStudentName] = useState('');
  const [program, setProgram] = useState('');
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [newProgram, setNewProgram] = useState('');
  const [newInterests, setNewInterests] = useState([]);
  const router = useRouter();

  async function fetchData() {
    try {
      const response = await axios.get('/api/profile');
      if (response.status === 200) {
        setStudentName(response.data.studentName);
        setProgram(response.data.program);
        setInterests(response.data.interests);
        setName(response.data.studentName);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        router.push('/');
      } else {
        setErrorMessage('Failed to fetch profile information');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      router.push('/sign-in');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put('/api/account', {
        studentName: name,
        newProgram,
        newInterests,
      });
      fetchData();
      alert(response.data.message);
      if (typeof onSave === 'function') {
        onSave();
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to update profile information');
    }
  };

  // const handleDeleteAccount = async () => {
  //   const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
  //   if (confirmed) {
  //     try {
  //       const response = await axios.delete('/api/delete');
  //       if (response.status === 200) {
  //         alert('Account deleted successfully.');
  //         router.push('/sign-up');
  //       }
  //     } catch (error) {
  //       setErrorMessage('Failed to delete account.');
  //     }
  //   }
  // };  

 const handleCancel = () => {
    setName(studentName);
    setNewProgram(program);
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClipLoader color="#3498db" loading={loading} size={50} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-sm container mr-8 bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl mb-8">
        <div>
          <button onClick={handleLogout} className="text-white text-sm uppercase bg-gradient-to-r hover:bg-gradient-to-l from-teal-600 to-teal-700 p-3 mt-6 mr-4 cursor-pointer flex px-4 py-2 rounded-full float-right">Logout</button>
          <div className='p-1'>
            <h1 className="text-2xl mt-4 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 mt-5">My Profile</h1>
            <p className="ml-4 mt-1 mb-2 text-gray-700 cursor-pointer mt-2"># FCSIT</p>
            <p className="ml-4 mt-1 mb-2 text-gray-700 cursor-pointer"># Field of Interest:</p>
            <p className="ml-4 mt-1 mb-2 text-gray-700 cursor-pointer text-sm font-semibold mb-6">{interests.join(', ')}</p>
          </div>
        </div>
        <img className="w-full cursor-pointer" src="https://mstelder.wordpress.com/wp-content/uploads/2013/08/cropped-education-teaching1.jpg" alt="" />
        <div className="flex p-4 justify-between">
          <div className="flex items-center space-x-2">
            <FaUser className="w-10 h-full p-2 bg-teal-700 text-white rounded-full" />
            <h2 className="text-gray-800 text-sm font-bold cursor-pointer">{studentName}</h2>
          </div>
          <div className="flex space-x-2">
            <div className="flex space-x-1 items-center"></div>
            <div className="flex space-x-1 text-sm items-center">
              <span>Program: {program}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl mb-2">
        <h1 className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 px-4 py-4">Account Settings</h1>
        <div className="px-8 py-4">
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
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
    
            <div className="flex items-center space-x-4">
            <SelectOptions
              value={newProgram}
              onChange={(value) => setNewProgram(value)}
            />
            <MultipleInterestTopics
              value={newInterests}
              onChange={(value) => setNewInterests(value)}
            />
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button className="bg-teal-600 text-white py-2 px-4 rounded-full hover:bg-teal-700" onClick={handleSaveChanges}>Save Changes</button>
            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
        <div className="flex p-3 justify-between">
          <div className="flex flex-col items-center space-x-2"></div>
          <div className="flex space-x-2">
            <div className="flex space-x-1 items-center"></div>
            <button
              className="py-2 px-4 rounded-full hover:text-red-700"
              // onClick={handleDeleteAccount}
            >
              {/* Delete Account? */}
            </button>
            <Link href="/home/profile/deleteUser" >
            Delete Account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
