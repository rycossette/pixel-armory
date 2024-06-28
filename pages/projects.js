import Link from 'next/link';
import Nav from '../components/nav';
import Header from '../components/Header';
import Footer from '../components/Footer'
import Projects from '../components/Projects';

export default function Home() {
  return (
    <div>
      <Nav />
      <div className='flex w-full mx-auto justify-center mt-14 py-20'>
        <h1 className="text-4xl text-white font-bold">Notable Projects & Software Releases</h1>
      </div>
      <Projects />
      <Footer />
    </div>
  );
}
