import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Button from "./Button";

// Component to showcase client projects with images
const ClientShowcase = ({ clientData = [] }) => {
  // State variables to manage lightbox, images, filters, and categories
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  // Fetch images from the server based on client data
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/all-project-images');
        const data = await response.json();
        setAllImages(data.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Memoize categories and filtered images
  const categories = useMemo(() => {
    return ["All", ...new Set(allImages.map(image => image.client))];
  }, [allImages]);

  const filteredImages = useMemo(() => {
    return activeFilter === "All"
      ? allImages
      : allImages.filter(image => image.client === activeFilter);
  }, [activeFilter, allImages]);

  // Handle thumbnail click to open the lightbox
  const handleThumbnailClick = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  // Handle filter button click to set the active filter
  const handleFilterClick = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  // Display a message if no client data is available
  if (!Array.isArray(clientData) || clientData.length === 0) {
    return <div>No client data available.</div>;
  }

  return (
    <div className="client-showcase container mx-auto px-4 sm:px-6 py-10">
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center mb-6 gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleFilterClick(category)}
            className={`${activeFilter === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Image grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={image.src}
            className="break-inside-avoid mb-4 cursor-pointer rounded-lg overflow-hidden"
            onClick={() => handleThumbnailClick(index)}
          >
            <Image
              src={image.src}
              alt={`${image.client} - ${image.project}`}
              width={300}
              height={200}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox for viewing images */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={filteredImages.map(image => ({
            src: image.src,
            title: `${image.client} - ${image.project}`,
            description: image.description
          }))}
          index={lightboxIndex}
        />
      )}
    </div>
  );
};

export default ClientShowcase;