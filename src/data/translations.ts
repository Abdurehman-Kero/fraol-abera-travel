export type Language = 'en' | 'am' | 'om';

export interface Translations {
  agencyName: string;
  agencySubtitle: string;
  phoneDisplay: string;
  phoneTel: string;
  
  // Nav
  navHome: string;
  navExpeditions: string;
  navTransport: string;
  navPermits: string;
  navTrack: string;
  navAdmin: string;
  bookInquiry: string;
  mobileNavCall: string;
  mobileNavPlan: string;
  mobileNavTrack: string;
  
  // Hero
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroActionInquire: string;
  heroActionTrack: string;
  heroCallNow: string;
  quickInquiryTitle: string;
  quickInquirySubtitle: string;
  
  // Service Types
  historicTours: string;
  domesticFlightsAndDrive: string;
  wilderness4x4: string;
  simienWildlife: string;
  
  // Transport Modes
  transportHeading: string;
  transportSubheading: string;
  flightMode: string;
  overland4x4Mode: string;
  coasterBusMode: string;
  
  // Sections
  featuredTitle: string;
  featuredSubtitle: string;
  domesticShowcaseTitle: string;
  domesticShowcaseSubtitle: string;
  permitsTitle: string;
  permitsSubtitle: string;
  
  // Common buttons
  viewDetails: string;
  bookNow: string;
  close: string;
  submit: string;
  all: string;
  heritage: string;
  wildlife: string;
  adventure: string;
  
  // Contact
  locationTitle: string;
  locationAddress: string;
  contactHeader: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    agencyName: 'Fraol Abera Travel Agency',
    agencySubtitle: 'Akaki Kality, Addis Ababa, Ethiopia',
    phoneDisplay: '+251 92 174 1429',
    phoneTel: '+251921741429',
    
    navHome: 'Home',
    navExpeditions: 'Domestic Tours',
    navTransport: 'Flights & Drive',
    navPermits: 'Park Clearances',
    navTrack: 'Track Inquiry',
    navAdmin: 'Agent Portal',
    bookInquiry: 'Book / Inquire',
    mobileNavCall: 'Call Fraol',
    mobileNavPlan: 'Plan Trip',
    mobileNavTrack: 'Track Status',
    
    heroTagline: 'Ethiopian Domestic Travel & Expedition Specialist',
    heroTitle: 'Discover Ethiopia\'s Natural & Historical Treasures',
    heroSubtitle: 'Tailored Ethiopian trips by domestic flight or 4x4 overland transport. Harar balcony architecture, Lalibela rock churches, Simien Gelada baboons, Bale Harenna cloud forest, and Danakil Depression.',
    heroActionInquire: 'Plan Domestic Trip',
    heroActionTrack: 'Track My Booking',
    heroCallNow: 'Call Fraol Abera',
    quickInquiryTitle: 'Quick Domestic Inquiry',
    quickInquirySubtitle: 'Select a travel option to receive custom price quotes within hours:',
    
    historicTours: 'Historic & Cultural Heritage',
    domesticFlightsAndDrive: 'Flights & 4x4 Overland Drives',
    wilderness4x4: 'Cloud Forests & Wilderness 4x4',
    simienWildlife: 'Simien Gelada & Wildlife',
    
    transportHeading: 'Domestic Transport & Route Ticketing',
    transportSubheading: 'Choose between fast domestic flights with Ethiopian Airlines or private 4x4 Land Cruiser & Coaster bus overland travel across all regional states.',
    flightMode: 'Domestic Flight Tickets',
    overland4x4Mode: '4x4 Land Cruiser Safari Drive',
    coasterBusMode: 'Coaster Bus & Group Transport',
    
    featuredTitle: 'Featured Domestic Expeditions',
    featuredSubtitle: 'Handcrafted itineraries with hotel lodges, 4x4 vehicles, local guides, and regional tickets managed from Akaki Kality.',
    domesticShowcaseTitle: 'Ethiopian Cultural & Natural Showcase',
    domesticShowcaseSubtitle: 'From Harar Jugol traditional wooden balcony architecture to 4x4 river stream crossings and mountain cloud forest safaris.',
    permitsTitle: 'National Park Permits & Local Scouts',
    permitsSubtitle: 'Official regional security clearances, park scout permits, and local village permissions arranged directly.',
    
    viewDetails: 'View Details & Itinerary',
    bookNow: 'Book This Tour',
    close: 'Close',
    submit: 'Submit Request',
    all: 'All Expeditions',
    heritage: 'Cultural Heritage',
    wildlife: 'Highland Wildlife',
    adventure: '4x4 Wilderness',
    
