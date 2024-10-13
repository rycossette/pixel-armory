const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const clientsDir = path.join(process.cwd(), 'public', 'images', 'clients');
const outputFile = path.join(process.cwd(), 'image-metadata-output.txt');

async function getImageMetadata(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    const stats = fs.statSync(filePath);

    return {
      fileName: path.basename(filePath),
      size: stats.size,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      // We can't easily get the title, comment, or tags without ExifTool,
      // but we can include other metadata that Sharp provides
      space: metadata.space,
      channels: metadata.channels,
      depth: metadata.depth,
      density: metadata.density,
      chromaSubsampling: metadata.chromaSubsampling,
      isProgressive: metadata.isProgressive,
      hasProfile: metadata.hasProfile,
      hasAlpha: metadata.hasAlpha,
    };
  } catch (error) {
    return { error: `Error reading file: ${error.message}` };
  }
}

async function traverseDirectory(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await traverseDirectory(fullPath);
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(item)) {
      const relativePath = path.relative(clientsDir, fullPath);
      const metadata = await getImageMetadata(fullPath);
      fs.appendFileSync(outputFile, `\nFile: ${relativePath}\n`);
      fs.appendFileSync(outputFile, `Metadata: ${JSON.stringify(metadata, null, 2)}\n`);
    }
  }
}

console.log('Scanning images in clients directory...\n');
fs.writeFileSync(outputFile, ''); // Clear the file before writing
traverseDirectory(clientsDir).then(() => {
  console.log('Scan complete. Results written to image-metadata-output.txt');
}).catch((error) => {
  console.error('An error occurred:', error);
});