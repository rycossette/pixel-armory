import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const galleryDir = path.join(process.cwd(), 'public/images/portfolio');
const thumbDir = path.join(process.cwd(), 'public/images/thumbnails');

// Ensure the thumbnails directory exists
if (!fs.existsSync(thumbDir)) {
  fs.mkdirSync(thumbDir, { recursive: true });
}

export default async function handler(req, res) {
  const categories = fs.readdirSync(galleryDir);

  for (const category of categories) {
    const categoryPath = path.join(galleryDir, category);
    const thumbCategoryPath = path.join(thumbDir, category);

    // Ensure the category directory exists in the thumbnails directory
    if (!fs.existsSync(thumbCategoryPath)) {
      fs.mkdirSync(thumbCategoryPath, { recursive: true });
    }

    const images = fs.readdirSync(categoryPath);
    for (const image of images) {
      const imagePath = path.join(categoryPath, image);
      const thumbPath = path.join(thumbCategoryPath, image);

      // Check if thumbnail already exists
      if (!fs.existsSync(thumbPath)) {
        // Generate thumbnail using sharp
        try {
          await sharp(imagePath)
            .resize(250, 150) // Set your desired thumbnail size
            .toFile(thumbPath);
        } catch (error) {
          console.error('Error generating thumbnail:', error);
          res.status(500).json({ message: 'Error generating thumbnails' });
          return;
        }
      }
    }
  }

  res.status(200).json({ message: 'Thumbnails generated successfully' });
}
