// components/Hero.js
import React from 'react';
import Cookies from "js-cookie"

function Hero() {
 
  return (
    <section className="bg-gray-100 py-20 text-center sm:h-[50vh]">
      <div className="container mx-auto max-sm:mt-0 sm:mt-10 px-6">
        <h1 className="text-4xl font-bold mb-4 animate__animated animate__fadeInUp">Get Rated. Elevate Your Potential.</h1>
        <p className="text-lg mb-8 animate__animated animate__fadeInUp animate__delay-1s">Receive constructive feedback and improve your skills.</p>
         <a href="/create-campaign" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 animate__animated animate__fadeInUp animate__delay-2s">Create Campaign</a>
      
        
        {/* <div className="mt-12 animate__animated animate__fadeIn animate__delay-3s">
          <img src="your-image-url.jpg" alt="Feedback illustration" className="mx-auto rounded-md shadow-lg"/>
        </div> */}
      </div>
    </section>
  );
}

export default Hero;
