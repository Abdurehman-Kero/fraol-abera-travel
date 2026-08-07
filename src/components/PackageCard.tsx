import React from 'react';
import { TravelPackage } from '../types';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react';

interface PackageCardProps {
  pkg: TravelPackage;
  onSelect: (pkg: TravelPackage) => void;
  onBookNow: (pkg: TravelPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onSelect, onBookNow }) => {
  return (
    <div className="bg-white border border-[#E9E3DA] hover:border-[#262523] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md group flex flex-col h-full">
      {/* Image Banner */}
      <div className="relative h-44 sm:h-48 overflow-hidden cursor-pointer" onClick={() => onSelect(pkg)}>
        <img 
          src={pkg.image} 
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#262523]/80 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-xs ${
            pkg.category === 'heritage' 
              ? 'bg-[#D66A4A] text-white'
              : pkg.category === 'wildlife'
              ? 'bg-[#8A9374] text-white'
              : pkg.category === 'adventure'
              ? 'bg-[#262523] text-[#F7F3EC]'
              : 'bg-[#D66A4A] text-white'
          }`}>
            {pkg.category === 'heritage' 
              ? 'Heritage & History' 
              : pkg.category === 'wildlife' 
              ? 'Endemic Wildlife' 
              : pkg.category === 'adventure' 
              ? '4x4 Wilderness' 
              : 'Ethiopia Expedition'}
          </span>
          {pkg.featured && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full bg-[#F7F3EC] text-[#D66A4A] border border-[#D66A4A] shadow-xs">
              Popular
            </span>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-[#262523]/90 px-2 py-1 rounded-md text-xs font-semibold text-[#F7F3EC]">
          <Star className="w-3.5 h-3.5 fill-[#D66A4A] text-[#D66A4A]" />
          <span>{pkg.rating.toFixed(1)}</span>
        </div>

        {/* Location & Duration */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <div className="flex items-center space-x-1 truncate max-w-[70%]">
            <MapPin className="w-3.5 h-3.5 text-[#D66A4A] shrink-0" />
            <span className="truncate text-xs font-medium">{pkg.location}</span>
          </div>
          <div className="flex items-center space-x-1 shrink-0 bg-[#262523]/80 px-2 py-0.5 rounded-md text-[10px] font-mono">
            <Clock className="w-3 h-3 text-[#E9E3DA]" />
            <span>{pkg.durationDays} Days</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-3">
        <div>
          <h3 
            onClick={() => onSelect(pkg)} 
            className="text-base font-serif font-bold text-[#262523] hover:text-[#D66A4A] transition cursor-pointer line-clamp-1"
          >
            {pkg.title}
          </h3>
          <p className="text-xs text-[#D66A4A] font-semibold mt-0.5 mb-1.5 line-clamp-1 italic font-serif">
            {pkg.subtitle}
          </p>
          <p className="text-xs text-[#78736B] line-clamp-2 leading-relaxed">
            {pkg.description}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-[#E9E3DA] flex items-center justify-between mt-auto">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#78736B] font-bold block">Starting From</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-base font-bold text-[#D66A4A] font-serif">
                {pkg.priceETB.toLocaleString()}
              </span>
              <span className="text-xs text-[#262523] font-bold">ETB</span>
              {pkg.priceUSD && (
                <span className="text-[11px] text-[#78736B]">
                  (~${pkg.priceUSD})
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => onSelect(pkg)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] border border-[#E9E3DA] transition"
            >
              Details
            </button>
            <button
              onClick={() => onBookNow(pkg)}
              className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-[#D66A4A] hover:bg-[#C2583A] text-white transition flex items-center space-x-1 shadow-xs"
            >
              <span>Inquire</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
