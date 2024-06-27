// components/Tooltip.js
import React from 'react';

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-sm p-2 rounded">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
