import React from 'react';

const Button = ({ children, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="bg-slate-950 border border-slate-500 text-slate-500 hover:bg-slate-900 hover:border-slate-400 hover:text-slate-400 focus:bg-slate-400 focus:text-black rounded-md px-3 gap-2 py-1"
      >
        {children}
      </button>
    );
  };

export default Button;



  