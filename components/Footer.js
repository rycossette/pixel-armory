import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faArtstation, faBehance } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-white text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/" legacyBehavior>
                  <a className="hover:text-indigo-500">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about" legacyBehavior>
                  <a className="hover:text-indigo-500">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/services" legacyBehavior>
                  <a className="hover:text-indigo-500">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/portfolio" legacyBehavior>
                  <a className="hover:text-indigo-500">Portfolio</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" legacyBehavior>
                  <a className="hover:text-indigo-500">Contact</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-white text-lg font-semibold mb-2">Contact Information</h4>
            <ul className="space-y-1">
              <li>Email: <a href="mailto:your-email@example.com" className="hover:text-indigo-500">your-email@example.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-indigo-500">+123 456 7890</a></li>
              <li>Address: <span className="hover:text-indigo-500">123 Your Address, City, Country</span></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/ryancossette/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a href="https://rcossette.artstation.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500">
                <FontAwesomeIcon icon={faArtstation} size="lg" />
              </a>
              <a href="https://www.behance.net/rcossette" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500">
                <FontAwesomeIcon icon={faBehance} size="lg" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-left md:text-center">© 2024 Pixel Armory. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
