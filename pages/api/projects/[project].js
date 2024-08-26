import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { project } = req.query;
  const projectDir = path.join(process.cwd(), `public/images/projects/${project}`);
  
  try {
    const images = fs.readdirSync(projectDir).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    res.status(200).json({ images });
  } catch (error) {
    res.status(404).json({ error: 'Project not found' });
  }
};