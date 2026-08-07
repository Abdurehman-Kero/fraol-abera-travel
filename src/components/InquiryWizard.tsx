import React, { useState } from 'react';
import { ServiceType, TravelPackage } from '../types';
import { 
  X, Compass, Plane, Hotel, Users, User, Phone, Mail, Upload, CheckCircle2, ArrowRight, ArrowLeft, Send, AlertCircle
} from 'lucide-react';

interface InquiryWizardProps {
  initialService?: ServiceType | string;
  prefilledPackage?: TravelPackage | null;
  onClose: () => void;
  onSuccessTicket: (ticketId: string) => void;
}

export const InquiryWizard: React.FC<InquiryWizardProps> = ({
  initialService,
  prefilledPackage,
  onClose,
  onSuccessTicket
}) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Form State
  const [serviceType, setServiceType] = useState<ServiceType>(
    (initialService as ServiceType) || (prefilledPackage ? (prefilledPackage.category === 'domestic' ? 'domestic_tour' : 'outbound_package') : 'domestic_tour')
  );

  const [departureCity, setDepartureCity] = useState<string>('Addis Ababa (ADD)');
  const [destinationCity, setDestinationCity] = useState<string>(prefilledPackage ? prefilledPackage.title : '');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');

  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);

  const [preferredAirline] = useState<string>('Ethiopian Airlines');
  const [hotelClass] = useState<string>('4-Star');
  const [budgetCurrency, setBudgetCurrency] = useState<'ETB' | 'USD'>('ETB');
  const [budgetAmount, setBudgetAmount] = useState<string>(prefilledPackage ? String(prefilledPackage.priceETB) : '');

  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('+251 ');
  const [email, setEmail] = useState<string>('');
  const [passportOrIdNumber, setPassportOrIdNumber] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // File attachments state
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; url: string; type: string }[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fakeUrl = URL.createObjectURL(file);
      setAttachedFiles(prev => [...prev, {
        name: file.name,
        url: fakeUrl,
        type: file.type || 'document'
      }]);
    }
  };

  const handleNext = () => {
    setErrorMsg('');
    if (step === 1 && !serviceType) {
      setErrorMsg('Please select a service category to proceed.');
      return;
    }
    if (step === 2 && !destinationCity) {
      setErrorMsg('Please specify your target destination or route.');
      return;
    }
    if (step === 3) {
      if (!customerName.trim()) {
        setErrorMsg('Full name is required.');
        return;
      }
      if (!phone.trim() || phone.trim().length < 8) {
        setErrorMsg('Valid phone number is required.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleSubmitInquiry = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        serviceType, customerName, phone, email, passportOrIdNumber,
        travelers: { adults, children, infants },
        departureCity, destinationCity, departureDate, returnDate,
        preferredAirline, hotelClass, budgetCurrency,
        budgetAmount: budgetAmount ? Number(budgetAmount) : undefined,
        notes: prefilledPackage ? `[Selected Package: ${prefilledPackage.title}] ${notes}` : notes,
        documents: attachedFiles.map(f => ({ name: f.name, url: f.url, uploadedAt: new Date().toISOString(), type: f.type }))
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setStep(5);
        onSuccessTicket(data.ticketId);
      } else {
        setErrorMsg(data.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg('Server connection error. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  const servicesList = [
    { id: 'domestic_tour', icon: <Compass className="w-5 h-5" />, title: 'Historic & Cultural Heritage', desc: 'Lalibela, Harar, Gondar' },
    { id: 'domestic_flight', icon: <Plane className="w-5 h-5" />, title: 'Domestic Flights', desc: 'Ethiopian Airlines booking' },
    { id: 'safari_expedition', icon: <Compass className="w-5 h-5" />, title: '4x4 Safari & Wilderness', desc: 'Bale Mountains, Danakil' },
    { id: 'cultural_expedition', icon: <Compass className="w-5 h-5" />, title: 'Simien Highlands', desc: 'Endemic wildlife tours' },
    { id: 'hotel_booking', icon: <Hotel className="w-5 h-5" />, title: 'Resorts & Lodges', desc: 'Eco-lodges and heritage stays' },
    { id: 'outbound_package', icon: <Users className="w-5 h-5" />, title: 'Group Expeditions', desc: 'Custom fleets & logistics' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1917]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#F5F1EA] rounded-sm max-w-2xl w-full p-6 sm:p-10 text-[#1C1917] shadow-2xl relative my-auto border border-[#1C1917]/5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#1C1917]/50 hover:text-[#1C1917] hover:bg-[#1C1917]/5 rounded-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress indicator */}
        {step < 5 && (
          <div className="mb-10">
            <p className="text-[#C97B4B] text-[10px] font-semibold uppercase tracking-[0.35em] mb-2">
              Step {step} of 4
            </p>
            <div className="w-full bg-[#1C1917]/10 h-0.5 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-[#C97B4B] transition-all duration-500 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-[#C97B4B]/10 border-l-2 border-[#C97B4B] text-[#1C1917] text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#C97B4B] shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* STEP 1: Select Service */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#1C1917] mb-2">Select Service</h2>
              <p className="text-[#6B6560] text-sm font-light">Choose the travel assistance you need from Fraol Abera Travel Agency.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {servicesList.map(s => (
                <button
                  key={s.id}
                  onClick={() => setServiceType(s.id as ServiceType)}
                  className={`flex flex-col items-start text-left p-4 rounded-sm border transition-all duration-300 ${
                    serviceType === s.id 
                      ? 'border-[#C97B4B] bg-white shadow-sm ring-1 ring-[#C97B4B]/10' 
                      : 'border-[#1C1917]/10 bg-transparent hover:bg-white/50 hover:border-[#1C1917]/30'
                  }`}
                >
                  <div className={`mb-3 ${serviceType === s.id ? 'text-[#C97B4B]' : 'text-[#1C1917]/50'}`}>
                    {s.icon}
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] font-semibold text-lg text-[#1C1917] mb-1">{s.title}</h3>
                  <p className="text-[#6B6560] text-xs font-light">{s.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C97B4B] text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#B8693A] transition-colors rounded-sm"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Travel Details */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#1C1917] mb-2">Travel Details</h2>
              <p className="text-[#6B6560] text-sm font-light">Specify your route, dates, and group size.</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">Departure / Origin</label>
                  <input
                    type="text"
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full bg-white border border-[#1C1917]/10 rounded-sm px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">Destination *</label>
                  <input
                    type="text"
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                    placeholder="e.g. Lalibela / Harar"
                    className="w-full bg-white border border-[#1C1917]/10 rounded-sm px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">Departure Date</label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-white border border-[#1C1917]/10 rounded-sm px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">Return Date</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-white border border-[#1C1917]/10 rounded-sm px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all"
                  />
                </div>
              </div>

              <div className="border-t border-[#1C1917]/10 pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60 mb-4">Travelers</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Adults (12+)', val: adults, set: setAdults },
                    { label: 'Children (2-11)', val: children, set: setChildren },
                    { label: 'Infants (<2)', val: infants, set: setInfants }
                  ].map(p => (
                    <div key={p.label} className="bg-white border border-[#1C1917]/10 rounded-sm p-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-[#1C1917]">{p.label}</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => p.set(Math.max(0, p.val - 1))} className="w-6 h-6 flex items-center justify-center text-[#1C1917]/50 hover:text-[#C97B4B] bg-[#F5F1EA] rounded-sm">-</button>
                        <span className="text-sm font-semibold w-4 text-center">{p.val}</span>
                        <button onClick={() => p.set(p.val + 1)} className="w-6 h-6 flex items-center justify-center text-[#1C1917]/50 hover:text-[#C97B4B] bg-[#F5F1EA] rounded-sm">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#1C1917]/10 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">Currency</label>
                    <select
                      value={budgetCurrency}
                      onChange={(e) => setBudgetCurrency(e.target.value as any)}
                      className="w-full bg-white border border-[#1C1917]/10 rounded-sm px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all"
                    >
                      <option value="ETB">ETB (Birr)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">Target Budget</label>
                    <input
                      type="number"
                      value={budgetAmount}
                      onChange={(e) => setBudgetAmount(e.target.value)}
                      placeholder="e.g. 35000"
                      className="w-full bg-white border border-[#1C1917]/10 rounded-sm px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1C1917]/60 hover:text-[#C97B4B] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C97B4B] text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#B8693A] transition-colors rounded-sm"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Contact */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#1C1917] mb-2">Passenger Details</h2>
              <p className="text-[#6B6560] text-sm font-light">Lead passenger contact information.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C1917]/40" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Lead Passenger Name"
                    className="w-full bg-white border border-[#1C1917]/10 rounded-sm pl-11 pr-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C1917]/40" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+251 911..."
                      className="w-full bg-white border border-[#1C1917]/10 rounded-sm pl-11 pr-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C1917]/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white border border-[#1C1917]/10 rounded-sm pl-11 pr-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">Passport / ID Number (Optional)</label>
                <input
                  type="text"
                  value={passportOrIdNumber}
                  onChange={(e) => setPassportOrIdNumber(e.target.value)}
                  placeholder="Required for flight bookings"
                  className="w-full bg-white border border-[#1C1917]/10 rounded-sm px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1C1917]/60 hover:text-[#C97B4B] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C97B4B] text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#B8693A] transition-colors rounded-sm"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Documents & Submit */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#1C1917] mb-2">Final Review</h2>
              <p className="text-[#6B6560] text-sm font-light">Add special requests or attach passports.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">Special Requests / Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Any dietary requirements, hotel preferences, etc."
                  className="w-full bg-white border border-[#1C1917]/10 rounded-sm px-4 py-3 text-sm text-[#1C1917] focus:outline-none focus:border-[#C97B4B] focus:ring-1 focus:ring-[#C97B4B]/20 transition-all resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60">Attachments</label>
                <div className="border-2 border-dashed border-[#1C1917]/20 rounded-sm p-6 text-center hover:border-[#C97B4B]/50 transition-colors bg-white relative">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-6 h-6 text-[#1C1917]/40 mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#1C1917]">Click to upload documents</p>
                  <p className="text-xs text-[#6B6560] mt-1">Passports, IDs, or previous tickets (Max 5MB)</p>
                </div>
                
                {attachedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {attachedFiles.map((file, i) => (
                      <div key={i} className="flex items-center justify-between bg-white border border-[#1C1917]/10 px-4 py-2 rounded-sm">
                        <span className="text-xs text-[#1C1917] truncate font-medium">{file.name}</span>
                        <button
                          onClick={() => setAttachedFiles(files => files.filter((_, idx) => idx !== i))}
                          className="text-[#D66A4A] hover:text-red-700 p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1C1917]/60 hover:text-[#C97B4B] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleSubmitInquiry}
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C97B4B] text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#B8693A] transition-colors rounded-sm disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Inquiry'} <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Success */}
        {step === 5 && (
          <div className="text-center py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-16 h-16 bg-[#C97B4B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#C97B4B]" />
            </div>
            
            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#1C1917] mb-4">Inquiry Received</h2>
            <p className="text-[#6B6560] text-sm leading-relaxed max-w-sm mx-auto mb-8">
              Your travel request has been securely submitted to our local team in Addis Ababa. We will contact you shortly with custom itineraries and pricing.
            </p>
            
            <div className="bg-white border border-[#1C1917]/10 p-6 rounded-sm mb-10 max-w-sm mx-auto shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1C1917]/60 mb-2">Tracking ID</p>
              <p className="font-mono text-2xl tracking-wider text-[#C97B4B]">{generatedTicketId}</p>
              <p className="text-xs text-[#6B6560] mt-3 italic">Save this ID to track your inquiry status.</p>
            </div>

            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1C1917] text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-colors rounded-sm"
            >
              Return Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
