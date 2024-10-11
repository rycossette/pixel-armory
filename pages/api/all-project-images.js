import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const clientsDir = path.join(process.cwd(), 'public', 'images', 'clients');

  try {
    const images = [];
    const clients = fs.readdirSync(clientsDir);

    clients.forEach(client => {
      const clientDir = path.join(clientsDir, client);
      if (fs.statSync(clientDir).isDirectory()) {
        const projects = fs.readdirSync(clientDir);

        projects.forEach(project => {
          const projectDir = path.join(clientDir, project);
          if (fs.statSync(projectDir).isDirectory()) {
            const files = fs.readdirSync(projectDir);

            const projectImages = files
              .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
              .map(file => ({
                src: `/images/clients/${client}/${project}/${file}`,
                client,
                project,
              }));

            images.push(...projectImages);
          } else if (/\.(jpg|jpeg|png|gif)$/i.test(project)) {
            // Handle case where project is actually an image file
            images.push({
              src: `/images/clients/${client}/${project}`,
              client,
              project: 'Default',
            });
          }
        });
      } else if (/\.(jpg|jpeg|png|gif)$/i.test(client)) {
        // Handle case where client is actually an image file
        images.push({
          src: `/images/clients/${client}`,
          client: 'Default',
          project: 'Default',
        });
      }
    });

    res.status(200).json({ images });
  } catch (error) {
    console.error('Error reading project directories:', error);
    res.status(500).json({ error: 'Error reading project directories', details: error.message });
  }
}