import React from 'react';
import { Compass, Plane, Car, TreePine } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface ExperienceSelectorProps {
  onOpenWizard: (service?: string) => void;
  onSelectPackage: (pkg: any) => void;
  currentLang: Language;
}

export const ExperienceSelector: React.FC<ExperienceSelectorProps> = ({ onOpenWizard, onSelectPackage, currentLang }) => {
  const t = translations[currentLang];

  const experiences = [
    {
      icon: <Compass className="w-6 h-6" />,
      title: t.historicTours,
      desc: 'Lalibela, Harar Jugol, Axum obelisks — guided cultural heritage circuits',
      service: 'domestic_tour',
      image: '/lalibela_church.png',
    },
    {
      icon: <TreePine className="w-6 h-6" />,
      title: t.simienWildlife,
      desc: 'Simien Mountains, Bale Harenna forest, Gelada baboon treks',
      service: 'cultural_expedition',
      image: '/hero-ethiopia.png',
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: t.wilderness4x4,
      desc: '4x4 Land Cruiser drives through remote valleys and river crossings',
      service: 'safari_expedition',
      image: '/forest_safari.png',
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: t.domesticFlightsAndDrive,
      desc: 'Ethiopian Airlines domestic tickets + overland Coaster bus packages',
      service: 'domestic_flight',
      image: '/flying_bird.png',
    },
  ];

  return (
    <section id="experiences" className="bg-[#EDEAE2] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[#C97B4B] text-[10px] font-semibold uppercase tracking-[0.35em] mb-3">
            {t.quickInquiryTitle}
          </p>
          <h2 className="font-['Cormorant_Garamond'] font-light text-[#1C1917] text-4xl sm:text-5xl leading-[1.1]">
            What is your ideal Ethiopian experience?
          </h2>
          <div className="w-10 h-px bg-[#C97B4B] mx-auto mt-6" />
        </div>

        {/* 4-tile grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {experiences.map((exp, idx) => (
            <button
              key={idx}
              onClick={() => onSelectPackage({
                id: exp.service,
                title: exp.title,
                category: exp.service,
                image: exp.image,
                duration: '3-7 Days',
                priceETB: 15000,
                priceUSD: 300,
                highlights: [exp.desc, 'Local guided tours', 'Premium 4x4 or flight transport', 'Boutique accommodation'],
                itinerary: [
                  { day: 1, title: 'Arrival & Welcome', desc: 'Transfer to your luxury hotel.' },
                  { day: 2, title: 'Guided Heritage Tour', desc: exp.desc },
                  { day: 3, title: 'Departure', desc: 'Private transfer to airport.' }
                ]
              })}
              className="group relative rounded-sm overflow-hidden text-left h-72 sm:h-80 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${exp.image}')` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/85 via-[#1C1917]/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="text-[#C97B4B] mb-2">{exp.icon}</div>
                <h3 className="font-['Cormorant_Garamond'] text-[#F5F1EA] text-xl font-semibold leading-tight mb-1">
                  {exp.title}
                </h3>
                <p className="text-[#E8E3D8]/70 text-xs font-light leading-relaxed line-clamp-2">
                  {exp.desc}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[#C97B4B] text-[10px] font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Inquire
                  <span className="ml-1">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
