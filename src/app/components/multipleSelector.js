import React, { useEffect, useState } from "react";
import { ChevronDownIcon, XIcon } from '@heroicons/react/solid';

export default function MultipleInterestTopics({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState(value || []);

  // Effect to update the parent component when selectedInterests changes
  useEffect(() => {
    onChange(selectedInterests);
  }, [selectedInterests]);

  // Function to toggle the visibility of the dropdown
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (selectedInterests.includes(value)) {
      // If already selected, remove from selectedInterests
      setSelectedInterests(selectedInterests.filter((interest) => interest !== value));
    } else {
      // If not selected, add to selectedInterests
      setSelectedInterests([...selectedInterests, value]);
    }
  };

  // Function to handle removing a selected interest
  const handleRemoveChip = (interestToRemove) => {
    setSelectedInterests(selectedInterests.filter((interest) => interest !== interestToRemove));
  };

  const interests = [
    { id: 1, name: "Artificial Intelligence" },
    { id: 2, name: "Computational Modelling" },
    { id: 3, name: "Cybersecurity Network" },
    { id: 4, name: "IoT Infrastructure" },
    { id: 5, name: "Visual Image Processing" },
    { id: 6, name: "Game Development" },
    { id: 7, name: "Mobile App Development" },
    { id: 8, name: "Web Development" },
  ];

  // Generate the placeholder text with truncation
  const getPlaceholderText = () => {
    if (selectedInterests.length === 0) {
      return "Select your preference";
    }
    const truncated = selectedInterests.slice(0, 1).join(", ");
    return selectedInterests.length > 1 ? `${truncated}, +${selectedInterests.length - 1} more` : truncated;
  };

  return (
    <div className="flex-col max-w-[18rem]">
      <button
        onClick={handleToggleDropdown}
        type="button"
        className="appearance-none rounded-full relative w-full px-4 py-4 border border-gray-300
        placeholder-gray-500 text-gray-500 focus:outline-none bg-white focus:ring-indigo-500
        focus:border-indigo-500 focus:z-10 text-lg flex justify-between items-center"
      >
        <span className="truncate text-lg" style={{ maxWidth: "16rem", overflow: "hidden" }}>{getPlaceholderText()}</span>
        <ChevronDownIcon className="w-5 h-5 text-gray-500 ml-2" />
      </button>
      {/* Dropdown */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        }  bg-white rounded-lg shadow dark:bg-gray-700`}
      >
        <ul className="h-24 px-3 pb-3 overflow-y-auto text-gray-700 dark:text-gray-200">
          {/* Display list of interests/topics */}
          {interests.map((interest) => (
            <li key={interest.id}>
              <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  id={`checkbox-item-${interest.id}`}
                  type="checkbox"
                  value={interest.name}
                  checked={selectedInterests.includes(interest.name)}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-gray-100 border-gray-300 rounded"
                />
                <label
                  htmlFor={`checkbox-item-${interest.id}`}
                  className="w-full ms-2 font-lg text-gray-900 rounded dark:hover:bg-gray-600 cursor-pointer"
                >
                  {interest.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
