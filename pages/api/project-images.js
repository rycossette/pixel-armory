import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { client, project } = req.query;
  const projectDir = path.join(process.cwd(), 'public', 'images', 'clients', client, project);

  try {
    if (!fs.existsSync(projectDir) || !fs.lstatSync(projectDir).isDirectory()) {
      return res.status(404).json({ error: 'Project directory not found' });
    }

    const files = fs.readdirSync(projectDir);
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map(file => ({
        src: `/images/clients/${client}/${project}/${file}`
      }));

    const descriptionFile = path.join(projectDir, 'description.txt');
    let projectDescription = '';
    if (fs.existsSync(descriptionFile)) {
      projectDescription = fs.readFileSync(descriptionFile, 'utf-8');
    }

    res.status(200).json({ images, projectDescription });
  } catch (error) {
    console.error('Error reading project directory:', error);
    res.status(500).json({ error: 'Error reading project directory' });
  }
}