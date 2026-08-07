import React, { useState, useEffect } from 'react';
import { TravelPackage } from './types';
import { Language, translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PackageCard } from './components/PackageCard';
import { PackageModal } from './components/PackageModal';
import { InquiryWizard } from './components/InquiryWizard';
import { FlightInquirySection } from './components/FlightInquirySection';
import { VisaAssistanceSection } from './components/VisaAssistanceSection';
import { DomesticShowcase } from './components/DomesticShowcase';
import { ReceiptUploadModal } from './components/ReceiptUploadModal';
import { TrackInquiryModal } from './components/TrackInquiryModal';
import { AdminPortal } from './components/AdminPortal';
import { ContactFooter } from './components/ContactFooter';
import { TrustedPartners } from './components/TrustedPartners';
import { Testimonials } from './components/Testimonials';
import { Compass, Sparkles, Phone, Calendar, Search, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'heritage' | 'wildlife' | 'adventure'>('all');
  const [currentLang, setCurrentLang] = useState<Language>('en');

  // Modals state
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardInitialService, setWizardInitialService] = useState<string>('domestic_tour');
  const [prefilledPkg, setPrefilledPkg] = useState<TravelPackage | null>(null);

  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [trackInitialQuery, setTrackInitialQuery] = useState('');
  const [adminOpen, setAdminOpen] = useState(false);

  const [activeSection, setActiveSection] = useState('hero');

  // Toast notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const t = translations[currentLang];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPackages(data.packages);
        }
      })
      .catch(err => console.error('Failed to load packages:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleOpenWizardWithService = (service?: string) => {
    setWizardInitialService(service || 'domestic_tour');
    setPrefilledPkg(null);
    setWizardOpen(true);
  };

  const handleBookPackage = (pkg: TravelPackage) => {
    setPrefilledPkg(pkg);
    setWizardInitialService('domestic_tour');
    setWizardOpen(true);
  };

  const filteredPackages = packages.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 pb-28 sm:pb-0">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-emerald-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce max-w-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Navbar with Language Switcher */}
      <Navbar
        onOpenWizard={handleOpenWizardWithService}
        onOpenReceiptModal={() => setReceiptModalOpen(true)}
        onOpenTrackModal={() => { setTrackInitialQuery(''); setTrackModalOpen(true); }}
        onOpenAdmin={() => setAdminOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      {/* Hero Banner */}
      <Hero
        onOpenWizard={handleOpenWizardWithService}
        onOpenTrackModal={() => setTrackModalOpen(true)}
        currentLang={currentLang}
      />

      {/* SECTION: Trusted Partners */}
      <TrustedPartners />

      {/* Main Content Sections */}
      <main className="space-y-12 sm:space-y-16 py-8 sm:py-12">
        {/* SECTION: Tour Packages Catalogue */}
        <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 inline-flex items-center space-x-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.featuredTitle}</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-white">
                Iconic Ethiopian Expeditions & Destinations
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light">
                {t.featuredSubtitle}
              </p>
            </div>

            {/* Filter Tabs (Mobile friendly overflow scroll) */}
            <div className="flex items-center space-x-1.5 bg-slate-900 p-1.5 rounded-lg border border-slate-800 text-xs font-semibold self-start shrink-0 overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-2 rounded-md transition whitespace-nowrap min-h-[36px] ${activeCategory === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                {t.all}
              </button>
              <button
                onClick={() => setActiveCategory('heritage')}
                className={`px-3 py-2 rounded-md transition whitespace-nowrap min-h-[36px] ${activeCategory === 'heritage' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                {t.heritage}
              </button>
              <button
                onClick={() => setActiveCategory('wildlife')}
                className={`px-3 py-2 rounded-md transition whitespace-nowrap min-h-[36px] ${activeCategory === 'wildlife' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                {t.wildlife}
              </button>
              <button
                onClick={() => setActiveCategory('adventure')}
                className={`px-3 py-2 rounded-md transition whitespace-nowrap min-h-[36px] ${activeCategory === 'adventure' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                {t.adventure}
              </button>
            </div>
          </div>

          {/* Packages Grid */}
          {loading ? (
            <div className="text-center py-16 text-slate-400 font-mono text-sm">
              Loading domestic travel packages...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map(pkg => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onSelect={(p) => setSelectedPackage(p)}
                  onBookNow={(p) => handleBookPackage(p)}
                />
              ))}
            </div>
          )}
        </section>

        {/* SECTION: Domestic Ethiopian Showcase */}
        <DomesticShowcase onOpenWizard={handleOpenWizardWithService} currentLang={currentLang} />

        {/* SECTION: Flight & Overland Transport Booking */}
        <FlightInquirySection onOpenWizard={handleOpenWizardWithService} currentLang={currentLang} />

        {/* SECTION: National Park Permits */}
        <VisaAssistanceSection onOpenWizard={handleOpenWizardWithService} currentLang={currentLang} />

        {/* SECTION: Testimonials */}
        <Testimonials />
      </main>

      {/* Footer */}
      <ContactFooter
        onOpenWizard={handleOpenWizardWithService}
        onOpenReceiptModal={() => setReceiptModalOpen(true)}
        onOpenTrackModal={() => setTrackModalOpen(true)}
        currentLang={currentLang}
      />

      {/* Premium Mobile Action Bar (Mobile First) */}
      <div className="fixed bottom-6 left-4 right-4 z-50 bg-[#262523]/95 backdrop-blur-md border border-[#E9E3DA]/10 p-1.5 rounded-full sm:hidden flex items-center justify-between shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
        <a
          href={`tel:${t.phoneTel}`}
          className="flex flex-col items-center justify-center flex-1 py-1.5 text-[#E9E3DA] hover:text-white transition-colors"
        >
          <Phone className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold tracking-wider uppercase">{t.mobileNavCall}</span>
        </a>

        <button
          onClick={() => handleOpenWizardWithService('domestic_tour')}
          className="relative flex flex-col items-center justify-center flex-1 text-[#E9E3DA] hover:text-white transition-colors group"
        >
          <div className="absolute -top-8 bg-[#D66A4A] text-white p-3.5 rounded-full shadow-2xl border-[4px] border-[#262523] group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold tracking-wider uppercase mt-7">{t.mobileNavPlan}</span>
        </button>

        <button
          onClick={() => setTrackModalOpen(true)}
          className="flex flex-col items-center justify-center flex-1 py-1.5 text-[#E9E3DA] hover:text-white transition-colors"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold tracking-wider uppercase">{t.mobileNavTrack}</span>
        </button>
      </div>

      {/* MODALS & OVERLAYS */}
      {/* 1. Package Detail Modal */}
      <PackageModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onBook={(pkg) => handleBookPackage(pkg)}
      />

      {/* 2. Multi-Step Inquiry Wizard */}
      {wizardOpen && (
        <InquiryWizard
          initialService={wizardInitialService}
          prefilledPackage={prefilledPkg}
          onClose={() => setWizardOpen(false)}
          onSuccessTicket={(ticketId) => {
            showToast(`Inquiry Ticket ${ticketId} created!`);
          }}
        />
      )}

      {/* 3. Receipt Upload Modal */}
      {receiptModalOpen && (
        <ReceiptUploadModal
          onClose={() => setReceiptModalOpen(false)}
          onSuccess={() => {
            showToast('Payment receipt submitted for verification!');
          }}
        />
      )}

      {/* 4. Track Inquiry Modal */}
      {trackModalOpen && (
        <TrackInquiryModal
          initialSearchQuery={trackInitialQuery}
          onClose={() => setTrackModalOpen(false)}
          onOpenReceiptModal={() => {
            setTrackModalOpen(false);
            setReceiptModalOpen(true);
          }}
        />
      )}

      {/* 5. Admin Portal */}
      {adminOpen && (
        <AdminPortal
          onClose={() => setAdminOpen(false)}
        />
      )}
    </div>
  );
}
