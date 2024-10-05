const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
const layoutFilePath = path.join(dataDir, 'imageLayout.json');

// Function to generate some example layout data (you can replace this with your actual logic)
function generateImageLayout() {
  const layoutData = {
    clients: [
      { name: 'Client1', images: ['img1.jpg', 'img2.jpg', 'img3.jpg'] },
      { name: 'Client2', images: ['img4.jpg', 'img5.jpg', 'img6.jpg'] }
    ],
  };

  // Ensure the 'data' directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true }); // Create the data directory if it doesn't exist
  }

  // Write the layout data to 'imageLayout.json'
  fs.writeFileSync(layoutFilePath, JSON.stringify(layoutData, null, 2));
  console.log(`Image layout data written to ${layoutFilePath}`);
}

// Generate the image layout
generateImageLayout();
