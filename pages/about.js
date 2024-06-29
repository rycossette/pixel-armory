import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Image from 'next/image';

const About = () => {
  return (
    <div className="bg-indigo-950 text-white font-sans">
      <Nav />

      {/* Hero Section */}
      <header className="relative mt-20 py-24 text-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/darkmode_02.jpg"
            alt="Pixel Armory Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-indigo-900 opacity-75"></div>
        </div>
        <div className="container mx-auto px-6 lg:px-32 relative z-10">
          <h1 className="text-5xl font-display font-bold mb-4">About Us</h1>
          <p className="text-2xl leading-relaxed max-w-3xl mx-auto">
            Pixel Armory is a creative agency specializing in motion design, 3D modeling/animation, web design, server-side development, advanced networking, AI, and more.
          </p>
        </div>
      </header>

      {/* Our Story Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6 lg:px-32 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Our Story</h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto">
            Founded by industry veterans Ryan Cossette and Matt Kinser, Pixel Armory started as a response to client demand. Our mission is to deliver high-quality, innovative solutions to our clients&apos; creative challenges.
          </p>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 lg:px-32">

          <h2 className="text-4xl font-display font-bold text-center mb-12">Our Leadership</h2>

          <div className="flex flex-col md:flex-row md:space-x-12 justify-center">
            
            {/* Matt Kinser Card */}
            <div className="bg-gradient-to-b from-indigo-950 to-indigo-800 rounded-lg overflow-hidden shadow-lg mb-12 md:mb-0 flex-1 max-w-fit"> {/* Adjusted width */}
              <div className="relative h-96">
                <Image
                  src="/images/team/mattkinser.webp"
                  alt="Matt Kinser"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className="rounded-lg"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold mb-2">Matt Kinser</h3>
                <p className="text-indigo-500 mb-4">Co-Founder &amp; Technical Director</p>
                <p className="text-gray-300 leading-relaxed">
                  With over two decades of full-stack development experience, Matt Kinser has applied machine learning to enhance profitability, co-founded a podcast startup, and managed operations at an enterprise video hosting firm. His expertise encompasses code craftsmanship, system design, rapid learning, problem-solving, creativity, and teamwork, all aimed at driving organizational success.
                </p>
              </div>
            </div>

            {/* Ryan Cossette Card */}
            <div className="bg-gradient-to-b from-indigo-950 to-indigo-800 rounded-lg overflow-hidden shadow-lg flex-1 max-w-fit"> {/* Adjusted width */}
              <div className="relative h-96">
                <Image
                  src="/images/team/ryan.webp"
                  alt="Ryan Cossette"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className="rounded-lg"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold mb-2">Ryan Cossette</h3>
                <p className="text-indigo-500 mb-4">Co-Founder &amp; Creative Director</p>
                <p className="text-gray-300 leading-relaxed">
                  With over 20 years in the creative industry, Ryan Cossette brings extensive experience in design and content creation, including roles at Apple as a Content Engineer for Final Cut Pro, Motion, iMovie, and Clips. His background spans founding Pixel Armory and contributing to high-profile projects such as Super Bowl LII and the 2017 Olympics.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6 lg:px-32 text-center">
          <h2 className="text-4xl font-display font-bold mb-12">Our Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Expertise Items */}
            <div className="bg-indigo-800 rounded-lg p-6 text-center shadow-lg">
              <p className="text-white text-lg">Motion Design</p>
            </div>
            <div className="bg-indigo-800 rounded-lg p-6 text-center shadow-lg">
              <p className="text-white text-lg">3D Modeling</p>
            </div>
            <div className="bg-indigo-800 rounded-lg p-6 text-center shadow-lg">
              <p className="text-white text-lg">Web Design</p>
            </div>
            <div className="bg-indigo-800 rounded-lg p-6 text-center shadow-lg">
              <p className="text-white text-lg">AI &amp; Machine Learning</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
