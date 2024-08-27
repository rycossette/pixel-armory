import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const projectsDir = path.join(process.cwd(), 'public/images/projects');
  
  // Read all items in the projects directory
  const items = fs.readdirSync(projectsDir);

  // Filter out only directories
  const projectFolders = items.filter(item => {
    const fullPath = path.join(projectsDir, item);
    return fs.statSync(fullPath).isDirectory();
  });

  // Create the response array with projects and their respective thumbnails
  const projects = projectFolders.map((folder) => {
    const images = fs.readdirSync(path.join(projectsDir, folder));
    const thumbnail = images.find((img) => img.includes('_01')) || images[0];
    return { name: folder, thumbnail };
  });

  res.status(200).json(projects);
};
