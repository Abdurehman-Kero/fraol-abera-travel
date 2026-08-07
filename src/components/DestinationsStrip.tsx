import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface DestinationsStripProps {
  onOpenWizard: (service?: string) => void;
  onSelectPackage: (pkg: any) => void;
  currentLang: Language;
}

export const DestinationsStrip: React.FC<DestinationsStripProps> = ({ onOpenWizard, onSelectPackage, currentLang }) => {
  const t = translations[currentLang];

  const destinations = [
    {
      name: 'Lalibela',
      label: 'Rock Churches',
      image: '/lalibela_church.png',
    },
    {
      name: 'Simien',
      label: 'Mountains & Gelada',
      image: '/hero-ethiopia.png',
    },
    {
      name: 'Harar',
      label: 'Jugol Old City',
      image: '/hero-harar.png',
    },
    {
      name: 'Bale',
      label: 'Harenna Forest',
      image: '/forest_safari.png',
    },
    {
      name: 'Danakil',
      label: 'Sulphur Volcanoes',
      image: '/forest_safari.png',
    },
  ];

  return (
    <section id="destinations" className="bg-[#1C1917] py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[#C97B4B] text-[10px] font-semibold uppercase tracking-[0.35em] mb-3">
              Destinations
            </p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-[#F5F1EA] text-4xl sm:text-5xl leading-[1.1]">
              Ethiopia's most<br className="hidden sm:block" /> extraordinary places
            </h2>
          </div>
          <button
            onClick={() => onOpenWizard('domestic_tour')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C97B4B] hover:gap-4 transition-all group shrink-0 self-start sm:self-auto"
          >
            Explore All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5-photo horizontal strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {destinations.map((dest, idx) => (
            <button
              key={idx}
              onClick={() => onSelectPackage({
                id: dest.name,
                title: `${dest.name} - ${dest.label}`,
                category: 'domestic_tour',
                image: dest.image,
                duration: '2-4 Days',
                priceETB: 12000,
                priceUSD: 250,
                highlights: [`Explore ${dest.name}`, 'Expert local guide', 'All ground transfers', 'Premium lodge stay'],
                itinerary: [
                  { day: 1, title: 'Arrival & Setup', desc: `Arrive in ${dest.name} and check in to your boutique lodge.` },
                  { day: 2, title: `Full Day ${dest.label} Tour`, desc: 'An immersive guided tour of the key sites.' },
                  { day: 3, title: 'Departure', desc: 'Transfer to the airport.' }
                ]
              })}
              className="group relative rounded-sm overflow-hidden text-left"
            >
              <div className="aspect-[3/4] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${dest.image}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-['Cormorant_Garamond'] text-[#F5F1EA] text-xl font-semibold">{dest.name}</p>
                <p className="text-[#C97B4B] text-[10px] uppercase tracking-widest font-medium">{dest.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
