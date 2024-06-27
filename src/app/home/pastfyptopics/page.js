'use client'

import React, { useState, useEffect } from 'react';
import PastfypTopics from '../../components/dataTable';
import '../../globals.css';
import { ClipLoader } from 'react-spinners';

const PastFYPList = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000); 
    };

    fetchData();
  }, []);

  return (
    <div className="main-content font-sans">
      <div className="content-wrapper">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
          </div>
        ) : (
          <div className='flex flex-col'>
          <h1 className='text-2xl font-bold ml-4 mb-2'>List of Past FYP Topics</h1>
          <div className='text-xs ml-4'>
            <span>
              <p>Displaying a list of past FYP topics contributes to the academic environment by fostering creativity and knowledge sharing among students.</p>
            </span>
          </div>
          <PastfypTopics />
          </div>
        )}
      </div>
    </div>
  );
};

export default PastFYPList;
