import fs from 'fs';
import path from 'path';

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.mp4', '.mov'];

export default function handler(req, res) {
  const imageDir = path.join(process.cwd(), 'public/images/projects');
  const categories = [];

  fs.readdirSync(imageDir).forEach((category) => {
    const categoryPath = path.join(imageDir, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const images = fs.readdirSync(categoryPath).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return allowedExtensions.includes(ext) && file !== '.DS_Store';
      });
      if (images.length > 0) {
        categories.push({
          name: category,
          images,
          thumbnail: images.find(img => img.includes('_01')) || images[0]
        });
      }
    }
  });

  res.status(200).json(categories);
}
