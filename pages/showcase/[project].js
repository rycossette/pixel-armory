import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';

Modal.setAppElement('#__next');  // This is necessary for accessibility reasons

const Showcase = () => {
  const [projectData, setProjectData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjectData(data);
    }
    fetchData();
  }, []);

  const openProject = async (project) => {
    console.log("Opening project:", project);
    
    // Fetch images for the selected project
    const response = await fetch(`/api/projects/${project.name}`);
    const data = await response.json();
    
    if (data.images) {
      setSelectedProject({ ...project, images: data.images });
      setActiveImage(`/images/projects/${project.name}/${data.images[0]}`);  // Set the first image as active
      setIsModalOpen(true);  // Open the modal
    } else {
      console.error("No images found for project:", project.name);
    }
  };

  const closeProject = () => {
    console.log("Closing project");
    setSelectedProject(null);
    setActiveImage(null);
    setIsModalOpen(false);  // Close the modal
  };

  const handleThumbnailClick = (image) => {
    setActiveImage(`/images/projects/${selectedProject.name}/${image}`);
  };

  return (
    <div className='bg-gradient-to-b from-slate-950 to-slate-900'>
      <div className='flex w-full mx-auto justify-center mt-14 py-5'>
        <h1 className="text-4xl text-white font-bold">Project Showcase</h1>
      </div>
      <div className="flex justify-center flex-wrap px-5 pt-[80px] pb-5 gap-3">
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 lg:max-w-5xl space-y-5">
          {projectData.map((project, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openProject(project)}
            >
              <img
                src={`/images/projects/${project.name}/${project.thumbnail}`}
                alt={`Project ${project.name}`}
                className="object-cover w-full h-auto"
                loading="lazy"
              />
              <div className="text-center text-white mt-2">{project.name}</div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeProject}
        contentLabel="Project Images"
        className="fixed inset-x-0 top-16 mx-auto p-8 max-w-5xl z-50 overflow-y-auto"  // Adjusted to push modal down
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
      >
        {selectedProject && (
          <div className="bg-gradient-to-b from-indigo-700 to-indigo-900 rounded-lg shadow-lg overflow-auto p-6 relative">
            <button onClick={closeProject} className="absolute top-2 right-2 text-white text-2xl">
              &times;
            </button>
            <h2 className="text-3xl text-center text-white mb-4">{selectedProject.name}</h2>
            <div className="mb-6">
              <Image
                src={activeImage}  // Use the active image for the banner
                alt={`Banner image for ${selectedProject.name}`}
                width={1200}
                height={600}
                layout="responsive"
                className="object-cover w-full h-auto rounded-lg"
              />
            </div>
            <div className="text-white mb-6">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedProject.images.map((image, index) => (
                <div 
                  key={index} 
                  className="overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => handleThumbnailClick(image)}  // Set the clicked image as active
                >
                  <Image
                    src={`/images/projects/${selectedProject.name}/${image}`}
                    alt={`Image ${index + 1} of ${selectedProject.name}`}
                    width={800}
                    height={450}
                    layout="responsive"
                    className="object-cover w-full h-auto rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Showcase;
