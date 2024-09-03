import React from 'react';
import Image from 'next/image';

const TeamSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-indigo-950">
      <div className="container mx-auto px-1 lg:px-32">
        <h2 className="text-4xl font-display font-bold text-center mb-12">Meet the Team</h2>
        
        <div className="flex flex-col md:flex-row">
          {/* Ryan Cossette Card */}
          <div className="overflow-hidden flex-1 p-5">
            <div className="flex justify-center mb-10 max-w-sm mx-auto p-10 sm:p-0" style={{ height: '400px' }}>
              <div className="relative" style={{ width: '100%', height: '100%' }}>
                <Image
                  src="/images/team/ryan.webp"
                  alt="Ryan Cossette"
                  fill
                  className="rounded-2xl"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  quality={100}
                />
              </div>
            </div>
            <div className="overflow-hidden flex-1 max-w-fit">
              <h3 className="text-2xl font-display font-bold mb-2">Ryan Cossette</h3>
              <p className="text-indigo-500 mb-4">Co-Founder and Creative Director</p>
              <p className="text-gray-300 leading-relaxed">
                With over 20 years in the creative industry, Ryan Cossette brings extensive experience in design and content creation, including roles at Apple as a Content Engineer for Final Cut Pro, Motion, iMovie, and Clips. His background spans founding Pixel Armory and contributing to high-profile projects such as Super Bowl LII and the 2017 Olympics.
              </p>
            </div>
          </div>
          
          {/* Matt Kinser Card */}
          <div className="overflow-hidden flex-1 p-5">
            <div className="flex justify-center mb-10 max-w-sm mx-auto p-10 sm:p-0" style={{ height: '400px' }}>
              <div className="relative" style={{ width: '100%', height: '100%' }}>
                <Image
                  src="/images/team/mattkinser.webp"
                  alt="Matt Kinser"
                  fill
                  className="rounded-2xl"
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  quality={100}
                />
              </div>
            </div>
            <div className="overflow-hidden flex-1 max-w-fit">
              <h3 className="text-2xl font-display font-bold mb-2">Matt Kinser</h3>
              <p className="text-indigo-500 mb-4">Co-Founder and Technical Director</p>
              <p className="text-gray-300 leading-relaxed">
                With over two decades of full-stack development experience, Matt Kinser has applied machine learning to enhance profitability, co-founded a podcast startup, and managed operations at an enterprise video hosting firm. His expertise encompasses code craftsmanship, system design, rapid learning, problem-solving, creativity, and teamwork, all aimed at driving organizational success.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TeamSection;
