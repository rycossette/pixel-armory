import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import 'yet-another-react-lightbox/styles.css'; // Main lightbox styles
import 'yet-another-react-lightbox/plugins/thumbnails.css'; // Thumbnails plugin styles
import exifr from 'exifr';
import Button from './Button'; // Custom button component

const ClientShowcase = () => {
  const [clientData, setClientData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [imageData, setImageData] = useState({});

  // Fetch client data dynamically from client and project folders
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/clients');
        const data = await response.json();
        if (Array.isArray(data)) {
          await fetchImageDimensions(data);
          setClientData(data);
        } else {
          console.error('Client data is not an array', data);
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    }

    const fetchImageDimensions = async (clients) => {
      const newImageData = {};
      for (const client of clients) {
        for (const project of client.projects) {
          for (const image of project.images) {
            if (image) {
              const imagePath = `/images/clients/${client.name}/${project.name}/${image}`;
              const img = new window.Image();
              img.src = imagePath;
              await new Promise((resolve) => {
                img.onload = () => {
                  newImageData[imagePath] = {
                    width: img.width,
                    height: img.height,
                  };
                  resolve();
                };
              });
            }
          }
        }
      }
      setImageData(newImageData);
    };

    fetchData();
  }, []);

  const isVerticalImage = (imagePath) => {
    const dimensions = imageData[imagePath];
    if (dimensions) {
      return dimensions.height > dimensions.width;
    }
    return false; // default to horizontal if dimensions are not available yet
  };

  // Render the client project layout (seamless grid)
  const renderProjectLayout = (client, projects) => {
    return (
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 space-y-5">
        {projects.flatMap((project, idx) =>
          project.images.map((image, imgIdx) => (
            <div key={imgIdx} className="relative w-full rounded-lg" style={{ paddingBottom: '56.25%' }}>
              <Image
                src={`/images/clients/${client.name}/${project.name}/${image}`}
                alt={project.name}
                fill
                sizes="100vw"
                className={`absolute inset-0 object-cover ${isVerticalImage(`/images/clients/${client.name}/${project.name}/${image}`) ? 'object-top' : 'object-center'} rounded-lg`}
                priority={true}
              />
            </div>
          ))
        )}
      </div>
    );
  };

  const categories = ['All', ...new Set(clientData.map((client) => client.name))];

  const filterClients = () => {
    if (selectedCategory === 'All') {
      return clientData;
    }
    return clientData.filter((client) => client.name === selectedCategory);
  };

  const filteredClients = filterClients();

  return (
    <div className="bg-gradient-to-b from-gray-950  to-indigo-900 text-white py-20">
      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-8 px-4 pb-10 md:px-12 lg:px-24">
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
      <div className="container mx-auto px-0 lg:w-9/12">
        {filteredClients.length > 0 ? (
          filteredClients.map((client, clientIndex) => (
            <Link href={`/clients/${client.name}`} key={clientIndex}>
              <div className="service__item flex flex-col items-center bg-indigo-950 bg-opacity-80 rounded-2xl p-4 mb-5 w-full cursor-pointer">
                <h2 className="text-2xl font-bold text-white mb-6">{client.name}</h2>
                <div className="w-full">
                  {renderProjectLayout(client, client.projects)}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-white text-center">No clients found.</div>
        )}
      </div>

      {/* LIGHTBOX SECTION */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={lightboxImages}
          plugins={[Thumbnails, Fullscreen]}
          thumbnails={{
            width: 150,
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
            slideHeader: ({ slide }) => (
              <div className="absolute bottom-0 w-full text-center text-white bg-opacity-60 p-4 z-10 bg-black">
                <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                <p className="text-lg">{slide.description}</p>
              </div>
            ),
          }}
        />
      )}
    </div>
  );
};

export default ClientShowcase;
