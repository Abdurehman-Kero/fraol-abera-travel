import React, { useState } from 'react';
import { 
  Compass, 
  Plane, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Car
} from 'lucide-react';
import { Language, translations } from '../data/translations';

interface HeroProps {
  onOpenWizard: (service?: string) => void;
  onOpenTrackModal: () => void;
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWizard, onOpenTrackModal, currentLang }) => {
  const [trackQuery, setTrackQuery] = useState('');
  const t = translations[currentLang];

  return (
    <section id="hero" className="relative bg-[#262523] text-[#F7F3EC] py-8 sm:py-14 overflow-hidden">
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#D66A4A_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center space-x-2 bg-[#D66A4A]/20 border border-[#D66A4A]/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#D66A4A]">
              <Compass className="w-3.5 h-3.5 text-[#D66A4A] shrink-0" />
              <span>{t.heroTagline}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#F7F3EC] leading-[1.15] tracking-tight">
              {t.heroTitle}
            </h1>

            <p className="text-[#E9E3DA]/80 text-sm leading-relaxed font-sans max-w-xl">
              {t.heroSubtitle}
            </p>

            {/* Action Buttons (Refined, proportional sizing) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={() => onOpenWizard('domestic_tour')}
                className="px-5 py-2.5 rounded-lg bg-[#D66A4A] text-white hover:bg-[#C2583A] font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-sm active:scale-95"
              >
                <span>{t.heroActionInquire}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`tel:${t.phoneTel}`}
                className="px-5 py-2.5 rounded-lg bg-stone-800 text-[#F7F3EC] hover:bg-stone-700 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 border border-stone-700 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-[#D66A4A]" />
                <span>{t.heroCallNow}</span>
              </a>
            </div>

            {/* Badge Highlights */}
            <div className="pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-[#E9E3DA]/90">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8A9374] shrink-0" />
                <span className="text-[11px]">UNESCO Tour Operator</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Car className="w-3.5 h-3.5 text-[#D66A4A] shrink-0" />
                <span className="text-[11px]">4x4 & Coaster Transport</span>
              </div>
              <div className="flex items-center space-x-1.5 col-span-2 sm:col-span-1">
                <Plane className="w-3.5 h-3.5 text-[#8A9374] shrink-0" />
                <span className="text-[11px]">Ethiopian Airlines Agent</span>
              </div>
            </div>
          </div>

          {/* Quick Selection Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#F7F3EC] text-[#262523] p-5 sm:p-6 rounded-xl border border-[#E9E3DA] shadow-xl space-y-4">
              <div className="border-b border-[#E9E3DA] pb-2.5 space-y-1">
                <h2 className="text-sm font-bold font-serif text-[#262523] uppercase tracking-wide">
                  {t.quickInquiryTitle}
                </h2>
                <p className="text-xs text-[#78736B]">
                  {t.quickInquirySubtitle}
                </p>
              </div>

              {/* Service Selection Buttons Grid */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenWizard('domestic_tour')}
                  className="p-2.5 rounded-lg bg-white hover:bg-[#E9E3DA]/50 border border-[#E9E3DA] text-left transition text-xs font-bold text-[#262523] flex items-center space-x-2"
                >
                  <Compass className="w-4 h-4 text-[#D66A4A] shrink-0" />
                  <span className="truncate">{t.historicTours}</span>
                </button>

                <button
                  onClick={() => onOpenWizard('domestic_flight')}
                  className="p-2.5 rounded-lg bg-white hover:bg-[#E9E3DA]/50 border border-[#E9E3DA] text-left transition text-xs font-bold text-[#262523] flex items-center space-x-2"
                >
                  <Plane className="w-4 h-4 text-[#262523] shrink-0" />
                  <span className="truncate">{t.flightMode}</span>
                </button>

                <button
                  onClick={() => onOpenWizard('safari_expedition')}
                  className="p-2.5 rounded-lg bg-white hover:bg-[#E9E3DA]/50 border border-[#E9E3DA] text-left transition text-xs font-bold text-[#262523] flex items-center space-x-2"
                >
                  <Car className="w-4 h-4 text-[#8A9374] shrink-0" />
                  <span className="truncate">{t.overland4x4Mode}</span>
                </button>

                <button
                  onClick={() => onOpenWizard('cultural_expedition')}
                  className="p-2.5 rounded-lg bg-white hover:bg-[#E9E3DA]/50 border border-[#E9E3DA] text-left transition text-xs font-bold text-[#262523] flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-[#D66A4A] shrink-0" />
                  <span className="truncate">{t.simienWildlife}</span>
                </button>
              </div>

              {/* Quick Ticket Tracking Bar */}
              <div className="pt-2 border-t border-[#E9E3DA] space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#78736B] block">
                  Search Existing Ticket / Inquiry ID
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="FATA-..."
                    value={trackQuery}
                    onChange={(e) => setTrackQuery(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-[#E9E3DA] rounded-lg text-xs text-[#262523] focus:outline-none focus:border-[#D66A4A]"
                  />
                  <button
                    onClick={onOpenTrackModal}
                    className="px-3.5 py-2 bg-[#262523] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#383633] transition shrink-0"
                  >
                    Track
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
