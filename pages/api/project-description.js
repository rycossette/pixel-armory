import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { client, project } = req.query;

  // Define the base path to the public folder
  const basePath = path.join(process.cwd(), 'public', 'images', 'clients', client);

  // Check if the project description file exists
  const descriptionFilePath = path.join(basePath, `${project}.txt`);

  try {
    const description = await fs.readFile(descriptionFilePath, 'utf-8');
    res.status(200).send(description);
  } catch (error) {
    res.status(404).json({ error: `Project description for ${project} not found.` });
  }
}
