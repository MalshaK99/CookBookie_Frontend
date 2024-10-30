import React from "react";
import Logo from "../Assets/Logo.png";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" dark:bg-gray-900 p-6">
      <div className="container mx-auto lg:flex">
        
        <div className="w-full lg:w-2/5 px-6 -mx-6">
          <div className="footer-logo-container">
            <img src={Logo} alt="Brand Logo" className="w-auto h-25" />
          </div>
        
          <div className="flex mt-6 space-x-2">
            <BsTwitter className="text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
            <SiLinkedin className="text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
            <BsYoutube className="text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
            <FaFacebookF className="text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" />
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="mt-6 lg:mt-0 lg:flex-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            
            <div className="footer-section-columns">
              <h3 className="text-gray-700 uppercase dark:text-white">Contact</h3>
              <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">0702677466</span>
              <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">www.cookbookie.com</span>
              <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">cookbookie@hotmail.com</span>
              <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">No 89, Badulla</span>
            </div>

            <div className="footer-section-columns">
              <h3 className="text-gray-700 uppercase dark:text-white">Quick Links</h3>
              <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"><a href="/contact">Help</a></span>
              <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"><a href="/contact">Share</a></span>
              <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"><a href="/recipes">Recipes</a></span>
              <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"><a href="/about">About Us</a></span>
            </div>

            <div className="footer-section-columns">
              <h3 className="text-gray-700 uppercase dark:text-white">Policies</h3>
              <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Terms & Conditions</span>
              <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Privacy Policy</span>
              <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"><a href="/review_rating"> Reviews</a></span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />
      <div>
        <p className="text-center text-gray-500 dark:text-gray-400">
          © CookBookie 2024 - All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
