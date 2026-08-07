import React, { useState } from 'react';
import { ETHIOPIAN_BANK_ACCOUNTS } from '../data/bankDetails';
import { 
  X, Receipt, Upload, CheckCircle2, AlertCircle, Send, Copy, Check
} from 'lucide-react';
import { Language, translations } from '../data/translations';

interface ReceiptUploadModalProps {
  onClose: () => void;
  onSuccess: () => void;
  currentLang?: Language;
}

export const ReceiptUploadModal: React.FC<ReceiptUploadModalProps> = ({ onClose, onSuccess, currentLang = 'en' }) => {
  const t = translations[currentLang];
  const [ticketId, setTicketId] = useState('');
  const [selectedBank, setSelectedBank] = useState('Telebirr');
  const [transactionRef, setTransactionRef] = useState('');
  const [amount, setAmount] = useState('');
  const [fileAttached, setFileAttached] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedBankAcc, setCopiedBankAcc] = useState<string | null>(null);

  const handleCopy = (accNum: string) => {
    navigator.clipboard.writeText(accNum);
    setCopiedBankAcc(accNum);
    setTimeout(() => setCopiedBankAcc(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFileAttached(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!ticketId.trim()) {
      setErrorMsg('Please enter your Ticket ID (e.g. FATA-2025-1001).');
      return;
    }
    if (!transactionRef.trim()) {
      setErrorMsg('Please enter the Transaction Reference ID.');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setErrorMsg('Please enter a valid payment amount.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/inquiries/${encodeURIComponent(ticketId.trim())}/receipt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionRef: transactionRef.trim(),
          bankName: selectedBank,
          amount: Number(amount),
          fileUrl: fileAttached || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400'
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        onSuccess();
      } else {
        setErrorMsg(data.message || 'Ticket reference not found. Please check your ticket ID.');
      }
    } catch (err: any) {
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setLoading(false);
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

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
              <div className="flex items-center gap-2 text-[#C97B4B] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                <Receipt className="w-4 h-4" />
                <span>Payment Verification</span>
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#1C1917] mb-2">
                {t.receiptModalTitle}
              </h2>
              <p className="text-sm text-[#6B6560] font-light">
                {t.receiptModalSubtitle}
              </p>
            </div>

            {errorMsg && (
              <div className="p-4 bg-[#C97B4B]/10 border-l-2 border-[#C97B4B] text-[#1C1917] text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#C97B4B] shrink-0 mt-0.5" />
                <p>{errorMsg}</p>
              </div>
            )}

            {/* Official Ethiopian Bank Transfer Accounts */}
            <div className="p-5 bg-white border border-[#1C1917]/10 rounded-sm space-y-4">
              <span className="text-[10px] font-bold text-[#C97B4B] uppercase tracking-[0.2em] block">
                Official Agency Bank Accounts
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {ETHIOPIAN_BANK_ACCOUNTS.map((acc, i) => (
                  <div key={i} className="p-3 rounded-sm bg-[#F5F1EA] border border-[#1C1917]/10 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#1C1917] block mb-0.5">{acc.bankName}</span>
                      <span className="text-[11px] text-[#C97B4B] font-mono font-bold tracking-widest">{acc.accountNumber}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(acc.accountNumber)}
                      className="p-2 rounded-sm bg-white hover:bg-[#1C1917]/5 text-[#1C1917] border border-[#1C1917]/10 transition"
                      title="Copy Account Number"
                    >
                      {copiedBankAcc === acc.accountNumber ? <Check className="w-3.5 h-3.5 text-[#4A5D23]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Inputs */}
            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">
                  Ticket ID *
                </label>
                <input
                  type="text"
                  value={ticketId}
                  onChange={e => setTicketId(e.target.value)}
                  placeholder="e.g. FATA-2025-1001"
                  className="w-full bg-white border border-[#1C1917]/10 rounded-sm px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">
                    Bank *
                  </label>
                  <select
                    value={selectedBank}
                    onChange={e => setSelectedBank(e.target.value)}
                    className="w-full bg-white border border-[#1C1917]/10 rounded-sm px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all"
                  >
                    <option value="Telebirr">Telebirr</option>
                    <option value="Commercial Bank of Ethiopia (CBE)">CBE</option>
                    <option value="CBE Birr">CBE Birr</option>
                    <option value="Dashen Bank">Dashen Bank</option>
                    <option value="Bank of Abyssinia">Abyssinia</option>
                    <option value="Awash Bank">Awash</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">
                    Ref ID / Slip # *
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={e => setTransactionRef(e.target.value)}
                    placeholder="e.g. TB-98213"
                    className="w-full bg-white border border-[#1C1917]/10 rounded-sm px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all font-mono"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">
                    Amount (ETB) *
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="e.g. 26000"
                    className="w-full bg-white border border-[#1C1917]/10 rounded-sm px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all font-mono"
                    required
                  />
                </div>
              </div>

              {/* File Attachment */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">
                  Upload Screenshot / Receipt
                </label>
                <div className="border-2 border-dashed border-[#1C1917]/20 rounded-sm p-6 text-center hover:border-[#C97B4B]/50 transition-colors bg-white relative">
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  <Upload className="w-6 h-6 text-[#1C1917]/40 mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#1C1917]">Click to select receipt</p>
                  {fileAttached && (
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#4A5D23] mt-2">
                      Document Attached
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-sm bg-transparent text-[#1C1917] border border-[#1C1917]/10 hover:bg-white text-[10px] font-bold uppercase tracking-widest transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-sm bg-[#C97B4B] hover:bg-[#B8693A] text-white font-bold text-[10px] uppercase tracking-[0.2em] transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>{t.receiptModalUploadBtn}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-16 h-16 bg-[#4A5D23]/10 text-[#4A5D23] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#1C1917] mb-4">
              Receipt Uploaded
            </h3>
            <p className="text-[#6B6560] text-sm leading-relaxed max-w-sm mx-auto mb-8">
              Your payment reference <strong className="text-[#C97B4B] font-mono">{transactionRef}</strong> for ticket <strong className="text-[#1C1917] font-mono">{ticketId}</strong> is under review. Our finance team will verify it shortly.
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1C1917] text-[#F5F1EA] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-colors rounded-sm"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
