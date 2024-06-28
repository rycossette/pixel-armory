import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';

const Carousel = () => {
  const slides = [
    { image: '/images/hero/explainer.jpg', title: 'Transforming Visions into Reality', description: 'Expert Motion Graphics, Animation, 3D Modeling, and Software Development' },
    { image: '/images/hero/3d.jpg', title: 'Innovative 3D Design', description: 'Creating engaging and informative explainer videos to simplify complex concepts.' },
    { image: '/images/hero/ai.jpg', title: 'AI Integration', description: 'Leveraging AI to enhance your projects and streamline processes.' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-full">
      {slides.map((slide, index) => (
        <Transition
          key={index}
          show={currentIndex === index}
          enter="transition-opacity duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-start items-end p-10">
              <div className="text-left text-white pb-10 max-w-md">
                <h1 className="text-4xl py-5 font-bold">{slide.title}</h1>
                <p className="text-xl mb-6">{slide.description}</p>
                <Link href="#contact" legacyBehavior>
                  <a className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Get Started</a>
                </Link>
              </div>
            </div>
          </div>
        </Transition>
      ))}
    </div>
  );
};

export default Carousel;
