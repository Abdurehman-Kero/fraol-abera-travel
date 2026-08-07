export type Language = 'en' | 'am' | 'om';

export interface Translations {
  agencyName: string;
  agencySubtitle: string;
  phoneDisplay: string;
  phoneTel: string;
  
  // Nav
  navHome: string;
  navWhyUs: string;
  navExperiences: string;
  navDestinations: string;
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
  featuredSectionTitle: string;
  domesticShowcaseTitle: string;
  domesticShowcaseSubtitle: string;
  permitsTitle: string;
  permitsSubtitle: string;
  
  // Partners
  partnersPretitle: string;
  partnersTitle: string;
  partnerEthAir: string;
  partnerEthAirDesc: string;
  partnerTelebirr: string;
  partnerTelebirrDesc: string;
  partnerCBE: string;
  partnerCBEDesc: string;
  partnerEWCA: string;
  partnerEWCADesc: string;

  // Testimonials
  testiPretitle: string;
  testiTitle: string;
  testi1Text: string;
  testi1Role: string;
  testi1Location: string;
  testi2Text: string;
  testi2Role: string;
  testi2Location: string;
  testi3Text: string;
  testi3Role: string;
  testi3Location: string;

  // Common buttons
  viewDetails: string;
  bookNow: string;
  close: string;
  submit: string;
  all: string;
  heritage: string;
  wildlife: string;
  adventure: string;
  loading: string;
  
  // Contact
  locationTitle: string;
  locationAddress: string;
  contactHeader: string;
  footerAbout: string;
  footerServices: string;
  footerContact: string;
  footerPayments: string;
  footerCopyright: string;

  // Modals
  trackModalTitle: string;
  trackModalSubtitle: string;
  trackModalPlaceholder: string;
  trackModalSearching: string;
  trackModalSearch: string;
  receiptModalTitle: string;
  receiptModalSubtitle: string;
  receiptModalUploadBtn: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    agencyName: 'Fraol Abera Travel Agency',
    agencySubtitle: 'Akaki Kality, Addis Ababa, Ethiopia',
    phoneDisplay: '+251 92 174 1429',
    phoneTel: '+251921741429',
    
    navHome: 'Home',
    navWhyUs: 'Why Us',
    navExperiences: 'Experiences',
    navDestinations: 'Destinations',
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
    featuredSectionTitle: 'Iconic Ethiopian Expeditions & Destinations',
    domesticShowcaseTitle: 'Ethiopian Cultural & Natural Showcase',
    domesticShowcaseSubtitle: 'From Harar Jugol traditional wooden balcony architecture to 4x4 river stream crossings and mountain cloud forest safaris.',
    permitsTitle: 'National Park Permits & Local Scouts',
    permitsSubtitle: 'Official regional security clearances, park scout permits, and local village permissions arranged directly.',
    
    partnersPretitle: 'Verified & Trusted By',
    partnersTitle: 'Our Official Partners',
    partnerEthAir: 'Ethiopian Airlines',
    partnerEthAirDesc: 'Official Ticketing Partner',
    partnerTelebirr: 'Telebirr',
    partnerTelebirrDesc: 'Digital Payment Partner',
    partnerCBE: 'Commercial Bank of Ethiopia',
    partnerCBEDesc: 'Banking Partner',
    partnerEWCA: 'Ethiopian Wildlife Conservation Authority',
    partnerEWCADesc: 'Permit Partner',

    testiPretitle: 'Client Experiences',
    testiTitle: 'What Our Travelers Say',
    testi1Text: "Fraol Abera Travel handled our entire family trip to Lalibela. The flights, the local guide, and the hotel were perfectly coordinated. Highly recommend for any domestic tours!",
    testi1Role: "Domestic Traveler",
    testi1Location: "Addis Ababa",
    testi2Text: "We wanted a 4x4 expedition to the Bale Mountains but didn't know where to start. Fraol's team arranged the Land Cruiser, driver, and park permits effortlessly. A truly professional agency.",
    testi2Role: "International Tourist",
    testi2Location: "UK",
    testi3Text: "I always use Fraol for booking my domestic Ethiopian Airlines flights. They are fast, reliable, and their Telebirr payment integration makes it incredibly easy to book from anywhere.",
    testi3Role: "Frequent Flyer",
    testi3Location: "Hawassa",

    viewDetails: 'View Details & Itinerary',
    bookNow: 'Book This Tour',
    close: 'Close',
    submit: 'Submit Request',
    all: 'All Expeditions',
    heritage: 'Cultural Heritage',
    wildlife: 'Highland Wildlife',
    adventure: '4x4 Wilderness',
    loading: 'Loading domestic travel packages...',
    
