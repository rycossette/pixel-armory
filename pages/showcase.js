import React from 'react';
import Showcase from '../components/Showcase';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import HeaderBasic from '../components/HeaderBasic';

const ShowcasePage = () => {
  return (
    <div>
      <Nav />
      <div className="mt-24">
        <HeaderBasic
          title="Project Showcase"
          backgroundImage="/images/hero/darkmode_03.jpg"
        />
        <Showcase />
      </div>
      <Footer />
    </div>
  );
};

export default ShowcasePage;