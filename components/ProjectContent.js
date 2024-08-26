// components/ProjectContent.js
import React from 'react';
import Image from 'next/image';

const ProjectContent = ({ project, activeImage, onThumbnailClick }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar mt-20 z-10">  {/* Ensure it's layered behind the navbar */}
      <div className="mb-6">
        <Image
          src={activeImage}  // Use the active image for the banner
          alt={`Banner image for ${project.name}`}
          width={1200}
          height={600}
          layout="responsive"
          className="object-cover w-full h-auto rounded-2xl"
        />
      </div>
      <div className="text-white mb-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {project.images.map((image, index) => (
          <div 
            key={index} 
            className="overflow-hidden rounded-lg cursor-pointer"
            onClick={() => onThumbnailClick(image)}  // Set the clicked image as active
          >
            <Image
              src={`/images/projects/${project.name}/${image}`}
              alt={`Image ${index + 1} of ${project.name}`}
              width={800}
              height={450}
              layout="responsive"
              className="object-cover w-full h-auto rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectContent;
