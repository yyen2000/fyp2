'use client'

import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy'; // Import FileCopy icon from Material-UI
import axios from 'axios';
import { Snackbar } from '@mui/material';

function SaveTitle() {
    const [titles, setTitles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/save');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setTitles(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/deleteTitle?id=${id}`);
            if (response.status === 200) {
                setSnackbarMessage('Record deleted successfully');
                fetchData(); // Refresh data after deletion
            } else {
                setSnackbarMessage('Failed to delete record');
            }
        } catch (error) {
            setSnackbarMessage('Failed to delete record');
            console.error('Failed to delete record', error);
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleCopyToClipboard = (title) => {
        navigator.clipboard.writeText(title);
        setSnackbarMessage('Title copied to clipboard');
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <h1 className='text-xl font-semibold mb-2 ml-10'>Save Title</h1>
            <div className='flex flex-col text-black pb-20 px-12 h-screen overflow-y-auto'>
                <div className='overflow-x-auto mt-4'>
                    {titles.length > 0 ? (
                        <div>
                            <p className="mb-2 text-sm absolute right-20 top-20 text-gray-600">Number of titles: {titles.length}</p>
                            <table className='min-w-full h-2/3 rounded-lg shadow-sm'>
                                <thead className='sticky top-0 bg-gray-200'>
                                    <tr>
                                        <th className='py-3 px-2 border-b border-gray-200 rounded-tl-xl'>Id</th>
                                        <th className='py-3 px-2 border-b border-gray-200'>Recommendation from Saved Title</th>
                                        <th className='py-3 px-2 border-b border-gray-200 rounded-tr-xl'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {titles.map((title, index) => (
                                        <tr key={index} className='bg-gray-100 backdrop-blur-md bg-white/30 hover:bg-gray-200 transition-colors bg-opacity-55'>
                                            <td className='py-4 px-1 border-b border-gray-200 text-center text-sm'>{title.id}</td>
                                            <td className='py-4 px-1 border-b border-gray-200 text-center text-sm'>{title.recommendation}</td>
                                            <td className='py-4 px-1 border-b border-gray-200 text-center text-sm'>
                                                <DeleteIcon
                                                    color="error"
                                                    onClick={() => handleDelete(title.id)}
                                                    style={{ cursor: 'pointer', marginRight: '10px' }}
                                                />
                                                <FileCopyIcon
                                                    color="primary"
                                                    onClick={() => handleCopyToClipboard(title.recommendation)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className='flex justify-center mt-4'>
                            <ClipLoader size={50} color={"#123abc"} loading={loading} />
                        </div>
                    )}
                </div>
            </div>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </div>
    );
}

export default SaveTitle;
