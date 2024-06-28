import Link from 'next/link';
import Nav from '../components/Nav';
import HeaderBasic from '../components/HeaderBasic';
import Footer from '../components/Footer';
import Services from '../components/Services';

export default function Home() {
  return (
    <div>
      <Nav />
      <div className="mt-20"> {/* Adjust mt-20 based on your navbar height */}
        <HeaderBasic
          title="Our Services"
          subtitle="We work with a wide range of clients, large and small. Whatever your creative problem is, we will find a solution. And if we can't, we'll try to help you find someone who can."
          backgroundImage="/images/hero/darkmode_02.jpg"
        />
        <Services />
      </div>
      <Footer />
    </div>
  );
}
