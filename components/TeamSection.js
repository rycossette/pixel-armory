import React from 'react';
import Image from 'next/image';

const TeamSection = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6 lg:px-32">
        <h2 className="text-4xl font-display font-bold text-center mb-12">Our Leadership</h2>
        {/* Team members cards */}
        {/* You can map through your team data here if it's dynamic */}
        {/* Example shown with static content for Matt Kinser and Ryan Cossette */}
        <div className="flex flex-col md:flex-row md:space-x-12 justify-center">
          {/* Matt Kinser Card */}
          <div className="bg-gradient-to-b from-indigo-950 to-indigo-800 rounded-lg overflow-hidden shadow-lg mb-12 md:mb-0 flex-1 max-w-fit"> {/* Adjusted width */}
            <div className="relative h-96">
              <Image
                src="/images/team/mattkinser.webp"
                alt="Matt Kinser"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="rounded-lg"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-display font-bold mb-2">Matt Kinser</h3>
              <p className="text-indigo-500 mb-4">Co-Founder &amp; Technical Director</p>
              <p className="text-gray-300 leading-relaxed">
                With over two decades of full-stack development experience, Matt Kinser has applied machine learning to enhance profitability, co-founded a podcast startup, and managed operations at an enterprise video hosting firm. His expertise encompasses code craftsmanship, system design, rapid learning, problem-solving, creativity, and teamwork, all aimed at driving organizational success.
              </p>
            </div>
          </div>

          {/* Ryan Cossette Card */}
          <div className="bg-gradient-to-b from-indigo-950 to-indigo-800 rounded-lg overflow-hidden shadow-lg flex-1 max-w-fit"> {/* Adjusted width */}
            <div className="relative h-96">
              <Image
                src="/images/team/ryan.webp"
                alt="Ryan Cossette"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="rounded-lg"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-display font-bold mb-2">Ryan Cossette</h3>
              <p className="text-indigo-500 mb-4">Co-Founder &amp; Creative Director</p>
              <p className="text-gray-300 leading-relaxed">
                With over 20 years in the creative industry, Ryan Cossette brings extensive experience in design and content creation, including roles at Apple as a Content Engineer for Final Cut Pro, Motion, iMovie, and Clips. His background spans founding Pixel Armory and contributing to high-profile projects such as Super Bowl LII and the 2017 Olympics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
