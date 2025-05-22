import React, { useState, useEffect } from 'react';

const CollapsibleMenu = ({ title, children, isFirstSection = false }) => {
  const [isOpen, setIsOpen] = useState(isFirstSection);
  
  const toggleSection = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="mb-4">
      <button
        onClick={toggleSection}
        className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="font-medium">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 bg-white border border-gray-200 rounded-b-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleMenu;
