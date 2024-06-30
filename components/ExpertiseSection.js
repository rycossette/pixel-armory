import React from 'react';

const ExpertiseSection = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6 lg:px-32 text-center">
        <h2 className="text-4xl font-display font-bold mb-12">Our Expertise</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Expertise Items */}
          <div className="bg-indigo-800 rounded-lg p-6 text-center shadow-lg">
            <p className="text-white text-lg">Motion Design</p>
          </div>
          <div className="bg-indigo-800 rounded-lg p-6 text-center shadow-lg">
            <p className="text-white text-lg">3D Modeling</p>
          </div>
          <div className="bg-indigo-800 rounded-lg p-6 text-center shadow-lg">
            <p className="text-white text-lg">3D Animation</p>
          </div>
          <div className="bg-indigo-800 rounded-lg p-6 text-center shadow-lg">
            <p className="text-white text-lg">Web Design</p>
          </div>
          <div className="bg-indigo-800 rounded-lg p-6 text-center shadow-lg">
            <p className="text-white text-lg">Server-side Development</p>
          </div>
          <div className="bg-indigo-800 rounded-lg p-6 text-center shadow-lg">
            <p className="text-white text-lg">Advanced Networking</p>
          </div>
          <div className="bg-indigo-800 rounded-lg p-6 text-center shadow-lg">
            <p className="text-white text-lg">Artificial Intelligence</p>
          </div>
          <div className="bg-indigo-800 rounded-lg p-6 text-center shadow-lg">
            <p className="text-white text-lg">And More</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
