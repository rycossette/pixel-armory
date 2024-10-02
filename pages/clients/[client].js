import fs from 'fs';
import path from 'path';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import HeaderBasic from '../../components/HeaderBasic';

const ClientPage = ({ client, projects }) => {
  return (
    <>
      <Nav />
      <HeaderBasic
        title={client}
        subtitle="Explore the projects we've worked on."
        backgroundColor="rgb(31, 41, 55)" 
      />
      <div className="bg-gradient-to-b from-gray-950 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          {projects.map((project, index) => (
            <div key={index} className="mb-12">
              <h3 className="text-3xl font-bold mb-6">{project.name}</h3>
              <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 space-y-5">
                {project.images.map((image, idx) => (
                  <div key={idx} className="overflow-hidden rounded-lg">
                    <img
                      src={image.src}
                      alt={`Project ${project.name} image ${idx}`}
                      className="object-cover w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
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

  const paths = clientDirs.map((client) => ({
    params: { client },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { client } = params;
  const projectsPath = path.join(process.cwd(), `public/images/clients/${client}`);
  const projectDirs = fs.readdirSync(projectsPath).filter((project) => {
    // Only include directories
    return fs.statSync(path.join(projectsPath, project)).isDirectory();
  });

  const projects = projectDirs.map((project) => {
    const projectPath = path.join(projectsPath, project);
    const imageFiles = fs.readdirSync(projectPath).filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));
    const images = imageFiles.map((file) => {
      return { src: `/images/clients/${client}/${project}/${file}` };
    });

    return {
      name: project,
      images,
    };
  });

  return {
    props: {
      client,
      projects,
    },
  };
}

export default ClientPage;
