// components/HeroSection.js
import React from 'react';
import Link from 'next/link';

const HeroSection = () => (
  <div className="bg-cover bg-center h-screen text-center flex flex-col justify-center items-center text-white" style={{ backgroundImage: 'url(/images/hero/hero-bg.jpg)' }}>
    <h1 className="text-5xl font-bold mb-4">Transforming Visions into Reality</h1>
    <p className="text-xl mb-6">Expert Motion Graphics, Animation, 3D Modeling, and Software Development</p>
    <Link href="#contact" legacyBehavior>
      <a className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Get Started</a>
    </Link>
  </div>
);

export default HeroSection;
