import fs from 'fs';
import path from 'path';
import Image from 'next/image';
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
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="mb-12">
                <h3 className="text-3xl font-bold mb-6">{project.name}</h3>
                <div
                  className={`grid gap-5 ${
                    project.images.length === 1
                      ? 'grid-cols-1'
                      : project.images.length === 2
                      ? 'grid-cols-2'
                      : 'grid-cols-3'
                  }`}
                >
                  {project.images.map((image, idx) => (
                    <div key={idx} className="overflow-hidden rounded-lg w-full h-[300px]">
                      <Image
                        src={image.src}
                        alt={`Project ${project.name} image ${idx}`}
                        width={400}
                        height={300}
                        layout="responsive"
                        quality={75}
                        className="object-cover w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                  ))}
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

// Fetch all clients and their projects from the filesystem
export async function getStaticPaths() {
  const clientsPath = path.join(process.cwd(), 'public/images/clients');
  const clientDirs = fs.readdirSync(clientsPath);

  const paths = clientDirs.map((client) => ({
    params: { client },
  }));

  return {
    paths,
    fallback: false, 
  };
}

export async function getStaticProps({ params }) {
  const { client } = params;
  const projectsPath = path.join(process.cwd(), `public/images/clients/${client}`);
  const projectDirs = fs.readdirSync(projectsPath);

  const projects = projectDirs.map((project) => {
    const projectPath = path.join(projectsPath, project);
    const imageFiles = fs
      .readdirSync(projectPath)
      .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));

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
