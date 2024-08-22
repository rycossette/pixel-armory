import React from 'react';

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
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-20">Our Services</h2>
      <div className="flex flex-col space-y-20">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className={`service__item flex flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} items-center`}
          >
            <div className="md:w-1/2 w-full">
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full object-cover"
                style={{ aspectRatio: '1 / 1' }} // Maintain the square aspect ratio
              />
            </div>
            <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-lg">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
