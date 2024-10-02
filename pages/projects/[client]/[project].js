import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import exifr from 'exifr';
import Nav from '../../../components/Nav'; // Correct import path for Nav
import Footer from '../../../components/Footer'; // Correct import path for Footer
import HeaderBasic from '../../../components/HeaderBasic'; // Correct import path for HeaderBasic

const ProjectPage = ({ client, project, description, images }) => {
  return (
    <>
      {/* Nav Component */}
      <Nav />

      {/* HeaderBasic with Client Name and Project Name */}
      <HeaderBasic
        title={client}
        subtitle={project}
        backgroundColor="rgb(31, 41, 55)" // Dark indigo background (customize if needed)
      />

      {/* Main Content */}
      <div className="bg-gradient-to-b from-gray-950 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 ">
          {/* Masonry Gallery Grid */}
          <div className="flex justify-center flex-wrap px-5 pt-[80px] pb-5 gap-3">
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 space-y-5">
              {images.map((image, index) => (
                <div
                  className="overflow-hidden rounded-lg"
                  key={index}
                  style={{ breakInside: 'avoid' }}
                >
                  <Image
                    src={image.src}
                    alt={`Artwork ${index}`}
                    width={image.width} // Keep the original size from metadata
                    height={image.height}
                    layout="responsive"
                    quality={75}
                    className="object-cover w-full h-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

// Generate dynamic paths for each project
export async function getStaticPaths() {
  const clientsPath = path.join(process.cwd(), 'public/images/clients');
  const clientDirs = fs.readdirSync(clientsPath);
  const paths = [];

  clientDirs.forEach((client) => {
    const projectsPath = path.join(clientsPath, client);
    const projectDirs = fs.readdirSync(projectsPath);
    projectDirs.forEach((project) => {
      paths.push({
        params: { client, project },
      });
    });
  });

  return { paths, fallback: false };
}

// Get the content for the individual project
export async function getStaticProps({ params }) {
  const { client, project } = params;

  // Get description from text file
  const descriptionPath = path.join(process.cwd(), `public/images/clients/${client}/${project}/description.txt`);
  let description = 'No description available';
  if (fs.existsSync(descriptionPath)) {
    description = fs.readFileSync(descriptionPath, 'utf8');
  }

  // Get images and their metadata
  const imagesPath = path.join(process.cwd(), `public/images/clients/${client}/${project}`);
  const imageFiles = fs.readdirSync(imagesPath).filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));
  const images = await Promise.all(
    imageFiles.map(async (file) => {
      const filePath = `/images/clients/${client}/${project}/${file}`;
      const metadata = await exifr.parse(path.join(imagesPath, file));
      return {
        src: filePath,
        title: metadata?.XPTitle || project,
        description: metadata?.XPSubject || '',
        width: 800, // Set your desired width
        height: 600, // Set your desired height
      };
    })
  );

  return {
    props: {
      client,
      project,
      description,
      images,
    },
  };
}

export default ProjectPage;
