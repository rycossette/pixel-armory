import path from 'path';
import fs from 'fs';

// Function to get all client and project data dynamically from the public/images folder
export default async function handler(req, res) {
  try {
    const clientsPath = path.join(process.cwd(), 'public/images/clients');
    const clientDirs = fs.readdirSync(clientsPath); // Read client directories

    const clients = await Promise.all(
      clientDirs.map(async (client) => {
        const projectsPath = path.join(clientsPath, client);
        const projectDirs = fs.readdirSync(projectsPath); // Read project directories within each client

        const projects = await Promise.all(
          projectDirs.map(async (project) => {
            const projectPath = path.join(projectsPath, project);
            
            // Only get image files (jpg, jpeg, png, webp, gif)
            const imageFiles = fs.readdirSync(projectPath).filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));

            return {
              name: project,
              images: imageFiles,
            };
          })
        );

        return {
          name: client,
          projects,
        };
      })
    );

    res.status(200).json(clients); // Return client data as JSON
  } catch (error) {
    console.error('Error fetching client data:', error);
    res.status(500).json({ error: 'Error fetching client data' });
  }
}
