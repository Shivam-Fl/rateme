// components/Features.js
import React from 'react';

const features = [
  {
    icon: '🔒',
    title: 'Anonymous Rating and Feedback',
    description: 'Provide and receive ratings and feedback anonymously to ensure unbiased and honest opinions.'
  },
  {
    icon: '👌',
    title: 'Simple to Use',
    description: 'Our intuitive interface makes it easy for you to give and receive feedback without any hassle.'
  }
];

function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Features</h2>
        <div className="flex flex-wrap justify-center">
          {features.map((feature, index) => (
            <div key={index} className="w-full md:w-1/3 px-4 mb-8">
              <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 transition transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
