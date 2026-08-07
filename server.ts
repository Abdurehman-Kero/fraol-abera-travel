import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// In-Memory Database for Inquiries and Packages with initial seed data
let packages = [
  {
    id: 'pkg-lalibela-01',
    title: 'Lalibela Monolithic Rock-Hewn Churches Heritage',
    subtitle: 'Journey into Ethiopia\'s 12th-Century Architectural Wonder',
    category: 'heritage',
    location: 'Lalibela, Amhara Region, Ethiopia',
    durationDays: 3,
    priceETB: 24500,
    priceUSD: 210,
    rating: 4.9,
    featured: true,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Experience the 11 magnificent rock-hewn monolithic churches of Lalibela, carved out of solid volcanic rock in the 12th century. Guided tours, flight arrangements from Addis Ababa, luxury hotel stay, and traditional Ethiopian coffee ceremony included.',
    itinerary: [
      { day: 1, title: 'Arrival & Northern Group Churches', detail: 'Morning Ethiopian Airlines flight from Addis Ababa to Lalibela. Check-in at Roha Hotel. Afternoon tour of Biete Medhani Alem, Biete Maryam, and Biete Golgotha.' },
      { day: 2, title: 'Asheten Maryam & Southern Group', detail: 'Mule ride or 4WD excursion up Mt. Asheten Maryam monastery. Afternoon visit to the iconic cross-shaped Biete Giyorgis (Church of St. George).' },
      { day: 3, title: 'Yemrehana Krestos & Departure', detail: 'Excursion to the marble-carved cave church of Yemrehana Krestos before evening flight back to Addis Ababa.' }
    ],
    inclusions: ['Round-trip domestic flights (Addis-Lalibela-Addis)', '2 nights hotel accommodation with breakfast', 'Official English/Amharic speaking church guide', 'All site entry permits and ground transfers'],
    exclusions: ['Personal expenses & souvenirs', 'Alcoholic beverages', 'Gratuities for local guides']
  },
  {
    id: 'pkg-harar-02',
    title: 'Harar Jugol Walled Citadel & Cultural Heritage',
    subtitle: 'Traditional Harari Balcony Architecture, 99 Mosques & Hyena Feeding',
    category: 'cultural',
    location: 'Harar Jugol & Dire Dawa, Eastern Ethiopia',
    durationDays: 3,
    priceETB: 28000,
    priceUSD: 240,
    rating: 5.0,
    featured: true,
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Explore the 4th holiest city of Islam and UNESCO World Heritage walled citadel of Harar Jugol. Walk inside historic courtyard compounds featuring traditional wooden balcony architecture, visit the Arthur Rimbaud Museum, sample local coffee, and experience the thrilling nightly hyena feeding ritual.',
    itinerary: [
      { day: 1, title: 'Flight to Dire Dawa & Scenic Drive to Harar', detail: 'Morning flight from Addis Ababa to Dire Dawa airport. Drive to Harar Jugol through chat plantations and coffee hills. Check-in at traditional Harari cultural guesthouse.' },
      { day: 2, title: 'Walled City Alleyways, Wooden Balconies & Hyena Man', detail: 'Guided walking tour through Harar\'s 5 historical gates, Arthur Rimbaud house with intricate wooden staircases and sunlit courtyard, colorful markets, and evening wild hyena feeding ceremony.' },
      { day: 3, title: 'Coffee Tasting & Return Flight to Addis Ababa', detail: 'Morning visit to Harar coffee roasting market and local spice souk. Afternoon drive to Dire Dawa for flight back to Addis Ababa.' }
    ],
    inclusions: ['Domestic flight tickets (Addis-Dire Dawa-Addis)', '2 nights accommodation in traditional Harari cultural residence', 'Official city tour guide & site entries', 'Hyena feeding show ticket & ground transfers'],
    exclusions: ['Personal souvenirs', 'Optional local coffee purchases']
  },
  {
    id: 'pkg-simien-03',
    title: 'Simien Mountains Wildlife & Gelada Highlands Trek',
    subtitle: 'Trek the Roof of Africa & Observe Endemic Gelada Baboons',
    category: 'wildlife',
    location: 'Simien Mountains National Park & Gondar, Ethiopia',
    durationDays: 4,
    priceETB: 33000,
    priceUSD: 280,
    rating: 4.9,
    featured: true,
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Trek through dramatic jagged mountain peaks and sheer escarpment cliffs rising above 4,000 meters in Simien Mountains National Park. Encounter large friendly troops of endemic Gelada baboons, observe Walia ibex on cliff edges, and tour Gondar\'s Royal Fasilides Castles.',
    itinerary: [
      { day: 1, title: 'Addis to Gondar Castle Tour', detail: 'Morning flight to Gondar. Tour Fasilides Royal Enclosure and Debre Birhan Selassie Church with its famed angel painted ceiling.' },
      { day: 2, title: 'Gondar to Sankaber & Gelada Baboon Encounter', detail: 'Scenic drive to Simien Park entrance in Debark. Guided walking safari around Sankaber viewpoints surrounded by hundreds of friendly Gelada baboons.' },
      { day: 3, title: 'Jinbar Waterfall & Chennek Cliff Trek', detail: 'Hike along escarpment edges to Jinbar Waterfall drop (500m chute) and Chennek valley looking for Walia ibex.' },
      { day: 4, title: 'Return Drive & Flight back to Addis Ababa', detail: 'Morning drive back down to Gondar airport, evening flight return to Addis Ababa.' }
    ],
    inclusions: ['Domestic flights (Addis-Gondar-Addis)', 'Hotel & mountain lodge accommodation with all meals', 'National park scout, guide fees, and park entry permits'],
    exclusions: ['Personal heavy winter trekking coat']
  },
  {
    id: 'pkg-bale-04',
    title: 'Bale Mountains & Harenna Forest 4x4 Safari Expedition',
    subtitle: 'Traverse Harenna Cloud Forest Canopy & Sanetti Plateau in 4x4 Land Cruisers',
    category: 'wildlife',
    location: 'Bale Mountains National Park & Dinsho, Ethiopia',
    durationDays: 4,
    priceETB: 36000,
    priceUSD: 310,
    rating: 4.9,
    featured: true,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Drive white 4x4 Land Cruisers deep into the mysterious lush green canopy of Harenna Forest and across the afro-alpine Sanetti Plateau at 4,000 meters altitude. Spot rare Ethiopian Wolves, Mountain Nyala, giant lobelias, and wild forest coffee plants.',
    itinerary: [
      { day: 1, title: 'Addis Ababa to Dinsho & Bale Park HQ', detail: 'Morning 4x4 departure from Addis Ababa via Rift Valley lakes to Dinsho Park HQ. Walking safari to spot endemic Mountain Nyala and Menelik\'s Bushbuck.' },
      { day: 2, title: 'Sanetti Plateau & Ethiopian Wolf Spotting', detail: 'Drive across the world\'s highest afro-alpine road on Sanetti Plateau. Spot red Ethiopian Wolves hunting giant mole rats and ascend Mt. Tullu Dimtu.' },
      { day: 3, title: 'Harenna Cloud Forest 4x4 Safari Drive', detail: 'Descend into the dense green Harenna Forest, driving through ancient tree canopies and wild coffee forests. Visit waterfall trails and forest lodges.' },
      { day: 4, title: 'Rift Valley Lakes Return Drive to Addis', detail: 'Scenic return drive passing Lake Ziway for pelican watching, arrival in Addis Ababa by early evening.' }
    ],
    inclusions: ['Private 4x4 AC Land Cruiser transportation with dedicated driver', '3 nights eco-lodge & park lodge stay', 'Official park guide & armed scout fees'],
    exclusions: ['Personal gear & alcoholic beverages']
  },
  {
    id: 'pkg-omo-05',
    title: 'Omo Valley Tribal Cultural Expedition & River 4x4 Safari',
    subtitle: 'Rugged River Crossings, Mursi, Hamer & Karo Cultural Encounters',
    category: 'cultural',
    location: 'Lower Omo Valley, Jinka & Turmi, Southern Ethiopia',
    durationDays: 5,
    priceETB: 48000,
    priceUSD: 410,
    rating: 5.0,
    featured: true,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'An unforgettable 4x4 Land Cruiser expedition across river streams and savannah dirt roads into the heart of the Lower Omo Valley. Meet the Mursi, Hamer, Karo, and Dassanech tribes, experience traditional bull jumping ceremonies, and explore vibrant tribal markets.',
    itinerary: [
      { day: 1, title: 'Flight to Jinka & Ari Village Visit', detail: 'Flight from Addis Ababa to Jinka airport. Meet 4x4 expedition team. Visit Jinka Museum and neighboring Ari tribal village.' },
      { day: 2, title: 'Mago National Park & Mursi Lip-Plate Tribe', detail: 'Early morning 4x4 drive through Mago National Park to visit Mursi village, famous for ceramic lip plates and body painting.' },
      { day: 3, title: '4x4 River Crossing Drive to Turmi & Hamer Village', detail: 'Cross gravel river streams in 4x4 vehicles heading towards Turmi. Attend a traditional Hamer cattle jumping ceremony if scheduled.' },
      { day: 4, title: 'Karo Tribe at Omo River Overlook & Dimeka Market', detail: 'Drive to Dus village of the Karo tribe perched high over the Omo River, known for intricate white body chalk art. Visit Dimeka market.' },
      { day: 5, title: 'Drive to Arba Minch & Flight to Addis Ababa', detail: 'Morning drive to Arba Minch with scenic views over Chamo & Abaya lakes. Flight back to Addis Ababa.' }
    ],
    inclusions: ['Round-trip domestic flights (Addis-Jinka / Arba Minch-Addis)', '4x4 Land Cruiser 4WD expedition transport', 'Local tribal village permits, photo fees, and community guides', '4 nights lodge accommodation with breakfast'],
    exclusions: ['Individual tipping for personal village photos']
  },
  {
    id: 'pkg-danakil-06',
    title: 'Danakil Depression & Erta Ale Lava Lake Expedition',
    subtitle: 'Dallol Hydrothermal Vents, Salt Caravans & Active Volcano Lava Lake',
    category: 'adventure',
    location: 'Danakil Depression, Afar Region, Ethiopia',
    durationDays: 4,
    priceETB: 45000,
    priceUSD: 380,
    rating: 5.0,
    featured: true,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Conquer one of the hottest places on earth. Marvel at the neon yellow sulfur springs of Dallol, walk on salt flats, watch camel salt caravans, and trek up Erta Ale volcano to view the active bubbling lava lake under stars.',
    itinerary: [
      { day: 1, title: 'Semera/Mekele to Hamed Ela', detail: 'Fly to Semera or drive from Mekele. Cross the Afar desert landscape, visit salt miners caravan, sunset over Lake Karum.' },
      { day: 2, title: 'Dallol Geothermal Field & Salt Lake', detail: 'Early morning exploration of the breathtaking multi-colored Dallol hydrothermal vents and sulfur pools.' },
      { day: 3, title: 'Erta Ale Volcano Lava Lake Trek', detail: 'Drive to Dodom base camp. Evening night trek to the crater edge of Erta Ale volcano to witness live bubbling lava.' },
      { day: 4, title: 'Return Drive & Flight to Addis Ababa', detail: 'Descend Erta Ale, breakfast at base camp, drive back to Semera airport for evening flight to Addis Ababa.' }
    ],
    inclusions: ['All 4x4 AC Land Cruiser desert transportation', 'Experienced Afar scouts & military escort', 'Cook & full camping gear/matts', 'National park and Afar regional permits'],
    exclusions: ['Sleeping bags', 'Personal thermal water bottles']
  }
];

