import React, { useState } from 'react';
import { Plane, ArrowRight, ShieldCheck, MapPin, Car, Bus } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface FlightInquirySectionProps {
  onOpenWizard: (service?: string) => void;
  currentLang: Language;
}

export const FlightInquirySection: React.FC<FlightInquirySectionProps> = ({ onOpenWizard, currentLang }) => {
  const [transportType, setTransportType] = useState<'flight' | 'overland_4x4' | 'coaster_bus'>('flight');
  const [tripType, setTripType] = useState<'round' | 'one_way'>('round');
  const [fromLocation, setFromLocation] = useState('Addis Ababa (Bole / Akaki)');
  const [toLocation, setToLocation] = useState('Lalibela (LLI / Overland)');
  const t = translations[currentLang];

  const popularRoutes = [
    'Addis ⇄ Lalibela',
    'Addis ⇄ Harar / Dire Dawa',
    'Addis ⇄ Simien Mountains / Gondar',
    'Addis ⇄ Bale Harenna / Robe',
    'Addis ⇄ Lower Omo Valley / Jinka',
    'Addis ⇄ Danakil / Semera',
    'Addis ⇄ Hawassa & Arba Minch',
    'Addis ⇄ Bahir Dar & Lake Tana'
  ];

  return (
    <section id="flights" className="py-12 sm:py-16 bg-[#262523] text-[#F7F3EC] relative border-t border-b border-[#262523]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D66A4A] px-3 py-1 bg-[#D66A4A]/20 rounded-[4px] border border-[#D66A4A]/40 inline-flex items-center space-x-1.5">
            <Car className="w-3.5 h-3.5 text-[#D66A4A]" />
            <span>{t.transportHeading}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#F7F3EC]">
            Domestic Flights, 4x4 Land Cruisers & Overland Drives
          </h2>
          <p className="text-xs sm:text-sm text-[#E9E3DA]/80 font-sans leading-relaxed">
            {t.transportSubheading}
          </p>
        </div>

        {/* Transport Booking Card Widget */}
        <div className="bg-white text-[#262523] border border-[#E9E3DA] rounded-[4px] p-5 sm:p-8 shadow-xl space-y-6">
          
          {/* Transport Mode Selection Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-b border-[#E9E3DA] pb-4">
            <button
              onClick={() => setTransportType('flight')}
              className={`p-3 rounded-[4px] border transition flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider min-h-[48px] ${
                transportType === 'flight'
                  ? 'bg-[#D66A4A] text-white border-[#D66A4A] shadow-sm'
                  : 'bg-[#F7F3EC] text-[#262523] border-[#E9E3DA] hover:border-[#D66A4A]'
              }`}
            >
              <Plane className="w-4 h-4 shrink-0" />
              <span>{t.flightMode}</span>
            </button>

            <button
              onClick={() => setTransportType('overland_4x4')}
              className={`p-3 rounded-[4px] border transition flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider min-h-[48px] ${
                transportType === 'overland_4x4'
                  ? 'bg-[#D66A4A] text-white border-[#D66A4A] shadow-sm'
                  : 'bg-[#F7F3EC] text-[#262523] border-[#E9E3DA] hover:border-[#D66A4A]'
              }`}
            >
              <Car className="w-4 h-4 shrink-0" />
              <span>{t.overland4x4Mode}</span>
            </button>

            <button
              onClick={() => setTransportType('coaster_bus')}
              className={`p-3 rounded-[4px] border transition flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-wider min-h-[48px] ${
                transportType === 'coaster_bus'
                  ? 'bg-[#D66A4A] text-white border-[#D66A4A] shadow-sm'
                  : 'bg-[#F7F3EC] text-[#262523] border-[#E9E3DA] hover:border-[#D66A4A]'
              }`}
            >
              <Bus className="w-4 h-4 shrink-0" />
              <span>{t.coasterBusMode}</span>
            </button>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">
                Departure Point
              </label>
              <select
                value={fromLocation}
                onChange={e => setFromLocation(e.target.value)}
                className="w-full px-3 py-3 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[4px] text-xs text-[#262523] focus:outline-none focus:border-[#D66A4A] min-h-[44px]"
              >
                <option value="Addis Ababa (Bole / Akaki)">Addis Ababa (Bole / Akaki)</option>
                <option value="Lalibela">Lalibela</option>
                <option value="Gondar / Simien">Gondar / Simien</option>
                <option value="Semera / Danakil">Semera / Danakil</option>
                <option value="Dire Dawa / Harar">Dire Dawa / Harar</option>
                <option value="Hawassa">Hawassa</option>
                <option value="Arba Minch">Arba Minch</option>
                <option value="Bahir Dar">Bahir Dar</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">
                Destination
              </label>
              <select
                value={toLocation}
                onChange={e => setToLocation(e.target.value)}
                className="w-full px-3 py-3 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[4px] text-xs text-[#262523] focus:outline-none focus:border-[#D66A4A] min-h-[44px]"
              >
                <option value="Lalibela (LLI / Overland)">Lalibela (LLI / Overland)</option>
                <option value="Harar Jugol / Dire Dawa">Harar Jugol / Dire Dawa</option>
                <option value="Simien Mountains / Debark">Simien Mountains / Debark</option>
                <option value="Bale Harenna Forest / Robe">Bale Harenna Forest / Robe</option>
                <option value="Omo Valley / Jinka">Omo Valley / Jinka</option>
                <option value="Danakil Depression / Semera">Danakil Depression / Semera</option>
                <option value="Hawassa / Arba Minch">Hawassa / Arba Minch</option>
                <option value="Gondar / Fasilides">Gondar / Fasilides</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">
                Trip Style
              </label>
              <select
                value={tripType}
                onChange={e => setTripType(e.target.value as any)}
                className="w-full px-3 py-3 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[4px] text-xs text-[#262523] focus:outline-none focus:border-[#D66A4A] min-h-[44px]"
              >
                <option value="round">Round Trip</option>
                <option value="one_way">One Way</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => onOpenWizard(transportType === 'flight' ? 'domestic_flight' : 'safari_expedition')}
                className="w-full py-3 rounded-[4px] bg-[#D66A4A] hover:bg-[#C2583A] text-white font-bold text-xs uppercase tracking-widest transition flex items-center justify-center space-x-2 shadow-sm min-h-[44px]"
              >
                <span>Request Price Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Popular Domestic Route Shortcuts */}
          <div className="pt-4 border-t border-[#E9E3DA] text-xs text-[#78736B] space-y-2">
            <span className="font-bold text-[#262523] uppercase text-[10px] tracking-wider flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-[#D66A4A]" />
              <span>Popular Flight & Overland Domestic Destinations:</span>
            </span>
            <div className="flex flex-wrap gap-2 text-[11px]">
              {popularRoutes.map((rt, i) => (
                <button
                  key={i}
                  onClick={() => onOpenWizard('domestic_flight')}
                  className="px-3 py-1.5 rounded-[4px] bg-[#F7F3EC] border border-[#E9E3DA] hover:border-[#D66A4A] text-[#262523] hover:text-[#D66A4A] transition min-h-[36px]"
                >
                  {rt}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
