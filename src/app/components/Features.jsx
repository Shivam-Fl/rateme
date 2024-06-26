// components/Features.js
import React from 'react';

const features = [
  {
    icon: '⭐️',
    title: 'Personalized Ratings',
    description: 'Get personalized ratings based on your performance.'
  },
  {
    icon: '📝',
    title: 'Detailed Feedback',
    description: 'Receive detailed feedback to understand your strengths and areas for improvement.'
  },
//   {
//     icon: '📈',
//     title: 'Progress Tracking',
//     description: 'Track your progress over time with our intuitive dashboard.'
//   }
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
