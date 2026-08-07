import React, { useState } from 'react';
import { TravelPackage } from '../types';
import { 
  X, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  ChevronRight, 
  ShieldCheck, 
  PhoneCall
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
    <div className="fixed inset-0 z-50 bg-[#262523]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-[#E9E3DA] rounded-[2px] max-w-4xl w-full max-h-[92vh] overflow-y-auto text-[#262523] shadow-2xl relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-[2px] bg-[#262523]/80 hover:bg-[#262523] text-white transition border border-[#262523]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Section */}
        <div className="relative h-64 sm:h-80 bg-[#262523]">
          <img 
            src={activeImage} 
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#262523] via-transparent to-black/30" />

          {/* Thumbnails if available */}
          {pkg.gallery && pkg.gallery.length > 0 && (
            <div className="absolute bottom-3 left-4 right-4 flex space-x-2 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveImage(pkg.image)}
                className={`w-14 h-10 rounded-[2px] overflow-hidden border-2 shrink-0 transition ${activeImage === pkg.image ? 'border-[#D66A4A] scale-105' : 'border-white/50 opacity-70'}`}
              >
                <img src={pkg.image} alt="Thumbnail main" className="w-full h-full object-cover" />
              </button>
              {pkg.gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-14 h-10 rounded-[2px] overflow-hidden border-2 shrink-0 transition ${activeImage === imgUrl ? 'border-[#D66A4A] scale-105' : 'border-white/50 opacity-70'}`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Header & Price Info */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E9E3DA] pb-5">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-[2px] bg-[#D66A4A] text-white">
                  {pkg.category === 'domestic' ? 'Ethiopia Domestic Tour' : 'Outbound International Package'}
                </span>
                <div className="flex items-center space-x-1 text-[#D66A4A] text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#D66A4A]" />
                  <span>{pkg.rating.toFixed(1)} Rating</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#262523]">
                {pkg.title}
              </h2>
              <p className="text-sm text-[#D66A4A] font-serif italic font-semibold">{pkg.subtitle}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#78736B] pt-1">
                <span className="flex items-center space-x-1 text-[#262523] font-medium">
                  <MapPin className="w-4 h-4 text-[#D66A4A]" />
                  <span>{pkg.location}</span>
                </span>
                <span className="flex items-center space-x-1 text-[#262523] font-mono">
                  <Clock className="w-4 h-4 text-[#D66A4A]" />
                  <span>{pkg.durationDays} Days / {pkg.durationDays - 1} Nights</span>
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#F7F3EC] border border-[#E9E3DA] p-4 rounded-[2px] text-right min-w-[200px]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#78736B] block">Package Rate</span>
              <div className="text-2xl sm:text-3xl font-bold text-[#D66A4A] font-serif">
                {pkg.priceETB.toLocaleString()} <span className="text-sm font-bold text-[#262523]">ETB</span>
              </div>
              {pkg.priceUSD && (
                <p className="text-xs text-[#78736B] font-sans mt-0.5">
                  Approx. ${pkg.priceUSD} USD / Person
                </p>
              )}
              <p className="text-[10px] text-[#78736B] mt-1">
                Includes all tax & booking fees
              </p>
            </div>
          </div>

          {/* Package Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#D66A4A] font-serif">
              Overview
            </h3>
            <p className="text-[#262523] text-sm leading-relaxed font-sans">
              {pkg.description}
            </p>
          </div>

          {/* Itinerary Accordion / Timeline */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#D66A4A] font-serif flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Day-by-Day Tour Itinerary</span>
            </h3>

            <div className="space-y-2.5">
              {pkg.itinerary.map((dayItem) => (
                <div key={dayItem.day} className="bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] p-4 space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#262523]">
                    <span className="bg-[#D66A4A] text-white px-2 py-0.5 rounded-[2px] text-[10px] font-mono">
                      Day {dayItem.day}
                    </span>
                    <span className="text-sm text-[#262523] font-serif font-bold">{dayItem.title}</span>
                  </div>
                  <p className="text-xs text-[#78736B] leading-relaxed font-sans pl-1">
                    {dayItem.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#AEB69A]/15 border border-[#AEB69A]/40 rounded-[2px] p-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#262523] flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#8A9374]" />
                <span>What Is Included</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#262523]">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-[#8A9374] font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#D66A4A]/10 border border-[#D66A4A]/30 rounded-[2px] p-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D66A4A] flex items-center space-x-1.5">
                <XCircle className="w-4 h-4 text-[#D66A4A]" />
                <span>What Is Excluded</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#262523]">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-[#D66A4A] font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-[#E9E3DA] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-xs text-[#78736B]">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-[#8A9374]" />
                <span>Akaki Kality Main Branch Verified</span>
              </span>
              <a href="tel:+251921741429" className="hover:text-[#D66A4A] flex items-center space-x-1 font-bold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+251 92 174 1429</span>
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-[2px] bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] border border-[#E9E3DA] text-xs font-bold uppercase tracking-wider transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBook(pkg);
                }}
                className="px-6 py-2.5 rounded-[2px] bg-[#D66A4A] hover:bg-[#C2583A] text-white text-xs font-bold uppercase tracking-widest transition flex items-center space-x-2"
              >
                <span>Request Quote for this Package</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

