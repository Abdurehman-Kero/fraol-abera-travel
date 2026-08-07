import React from 'react';
import { MapPin, Phone, Mail, Send, Clock, MessageCircle } from 'lucide-react';
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
    <footer id="about" className="bg-[#262523] text-[#F7F3EC] pt-12 pb-12 border-t border-[#E9E3DA]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#D66A4A] rounded-[4px] flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm shrink-0">
                F
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-serif tracking-tight uppercase">FRAOL ABERA</h3>
                <p className="text-[10px] text-[#D66A4A] uppercase tracking-widest font-bold">TRAVEL AGENCY</p>
              </div>
            </div>

            <p className="text-xs text-[#E9E3DA]/70 leading-relaxed font-sans">
              {t.footerAbout}
            </p>

            <div className="space-y-2 text-xs text-[#E9E3DA] pt-1">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#D66A4A] shrink-0 mt-0.5" />
                <span>
                  <strong>Akaki Kality Sub-City</strong>, Woreda 04, Near Customs / Ring Road, Addis Ababa, Ethiopia
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#D66A4A] shrink-0" />
                <span>Monday – Saturday: 8:00 AM – 7:00 PM EAT</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D66A4A] font-serif">
              {t.footerServices}
            </h4>
            <ul className="space-y-2 text-xs text-[#E9E3DA]">
              <li>
                <button onClick={() => onOpenWizard('domestic_tour')} className="hover:text-[#D66A4A] transition text-left min-h-[36px] flex items-center">
                  • Harar Balcony & Lalibela Heritage Tours
                </button>
              </li>
              <li>
                <button onClick={() => onOpenWizard('domestic_flight')} className="hover:text-[#D66A4A] transition text-left min-h-[36px] flex items-center">
                  • Ethiopian Airlines Regional Flights
                </button>
              </li>
              <li>
                <button onClick={() => onOpenWizard('safari_expedition')} className="hover:text-[#D66A4A] transition text-left min-h-[36px] flex items-center">
                  • 4x4 Harenna Forest & Omo River Drives
                </button>
              </li>
              <li>
                <button onClick={() => onOpenWizard('cultural_expedition')} className="hover:text-[#D66A4A] transition text-left min-h-[36px] flex items-center">
                  • Simien Mountains Gelada Baboon Treks
                </button>
              </li>
              <li>
                <button onClick={onOpenReceiptModal} className="hover:text-[#D66A4A] transition font-bold text-[#AEB69A] min-h-[36px] flex items-center">
                  • Upload Payment Proof Receipt
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D66A4A] font-serif">
              {t.footerContact}
            </h4>
            <div className="space-y-2.5 text-xs">
              <a href="tel:+251921741429" className="flex items-center space-x-2 text-[#E9E3DA] hover:text-white transition font-bold text-sm min-h-[44px]">
                <Phone className="w-4 h-4 text-[#D66A4A] shrink-0" />
                <span>+251 92 174 1429</span>
              </a>

              <a href="https://wa.me/251921741429" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-[#E9E3DA] hover:text-[#25D366] transition min-h-[36px]">
                <MessageCircle className="w-4 h-4 text-[#D66A4A] shrink-0" />
                <span>WhatsApp: +251 92 174 1429</span>
              </a>

              <a href="https://t.me/FraolAberaTravel" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-[#E9E3DA] hover:text-[#0088cc] transition min-h-[36px]">
                <Send className="w-4 h-4 text-[#D66A4A] shrink-0" />
                <span>Telegram: @FraolAberaTravel</span>
              </a>

              <a href="mailto:info@fraolabera-travel.com" className="flex items-center space-x-2 text-[#E9E3DA] hover:text-white transition min-h-[36px]">
                <Mail className="w-4 h-4 text-[#D66A4A] shrink-0" />
                <span>info@fraolabera-travel.com</span>
              </a>

              <div className="pt-2 text-[10px] text-[#E9E3DA]/50 italic">
                Official License # ETH-TRV-2025-AK
              </div>
            </div>
          </div>

          {/* Col 4: Payments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D66A4A] font-serif">
              {t.footerPayments}
            </h4>
            <div className="p-4 bg-white/5 border border-[#E9E3DA]/10 rounded-[4px] space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-[#F7F3EC] font-bold">
                <span>Telebirr Transfer</span>
                <span className="text-[#D66A4A] font-mono">+251 92 174 1429</span>
              </div>
              <div className="flex items-center justify-between text-[#F7F3EC] font-bold">
                <span>CBE Account</span>
                <span className="text-[#AEB69A] font-mono">1000 4567 8901 2</span>
              </div>
              <p className="text-[10px] text-[#E9E3DA]/60 pt-1">
                After paying, click "Upload Receipt" above to submit your transaction slip screenshot.
              </p>
            </div>
          </div>

        </div>

        {/* Google Map Location */}
        <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden border border-[#E9E3DA]/10 shadow-lg bg-white/5 group">
          <iframe
            src="https://maps.google.com/maps?q=Fraool+Abera,+Addis+Ababa&hl=en&z=15&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Fraol Abera Travel Agency Location Map"
            className="absolute inset-0 grayscale-[0.2] contrast-125 hover:grayscale-0 transition duration-500"
          ></iframe>
          
          {/* Overlay Link */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <a 
              href="https://maps.app.goo.gl/PojZNEYFEM7yeocP6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 py-3 bg-[#D66A4A] text-white font-bold uppercase tracking-widest text-xs rounded-full shadow-2xl flex items-center space-x-2 hover:scale-105 transform"
            >
              <MapPin className="w-4 h-4" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#E9E3DA]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E9E3DA]/50">
          <p>© {new Date().getFullYear()} {t.footerCopyright}</p>
          <div className="flex items-center space-x-4">
            <button onClick={onOpenTrackModal} className="hover:text-white transition uppercase text-[10px] tracking-wider min-h-[36px]">
              Track Ticket
            </button>
            <button onClick={onOpenReceiptModal} className="hover:text-white transition uppercase text-[10px] tracking-wider min-h-[36px]">
              Payment Upload
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