let inquiries: any[] = [
  {
    id: 'FATA-2025-1001',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    serviceType: 'domestic_tour',
    customerName: 'Abebe Kebede',
    phone: '+251 911 123 456',
    email: 'abebe.k@gmail.com',
    travelers: { adults: 2, children: 1, infants: 0 },
    departureCity: 'Addis Ababa',
    destinationCity: 'Lalibela',
    departureDate: '2025-11-15',
    returnDate: '2025-11-18',
    budgetCurrency: 'ETB',
    budgetAmount: 55000,
    notes: 'Looking for a family trip to Lalibela for Genna (Ethiopian Christmas) holiday package.',
    status: 'quote_sent',
    assignedAgent: 'Fraol Abera',
    quotedAmount: 52000,
    quotedCurrency: 'ETB',
    documents: [],
    receipts: [
      {
        transactionRef: 'TB-98213749',
        bankName: 'Telebirr',
        amount: 26000,
        date: new Date(Date.now() - 43200000).toISOString(),
        fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
        status: 'verified'
      }
    ],
    adminNotes: '50% advance deposit received via Telebirr. Verified and tickets reserved.'
  },
  {
    id: 'FATA-2025-1002',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    serviceType: 'domestic_flight',
    customerName: 'Tigist Haile',
    phone: '+251 912 345 678',
    email: 'tigist.haile@yahoo.com',
    passportOrIdNumber: '12345678',
    travelers: { adults: 2, children: 0, infants: 0 },
    departureCity: 'Addis Ababa (ADD)',
    destinationCity: 'Semera / Danakil (SZE)',
    departureDate: '2025-12-01',
    returnDate: '2025-12-05',
    preferredAirline: 'Ethiopian Airlines',
    hotelClass: 'Lodge',
    budgetCurrency: 'ETB',
    budgetAmount: 85000,
    notes: 'Requesting 2 round-trip domestic flight tickets to Semera + 4x4 Danakil Land Cruiser tour.',
    status: 'in_review',
    assignedAgent: 'Operations Team',
    documents: [],
    receipts: [],
    adminNotes: 'Checking live Ethiopian Airlines domestic flight seat availability.'
  }
];

