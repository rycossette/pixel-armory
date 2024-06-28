import fs from 'fs';
import path from 'path';

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.mp4', '.mov'];

export default function handler(req, res) {
  const imageDir = path.join(process.cwd(), 'public/images/portfolio');
  const categories = {};

  fs.readdirSync(imageDir).forEach((category) => {
    const categoryPath = path.join(imageDir, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      categories[category] = fs.readdirSync(categoryPath).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return allowedExtensions.includes(ext) && file !== '.DS_Store';
      });
    }
  });

  res.status(200).json(categories);
}
