import React from 'react';

const ProgressBar = ({ step }) => {
  const steps = ['Create Account', 'Create Profile', 'Confirmation'];
  const completedPercentage = (step / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 h-1.5 rounded-full mb-4">
        <div
          className="bg-teal-600 h-1.5 rounded-full"
          style={{ width: `${completedPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center text-xs relative">
        {steps.map((label, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${index <= step ? 'bg-teal-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              {index + 1}
            </div>
            <div className={`${index <= step ? 'text-teal-600' : 'text-gray-400'} mt-1 text-center`}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
