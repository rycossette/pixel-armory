import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import 'yet-another-react-lightbox/styles.css'; // Main lightbox styles
import 'yet-another-react-lightbox/plugins/thumbnails.css'; // Thumbnails plugin styles
import exifr from 'exifr';
import Button from './Button'; // Custom button component

// MAIN GALLERY SECTION STARTS HERE
// ============================================================
const ClientShowcase = () => {
  const [clientData, setClientData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [projectDescriptions, setProjectDescriptions] = useState({});

  // Fetch client data from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/clients');
        const data = await response.json();
        if (Array.isArray(data)) {
          setClientData(data);
        } else {
          console.error('Client data is not an array', data);
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    }
    fetchData();
  }, []);

  // Fetch descriptions for each project and store in the state
  const fetchProjectDescriptions = async (client, project) => {
    try {
      const response = await fetch(`/api/project-description?client=${encodeURIComponent(client)}&project=${encodeURIComponent(project)}`);
      if (response.ok) {
        const description = await response.text();
        setProjectDescriptions(prevDescriptions => ({
          ...prevDescriptions,
          [`${client}-${project}`]: description || 'No description available.',
        }));
      } else {
        setProjectDescriptions(prevDescriptions => ({
          ...prevDescriptions,
          [`${client}-${project}`]: 'No description available.',
        }));
      }
    } catch (error) {
      setProjectDescriptions(prevDescriptions => ({
        ...prevDescriptions,
        [`${client}-${project}`]: 'Error fetching description.',
      }));
    }
  };

  // Collect categories based on the client names
  const categories = ['All', ...new Set(clientData.map(client => client.name))];

  // Filter clients based on the selected category
  const filterClients = () => {
    if (selectedCategory === 'All') {
      return clientData;
    }
    return clientData.filter(client => client.name === selectedCategory);
  };

  const filteredClients = filterClients();

  // OPEN LIGHTBOX FUNCTION
  // ------------------------------------------------------------
  const openLightbox = async (client, project, index) => {
    const projectImages = await Promise.all(
      project.images.map(async (image) => {
        const imagePath = `/images/clients/${client.name}/${project.name}/${image}`;
        const metadata = await exifr.parse(imagePath); // Extract metadata

        return {
          src: imagePath,
          title: metadata?.XPTitle || project.name,
          description: metadata?.XPSubject || 'No caption available',
        };
      })
    );
    setLightboxImages(projectImages);
    setPhotoIndex(index);
    setIsOpen(true);
  };

  // MAIN GALLERY DISPLAY LOGIC
  // ------------------------------------------------------------
  return (
    <div className="bg-gradient-to-b from-gray-950 to-indigo-950 min-h-screen py-10">
      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {categories.map((category, index) => (
          <Button
            key={index}
            onClick={() => setSelectedCategory(category)}
            isActive={selectedCategory === category}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Client Project Showcase */}
      <div className="container mx-auto px-4">
        {filteredClients.length > 0 ? (
          filteredClients.map((client, clientIndex) => (
            <div key={clientIndex} className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-6">{client.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {client.projects.map((project, projectIndex) => (
                  <div key={projectIndex} className="cursor-pointer">
                    <div
                      className="relative overflow-hidden rounded-lg border-2 border-transparent hover:border-indigo-600 transition-all duration-300 ease-in-out"
                      onClick={() => openLightbox(client, project, 0)}
                      onMouseEnter={() => fetchProjectDescriptions(client.name, project.name)} // Fetch project description
                    >
                      <Image
                        src={`/images/clients/${client.name}/${project.name}/${project.thumbnail}`}
                        alt={project.name}
                        width={300}
                        height={200}
                        className="object-cover w-full h-auto rounded-lg"
                        priority={clientIndex === 0}
                      />
                    </div>
                    <div className="text-center text-white mt-2">{project.name}</div>
                    <p className="text-center text-gray-400 mt-1">
                      {projectDescriptions[`${client.name}-${project.name}`]} {/* Project description */}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-white text-center">No clients found.</div>
        )}
      </div>

      {/* MAIN GALLERY SECTION ENDS HERE */}
      // ============================================================
      
      {/* LIGHTBOX SECTION STARTS HERE */}
      // ============================================================
      {isOpen && (
        <>
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={lightboxImages}
            plugins={[Thumbnails, Fullscreen]}
            thumbnails={{
              width: 150, // Increased size for thumbnails
              height: 85,
              border: 4,
              borderRadius: 10,
              padding: 4,
              borderColor: 'transparent',
              activeBorderColor: '#fbbf24',
              activeBackgroundColor: '#fbbf24',
              backgroundColor: 'transparent',
              fill: true,
            }}
            index={photoIndex}
            on={{ change: setPhotoIndex }}
            render={{
              // Render title and description for each image in the lightbox
              slideHeader: ({ slide }) => (
                <div className="absolute bottom-0 w-full text-center text-white bg-opacity-60 p-4 z-10 bg-black">
                  <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                  <p className="text-lg">{slide.description}</p> {/* Caption from metadata */}
                </div>
              ),
            }}
          />
        </>
      )}
      {/* LIGHTBOX SECTION ENDS HERE */}
      // ============================================================
    </div>
  );
};

export default ClientShowcase;
