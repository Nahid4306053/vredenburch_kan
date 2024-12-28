// src/components/SocialIcons.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <div className="flex space-x-4 py-4 justify-center mt-4">
      {/* Facebook Icon */}
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition duration-300"
      >
        <FaFacebookF className="w-5 h-5 text-white hover:text-clubRed transition-colors duration-300" />
      </a>

      {/* Twitter Icon */}
      <a
        href="https://www.twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
        className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition duration-300"
      >
        <FaTwitter className="w-5 h-5 text-white hover:text-clubRed transition-colors duration-300" />
      </a>

      {/* Instagram Icon */}
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition duration-300"
      >
        <FaInstagram className="w-5 h-5 text-white hover:text-clubRed transition-colors duration-300" />
      </a>

      {/* YouTube Icon */}
      <a
        href="https://www.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full hover:bg-opacity-40 transition duration-300"
      >
        <FaYoutube className="w-5 h-5 text-white hover:text-clubRed transition-colors duration-300" />
      </a>
    </div>
  );
};

export default SocialIcons;
