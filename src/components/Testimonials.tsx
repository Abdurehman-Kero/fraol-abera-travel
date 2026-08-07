import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Amanuel T.",
      location: "Addis Ababa",
      text: "Fraol Abera Travel handled our entire family trip to Lalibela. The flights, the local guide, and the hotel were perfectly coordinated. Highly recommend for any domestic tours!",
      rating: 5,
      role: "Domestic Traveler"
    },
    {
      name: "Sarah Jenkins",
      location: "UK",
      text: "We wanted a 4x4 expedition to the Bale Mountains but didn't know where to start. Fraol's team arranged the Land Cruiser, driver, and park permits effortlessly. A truly professional agency.",
      rating: 5,
      role: "International Tourist"
    },
    {
      name: "Dawit M.",
      location: "Hawassa",
      text: "I always use Fraol for booking my domestic Ethiopian Airlines flights. They are fast, reliable, and their Telebirr payment integration makes it incredibly easy to book from anywhere.",
      rating: 5,
      role: "Frequent Flyer"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D66A4A]/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#D66A4A] mb-2">Client Experiences</h3>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#262523]">What Our Travelers Say</h2>
          <div className="w-16 h-1 bg-[#D66A4A] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-[#F7F3EC] rounded-2xl p-8 relative shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#E9E3DA]">

              
              <div className="relative z-10 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                
                <p className="text-sm text-[#262523] italic leading-relaxed font-serif">
                  "{testimonial.text}"
                </p>
                
                <div className="pt-4 border-t border-[#E9E3DA]">
                  <h4 className="font-bold text-[#262523] uppercase text-xs tracking-wider">{testimonial.name}</h4>
                  <p className="text-[10px] text-[#78736B] uppercase tracking-widest mt-1">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
