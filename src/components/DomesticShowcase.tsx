import React, { useState } from 'react';
import { Compass, ShieldCheck, MapPin, ArrowRight, Eye, Sparkles, CheckCircle, Car } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  region: string;
  description: string;
  badge: string;
  image: string;
  highlights: string[];
  packageId: string;
}

interface DomesticShowcaseProps {
  onOpenWizard: (service?: string) => void;
  currentLang: Language;
}

export const DomesticShowcase: React.FC<DomesticShowcaseProps> = ({ onOpenWizard, currentLang }) => {
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);
  const t = translations[currentLang];

  const showcaseItems: ShowcaseItem[] = [
    {
      id: 'harar-balcony',
      title: 'Harar Jugol Traditional Balcony Architecture',
      subtitle: 'Historic Walled Citadel, Sunlit Wooden Staircases & Courtyards',
      category: 'Cultural Heritage',
      region: 'Harar Jugol, Eastern Ethiopia',
      description: 'Step into the 16th-century UNESCO World Heritage walled city of Harar Jugol. Walk through white plaster courtyards adorned with traditional carved wooden balconies, staircases, and historic Harari cultural houses.',
      badge: 'UNESCO Citadel',
      image: '/gallery/harar_balcony.png',
      highlights: [
        'Traditional Harari carved wooden balconies & stairs',
        'Arthur Rimbaud historic museum compound',
        '99 ancient mosques within the 5 walled gates',
        'Nightly wild hyena feeding ritual experience'
      ],
      packageId: 'pkg-harar-02'
    },
    {
      id: 'forest-safari',
      title: 'Bale Mountains 4x4 Forest Safari',
      subtitle: 'Dense Emerald Tree Canopies & Rugged Off-Road Tracks',
      category: '4x4 Overland Safari',
      region: 'Bale Mountains, Oromia Region',
      description: 'Experience authentic Ethiopian adventure with heavy-duty 4x4 Land Cruisers driving deep beneath the misty, ancient green tree canopy of Harenna Forest and Sanetti plateau.',
      badge: 'Rugged 4WD Drive',
      image: '/gallery/forest_safari.png',
      highlights: [
        'Heavy-duty AC 4x4 Land Cruisers with expert drivers',
        'Sublime journeys through dense green forest canopy',
        'Sanetti Plateau afro-alpine Ethiopian Wolf sightings',
        'Wild origin arabica coffee forest discovery'
      ],
      packageId: 'pkg-bale-04'
    },
    {
      id: 'lalibela-church',
      title: 'Lalibela Rock-Hewn Monolithic Churches',
      subtitle: 'Ancient Subterranean Wonders & Spiritual Heritage',
      category: 'Cultural Heritage',
      region: 'Lalibela, Amhara Region',
      description: 'Explore the awe-inspiring 12th-century rock-hewn churches of Lalibela, carved directly out of the red volcanic rock into perfect cross shapes, often called the "New Jerusalem".',
      badge: 'UNESCO Heritage',
      image: '/gallery/lalibela_church.png',
      highlights: [
        'Bete Giyorgis (St. George) cross-shaped monolith',
        'Guided tours through the subterranean tunnels',
        'Early morning chanting & spiritual ceremonies',
        'Traditional highland coffee ceremonies'
      ],
      packageId: 'pkg-lalibela-01'
    },
    {
      id: 'ethiopian-wildlife',
      title: 'Ethiopian River & Bird Wildlife',
      subtitle: 'Pristine River Ecosystems & Diverse Bird Watching',
      category: 'Wildlife & Nature',
      region: 'Rift Valley Lakes & Omo River',
      description: 'Discover the rich biodiversity of Ethiopia\'s river systems. Watch elegant herons and diverse birdlife thrive along the muddy banks of the Omo River and the Great Rift Valley lakes.',
      badge: 'Bird Watching',
      image: '/gallery/flying_bird.png',
      highlights: [
        'Expert-guided bird watching boat tours',
        'Photography safaris along the Omo River',
        'Sightings of rare African herons & fish eagles',
        'Lake Awassa & Lake Chamo hippo spotting'
      ],
      packageId: 'pkg-rift-05'
    }
  ];

  return (
    <section id="domestic-treasures" className="py-12 bg-slate-900/80 text-white border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 inline-flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.domesticShowcaseTitle}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-white">
              Authentic Domestic Travel: Flight & Overland 4x4
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              {t.domesticShowcaseSubtitle}
            </p>
          </div>

          <button
            onClick={() => onOpenWizard('domestic_tour')}
            className="px-5 py-3 rounded-[4px] bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest transition flex items-center justify-center space-x-2 shrink-0 min-h-[48px]"
          >
            <Car className="w-4 h-4 text-slate-950" />
            <span>Request Overland / Flight Quote</span>
          </button>
        </div>

        {/* 4 Featured Cards (Mobile-first responsive grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden hover:border-amber-500/50 transition duration-300 flex flex-col justify-between shadow-xl group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-[2px] bg-amber-500 text-slate-950 shadow-md">
                    {item.badge}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center space-x-1 text-slate-300 text-[11px] font-medium truncate">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{item.region}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-2">
                  <h3 className="text-base font-bold font-serif text-white group-hover:text-amber-400 transition leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="pt-2 space-y-1">
                    {item.highlights.slice(0, 2).map((h, idx) => (
                      <li key={idx} className="flex items-center space-x-1.5 text-[11px] text-slate-300">
                        <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 pt-0 mt-auto">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="w-full py-3 rounded-[4px] bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-amber-400 transition flex items-center justify-center space-x-1.5 min-h-[44px]"
                >
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>{t.viewDetails}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-5 sm:p-6 space-y-6 shadow-2xl relative my-8">
            <div className="relative h-60 rounded-lg overflow-hidden">
              <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-950/80 text-white flex items-center justify-center font-bold hover:bg-amber-500 hover:text-slate-950 transition"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 bg-amber-500 text-slate-950 rounded-[2px]">
                  {selectedItem.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                  {selectedItem.title}
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <p className="text-sm font-light text-slate-200 leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Highlights & Transportation Options:</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  {selectedItem.highlights.map((h, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-3 rounded-[4px] bg-slate-800 text-white text-xs font-semibold transition min-h-[44px]"
              >
                {t.close}
              </button>
              <button
                onClick={() => {
                  setSelectedItem(null);
                  onOpenWizard('domestic_tour');
                }}
                className="px-5 py-3 rounded-[4px] bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition flex items-center space-x-2 shadow-lg min-h-[44px]"
              >
                <span>{t.bookNow}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
