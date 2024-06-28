// components/HeaderBasic.js
import React from 'react';

const HeaderBasic = ({ title, subtitle, backgroundImage }) => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-[50vh] flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container mx-auto px-6 lg:px-32 text-center text-white">
        <div className="section-title mb-8">
          <h2 className="text-5xl font-bold pb-5">{title}</h2>
        </div>
        <p className="text-xl mb-8">{subtitle}</p>
      </div>
    </section>
  );
};

export default HeaderBasic;
