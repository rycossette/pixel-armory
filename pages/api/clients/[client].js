import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const clientsPath = path.join(process.cwd(), 'public/images/clients');
  const clientDirs = fs.readdirSync(clientsPath);

  const clients = clientDirs.map((client) => {
    const projectsPath = path.join(clientsPath, client);
    const projectDirs = fs.readdirSync(projectsPath);

    const projects = projectDirs.map((project) => {
      const projectPath = path.join(projectsPath, project);
      const imageFiles = fs.readdirSync(projectPath).filter((file) =>
        /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
      );

      return {
        name: project,
        images: imageFiles,
      };
    });

    return {
      name: client,
      projects,
    };
  });

  res.status(200).json(clients);
}