// Initialize Gemini API client lazily
function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// REST API Endpoints

// 1. Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', agency: 'Fraol Abera Travel Agency', location: 'Akaki Kality, Addis Ababa, Ethiopia' });
});

// 2. Get Travel Packages
app.get('/api/packages', (req, res) => {
  res.json({ success: true, packages });
});

// 3. Create or Update Travel Package (Admin)
app.post('/api/packages', (req, res) => {
  const pkgData = req.body;
  if (!pkgData.title || !pkgData.category) {
    return res.status(400).json({ success: false, message: 'Title and category required' });
  }
  if (pkgData.id) {
    const idx = packages.findIndex(p => p.id === pkgData.id);
    if (idx !== -1) {
      packages[idx] = { ...packages[idx], ...pkgData };
      return res.json({ success: true, package: packages[idx] });
    }
  }
  const newPkg = {
    id: `pkg-${Date.now()}`,
    title: pkgData.title,
    subtitle: pkgData.subtitle || 'Custom Ethiopian & Outbound Tour',
    category: pkgData.category,
    location: pkgData.location || 'Ethiopia',
    durationDays: Number(pkgData.durationDays) || 3,
    priceETB: Number(pkgData.priceETB) || 20000,
    priceUSD: Number(pkgData.priceUSD) || 180,
    rating: 5.0,
    featured: pkgData.featured || false,
    image: pkgData.image || 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200',
    gallery: [pkgData.image || 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800'],
    description: pkgData.description || 'Custom package prepared by Fraol Abera Travel Agency.',
    itinerary: pkgData.itinerary || [{ day: 1, title: 'Arrival & Welcome', detail: 'Meet & greet by Fraol Abera Travel team.' }],
    inclusions: pkgData.inclusions || ['Guided services', 'Transfers'],
    exclusions: pkgData.exclusions || ['Personal expenses']
  };
  packages.unshift(newPkg);
  res.status(201).json({ success: true, package: newPkg });
});

// 4. Submit Inquiry / Ticket Request
app.post('/api/inquiries', (req, res) => {
  const {
    serviceType, customerName, phone, email, passportOrIdNumber,
    travelers, departureCity, destinationCity, departureDate, returnDate,
    preferredAirline, hotelClass, budgetCurrency, budgetAmount, notes,
    documents
  } = req.body;

  if (!customerName || !phone) {
    return res.status(400).json({ success: false, message: 'Full name and phone number are required.' });
  }

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newTicketId = `FATA-${new Date().getFullYear()}-${randomNum}`;

  const newInquiry = {
    id: newTicketId,
    createdAt: new Date().toISOString(),
    serviceType: serviceType || 'domestic_tour',
    customerName,
    phone,
    email: email || '',
    passportOrIdNumber: passportOrIdNumber || '',
    travelers: travelers || { adults: 1, children: 0, infants: 0 },
    departureCity: departureCity || 'Addis Ababa',
    destinationCity: destinationCity || 'Selected Destination',
    departureDate: departureDate || '',
    returnDate: returnDate || '',
    preferredAirline: preferredAirline || 'Ethiopian Airlines',
    hotelClass: hotelClass || 'Standard',
    budgetCurrency: budgetCurrency || 'ETB',
    budgetAmount: Number(budgetAmount) || 0,
    notes: notes || '',
    status: 'new',
    assignedAgent: 'Unassigned',
    documents: documents || [],
    receipts: [],
    adminNotes: 'Inquiry received via web portal. Awaiting agent assignment.'
  };

  inquiries.unshift(newInquiry);

  res.status(201).json({
    success: true,
    message: 'Inquiry ticket created successfully!',
    ticketId: newTicketId,
    inquiry: newInquiry
  });
});

// 5. Lookup Inquiry Ticket (Public Status Track)
app.get('/api/inquiries/:id', (req, res) => {
  const idOrPhone = req.params.id.trim();
  const found = inquiries.find(inq => 
    inq.id.toLowerCase() === idOrPhone.toLowerCase() || 
    inq.phone.replace(/\s+/g, '').includes(idOrPhone.replace(/\s+/g, ''))
  );

  if (!found) {
    return res.status(404).json({ success: false, message: 'Inquiry ticket or phone record not found.' });
  }

  res.json({ success: true, inquiry: found });
});

// 6. Admin Get All Inquiries
app.get('/api/inquiries', (req, res) => {
  res.json({ success: true, inquiries });
});

// 7. Admin Update Inquiry Status & Notes
app.patch('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const { status, adminNotes, assignedAgent, quotedAmount, quotedCurrency } = req.body;

  const inq = inquiries.find(i => i.id === id);
  if (!inq) {
    return res.status(404).json({ success: false, message: 'Inquiry not found' });
  }

  if (status) inq.status = status;
  if (adminNotes !== undefined) inq.adminNotes = adminNotes;
  if (assignedAgent) inq.assignedAgent = assignedAgent;
  if (quotedAmount !== undefined) inq.quotedAmount = Number(quotedAmount);
  if (quotedCurrency) inq.quotedCurrency = quotedCurrency;

  res.json({ success: true, inquiry: inq });
});

