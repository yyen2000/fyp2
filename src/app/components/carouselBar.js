'use client'

import { useState } from 'react';

const Carousel = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="flex items-center mt-8">
      <div className="flex flex-wrap justify-center space-x-4 space-y-2 shadow-2xl">
        {items.map((item, index) => (
          <div
            key={index}
            className="min-w-[10px] max-w-xs p-4 border cursor-pointer rounded-lg hover:bg-gray-200 transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            onClick={() => setSelectedItem(item)}
          >
            <img 
              src="https://assets.eweek.com/uploads/2023/11/ew_20231106-ai-meeting-assistant.png"
              alt={item.title} 
              className="w-full h-32 object-cover rounded-lg mb-4" 
            />
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p>{item.summary}</p>
          </div>
        ))}
      </div>
      {selectedItem && (
        <div className="w-full max-w-lg p-4 border rounded-lg">
          <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
          <p>{selectedItem.content}</p>
        </div>
      )}
    </div>
  );
};

export default Carousel;
