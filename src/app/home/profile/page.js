'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

export default function Profile() {
  const [studentName, setStudentName] = useState('');
  const [program, setProgram] = useState('');
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [country, setCountry] = useState('india');
  const [language, setLanguage] = useState('english');
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/profile');
        setStudentName(response.data.studentName);
        setProgram(response.data.program);
        setInterests(response.data.interests);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push('/');
        }
      } finally {
        setLoading(false);
      }
    }
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

  const handleSaveChanges = () => {
    // Implement save changes logic here
    console.log('Save changes clicked');
  };

  const handleCancel = () => {
    // Implement cancel logic here
    console.log('Cancel clicked');
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
          <button onClick={handleLogout} className='text-white text-sm uppercase bg-gradient-to-r hover:bg-gradient-to-l from-teal-600 to-teal-700 p-3 mt-2 mr-4 cursor-pointer flex px-4 py-2 rounded-full float-right'>Logout</button>
          <h1 className="text-2xl mt-4 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 mt-5">My Profile</h1>
          <p className="ml-4 mt-1 mb-2 text-gray-700 cursor-pointer mt-2"># FCSIT</p>
          <p className="ml-4 mt-1 mb-2 text-gray-700 cursor-pointer"># Field of Interest:</p>
          <p className="ml-4 mt-1 mb-2 text-gray-700 cursor-pointer text-sm font-semibold mb-6">{interests}</p>
        </div>
        <div>
        {/* <h2 className="text-xl mt-4 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">My Profile</h2> */}
            <button>
              
            </button>
        </div>
        <img className="w-full cursor-pointer" src="https://mstelder.wordpress.com/wp-content/uploads/2013/08/cropped-education-teaching1.jpg" alt="" />
        <div className="flex p-4 justify-between">
          <div className="flex items-center space-x-2">
            <FaUser className="w-10 h-full p-2 bg-teal-700 text-white rounded-full" />
            <h2 className="text-gray-800 text-sm font-bold cursor-pointer">{studentName}</h2>
          </div>
          <div className="flex space-x-2">
            <div className="flex space-x-1 items-center">
            </div>
            <div className="flex space-x-1 text-sm items-center">
              <span>Program: {program} </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl mb-8">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 mb-4">Account Settings</h1>
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="firstname" className="text-gray-700">Name:</label>
              <input
                type="text"
                className="bg-gray-100 border border-gray-300 rounded-md p-2"
                placeholder="Your Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
  
            <div className="flex flex-col">
              <label htmlFor="program" className="text-gray-700">Program:</label>
              <select
                name="program"
                id="program"
                className="bg-gray-100 border border-gray-300 rounded-md p-2"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Computational Science</option>
                <option value="">Information System</option>
                <option value="">Software Engineer</option>
                <option value="">Multimedia Computing</option>
                <option value="">Network Computing</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="interest" className="text-gray-700">Interest:</label>
              <select
                name="interest"
                id="interest"
                className="bg-gray-100 border border-gray-300 rounded-md p-2"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">Artificial Intelligence</option>
                {/* <option value="">English (United States)</option>
                <option value="">English UK</option>
                <option value="">Arabic</option> */}
              </select>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-6">
            <button className="bg-teal-600 text-white py-2 px-4 rounded-full hover:bg-teal-700" onClick={handleSaveChanges}>Save Changes</button>
            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400" onClick={handleCancel}>Cancel</button>
          </div>
        
        </div>
        <div className="flex p-4 justify-between">
          <div className="flex flex-col items-center space-x-2">
            {/* <FaUser className="w-10 h-full p-2 bg-teal-700 text-white rounded-full" /> */}
            {/* <h2 className="text-gray-800 text-md font-bold">Change Password?</h2> */}
            {/* <p className="text-gray-800 text-xs cursor-pointer">Go to Password Settings</p> */}
          </div>
          <div className="flex space-x-2">
            <div className="flex space-x-1 items-center">
            </div>
            <div className="flex space-x-1 text-sm items-center">
              <span>Delete Account?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
