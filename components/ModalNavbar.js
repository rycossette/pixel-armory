// components/ModalNavbar.js
import React from 'react';

const ModalNavbar = ({ title, onPrev, onNext }) => {
  return (
    <div className="flex items-center justify-between bg-gradient-to-b from-black to-transparent px-5 py-4 w-full z-50">
      <button onClick={onPrev} className="text-white text-2xl">&larr;</button>
      <h2 className="text-3xl text-center text-white">{title}</h2>
      <button onClick={onNext} className="text-white text-2xl">&rarr;</button>
    </div>
  );
};

export default ModalNavbar;
