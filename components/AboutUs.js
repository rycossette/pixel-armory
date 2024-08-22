// components/AboutUs.js
import React from 'react';

const AboutUs = () => (
  <div className="relative w-full h-[80vh] bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero/bg1.webp)' }}>
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-10">
      <div className="text-left text-white max-w-3xl">
        <h2 className="text-4xl font-bold mb-10">We are a Creative Design and Technical Solutions Agency.</h2>
        <p className="text-xl ">We help brands captivate audiences, streamline processes, and achieve lasting impact. </p>
      </div>
    </div>
  </div>
);

export default AboutUs;
