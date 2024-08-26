import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';

Modal.setAppElement('#__next');  // This is necessary for accessibility reasons

const Showcase = () => {
  const [projectData, setProjectData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [activeThumbnail, setActiveThumbnail] = useState(null); // State for active thumbnail

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
      setActiveThumbnail(data.images[0]);  // Set the first thumbnail as active
      setIsModalOpen(true);  // Open the modal
      document.body.style.overflow = 'hidden';  // Prevent background scrolling
    } else {
      console.error("No images found for project:", project.name);
    }
  };

  const closeProject = () => {
    console.log("Closing project");
    setSelectedProject(null);
    setActiveImage(null);
    setActiveThumbnail(null);  // Reset active thumbnail
    setIsModalOpen(false);  // Close the modal
    document.body.style.overflow = '';  // Re-enable background scrolling
  };

  const handleThumbnailClick = (image) => {
    setActiveImage(`/images/projects/${selectedProject.name}/${image}`);
    setActiveThumbnail(image);  // Set the clicked thumbnail as active
  };

  const handleNextProject = () => {
    if (selectedProject) {
      const currentIndex = projectData.findIndex(p => p.name === selectedProject.name);
      const nextIndex = (currentIndex + 1) % projectData.length;
      openProject(projectData[nextIndex]);
    }
  };

  const handlePreviousProject = () => {
    if (selectedProject) {
      const currentIndex = projectData.findIndex(p => p.name === selectedProject.name);
      const prevIndex = (currentIndex - 1 + projectData.length) % projectData.length;
      openProject(projectData[prevIndex]);
    }
  };

  return (
    <div className='bg-gradient-to-b from-slate-950 to-slate-900'>
      <div className='flex w-full mx-auto justify-center mt-20 py-5'>
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
              <div className="text-center text-white mt-3">{project.name}</div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeProject}
        contentLabel="Project Images"
        className="fixed inset-x-0 mt-40 mx-auto p-8 max-w-5xl z-50 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
      >
        {selectedProject && (
          <div className="relative bg-gradient-to-b from-indigo-900 to-indigo-950 rounded-2xl max-h-[70vh] flex flex-col">
            {/* Navbar with title and navigation arrows */}
            <div className="flex justify-between items-center p-4 rounded-tl-2xl rounded-tr-2xl bg-indigo-750 border-b-2 border-b-indigo-500 shadow-indigo-950 shadow-xl z-50">
              <button onClick={handlePreviousProject} className="text-white text-2xl">&larr;</button>
              <h2 className="text-3xl text-center text-white">{selectedProject.name}</h2>
              <button onClick={handleNextProject} className="text-white text-2xl">&rarr;</button>
            </div>

            {/* Center section with image and content */}
            <div className="flex-1 overflow-y-auto p-6 py-10 custom-scrollbar">
              <div className="mb-6">
                <Image
                  src={activeImage}  // Use the active image for the banner
                  alt={`Banner image for ${selectedProject.name}`}
                  width={1200}
                  height={400}  // Reduced height to make the banner smaller
                  layout="responsive"
                  className="object-cover w-full h-auto rounded-2xl"
                />
              </div>
              <div className="text-white mb-6">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedProject.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`overflow-hidden rounded-lg cursor-pointer 
                      ${activeThumbnail === image ? 'border-2 border-orange-400' : 'hover:border-2 hover:border-indigo-500'}`}  // Conditionally apply the active border
                    onClick={() => handleThumbnailClick(image)}  // Set the clicked thumbnail as active
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

            {/* Bottom section - Blank */}
            <div className="p-4"></div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Showcase;
