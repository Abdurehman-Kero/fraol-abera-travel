import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface WhyUsProps {
  onOpenWizard: (service?: string) => void;
  currentLang: Language;
}

export const WhyUs: React.FC<WhyUsProps> = ({ onOpenWizard, currentLang }) => {
  const t = translations[currentLang];

  return (
    <section id="whyus" className="bg-[#F5F1EA] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <p className="text-[#C97B4B] text-[10px] font-semibold uppercase tracking-[0.35em]">
              Why Fraol Abera
            </p>
            <h2 className="font-['Cormorant_Garamond'] font-light text-[#1C1917] text-4xl sm:text-5xl leading-[1.15]">
              We believe travel should be individual, inspired & transformative
            </h2>
            <div className="w-10 h-px bg-[#C97B4B]" />
            <p className="text-[#6B6560] text-sm sm:text-base leading-relaxed font-light">
              Based in Akaki Kality, Addis Ababa, Fraol Abera Travel Agency crafts deeply personal Ethiopian journeys — from the rock churches of Lalibela to the wild Simien highlands. Every trip is hand-planned with local guides, regional transport, and cultural authenticity at its heart.
            </p>
            <p className="text-[#6B6560] text-sm sm:text-base leading-relaxed font-light">
              We handle everything: Ethiopian Airlines tickets, 4x4 Land Cruiser drives, national park permits, and village-level local scout arrangements — so you can simply be present in the moment.
            </p>
            <button
              onClick={() => onOpenWizard('domestic_tour')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C97B4B] hover:gap-4 transition-all group"
            >
              Start Planning Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: Photo */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Main image */}
              <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-xl">
                <img
                  src="/whyus-ethiopia.png"
                  alt="Ethiopian travel experience"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -left-6 bg-[#C97B4B] text-white p-5 shadow-lg hidden sm:block">
                <p className="font-['Cormorant_Garamond'] italic text-2xl font-light leading-tight">
                  10+ years<br />of Ethiopian<br />expertise
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
