import React, { useState, useEffect } from 'react';
import { InquiryTicket, TravelPackage } from '../types';
import { 
  ShieldAlert, 
  Users, 
  Receipt, 
  DollarSign, 
  Search, 
  Eye, 
  Lock, 
  X,
  RefreshCw,
  Download,
  Plus,
  Sparkles,
  Check,
  Copy,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface AdminPortalProps {
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [inquiries, setInquiries] = useState<InquiryTicket[]>([]);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<'leads' | 'receipts' | 'packages'>('leads');

  // Filters
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  // Selected Inquiry for Detail Drawer
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryTicket | null>(null);

  // Form State for editing Inquiry
  const [editStatus, setEditStatus] = useState<string>('');
  const [editAdminNotes, setEditAdminNotes] = useState<string>('');
  const [editAssignedAgent, setEditAssignedAgent] = useState<string>('');
  const [editQuotedAmount, setEditQuotedAmount] = useState<string>('');

  // AI Assistant State
  const [aiPromptType, setAiPromptType] = useState<'custom_itinerary' | 'customer_email'>('customer_email');
  const [aiCustomPrompt, setAiCustomPrompt] = useState('');
  const [aiOutputText, setAiOutputText] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiCopied, setAiCopied] = useState(false);

  // Package Form State
  const [newPkgTitle, setNewPkgTitle] = useState('');
  const [newPkgCategory, setNewPkgCategory] = useState<'domestic' | 'international'>('domestic');
  const [newPkgPriceETB, setNewPkgPriceETB] = useState('');
  const [newPkgLocation, setNewPkgLocation] = useState('');
  const [newPkgDuration, setNewPkgDuration] = useState('3');
  const [newPkgDesc, setNewPkgDesc] = useState('');

  // PIN Login Verification
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'admin123' || pinInput === 'fraol2025') {
      setAuthenticated(true);
      setPinError('');
      fetchAdminData();
    } else {
      setPinError('Invalid PIN code. Access denied.');
    }
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [inqRes, pkgRes] = await Promise.all([
        fetch('/api/inquiries'),
        fetch('/api/packages')
      ]);
      const inqData = await inqRes.json();
      const pkgData = await pkgRes.json();

      if (inqData.success) setInquiries(inqData.inquiries);
      if (pkgData.success) setPackages(pkgData.packages);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInquiry = async () => {
    if (!selectedInquiry) return;
    try {
      const res = await fetch(`/api/inquiries/${selectedInquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          adminNotes: editAdminNotes,
          assignedAgent: editAssignedAgent,
          quotedAmount: editQuotedAmount ? Number(editQuotedAmount) : undefined,
          quotedCurrency: 'ETB'
        })
      });
      const data = await res.json();
      if (data.success) {
        setSelectedInquiry(data.inquiry);
        fetchAdminData();
      }
    } catch (err) {
      console.error('Failed to update inquiry:', err);
    }
  };

  const handleVerifyReceipt = async (receiptRef: string, verifyStatus: 'verified' | 'rejected') => {
    if (!selectedInquiry) return;
    try {
      const res = await fetch(`/api/inquiries/${selectedInquiry.id}/receipt/${receiptRef}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: verifyStatus,
          note: verifyStatus === 'verified' ? 'Payment verified by Finance Team.' : 'Receipt details do not match bank statement.'
        })
      });
      const data = await res.json();
      if (data.success) {
        setSelectedInquiry(data.inquiry);
        fetchAdminData();
      }
    } catch (err) {
      console.error('Error verifying receipt:', err);
    }
  };

  const handleRunAIQuote = async () => {
    if (!selectedInquiry) return;
    setAiGenerating(true);
    setAiOutputText('');

    try {
      const res = await fetch('/api/ai/generate-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryDetails: selectedInquiry,
          promptType: aiPromptType,
          customPrompt: aiCustomPrompt
        })
      });
      const data = await res.json();
      if (data.success) {
        setAiOutputText(data.response);
      }
    } catch (err) {
      setAiOutputText('Failed to invoke Gemini AI Assistant.');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleCreatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgTitle || !newPkgPriceETB) return;

    try {
      const res = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPkgTitle,
          category: newPkgCategory,
          location: newPkgLocation || 'Ethiopia',
          priceETB: Number(newPkgPriceETB),
          durationDays: Number(newPkgDuration),
          description: newPkgDesc || 'Package created by Fraol Abera Operations Desk.'
        })
      });
      const data = await res.json();
      if (data.success) {
        setNewPkgTitle('');
        setNewPkgPriceETB('');
        fetchAdminData();
      }
    } catch (err) {
      console.error('Error creating package:', err);
    }
  };

  const handleExportCSV = () => {
    const headers = 'Ticket ID,Customer Name,Phone,Service,Status,Budget ETB,Assigned Agent,Created At\n';
    const rows = inquiries.map(i => 
      `"${i.id}","${i.customerName}","${i.phone}","${i.serviceType}","${i.status}","${i.budgetAmount || 0}","${i.assignedAgent || ''}","${i.createdAt}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Fraol_Abera_Leads_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  // Filtered Leads
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.customerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      inq.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      inq.phone.includes(searchFilter) ||
      (inq.destinationCity && inq.destinationCity.toLowerCase().includes(searchFilter.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchesService = serviceFilter === 'all' || inq.serviceType === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  // Calculate KPIs
  const totalLeads = inquiries.length;
  const pendingQuotes = inquiries.filter(i => i.status === 'new' || i.status === 'in_review').length;
  const pendingReceipts = inquiries.filter(i => i.status === 'receipt_pending').length;
  const totalConfirmedRevenue = inquiries
    .filter(i => i.status === 'confirmed' || i.status === 'completed')
    .reduce((sum, i) => sum + (i.quotedAmount || i.budgetAmount || 0), 0);

  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#262523]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white border border-[#E9E3DA] rounded-xl max-w-sm w-full p-5 sm:p-6 text-[#262523] shadow-2xl relative my-auto">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-lg bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] border border-[#E9E3DA] transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center space-y-4">
            <div className="w-10 h-10 bg-[#D66A4A]/10 border border-[#D66A4A]/30 text-[#D66A4A] rounded-xl flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold font-serif text-[#262523]">Operations Portal</h2>
              <p className="text-xs text-[#78736B] mt-0.5">Staff Authentication • Fraol Abera</p>
            </div>

            {pinError && (
              <div className="p-2.5 rounded-lg bg-[#D66A4A]/10 border border-[#D66A4A] text-[#D66A4A] text-xs font-semibold">
                {pinError}
              </div>
            )}

            <form onSubmit={handlePinSubmit} className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#262523] mb-1">Staff Passcode PIN</label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={e => setPinInput(e.target.value)}
                  placeholder="Default PIN: admin123"
                  className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-lg text-xs text-[#262523] focus:outline-none focus:border-[#D66A4A] font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#D66A4A] hover:bg-[#C2583A] text-white font-bold text-xs uppercase tracking-wider transition shadow-xs"
              >
                Authenticate & Login
              </button>
            </form>

            <p className="text-[11px] text-[#78736B]">
              Default passcode: <code className="text-[#D66A4A] font-bold">admin123</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F3EC] text-[#262523] flex flex-col overflow-hidden">
      {/* Top Admin Navigation Header - Mobile First */}
      <header className="bg-white border-b border-[#E9E3DA] px-4 py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#D66A4A]/10 text-[#D66A4A] border border-[#D66A4A]/20">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h1 className="text-sm sm:text-base font-bold font-serif text-[#262523]">
                  Admin Dashboard
                </h1>
                <span className="text-[9px] font-mono bg-[#D66A4A]/10 text-[#D66A4A] px-1.5 py-0.5 rounded border border-[#D66A4A]/30 font-bold uppercase">
                  Branch
                </span>
              </div>
              <p className="text-[10px] text-[#78736B] hidden sm:block">Fraol Abera Operations Desk</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={fetchAdminData}
              title="Refresh Data"
              className="p-1.5 rounded-lg bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] border border-[#E9E3DA] transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleExportCSV}
              className="px-2.5 py-1.5 rounded-lg bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[11px] font-semibold text-[#262523] border border-[#E9E3DA] transition flex items-center space-x-1 uppercase tracking-wider"
            >
              <Download className="w-3 h-3 text-[#D66A4A]" />
              <span>CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] border border-[#E9E3DA] transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Portal Body */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto w-full">
        {/* KPI Summary Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#E9E3DA] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#78736B] block tracking-wider">Total Leads</span>
              <span className="text-lg sm:text-2xl font-extrabold font-mono text-[#262523]">{totalLeads}</span>
            </div>
            <Users className="w-5 h-5 sm:w-7 sm:h-7 text-[#D66A4A] opacity-80 shrink-0" />
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#E9E3DA] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#78736B] block tracking-wider">Quotes Needed</span>
              <span className="text-lg sm:text-2xl font-extrabold font-mono text-[#D66A4A]">{pendingQuotes}</span>
            </div>
            <Eye className="w-5 h-5 sm:w-7 sm:h-7 text-[#D66A4A] opacity-80 shrink-0" />
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#E9E3DA] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#78736B] block tracking-wider">Pending Proofs</span>
              <span className="text-lg sm:text-2xl font-extrabold font-mono text-[#D66A4A]">{pendingReceipts}</span>
            </div>
            <Receipt className="w-5 h-5 sm:w-7 sm:h-7 text-[#D66A4A] opacity-80 shrink-0" />
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#E9E3DA] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#78736B] block tracking-wider">Sales Revenue</span>
              <span className="text-sm sm:text-xl font-extrabold font-mono text-[#8A9374] block truncate">
                {totalConfirmedRevenue.toLocaleString()} <span className="text-[10px]">ETB</span>
              </span>
            </div>
            <DollarSign className="w-5 h-5 sm:w-7 sm:h-7 text-[#8A9374] opacity-80 shrink-0" />
          </div>
        </div>

        {/* Tab Navigation Controls (Horizontal Scrollable on Mobile) */}
        <div className="flex space-x-1.5 border-b border-[#E9E3DA] pb-2 overflow-x-auto no-scrollbar text-xs font-semibold">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3 py-2 rounded-lg transition whitespace-nowrap uppercase tracking-wider text-[11px] ${
              activeTab === 'leads' 
                ? 'bg-[#D66A4A] text-white font-bold shadow-xs' 
                : 'bg-white text-[#78736B] border border-[#E9E3DA] hover:text-[#262523]'
            }`}
          >
            Leads ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('receipts')}
            className={`px-3 py-2 rounded-lg transition whitespace-nowrap uppercase tracking-wider text-[11px] relative ${
              activeTab === 'receipts' 
                ? 'bg-[#D66A4A] text-white font-bold shadow-xs' 
                : 'bg-white text-[#78736B] border border-[#E9E3DA] hover:text-[#262523]'
            }`}
          >
            <span>Payment Proofs</span>
            {pendingReceipts > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-white text-[#D66A4A] text-[9px] font-mono font-bold">
                {pendingReceipts}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-3 py-2 rounded-lg transition whitespace-nowrap uppercase tracking-wider text-[11px] ${
              activeTab === 'packages' 
                ? 'bg-[#D66A4A] text-white font-bold shadow-xs' 
                : 'bg-white text-[#78736B] border border-[#E9E3DA] hover:text-[#262523]'
            }`}
          >
            Tour Packages ({packages.length})
          </button>
        </div>

        {/* TAB 1: Leads View (Mobile Cards + Desktop Table) */}
        {activeTab === 'leads' && (
          <div className="space-y-3">
            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-white p-2.5 rounded-xl border border-[#E9E3DA]">
              <div className="relative">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  placeholder="Search lead or ticket ID..."
                  className="w-full pl-8 pr-3 py-1.5 bg-[#F7F3EC] border border-[#E9E3DA] rounded-lg text-xs text-[#262523] placeholder-[#78736B] focus:outline-none focus:border-[#D66A4A]"
                />
                <Search className="w-3.5 h-3.5 text-[#78736B] absolute left-2.5 top-2.5" />
              </div>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-[#F7F3EC] border border-[#E9E3DA] rounded-lg text-xs text-[#262523]"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="in_review">In Review</option>
                <option value="quote_sent">Quote Sent</option>
                <option value="receipt_pending">Receipt Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={serviceFilter}
                onChange={e => setServiceFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-[#F7F3EC] border border-[#E9E3DA] rounded-lg text-xs text-[#262523]"
              >
                <option value="all">All Services</option>
                <option value="domestic_tour">Domestic Tour</option>
                <option value="international_flight">Flight Tickets</option>
                <option value="outbound_package">Outbound Package</option>
                <option value="visa_assistance">Visa Assistance</option>
              </select>
            </div>

            {/* Mobile Cards View (Visible on small screens) */}
            <div className="block sm:hidden space-y-2.5">
              {filteredInquiries.length === 0 ? (
                <div className="bg-white p-6 rounded-xl border border-[#E9E3DA] text-center text-xs text-[#78736B]">
                  No leads found matching filters.
                </div>
              ) : (
                filteredInquiries.map(inq => (
                  <div 
                    key={inq.id}
                    onClick={() => {
                      setSelectedInquiry(inq);
                      setEditStatus(inq.status);
                      setEditAdminNotes(inq.adminNotes || '');
                      setEditAssignedAgent(inq.assignedAgent || 'Fraol Abera Desk');
                      setEditQuotedAmount(inq.quotedAmount ? String(inq.quotedAmount) : '');
                    }}
                    className="bg-white border border-[#E9E3DA] rounded-xl p-3.5 space-y-2 active:bg-[#F7F3EC] transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-[#D66A4A]">{inq.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        inq.status === 'confirmed' ? 'bg-[#AEB69A]/30 text-[#8A9374]' :
                        inq.status === 'receipt_pending' ? 'bg-[#D66A4A]/20 text-[#D66A4A]' :
                        'bg-[#F7F3EC] text-[#262523]'
                      }`}>
                        {inq.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#262523]">{inq.customerName}</h4>
                        <p className="text-[11px] text-[#78736B] font-mono">{inq.phone}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#78736B] uppercase block">Quote / Budget</span>
                        <span className="text-xs font-bold font-mono text-[#D66A4A]">
                          {inq.quotedAmount ? `${inq.quotedAmount.toLocaleString()} ETB` : (inq.budgetAmount ? `${inq.budgetAmount.toLocaleString()} ETB` : '—')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E9E3DA] text-xs">
                      <span className="text-[10px] uppercase font-bold text-[#78736B]">
                        {inq.serviceType.replace('_', ' ')}
                      </span>
                      <span className="text-[#D66A4A] font-bold flex items-center text-[11px]">
                        Manage Lead <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Desktop Table View (Hidden on small screens) */}
            <div className="hidden sm:block bg-white border border-[#E9E3DA] rounded-xl overflow-hidden overflow-x-auto">
              <table className="w-full text-left text-xs text-[#262523]">
                <thead className="bg-[#F7F3EC] uppercase font-mono text-[10px] text-[#78736B] border-b border-[#E9E3DA]">
                  <tr>
                    <th className="px-4 py-3">Ticket Ref</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Service & Route</th>
                    <th className="px-4 py-3">Budget / Quote</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E3DA]">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-[#78736B]">
                        No inquiry tickets found.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map(inq => (
                      <tr key={inq.id} className="hover:bg-[#F7F3EC]/60 transition">
                        <td className="px-4 py-3 font-mono font-bold text-[#D66A4A]">{inq.id}</td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-[#262523]">{inq.customerName}</div>
                          <div className="text-[10px] text-[#78736B] font-mono">{inq.phone}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] uppercase font-bold text-[#D66A4A] block">
                            {inq.serviceType.replace('_', ' ')}
                          </span>
                          <span className="text-[#262523] text-[11px]">{inq.departureCity || 'Addis'} → {inq.destinationCity || 'Any'}</span>
                        </td>
                        <td className="px-4 py-3 font-mono">
                          {inq.quotedAmount ? (
                            <span className="text-[#8A9374] font-bold">{inq.quotedAmount.toLocaleString()} ETB</span>
                          ) : inq.budgetAmount ? (
                            <span>{inq.budgetAmount.toLocaleString()} {inq.budgetCurrency}</span>
                          ) : (
                            <span className="text-[#78736B]">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            inq.status === 'confirmed' ? 'bg-[#AEB69A]/30 text-[#8A9374]' :
                            inq.status === 'receipt_pending' ? 'bg-[#D66A4A]/20 text-[#D66A4A]' :
                            'bg-[#F7F3EC] text-[#262523]'
                          }`}>
                            {inq.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => {
                              setSelectedInquiry(inq);
                              setEditStatus(inq.status);
                              setEditAdminNotes(inq.adminNotes || '');
                              setEditAssignedAgent(inq.assignedAgent || 'Fraol Abera Desk');
                              setEditQuotedAmount(inq.quotedAmount ? String(inq.quotedAmount) : '');
                            }}
                            className="px-3 py-1 rounded-lg bg-[#D66A4A] hover:bg-[#C2583A] text-white font-bold text-[11px] uppercase tracking-wider transition shadow-xs"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Receipt Verification Queue */}
        {activeTab === 'receipts' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#D66A4A]">
              Payment Receipts Awaiting Staff Verification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inquiries
                .filter(inq => inq.receipts && inq.receipts.length > 0)
                .map(inq => (
                  <div key={inq.id} className="bg-white border border-[#E9E3DA] rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#E9E3DA] pb-2">
                      <div>
                        <span className="font-mono font-bold text-xs text-[#D66A4A]">{inq.id}</span>
                        <h4 className="text-sm font-bold text-[#262523]">{inq.customerName}</h4>
                      </div>
                      <span className="text-xs text-[#78736B] font-mono">{inq.phone}</span>
                    </div>

                    {inq.receipts.map((rc, idx) => (
                      <div key={idx} className="p-3 bg-[#F7F3EC] rounded-lg border border-[#E9E3DA] space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#262523]">{rc.bankName} Transfer</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            rc.status === 'verified' ? 'bg-[#AEB69A]/30 text-[#8A9374]' : 'bg-[#D66A4A]/20 text-[#D66A4A]'
                          }`}>
                            {rc.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[#262523] font-mono text-[11px]">
                          <div>Ref: <strong className="text-[#D66A4A]">{rc.transactionRef}</strong></div>
                          <div>Amount: <strong className="text-[#8A9374]">{rc.amount.toLocaleString()} ETB</strong></div>
                        </div>

                        {rc.status === 'pending' && (
                          <div className="flex items-center space-x-2 pt-2 border-t border-[#E9E3DA]">
                            <button
                              onClick={() => {
                                setSelectedInquiry(inq);
                                handleVerifyReceipt(rc.transactionRef, 'verified');
                              }}
                              className="flex-1 py-1.5 rounded-lg bg-[#8A9374] hover:bg-[#788062] text-white font-bold text-xs uppercase tracking-wider transition"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => {
                                setSelectedInquiry(inq);
                                handleVerifyReceipt(rc.transactionRef, 'rejected');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#D66A4A] hover:bg-[#C2583A] text-white text-xs uppercase tracking-wider transition"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 3: Manage Tour Packages */}
        {activeTab === 'packages' && (
          <div className="space-y-4">
            <div className="bg-white border border-[#E9E3DA] rounded-xl p-4 sm:p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#262523] flex items-center space-x-1.5">
                <Plus className="w-4 h-4 text-[#D66A4A]" />
                <span>Add New Travel Package / Promotion</span>
              </h3>

              <form onSubmit={handleCreatePackage} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-[#78736B] mb-1 font-semibold">Package Title</label>
                  <input
                    type="text"
                    value={newPkgTitle}
                    onChange={e => setNewPkgTitle(e.target.value)}
                    placeholder="e.g. Omo Valley Expedition"
                    className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-lg text-[#262523] focus:outline-none focus:border-[#D66A4A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#78736B] mb-1 font-semibold">Category</label>
                  <select
                    value={newPkgCategory}
                    onChange={e => setNewPkgCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-lg text-[#262523] focus:outline-none focus:border-[#D66A4A]"
                  >
                    <option value="domestic">Domestic Ethiopia Tour</option>
                    <option value="international">Outbound International</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#78736B] mb-1 font-semibold">Price (ETB)</label>
                  <input
                    type="number"
                    value={newPkgPriceETB}
                    onChange={e => setNewPkgPriceETB(e.target.value)}
                    placeholder="e.g. 38000"
                    className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-lg text-[#262523] font-mono focus:outline-none focus:border-[#D66A4A]"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#78736B] mb-1 font-semibold">Description</label>
                  <input
                    type="text"
                    value={newPkgDesc}
                    onChange={e => setNewPkgDesc(e.target.value)}
                    placeholder="Short description of inclusions, hotel, and flights"
                    className="w-full px-3 py-2 bg-[#F7F3EC] border border-[#E9E3DA] rounded-lg text-[#262523] focus:outline-none focus:border-[#D66A4A]"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#D66A4A] hover:bg-[#C2583A] text-white font-bold rounded-lg uppercase tracking-wider transition shadow-xs"
                  >
                    Publish Package
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Selected Inquiry Detail & Gemini AI Drawer (Mobile Responsive Drawer) */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-[#262523]/80 backdrop-blur-sm flex justify-end overflow-y-auto">
          <div className="bg-white border-l border-[#E9E3DA] w-full max-w-xl min-h-full p-4 sm:p-6 space-y-5 text-[#262523] shadow-2xl relative my-auto sm:my-0">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#F7F3EC] hover:bg-[#E9E3DA] text-[#262523] border border-[#E9E3DA]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-[#E9E3DA] pb-3">
              <span className="text-xs font-mono font-bold text-[#D66A4A]">{selectedInquiry.id}</span>
              <h2 className="text-xl font-bold font-serif text-[#262523]">{selectedInquiry.customerName}</h2>
              <p className="text-xs text-[#78736B]">{selectedInquiry.phone} • {selectedInquiry.email || 'No email'}</p>
            </div>

            {/* Status Update Form */}
            <div className="bg-[#F7F3EC] border border-[#E9E3DA] rounded-xl p-3.5 space-y-3 text-xs">
              <span className="text-[#D66A4A] font-bold uppercase tracking-wider block font-serif">Update Lead & Quote</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#78736B] mb-1 font-semibold">Status</label>
                  <select
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#E9E3DA] rounded-lg text-[#262523]"
                  >
                    <option value="new">New</option>
                    <option value="in_review">In Review</option>
                    <option value="quote_sent">Quote Sent</option>
                    <option value="receipt_pending">Receipt Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#78736B] mb-1 font-semibold">Quoted Amount (ETB)</label>
                  <input
                    type="number"
                    value={editQuotedAmount}
                    onChange={e => setEditQuotedAmount(e.target.value)}
                    placeholder="e.g. 52000"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#E9E3DA] rounded-lg text-[#262523] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#78736B] mb-1 font-semibold">Internal Operations Notes</label>
                <textarea
                  value={editAdminNotes}
                  onChange={e => setEditAdminNotes(e.target.value)}
                  rows={2}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#E9E3DA] rounded-lg text-[#262523]"
                />
              </div>

              <button
                onClick={handleUpdateInquiry}
                className="w-full py-2 rounded-lg bg-[#D66A4A] hover:bg-[#C2583A] text-white font-bold text-xs uppercase tracking-wider transition shadow-xs"
              >
                Save Updates
              </button>
            </div>

            {/* GEMINI AI ASSISTANT PANEL */}
            <div className="bg-[#F7F3EC] border border-[#AEB69A] rounded-xl p-3.5 space-y-3 text-xs">
              <div className="flex items-center space-x-1.5 text-[#262523] font-bold">
                <Sparkles className="w-4 h-4 text-[#D66A4A]" />
                <span className="font-serif text-xs uppercase tracking-wide">Gemini AI Quote Generator</span>
              </div>
              <p className="text-[11px] text-[#78736B]">
                Generate an official customer quote message or detailed itinerary in English or Amharic tone using server-side Gemini AI.
              </p>

              <div className="flex space-x-1.5">
                <button
                  type="button"
                  onClick={() => setAiPromptType('customer_email')}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition text-[10px] uppercase tracking-wider ${aiPromptType === 'customer_email' ? 'bg-[#262523] text-white' : 'bg-white text-[#78736B] border border-[#E9E3DA]'}`}
                >
                  Customer Email
                </button>
                <button
                  type="button"
                  onClick={() => setAiPromptType('custom_itinerary')}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition text-[10px] uppercase tracking-wider ${aiPromptType === 'custom_itinerary' ? 'bg-[#262523] text-white' : 'bg-white text-[#78736B] border border-[#E9E3DA]'}`}
                >
                  Day-by-Day Itinerary
                </button>
              </div>

              <button
                onClick={handleRunAIQuote}
                disabled={aiGenerating}
                className="w-full py-2 rounded-lg bg-[#D66A4A] hover:bg-[#C2583A] text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{aiGenerating ? 'Generating Quote...' : 'Generate Quote with Gemini'}</span>
              </button>

              {aiOutputText && (
                <div className="mt-2 p-2.5 bg-white border border-[#E9E3DA] rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#D66A4A] uppercase tracking-wider font-serif">AI Output:</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(aiOutputText);
                        setAiCopied(true);
                        setTimeout(() => setAiCopied(false), 2000);
                      }}
                      className="text-[10px] text-[#D66A4A] hover:text-[#262523] flex items-center space-x-1 font-bold"
                    >
                      {aiCopied ? <Check className="w-3 h-3 text-[#8A9374]" /> : <Copy className="w-3 h-3" />}
                      <span>{aiCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <textarea
                    value={aiOutputText}
                    readOnly
                    rows={6}
                    className="w-full bg-[#F7F3EC] border border-[#E9E3DA] p-2 text-[11px] font-mono text-[#262523] rounded-lg leading-relaxed focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
