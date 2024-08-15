import React, { useState, useEffect, useCallback } from 'react';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import Button from './Button'; // Assuming Button component is in the same folder as Gallery.js
import Image from 'next/image';

const Gallery = () => {
  const [imageData, setImageData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    // Fetch the gallery data and ensure thumbnails are generated
    async function fetchData() {
      const galleryResponse = await fetch('/api/gallery');
      const galleryData = await galleryResponse.json();
      setImageData(galleryData);

      // Trigger thumbnail generation
      const thumbnailResponse = await fetch('/api/generate-thumbnails');
      if (!thumbnailResponse.ok) {
        console.error('Failed to generate thumbnails');
      }
    }
    fetchData();
  }, []);

  const categories = Object.keys(imageData);

  const filterImages = () => {
    if (selectedCategory === 'All') {
      return Object.entries(imageData).flatMap(([category, images]) =>
        images.map(image => ({ category, image }))
      );
    }
    return imageData[selectedCategory].map(image => ({ category: selectedCategory, image }));
  };

  const images = filterImages();

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const moveNext = useCallback(() => {
    setPhotoIndex((index) => (index + 1) % images.length);
  }, [images.length]);

  const movePrev = useCallback(() => {
    setPhotoIndex((index) => (index + images.length - 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      if (event.key === 'ArrowRight') {
        moveNext();
      } else if (event.key === 'ArrowLeft') {
        movePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, moveNext, movePrev]);

  return (
    <div className='bg-gradient-to-b from-slate-950 to-slate-900'>
      <div className='flex w-full mx-auto justify-center mt-14 py-10'>
        <h1 className="text-4xl text-white font-bold">Some of our work.</h1>
      </div>
  
      {/* Flex container for gallery and footer */}
      <div className="flex flex-col min-h-screen">
        {/* Gallery Container with minimum height */}
        <div className="flex-grow">
  
          {/* Category Buttons */}
          <div className="flex justify-center flex-wrap px-5 items-center py-5 gap-3 bg-transparent">
            {['All', ...categories].map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                isActive={selectedCategory === category}
              >
                {category}
              </Button>
            ))}
          </div>
  
          {/* Masonry Gallery Grid */}
          <div className='flex justify-center flex-wrap px-5 pt-[80px] pb-5 gap-3'>
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 lg:max-w-5xl space-y-5">
              {images.map(({ category, image }, index) => (
                <div className="overflow-hidden rounded-lg" key={index} onClick={() => openLightbox(index)}>
                  <Image
                    src={`/images/portfolio/${category}/${image}`}
                    alt={`Artwork ${index}`}
                    width={250}
                    height={150}
                    layout="intrinsic"
                    quality={75}
                    className="object-cover w-full h-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Lightbox */}
          {isOpen && (
            <Lightbox
              mainSrc={`/images/portfolio/${images[photoIndex].category}/${images[photoIndex].image}`}
              nextSrc={`/images/portfolio/${images[(photoIndex + 1) % images.length].category}/${images[(photoIndex + 1) % images.length].image}`}
              prevSrc={`/images/portfolio/${images[(photoIndex + images.length - 1) % images.length].category}/${images[(photoIndex + images.length - 1) % images.length].image}`}
              onCloseRequest={closeLightbox}
              onMovePrevRequest={movePrev}
              onMoveNextRequest={moveNext}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
