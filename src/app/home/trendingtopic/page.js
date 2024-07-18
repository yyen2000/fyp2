'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ClipLoader } from 'react-spinners';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const processDataForChart = (results) => {
    const dataByCategory = results.reduce((acc, result) => {
        if (!acc[result.category]) {
            acc[result.category] = 0;
        }
        acc[result.category] += 1;
        return acc;
    }, {});

    const labels = Object.keys(dataByCategory);
    const data = Object.values(dataByCategory);

    return {
        labels,
        datasets: [
            {
                label: 'Number of Projects',
                data,
                backgroundColor: 'rgba(0, 128, 128)',
                borderColor: 'rgba(0, 128, 128, 1)',
                borderWidth: 1,
            },
        ],
    };
};

const processDataForSupervisorChart = (results, selectedSupervisors) => {
    const filteredResults = selectedSupervisors.length === 0
        ? results
        : results.filter(result => selectedSupervisors.includes(result.supervisorName));

    // Extract all unique supervisor names
    const supervisorsSet = new Set();
    filteredResults.forEach(result => {
        supervisorsSet.add(result.supervisorName);
    });
    const supervisors = Array.from(supervisorsSet);

    // Initialize an empty object to store supervisor specialization
    const supervisorSpecialization = {};

    // Initialize categories based on unique results
    const categories = [...new Set(filteredResults.map(result => result.category))];

    // Initialize each supervisor's specialization with zeros for all categories
    supervisors.forEach(supervisor => {
        supervisorSpecialization[supervisor] = {};
        categories.forEach(category => {
            supervisorSpecialization[supervisor][category] = 0;
        });
    });

    // Count projects per supervisor per category
    filteredResults.forEach(result => {
        supervisorSpecialization[result.supervisorName][result.category] += 1;
    });

    // Prepare datasets for chart.js
    const datasets = categories.map(category => ({
        label: category,
        backgroundColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}, 0.2)`,
        borderColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}, 1)`,
        borderWidth: 2,
        data: supervisors.map(supervisor => supervisorSpecialization[supervisor][category]),
    }));

    return {
        labels: supervisors,
        datasets,
    };
};

const TrendingCategories = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInterests, setUserInterests] = useState([]);
    const [selectedSupervisors, setSelectedSupervisors] = useState([]);
    const [selectedTitles, setSelectedTitles] = useState([]);
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        fetchUserInterests();
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
            setError('Failed to fetch user interests. Please try again later.');
        }
    };

    const classifyTitles = async () => {
        try {
            const response = await axios.post('/api/classifyTitles', { userInterests });
            const sortedResults = response.data.results.sort((a, b) => b.matchesUserInterest - a.matchesUserInterest);
            setResults(sortedResults);
        } catch (error) {
            console.error('Error classifying titles:', error);
            setError('Failed to classify titles. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSupervisorSelect = (e) => {
        const selectedSupervisor = e.target.value;
        if (selectedSupervisor && !selectedSupervisors.includes(selectedSupervisor)) {
            setSelectedSupervisors([...selectedSupervisors, selectedSupervisor]);
        }
    };

    const removeSupervisor = (supervisor) => {
        setSelectedSupervisors(selectedSupervisors.filter(s => s !== supervisor));
    };

    const handleBarClick = (elements) => {
        if (elements.length > 0) {
            const { datasetIndex, index } = elements[0];
            const category = supervisorChartData.datasets[datasetIndex].label;
            const supervisor = supervisorChartData.labels[index];

            const titles = results
                .filter(result => result.supervisorName === supervisor && result.category === category)
                .map(result => result.title);

            setSelectedTitles(titles);
        }
    };

    const chartData = processDataForChart(results);
    const supervisorChartData = processDataForSupervisorChart(results, selectedSupervisors);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
        );
    }

    const allSupervisors = Array.from(new Set(results.map(result => result.supervisorName)));

    return (
        <div style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
            <div className='px-4 py-2 font-sans'>
                <h1 className='text-2xl font-bold mb-2'>Trending Over the Years</h1>
                <span> within [2019-2023]</span>
                <div className='relative w-full border mt-2 bg-white rounded-lg p-4'>
                    <Bar data={chartData} options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Trending Categories',
                            },
                        },
                    }} />
                </div>

                {error && <div className="text-red-600 mt-4">{error}</div>} {/* Display error message if error state is set */}

                <h1 className='text-2xl font-bold mb-4 mt-8'>Supervisor's Supervision</h1>
                <div className='mb-4'>
                    <label htmlFor='supervisors' className='block text-lg font-medium text-gray-700'>Filter by Supervisor</label>
                    <select id='supervisors' onChange={handleSupervisorSelect} className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'>
                        <option value="">Select a supervisor</option>
                        {allSupervisors.map(supervisor => (
                            <option key={supervisor} value={supervisor}>{supervisor}</option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-wrap'>
                    {selectedSupervisors.map(supervisor => (
                        <div key={supervisor} className='flex items-center bg-gray-100 text-teal-800 text-sm font-medium mr-2 mb-2 px-3.5 py-0.5 rounded-full'>
                            <span>{supervisor}</span>
                            <button onClick={() => removeSupervisor(supervisor)} className='ml-2 focus:outline-none'>
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
                <div className='relative text-xl w-full border mt-2 bg-white rounded-lg p-4'>
                    <Bar data={supervisorChartData} options={{
                        indexAxis: 'y',
                        responsive: true,
                        onClick: (_, elements) => handleBarClick(elements),
                        plugins: {
                            legend: {
                                position: 'right',
                            },
                            title: {
                                display: true,
                                text: 'Supervisor Specialization',
                            },
                        },
                    }} />
                </div>
                {selectedTitles.length > 0 && (
                    <div className='mt-8'>
                        <h2 className='text-xl font-bold mb-4'>Selected Titles</h2>
                        <ul className='list-disc list-inside'>
                            {selectedTitles.map((title, index) => (
                                <li key={index}>{title}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrendingCategories;
