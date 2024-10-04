const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const clientsDir = path.join(__dirname, '..', 'public', 'images', 'clients');

const generateThumbnails = () => {
  const clients = fs.readdirSync(clientsDir).filter(client => fs.lstatSync(path.join(clientsDir, client)).isDirectory());

  clients.forEach((client) => {
    const clientDir = path.join(clientsDir, client);
    const projects = fs.readdirSync(clientDir).filter(project => fs.lstatSync(path.join(clientDir, project)).isDirectory());

    projects.forEach((project) => {
      const projectDir = path.join(clientDir, project);
      const thumbnailsDir = path.join(projectDir, 'thumbnails');

      if (!fs.existsSync(thumbnailsDir)) {
        fs.mkdirSync(thumbnailsDir);
      }

      const images = fs.readdirSync(projectDir).filter(file => /\.(jpg|jpeg|png)$/i.test(file));

      images.forEach((image) => {
        const inputPath = path.join(projectDir, image);
        const outputPath = path.join(thumbnailsDir, image);

        if (!fs.existsSync(outputPath)) {
          sharp(inputPath)
            .resize({ width: 300 })
            .toFile(outputPath)
            .then(() => console.log(`Thumbnail created for ${inputPath}`))
            .catch(err => console.error(err));
        }
      });
    });
  });
};

generateThumbnails();
