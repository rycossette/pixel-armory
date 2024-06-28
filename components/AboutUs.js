// components/AboutUs.js
import React from 'react';

const AboutUs = () => (
  <div className="relative w-full h-[80vh] bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero/darkmode_03.jpg)' }}>
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-10">
      <div className="text-center text-white max-w-3xl">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-lg mb-6">At our versatile creative agency, we seamlessly blend the artistry of motion graphics, animation, and 3D modeling with cutting-edge software development and engineering. With over 20 years of experience, our team of industry veterans and lifelong friends excels in delivering visually stunning designs and robust technical solutions. From captivating video content and intricate animations to scalable full-stack and mobile app development, we bring your vision to life with precision and creativity.</p>

        <p className="text-lg mb-6">Our expertise extends to cloud infrastructure management, predictive modeling, and process automation, ensuring your projects are not only visually compelling but also technically sound and efficient. By integrating innovative machine learning solutions and strategic technology consulting, we help you enhance business processes, drive engagement, and achieve your goals. Partner with us to leverage our extensive experience and comprehensive services for a truly transformative impact on your digital presence.</p>
      </div>
    </div>
  </div>
);

export default AboutUs;
