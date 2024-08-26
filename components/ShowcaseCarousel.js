import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ShowcaseCarousel = ({ project }) => {
  console.log("Rendering ShowcaseCarousel with project:", project); // Debugging log
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <button className="slick-next">Next</button>,
    prevArrow: <button className="slick-prev">Prev</button>,
  };

  if (!project || !project.images) return null;

  return (
    <div className="showcase-carousel">
      <h2 className="text-3xl text-center text-white mb-4">{project.name}</h2>
      
      <Slider {...settings} className="mb-8">
        {project.images.map((image, index) => (
          <div key={index} className="carousel-image">
            <Image
              src={`/images/projects/${project.name}/${image}`}
              alt={`Image ${index + 1} of ${project.name}`}
              width={800}
              height={450}
              layout="responsive"
              className="object-cover w-full h-auto"
            />
          </div>
        ))}
      </Slider>

      <div className="description text-white max-w-4xl mx-auto text-center">
        <p>{project.description}</p>
      </div>
    </div>
  );
};

export default ShowcaseCarousel;
