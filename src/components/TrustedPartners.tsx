import React from 'react';
import { Language, translations } from '../data/translations';

interface TrustedPartnersProps {
  currentLang: Language;
}

export const TrustedPartners: React.FC<TrustedPartnersProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const partners = [
    { name: t.partnerEthAir, logo: '✈' },
    { name: t.partnerTelebirr, logo: '📱' },
    { name: t.partnerCBE, logo: '🏦' },
    { name: t.partnerEWCA, logo: '🦁' },
  ];

  return (
    <section className="bg-[#EDEAE2] py-10 border-y border-[#DDD8CE]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-0">
          <p className="text-[#6B6560] text-[10px] font-medium uppercase tracking-[0.3em] shrink-0 sm:w-40 text-center sm:text-left">
            {t.partnersPretitle}
          </p>
          <div className="flex-1 flex flex-wrap items-center justify-center sm:justify-around gap-6">
            {partners.map((p, i) => (
              <div key={i} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <span className="text-xl">{p.logo}</span>
                <span className="text-[#1C1917] text-xs font-medium uppercase tracking-wider whitespace-nowrap">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
