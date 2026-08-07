import React from 'react';
import { MapPin, Phone, MessageCircle, Send, Mail } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface ContactFooterProps {
  onOpenWizard: (service?: string) => void;
  onOpenReceiptModal: () => void;
  onOpenTrackModal: () => void;
  currentLang?: Language;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({
  onOpenWizard,
  onOpenReceiptModal,
  onOpenTrackModal,
  currentLang = 'en'
}) => {
  const t = translations[currentLang];

  return (
    <footer id="about" className="bg-[#1C1917] text-[#F5F1EA]">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-light text-[#F5F1EA] tracking-wide">
                Fraol Abera
              </h2>
              <p className="text-[#C97B4B] text-[10px] uppercase tracking-[0.35em] font-medium">Travel Agency</p>
            </div>
            <p className="text-[#F5F1EA]/60 text-sm font-light leading-relaxed max-w-sm">
              {t.footerAbout}
            </p>
            <div className="flex items-start gap-2 text-sm text-[#F5F1EA]/70">
              <MapPin className="w-4 h-4 text-[#C97B4B] shrink-0 mt-0.5" />
              <span>{t.locationAddress}</span>
            </div>

            {/* Map embed */}
            <div className="relative w-full h-36 rounded-sm overflow-hidden border border-[#F5F1EA]/10 group">
              <iframe
                src="https://maps.google.com/maps?q=Fraool+Abera,+Addis+Ababa&hl=en&z=15&output=embed"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fraol Abera Location"
                className="grayscale contrast-125 hover:grayscale-0 transition duration-500"
              />
              <a
                href="https://maps.app.goo.gl/PojZNEYFEM7yeocP6"
                target="_blank" rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#1C1917]/40"
              >
                <span className="px-4 py-2 bg-[#C97B4B] text-white text-[10px] font-bold uppercase tracking-widest rounded-sm">Open in Maps</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C97B4B]">{t.footerServices}</h4>
            <ul className="space-y-2.5 text-sm text-[#F5F1EA]/60 font-light">
              <li><button onClick={() => onOpenWizard('domestic_tour')} className="hover:text-[#C97B4B] transition-colors text-left">Harar & Lalibela Heritage Tours</button></li>
              <li><button onClick={() => onOpenWizard('domestic_flight')} className="hover:text-[#C97B4B] transition-colors text-left">Ethiopian Airlines Flights</button></li>
              <li><button onClick={() => onOpenWizard('safari_expedition')} className="hover:text-[#C97B4B] transition-colors text-left">4x4 Harenna Forest Drives</button></li>
              <li><button onClick={() => onOpenWizard('cultural_expedition')} className="hover:text-[#C97B4B] transition-colors text-left">Simien Gelada Treks</button></li>
              <li><button onClick={onOpenReceiptModal} className="hover:text-[#C97B4B] transition-colors text-left font-medium text-[#F5F1EA]/80">Upload Payment Receipt</button></li>
              <li><button onClick={onOpenTrackModal} className="hover:text-[#C97B4B] transition-colors text-left font-medium text-[#F5F1EA]/80">Track My Inquiry</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C97B4B]">{t.footerContact}</h4>
            <div className="space-y-3">
              <a href="tel:+251921741429" className="flex items-center gap-2 text-[#F5F1EA] hover:text-[#C97B4B] transition-colors text-sm font-medium">
                <Phone className="w-4 h-4 text-[#C97B4B] shrink-0" />
                {t.phoneDisplay}
              </a>
              <a href="https://wa.me/251921741429" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#F5F1EA]/70 hover:text-[#25D366] transition-colors text-sm">
                <MessageCircle className="w-4 h-4 shrink-0" />
                WhatsApp
              </a>
              <a href="https://t.me/FraolAberaTravel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#F5F1EA]/70 hover:text-[#0088cc] transition-colors text-sm">
                <Send className="w-4 h-4 shrink-0" />
                Telegram
              </a>
              <a href="mailto:info@fraolabera-travel.com" className="flex items-center gap-2 text-[#F5F1EA]/70 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                info@fraolabera-travel.com
              </a>
            </div>

            {/* Payment block */}
            <div className="mt-4 pt-4 border-t border-[#F5F1EA]/10 space-y-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#C97B4B] font-semibold">{t.footerPayments}</p>
              <div className="text-xs text-[#F5F1EA]/60 space-y-1 font-light">
                <div className="flex justify-between">
                  <span>Telebirr</span>
                  <span className="font-mono text-[#C97B4B]">+251 92 174 1429</span>
                </div>
                <div className="flex justify-between">
                  <span>CBE Account</span>
                  <span className="font-mono text-[#F5F1EA]/40">1000 4567 8901 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#F5F1EA]/10 px-6 sm:px-10 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#F5F1EA]/30 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} {t.footerCopyright}</p>
          <p>Ethiopian Domestic Travel Specialist</p>
        </div>
      </div>
    </footer>
  );
};
