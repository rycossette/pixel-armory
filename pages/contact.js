import React from 'react';
import Nav from '../components/Nav';
import HeaderBasic from '../components/HeaderBasic';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div>
      <Nav />
      <HeaderBasic
        title="Contact Us"
        subtitle="Get in touch with Pixel Armory. We're here to help with all your creative needs."
        backgroundImage="/images/hero/darkmode_01.jpg"
        marginTop="60px"
      />
      <div className="flex w-full min-h-screen">
        <div className="flex flex-wrap w-4/5 mx-auto py-32 items-center p-3 sm:p-10 gap-10">
          <div className="flex flex-col w-full">
            <h1 className="text-4xl text-white font-bold mb-10">Contact Us</h1>
            <form className="w-full text-slate-500">
              <div className="flex flex-wrap gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="flex-1 p-3 bg-slate-800 text-white border border-slate-600 rounded-md"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 p-3 bg-slate-800 text-white border border-slate-600 rounded-md"
                />
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Subject"
                  className="flex-1 p-3 bg-slate-800 text-white border border-slate-600 rounded-md"
                />
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                <textarea
                  placeholder="Message"
                  className="w-full p-3 bg-slate-800 text-white border border-slate-600 rounded-md h-32"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className=" rounded-md px-4 gap-4 py-2 text-lg bg-indigo-800 text-white hover:bg-indigo-600 transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
