import React, { useState } from 'react';
import { TravelPackage } from '../types';
import { 
  X, MapPin, Clock, Star, CheckCircle2, XCircle, Calendar, ChevronRight, ShieldCheck, PhoneCall
} from 'lucide-react';

interface PackageModalProps {
  pkg: TravelPackage | null;
  onClose: () => void;
  onBook: (pkg: TravelPackage) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({ pkg, onClose, onBook }) => {
  if (!pkg) return null;

  const [activeImage, setActiveImage] = useState(pkg.image);

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1917]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#F5F1EA] border border-[#1C1917]/10 rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto text-[#1C1917] shadow-2xl relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-sm bg-[#1C1917]/80 hover:bg-[#1C1917] text-[#F5F1EA] transition backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Section */}
        <div className="relative h-64 sm:h-80 bg-[#1C1917]">
          <img 
            src={activeImage} 
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-black/30" />

          {/* Thumbnails if available */}
          {pkg.gallery && pkg.gallery.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4 flex space-x-2 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveImage(pkg.image)}
                className={`w-14 h-10 rounded-sm overflow-hidden border-2 shrink-0 transition ${activeImage === pkg.image ? 'border-[#C97B4B] scale-105' : 'border-[#F5F1EA]/50 opacity-70 hover:opacity-100'}`}
              >
                <img src={pkg.image} alt="Thumbnail main" className="w-full h-full object-cover" />
              </button>
              {pkg.gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-14 h-10 rounded-sm overflow-hidden border-2 shrink-0 transition ${activeImage === imgUrl ? 'border-[#C97B4B] scale-105' : 'border-[#F5F1EA]/50 opacity-70 hover:opacity-100'}`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Header & Price Info */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 border-b border-[#1C1917]/10 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center space-x-3">
                <span className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm bg-[#C97B4B] text-white">
                  {pkg.category === 'domestic_tour' ? 'Domestic Tour' : 'Travel Experience'}
                </span>
                {pkg.rating && (
                  <div className="flex items-center space-x-1 text-[#C97B4B] text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-[#C97B4B]" />
                    <span>{pkg.rating.toFixed(1)} Rating</span>
                  </div>
                )}
              </div>

              <h2 className="text-3xl sm:text-5xl font-light font-['Cormorant_Garamond'] text-[#1C1917] leading-tight">
                {pkg.title}
              </h2>
              {pkg.subtitle && <p className="text-sm text-[#C97B4B] font-medium">{pkg.subtitle}</p>}

              <div className="flex flex-wrap items-center gap-5 text-xs text-[#6B6560] pt-2">
                {pkg.location && (
                  <span className="flex items-center space-x-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-[#C97B4B]" />
                    <span>{pkg.location}</span>
                  </span>
                )}
                {pkg.duration && (
                  <span className="flex items-center space-x-1.5 font-medium">
                    <Clock className="w-4 h-4 text-[#C97B4B]" />
                    <span>{pkg.duration}</span>
                  </span>
                )}
                {pkg.durationDays && !pkg.duration && (
                  <span className="flex items-center space-x-1.5 font-medium">
                    <Clock className="w-4 h-4 text-[#C97B4B]" />
                    <span>{pkg.durationDays} Days / {pkg.durationDays - 1} Nights</span>
                  </span>
                )}
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-white border border-[#1C1917]/10 p-5 rounded-sm text-right min-w-[220px] shadow-sm">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B6560] block mb-1">Estimated Package Rate</span>
              <div className="text-3xl font-light text-[#C97B4B] font-['Cormorant_Garamond']">
                {pkg.priceETB.toLocaleString()} <span className="text-sm font-semibold text-[#1C1917]">ETB</span>
              </div>
              {pkg.priceUSD && (
                <p className="text-xs text-[#6B6560] mt-1 font-medium">
                  Approx. ${pkg.priceUSD} USD / Person
                </p>
              )}
            </div>
          </div>

          {/* Package Overview */}
          {pkg.description && (
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C97B4B]">Overview</h3>
              <p className="text-[#1C1917] text-sm leading-relaxed font-light max-w-4xl">
                {pkg.description}
              </p>
            </div>
          )}

          {/* Itinerary Accordion / Timeline */}
          {pkg.itinerary && pkg.itinerary.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C97B4B] flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Tour Itinerary</span>
              </h3>

              <div className="space-y-3">
                {pkg.itinerary.map((dayItem: any) => (
                  <div key={dayItem.day} className="bg-white border border-[#1C1917]/10 rounded-sm p-5 space-y-2">
                    <div className="flex items-center space-x-3 text-sm font-bold text-[#1C1917]">
                      <span className="bg-[#C97B4B]/10 text-[#C97B4B] px-2.5 py-1 rounded-sm text-[10px] uppercase tracking-widest font-bold">
                        Day {dayItem.day}
                      </span>
                      <span className="font-['Cormorant_Garamond'] text-lg font-semibold">{dayItem.title}</span>
                    </div>
                    <p className="text-xs text-[#6B6560] leading-relaxed pl-[4.5rem]">
                      {dayItem.desc || dayItem.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {pkg.highlights && pkg.highlights.length > 0 ? (
              <div className="bg-white border border-[#1C1917]/10 rounded-sm p-6 space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1C1917] flex items-center space-x-2">
                  <Star className="w-4 h-4 text-[#C97B4B]" />
                  <span>Highlights</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#6B6560] font-medium">
                  {pkg.highlights.map((hlt: string, i: number) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-[#C97B4B]">•</span>
                      <span>{hlt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : pkg.inclusions && pkg.inclusions.length > 0 ? (
              <div className="bg-[#F5F1EA] border border-[#1C1917]/10 rounded-sm p-6 space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1C1917] flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A5D23]" />
                  <span>What Is Included</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#6B6560] font-medium">
                  {pkg.inclusions.map((inc: string, i: number) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-[#4A5D23] font-bold">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {pkg.exclusions && pkg.exclusions.length > 0 && (
              <div className="bg-white border border-[#C97B4B]/20 rounded-sm p-6 space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#C97B4B] flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-[#C97B4B]" />
                  <span>What Is Excluded</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#6B6560] font-medium">
                  {pkg.exclusions.map((exc: string, i: number) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-[#C97B4B] font-bold">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-[#1C1917]/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-[#6B6560]">
              <span className="flex items-center space-x-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#4A5D23]" />
                <span>Akaki Kality Verified</span>
              </span>
              <a href="tel:+251921741429" className="hover:text-[#C97B4B] flex items-center space-x-1.5 font-bold transition-colors">
                <PhoneCall className="w-4 h-4" />
                <span>+251 92 174 1429</span>
              </a>
            </div>

            <div className="flex items-center space-x-4 w-full md:w-auto">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-sm bg-transparent hover:bg-white text-[#1C1917] border border-[#1C1917]/10 text-[10px] font-bold uppercase tracking-widest transition flex-1 md:flex-none text-center"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBook(pkg);
                }}
                className="px-8 py-3 rounded-sm bg-[#C97B4B] hover:bg-[#B8693A] text-white text-[10px] font-bold uppercase tracking-widest transition flex items-center justify-center space-x-2 flex-1 md:flex-none"
              >
                <span>Book This Journey</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
