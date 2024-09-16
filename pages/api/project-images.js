import fs from 'fs';
import path from 'path';
import ExifReader from 'exifreader'; // Optional: if you want to extract EXIF metadata from the image

export default async function handler(req, res) {
  const { client, project } = req.query;

  try {
    const projectPath = path.join(process.cwd(), 'public', 'images', 'clients', client, project);
    const imageFiles = fs.readdirSync(projectPath);
    const imageData = [];

    for (const imageFile of imageFiles) {
      const imagePath = `${projectPath}/${imageFile}`;

      // Optional: Extract EXIF metadata (title, comments, etc.)
      const imageBuffer = fs.readFileSync(imagePath);
      const metadata = ExifReader.load(imageBuffer);

      const title = metadata['ImageDescription']?.description || 'Untitled';
      const description = metadata['UserComment']?.description || 'No description available';

      imageData.push({
        src: `/images/clients/${client}/${project}/${imageFile}`,
        title,
        description,
      });
    }

    // Read the project description from the .txt file
    const descriptionPath = path.join(process.cwd(), 'public', 'images', 'clients', client, `${project}.txt`);
    let projectDescription = 'No description available';
    if (fs.existsSync(descriptionPath)) {
      projectDescription = fs.readFileSync(descriptionPath, 'utf8');
    }

    res.status(200).json({ images: imageData, projectDescription });
  } catch (error) {
    console.error('Error fetching project images:', error);
    res.status(500).json({ error: 'Error fetching project images' });
  }
}
