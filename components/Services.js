import React from 'react';
import Image from 'next/image'; // Importing Next.js Image component

const servicesData = [
  {
    title: 'Motion Graphics & Animation',
    description: 'Captivating animations and motion graphics that engage and inspire.',
    imageUrl: '/images/examples/motion.png',
  },
  {
    title: '3D Modeling',
    description: 'Realistic 3D models that bring your ideas to life.',
    imageUrl: '/images/examples/3dmodel2.jpg',
  },
  {
    title: 'Full-Stack Development',
    description: 'Comprehensive web and mobile app development using the latest technologies.',
    imageUrl: '/images/examples/fullstack.png',
  },
  {
    title: 'Cloud Services & DevOps',
    description: 'Scalable cloud solutions and efficient DevOps practices.',
    imageUrl: '/images/examples/clouddevops.png',
  },
  {
    title: 'Machine Learning & Data Science',
    description: 'Innovative AI solutions to enhance business processes.',
    imageUrl: '/images/examples/mlds.png',
  },
];

const Services = () => (
  <section className="services bg-gradient-to-b from-indigo-950 to-black text-white py-20">
    <div className="container mx-auto px-2">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-20">Our Services</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="service__item flex flex-col items-center bg-indigo-900 bg-opacity-20 p-4 pb-4 rounded-2xl "
          >
            <div className="w-full mb-4">
              <Image
                src={service.imageUrl}
                alt={service.title}
                width={300} // Set explicit width
                height={300} // Set explicit height to maintain aspect ratio
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="w-full text-center">
              <h3 className="text-lg md:text-xl lg:text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-md md:text-lg lg:text-lg">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
