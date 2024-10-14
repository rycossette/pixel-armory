import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
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
        console.log("API response:", data);
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

  // Custom layout for lightbox
  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handlePrevImage = useCallback(() => {
    setLightboxIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : filteredImages.length - 1
    );
  }, [filteredImages]);

  const handleNextImage = useCallback(() => {
    setLightboxIndex((prevIndex) =>
      prevIndex < filteredImages.length - 1 ? prevIndex + 1 : 0
    );
  }, [filteredImages]);

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
            className={`${activeFilter === category ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
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
      {lightboxOpen && filteredImages[lightboxIndex] && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-20 bg-black bg-opacity-90">
          <div className="bg-gray-950 bg-opacity-90 border-2 border-indigo-700 rounded-lg overflow-hidden w-full h-full flex flex-col">
            <div className="relative flex-grow ">
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].client}
                layout="fill"
                objectFit="contain"
              />
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-indigo-700 rounded-full p-2"
                onClick={handlePrevImage}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-indigo-700 rounded-full p-2"
                onClick={handleNextImage}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="p-4  text-white">
              <h2 className="text-2xl font-bold mb-2">{`${filteredImages[lightboxIndex].client} - ${filteredImages[lightboxIndex].project}`}</h2>

              {/* Metadata display */}
              {filteredImages[lightboxIndex].metadata && (
                <div className="mb-4">
                  {filteredImages[lightboxIndex].metadata.XPTitle && (
                    <p className="mb-1"><strong>Title:</strong> {filteredImages[lightboxIndex].metadata.XPTitle}</p>
                  )}
                  {filteredImages[lightboxIndex].metadata.XPSubject && (
                    <p className="mb-1"><strong>Subject:</strong> {filteredImages[lightboxIndex].metadata.XPSubject}</p>
                  )}
                  {filteredImages[lightboxIndex].metadata.ImageDescription && (
                    <p className="mb-1"><strong>Description:</strong> {filteredImages[lightboxIndex].metadata.ImageDescription}</p>
                  )}
                  {filteredImages[lightboxIndex].metadata.XPComment && (
                    <p className="mb-1"><strong>Comment:</strong> {filteredImages[lightboxIndex].metadata.XPComment}</p>
                  )}
                </div>
              )}

              {!filteredImages[lightboxIndex].metadata && (
                <p className="text-red-500 mb-4">No metadata available for this image.</p>
              )}

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleCloseLightbox}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientShowcase;
