import React from 'react';
import { Language, translations } from '../data/translations';

interface TrustedPartnersProps {
  currentLang: Language;
}

export const TrustedPartners: React.FC<TrustedPartnersProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const partners = [
    {
      name: t.partnerEthAir,
      logo: '✈️',
      desc: t.partnerEthAirDesc
    },
    {
      name: t.partnerTelebirr,
      logo: '📱',
      desc: t.partnerTelebirrDesc
    },
    {
      name: t.partnerCBE,
      logo: '🏦',
      desc: t.partnerCBEDesc
    },
    {
      name: t.partnerEWCA,
      logo: '🦁',
      desc: t.partnerEWCADesc
    }
  ];

  return (
    <section className="py-12 bg-[#F7F3EC] border-y border-[#E9E3DA]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#D66A4A] mb-2">{t.partnersPretitle}</h3>
          <h2 className="text-2xl font-serif font-bold text-[#262523]">{t.partnersTitle}</h2>
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
