import React from 'react';

const ServicesHeader = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-[50vh] flex items-center justify-center"
      style={{ backgroundImage: "url('/images/hero/darkmode_01.jpg')" }}
    >
      <div className="container mx-auto mt-16 px-6 lg:px-32 text-center text-white">
        <div className="section-title  mb-8">
          <h2 className="text-5xl font-bold pb-5">Our Services</h2>
        </div>
        <p className="text-xl">
          We work with a wide range of clients, large and small. Whatever your creative problem is, we will find a solution.
          And if we can't, we'll try to help you find someone who can.
        </p>
        <a href="#" className="primary-btn">View all services</a>
      </div>
    </section>
  );
};

export default ServicesHeader;
