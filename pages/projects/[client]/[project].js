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
        title={client}
        subtitle={project}
        backgroundColor="rgb(31, 41, 55)"
      />
      <div className="bg-gradient-to-b from-gray-950 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 space-y-5">
            {images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <img
                  src={image.src}
                  alt={`Image ${index}`}
                  className="object-cover w-full h-auto"
                  loading="lazy"
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
    // Only include directories
    return fs.statSync(path.join(clientsPath, dir)).isDirectory();
  });

  const paths = [];

  clientDirs.forEach((client) => {
    const projectsPath = path.join(clientsPath, client);
    const projectDirs = fs.readdirSync(projectsPath).filter((project) => {
      // Only include directories
      return fs.statSync(path.join(projectsPath, project)).isDirectory();
    });

    projectDirs.forEach((project) => {
      paths.push({
        params: { client, project },
      });
    });
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { client, project } = params;
  const imagesPath = path.join(process.cwd(), `public/images/clients/${client}/${project}`);
  const imageFiles = fs.readdirSync(imagesPath).filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));

  const images = imageFiles.map((file) => ({
    src: `/images/clients/${client}/${project}/${file}`,
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
