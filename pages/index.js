import React from 'react';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Services from '../components/Services';
import AboutUs from '../components/AboutUs';
import FeaturedProjects from '../components/FeaturedProjects';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Showcase from '../components/Showcase';
import DemoReel from '../components/DemoReel'

const Home = () => {
  return (
    <div>
      <Nav />
      <Header />
      {/* <AboutUs /> */}
      <DemoReel />
      <Services />
      {/* <FeaturedProjects /> */}
      {/* <Gallery /> */}
      {/* <Showcase /> */}
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
