'use client';

import React, { useState, useEffect } from 'react';
import { IconButton, Snackbar } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from '../styles/PastFYP.module.css';

const PastfypTopics = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState('All');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const titlesPerPage = 8;  

  useEffect(() => {
    fetch('/api/fyp')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No Data Found</p>;

  const filteredData = selectedYear === 'All' ? data : data.filter(item => item.past_fyp_year === selectedYear);

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

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setCurrentPage(1);
  };

  const handleCellClick = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarOpen(true);
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const uniqueYears = Array.from(new Set(data.map(item => item.past_fyp_year))).sort((a, b) => a - b);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
        </div>
        <div className={styles.filter}>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className={`${styles.filterButton} ${styles.selectButton}`}
        >
      <option value="All">All</option>
      {uniqueYears.map(past_fyp_year => (
        <option key={past_fyp_year} value={past_fyp_year}>{past_fyp_year}</option>
      ))}
      </select>
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
            </tr>
          </thead>
          <tbody>
            {currentTitles.map((item, index) => (
              <tr key={item.past_topics_id}>
                <td>{indexOfFirstTitle + index + 1}</td>
                <td onClick={() => handleCellClick(item.past_fyp_topics)} style={{ cursor: 'pointer' }}>{item.past_fyp_topics}</td>
                <td>{item.past_fyp_year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Title copied to clipboard"
      />
    </div>
  );
};

export default PastfypTopics;
