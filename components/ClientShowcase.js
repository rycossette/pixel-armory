import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button'; // Custom button component

// Lazy load Lightbox and plugins
const Lightbox = dynamic(() => import('yet-another-react-lightbox'), {
  loading: () => <p>Loading Lightbox...</p>,
  ssr: false,
});

const Thumbnails = dynamic(() => import('yet-another-react-lightbox/plugins/thumbnails'), {
  loading: () => <p>Loading Thumbnails...</p>,
  ssr: false,
});

const Fullscreen = dynamic(() => import('yet-another-react-lightbox/plugins/fullscreen'), {
  loading: () => <p>Loading Fullscreen...</p>,
  ssr: false,
});

const ClientShowcase = ({ initialClientData }) => {
  const [clientData, setClientData] = useState(initialClientData || []);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [imageData, setImageData] = useState({});
  const [loading, setLoading] = useState(!initialClientData);

  // Clear filtered thumbnails when category is changed
  const [filteredClients, setFilteredClients] = useState(clientData);

  // Fetch client data dynamically if it's not available (for CSR)
  useEffect(() => {
    if (!initialClientData) {
      async function fetchData() {
        setLoading(true);
        try {
          const response = await fetch('/api/clients');
          const data = await response.json();
          await fetchImageDimensions(data);
          setClientData(data);
        } catch (error) {
          console.error('Error fetching client data:', error);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }
  }, [initialClientData]);

  // Fetch image dimensions
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

  const isVerticalImage = (imagePath) => {
    const dimensions = imageData[imagePath];
    if (dimensions) {
      return dimensions.height > dimensions.width;
    }
    return false;
  };

  // Update filtered clients when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredClients(clientData);
    } else {
      const filtered = clientData.filter((client) => client.name === selectedCategory);
      setFilteredClients(filtered);
    }
  }, [selectedCategory, clientData]);

  const renderProjectLayout = (client, projects) => {
    return (
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 space-y-5">
        {projects.map((project, projectIdx) => (
          project.images.map((image, imgIdx) => (
            <div key={`${client.name}-${projectIdx}-${imgIdx}`} className="relative w-full rounded-lg" style={{ paddingBottom: '56.25%' }}>
              <Image
                src={`/images/clients/${client.name}/${project.name}/${image}`}
                alt={project.name}
                fill
                sizes="100vw"
                className={`absolute inset-0 object-cover ${isVerticalImage(`/images/clients/${client.name}/${project.name}/${image}`) ? 'object-top' : 'object-center'} rounded-lg`}
                priority={imgIdx < 5} // Only prioritize the first few images
              />
            </div>
          ))
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-950 to-indigo-900 text-white py-20">
      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-8 px-4 pb-10 md:px-12 lg:px-24">
        {['All', ...new Set(clientData.map((client) => client.name))].map((category, index) => (
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
            <Link href={`/clients/${client.name}`} key={clientIndex} legacyBehavior>
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

      {/* Lightbox */}
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
        />
      )}
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clients`);
  const initialClientData = await response.json();

  return {
    props: {
      initialClientData,
    },
    revalidate: 60,
  };
}

export default ClientShowcase;
