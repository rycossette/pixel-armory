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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); // State for the lightbox

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
      // Exclude the logo image from the thumbnails
      const filteredImages = data.images.filter(image => !image.includes('_logo'));

      setSelectedProject({ ...project, images: filteredImages });
      setActiveImage(`/images/projects/${project.name}/${filteredImages[0]}`);  // Set the first image as active
      setActiveThumbnail(filteredImages[0]);  // Set the first thumbnail as active
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
    setIsLightboxOpen(true);  // Open lightbox
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
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

  const handleNextImage = () => {
    const currentIndex = selectedProject.images.findIndex(image => image === activeThumbnail);
    const nextIndex = (currentIndex + 1) % selectedProject.images.length;
    handleThumbnailClick(selectedProject.images[nextIndex]);
  };

  const handlePreviousImage = () => {
    const currentIndex = selectedProject.images.findIndex(image => image === activeThumbnail);
    const prevIndex = (currentIndex - 1 + selectedProject.images.length) % selectedProject.images.length;
    handleThumbnailClick(selectedProject.images[prevIndex]);
  };

  return (
    <div className='bg-gradient-to-b from-slate-950 to-slate-900'>
      <div className='flex w-full mx-auto justify-center'>
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
        className="fixed inset-x-0 mt-44 mx-auto max-w-5xl z-50 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
      >
        {selectedProject && (
          <div className="relative bg-gradient-to-b from-indigo-900 to-indigo-950 rounded-2xl max-h-[70vh] flex flex-col">
            {/* Navbar with title and navigation arrows */}
            <div className="flex justify-between items-center p-4 rounded-tl-2xl rounded-tr-2xl bg-indigo-750 border-b-2 border-b-indigo-500 shadow-indigo-950 shadow-xl z-50">
              <button onClick={handlePreviousProject} className="text-white bg-indigo-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-3xl text-center text-white">{selectedProject.name}</h2>
              <button onClick={handleNextProject} className="text-white bg-indigo-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Center section with image and content */}
            <div className="flex-1 overflow-y-auto p-6 py-5 custom-scrollbar">
              <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6 overflow-y-auto">
                {/* Description on the Right */}
                <div className="md:w-full text-white">
                  <h3 className="text-2xl font-bold">Project Description</h3>
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
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

      {/* Lightbox for images */}
      {isLightboxOpen && (
        <Modal
          isOpen={isLightboxOpen}
          onRequestClose={closeLightbox}
          contentLabel="Image Lightbox"
          className="fixed inset-0 flex items-center justify-center z-60 outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-50"
          shouldCloseOnOverlayClick={true}
        >
          <div className="relative w-full max-w-7xl max-h-full p-12 rounded-lg flex items-center justify-center">
            <button onClick={closeLightbox} className="absolute top-2 right-2 text-white text-2xl z-70">
              &times;
            </button>
            <div className="relative w-full h-full">
              <Image
                src={activeImage}
                alt="Lightbox Image"
                layout="intrinsic"
                width={1200}
                height={800}
                className="rounded-lg max-h-[90vh] max-w-[90vw] object-contain"
              />
            </div>
            <button onClick={handlePreviousImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-indigo-600 p-1 rounded-md z-70">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={handleNextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-indigo-600 p-1 rounded-md z-70">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </Modal>

      )}
    </div>
  );
};

export default Showcase;
