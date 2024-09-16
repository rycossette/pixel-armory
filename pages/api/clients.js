import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const clientDir = path.join(process.cwd(), 'public/images/clients');
  
  try {
    // Check if the clients directory exists
    if (!fs.existsSync(clientDir)) {
      console.error('Client directory not found:', clientDir);
      return res.status(500).json({ error: 'Client directory not found' });
    }

    // Read the clients directory
    const clients = fs.readdirSync(clientDir).map(clientName => {
      const clientPath = path.join(clientDir, clientName);
      
      if (fs.statSync(clientPath).isDirectory()) {
        // Read projects in each client folder
        const projects = fs.readdirSync(clientPath).map(projectName => {
          const projectPath = path.join(clientPath, projectName);
          
          // Ensure the project path is a directory
          if (fs.statSync(projectPath).isDirectory()) {
            // Read images in each project folder
            const images = fs.readdirSync(projectPath).filter(file => {
              const ext = path.extname(file).toLowerCase();
              return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
            });

            // Log missing images
            if (!images || images.length === 0) {
              console.warn(`No images found for project ${projectName} in client ${clientName}`);
            }

            return {
              name: projectName,
              thumbnail: images.find(img => img.includes('_01')) || images[0], // Choose the first image or a custom one
              images
            };
          } else {
            console.warn(`Project path is not a directory: ${projectPath}`);
            return null;
          }
        }).filter(Boolean);

        return {
          name: clientName,
          projects
        };
      } else {
        console.warn(`Client path is not a directory: ${clientPath}`);
        return null;
      }
    }).filter(Boolean);

    // If no clients were found, log and return an error
    if (!clients || clients.length === 0) {
      console.error('No valid clients found in directory:', clientDir);
      return res.status(500).json({ error: 'No valid clients found' });
    }

    // Return the client data
    res.status(200).json(clients);
  } catch (error) {
    // Catch any unexpected errors and log them
    console.error('Error reading client directory:', error);
    res.status(500).json({ error: 'Error reading client data' });
  }
}
