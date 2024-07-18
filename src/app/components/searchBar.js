'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdSearch } from "react-icons/io";

export default function Home({onSave}) {
  const [seedText, setSeedText] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5328/api/generate', {
        seed_text: seedText,
      });
      setGeneratedTitle(response.data.generated_title);
    } catch (error) {
      console.error('Error generating title:', error);
    }
  };

  const handleSave = async () => {
    try {
        const response = await axios.post('/api/recommendation', {
            title: generatedTitle,
        });
        if (response.status === 200) {
            setSaveStatus('Title saved successfully!');
            onSave();
            setTimeout(() => {
                setSaveStatus('');
            }, 3000);
        } else {
            setSaveStatus('Failed to save title.');
        }
    } catch (error) {
        console.error('Error saving title:', error);
        setSaveStatus('Error Saving Title');
    }
};

  return (
    <div className="flex flex-col items-center justify-center">
      <div className='text-lg text-center text-white w-full p-6 mb-6 border 
          bg-gradient-to-r from-teal-800 via-teal-500 to-slate-500 rounded-lg shadow'>
        <h1 className="text-xl font-bold mb-4">What can I help you today?</h1>
        <div className="mb-4 flex-inline">
        <label className="text-slate-100 text-sm">
          <span>This advanced search is used for generating new title, simply key in that you want to search for and it will generate one for you!</span>
        </label>
        </div>
        <form onSubmit={handleSubmit} className="flex p-3 pl-10 w-full text-gray-900 text-sm focus:pl-3">
          <div className="mb-8 relative mr-10 w-full">
            <input
              type="text"
              placeholder='Type any keywords...'
              value={seedText}
              onChange={(e) => setSeedText(e.target.value)}
              className="items-center w-full rounded-md p-2 text-sm text-teal-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="submit"
              className="absolute top-0.4 right-0 end-0 h-full text-lg rounded-tr-md rounded-br-md bg-teal-500 hover:bg-slate-700 text-white py-1 px-2 focus:outline-none focus:shadow-outline"
            ><IoMdSearch />
            </button>
          </div>
        </form>
        {generatedTitle && (
          <div className="block text-gray-700 text-sm font-bold mb-2">
            <h2 className="text-md font-bold">Here's a new FYP title suggestion for you: </h2>
            <p className="text-gray-700 mt-4 text-lg">" {generatedTitle} "</p>
            <div className="relative group">
              <button
                onClick={handleSave}
                className="mt-4 bg-slate-700 hover:bg-slate-400 text-white py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            {saveStatus && (
                <div className="mt-2 text-teal-900">
                    {saveStatus}
                </div>
            )}
              <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-2 w-max bg-black text-white text-xs rounded 
              py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to save the title to My Profile
              </span>
            </div>
            {saveStatus && (
              <p className="mt-2 text-sm text-teal-700">{saveStatus}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
