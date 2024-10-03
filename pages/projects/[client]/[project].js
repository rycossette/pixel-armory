import Image from 'next/image'; // Import Next.js Image component
import fs from 'fs';
import path from 'path';
import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import HeaderBasic from '../../../components/HeaderBasic';

const ProjectPage = ({ client, project, images }) => {
  return (
    <>
      <Nav />
      <HeaderBasic
        title={project}
        subtitle={`View images from ${client}'s project: ${project}`}
        backgroundColor="rgb(31, 41, 55)"
      />
      <div className="bg-gradient-to-b from-gray-950 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 space-y-5">
            {images.map((image, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg">
                <Image
                  src={image.src} // Ensure URL is correct (no over-encoding)
                  alt={`Project image ${idx}`}
                  width={500} // Set appropriate width for optimization
                  height={300} // Set appropriate height for optimization
                  layout="responsive" // Use responsive layout for better loading performance
                  loading="lazy" // Use lazy loading
                  className="object-cover w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getStaticPaths() {
  const clientsPath = path.join(process.cwd(), 'public/images/clients');
  const clientDirs = fs.readdirSync(clientsPath).filter((dir) => {
    return fs.statSync(path.join(clientsPath, dir)).isDirectory();
  });

  const paths = clientDirs.flatMap((client) => {
    const projectsPath = path.join(clientsPath, client);
    const projectDirs = fs.readdirSync(projectsPath).filter((project) => {
      return fs.statSync(path.join(projectsPath, project)).isDirectory();
    });
    return projectDirs.map((project) => ({
      params: { client, project },
    }));
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { client, project } = params;
  const projectPath = path.join(process.cwd(), `public/images/clients/${client}/${project}`);

  const imageFiles = fs.readdirSync(projectPath).filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));

  const images = imageFiles.map((file) => ({
    src: `/images/clients/${encodeURIComponent(client)}/${encodeURIComponent(project)}/${encodeURIComponent(file)}`,
  }));

  return {
    props: {
      client,
      project,
      images,
    },
  };
}

export default ProjectPage;
