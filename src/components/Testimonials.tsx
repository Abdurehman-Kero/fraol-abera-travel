import React from 'react';
import { Star } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface TestimonialsProps {
  currentLang: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section className="bg-[#F5F1EA] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="mb-14 max-w-sm">
          <p className="text-[#C97B4B] text-[10px] font-semibold uppercase tracking-[0.35em] mb-3">
            {t.testiPretitle}
          </p>
          <h2 className="font-['Cormorant_Garamond'] font-light text-[#1C1917] text-4xl sm:text-5xl leading-[1.1]">
            {t.testiTitle}
          </h2>
          <div className="w-10 h-px bg-[#C97B4B] mt-6" />
        </div>

        {/* Two column: quote left, portrait right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-14">
          {/* Left: large pull-quote */}
          <div className="space-y-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#C97B4B] fill-[#C97B4B]" />)}
            </div>
            <blockquote className="font-['Cormorant_Garamond'] text-[#1C1917] text-2xl sm:text-3xl font-light italic leading-relaxed">
              "{t.testi1Text}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-[#C97B4B]" />
              <div>
                <p className="font-semibold text-[#1C1917] text-sm uppercase tracking-wider">Amanuel T.</p>
                <p className="text-[#6B6560] text-xs">{t.testi1Role} · {t.testi1Location}</p>
              </div>
            </div>
          </div>

          {/* Right: portrait */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-xl max-w-sm">
              <img src="/testimonial-portrait.png" alt="Happy traveler" className="w-full h-full object-cover" />
            </div>
            {/* Small floating quote card */}
            <div className="absolute -bottom-4 -right-4 sm:right-8 bg-white border border-[#DDD8CE] p-5 shadow-lg max-w-[220px] hidden sm:block">
              <div className="flex space-x-1 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-[#C97B4B] fill-[#C97B4B]" />)}
              </div>
              <p className="text-[#1C1917] text-xs font-light italic leading-relaxed">"{t.testi2Text.slice(0, 80)}…"</p>
              <p className="text-[#C97B4B] text-[10px] font-semibold uppercase tracking-widest mt-2">Sarah Jenkins · UK</p>
            </div>
          </div>
        </div>

        {/* Third testimonial — bottom full-width card */}
        <div className="bg-[#1C1917] rounded-sm p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <div className="flex space-x-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#C97B4B] fill-[#C97B4B]" />)}
            </div>
            <p className="font-['Cormorant_Garamond'] text-[#F5F1EA] text-xl sm:text-2xl font-light italic leading-relaxed">
              "{t.testi3Text}"
            </p>
          </div>
          <div className="shrink-0 text-right sm:text-right border-t sm:border-t-0 sm:border-l border-[#F5F1EA]/10 pt-4 sm:pt-0 sm:pl-8">
            <p className="font-semibold text-[#F5F1EA] text-sm uppercase tracking-wider">Dawit M.</p>
            <p className="text-[#C97B4B] text-xs">{t.testi3Role}</p>
            <p className="text-[#F5F1EA]/40 text-xs">{t.testi3Location}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
