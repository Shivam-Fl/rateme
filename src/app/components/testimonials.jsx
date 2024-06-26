// components/Testimonials.js
import React from 'react';

const testimonials = [
  {
    name: 'John Doe',
    profession: 'Software Engineer',
    photo: 'user-photo-url.jpg',
    quote: 'This service has drastically improved my performance.'
  },
  {
    name: 'Jane Smith',
    profession: 'Graphic Designer',
    photo: 'user-photo-url.jpg',
    quote: 'The feedback is detailed and actionable.'
  },
  {
    name: 'Alice Johnson',
    profession: 'Content Writer',
    photo: 'user-photo-url.jpg',
    quote: "I've seen real progress since using this platform."
  }
];

function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Testimonials</h2>
        <div className="flex flex-wrap justify-center">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full md:w-1/3 px-4 mb-8">
              <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 transition transform hover:-translate-y-1">
                <img src={testimonial.photo} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-4"/>
                <p className="italic">"{testimonial.quote}"</p>
                <h3 className="text-xl font-semibold mt-4">{testimonial.name}</h3>
                <p>{testimonial.profession}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
