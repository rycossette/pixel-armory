import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import HeaderBasic from '../../components/HeaderBasic';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const ClientPage = ({ clientData }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);

  if (!clientData) {
    return <div>Client data not found</div>;
  }

  const { name, projects } = clientData;
  const headerImage = `/images/clients/${encodeURIComponent(name)}/header.jpg`;

  const handleThumbnailClick = (index, images) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const renderProjectLayout = (client, projects = []) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {projects.flatMap((project) =>
          (project.images || []).map((image, imgIdx) => {
            const imagePath = `/images/clients/${encodeURIComponent(client.name)}/${encodeURIComponent(project.name)}/thumbnails/${encodeURIComponent(image)}`;
            const fullImagePath = `/images/clients/${encodeURIComponent(client.name)}/${encodeURIComponent(project.name)}/${encodeURIComponent(image)}`;

            return (
              <div
                key={imgIdx}
                className="relative w-full rounded-lg cursor-pointer"
                style={{ paddingBottom: '56.25%' }}
                onClick={() => handleThumbnailClick(imgIdx, (project.images || []).map((img) => `/images/clients/${encodeURIComponent(client.name)}/${encodeURIComponent(project.name)}/${encodeURIComponent(img)}`))}
              >
                <Image
                  src={imagePath}
                  alt={project.name}
                  fill
                  sizes="100vw"
                  className="absolute inset-0 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            );
          })
        )}
      </div>
    );
  };

  return (
    <div>
      <Nav />

      <HeaderBasic
        title={name}
        subtitle={`Explore ${name}'s Projects`}
        backgroundImage={headerImage}
      />

      <div className="container mx-auto px-6 py-10">
        {projects.length > 0 ? (
          <div className="space-y-10">
            {projects.map((project) => (
              <div key={project.name}>
                <h3 className="text-xl font-semibold mb-4">{project.name}</h3>
                {renderProjectLayout(clientData, [project])}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No projects available for this client.</p>
        )}
      </div>

      <Footer />

      {/* Lightbox Component */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxImages.map((imgSrc) => ({ src: imgSrc }))}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
        />
      )}
    </div>
  );
};

// Generate static paths for all clients
export async function getStaticPaths() {
  const clientsDirectory = path.join(process.cwd(), 'public/images/clients');
  const clientNames = fs.readdirSync(clientsDirectory);

  const paths = clientNames.map((clientName) => ({
    params: { client: clientName },
  }));

  return { paths, fallback: false };
}

// Fetch client data for each page
export async function getStaticProps({ params }) {
  const { client } = params;
  const clientDir = path.join(process.cwd(), 'public/images/clients', client);
  
  const projects = fs.readdirSync(clientDir).map((projectName) => {
    const projectDir = path.join(clientDir, projectName);
    const images = fs.existsSync(path.join(projectDir, 'thumbnails'))
      ? fs.readdirSync(path.join(projectDir, 'thumbnails')).filter((img) => /\.(jpg|jpeg|png|gif)$/.test(img))
      : [];
    return { name: projectName, images };
  });

  return {
    props: {
      clientData: { name: client, projects },
    },
  };
}

export default ClientPage;
