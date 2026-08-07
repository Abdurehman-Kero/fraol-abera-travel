import React, { useState } from 'react';
import { ServiceType, TravelPackage } from '../types';
import { 
  X, 
  Compass, 
  Plane, 
  Globe, 
  Hotel, 
  Users, 
  User, 
  Phone, 
  Mail, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  PhoneCall, 
  FileText,
  AlertCircle
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

  // Generated Result Ticket State
  const [generatedTicketId, setGeneratedTicketId] = useState<string>('');

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
    if (step === 2) {
      if (!destinationCity) {
        setErrorMsg('Please specify your target destination or route.');
        return;
      }
    }
    if (step === 3) {
      if (!customerName.trim()) {
        setErrorMsg('Full name is required.');
        return;
      }
      if (!phone.trim() || phone.trim().length < 8) {
        setErrorMsg('Valid Ethiopian or International phone number is required.');
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
        serviceType,
        customerName,
        phone,
        email,
        passportOrIdNumber,
        travelers: { adults, children, infants },
        departureCity,
        destinationCity,
        departureDate,
        returnDate,
        preferredAirline,
        hotelClass,
        budgetCurrency,
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
        setGeneratedTicketId(data.ticketId);
        setStep(5); // Success step
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

  return (
    <div className="fixed inset-0 z-50 bg-[#262523]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-[#E9E3DA] rounded-[2px] max-w-2xl w-full p-6 sm:p-8 text-[#262523] shadow-2xl relative my-auto">
        {/* Close Header */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-[2px] bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] transition border border-[#E9E3DA]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Progress Bar */}
        {step < 5 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-[#78736B] mb-2 font-mono">
              <span className="uppercase text-[10px] tracking-wider font-bold">Step {step} of 4</span>
              <span className="text-[#D66A4A] font-bold font-serif">
                {step === 1 && '1. Select Service'}
                {step === 2 && '2. Travel Details'}
                {step === 3 && '3. Traveler Contact'}
                {step === 4 && '4. Documents & Submit'}
              </span>
            </div>
            <div className="w-full bg-[#F7F3EC] h-1.5 rounded-[2px] overflow-hidden border border-[#E9E3DA]">
              <div 
                className="bg-[#D66A4A] h-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-[2px] bg-[#D66A4A]/10 border border-[#D66A4A] text-[#D66A4A] text-xs flex items-center space-x-2 font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#D66A4A]" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Select Service */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#262523] tracking-tight">
                Select Service Category
              </h2>
              <p className="text-xs sm:text-sm text-[#78736B] font-sans mt-1.5 max-w-lg">
                Choose the travel assistance you need from Fraol Abera Travel Agency
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { id: 'domestic_tour', title: 'Historic & Cultural Heritage', icon: Compass, desc: 'Lalibela, Harar, Gondar' },
                { id: 'domestic_flight', title: 'Domestic Flights', icon: Plane, desc: 'Ethiopian Airlines booking' },
                { id: 'safari_expedition', title: '4x4 Safari & Wilderness', icon: Globe, desc: 'Bale Mountains, Danakil' },
                { id: 'cultural_expedition', title: 'Simien Highlands', icon: FileText, desc: 'Endemic wildlife tours' },
                { id: 'hotel_booking', title: 'Resorts & Lodges', icon: Hotel, desc: 'Eco-lodges and heritage stays' },
                { id: 'custom_group', title: 'Group Expeditions', icon: Users, desc: 'Custom fleets & logistics' },
              ].map(item => {
                const IconComponent = item.icon;
                const isSelected = serviceType === item.id;
                return (
                  <label
                    key={item.id}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center space-x-4 ${
                      isSelected 
                        ? 'bg-[#D66A4A]/5 border-[#D66A4A] shadow-sm' 
                        : 'bg-white border-[#E9E3DA] hover:border-[#262523]/30 hover:bg-[#F7F3EC]'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="serviceType" 
                      value={item.id} 
                      checked={isSelected}
                      onChange={() => setServiceType(item.id as ServiceType)}
                      className="sr-only"
                    />
                    <div className={`p-3 rounded-full shrink-0 transition-colors ${isSelected ? 'bg-[#D66A4A] text-white' : 'bg-[#F7F3EC] text-[#78736B]'}`}>
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm sm:text-base font-bold font-serif ${isSelected ? 'text-[#D66A4A]' : 'text-[#262523]'}`}>{item.title}</h4>
                      <p className="text-xs text-[#78736B] mt-0.5 leading-tight">{item.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <CheckCircle2 className="w-5 h-5 text-[#D66A4A]" />
                      </div>
                    )}
                  </label>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={handleNext}
                className="w-full sm:w-auto sm:float-right px-8 py-3.5 rounded-full bg-[#D66A4A] hover:bg-[#C2583A] text-white font-bold text-xs uppercase tracking-widest transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Continue to Travel Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="clear-both"></div>
            </div>
          </div>
        )}

        {/* STEP 2: Travel Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#262523]">
                Travel Details & Preferences
              </h2>
              <p className="text-xs text-[#78736B]">
                Specify route, travel dates, passenger count, and budget
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">Departure / Origin</label>
                <input
                  type="text"
                  value={departureCity}
                  onChange={e => setDepartureCity(e.target.value)}
                  placeholder="e.g. Addis Ababa (ADD)"
                  className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-sm text-[#262523] focus:outline-none focus:border-[#D66A4A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">Destination *</label>
                <input
                  type="text"
                  value={destinationCity}
                  onChange={e => setDestinationCity(e.target.value)}
                  placeholder="e.g. Lalibela / Harar / Simien Mountains / Bale / Omo Valley / Danakil"
                  className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-sm text-[#262523] focus:outline-none focus:border-[#D66A4A]"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">Departure Date</label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={e => setDepartureDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-sm text-[#262523] focus:outline-none focus:border-[#D66A4A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">Return Date (Optional)</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={e => setReturnDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-sm text-[#262523] focus:outline-none focus:border-[#D66A4A]"
                />
              </div>
            </div>

            {/* Passenger Count */}
            <div className="p-3 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D66A4A] block">
                Number of Travelers
              </span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#78736B] block">Adults (12+)</span>
                  <div className="flex items-center justify-center space-x-2 mt-1">
                    <button 
                      type="button" 
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-7 h-7 rounded-[2px] bg-white border border-[#E9E3DA] hover:bg-[#E9E3DA] text-xs font-bold"
                    >-</button>
                    <span className="text-sm font-bold font-mono text-[#262523]">{adults}</span>
                    <button 
                      type="button" 
                      onClick={() => setAdults(adults + 1)}
                      className="w-7 h-7 rounded-[2px] bg-white border border-[#E9E3DA] hover:bg-[#E9E3DA] text-xs font-bold"
                    >+</button>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#78736B] block">Children (2-11)</span>
                  <div className="flex items-center justify-center space-x-2 mt-1">
                    <button 
                      type="button" 
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-7 h-7 rounded-[2px] bg-white border border-[#E9E3DA] hover:bg-[#E9E3DA] text-xs font-bold"
                    >-</button>
                    <span className="text-sm font-bold font-mono text-[#262523]">{children}</span>
                    <button 
                      type="button" 
                      onClick={() => setChildren(children + 1)}
                      className="w-7 h-7 rounded-[2px] bg-white border border-[#E9E3DA] hover:bg-[#E9E3DA] text-xs font-bold"
                    >+</button>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#78736B] block">Infants (&lt;2)</span>
                  <div className="flex items-center justify-center space-x-2 mt-1">
                    <button 
                      type="button" 
                      onClick={() => setInfants(Math.max(0, infants - 1))}
                      className="w-7 h-7 rounded-[2px] bg-white border border-[#E9E3DA] hover:bg-[#E9E3DA] text-xs font-bold"
                    >-</button>
                    <span className="text-sm font-bold font-mono text-[#262523]">{infants}</span>
                    <button 
                      type="button" 
                      onClick={() => setInfants(infants + 1)}
                      className="w-7 h-7 rounded-[2px] bg-white border border-[#E9E3DA] hover:bg-[#E9E3DA] text-xs font-bold"
                    >+</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Estimate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">Preferred Currency</label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setBudgetCurrency('ETB')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-[2px] border ${budgetCurrency === 'ETB' ? 'bg-[#D66A4A] text-white border-[#D66A4A]' : 'bg-[#F7F3EC] text-[#262523] border-[#E9E3DA]'}`}
                  >
                    ETB (Ethiopian Birr)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBudgetCurrency('USD')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-[2px] border ${budgetCurrency === 'USD' ? 'bg-[#D66A4A] text-white border-[#D66A4A]' : 'bg-[#F7F3EC] text-[#262523] border-[#E9E3DA]'}`}
                  >
                    USD ($)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">Target Budget ({budgetCurrency})</label>
                <input
                  type="number"
                  value={budgetAmount}
                  onChange={e => setBudgetAmount(e.target.value)}
                  placeholder="e.g. 35000"
                  className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-sm text-[#262523] focus:outline-none focus:border-[#D66A4A] font-mono"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-[2px] bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] border border-[#E9E3DA] text-xs font-bold uppercase tracking-wider transition flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-[2px] bg-[#D66A4A] hover:bg-[#C2583A] text-white font-bold text-xs uppercase tracking-widest transition flex items-center space-x-2"
              >
                <span>Continue to Passenger Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Traveler Contact */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#262523]">
                Contact & Passenger Info
              </h2>
              <p className="text-xs text-[#78736B]">
                Provide contact details so Fraol Abera agents in Akaki Kality can contact you
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">Full Name (Primary Traveler) *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Abebe Kebede Alemu"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-sm text-[#262523] focus:outline-none focus:border-[#D66A4A]"
                    required
                  />
                  <User className="w-4 h-4 text-[#78736B] absolute left-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">Phone Number (Telegram/WhatsApp) *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+251 92 174 1429"
                      className="w-full pl-9 pr-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-sm text-[#262523] focus:outline-none focus:border-[#D66A4A] font-mono"
                      required
                    />
                    <Phone className="w-4 h-4 text-[#78736B] absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">Email Address (Optional)</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. name@domain.com"
                      className="w-full pl-9 pr-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-sm text-[#262523] focus:outline-none focus:border-[#D66A4A]"
                    />
                    <Mail className="w-4 h-4 text-[#78736B] absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">Passport or Kebele ID Number (Required for Visas/Flights)</label>
                <input
                  type="text"
                  value={passportOrIdNumber}
                  onChange={e => setPassportOrIdNumber(e.target.value)}
                  placeholder="e.g. EP1234567 or Ethiopian National ID"
                  className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-sm text-[#262523] focus:outline-none focus:border-[#D66A4A] font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1">Special Requests or Notes for Agent</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. Window seat preference, dietary requirements, family discount request..."
                  className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] text-xs text-[#262523] focus:outline-none focus:border-[#D66A4A]"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-[2px] bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] border border-[#E9E3DA] text-xs font-bold uppercase tracking-wider transition flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-[2px] bg-[#D66A4A] hover:bg-[#C2583A] text-white font-bold text-xs uppercase tracking-widest transition flex items-center space-x-2"
              >
                <span>Continue to Attach Documents</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Document Upload & Final Confirmation */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#262523]">
                Upload Documents & Confirm
              </h2>
              <p className="text-xs text-[#78736B]">
                Optionally upload Passport copy, Yellow Fever Card, or ID scan for faster processing
              </p>
            </div>

            {/* Document Upload Area */}
            <div className="p-4 bg-[#F7F3EC] border-2 border-dashed border-[#E9E3DA] hover:border-[#D66A4A] rounded-[2px] text-center space-y-2 transition">
              <Upload className="w-8 h-8 text-[#D66A4A] mx-auto" />
              <p className="text-xs text-[#262523] font-medium">
                Click to attach Passport copy, ID, or flight reference
              </p>
              <p className="text-[10px] text-[#78736B]">
                Supported formats: PDF, JPG, PNG (Max 10MB)
              </p>
              <input 
                type="file" 
                onChange={handleFileUpload} 
                className="hidden" 
                id="passport-file-input"
              />
              <label 
                htmlFor="passport-file-input"
                className="inline-block px-3 py-1.5 rounded-[2px] bg-white text-[#D66A4A] text-xs font-bold uppercase tracking-wider cursor-pointer border border-[#E9E3DA] hover:bg-[#E9E3DA]/40 transition"
              >
                Select File
              </label>

              {attachedFiles.length > 0 && (
                <div className="pt-2 text-left space-y-1">
                  <span className="text-[10px] font-bold text-[#8A9374] uppercase tracking-wider block">Attached Files:</span>
                  {attachedFiles.map((f, i) => (
                    <div key={i} className="text-xs text-[#262523] bg-white p-2 rounded-[2px] border border-[#E9E3DA] flex items-center justify-between">
                      <span className="truncate">{f.name}</span>
                      <span className="text-[10px] text-[#8A9374] font-bold uppercase">Attached</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary Preview Box */}
            <div className="bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] p-4 text-xs space-y-2">
              <span className="text-[#D66A4A] font-bold uppercase tracking-widest block font-serif">Quote Summary</span>
              <div className="grid grid-cols-2 gap-2 text-[#262523]">
                <div><strong className="text-[#78736B]">Service:</strong> {serviceType.replace('_', ' ').toUpperCase()}</div>
                <div><strong className="text-[#78736B]">Customer:</strong> {customerName}</div>
                <div><strong className="text-[#78736B]">Route:</strong> {departureCity} → {destinationCity}</div>
                <div><strong className="text-[#78736B]">Travelers:</strong> {adults} Adult(s), {children} Child(ren)</div>
                <div><strong className="text-[#78736B]">Phone:</strong> {phone}</div>
                <div><strong className="text-[#78736B]">Target Budget:</strong> {budgetAmount ? `${budgetAmount} ${budgetCurrency}` : 'Not specified'}</div>
              </div>
            </div>

            <div className="pt-3 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 rounded-[2px] bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] border border-[#E9E3DA] text-xs font-bold uppercase tracking-wider transition flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleSubmitInquiry}
                disabled={loading}
                className="px-6 py-2.5 rounded-[2px] bg-[#D66A4A] hover:bg-[#C2583A] text-white font-bold text-xs uppercase tracking-widest transition flex items-center space-x-2 shadow-sm"
              >
                {loading ? (
                  <span>Generating Ticket...</span>
                ) : (
                  <>
                    <span>Submit & Generate Ticket Ref</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Success Ticket Screen */}
        {step === 5 && (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 bg-[#AEB69A]/20 border-2 border-[#8A9374] text-[#8A9374] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-[#D66A4A] tracking-widest">Inquiry Ticket Generated</span>
              <h2 className="text-3xl font-extrabold text-[#262523] font-mono mt-1">
                {generatedTicketId}
              </h2>
              <p className="text-xs text-[#78736B] max-w-md mx-auto mt-2">
                Thank you, <strong className="text-[#262523]">{customerName}</strong>! Your travel quote request has been routed directly to Fraol Abera Travel Agency operations in Akaki Kality, Addis Ababa.
              </p>
            </div>

            {/* Quick Telegram / WhatsApp Follow Up Box */}
            <div className="bg-[#F7F3EC] border border-[#E9E3DA] rounded-[2px] p-4 text-left text-xs space-y-3">
              <span className="font-bold text-[#D66A4A] uppercase tracking-widest block font-serif">Fast-Track Your Booking</span>
              <p className="text-[#262523]">
                To receive an instant response or send your passport copy directly via chat, contact our agent on Telegram or call our main branch:
              </p>

              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://t.me/FraolAberaTravel?text=${encodeURIComponent(`Hello Fraol Abera Travel Agency, my Inquiry Ticket # is ${generatedTicketId}. I submitted a quote request for ${destinationCity}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-[2px] bg-[#262523] hover:bg-black text-white font-bold flex items-center justify-center space-x-1.5 transition text-xs uppercase tracking-wider"
                >
                  <Send className="w-3.5 h-3.5 text-[#D66A4A]" />
                  <span>Send Ticket to Telegram</span>
                </a>

                <a
                  href="tel:+251921741429"
                  className="py-3 px-4 rounded-[4px] bg-[#D66A4A] hover:bg-[#C2583A] text-white font-bold flex items-center justify-center space-x-1.5 transition text-xs uppercase tracking-wider min-h-[48px]"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call +251 92 174 1429</span>
                </a>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-[2px] bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] border border-[#E9E3DA] text-xs font-bold uppercase tracking-wider transition"
            >
              Done / Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

