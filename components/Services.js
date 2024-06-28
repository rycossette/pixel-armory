import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faCube, faCode, faCloud, faBrain } from '@fortawesome/free-solid-svg-icons';

const Services = () => (
  <section className="services bg-gradient-to-b from-indigo-950 to-black text-white py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Motion Graphics & Animation */}
        <div className="service__item bg-cover bg-center rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-start text-center">
          <div className="h-24 flex items-center justify-center">
            <FontAwesomeIcon icon={faFilm} size="3x" className="text-white" />
          </div>
          <div className="flex flex-col justify-start p-6">
            <h3 className="text-xl font-bold mb-2">Motion Graphics & Animation</h3>
            <p className="text-sm">Captivating animations and motion graphics that engage and inspire.</p>
          </div>
        </div>

        {/* 3D Modeling */}
        <div className="service__item bg-cover bg-center rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-start text-center">
          <div className="h-24 flex items-center justify-center">
            <FontAwesomeIcon icon={faCube} size="3x" className="text-white" />
          </div>
          <div className="flex flex-col justify-start p-6">
            <h3 className="text-xl font-bold mb-2">3D Modeling</h3>
            <p className="text-sm">Realistic 3D models that bring your ideas to life.</p>
          </div>
        </div>

        {/* Full-Stack Development */}
        <div className="service__item bg-cover bg-center rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-start text-center">
          <div className="h-24 flex items-center justify-center">
            <FontAwesomeIcon icon={faCode} size="3x" className="text-white" />
          </div>
          <div className="flex flex-col justify-start p-6">
            <h3 className="text-xl font-bold mb-2">Full-Stack Development</h3>
            <p className="text-sm">Comprehensive web and mobile app development using the latest technologies.</p>
          </div>
        </div>

        {/* Cloud Services & DevOps */}
        <div className="service__item bg-cover bg-center rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-start text-center">
          <div className="h-24 flex items-center justify-center">
            <FontAwesomeIcon icon={faCloud} size="3x" className="text-white" />
          </div>
          <div className="flex flex-col justify-start p-6">
            <h3 className="text-xl font-bold mb-2">Cloud Services & DevOps</h3>
            <p className="text-sm">Scalable cloud solutions and efficient DevOps practices.</p>
          </div>
        </div>

        {/* Machine Learning & Data Science */}
        <div className="service__item bg-cover bg-center rounded-lg overflow-hidden shadow-lg flex flex-col items-center justify-start text-center">
          <div className="h-24 flex items-center justify-center">
            <FontAwesomeIcon icon={faBrain} size="3x" className="text-white" />
          </div>
          <div className="flex flex-col justify-start p-6">
            <h3 className="text-xl font-bold mb-2">Machine Learning & Data Science</h3>
            <p className="text-sm">Innovative AI solutions to enhance business processes.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Services;