    locationTitle: 'Main Office Location',
    locationAddress: 'Akaki Kality Sub-City, near Custom Station, Addis Ababa, Ethiopia',
    contactHeader: 'Contact Fraol Abera'
  },
  am: {
    agencyName: 'ፍራኦል አበራ የጉዞ ኤጀንሲ',
    agencySubtitle: 'አቃቂ ቃሊቲ፡ አዲስ አበባ፡ ኢትዮጵያ',
    phoneDisplay: '+251 92 174 1429',
    phoneTel: '+251921741429',
    
    navHome: 'መነሻ',
    navExpeditions: 'የሀገር ውስጥ ጉዞዎች',
    navTransport: 'በረራ እና የመኪና ጉዞ',
    navPermits: 'የፓርክ ፈቃዶች',
    navTrack: 'ጉዞ መከታተያ',
    navAdmin: 'የኤጀንት መግቢያ',
    bookInquiry: 'ጉዞ ይመዝግቡ',
    mobileNavCall: 'ይደውሉልን',
    mobileNavPlan: 'ጉዞ ያቅዱ',
    mobileNavTrack: 'ይከታተሉ',
    
    heroTagline: 'የሀገር ውስጥ ቱሪዝም እና የጉዞ ባለሙያ',
    heroTitle: 'የኢትዮጵያን ተፈጥሯዊ እና ታሪካዊ ድንቆች ይጎብኙ',
    heroSubtitle: 'በአውሮፕላን ወይም በ4x4 ላንድ ክሩዘር መኪና የተዘጋጁ የሀገር ውስጥ ጉዞዎች፡ የሐረር ጁጎል በረንዳ ህንፃዎች፣ የላሊበላ ውቅር አብያተ ክርስቲያናት፣ የስሜን ጭላዳ ባቡን፣ የባሌ ሀረና ደን እና የዳናኪል በረሃ።',
    heroActionInquire: 'ጉዞ ይጀምሩ',
    heroActionTrack: 'ትኬት ይከታተሉ',
    heroCallNow: 'ለፍራኦል አበራ ይደውሉ',
    quickInquiryTitle: 'ፈጣን የጉዞ ጥያቄ',
    quickInquirySubtitle: 'የሚፈልጉትን የጉዞ አይነት በመምረጥ የዋጋ ተመን በፍጥነት ያግኙ፡',
    
    historicTours: 'ታሪካዊ እና ባህላዊ ቅርሶች',
    domesticFlightsAndDrive: 'የሀገር ውስጥ በረራ እና የመኪና ጉዞ',
    wilderness4x4: 'የባሌ ደን እና የ4x4 ጉዞ',
    simienWildlife: 'የስሜን ተ his ጭላዳ እና የዱር እንስሳት',
    
    transportHeading: 'የሀገር ውስጥ ትራንስፖርት እና ትኬት',
    transportSubheading: 'በኢትዮጵያ አየር መንገድ በረራ ወይም በ4x4 ላንድ ክሩዘር እና ኮስተር ባስ የመኪና ጉዞ ይምረጡ።',
    flightMode: 'የሀገር ውስጥ የአውሮፕላን ትኬት',
    overland4x4Mode: 'የ4x4 ላንድ ክሩዘር የመኪና ጉዞ',
    coasterBusMode: 'የኮስተር ባስ የቡድን ትራንስፖርት',
    
    featuredTitle: 'የተመረጡ የሀገር ውስጥ ጉዞዎች',
    featuredSubtitle: 'ከአቃቂ ቃሊቲ ቢሮአችን የተዘጋጁ የሆቴል፣ የ4x4 መኪና፣ የአስጎብኚ እና የበረራ ትኬት አገልግሎቶች።',
    domesticShowcaseTitle: 'የኢትዮጵያ ባህላዊ እና ተፈጥሯዊ ገጽታዎች',
    domesticShowcaseSubtitle: 'ከሐረር ጁጎል የእንጨት በረንዳዎች እስከ የወንዝ ተሻጋሪ የ4x4 መኪና ጉዞዎች እና የባሌ ደን።',
    permitsTitle: 'የብሔራዊ ፓርክ ፈቃዶች እና ጥበቃ',
    permitsSubtitle: 'የፓርክ ፈቃዶች፣ ታጣቂ ጥበቃዎች እና የአካባቢ አስጎብኚዎች ዝግጅት።',
    
    viewDetails: 'ዝርዝር መረጃ ይመልከቱ',
    bookNow: 'ይህንን ጉዞ ይመዝግቡ',
    close: 'ዝጋ',
    submit: 'ጥያቄውን ላክ',
    all: 'ሁሉንም ጉዞዎች',
    heritage: 'ባህላዊ ቅርሶች',
    wildlife: 'የዱር እንስሳት',
    adventure: 'የ4x4 ጉዞ',
    
    locationTitle: 'የዋናው ቢሮ አድራሻ',
    locationAddress: 'አቃቂ ቃሊቲ ክፍለ ከተማ፡ ከጉምሩክ ጣቢያ አጠገብ፡ አዲስ አበባ፡ ኢትዮጵያ',
    contactHeader: 'ፍራኦል አበራን ያነጋግሩ'
  },
  om: {
    agencyName: 'Ajeensii Imala Fraol Abera',
    agencySubtitle: 'Aqaaqii Qaallitti, Addis Ababa, Itoophiyaa',
    phoneDisplay: '+251 92 174 1429',
    phoneTel: '+251921741429',
    
    navHome: 'Baqqa Fuulaa',
    navExpeditions: 'Imala Biyya Keessaa',
    navTransport: 'Balalii & Konkolaataa',
    navPermits: 'Eeyyama Paarkii',
    navTrack: 'Hordoffii Imala',
    navAdmin: 'Seensa Eejentii',
    bookInquiry: 'Imala Galmeessi',
    mobileNavCall: 'Nuuf Bilbilaa',
    mobileNavPlan: 'Imala Karoorsi',
    mobileNavTrack: 'Hordofi',
    
    heroTagline: 'Ogessaa Imala & Turizimii Biyya Keessaa',
    heroTitle: 'Qabeenya Umamaa & Seenaa Itoophiyaa Daawwadhaa',
    heroSubtitle: 'Imala keessoo biyyooleessaa xiyyaaraan ykn konkolaataa 4x4 Land Cruiser\'n qophaa\'e: Gamoo Gammoojjii Harar, Manneen Sagadaa Lalibela, Qamalee Simien Gelada, Daggala Baale Harennaa fi Haroo Danakil.',
    heroActionInquire: 'Imala Jalqabaa',
    heroActionTrack: 'Tikkeettii Hordofaa',
    heroCallNow: 'Fraol Abera Bilbilaa',
    quickInquiryTitle: 'Gaaffii Imala Ariifachiisaa',
    quickInquirySubtitle: 'Gosa imala barbaaddan filachuun gatii ariitiin argadhaa:',
    
    historicTours: 'Hambaalee Seenaa & Aadaa',
    domesticFlightsAndDrive: 'Balalii Biyya Keessaa & 4x4 Konkolaataa',
    wilderness4x4: 'Bosona Baale & Imala 4x4',
    simienWildlife: 'Bineensota Simien & Gelada',
    
    transportHeading: 'Geejjiba Biyya Keessaa & Tikkeettii',
    transportSubheading: 'Xiyyaara Itoophiyaan balali\'uu ykn konkolaataa 4x4 Land Cruiser fi Konkolaataa Coaster Bus filadhaa.',
    flightMode: 'Tikkeettii Xiyyaara Biyya Keessaa',
    overland4x4Mode: 'Imala Konkolaataa 4x4 Land Cruiser',
    coasterBusMode: 'Geejjiba Garee Coaster Bus',
    
    featuredTitle: 'Imala Biyya Keessaa Filatamoos',
    featuredSubtitle: 'Hoteloota, konkolaataa 4x4, gorsitoota naannoo fi tikkeettii waajjira Aqaaqii Qaallittii irraa qophaa\'e.',
    domesticShowcaseTitle: 'Mullata Aadaa & Umama Itoophiyaa',
    domesticShowcaseSubtitle: 'Manneen woodii Harar irraa kaasee hanga imala laga ce\'umsa konkolaataa 4x4 fi bosona Baale.',
    permitsTitle: 'Eeyyama Paarkii Biyyooleessaa & Eegduu',
    permitsSubtitle: 'Eeyyama paarkii, eegduu gootaa fi gorsitoota naannoo battalumatti qopheessuu.',
    
    viewDetails: 'Oodeeffannoo Guutuu',
    bookNow: 'Imala Kana Galmeessi',
    close: 'Cufaa',
    submit: 'Gaaffii Ergaa',
    all: 'Imala Hundumaa',
    heritage: 'Hambaalee Aadaa',
    wildlife: 'Bineensota Umamaa',
    adventure: 'Imala 4x4',
    
    locationTitle: 'Teessoo Waajjira Muummee',
    locationAddress: 'Kutaa Magaalaa Aqaaqii Qaallittii, Buufata Gumruk Biratti, Addis Ababa, Itoophiyaa',
    contactHeader: 'Fraol Abera Qunnamuu'
  }
};
