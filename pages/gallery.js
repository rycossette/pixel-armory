import React from 'react';
import Gallery from '../components/Gallery';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import HeaderBasic from '../components/HeaderBasic';

const GalleryPage = () => {
  return (
    <div>
      <Nav />
      <div className="mt-20">
        <HeaderBasic
          title="Showcase"
          subtitle="Here you can explore some of the projects we've worked on."
          backgroundImage="/images/hero/darkmode_03.jpg"
        />
        <Gallery />
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;
