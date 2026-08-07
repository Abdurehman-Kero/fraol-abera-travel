export type ServiceType = 
  | 'domestic_tour' 
  | 'domestic_flight' 
  | 'safari_expedition' 
  | 'cultural_expedition' 
  | 'hotel_booking' 
  | 'custom_group';

export type InquiryStatus = 
  | 'new' 
  | 'in_review' 
  | 'quote_sent' 
  | 'receipt_pending' 
  | 'confirmed' 
  | 'completed' 
  | 'cancelled';

export interface DocumentFile {
  name: string;
  url: string;
  uploadedAt: string;
  type: string;
}

export interface PaymentReceipt {
  transactionRef: string;
  bankName: string;
  amount: number;
  date: string;
  fileUrl: string;
  status: 'pending' | 'verified' | 'rejected';
}

export interface InquiryTicket {
  id: string;
  createdAt: string;
  serviceType: ServiceType;
  customerName: string;
  phone: string;
  email?: string;
  passportOrIdNumber?: string;
  travelers: {
    adults: number;
    children: number;
    infants: number;
  };
  departureCity?: string;
  destinationCity?: string;
  departureDate?: string;
  returnDate?: string;
  preferredAirline?: string;
  hotelClass?: string;
  budgetCurrency: 'ETB' | 'USD';
  budgetAmount?: number;
  notes?: string;
  status: InquiryStatus;
  assignedAgent?: string;
  documents: DocumentFile[];
  receipts: PaymentReceipt[];
  adminNotes?: string;
  quotedAmount?: number;
  quotedCurrency?: 'ETB' | 'USD';
}

export interface ItineraryDay {
  day: number;
  title: string;
  detail: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  subtitle: string;
  category: 'domestic' | 'heritage' | 'wildlife' | 'adventure' | 'cultural';
  location: string;
  durationDays: number;
  priceETB: number;
  priceUSD?: number;
  rating: number;
  featured: boolean;
  image: string;
  gallery: string[];
  description: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
}

export interface BankAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
  color: string;
  iconName: string;
  instructions: string;
}
