import React from 'react';
import Nav from '../components/Nav';
import HeaderBasic from '../components/HeaderBasic';
import Footer from '../components/Footer';
import Services from '../components/Services';

const ServicesPage = () => {
  return (
    <div>
      <Nav />
      <div className="mt-20">
        <HeaderBasic
          title="What we can do for you."
          subtitle="We work with a wide range of clients, large and small. Whatever your creative problem is, we will find a solution. And if we can't, we'll try to help you find someone who can."
          backgroundImage="/images/hero/darkmode_02.jpg"
        />
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
