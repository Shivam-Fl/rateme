// components/HowItWorks.js
import React from 'react';

const steps = [
  {
    icon: '✍️',
    title: 'Sign Up',
    description: 'Create your account in minutes.'
  },
  {
    icon: '📅',
    title: 'Create Campaign',
    description: 'Create a campaign and share the QR to your audience.'
  },
  {
    icon: '📬',
    title: 'Get Rated',
    description: 'By Scanning QR, People can rate you and provide feedback'
  },
  {
    icon: '📊',
    title: 'Improve',
    description: 'Use the feedback to improve and track your progress.'
  }
];

function HowItWorks() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="flex flex-wrap justify-center">
          {steps.map((step, index) => (
            <div key={index} className="w-full md:w-1/3 px-4 mb-8">
              <div className="p-6 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
