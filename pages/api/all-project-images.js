import fs from 'fs';
import path from 'path';
import exifr from 'exifr';

const getImageMetadata = async (imagePath) => {
  try {
    const metadata = await exifr.parse(imagePath);
    // Filter out unwanted data fields like Uint8Array
    const filteredMetadata = Object.fromEntries(
      Object.entries(metadata).filter(([key, value]) => 
        typeof value !== 'object' || !(value instanceof Uint8Array)
      )
    );
    return filteredMetadata;
  } catch (error) {
    console.error(`Error reading metadata for ${imagePath}:`, error);
    return null;
  }
};

export default async function handler(req, res) {
  const clientsDir = path.join(process.cwd(), 'public', 'images', 'clients');

  try {
    const images = [];
    const clients = fs.readdirSync(clientsDir);

    for (const client of clients) {
      const clientDir = path.join(clientsDir, client);
      if (fs.statSync(clientDir).isDirectory()) {
        const projects = fs.readdirSync(clientDir);

        for (const project of projects) {
          const projectDir = path.join(clientDir, project);
          if (fs.statSync(projectDir).isDirectory()) {
            const files = fs.readdirSync(projectDir);

            for (const file of files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))) {
              const imagePath = path.join(projectDir, file);
              const metadata = await getImageMetadata(imagePath);
              images.push({
                src: `/images/clients/${client}/${project}/${file}`,
                client,
                project,
                metadata,
              });
            }
          } else if (/\.(jpg|jpeg|png|gif)$/i.test(project)) {
            // Handle case where project is actually an image file
            const imagePath = path.join(clientDir, project);
            const metadata = await getImageMetadata(imagePath);
            images.push({
              src: `/images/clients/${client}/${project}`,
              client,
              project: 'Default',
              metadata,
            });
          }
        }
      } else if (/\.(jpg|jpeg|png|gif)$/i.test(client)) {
        // Handle case where client is actually an image file
        const imagePath = path.join(clientsDir, client);
        const metadata = await getImageMetadata(imagePath);
        images.push({
          src: `/images/clients/${client}`,
          client: 'Default',
          project: 'Default',
          metadata,
        });
      }
    }

    res.status(200).json({ images });
  } catch (error) {
    console.error('Error reading project directories:', error);
    res.status(500).json({ error: 'Error reading project directories', details: error.message });
  }
}