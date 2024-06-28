// components/CallToAction.js
import React from 'react';
import Link from 'next/link';

const CallToAction = () => (
  <div className="py-60 text-center bg-gradient-to-b from-blue-900 to-indigo-950 text-white" style={{ backgroundImage: 'url(/images/hero/darkmode_02.jpg)' }}>
    <h2 className="text-4xl font-bold mb-4 ">Ready to Transform Your Vision?</h2>
    <p className="text-lg max-w-3xl mx-auto mb-6">Contact us today to start your project and see how we can make a difference.</p>
    <Link href="#contact" legacyBehavior>
      <a className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Contact Us</a>
    </Link>
  </div>
);

export default CallToAction;
