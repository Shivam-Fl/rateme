// components/FAQs.js
import React from 'react';

const faqs = [
  {
    question: 'How does the rating process work?',
    answer: 'Explanation of the rating process.'
  },
  {
    question: 'Who provides the feedback?',
    answer: 'Information about the experts or raters.'
  },
  {
    question: 'Can I track my progress?',
    answer: 'Details about the progress tracking features.'
  }
];

function FAQs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 transition transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQs;
