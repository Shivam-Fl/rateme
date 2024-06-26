// components/Pricing.js
import React from 'react';

const plans = [
  {
    name: 'Free Plan',
    price: 'Free',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    buttonText: 'Sign Up for Free'
  },
  {
    name: 'Pro Plan',
    price: '$49/month',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    buttonText: 'Get Pro'
  },
  {
    name: 'Enterprise Plan',
    price: 'Custom Pricing',
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    buttonText: 'Contact Us'
  }
];

function Pricing() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Pricing</h2>
        <div className="flex flex-wrap justify-center">
          {plans.map((plan, index) => (
            <div key={index} className="w-full md:w-1/3 px-4 mb-8">
              <div className="p-6 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition transform hover:-translate-y-1">
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-xl font-bold mb-4">{plan.price}</p>
                <ul className="mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="mb-2">{feature}</li>
                  ))}
                </ul>
                <a href="#sign-up" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">{plan.buttonText}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
