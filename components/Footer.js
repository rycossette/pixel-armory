import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Button from './Button';  // Assuming you're using the same Button component

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add your subscription logic here
    console.log('Subscribed with email:', email);
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6 lg:px-32 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <Image 
            src="/images/logo/pa.png" 
            width={100} 
            height={100} 
            alt="Pixel Armory Logo" 
            className="mb-4"
          />
          <p className="text-gray-400 text-sm mb-4">
            Pixel Armory is a creative agency specializing in motion design, 3D modeling/animation, web design, server-side development, advanced networking, AI, and more.
          </p>
          <p className="text-gray-400 text-sm">&copy; 2024 Pixel Armory. All rights reserved.</p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" legacyBehavior><a className="text-gray-400 hover:text-white text-sm">Home</a></Link></li>
            <li><Link href="/about" legacyBehavior><a className="text-gray-400 hover:text-white text-sm">About Us</a></Link></li>
            <li><Link href="/gallery" legacyBehavior><a className="text-gray-400 hover:text-white text-sm">Showcase</a></Link></li>
            <li><Link href="/services" legacyBehavior><a className="text-gray-400 hover:text-white text-sm">Services</a></Link></li>
            <li><Link href="/contact" legacyBehavior><a className="text-gray-400 hover:text-white text-sm">Contact</a></Link></li>
            <li><Link href="/privacy" legacyBehavior><a className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></Link></li>
            <li><Link href="/terms" legacyBehavior><a className="text-gray-400 hover:text-white text-sm">Terms of Service</a></Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold mb-4">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter to get the latest updates.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 bg-indigo-950 text-white border border-indigo-600 rounded-md"
              placeholder="Your email address"
              required
            />
            <Button type="submit" className="px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-indigo-600">
              Subscribe
            </Button>
          </form>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <Link href="https://twitter.com/yourprofile" legacyBehavior>
              <a className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </Link>
            <Link href="https://facebook.com/yourprofile" legacyBehavior>
              <a className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
            </Link>
            <Link href="https://instagram.com/yourprofile" legacyBehavior>
              <a className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </Link>
            <Link href="https://linkedin.com/yourprofile" legacyBehavior>
              <a className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
