import React, { useMemo } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

export default function SelectOptions({ value, onChange }) {
  const handleSelectionChange = (event) => {
    const selectedKey = event.target.value;
    onChange(selectedKey);
  };

  const selectedValue = useMemo(
    () => value.replaceAll('_', ' '),
    [value]
  );

  return (
    <div className="relative">
      <select
        value={value}
        onChange={handleSelectionChange}
        className="appearance-none rounded-full relative w-full px-4 py-4 pr-12 border border-gray-300
          placeholder-gray-500 text-gray-500 focus:outline-none bg-white focus:ring-indigo-500
          focus:border-indigo-500 focus:z-10 text-lg"
      >
        <option value="" disabled hidden>Program</option>
        <option value="CS">Computational Science</option>
        <option value="IS">Information Systems</option>
        <option value="MC">Multimedia Computing</option>
        <option value="SE">Software Engineering</option>
        <option value="NC">Network Computing</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}
