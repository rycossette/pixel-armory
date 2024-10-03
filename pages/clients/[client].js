import Image from 'next/image'; // Import Next.js Image component
import fs from 'fs';
import path from 'path';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import HeaderBasic from '../../components/HeaderBasic';

const ClientPage = ({ client, projects, headerImage }) => {
  return (
    <>
      <Nav />
      <HeaderBasic
        title={client}
        subtitle="Explore the projects we've worked on."
        backgroundImage={headerImage ? headerImage : null} // Use the header image if available
        backgroundColor={headerImage ? null : "rgb(31, 41, 55)"} // Fallback to color if no image
      />
      <div className="bg-gradient-to-b from-gray-950 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="mb-12">
                <h3 className="text-3xl font-bold mb-6">{project.name}</h3>
                <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 space-y-5">
                  {project.images.length > 0 ? (
                    project.images.map((image, idx) => (
                      <div key={idx} className="overflow-hidden rounded-lg">
                        <Image
                          src={image.src} // Ensure URL is correct (no over-encoding)
                          alt={`Project ${project.name} image ${idx}`}
                          width={500} // Set appropriate width for optimization
                          height={300} // Set appropriate height for optimization
                          layout="responsive" // Use responsive layout for better loading performance
                          loading="lazy" // Use lazy loading
                          className="object-cover w-full h-auto"
                        />
                      </div>
                    ))
                  ) : (
                    <p>No images found for this project.</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No projects found for this client.</p>
          )}
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

  const paths = clientDirs.map((client) => ({
    params: { client },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { client } = params;
  const projectsPath = path.join(process.cwd(), `public/images/clients/${client}`);

  let projectDirs = [];
  try {
    projectDirs = fs.readdirSync(projectsPath).filter((project) => {
      const projectPath = path.join(projectsPath, project);
      return fs.statSync(projectPath).isDirectory(); // Ensure it's a directory
    });
  } catch (error) {
    console.error(`Error reading directory for client: ${client}`, error);
    return { props: { client, projects: [], headerImage: null } };
  }

  const projects = projectDirs.map((project) => {
    const projectPath = path.join(projectsPath, project);
    const imageFiles = fs.readdirSync(projectPath).filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));

    const images = imageFiles.map((file) => {
      return { src: `/images/clients/${encodeURIComponent(client)}/${encodeURIComponent(project)}/${encodeURIComponent(file)}` };
    });

    return {
      name: project,
      images,
    };
  });

  let headerImage = null;
  for (const project of projects) {
    if (project.images.length > 0) {
      headerImage = project.images[0].src;
      console.log(`Header image found: ${headerImage} for project ${project.name}`);
      break;
    }
  }

  if (!headerImage) {
    console.warn(`No header image found for client: ${client}`);
  }

  return {
    props: {
      client,
      projects,
      headerImage,
    },
  };
}

export default ClientPage;
