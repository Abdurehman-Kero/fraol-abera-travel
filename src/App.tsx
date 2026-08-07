import React, { useState, useEffect } from 'react';
import { TravelPackage } from './types';
import { Language, translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyUs } from './components/WhyUs';
import { ExperienceSelector } from './components/ExperienceSelector';
import { DestinationsStrip } from './components/DestinationsStrip';
import { TrustedPartners } from './components/TrustedPartners';
import { Testimonials } from './components/Testimonials';
import { ContactFooter } from './components/ContactFooter';
import { PackageModal } from './components/PackageModal';
import { InquiryWizard } from './components/InquiryWizard';
import { ReceiptUploadModal } from './components/ReceiptUploadModal';
import { TrackInquiryModal } from './components/TrackInquiryModal';
import { AdminPortal } from './components/AdminPortal';
import { Phone, Compass, Search, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
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
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const t = translations[currentLang];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => { if (data.success) setPackages(data.packages); })
      .catch(err => console.error('Failed to load packages:', err));
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

  return (
    <div className="min-h-screen bg-[#F5F1EA] text-[#1C1917] font-['Inter',sans-serif] selection:bg-[#C97B4B]/30 pb-20 sm:pb-0">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 z-50 bg-[#1C1917] text-[#F5F1EA] text-xs px-5 py-3 rounded-sm shadow-2xl flex items-center gap-2 max-w-xs">
          <CheckCircle2 className="w-4 h-4 text-[#C97B4B] shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Navbar */}
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

      {/* 1. Hero */}
      <Hero
        onOpenWizard={handleOpenWizardWithService}
        onOpenTrackModal={() => setTrackModalOpen(true)}
        currentLang={currentLang}
      />

      {/* 2. Why Us */}
      <WhyUs onOpenWizard={handleOpenWizardWithService} currentLang={currentLang} />

      {/* 3. Experience Selector */}
      <ExperienceSelector onOpenWizard={handleOpenWizardWithService} currentLang={currentLang} />

      {/* 4. Destinations Strip */}
      <DestinationsStrip onOpenWizard={handleOpenWizardWithService} currentLang={currentLang} />

      {/* 5. Testimonials */}
      <Testimonials currentLang={currentLang} />

      {/* 6. Trusted Partners */}
      <TrustedPartners currentLang={currentLang} />

      {/* 7. Footer */}
      <ContactFooter
        onOpenWizard={handleOpenWizardWithService}
        onOpenReceiptModal={() => setReceiptModalOpen(true)}
        onOpenTrackModal={() => setTrackModalOpen(true)}
        currentLang={currentLang}
      />

      {/* Mobile Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1C1917] sm:hidden flex items-center border-t border-[#F5F1EA]/10">
        <a
          href={`tel:${t.phoneTel}`}
          className="flex flex-col items-center justify-center flex-1 py-3 text-[#F5F1EA]/70 hover:text-[#C97B4B] transition-colors"
        >
          <Phone className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-medium uppercase tracking-wider">{t.mobileNavCall}</span>
        </a>
        <button
          onClick={() => handleOpenWizardWithService('domestic_tour')}
          className="flex-1 py-4 bg-[#C97B4B] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#B8693A] transition-colors flex flex-col items-center gap-0.5"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[9px]">{t.mobileNavPlan}</span>
        </button>
        <button
          onClick={() => setTrackModalOpen(true)}
          className="flex flex-col items-center justify-center flex-1 py-3 text-[#F5F1EA]/70 hover:text-[#C97B4B] transition-colors"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[9px] font-medium uppercase tracking-wider">{t.mobileNavTrack}</span>
        </button>
      </div>

      {/* Modals */}
      <PackageModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onBook={(pkg) => handleBookPackage(pkg)}
      />

      {wizardOpen && (
        <InquiryWizard
          initialService={wizardInitialService}
          prefilledPackage={prefilledPkg}
          onClose={() => setWizardOpen(false)}
          onSuccessTicket={(ticketId) => showToast(`Inquiry Ticket ${ticketId} created!`)}
        />
      )}

      {receiptModalOpen && (
        <ReceiptUploadModal
          currentLang={currentLang}
          onClose={() => setReceiptModalOpen(false)}
          onSuccess={() => showToast('Payment receipt submitted for verification!')}
        />
      )}

      {trackModalOpen && (
        <TrackInquiryModal
          currentLang={currentLang}
          initialSearchQuery={trackInitialQuery}
          onClose={() => setTrackModalOpen(false)}
          onOpenReceiptModal={() => {
            setTrackModalOpen(false);
            setReceiptModalOpen(true);
          }}
        />
      )}

      {adminOpen && (
        <AdminPortal onClose={() => setAdminOpen(false)} />
      )}
    </div>
  );
}
