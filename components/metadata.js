const fs = require('fs');
const path = require('path');
const ExifReader = require('exifr'); // Assuming you have installed exifr

// Correct path to your images directory
const imageDir = path.join(__dirname, '..', 'public', 'images', 'clients');

// Function to log metadata from images
const logImageMetadata = async () => {
  try {
    // Read the directory containing clients
    const clients = await fs.promises.readdir(imageDir);

    for (const client of clients) {
      const clientDir = path.join(imageDir, client);

      // Check if it's a directory
      const clientStat = await fs.promises.stat(clientDir);
      if (clientStat.isDirectory()) {
        const projects = await fs.promises.readdir(clientDir);

        for (const project of projects) {
          const projectDir = path.join(clientDir, project);

          // Again, check if it's a directory
          const projectStat = await fs.promises.stat(projectDir);
          if (projectStat.isDirectory()) {
            const images = await fs.promises.readdir(projectDir);

            for (const image of images) {
              const imagePath = path.join(projectDir, image);

              // Check if it's a JPEG file (you can add other formats if needed)
              if (image.endsWith('.jpg') || image.endsWith('.jpeg')) {
                try {
                  const metadata = await ExifReader.parse(imagePath);
                  console.log(`Metadata for ${image}:`, metadata);
                } catch (err) {
                  console.error(`Error reading metadata for ${image}:`, err);
                }
              }
            }
          }
        }
      }
    }
  } catch (err) {
    console.error('Error reading directory:', err);
  }
};

logImageMetadata();
