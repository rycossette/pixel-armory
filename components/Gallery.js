import React, { useState } from 'react';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css'; // This only needs to be imported once in your app

const Gallery = ({ theme, images = [], selectedCategory }) => { // Default images to an empty array
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  // Render the component only if images is not undefined and has length
  if (!images.length) {
    return <div>Loading...</div>; // Or any other placeholder content
  }

  return (
    <div className={`gallery ${theme}`}>
      {images.map((image, index) => (
        <img
          key={index}
          src={`/images/${selectedCategory}/${image}`}
          alt={`Artwork ${index}`}
          onClick={() => openLightbox(index)}
        />
      ))}

      {isOpen && (
        <Lightbox
          mainSrc={`/images/${selectedCategory}/${images[photoIndex]}`}
          nextSrc={`/images/${selectedCategory}/${images[(photoIndex + 1) % images.length]}`}
          prevSrc={`/images/${selectedCategory}/${images[(photoIndex + images.length - 1) % images.length]}`}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};

export default Gallery;