// 8. Upload Payment Receipt for Ticket
app.post('/api/inquiries/:id/receipt', (req, res) => {
  const { id } = req.params;
  const { transactionRef, bankName, amount, fileUrl } = req.body;

  const inq = inquiries.find(i => i.id.toLowerCase() === id.toLowerCase());
  if (!inq) {
    return res.status(404).json({ success: false, message: 'Inquiry ticket not found.' });
  }

  if (!transactionRef || !bankName || !amount) {
    return res.status(400).json({ success: false, message: 'Transaction reference, bank name, and amount are required.' });
  }

  const receiptObj = {
    transactionRef,
    bankName,
    amount: Number(amount),
    date: new Date().toISOString(),
    fileUrl: fileUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
    status: 'pending'
  };

  inq.receipts.push(receiptObj);
  inq.status = 'receipt_pending';
  inq.adminNotes = `Payment receipt uploaded (${bankName} - Ref: ${transactionRef}). Pending verification.`;

  res.json({ success: true, message: 'Payment receipt submitted for verification!', inquiry: inq });
});

// 9. Admin Verify / Reject Receipt
app.patch('/api/inquiries/:id/receipt/:ref', (req, res) => {
  const { id, ref } = req.params;
  const { status, note } = req.body; // status: 'verified' | 'rejected'

  const inq = inquiries.find(i => i.id === id);
  if (!inq) return res.status(404).json({ success: false, message: 'Inquiry not found' });

  const rc = inq.receipts.find((r: any) => r.transactionRef === ref);
  if (!rc) return res.status(404).json({ success: false, message: 'Receipt reference not found' });

  rc.status = status;
  if (status === 'verified') {
    inq.status = 'confirmed';
    inq.adminNotes = `Receipt ${ref} verified successfully. Ticket confirmed! ${note || ''}`;
  } else {
    inq.status = 'in_review';
    inq.adminNotes = `Receipt ${ref} rejected. Reason: ${note || 'Invalid payment proof'}`;
  }

  res.json({ success: true, inquiry: inq });
});

