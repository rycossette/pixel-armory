import React, { useState } from 'react';
import Button from './Button';

const skills = {
  "Design and Art Direction": ['Conceptual Design', 'Visual Storytelling', 'Color Theory', 'Typography', 'Branding and Identity'],
  "3D Content Design": ['Character Modeling', 'High-Poly Modeling', 'Environment Modeling', 'Hard Surface Modeling', 'UV Mapping', '3D Printing'],
  "Software Proficiency": ['Adobe Creative Suite', 'Cinema 4D', 'Zbrush', 'Maya', 'Redshift', 'Octane', ],
  "Project and Team Management": ['Leadership', 'Client Relations', 'Team Coordination', 'Project Planning',],
  "Creative Strategy": ['Strategic Planning', 'Creative Campaign Development', 'Brand Strategy', 'Market Research and Trend Analysis',],
  // ... other categories
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="flex w-full bg-gradient-to-b from-black to-gray-900 pb-20">
      <div className="w-4/5 mx-auto py-32 flex flex-col items-center p-3 sm:p-10">
        <div className="flex flex-col items-start w-full">
          <h1 className="text-4xl pb-10 text-white font-bold">Our Expertise.</h1>
          <div className="flex flex-wrap gap-3 mb-5">
            {/* Dynamic Buttons for each category */}
            <Button isActive={activeCategory === 'All'} onClick={() => setActiveCategory('All')}>All</Button>
  {Object.keys(skills).map((category) => (
    <Button key={category} isActive={activeCategory === category} onClick={() => setActiveCategory(category)}>
      {category}
    </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col opacity-75 w-full">
          <div className="flex flex-wrap justify-left max-w-3xl gap-2">
            {/* Skills displayed based on the active category */}
            {Object.entries(skills).map(([category, skillsList]) =>
              activeCategory === 'All' || activeCategory === category ? (
                skillsList.map((skill) => (
                  <p key={skill} className="bg-gray-800 border border-indigo-600 hover:border-indigo-400 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-md px-3 py-1">
                    {skill}
                  </p>
                ))
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
