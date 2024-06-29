import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Services from '../components/Services';
import AboutUs from '../components/AboutUs';
import FeaturedProjects from '../components/FeaturedProjects';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';

export default function Home() {
  return (
    <div>
      <Nav />
      <Header />
      <AboutUs />
      <Services />
      <FeaturedProjects />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
