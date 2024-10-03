const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const clientsDir = path.join(process.cwd(), 'public', 'images', 'clients');

function generateThumbnails() {
  const clientFolders = fs.readdirSync(clientsDir);

  clientFolders.forEach((client) => {
    const clientPath = path.join(clientsDir, client);
    
    // Ensure clientPath is a directory, skip files like 'header.jpg'
    if (!fs.statSync(clientPath).isDirectory()) {
      return;
    }

    const projectFolders = fs.readdirSync(clientPath);

    projectFolders.forEach((project) => {
      const projectPath = path.join(clientPath, project);

      // Ensure projectPath is a directory, skip any files inside the client folder
      if (!fs.statSync(projectPath).isDirectory()) {
        return;
      }

      const imageFiles = fs.readdirSync(projectPath).filter((file) =>
        /\.(jpg|jpeg|png)$/i.test(file)
      );

      const thumbnailsDir = path.join(projectPath, 'thumbnails');
      if (!fs.existsSync(thumbnailsDir)) {
        fs.mkdirSync(thumbnailsDir);
      }

      imageFiles.forEach((image) => {
        const imagePath = path.join(projectPath, image);
        const thumbnailPath = path.join(thumbnailsDir, image);

        // Skip if the thumbnail already exists
        if (fs.existsSync(thumbnailPath)) {
          return;
        }

        // Create thumbnail
        sharp(imagePath)
          .resize(300) // Adjust the size as needed
          .toFile(thumbnailPath)
          .then(() => {
            console.log(`Thumbnail created for ${imagePath}`);
          })
          .catch((err) => {
            console.error(`Error creating thumbnail for ${imagePath}:`, err);
          });
      });
    });
  });
}

generateThumbnails();
