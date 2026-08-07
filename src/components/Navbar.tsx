import React, { useState } from 'react';
import { 
  Phone, 
  Receipt, 
  Search, 
  ShieldAlert, 
  Menu, 
  X,
  Calendar,
  Globe,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { Language, translations } from '../data/translations';

interface NavbarProps {
  onOpenWizard: (service?: string) => void;
  onOpenReceiptModal: () => void;
  onOpenTrackModal: () => void;
  onOpenAdmin: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenWizard,
  onOpenReceiptModal,
  onOpenTrackModal,
  onOpenAdmin,
  activeSection,
  setActiveSection,
  currentLang,
  onLanguageChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'am', label: 'Amharic', native: 'አማርኛ' },
    { code: 'om', label: 'Oromo', native: 'Afaan Oromoo' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F7F3EC]/95 backdrop-blur-md border-b border-[#E9E3DA] text-[#262523] shadow-xs">
      {/* Top Banner - Desktop Only to keep Mobile ultra-clean */}
      <div className="hidden md:block bg-[#1D1C1A] text-[#F7F3EC] text-xs py-2 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center space-x-3 text-[#E9E3DA]">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-[#D66A4A]" />
              <span>{t.agencySubtitle}</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-5">
            <a 
              href={`tel:${t.phoneTel}`} 
              className="hover:text-[#D66A4A] flex items-center space-x-1.5 transition font-semibold text-[#F7F3EC]"
            >
              <Phone className="w-3.5 h-3.5 text-[#D66A4A]" />
              <span>{t.phoneDisplay}</span>
            </a>

            <div className="h-3 w-px bg-stone-700" />

            {/* Desktop Language Switcher */}
            <div className="flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-[#D66A4A] mr-1" />
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                    currentLang === lang.code
                      ? 'bg-[#D66A4A] text-white'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  {lang.native}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar - Mobile First Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center space-x-2.5 text-left focus:outline-none group"
        >
          <div className="w-9 h-9 bg-[#D66A4A] rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm group-hover:bg-[#C2583A] transition">
            F
          </div>
          <div>
            <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-[#262523] block uppercase leading-none">
              FRAOL ABERA
            </span>
            <span className="text-[10px] uppercase text-[#78736B] tracking-wider font-semibold block mt-0.5">
              Travel & Expedition
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-[#262523]">
          <button 
            onClick={() => handleNavClick('packages')}
            className={`px-3 py-2 rounded-lg transition ${
              activeSection === 'packages' 
                ? 'bg-[#D66A4A]/10 text-[#D66A4A] font-bold' 
                : 'hover:bg-[#E9E3DA]/60 text-[#262523]'
            }`}
          >
            {t.navExpeditions}
          </button>
          <button 
            onClick={() => handleNavClick('flights')}
            className={`px-3 py-2 rounded-lg transition ${
              activeSection === 'flights' 
                ? 'bg-[#D66A4A]/10 text-[#D66A4A] font-bold' 
                : 'hover:bg-[#E9E3DA]/60 text-[#262523]'
            }`}
          >
            {t.navTransport}
          </button>
          <button 
            onClick={() => handleNavClick('visa')}
            className={`px-3 py-2 rounded-lg transition ${
              activeSection === 'visa' 
                ? 'bg-[#D66A4A]/10 text-[#D66A4A] font-bold' 
                : 'hover:bg-[#E9E3DA]/60 text-[#262523]'
            }`}
          >
            {t.navPermits}
          </button>
        </nav>

        {/* Desktop Action CTAs */}
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={onOpenTrackModal}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-white border border-[#E9E3DA] text-[#262523] hover:bg-[#F7F3EC] transition shadow-xs"
          >
            <Search className="w-3.5 h-3.5 text-[#D66A4A]" />
            <span>{t.navTrack}</span>
          </button>

          <button
            onClick={onOpenReceiptModal}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-[#AEB69A]/20 border border-[#AEB69A]/60 text-[#262523] hover:bg-[#AEB69A]/30 transition shadow-xs"
          >
            <Receipt className="w-3.5 h-3.5 text-[#8A9374]" />
            <span>Payment Proof</span>
          </button>

          <button
            onClick={() => onOpenWizard()}
            className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg bg-[#D66A4A] text-white hover:bg-[#C2583A] transition shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.bookInquiry}</span>
          </button>

          <button
            onClick={onOpenAdmin}
            title={t.navAdmin}
            className="p-2 rounded-lg bg-white border border-[#E9E3DA] text-[#78736B] hover:text-[#262523] transition shadow-xs"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Header Controls: Quick Call + Toggler */}
        <div className="flex items-center space-x-2 lg:hidden">
          {/* Quick Call Pill on Mobile */}
          <a
            href={`tel:${t.phoneTel}`}
            className="flex items-center space-x-1 bg-[#D66A4A]/10 text-[#D66A4A] border border-[#D66A4A]/30 px-2.5 py-1.5 rounded-lg text-xs font-bold transition hover:bg-[#D66A4A]/20"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.phoneDisplay}</span>
          </a>

          {/* Mobile Menu Toggler Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white border border-[#E9E3DA] text-[#262523] shadow-xs active:bg-[#E9E3DA] transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#D66A4A]" />
            ) : (
              <Menu className="w-5 h-5 text-[#262523]" />
            )}
          </button>
        </div>
      </div>

      {/* Clean Absolute Dropdown Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 lg:hidden bg-[#F7F3EC] border-b border-[#E9E3DA] shadow-2xl flex flex-col max-h-[calc(100vh-70px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200 z-40">
          
          <div className="px-5 py-6 space-y-6">
            
            {/* Language Selector */}
            <div className="bg-white p-4 rounded-xl border border-[#E9E3DA] shadow-sm">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#78736B] mb-3 flex items-center space-x-1">
                <Globe className="w-4 h-4 text-[#D66A4A]" />
                <span>Select Language</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`py-2 px-1 text-center rounded-lg text-xs font-bold transition ${
                      currentLang === lang.code
                        ? 'bg-[#D66A4A] text-white shadow-md'
                        : 'bg-[#F7F3EC] text-[#262523] hover:bg-[#E9E3DA]'
                    }`}
                  >
                    {lang.native}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#78736B] px-1 mb-2">
                Services & Booking
              </p>
              <button
                onClick={() => handleNavClick('packages')}
                className="w-full p-4 bg-white border border-[#E9E3DA] rounded-xl text-left text-sm font-bold uppercase tracking-wider text-[#262523] flex items-center justify-between active:bg-[#F7F3EC] shadow-sm transition"
              >
                <span>{t.navExpeditions}</span>
                <ChevronRight className="w-5 h-5 text-[#D66A4A]" />
              </button>
              <button
                onClick={() => handleNavClick('flights')}
                className="w-full p-4 bg-white border border-[#E9E3DA] rounded-xl text-left text-sm font-bold uppercase tracking-wider text-[#262523] flex items-center justify-between active:bg-[#F7F3EC] shadow-sm transition"
              >
                <span>{t.navTransport}</span>
                <ChevronRight className="w-5 h-5 text-[#D66A4A]" />
              </button>
              <button
                onClick={() => handleNavClick('visa')}
                className="w-full p-4 bg-white border border-[#E9E3DA] rounded-xl text-left text-sm font-bold uppercase tracking-wider text-[#262523] flex items-center justify-between active:bg-[#F7F3EC] shadow-sm transition"
              >
                <span>{t.navPermits}</span>
                <ChevronRight className="w-5 h-5 text-[#D66A4A]" />
              </button>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenTrackModal(); }}
                className="flex items-center justify-center space-x-2 py-3.5 bg-white border border-[#E9E3DA] rounded-xl text-xs font-bold text-[#262523] shadow-sm active:bg-[#F7F3EC] transition"
              >
                <Search className="w-4 h-4 text-[#D66A4A]" />
                <span>{t.navTrack}</span>
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenReceiptModal(); }}
                className="flex items-center justify-center space-x-2 py-3.5 bg-[#AEB69A]/20 border border-[#AEB69A]/50 rounded-xl text-xs font-bold text-[#262523] shadow-sm active:bg-[#AEB69A]/30 transition"
              >
                <Receipt className="w-4 h-4 text-[#8A9374]" />
                <span>Payment Proof</span>
              </button>
            </div>

            <div className="pt-2 pb-4 space-y-3">
              {/* Main Booking Action */}
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenWizard(); }}
                className="w-full flex items-center justify-center space-x-2 py-4 bg-[#D66A4A] text-white rounded-xl text-sm font-bold uppercase tracking-wider shadow-md active:bg-[#C2583A] transition"
              >
                <Calendar className="w-5 h-5" />
                <span>{t.bookInquiry}</span>
              </button>

              {/* Direct Agency Phone Call */}
              <a
                href={`tel:${t.phoneTel}`}
                className="w-full flex items-center justify-between px-5 py-4 bg-[#1D1C1A] text-[#F7F3EC] rounded-xl text-xs font-semibold shadow-md active:bg-[#2A2927] transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#D66A4A] rounded-full flex items-center justify-center text-white">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase font-medium">Direct Agency Phone</div>
                    <div className="font-bold text-sm">{t.phoneDisplay}</div>
                  </div>
                </div>
                <span className="text-xs text-[#D66A4A] font-bold uppercase">Call Now →</span>
              </a>
              
              {/* Admin Link */}
              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                  className="flex items-center justify-center space-x-1.5 text-stone-400 hover:text-[#262523] text-[10px] uppercase tracking-widest font-bold transition"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Admin Access</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
