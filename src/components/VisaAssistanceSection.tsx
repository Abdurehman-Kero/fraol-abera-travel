import React from 'react';
import { ShieldCheck, ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface VisaAssistanceSectionProps {
  onOpenWizard: (service?: string) => void;
  currentLang: Language;
}

export const VisaAssistanceSection: React.FC<VisaAssistanceSectionProps> = ({ onOpenWizard, currentLang }) => {
  const t = translations[currentLang];

  const permitGuides = [
    {
      region: 'Simien Mountains National Park',
      permits: 'Park Scout & Official Escort Permits',
      details: 'Requirement for all high-altitude treks. We handle mandatory armed scout fees, Debark park administration entry, and mountain guide registration.',
      iconColor: 'text-[#D66A4A]'
    },
    {
      region: 'Danakil Depression & Erta Ale',
      permits: 'Afar Regional Security & Mineral Clearances',
      details: 'Required Semera / Mekele security permits, Afar regional police escorts, and geothermal site authorizations for Dallol and Erta Ale volcano base camp.',
      iconColor: 'text-[#8A9374]'
    },
    {
      region: 'Lower Omo Valley Tribal Regions',
      permits: 'Community Association & Photo Permissions',
      details: 'Tribal village entry permits for Mursi, Hamer, Karo & Dassanech communities, market day photography passes, and river crossing logistics.',
      iconColor: 'text-[#262523]'
    },
    {
      region: 'Ethiopian Airlines Domestic Pass',
      permits: 'Domestic Flight Discount Verification',
      details: 'Assistance securing up to 50% discount on domestic Ethiopian flight tickets by linking international ticket numbers from Bole International Airport.',
      iconColor: 'text-[#D66A4A]'
    }
  ];

  return (
    <section id="visa" className="py-12 sm:py-16 bg-[#F7F3EC] text-[#262523] relative border-t border-[#E9E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D66A4A] px-3 py-1 bg-[#D66A4A]/10 rounded-[4px] border border-[#D66A4A]/30 inline-flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D66A4A]" />
              <span>{t.permitsTitle}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#262523]">
              National Park Permits, Armed Scouts & Expedition Clearances
            </h2>
            <p className="text-xs sm:text-sm text-[#78736B] font-sans">
              {t.permitsSubtitle}
            </p>
          </div>

          <button
            onClick={() => onOpenWizard('safari_expedition')}
            className="px-5 py-3 rounded-[4px] bg-[#D66A4A] hover:bg-[#C2583A] text-white font-bold text-xs uppercase tracking-widest transition flex items-center justify-center space-x-2 self-start shrink-0 shadow-sm min-h-[48px]"
          >
            <span>Request Permits & Scouts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Permits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {permitGuides.map((item, i) => (
            <div key={i} className="bg-white border border-[#E9E3DA] rounded-[4px] p-5 sm:p-6 hover:border-[#262523] transition shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold font-serif text-[#262523] flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#D66A4A] shrink-0" />
                    <span>{item.region}</span>
                  </h3>
                  <span className="text-[10px] font-mono bg-[#AEB69A]/20 text-[#262523] border border-[#AEB69A] px-2 py-0.5 rounded-[2px] shrink-0">
                    Local Clearance
                  </span>
                </div>
                <p className="text-xs text-[#D66A4A] font-serif italic font-semibold">{item.permits}</p>
                <p className="text-xs text-[#78736B] font-sans leading-relaxed pt-2 border-t border-[#E9E3DA]">
                  {item.details}
                </p>
              </div>

              <button
                onClick={() => onOpenWizard('safari_expedition')}
                className="w-full py-3 rounded-[4px] bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] border border-[#E9E3DA] text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-1 min-h-[44px]"
              >
                <span>Arrange Permits for {item.region.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D66A4A]" />
              </button>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="bg-white border border-[#E9E3DA] rounded-[4px] p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 max-w-2xl">
            <h4 className="text-sm font-bold text-[#262523] font-serif flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#D66A4A] shrink-0" />
              <span>Complete Local Expedition Management</span>
            </h4>
            <p className="text-xs text-[#78736B]">
              Need custom 4x4 Land Cruisers, camping equipment, cook staff, or regional language guides (Amharic, Afar, Oromiffa, Harari)? We handle end-to-end logistics directly from our Addis Ababa office.
            </p>
          </div>

          <button
            onClick={() => onOpenWizard('custom_group')}
            className="w-full md:w-auto px-5 py-3 rounded-[4px] bg-[#262523] text-[#F7F3EC] text-xs font-bold uppercase tracking-wider hover:bg-[#383633] transition min-h-[48px] flex items-center justify-center"
          >
            Inquire Group Logistics
          </button>
        </div>

      </div>
    </section>
  );
};
