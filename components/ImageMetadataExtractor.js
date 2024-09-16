import React, { useState } from 'react';
import exifr from 'exifr';

const ImageMetadataExtractor = () => {
  const [metadata, setMetadata] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    
    if (file) {
      try {
        // Extract metadata from the uploaded image
        const metadata = await exifr.parse(file);
        setMetadata(metadata);
      } catch (error) {
        console.error('Error reading metadata:', error);
        setMetadata({ error: 'Could not extract metadata' });
      }
    }
  };

  return (
    <div>
      <h1>Upload an Image to Extract Metadata</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {metadata && (
        <div>
          <h2>Image Metadata:</h2>
          <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageMetadataExtractor;
