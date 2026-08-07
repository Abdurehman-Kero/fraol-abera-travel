import React, { useState } from 'react';
import { ETHIOPIAN_BANK_ACCOUNTS } from '../data/bankDetails';
import { 
  X, 
  Receipt, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Send,
  Copy,
  Check
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
      setErrorMsg('Please enter your Inquiry Ticket Reference # (e.g. FATA-2025-1001).');
      return;
    }
    if (!transactionRef.trim()) {
      setErrorMsg('Please enter the Bank Transaction Reference ID.');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setErrorMsg('Please enter a valid payment amount in ETB.');
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
    <div className="fixed inset-0 z-50 bg-[#262523]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-[#E9E3DA] rounded-[2px] max-w-2xl w-full p-6 sm:p-8 text-[#262523] shadow-2xl relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-[2px] bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] transition border border-[#E9E3DA]"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-[#D66A4A] text-[10px] font-bold uppercase tracking-widest mb-1">
                <Receipt className="w-4 h-4" />
                <span>Payment Verification Workflow</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-[#262523]">
                {t.receiptModalTitle}
              </h2>
              <p className="text-xs text-[#78736B]">
                {t.receiptModalSubtitle}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-[2px] bg-[#D66A4A]/10 border border-[#D66A4A] text-[#D66A4A] text-xs flex items-center space-x-2 font-semibold">
                <AlertCircle className="w-4 h-4 text-[#D66A4A] shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Official Ethiopian Bank Transfer Accounts */}
            <div className="p-4 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] space-y-3">
              <span className="text-[10px] font-bold text-[#D66A4A] uppercase tracking-widest block font-serif">
                Official Agency Bank Accounts (Fraol Abera Travel Agency)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {ETHIOPIAN_BANK_ACCOUNTS.map((acc, i) => (
                  <div key={i} className="p-2.5 rounded-[2px] bg-white border border-[#E9E3DA] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#262523] block">{acc.bankName}</span>
                      <span className="text-[11px] text-[#D66A4A] font-mono font-bold">{acc.accountNumber}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(acc.accountNumber)}
                      className="p-1.5 rounded-[2px] bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] border border-[#E9E3DA] transition"
                      title="Copy Account Number"
                    >
                      {copiedBankAcc === acc.accountNumber ? <Check className="w-3.5 h-3.5 text-[#8A9374]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">
                  Inquiry Ticket Reference # *
                </label>
                <input
                  type="text"
                  value={ticketId}
                  onChange={e => setTicketId(e.target.value)}
                  placeholder="e.g. FATA-2025-1001"
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-sm text-[#262523] focus:outline-none focus:border-[#D66A4A] font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">
                    Bank / Payment Channel *
                  </label>
                  <select
                    value={selectedBank}
                    onChange={e => setSelectedBank(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-xs text-[#262523] focus:outline-none focus:border-[#D66A4A]"
                  >
                    <option value="Telebirr">Telebirr</option>
                    <option value="Commercial Bank of Ethiopia (CBE)">CBE (Commercial Bank)</option>
                    <option value="CBE Birr">CBE Birr</option>
                    <option value="Dashen Bank">Dashen Bank</option>
                    <option value="Bank of Abyssinia">Bank of Abyssinia</option>
                    <option value="Awash Bank">Awash Bank</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">
                    Transaction Ref ID / Slip # *
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={e => setTransactionRef(e.target.value)}
                    placeholder="e.g. TB-98213749"
                    className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-xs text-[#262523] focus:outline-none focus:border-[#D66A4A] font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">
                    Amount Paid (ETB) *
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="e.g. 26000"
                    className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-xs text-[#262523] focus:outline-none focus:border-[#D66A4A] font-mono"
                    required
                  />
                </div>
              </div>

              {/* File Attachment */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">
                  Upload Slip / Screenshot Proof
                </label>
                <div className="p-3 bg-[#F7F3EC] border-2 border-dashed border-[#E9E3DA] hover:border-[#D66A4A] rounded-[2px] text-center space-y-1 transition">
                  <Upload className="w-6 h-6 text-[#8A9374] mx-auto" />
                  <p className="text-xs text-[#262523]">Click to select receipt screenshot or PDF</p>
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="hidden" 
                    id="receipt-file-input"
                  />
                  <label 
                    htmlFor="receipt-file-input" 
                    className="inline-block px-3 py-1 rounded-[2px] bg-white text-[#D66A4A] font-bold uppercase text-[10px] tracking-wider cursor-pointer border border-[#E9E3DA] hover:bg-[#E9E3DA]/40 transition"
                  >
                    Browse Image
                  </label>
                  {fileAttached && (
                    <p className="text-[11px] text-[#8A9374] font-bold mt-1 uppercase tracking-wider">
                      Receipt Screenshot Attached!
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-[2px] bg-[#F7F3EC] text-[#262523] border border-[#E9E3DA] text-xs font-bold uppercase tracking-wider hover:bg-[#E9E3DA] transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-[2px] bg-[#D66A4A] hover:bg-[#C2583A] text-white font-bold text-xs uppercase tracking-widest transition flex items-center space-x-2"
              >
                {loading ? (
                  <span>Submitting Receipt...</span>
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
          <div className="text-center space-y-4 py-6">
            <div className="w-16 h-16 bg-[#AEB69A]/20 border-2 border-[#8A9374] text-[#8A9374] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-[#262523]">
              Payment Receipt Uploaded Successfully!
            </h3>
            <p className="text-xs text-[#78736B] max-w-md mx-auto">
              Your payment transaction reference <strong className="text-[#D66A4A] font-mono">{transactionRef}</strong> for ticket <strong className="text-[#262523] font-mono">{ticketId}</strong> has been routed to our finance verification queue at Akaki Kality, Addis Ababa.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-[2px] bg-[#262523] hover:bg-black text-white text-xs font-bold uppercase tracking-widest transition"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

