// components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-xl font-bold mb-2">Quick Links</h4>
            <ul>
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#how-it-works" className="hover:underline">How It Works</a></li>
              <li><a href="#pricing" className="hover:underline">Pricing</a></li>
              <li><a href="#testimonials" className="hover:underline">Testimonials</a></li>
              <li><a href="#contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-xl font-bold mb-2">Contact Information</h4>
            <p>Email: contact@yourcompany.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Main Street, Anytown, USA</p>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-xl font-bold mb-2">Stay Connected</h4>
            <div className="flex space-x-4">
              <a href="#facebook" className="hover:underline">Facebook</a>
              <a href="#twitter" className="hover:underline">Twitter</a>
              <a href="#linkedin" className="hover:underline">LinkedIn</a>
            </div>
            <div className="mt-4">
              <input type="email" placeholder="Subscribe for Updates" className="px-4 py-2 rounded-l-md"/>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
