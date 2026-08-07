import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);
  const t = translations[currentLang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'am', label: 'አማ' },
    { code: 'om', label: 'OM' },
  ];

  const navLinks = [
    { id: 'packages', label: t.navExpeditions },
    { id: 'transport', label: t.navTransport },
    { id: 'permits', label: t.navPermits },
    { id: 'about', label: t.contactHeader },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F5F1EA]/95 backdrop-blur-md shadow-sm border-b border-[#DDD8CE]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Nav Links (desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.slice(0, 2).map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-xs font-medium uppercase tracking-widest transition-colors hover:text-[#C97B4B] ${
                  scrolled ? 'text-[#4A4540]' : 'text-[#F5F1EA]'
                } ${activeSection === link.id ? 'text-[#C97B4B]' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Center: Logo */}
          <div className="flex-1 md:flex-none text-center">
            <button
              onClick={() => handleNavClick('hero')}
              className="inline-block"
            >
              <p className={`font-['Cormorant_Garamond'] font-semibold text-lg tracking-widest uppercase transition-colors ${scrolled ? 'text-[#1C1917]' : 'text-[#F5F1EA]'}`}>
                Fraol Abera
              </p>
              <p className={`text-[9px] uppercase tracking-[0.3em] font-medium -mt-0.5 transition-colors ${scrolled ? 'text-[#C97B4B]' : 'text-[#C97B4B]'}`}>
                Travel Agency
              </p>
            </button>
          </div>

          {/* Right: Nav Links + Lang + CTA (desktop) */}
          <div className="hidden md:flex items-center space-x-5">
            {navLinks.slice(2).map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-xs font-medium uppercase tracking-widest transition-colors hover:text-[#C97B4B] ${
                  scrolled ? 'text-[#4A4540]' : 'text-[#F5F1EA]'
                } ${activeSection === link.id ? 'text-[#C97B4B]' : ''}`}
              >
                {link.label}
              </button>
            ))}

            {/* Track */}
            <button
              onClick={onOpenTrackModal}
              className={`text-xs font-medium uppercase tracking-widest transition-colors hover:text-[#C97B4B] ${scrolled ? 'text-[#4A4540]' : 'text-[#F5F1EA]'}`}
            >
              {t.navTrack}
            </button>

            {/* Language switcher */}
            <div className="flex items-center space-x-1 border-l border-current/20 pl-4 ml-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded transition-colors ${
                    currentLang === lang.code
                      ? 'bg-[#C97B4B] text-white'
                      : scrolled ? 'text-[#6B6560] hover:text-[#C97B4B]' : 'text-[#F5F1EA]/70 hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Book CTA */}
            <button
              onClick={() => onOpenWizard('domestic_tour')}
              className="px-4 py-2 bg-[#C97B4B] text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#B8693A] transition-colors"
            >
              {t.bookInquiry}
            </button>
          </div>

          {/* Mobile: Lang + Hamburger */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="flex items-center space-x-0.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`text-[10px] font-bold tracking-wider px-1 py-0.5 rounded transition-colors ${
                    currentLang === lang.code
                      ? 'bg-[#C97B4B] text-white'
                      : scrolled ? 'text-[#6B6560]' : 'text-[#F5F1EA]/80'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-sm transition-colors ${scrolled ? 'text-[#1C1917]' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 pt-16">
          <div className="absolute inset-0 bg-[#1C1917]/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-[#F5F1EA] border-b border-[#DDD8CE] shadow-xl p-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="w-full text-left py-3 border-b border-[#DDD8CE]/60 text-sm font-medium text-[#1C1917] uppercase tracking-widest hover:text-[#C97B4B] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { onOpenTrackModal(); setMobileMenuOpen(false); }}
              className="w-full text-left py-3 border-b border-[#DDD8CE]/60 text-sm font-medium text-[#1C1917] uppercase tracking-widest hover:text-[#C97B4B] transition-colors"
            >
              {t.navTrack}
            </button>
            <div className="pt-3">
              <button
                onClick={() => { onOpenWizard('domestic_tour'); setMobileMenuOpen(false); }}
                className="w-full py-3 bg-[#C97B4B] text-white text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-[#B8693A] transition-colors"
              >
                {t.bookInquiry}
              </button>
            </div>
            <div className="pt-2">
              <button
                onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                className="w-full text-center py-2 text-[10px] text-[#6B6560] uppercase tracking-widest hover:text-[#C97B4B] transition-colors"
              >
                {t.navAdmin}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
