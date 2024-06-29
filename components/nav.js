import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full bg-black px-5 py-5">
      <div className="flex items-center h-12">
        <Image src="/images/logo/pa.png" 
        width={100} 
        height={100} 
        alt="Logo" 
        className="h-full" 
        />
      </div>
      <div className="hidden md:flex flex-grow justify-center">
        <Link href="/" legacyBehavior><a className="text-white hover:text-indigo-500 active:text-amber-500 mx-4">Home</a></Link>
        <Link href="/about" legacyBehavior><a className="text-white hover:text-indigo-500 active:text-amber-500 mx-4">About Us</a></Link>
        <Link href="/gallery" legacyBehavior><a className="text-white hover:text-indigo-500 active:text-amber-500 mx-4">Showcase</a></Link>
        <Link href="/services" legacyBehavior><a className="text-white hover:text-indigo-500 active:text-amber-500 mx-4">Services</a></Link>
        <Link href="/contact" legacyBehavior><a className="text-white hover:text-indigo-500 mx-4">Contact</a></Link>
      </div>
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gradient-to-l from-indigo-950 via-black to-indigo-950 md:hidden flex flex-col items-center space-y-4 py-4">
          <Link href="/" legacyBehavior><a className="text-white hover:text-blue-500">Home</a></Link>
          <Link href="/about" legacyBehavior><a className="text-white hover:text-blue-500">About Us</a></Link>
          <Link href="/gallery" legacyBehavior><a className="text-white hover:text-blue-500">Showcase</a></Link>
          <Link href="/services" legacyBehavior><a className="text-white hover:text-blue-500">Services</a></Link>
          <Link href="/contact" legacyBehavior><a className="text-white hover:text-blue-500">Contact</a></Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
