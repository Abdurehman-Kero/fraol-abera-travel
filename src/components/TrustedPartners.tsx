import React from 'react';

export const TrustedPartners: React.FC = () => {
  const partners = [
    {
      name: 'Ethiopian Airlines',
      logo: '✈️', // We'll use a stylized text or simple SVG/icon approach
      desc: 'Official Ticketing Partner'
    },
    {
      name: 'Telebirr',
      logo: '📱',
      desc: 'Digital Payment Partner'
    },
    {
      name: 'Commercial Bank of Ethiopia',
      logo: '🏦',
      desc: 'Banking Partner'
    },
    {
      name: 'Ethiopian Wildlife Conservation Authority',
      logo: '🦁',
      desc: 'Permit Partner'
    }
  ];

  return (
    <section className="py-12 bg-[#F7F3EC] border-y border-[#E9E3DA]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#D66A4A] mb-2">Verified & Trusted By</h3>
          <h2 className="text-2xl font-serif font-bold text-[#262523]">Our Official Partners</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {partners.map((partner, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-6 bg-white border border-[#E9E3DA] rounded-xl shadow-sm hover:shadow-md transition-shadow grayscale hover:grayscale-0">
              <div className="text-4xl mb-3">{partner.logo}</div>
              <h4 className="font-bold text-[#262523] text-sm text-center">{partner.name}</h4>
              <p className="text-[10px] uppercase tracking-wider text-[#78736B] mt-1 text-center">{partner.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
