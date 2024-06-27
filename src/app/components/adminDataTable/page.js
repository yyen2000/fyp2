'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/PastFYP.module.css';
import { ChevronLeft, ChevronRight, Delete } from '@mui/icons-material';
import { Refresh } from '@mui/icons-material';
import {IconButton, Snackbar, TextField} from '@mui/material';

const AdminFYPDatabase = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchID, setSearchID] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const titlesPerPage = 8;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/fyp');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Failed to fetch data', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No Data Found</p>;

  const filteredData = searchID === '' ? data : data.filter(item => item.past_topics_id === parseInt(searchID, 10));

  const indexOfLastTitle = currentPage * titlesPerPage;
  const indexOfFirstTitle = indexOfLastTitle - titlesPerPage;
  const currentTitles = filteredData.slice(indexOfFirstTitle, indexOfLastTitle);

  const totalPages = Math.ceil(filteredData.length / titlesPerPage);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleSearchChange = (e) => {
    setSearchID(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }

    try {
      const response = await axios.delete(`/api/fyp?id=${id}`);
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          {/* <strong className='text-2xl mr-12 text-bold underline'>List of FYP Topics</strong> */}
        </div>
        <div className={styles.filter}>
          <div className="text-sm flex text-black">
            <input
              type="text"
              placeholder="Search ID"
              value={searchID}
              onChange={handleSearchChange}
              className={styles.filterInput}
            />
          </div>
          <div className={styles.refreshButton}>
            <IconButton onClick={handleRefresh} size="small">
              <Refresh fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
      <div className={styles.pagination}>
        <IconButton onClick={handlePreviousClick} disabled={currentPage === 1} size="small">
          <ChevronLeft fontSize="small" />
        </IconButton>
        <span>{currentPage} of {totalPages}</span>
        <IconButton onClick={handleNextClick} disabled={currentPage === totalPages} size="small">
          <ChevronRight fontSize="small" />
        </IconButton>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.styledTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTitles.map((item) => (
              <tr key={item.past_topics_id}>
                <td>{item.past_topics_id}</td>
                <td>{item.past_fyp_topics}</td>
                <td>{item.past_fyp_year}</td>
                <td>
                <IconButton onClick={() => handleDelete(item.past_topics_id)} size="small">
                    <Delete fontSize="small" />
                </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {snackbarOpen && (
        <div className={styles.snackbar}>
          <span>{snackbarMessage}</span>
          <button onClick={handleCloseSnackbar} className={styles.snackbarClose}>X</button>
        </div>
      )}
    </div>
  );
};

export default AdminFYPDatabase;
