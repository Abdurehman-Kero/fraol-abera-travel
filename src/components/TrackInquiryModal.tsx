import React, { useState, useEffect } from 'react';
import { InquiryTicket } from '../types';
import { 
  X, Search, AlertCircle, Send, PhoneCall
} from 'lucide-react';
import { Language, translations } from '../data/translations';

interface TrackInquiryModalProps {
  initialSearchQuery?: string;
  onClose: () => void;
  onOpenReceiptModal: () => void;
  currentLang?: Language;
}

export const TrackInquiryModal: React.FC<TrackInquiryModalProps> = ({
  initialSearchQuery = '',
  onClose,
  onOpenReceiptModal,
  currentLang = 'en'
}) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [loading, setLoading] = useState(false);
  const [inquiry, setInquiry] = useState<InquiryTicket | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (queryToSearch: string) => {
    if (!queryToSearch.trim()) return;
    setLoading(true);
    setErrorMsg('');
    setInquiry(null);

    try {
      const res = await fetch(`/api/inquiries/${encodeURIComponent(queryToSearch.trim())}`);
      const data = await res.json();

      if (data.success && data.inquiry) {
        setInquiry(data.inquiry);
      } else {
        setErrorMsg(data.message || 'No inquiry record found for this ticket ID or phone number.');
      }
    } catch (err: any) {
      setErrorMsg('Error fetching ticket status. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialSearchQuery) {
      handleSearch(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-3 py-1 rounded-sm bg-[#1C1917]/5 text-[#1C1917] border border-[#1C1917]/10 text-[9px] font-bold uppercase tracking-widest">New Ticket</span>;
      case 'in_review':
        return <span className="px-3 py-1 rounded-sm bg-[#C97B4B]/10 text-[#C97B4B] border border-[#C97B4B]/20 text-[9px] font-bold uppercase tracking-widest">Under Review</span>;
      case 'quote_sent':
        return <span className="px-3 py-1 rounded-sm bg-[#4A5D23]/10 text-[#4A5D23] border border-[#4A5D23]/20 text-[9px] font-bold uppercase tracking-widest">Quote Prepared</span>;
      case 'receipt_pending':
        return <span className="px-3 py-1 rounded-sm bg-[#C97B4B]/10 text-[#C97B4B] border border-[#C97B4B]/20 text-[9px] font-bold uppercase tracking-widest">Receipt Pending</span>;
      case 'confirmed':
        return <span className="px-3 py-1 rounded-sm bg-[#4A5D23] text-white border border-[#4A5D23] text-[9px] font-bold uppercase tracking-widest">Confirmed</span>;
      case 'completed':
        return <span className="px-3 py-1 rounded-sm bg-[#1C1917] text-[#F5F1EA] border border-[#1C1917] text-[9px] font-bold uppercase tracking-widest">Completed</span>;
      default:
        return <span className="px-3 py-1 rounded-sm bg-[#1C1917]/5 text-[#1C1917] border border-[#1C1917]/10 text-[9px] font-bold uppercase tracking-widest">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1917]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#F5F1EA] border border-[#1C1917]/10 rounded-sm max-w-2xl w-full p-6 sm:p-10 text-[#1C1917] shadow-2xl relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#1C1917]/50 hover:text-[#1C1917] hover:bg-[#1C1917]/5 rounded-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-8">
          <div>
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#1C1917] mb-2 flex items-center gap-3">
              <Search className="w-7 h-7 text-[#C97B4B]" />
              <span>{t.trackModalTitle}</span>
            </h2>
            <p className="text-sm text-[#6B6560] font-light">
              {t.trackModalSubtitle}
            </p>
          </div>

          {/* Search Bar */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery); }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.trackModalPlaceholder}
              className="flex-1 px-4 py-3 bg-white border border-[#1C1917]/10 rounded-sm text-sm text-[#1C1917] placeholder-[#6B6560]/60 focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all font-mono"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-sm bg-[#1C1917] hover:bg-black text-[#F5F1EA] text-[10px] font-bold uppercase tracking-widest transition flex items-center justify-center min-w-[140px]"
            >
              {loading ? t.trackModalSearching : t.trackModalSearch}
            </button>
          </form>

          {/* Professional Error State */}
          {errorMsg && (() => {
            const isNetwork = errorMsg.toLowerCase().includes('connection') || errorMsg.toLowerCase().includes('network') || errorMsg.toLowerCase().includes('fetch');
            return (
              <div className="bg-white border border-[#1C1917]/10 rounded-sm overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className={`p-5 flex items-start gap-4 border-b border-[#1C1917]/10 ${isNetwork ? 'bg-[#C97B4B]/5' : 'bg-transparent'}`}>
                  <div className="shrink-0 mt-0.5">
                    <AlertCircle className={`w-5 h-5 ${isNetwork ? 'text-[#C97B4B]' : 'text-[#1C1917]/60'}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1C1917] mb-1">
                      {isNetwork ? 'Connection Issue' : 'Ticket Not Found'}
                    </h3>
                    <p className="text-xs text-[#6B6560] leading-relaxed">
                      {isNetwork
                        ? 'We could not connect to our booking system. Please check your internet connection and try again.'
                        : 'We couldn\'t find an inquiry matching your reference. Please double-check the Ticket ID or phone number you entered.'}
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-transparent space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">
                    Need immediate assistance?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <a href="tel:+251921741429" className="flex items-center justify-center gap-2 py-3 bg-white border border-[#1C1917]/10 hover:border-[#C97B4B] rounded-sm text-[#1C1917] text-[10px] font-bold uppercase tracking-wider transition">
                      <PhoneCall className="w-3.5 h-3.5" /> Call Us
                    </a>
                    <a href="https://wa.me/251921741429" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 bg-white border border-[#1C1917]/10 hover:border-[#25D366] rounded-sm text-[#1C1917] text-[10px] font-bold uppercase tracking-wider transition">
                      <Send className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                    <a href="https://t.me/FraolAberaTravel" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 bg-white border border-[#1C1917]/10 hover:border-[#0088cc] rounded-sm text-[#1C1917] text-[10px] font-bold uppercase tracking-wider transition">
                      <Send className="w-3.5 h-3.5" /> Telegram
                    </a>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Inquiry Record Display */}
          {inquiry && (
            <div className="bg-white border border-[#1C1917]/10 rounded-sm p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1C1917]/10 pb-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#6B6560] mb-1">Ticket ID</p>
                  <p className="font-mono text-xl text-[#C97B4B]">{inquiry.id}</p>
                </div>
                <div>{getStatusBadge(inquiry.status)}</div>
              </div>

              {/* Grid Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#6B6560] mb-1">Customer</p>
                  <p className="text-sm font-semibold text-[#1C1917] truncate">{inquiry.customerName}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#6B6560] mb-1">Service</p>
                  <p className="text-sm font-semibold text-[#1C1917]">{inquiry.serviceType.replace('_', ' ').toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#6B6560] mb-1">Route</p>
                  <p className="text-sm font-semibold text-[#1C1917] truncate">{inquiry.destinationCity}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#6B6560] mb-1">Travelers</p>
                  <p className="text-sm text-[#1C1917]">{inquiry.travelers?.adults || 1} Adult(s)</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#6B6560] mb-1">Phone</p>
                  <p className="font-mono text-sm text-[#1C1917] truncate">{inquiry.phone}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#6B6560] mb-1">Agent</p>
                  <p className="text-sm font-semibold text-[#4A5D23]">{inquiry.assignedAgent || 'Unassigned'}</p>
                </div>
              </div>

              {/* Quote Amount if available */}
              {inquiry.quotedAmount && (
                <div className="bg-[#F5F1EA] border border-[#C97B4B]/30 rounded-sm p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#C97B4B] font-bold mb-1">Official Quote Prepared</p>
                    <p className="text-2xl font-light font-['Cormorant_Garamond'] text-[#C97B4B]">
                      {inquiry.quotedAmount.toLocaleString()} <span className="text-sm font-semibold text-[#1C1917]">{inquiry.quotedCurrency || 'ETB'}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => { onClose(); onOpenReceiptModal(); }}
                    className="px-6 py-3 rounded-sm bg-[#C97B4B] hover:bg-[#B8693A] text-white text-[10px] font-bold uppercase tracking-widest transition w-full sm:w-auto"
                  >
                    Upload Receipt
                  </button>
                </div>
              )}

              {/* Admin Notes */}
              {inquiry.adminNotes && (
                <div className="bg-[#1C1917]/5 rounded-sm p-4 mt-4">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#1C1917]/60 font-bold mb-2">Agent Notes</p>
                  <p className="text-sm text-[#1C1917] font-light italic leading-relaxed">{inquiry.adminNotes}</p>
                </div>
              )}

              {/* Payment Receipts History */}
              {inquiry.receipts && inquiry.receipts.length > 0 && (
                <div className="pt-6 mt-4 border-t border-[#1C1917]/10">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#1C1917]/60 font-bold mb-3">Submitted Documents</p>
                  <div className="space-y-2">
                    {inquiry.receipts.map((rc, i) => (
                      <div key={i} className="px-4 py-3 bg-white border border-[#1C1917]/10 rounded-sm flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-[#1C1917]">{rc.bankName}</p>
                          <p className="font-mono text-[10px] text-[#6B6560]">{rc.transactionRef}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-sm text-[9px] font-bold uppercase tracking-widest ${rc.status === 'verified' ? 'bg-[#4A5D23]/10 text-[#4A5D23]' : 'bg-[#C97B4B]/10 text-[#C97B4B]'}`}>
                          {rc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Agent */}
              <div className="pt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://t.me/FraolAberaTravel?text=${encodeURIComponent(`Hello, I'm inquiring about Ticket ID ${inquiry.id}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-white border border-[#1C1917]/10 hover:border-[#1C1917]/40 rounded-sm text-[#1C1917] text-[10px] font-bold uppercase tracking-widest transition flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Telegram Agent
                </a>
                <a
                  href="tel:+251921741429"
                  className="flex-1 py-3 bg-white border border-[#1C1917]/10 hover:border-[#1C1917]/40 rounded-sm text-[#1C1917] text-[10px] font-bold uppercase tracking-widest transition flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Call Agent
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
