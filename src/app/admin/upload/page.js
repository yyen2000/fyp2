'use client'

import React, { useState } from 'react';
import Papa from 'papaparse';
import AdminFYPDatabase from '@/app/components/adminDataTable/page';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const acceptableCSVFileTypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";

export default function UploadPage() {
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const router = useRouter();
    const onFileChangedHandler = (event) => {
        const csvFile = event.target.files[0];
        setSelectedFile(csvFile);
    };

    const uploadData = async () => {
        if (!selectedFile) {
            setMessage('Please select a file to upload.');
            return;
        }
    
        if (window.confirm("Do you want to upload this file?")) {
            Papa.parse(selectedFile, {
                complete: function (results) {
                    console.log("Parsed data:", results.data); // Corrected logging
                    processData(results.data);
                },
                error: function (error) {
                    console.error('Error parsing CSV:', error);
                    setMessage('Error parsing CSV file.');
                }
            });
        }
    };

    const processData = async (data) => {
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                setMessage(<span className="text-green-500">Data uploaded successfully.</span>);
            } else {
                setMessage(`Error: ${result.error}`);
            }
            console.log(result);
        } catch (error) {
            console.error('Error uploading data:', error);
            setMessage('Error uploading data.');
        }
    };
    const handleLogout = async () => {
        try {
          await axios.post('/api/admin_logout');
          router.push('/sign-in');
        } catch (error) {
          console.error('Failed to logout:', error);
        }
      };

    return (
        <div className="flex items-center p-6 justify-center min-h-screen font-sans">
            <div className="bg-opacity-50 p-10 rounded-lg shadow-lg backdrop-blur-md mr-6">
                <h1 className="text-3xl font-bold mb-8">Upload FYP Topics</h1>
                <div className="mb-6">
                    <label htmlFor="csvFileSelector" className="block text-gray-500 font-medium mb-2">
                        Please choose CSV file:
                    </label>
                    <input
                        type='file'
                        id="csvFileSelector"
                        className='bg-gray-300 py-2 px-2 rounded-lg w-full text-white'
                        accept={acceptableCSVFileTypes}
                        onChange={onFileChangedHandler}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <button onClick={uploadData} className="bg-gradient-to-r from-gray-800 to-gray-300 hover:from-gray-600 hover:to-gray-500 text-white font-bold py-2 px-4 rounded-full shadow-lg">
                        Upload
                    </button>
                    <button onClick={handleLogout} className="ml-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">
                        Logout
                    </button>
                </div>
                {message && <p className="mt-4 text-lg text-red-500">{message}</p>}
            </div>
            <AdminFYPDatabase />
        </div>
    );
}
