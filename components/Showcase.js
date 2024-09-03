import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Button from './Button';

Modal.setAppElement('#__next');  // This is necessary for accessibility reasons

const Showcase = () => {
  const [projectData, setProjectData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjectData(data);
    }
    fetchData();
  }, []);

  const categories = ['All', ...projectData.map(project => project.name)];

  const filterProjects = () => {
    if (selectedCategory === 'All') {
      return projectData;
    }
    return projectData.filter(project => project.name === selectedCategory);
  };

  const filteredProjects = filterProjects();

  const openProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const handleThumbnailClick = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const moveNext = () => {
    setPhotoIndex((index) => (index + 1) % selectedProject.images.length);
  };

  const movePrev = () => {
    setPhotoIndex((index) => (index + selectedProject.images.length - 1) % selectedProject.images.length);
  };

  const handleNextProject = () => {
    const currentIndex = projectData.findIndex(project => project.name === selectedProject.name);
    const nextIndex = (currentIndex + 1) % projectData.length;
    setSelectedProject(projectData[nextIndex]);
  };

  const handlePreviousProject = () => {
    const currentIndex = projectData.findIndex(project => project.name === selectedProject.name);
    const prevIndex = (currentIndex - 1 + projectData.length) % projectData.length;
    setSelectedProject(projectData[prevIndex]);
  };

  return (
    <div className="bg-gradient-to-b from-gray-950 to-indigo-950 mt-20">
      <div className="flex justify-center flex-wrap px-5 items-center py-5 gap-3 bg-transparent">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            isActive={selectedCategory === category}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="flex justify-center flex-wrap px-5 pt-[80px] pb-5 gap-3">
        <div className="columns-2 sm:columns-3 md:columns-3 lg:columns-4 xl:columns-3  lg:max-w-6xl  space-y-5">
          {filteredProjects.map((project, index) => {
            const firstImage = project.thumbnail;
            return (
              <div
                className="cursor-pointer overflow-hidden rounded-lg break-inside-avoid group"
                key={index}
                onClick={() => openProject(project)}
              >
                <div className="relative rounded-lg border-2 border-transparent group-hover:border-indigo-600 transition-all duration-300 ease-in-out">
                  <Image
                    src={`/images/projects/${project.name}/${firstImage}`}
                    alt={`Project ${project.name}`}
                    width={250}
                    height={150}
                    layout="responsive"
                    quality={75}
                    className="object-cover w-full h-auto rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="text-center text-white text-xl p-4 rounded-b-lg">
                  {project.name}
                </div>
              </div>
            );
          })}
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
            <div className="flex justify-between items-center p-4 rounded-tl-2xl rounded-tr-2xl bg-indigo-750 border-b-2 border-b-indigo-500 shadow-indigo-950 shadow-xl z-50">
              <h2 className="text-3xl text-white">{selectedProject.name}</h2>
              <div className="flex space-x-4">
                <Button onClick={handlePreviousProject}>Previous</Button>
                <Button onClick={handleNextProject}>Next</Button>
                <Button onClick={closeProject}>Close</Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 py-5 custom-scrollbar">
              <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 lg:max-w-5xl space-y-5">
                {selectedProject.images.map((image, index) => (
                  <div
                    key={index}
                    className="cursor-pointer group"
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <div className="overflow-hidden rounded-lg border-2 border-transparent group-hover:border-indigo-600 transition-all duration-300 ease-in-out">
                      <Image
                        src={`/images/projects/${selectedProject.name}/${image}`}
                        alt={`Image ${index + 1} of ${selectedProject.name}`}
                        width={800}
                        height={450}
                        layout="responsive"
                        quality={75}
                        className="object-cover w-full h-auto rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4"></div>
          </div>
        )}
      </Modal>

      {isOpen && selectedProject && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={selectedProject.images.map(image => ({
            src: `/images/projects/${selectedProject.name}/${image}`,
          }))}
          plugins={[Fullscreen, Zoom]}
          zoom={{
            wheel: true,  // Enable mouse wheel for zooming
            maxZoomPixelRatio: 3,  // Set the maximum zoom level
            zoomInMultiplier: 1.5,  // Speed up the zoom-in process
          }}
          on={{
            click: ({ target, currentTarget }) => {
              if (target === currentTarget) {
                setIsOpen(false);
              }
            },
          }}
          index={photoIndex}
        />
      )}
    </div>
  );
};

export default Showcase;
