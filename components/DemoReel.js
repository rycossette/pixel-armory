import React, { useState } from 'react';

const projects = [
  {
    id: '9WxsWSYW-dE',
    // title: 'Demo Reel',
  },
];

const FeaturedProjects = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section className="featured-projects bg-gradient-to-b from-indigo-950 to-indigo-900 text-white py-20">
      <div className="container mx-auto px-4">
        {/* <h2 className="text-4xl font-bold text-center mb-10">Demo Reel</h2> */}
        <div className="flex justify-center">
          <div className="w-full max-w-screen-lg rounded-2xl">
            {projects.map((project) => (
              <div key={project.id} className="relative">
                {isPlaying ? (
                  <div className="relative w-full h-0 pb-[56.25%] rounded-2xl">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-2xl "
                      src={`https://www.youtube.com/embed/${project.id}?autoplay=1&rel=0`}
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div
                    className="relative w-full h-0 pb-[56.25%] bg-cover bg-center overflow-hidden shadow-lg cursor-pointer rounded-2xl"
                    style={{ backgroundImage: `url(https://img.youtube.com/vi/${project.id}/hqdefault.jpg)` }}
                    onClick={playVideo}
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <button
                        className="text-white bg-indigo-600 hover:bg-indigo-700 rounded-full p-3 focus:outline-none"
                        aria-label="Play Video"
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4.5 3.5L15.5 10L4.5 16.5V3.5Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
                <div className="mt-2 text-center">
                  <h4 className="text-xl font-semibold">{project.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
