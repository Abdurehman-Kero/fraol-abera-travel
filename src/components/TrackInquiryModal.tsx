import React, { useState, useEffect } from 'react';
import { InquiryTicket } from '../types';
import { 
  X, 
  Search, 
  AlertCircle, 
  Send, 
  PhoneCall
} from 'lucide-react';

interface TrackInquiryModalProps {
  initialSearchQuery?: string;
  onClose: () => void;
  onOpenReceiptModal: () => void;
}

export const TrackInquiryModal: React.FC<TrackInquiryModalProps> = ({
  initialSearchQuery = '',
  onClose,
  onOpenReceiptModal
}) => {
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
        return <span className="px-2.5 py-1 rounded-[2px] bg-[#F7F3EC] text-[#262523] border border-[#E9E3DA] text-[10px] font-bold uppercase tracking-wider">New Ticket</span>;
      case 'in_review':
        return <span className="px-2.5 py-1 rounded-[2px] bg-[#D66A4A]/10 text-[#D66A4A] border border-[#D66A4A] text-[10px] font-bold uppercase tracking-wider">Under Review</span>;
      case 'quote_sent':
        return <span className="px-2.5 py-1 rounded-[2px] bg-[#AEB69A]/20 text-[#8A9374] border border-[#8A9374] text-[10px] font-bold uppercase tracking-wider">Quote Prepared</span>;
      case 'receipt_pending':
        return <span className="px-2.5 py-1 rounded-[2px] bg-[#D66A4A]/20 text-[#D66A4A] border border-[#D66A4A] text-[10px] font-bold uppercase tracking-wider">Receipt Verification Pending</span>;
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-[2px] bg-[#8A9374] text-white border border-[#8A9374] text-[10px] font-bold uppercase tracking-wider">Ticket Confirmed</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-[2px] bg-[#262523] text-white border border-[#262523] text-[10px] font-bold uppercase tracking-wider">Completed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-[2px] bg-[#F7F3EC] text-[#262523] text-[10px] font-bold uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#262523]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-[#E9E3DA] rounded-[2px] max-w-2xl w-full p-6 sm:p-8 text-[#262523] shadow-2xl relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-[2px] bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] transition border border-[#E9E3DA]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold font-serif text-[#262523] flex items-center space-x-2">
              <Search className="w-6 h-6 text-[#D66A4A]" />
              <span>Track Inquiry Ticket Status</span>
            </h2>
            <p className="text-xs text-[#78736B]">
              Enter your Ticket Reference # (e.g. FATA-2025-1001) or phone number
            </p>
          </div>

          {/* Search Bar */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery); }}
            className="flex space-x-2"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="FATA-2025-1001 or +251 911..."
              className="flex-1 px-3.5 py-2.5 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-sm text-[#262523] placeholder-[#78736B] focus:outline-none focus:border-[#D66A4A] font-mono"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-[2px] bg-[#D66A4A] hover:bg-[#C2583A] text-white font-bold text-xs uppercase tracking-widest transition flex items-center space-x-1"
            >
              {loading ? <span>Searching...</span> : <span>Search</span>}
            </button>
          </form>

          {/* Error Notice */}
          {errorMsg && (
            <div className="p-3 rounded-[2px] bg-[#D66A4A]/10 border border-[#D66A4A] text-[#D66A4A] text-xs flex items-center space-x-2 font-semibold">
              <AlertCircle className="w-4 h-4 text-[#D66A4A] shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Inquiry Record Display */}
          {inquiry && (
            <div className="bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] p-5 space-y-4 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E9E3DA] pb-3">
                <div>
                  <span className="text-[10px] uppercase text-[#78736B] block font-mono">Ticket ID</span>
                  <span className="text-lg font-bold font-mono text-[#D66A4A]">{inquiry.id}</span>
                </div>
                <div>{getStatusBadge(inquiry.status)}</div>
              </div>

              {/* Grid Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[#262523]">
                <div>
                  <strong className="text-[#78736B] text-[10px] uppercase block">Customer</strong>
                  <span className="font-semibold text-[#262523]">{inquiry.customerName}</span>
                </div>
                <div>
                  <strong className="text-[#78736B] text-[10px] uppercase block">Service</strong>
                  <span className="font-semibold text-[#D66A4A]">{inquiry.serviceType.replace('_', ' ').toUpperCase()}</span>
                </div>
                <div>
                  <strong className="text-[#78736B] text-[10px] uppercase block">Route/Destination</strong>
                  <span className="font-semibold text-[#262523]">{inquiry.departureCity} → {inquiry.destinationCity}</span>
                </div>
                <div>
                  <strong className="text-[#78736B] text-[10px] uppercase block">Travelers</strong>
                  <span>{inquiry.travelers?.adults || 1} Adult(s), {inquiry.travelers?.children || 0} Child(ren)</span>
                </div>
                <div>
                  <strong className="text-[#78736B] text-[10px] uppercase block">Phone</strong>
                  <span className="font-mono text-[#262523]">{inquiry.phone}</span>
                </div>
                <div>
                  <strong className="text-[#78736B] text-[10px] uppercase block">Assigned Agent</strong>
                  <span className="text-[#8A9374] font-semibold">{inquiry.assignedAgent || 'Operations Desk'}</span>
                </div>
              </div>

              {/* Quote Amount if available */}
              {inquiry.quotedAmount && (
                <div className="p-3 bg-white border border-[#D66A4A]/30 rounded-[2px] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-[#D66A4A] font-bold block font-serif">Official Quote Prepared</span>
                    <span className="text-lg font-bold text-[#D66A4A] font-mono">
                      {inquiry.quotedAmount.toLocaleString()} {inquiry.quotedCurrency || 'ETB'}
                    </span>
                  </div>
                  <button
                    onClick={() => { onClose(); onOpenReceiptModal(); }}
                    className="px-3 py-1.5 rounded-[2px] bg-[#8A9374] hover:bg-[#788062] text-white font-bold text-xs uppercase tracking-wider transition"
                  >
                    Upload Deposit Slip
                  </button>
                </div>
              )}

              {/* Admin Notes */}
              {inquiry.adminNotes && (
                <div className="p-3 bg-white border border-[#E9E3DA] rounded-[2px] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#78736B] block">Agent Update Notes:</span>
                  <p className="text-[#262523] italic font-light">{inquiry.adminNotes}</p>
                </div>
              )}

              {/* Payment Receipts History */}
              {inquiry.receipts && inquiry.receipts.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#E9E3DA]">
                  <span className="font-bold text-[#8A9374] text-[10px] uppercase tracking-wider block">Submitted Payment Proofs:</span>
                  {inquiry.receipts.map((rc, i) => (
                    <div key={i} className="p-2 bg-white rounded-[2px] border border-[#E9E3DA] flex items-center justify-between text-[11px]">
                      <div>
                        <span className="font-bold text-[#262523]">{rc.bankName}</span> — <span className="font-mono text-[#D66A4A]">{rc.transactionRef}</span> ({rc.amount.toLocaleString()} ETB)
                      </div>
                      <span className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-wider ${rc.status === 'verified' ? 'bg-[#AEB69A]/30 text-[#8A9374]' : 'bg-[#D66A4A]/20 text-[#D66A4A]'}`}>
                        {rc.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions Row */}
              <div className="pt-3 flex flex-wrap gap-2">
                <a
                  href={`https://t.me/FraolAberaTravel?text=${encodeURIComponent(`Hello, my Inquiry Ticket ID is ${inquiry.id}. Checking status update.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-[2px] bg-[#262523] hover:bg-black text-white font-bold text-center transition flex items-center justify-center space-x-1 text-xs uppercase tracking-wider"
                >
                  <Send className="w-3.5 h-3.5 text-[#D66A4A]" />
                  <span>Telegram Agent</span>
                </a>
                <a
                  href="tel:+251921741429"
                  className="px-4 py-2.5 rounded-[4px] bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] border border-[#E9E3DA] font-bold text-center transition flex items-center justify-center space-x-1 text-xs uppercase tracking-wider min-h-[44px]"
                >
                  <PhoneCall className="w-4 h-4 text-[#D66A4A]" />
                  <span>Call Fraol (+251 92 174 1429)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