// 10. Gemini AI Assistant endpoint (Generate Itinerary, Customer Email Quote, Travel Advice)
app.post('/api/ai/generate-quote', async (req, res) => {
  try {
    const { inquiryDetails, promptType, customPrompt } = req.body;
    const ai = getGenAIClient();

    if (!ai) {
      // Fallback generator when GEMINI_API_KEY is not configured yet
      const fallbackText = `
--- OFFICIAL FRAOL ABERA TRAVEL AGENCY QUOTE ---
Dear ${inquiryDetails?.customerName || 'Valued Customer'},

Thank you for contacting Fraol Abera Travel Agency, based in Akaki Kality, Addis Ababa, Ethiopia!

We are pleased to present your customized travel quotation:
- Destination: ${inquiryDetails?.destinationCity || 'Selected Tour'}
- Passengers: ${inquiryDetails?.travelers?.adults || 1} Adult(s), ${inquiryDetails?.travelers?.children || 0} Child(ren)
- Travel Dates: ${inquiryDetails?.departureDate || 'Flexible'} to ${inquiryDetails?.returnDate || 'Flexible'}
- Estimated Total Price: ${inquiryDetails?.budgetAmount ? `${inquiryDetails.budgetAmount} ${inquiryDetails.budgetCurrency || 'ETB'}` : 'ETB 45,000 (Subject to airline live rates)'}

Included Services:
- Full flight/hotel reservations
- Official Ethiopian tour guide & ground transport
- 24/7 dedicated travel support from our Akaki Kality office team

To confirm your reservation:
Please complete a bank transfer via Telebirr (+251 92 174 1429) or CBE (1000 4567 8901 2) and upload your payment receipt directly on our website under your Inquiry Reference Number: ${inquiryDetails?.id || 'FATA-2025-xxxx'}.

Warm regards,
Fraol Abera Travel Agency Team
Akaki Kality, Addis Ababa, Ethiopia
Phone / Telegram / WhatsApp: +251 92 174 1429
      `.trim();

      return res.json({ success: true, response: fallbackText, fallback: true });
    }

    let systemInstruction = `You are the lead travel agent and operations specialist at Fraol Abera Travel Agency, located in Akaki Kality, Addis Ababa, Ethiopia. Write professional, warm, detailed, and accurate travel quotes, flight itineraries, visa guidance, or customer emails in English or Amharic (or English with Ethiopian hospitality tone). Include realistic ETB/USD prices, Ethiopian Airlines flight context, hotel options, and payment steps (Telebirr, CBE Birr).`;

    let prompt = '';
    if (promptType === 'custom_itinerary') {
      prompt = `Generate a comprehensive day-by-day travel itinerary and price quote for customer ${inquiryDetails.customerName}.\nTravel details: ${JSON.stringify(inquiryDetails)}.\nAdditional requirements: ${customPrompt || 'Provide an attractive, clear quote.'}`;
    } else if (promptType === 'customer_email') {
      prompt = `Draft an official response email to send to ${inquiryDetails.customerName} regarding inquiry ${inquiryDetails.id}.\nInclude ticket reference, cost breakdown, payment instructions (Telebirr/CBE), and contact info for Fraol Abera Travel Agency (Akaki Kality, Addis Ababa, +251911234567).`;
    } else {
      prompt = customPrompt || `Provide professional travel advice and price breakdown for inquiry ${JSON.stringify(inquiryDetails)}.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ success: true, response: response.text });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    res.status(500).json({ success: false, message: 'Failed to generate AI quote', error: err.message });
  }
});

// Vite Middleware integration for dev and static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fraol Abera Travel Agency server running on http://localhost:${PORT}`);
  });
}

startServer();
