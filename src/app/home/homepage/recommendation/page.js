'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

export default function HomePage() {
    const [results, setResults] = useState([]);
    const [titles, setTitles] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchUserInterests();
        fetchTitles();
    }, []);

    useEffect(() => {
        if (titles.length > 0 && userInterests.length > 0) {
            classifyTitles();
        }
    }, [titles, userInterests]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchUserInterests = async () => {
        try {
            const response = await axios.get('/api/userInterest');
            setUserInterests(response.data.interests);
        } catch (error) {
            console.error('Error fetching user interests:', error);
        }
    };

    const fetchTitles = async () => {
        try {
            const response = await axios.get('/recommended_topics.txt');
            const titlesArray = response.data.split('\n').map(title => title.trim());
            setTitles(titlesArray);
        } catch (error) {
            console.error('Error fetching titles:', error);
        }
    };

    const classifyTitles = async () => {
        try {
            const response = await axios.post('/api/classifyTitles', { titles, userInterests });
            const sortedResults = response.data.results.sort((a, b) => b.matchesUserInterest - a.matchesUserInterest);
            setResults(sortedResults);
            
            const matchedCategories = [...new Set(sortedResults.filter(result => !result.matchesUserInterest).map(result => result.category))];
            setCategories(matchedCategories);
  
        } catch (error) {
            console.error('Error classifying titles:', error);
        }
    };


    const loadMoreResults = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.post('/api/classifyTitles', { titles, userInterests, page: page + 1 });
            const newResults = response.data.results.sort((a, b) => b.matchesUserInterest - a.matchesUserInterest);
            setResults(prevResults => [...prevResults, ...newResults]);
            setPage(prevPage => prevPage + 1);cd 
        } catch (error) {
            console.error('Error loading more results:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
        loadMoreResults();
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const unmatchedResults = results.filter(result => !result.matchesUserInterest && (selectedCategory === 'All' || result.category === selectedCategory));

    
    return (
        <div>
            <h1 className='text-xl font-semibold mb-4 ml-10'>Other Recommendations</h1>
            <div className='flex flex-col text-black pb-20 px-12 h-screen overflow-y-auto'>
                <div className='flex-block mb-4 right-2'>
                    <label htmlFor="category" className='text-gray-700 font-medium'>Filter by Category:</label>
                    <select id="category" value={selectedCategory} onChange={handleCategoryChange} className='ml-2 p-2 border rounded-md'>
                        <option value="All">All</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className='overflow-x-auto mt-4'>
                    {unmatchedResults.length > 0 ? (
                        <>
                            <p className="mb-2 text-sm text-gray-600">Number of unmatched results: {unmatchedResults.length}</p>
                            <table className='min-w-full h-2/3 rounded-lg shadow-sm'>
                                <thead className='sticky top-0 bg-gray-200'>
                                    <tr>
                                        <th className='py-3 px-2 border-b border-gray-200 rounded-tl-xl'>Category</th>
                                        <th className='py-3 px-2 border-b border-gray-200 rounded-tr-xl'>Title</th>
                                        <th className='py-3 px-2 border-b border-gray-200'>Supervisor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unmatchedResults.map((result, index) => (
                                        <tr key={index} className='bg-gray-100 backdrop-blur-md bg-white/30 hover:bg-gray-200 transition-colors bg-opacity-55'>
                                            <td className='py-4 px-1 border-b border-gray-200 text-left text-sm'>{result.category}</td>
                                            <td className='py-4 px-1 border-b border-gray-200 text-center text-sm'>{result.title}</td>
                                            <td className='py-4 px-1 border-b border-gray-200 text-center text-sm'>
                                                <a href={result.supervisorLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{result.supervisorName}</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <div className='flex justify-center mt-4'>
                            <ClipLoader size={50} color={"#123abc"} loading={loading} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