    locationTitle: 'Main Office Location',
    locationAddress: 'Akaki Kality Sub-City, near Custom Station, Addis Ababa, Ethiopia',
    contactHeader: 'Contact Fraol Abera',
    footerAbout: 'Premier Ethiopian travel agency located in Akaki Kality, Addis Ababa. Specializing in domestic cultural tours, 4x4 Land Cruiser forest drives, regional flight tickets, and national park clearances.',
    footerServices: 'Our Domestic Services',
    footerContact: 'Direct Contact & Phone',
    footerPayments: 'Telebirr & Bank Payments',
    footerCopyright: 'Fraol Abera Travel Agency. Akaki Kality, Addis Ababa, Ethiopia.',
    trackModalTitle: 'Track Inquiry Ticket Status',
    trackModalSubtitle: 'Enter your Ticket Reference # (e.g. FATA-2025-1001) or phone number',
    trackModalPlaceholder: 'FATA-2025-1001 or +251 911...',
    trackModalSearching: 'Searching...',
    trackModalSearch: 'Search',
    receiptModalTitle: 'Upload Payment Receipt',
    receiptModalSubtitle: 'Submit screenshot for Telebirr or Bank Transfer',
    receiptModalUploadBtn: 'Submit Receipt'
  },
  am: {
    agencyName: 'ፍራኦል አበራ የጉዞ ኤጀንሲ',
    agencySubtitle: 'አቃቂ ቃሊቲ፡ አዲስ አበባ፡ ኢትዮጵያ',
    phoneDisplay: '+251 92 174 1429',
    phoneTel: '+251921741429',
    
    navHome: 'መነሻ',
    navWhyUs: 'ለምን እኛ',
    navExperiences: 'አገልግሎቶች',
    navDestinations: 'መዳረሻዎች',
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
    simienWildlife: 'የስሜን ጭላዳ እና የዱር እንስሳት',
    
    transportHeading: 'የሀገር ውስጥ ትራንስፖርት እና ትኬት',
    transportSubheading: 'በኢትዮጵያ አየር መንገድ በረራ ወይም በ4x4 ላንድ ክሩዘር እና ኮስተር ባስ የመኪና ጉዞ ይምረጡ።',
    flightMode: 'የሀገር ውስጥ የአውሮፕላን ትኬት',
    overland4x4Mode: 'የ4x4 ላንድ ክሩዘር የመኪና ጉዞ',
    coasterBusMode: 'የኮስተር ባስ የቡድን ትራንስፖርት',
    
    featuredTitle: 'የተመረጡ የሀገር ውስጥ ጉዞዎች',
    featuredSubtitle: 'ከአቃቂ ቃሊቲ ቢሮአችን የተዘጋጁ የሆቴል፣ የ4x4 መኪና፣ የአስጎብኚ እና የበረራ ትኬት አገልግሎቶች።',
    featuredSectionTitle: 'ታዋቂ የኢትዮጵያ ጉብኝቶች እና መዳረሻዎች',
    domesticShowcaseTitle: 'የኢትዮጵያ ባህላዊ እና ተፈጥሯዊ ገጽታዎች',
    domesticShowcaseSubtitle: 'ከሐረር ጁጎል የእንጨት በረንዳዎች እስከ የወንዝ ተሻጋሪ የ4x4 መኪና ጉዞዎች እና የባሌ ደን።',
    permitsTitle: 'የብሔራዊ ፓርክ ፈቃዶች እና ጥበቃ',
    permitsSubtitle: 'የፓርክ ፈቃዶች፣ ታጣቂ ጥበቃዎች እና የአካባቢ አስጎብኚዎች ዝግጅት።',

    partnersPretitle: 'የተረጋገጠ እና የታመነ',
    partnersTitle: 'ዋና አጋሮቻችን',
    partnerEthAir: 'የኢትዮጵያ አየር መንገድ',
    partnerEthAirDesc: 'ዋና የትኬት አጋር',
    partnerTelebirr: 'ቴሌብር',
    partnerTelebirrDesc: 'የዲጂታል ክፍያ አጋር',
    partnerCBE: 'የኢትዮጵያ ንግድ ባንክ',
    partnerCBEDesc: 'የባንክ አጋር',
    partnerEWCA: 'የኢትዮጵያ የዱር እንስሳት ጥበቃ ባለስልጣን',
    partnerEWCADesc: 'የፈቃድ አጋር',

    testiPretitle: 'የደንበኞች አስተያየት',
    testiTitle: 'ተጓዦቻችን ምን ይላሉ',
    testi1Text: "ፍራኦል አበራ የጉዞ ኤጀንሲ ወደ ላሊበላ ያደረግነውን የቤተሰብ ጉዞ በሚገባ አስተናግዶናል። በረራዎች፣ አስጎብኚዎች እና ሆቴል በጥሩ ሁኔታ ተቀናጅተዋል። ለሀገር ውስጥ ጉብኝት በጣም እመክራለሁ!",
    testi1Role: "የሀገር ውስጥ ተጓዥ",
    testi1Location: "አዲስ አበባ",
    testi2Text: "ወደ ባሌ ተራሮች በ4x4 መሄድ ፈልገን ከየት እንደምንጀምር አናውቅም ነበር። የፍራኦል ቡድን መኪናውን፣ ሹፌሩን እና የፓርኩን ፈቃድ ያለ ምንም ድካም አዘጋጅቶልናል። በእውነት ሙያዊ ኤጀንሲ ነው።",
    testi2Role: "ዓለም አቀፍ ቱሪስት",
    testi2Location: "ዩኬ",
    testi3Text: "ሁልጊዜም የኢትዮጵያ አየር መንገድ የሀገር ውስጥ በረራዎችን ለማስያዝ ፍራኦልን እጠቀማለሁ። ፈጣን እና አስተማማኝ ናቸው፤ እንዲሁም የቴሌብር ክፍያ ስላላቸው ከየትኛውም ቦታ ሆኖ ትኬት ለመቁረጥ በጣም ቀላል ነው።",
    testi3Role: "ተደጋጋሚ በራሪ",
    testi3Location: "ሀዋሳ",
    
    viewDetails: 'ዝርዝር መረጃ ይመልከቱ',
    bookNow: 'ይህንን ጉዞ ይመዝግቡ',
    close: 'ዝጋ',
    submit: 'ጥያቄውን ላክ',
    all: 'ሁሉንም ጉዞዎች',
    heritage: 'ባህላዊ ቅርሶች',
    wildlife: 'የዱር እንስሳት',
    adventure: 'የ4x4 ጉዞ',
    loading: 'የሀገር ውስጥ የጉዞ ፓኬጆችን በመጫን ላይ...',
    
    locationTitle: 'የዋናው ቢሮ አድራሻ',
    locationAddress: 'አቃቂ ቃሊቲ ክፍለ ከተማ፡ ከጉምሩክ ጣቢያ አጠገብ፡ አዲስ አበባ፡ ኢትዮጵያ',
    contactHeader: 'ፍራኦል አበራን ያነጋግሩ',
    footerAbout: 'በአቃቂ ቃሊቲ አዲስ አበባ የሚገኝ ታዋቂ የኢትዮጵያ የጉዞ ኤጀንሲ። በሀገር ውስጥ የባህል ጉብኝቶች፣ የ4x4 ላንድ ክሩዘር ጉዞዎች፣ የክልል የበረራ ትኬቶች እና የብሔራዊ ፓርክ ፈቃዶች ላይ ልዩ ባለሙያ።',
    footerServices: 'የሀገር ውስጥ አገልግሎቶቻችን',
    footerContact: 'ቀጥታ ግንኙነት እና ስልክ',
    footerPayments: 'ቴሌብር እና የባንክ ክፍያዎች',
    footerCopyright: 'ፍራኦል አበራ የጉዞ ኤጀንሲ። አቃቂ ቃሊቲ፡ አዲስ አበባ፡ ኢትዮጵያ።',
    trackModalTitle: 'የጉዞ ጥያቄ ትኬትዎን ይከታተሉ',
    trackModalSubtitle: 'የትኬት ቁጥርዎን (ለምሳሌ FATA-2025-1001) ወይም ስልክ ቁጥርዎን ያስገቡ',
    trackModalPlaceholder: 'FATA-2025-1001 ወይም +251 911...',
    trackModalSearching: 'በመፈለግ ላይ...',
    trackModalSearch: 'ፈልግ',
    receiptModalTitle: 'የክፍያ ደረሰኝ ይላኩ',
    receiptModalSubtitle: 'የቴሌብር ወይም የባንክ ዝውውር ስክሪንሾት ያያይዙ',
    receiptModalUploadBtn: 'ደረሰኝ ላክ'
  },
  om: {
    agencyName: 'Ajeensii Imala Fraol Abera',
    agencySubtitle: 'Aqaaqii Qaallitti, Addis Ababa, Itoophiyaa',
    phoneDisplay: '+251 92 174 1429',
    phoneTel: '+251921741429',
    
    navHome: 'Baqqa Fuulaa',
    navWhyUs: 'Maaliif Nuti',
    navExperiences: 'Muuxannoo',
    navDestinations: 'Bakka Gahiinsa',
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
    featuredSectionTitle: 'Iddoowwan Daawwannaa Beekkamoo Itoophiyaa',
    domesticShowcaseTitle: 'Mullata Aadaa & Umama Itoophiyaa',
    domesticShowcaseSubtitle: 'Manneen woodii Harar irraa kaasee hanga imala laga ce\'umsa konkolaataa 4x4 fi bosona Baale.',
    permitsTitle: 'Eeyyama Paarkii Biyyooleessaa & Eegduu',
    permitsSubtitle: 'Eeyyama paarkii, eegduu gootaa fi gorsitoota naannoo battalumatti qopheessuu.',

    partnersPretitle: 'Mirkanaa\'aa fi Amanamaa',
    partnersTitle: 'Michoota Keenya',
    partnerEthAir: 'Daandii Qilleensa Itoophiyaa',
    partnerEthAirDesc: 'Michuu Tikkeettii',
    partnerTelebirr: 'Telebirr',
    partnerTelebirrDesc: 'Michuu Kaffaltii Dijitaalaa',
    partnerCBE: 'Baankii Daldala Itoophiyaa',
    partnerCBEDesc: 'Michuu Baankii',
    partnerEWCA: 'Abbaa Taayitaa Eegumsa Bineensota Bosonaa Itoophiyaa',
    partnerEWCADesc: 'Michuu Eeyyamaa',

    testiPretitle: 'Muuxannoo Maamiltootaa',
    testiTitle: 'Daawwattoonni Keenya Maal Jedhu',
    testi1Text: "Ajeensiin Imala Fraol Abera imala maatii keenyaa gara Lalibelaa sirriitti qopheesseera. Balaliin, gorsaan naannoo fi hoteelli haala gaariin qindaa'aniiru. Imala biyya keessaa kamiyyuuf baay'een isin gorsa!",
    testi1Role: "Imalaa Biyya Keessaa",
    testi1Location: "Addis Ababa",
    testi2Text: "Imala 4x4 gara Gaarren Baale gochuu barbaadne garuu eessaa akka jalqabnu hin beeknu turre. Gareen Fraol konkolaataa, ogeessa fi eeyyama paarkii salphaatti nuuf qopheessaniiru. Dhugumatti ajeensii ogummaa qabudha.",
    testi2Role: "Turistii Idil-addunyaa",
    testi2Location: "UK",
    testi3Text: "Yeroo hundaa tikkeettii balalii biyya keessaa Daandii Qilleensa Itoophiyaa kutuuf Fraol nan fayyadama. Saffisoo fi amanamoodha; kaffalti Telebirr fayyadamuun bakka kamirraayyuu tikkeettii kutuun baay'ee salphaadha.",
    testi3Role: "Imalaa Yeroo Hundaa",
    testi3Location: "Hawassa",
    
    viewDetails: 'Oodeeffannoo Guutuu',
    bookNow: 'Imala Kana Galmeessi',
    close: 'Cufaa',
    submit: 'Gaaffii Ergaa',
    all: 'Imala Hundumaa',
    heritage: 'Hambaalee Aadaa',
    wildlife: 'Bineensota Umamaa',
    adventure: 'Imala 4x4',
    loading: 'Paakeejii imala biyya keessaa fidaa jira...',
    
    locationTitle: 'Teessoo Waajjira Muummee',
    locationAddress: 'Kutaa Magaalaa Aqaaqii Qaallittii, Buufata Gumruk Biratti, Addis Ababa, Itoophiyaa',
    contactHeader: 'Fraol Abera Qunnamuu',
    footerAbout: 'Ajeensii imala Itoophiyaa beekkamaa Aqaaqii Qaallittii, Addis Ababa argamu. Imala aadaa biyya keessaa, imala bosonaa konkolaataa 4x4, tikkeettii balalii naannoo fi eeyyama paarkii biyyoolessaa qopheessuu irratti kan adda bahe.',
    footerServices: 'Tajaajiloota Biyya Keessaa Keenya',
    footerContact: 'Qunnamtii Kallattii & Bilbila',
    footerPayments: 'Kaffaltii Telebirr & Baankii',
    footerCopyright: 'Ajeensii Imala Fraol Abera. Aqaaqii Qaallittii, Addis Ababa, Itoophiyaa.',
    trackModalTitle: 'Haala Tikkeettii Imalaa Hordofi',
    trackModalSubtitle: 'Lakkoofsa Tikkeettii keessanii (fakkeenyaaf FATA-2025-1001) ykn lakkoofsa bilbilaa galchaa',
    trackModalPlaceholder: 'FATA-2025-1001 ykn +251 911...',
    trackModalSearching: 'Barbaadaa jira...',
    trackModalSearch: 'Barbaadi',
    receiptModalTitle: 'Nagahee Kaffaltii Ergi',
    receiptModalSubtitle: 'Suuraa kaffaltii Telebirr ykn Baankii galchaa',
    receiptModalUploadBtn: 'Nagahee Ergi'
  }
};
