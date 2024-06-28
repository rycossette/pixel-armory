import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.min.css';

const projects = [
  {
    id: '9WxsWSYW-dE',
    title: 'Demo Reel',
  },
  {
    id: 'ADUyJS9lIVQ',
    title: 'Winnebego',
  },
  {
    id: 'trvdpgiLwBE',
    title: 'Painbloc',
  },
  {
    id: 'zvFqAeuHy1w',
    title: 'Starkey Hearing Aids',
  },
  {
    id: 'RxVGZDzR7R4',
    title: 'Softwood Lumber Board',
  },
];

const FeaturedProjects = () => {
  const [isOpen, setOpen] = useState(false);
  const [videoId, setVideoId] = useState('');

  const openModal = (id) => {
    setVideoId(id);
    setOpen(true);
  };

  return (
    <section className="featured-projects bg-gradient-to-b bg-indigo-950 text-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="relative">
              <div
                className="relative w-full h-0 pb-[56.25%] bg-cover bg-center rounded-lg overflow-hidden shadow-lg cursor-pointer"
                style={{ backgroundImage: `url(https://img.youtube.com/vi/${project.id}/hqdefault.jpg)` }}
                onClick={() => openModal(project.id)}
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
              <div className="mt-2 text-center">
                <h4 className="text-xl font-semibold">{project.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />
    </section>
  );
};

export default FeaturedProjects;
