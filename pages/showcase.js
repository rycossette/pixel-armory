import React from 'react';
import Nav from '../components/Nav';
import ClientShowcase from '../components/ClientShowcase';
import Footer from '../components/Footer';
import HeaderBasic from '../components/HeaderBasic';

const ShowcasePage = () => {
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
      <ClientShowcase />
      <Footer />
    </div>
  );
};

export default ShowcasePage;
