'use client'

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';
import SearchBar from '@/app/components/searchBar';
import { Refresh } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FaRegEye, FaCopy, FaUser } from "react-icons/fa";
import { GrFormViewHide } from "react-icons/gr";

export default function HomePage() {
    const [results, setResults] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savedTitles, setSavedTitles] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const childRef = useRef(null)

    useEffect(() => {
        fetchUserInterests();
        fetchSavedTitles();
    }, []);

    useEffect(() => {
        if (userInterests.length > 0) {
            classifyTitles();
        }
    }, [userInterests]);

    const fetchUserInterests = async () => {
        try {
            const response = await axios.get('/api/userInterest');
            setUserInterests(response.data.interests);
        } catch (error) {
            console.error('Error fetching user interests:', error);
        }
    };

    const classifyTitles = async () => {
        try {
            const response = await axios.post('/api/classifyTitles', { userInterests });
            const sortedResults = response.data.results.sort((a, b) => b.matchesUserInterest - a.matchesUserInterest);
            setResults(sortedResults);
        } catch (error) {
            console.error('Error classifying titles:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSavedTitles = async () => {
        try {
            const response = await axios.get('/api/save');
            setSavedTitles(response.data);
        } catch (error) {
            console.error('Error fetching saved titles:', error);
        }
    };

    const refreshSavedTitles = async () => {
        try {
            const response = await axios.get('/api/save');
            setSavedTitles(response.data);
        } catch (error) {
            console.error('Error refreshing saved titles:', error);
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert('Title copied to clipboard!');
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const refreshMatchedResults = () => {
        setResults(prevResults => {
            const matchedResults = prevResults.filter(result => result.matchesUserInterest);
            return [...shuffleArray(matchedResults), ...prevResults.filter(result => !result.matchesUserInterest)];
        });
    };

    const refreshUnmatchedResults = () => {
        setResults(prevResults => {
            const unmatchedResults = prevResults.filter(result => !result.matchesUserInterest);
            return [...prevResults.filter(result => result.matchesUserInterest), ...shuffleArray(unmatchedResults)];
        });
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const matchedResults = results.filter(result => result.matchesUserInterest);
    const unmatchedResults = results.filter(result => !result.matchesUserInterest);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
        );
    }

    return (
        <div style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
            <div className="px-4 font-sans">
                <h1 className='text-2xl font-bold mb-4'>Personalized Recommendation</h1>
                <SearchBar onSave={fetchSavedTitles} />
                {savedTitles.length > 0 && (
                    <>
                        <div className='flex mb-2'>
                            <h2 className='text-lg font-semibold'>
                                Titles You Have Saved
                                <button onClick={toggleVisibility} className="mb-4 p-2 rounded">
                                    {isVisible ? <FaRegEye /> : <GrFormViewHide />}
                                </button>
                            </h2>
                            <div className="ml-auto flex">
                                <Link href="homepage/savetitle" className="text-xs mt-4 font-semibold text-gray-600 underline">
                                    Show All
                                </Link>
                                <IconButton onClick={refreshSavedTitles} className="ml-2 text-xs font-semibold text-gray-600">
                                    <Refresh fontSize="small" />
                                </IconButton>
                            </div>
                        </div>

                        {isVisible && (
                            <div className="flex overflow-x-auto gap-4 px-0 text-white drop-shadow-md text-center">
                                {savedTitles.slice(0, 5).map((savedTitle, index) => (
                                    <div key={index} className="relative w-full border-slate-800 bg-teal-600 rounded-lg drop-shadow-md group">
                                        <button
                                            className="select-none text-center transition-all absolute right-0 p-3 text-gray text-sm"
                                            onClick={() => handleCopy(savedTitle.recommendation)}
                                            type="button"
                                        >
                                            <FaCopy />
                                        </button>
                                        <div className="pt-0">
                                            <div className="text-center rounded-tl-lg rounded-tr-lg text-md font-serif bg-teal-800 py-2 px-12">
                                                <span>Title Saved Id: {savedTitle.id}</span>
                                            </div>
                                        </div>
                                        <div className="p-8 text-sm text-white">
                                            {savedTitle.recommendation}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                <div className='flex mb-2 mt-2'>
                    <h2 className='text-lg font-semibold'>Your Interests All Time</h2>
                    <div className="ml-auto flex">
                        <Link href="/home/homepage/interest" className="text-xs mt-2 font-semibold text-gray-600 underline">
                            Show All
                        </Link>
                        <IconButton onClick={refreshMatchedResults} className="ml-2 text-xs mt-2 font-semibold text-gray-600">
                            <Refresh fontSize="small" />
                        </IconButton>
                    </div>
                </div>
                <div className='flex overflow-x-auto gap-4 px-0 text-white drop-shadow-md'>
                    {matchedResults.slice(0, 5).map((result, index) => (
                        <div key={index} className='relative w-full border-slate-800 bg-teal-600 rounded-lg drop-shadow-md group'>
                            <div className='text-center rounded-tl-lg rounded-tr-lg text-md font-serif bg-teal-800 py-2 px-12'>
                                <span>{result.category}</span>
                            </div>
                            <div className="flex p-2 item-center justify-between-inline backdrop-blur-md ">
                                <FaUser className="p-2 mr-4 mb-8 bg-teal-700 text-white rounded-full" />
                                <h3 className="text-gray-800 text-xs font-bold cursor-pointer"> {result.supervisorName}</h3>
                                <a href={result.supervisorLink} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-1 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none transition-opacity duration-300">
                                    <div className=' item__overlay flex flex-col justify-center h-full absolute w-full top-0 transition-transform duration-300 bg-gradient-to-r hover:bg-gradient-to-l from-teal-600 to-teal-700 group-hover:translate-y-[-calc(100%-5.5rem)]'>
                                        <button className="text-white text-md hover:bg-gradient-to-l from-teal-600 to-teal-700 cursor-pointer px-4 py-2 rounded-full flex items-center space-x-2">
                                            <FaRegEye className="bg-teal-700 text-white rounded-full" />
                                            <div className="flex flex-col text-left">
                                                <span>View SV</span>
                                                <span className="text-sm">for more details</span>
                                            </div>
                                        </button>
                                    </div>
                                </a>
                            </div>
                            <div className='px-4 py-3 mb-8 text-sm text-center flex flex-col'>
                                {result.title}
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex mb-2 mt-6 ml-auto'>
                    <h2 className='text-lg font-semibold'>Other Recommendations</h2>
                    <div className="ml-auto flex">
                        <Link href="/home/homepage/recommendation" className="text-xs mt-2 font-semibold text-gray-600 underline">
                            Show All
                        </Link>
                        <IconButton onClick={refreshUnmatchedResults} className="ml-2 text-xs mt-2 font-semibold text-gray-600">
                            <Refresh fontSize='small' />
                        </IconButton>
                    </div>
                </div>
                <div className='flex overflow-x-auto px-2 gap-4 text-white'>
                    {unmatchedResults.slice(0, 5).map((result, index) => (
                        <div key={index} className='relative w-full border-cyan-800 bg-gray-600 rounded-lg drop-shadow-md group'>
                            <div className='text-center rounded-tl-lg rounded-tr-lg text-md font-serif bg-gray-900 py-2 px-12'>
                                <span>{result.category}</span>
                            </div>
                            <div className="flex p-2 item-center justify-between-inline backdrop-blur-md ">
                                <FaUser className="p-2 mr-4 mb-8 bg-gray-700 text-white rounded-full" />
                                <h3 className="text-black text-xs font-bold cursor-pointer"> {result.supervisorName}</h3>
                                <a href={result.supervisorLink} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-1 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none transition-opacity duration-300">
                                    <div className=' item__overlay flex flex-col justify-center h-full absolute w-full top-0 transition-transform duration-300 bg-gradient-to-r hover:bg-gradient-to-l from-slate-600 to-slate-700 group-hover:translate-y-[-calc(100%-5.5rem)]'>
                                        <button className="text-white text-md hover:bg-gradient-to-l from-slate-600 to-slate-700 cursor-pointer px-4 py-2 rounded-full flex items-center space-x-2">
                                            <FaRegEye className="bg-gray-700 text-white rounded-full" />
                                            <div className="flex flex-col text-left">
                                                <span>View SV</span>
                                                <span className="text-sm">for more details</span>
                                            </div>
                                        </button>
                                    </div>
                                </a>
                            </div>
                            <div className='px-4 py-3 mb-8 text-sm text-center flex flex-col'>
                                {result.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
