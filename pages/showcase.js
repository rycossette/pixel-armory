import React from 'react';
import fs from 'fs';
import path from 'path';
import Nav from '../components/Nav';
import ClientShowcase from '../components/ClientShowcase';
import Footer from '../components/Footer';
import HeaderBasic from '../components/HeaderBasic';

const ShowcasePage = ({ clientData }) => {
  return (
    <div>
      {/* Header */}
      <Nav />
      <HeaderBasic
        title="Project Showcase"
        subtitle="Explore Our Diverse Work"
        backgroundImage="/images/hero/darkmode_03.jpg"
      />
      {/* Linking to ClientShowcase Component */}
      <ClientShowcase clientData={clientData} />
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  try {
    const clientsDir = path.join(process.cwd(), "public/images/clients");
    const clientFolders = fs.readdirSync(clientsDir);

    const clientData = clientFolders.map((clientName) => {
      const clientPath = path.join(clientsDir, clientName);
      const projectFolders = fs.readdirSync(clientPath);

      const projects = projectFolders.map((projectName) => {
        const projectPath = path.join(clientPath, projectName, "thumbnails");
        let images = [];

        try {
          images = fs.readdirSync(projectPath).filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file));
        } catch (error) {
          console.warn(`No thumbnails found for project: ${projectName}`);
        }

        return { name: projectName, images };
      });

      return { name: clientName, projects };
    });

    return {
      props: {
        clientData,
      },
      revalidate: 60, // Rebuild every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching client data:", error);
    return {
      props: {
        clientData: [],
      },
    };
  }
}

export default ShowcasePage;
