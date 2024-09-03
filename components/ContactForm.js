import React from 'react';
import Button from './Button';  // Import the Button component

const ContactForm = () => {
  return (
    <div className="flex w-full  bg-gradient-to-b from-gray-950 to-indigo-950 text-white font-sans">
      <div className="flex flex-wrap w-4/5 mx-auto py-32 items-center p-3 gap-10">
        <div className="flex flex-col w-full">
          <h1 className="text-4xl text-indigo-200 font-bold mb-10">Contact Us</h1>
          <form className="w-full">
            <div className="flex flex-wrap gap-4 mb-4">
              <input
                type="text"
                placeholder="Name"
                className="flex-1 p-3 bg-indigo-950 text-white border border-indigo-600 rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                className="flex-1 p-3 bg-indigo-950 text-white border border-indigo-600 rounded-md"
              />
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <input
                type="text"
                placeholder="Subject"
                className="flex-1 p-3 bg-indigo-950 text-white border border-indigo-600 rounded-md"
              />
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <textarea
                placeholder="Message"
                className="w-full p-3 bg-indigo-950 text-white border border-indigo-600 rounded-md h-32"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="rounded-md px-4 py-2 text-lg bg-indigo-800 text-white hover:bg-indigo-600 transition"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
