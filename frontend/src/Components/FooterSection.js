import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaAddressCard, FaClock } from 'react-icons/fa';

const FooterSection = () => {
  return (
    <footer className="bg-black text-white pt-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* About + Social */}
        <div>
          <h3 className="text-xl font-bold mb-4">About CheckMyCar</h3>
          <p className="text-sm mb-4">
            CheckMyCar is a leading Car Electrical & Mechanic Service workshop in Noida.
          </p>
          <p className="text-sm mb-2">Stay connected with us:</p>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com/" target="_blank"><FaFacebookF className="text-blue-500 hover:text-white" /></a>
            <a href="https://x.com/?lang=en" target="_blank"><FaTwitter className="text-white hover:text-blue-400" /></a>
            <a href="https://www.instagram.com/" target="_blank"><FaInstagram className="text-pink-500 hover:text-white" /></a>
          </div>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Important Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about-us" className="hover:underline">About</a></li>
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <FaAddressCard className="mr-2" /> H-10, Noida
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-2" /> (301) 234-5678
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" /> berealjeet@gmail.com
            </li>
          </ul>
        </div>

        {/* Opening Hours (instead of map) */}
        <div>
          <h3 className="text-xl font-bold mb-4">Working Hours</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <FaClock className="mr-2" /> Mon - Sat: 9 AM - 7 PM
            </li>
            <li className="flex items-center">
              <FaClock className="mr-2" /> Sunday: Closed
            </li>
          </ul>
          <div className="mt-4">
            <a href="#top" className="text-sm underline hover:text-gray-300">
              ↑ Back to Top
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="bg-gray-800 py-3 mt-6 text-center text-sm">
        &copy; 2025 CheckMyCar. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;

