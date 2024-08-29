import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';

const MergedCarousel = () => {
  const slides = [
    { image: '/images/hero/bg1.webp' },
    { image: '/images/hero/explainer.jpg' },
    { image: '/images/hero/3d3.png' },
    { image: '/images/hero/ai.jpg' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[80vh]">
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
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center p-10">
              <div className="text-center text-white max-w-3xl">
                <h2 className="text-4xl font-bold mb-10">We are a Creative Design and Technical Solutions Agency.</h2>
                <p className="text-xl mb-6">We help brands captivate audiences, streamline processes, and achieve lasting impact.</p>
                <Link href="contact" legacyBehavior>
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

export default MergedCarousel;
