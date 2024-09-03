import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import HeaderBasic from '../components/HeaderBasic';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div>
      <Nav />
      
      <div className="mt-24">
        <HeaderBasic
          title="Contact Us"
          subtitle="Get in touch with Pixel Armory. We're here to help with all your creative needs."
          backgroundImage="/images/hero/3d2.png"
        />
      </div>
      
      <ContactForm />
      
      <Footer />
    </div>
  );
};

export default Contact;
