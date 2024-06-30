import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import HeaderBasic from '../components/HeaderBasic';
import TeamSection from '../components/TeamSection';
import ExpertiseSection from '../components/ExpertiseSection';

const About = () => {
  return (
    <div className="bg-indigo-950 text-white font-sans">
      <Nav />

      {/* Hero Section */}
      <HeaderBasic
        title="About Us"
        subtitle="Pixel Armory is a creative agency specializing in motion design, 3D modeling/animation, web design, server-side development, advanced networking, AI, and more. Founded by industry veterans Ryan Cossette and Matt Kinser, Pixel Armory started as a response to client demand. Our mission is to deliver high-quality, innovative solutions to our clients&apos; creative challenges."
        backgroundImage="/images/hero/darkmode_02.jpg"
        // backgroundColor="bg-gray-900"
        marginTop="20px" // Adjust margin top to compensate for navbar height
      />

      <TeamSection />

      <ExpertiseSection />

      <Footer />
    </div>
  );
};

export default About;
