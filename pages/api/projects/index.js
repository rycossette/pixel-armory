import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const projectsDir = path.join(process.cwd(), 'public/images/projects');
  const projectFolders = fs.readdirSync(projectsDir);

  const projects = projectFolders.map((folder) => {
    const images = fs.readdirSync(path.join(projectsDir, folder));
    const thumbnail = images.find((img) => img.includes('_01')) || images[0];
    return { name: folder, thumbnail };
  });

  res.status(200).json(projects);
};