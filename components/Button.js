import React from 'react';

const Button = ({ children, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="
        bg-indigo-800 
        border 
        border-indigo-700 
        text-indigo-300 
        hover:bg-indigo-600 
        hover:border-indigo-400 
        hover:text-gray-300 
        focus:bg-amber-600 
        focus:border-amber-500
        focus:text-white 
        rounded-md px-4 gap-4 py-2 text-lg"
      >
        {children}
      </button>
    );
  };

export default Button;



  