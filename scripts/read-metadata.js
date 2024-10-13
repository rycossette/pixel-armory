const fs = require('fs');
const path = require('path');
const exifr = require('exifr'); // Make sure you have exifr installed: `npm install exifr`

const clientImagesDir = path.join(process.cwd(), 'public/images/clients');

const getImageMetadata = async (imagePath) => {
  try {
    const metadata = await exifr.parse(imagePath);
    // Filter out unwanted data fields like Uint8Array
    const filteredMetadata = Object.fromEntries(
      Object.entries(metadata).filter(([key, value]) => 
        typeof value !== 'object' || !value instanceof Uint8Array
      )
    );
    return filteredMetadata;
  } catch (error) {
    console.error(`Error reading metadata for ${imagePath}:`, error);
    return null;
  }
};

const readClientProjectImages = async () => {
  const clients = fs.readdirSync(clientImagesDir);

  for (const client of clients) {
    const clientDir = path.join(clientImagesDir, client);
    if (fs.lstatSync(clientDir).isDirectory()) {
      console.log(`Client: ${client}`);
      const projects = fs.readdirSync(clientDir);

      for (const project of projects) {
        const projectDir = path.join(clientDir, project);
        if (fs.lstatSync(projectDir).isDirectory()) {
          console.log(`  Project: ${project}`);
          const images = fs.readdirSync(projectDir);

          for (const image of images) {
            const imagePath = path.join(projectDir, image);
            const metadata = await getImageMetadata(imagePath);

            if (metadata) {
              console.log(`    Image: ${image}`);
              console.log(`      Metadata:`, metadata); // Outputs filtered metadata
            } else {
              console.log(`    Image: ${image} - No metadata found`);
            }
          }
        }
      }
    }
  }
};

readClientProjectImages();
