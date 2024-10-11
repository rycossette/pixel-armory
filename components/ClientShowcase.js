import Image from "next/image";
import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Button from "./Button";

// Component to showcase client projects with images
const ClientShowcase = ({ clientData = [] }) => {
  // State variables to manage lightbox, images, filters, and categories
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  // Fetch images from the server based on client data
  useEffect(() => {
    const fetchImages = async () => {
      const images = [];
      for (const client of clientData) {
        for (const project of client.projects) {
          try {
            const response = await fetch(`/api/project-images?client=${encodeURIComponent(client.name)}&project=${encodeURIComponent(project.name)}`);
            const data = await response.json();
            if (data.images && data.images.length > 0) {
              data.images.forEach(image => {
                images.push({
                  src: image.src,
                  client: client.name,
                  project: project.name,
                  description: data.projectDescription
                });
              });
            }
          } catch (error) {
            console.error(`Error fetching images for ${client.name} - ${project.name}:`, error);
          }
        }
      }
      setAllImages(images);
      setFilteredImages(images);
      const clientCategories = ["All", ...new Set(images.map(image => image.client))];
      setCategories(clientCategories);
    };

    fetchImages();
  }, [clientData]);

  // Update filtered images based on the active filter
  useEffect(() => {
    setFilteredImages(
      activeFilter === "All"
        ? allImages
        : allImages.filter(image => image.client === activeFilter)
    );
  }, [activeFilter, allImages]);

  // Handle thumbnail click to open the lightbox
  const handleThumbnailClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Handle filter button click to set the active filter
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  // Display a message if no client data is available
  if (!Array.isArray(clientData) || clientData.length === 0) {
    return <div>No client data available.</div>;
  }

  return (
    <div className="client-showcase container mx-auto px-4 sm:px-6 py-10">
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center mb-6 gap-2">
        {categories.map((category, index) => (
          <Button
            key={index}
            onClick={() => handleFilterClick(category)}
            className={`m-2 ${activeFilter === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Image grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={index}
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