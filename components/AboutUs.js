// components/AboutUs.js
import React from 'react';

const AboutUs = () => (
  <div className="relative w-full h-[80vh] bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero/darkmode_03.jpg)' }}>
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-10">
      <div className="text-center text-white max-w-3xl">
        <h2 className="text-4xl font-bold mb-10">About Us</h2>
        <p className="text-xl mb-6">We seamlessly blend intelligent design with cutting-edge software development and engineering. With over 20 years of experience, our team of industry veterans excels in delivering visually stunning designs and robust technical solutions. From captivating video content and intricate animations to scalable full-stack and mobile app development, we bring your vision to life with precision and creativity.</p>
      </div>
    </div>
  </div>
);

export default AboutUs;
