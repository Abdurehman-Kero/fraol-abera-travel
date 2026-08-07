import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface HeroProps {
  onOpenWizard: (service?: string) => void;
  onOpenTrackModal: () => void;
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWizard, onOpenTrackModal, currentLang }) => {
  const t = translations[currentLang];

  return (
    <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-ethiopia.png')" }}
      />
      {/* Gradient overlay — dark at bottom for text, lighter at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/85 via-[#1C1917]/30 to-transparent" />

      {/* Content — pinned to bottom */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-16 sm:pb-24">
        <div className="max-w-3xl">
          {/* Pretitle */}
          <p className="text-[#C97B4B] text-xs font-medium uppercase tracking-[0.35em] mb-4">
            {t.heroTagline}
          </p>

          {/* Main Headline — large italic serif */}
          <h1 className="font-['Cormorant_Garamond'] italic font-light text-[#F5F1EA] text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-6">
            {t.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-[#E8E3D8]/80 text-sm sm:text-base font-light leading-relaxed max-w-xl mb-8">
            {t.heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => onOpenWizard('domestic_tour')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C97B4B] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#B8693A] transition-colors rounded-sm"
            >
              {t.heroActionInquire}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenTrackModal}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#F5F1EA]/40 text-[#F5F1EA] text-xs font-semibold uppercase tracking-widest hover:bg-[#F5F1EA]/10 transition-colors rounded-sm"
            >
              {t.heroActionTrack}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-8 hidden sm:flex flex-col items-center gap-1 opacity-50">
        <div className="w-px h-10 bg-[#F5F1EA]/60 animate-pulse" />
        <p className="text-[#F5F1EA] text-[9px] uppercase tracking-widest rotate-90 mt-2 origin-center translate-x-3">Scroll</p>
      </div>
    </section>
  );
};
