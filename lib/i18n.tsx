'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * App dictionary. We keep your existing keys AND add the missing ones
 * used on the hero and feature tiles so raw keys no longer show up.
 */
const dictionary: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.venues': 'Venues',
    'nav.tournaments': 'Tournaments',
    'nav.catalog': 'Catalog',
    'nav.profile': 'Profile',
    'nav.community': 'Community',
    'nav.organizer': 'Organizer',
    'nav.skipToContent': 'Skip to content',

    // a11y / CTA (ADDED)
    'a11y.skip.content': 'Skip to content',
    'cta.find.court': 'Find a court',
    'cta.find.tournament': 'Find a tournament',

    // Common
    'common.book': 'Book',
    'common.register': 'Register',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.loading': 'Loading',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.price': 'Price',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.location': 'Location',
    'common.capacity': 'Capacity',
    'common.available': 'Available',
    'common.booked': 'Booked',
    'common.comingSoon': 'Coming Soon',

    // Home (kept your originals + ADDED the ones your UI calls)
    'home.title': 'PickleBay',
    'home.subtitle': 'Zero-drama pickleball: book instantly, compete transparently, belong.',
    'home.exploreVenues': 'Explore Venues',
    'home.joinTournaments': 'Join Tournaments',
    'home.shopGear': 'Shop Gear',

    // ADDED: hero & tiles keys actually used on page.tsx
    'home.everything': 'Everything you need for pickleball',
    'home.everything.sub': 'Discover venues, join tournaments, and get the best gear',
    'home.venues': 'Explore Venues',
    'home.venues.sub': 'Find and book courts across NCR',
    'home.tournaments': 'Join Tournaments',
    'home.tournaments.sub': 'Compete in local tournaments',
    'home.catalog': 'Shop Gear',
    'home.catalog.sub': 'Browse premium equipment',

    // Venues
    'venues.title': 'Find Venues',
    'venues.searchPlaceholder': 'Search venues...',
    'venues.filters.city': 'City',
    'venues.filters.date': 'Date',
    'venues.filters.priceRange': 'Price Range',
    'venues.filters.amenities': 'Amenities',
    'venues.perHour': 'per hour',
    'venues.courts': 'courts',
    'venues.selectSlot': 'Select a slot to book',
    'venues.proceedToCheckout': 'Proceed to Checkout',

    // Tournaments
    'tournaments.title': 'Tournaments',
    'tournaments.searchPlaceholder': 'Search tournaments...',
    'tournaments.filters.level': 'Skill Level',
    'tournaments.entryFee': 'Entry Fee',
    'tournaments.participants': 'Participants',
    'tournaments.registrationOpen': 'Registration Open',
    'tournaments.bracket': 'Tournament Bracket',

    // Profile
    'profile.title': 'Profile',
    'profile.language': 'Language',
    'profile.seniorMode': 'Senior Mode',
    'profile.skillLevel': 'Skill Level',
    'profile.preferredTimes': 'Preferred Times',
    'profile.myBookings': 'My Bookings',
    'profile.myRegistrations': 'My Registrations',

    // Checkout
    'checkout.title': 'Checkout',
    'checkout.bookingDetails': 'Booking Details',
    'checkout.contactInfo': 'Contact Information',
    'checkout.paymentMethod': 'Payment Method',
    'checkout.upi': 'UPI',
    'checkout.card': 'Card',
    'checkout.total': 'Total',
    'checkout.confirmBooking': 'Confirm Booking',

    // Success
    'success.bookingConfirmed': 'Booking Confirmed!',
    'success.addToCalendar': 'Add to Calendar',
    'success.bookingReference': 'Booking Reference',
  },

  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.venues': 'स्थल',
    'nav.tournaments': 'टूर्नामेंट',
    'nav.catalog': 'कैटलॉग',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.community': 'समुदाय',
    'nav.organizer': 'आयोजक',
    'nav.skipToContent': 'सामग्री पर जाएं',

    // a11y / CTA (ADDED)
    'a11y.skip.content': 'सामग्री पर जाएँ',
    'cta.find.court': 'कोर्ट खोजें',
    'cta.find.tournament': 'टूर्नामेंट खोजें',

    // Common
    'common.book': 'बुक करें',
    'common.register': 'रजिस्टर करें',
    'common.cancel': 'रद्द करें',
    'common.confirm': 'पुष्टि करें',
    'common.search': 'खोजें',
    'common.filter': 'फिल्टर',
    'common.loading': 'लोड हो रहा है',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.close': 'बंद करें',
    'common.next': 'अगला',
    'common.previous': 'पिछला',
    'common.save': 'सेव करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.view': 'देखें',
    'common.price': 'मूल्य',
    'common.date': 'तारीख',
    'common.time': 'समय',
    'common.location': 'स्थान',
    'common.capacity': 'क्षमता',
    'common.available': 'उपलब्ध',
    'common.booked': 'बुक किया गया',
    'common.comingSoon': 'जल्द आ रहा है',

    // Home (kept + ADDED matching keys)
    'home.title': 'पिकलबे',
    'home.subtitle': 'शुद्ध पिकलबॉल: तुरंत बुक करें, पारदर्शी रूप से प्रतिस्पर्धा करें, साथ रहें।',
    'home.exploreVenues': 'स्थल देखें',
    'home.joinTournaments': 'टूर्नामेंट में शामिल हों',
    'home.shopGear': 'गियर खरीदें',

    // ADDED
    'home.everything': 'पिकलबॉल के लिए आपकी हर ज़रूरत',
    'home.everything.sub': 'स्थल खोजें, टूर्नामेंट में जुड़ें, और बेहतरीन गियर पाएं',
    'home.venues': 'स्थल देखें',
    'home.venues.sub': 'एनसीआर में कोर्ट खोजें और बुक करें',
    'home.tournaments': 'टूर्नामेंट में शामिल हों',
    'home.tournaments.sub': 'स्थानीय टूर्नामेंट में प्रतिस्पर्धा करें',
    'home.catalog': 'गियर खरीदें',
    'home.catalog.sub': 'प्रीमियम उपकरण ब्राउज़ करें',

    // Venues
    'venues.title': 'स्थल खोजें',
    'venues.searchPlaceholder': 'स्थल खोजें...',
    'venues.filters.city': 'शहर',
    'venues.filters.date': 'तारीख',
    'venues.filters.priceRange': 'मूल्य सीमा',
    'venues.filters.amenities': 'सुविधाएं',
    'venues.perHour': 'प्रति घंटा',
    'venues.courts': 'कोर्ट',
    'venues.selectSlot': 'बुकिंग के लिए स्लॉट चुनें',
    'venues.proceedToCheckout': 'चेकआउट पर जाएं',

    // Tournaments
    'tournaments.title': 'टूर्नामेंट',
    'tournaments.searchPlaceholder': 'टूर्नामेंट खोजें...',
    'tournaments.filters.level': 'कौशल स्तर',
    'tournaments.entryFee': 'प्रवेश शुल्क',
    'tournaments.participants': 'प्रतिभागी',
    'tournaments.registrationOpen': 'पंजीकरण खुला',
    'tournaments.bracket': 'टूर्नामेंट ब्रैकेट',

    // Profile
    'profile.title': 'प्रोफ़ाइल',
    'profile.language': 'भाषा',
    'profile.seniorMode': 'सीनियर मोड',
    'profile.skillLevel': 'कौशल स्तर',
    'profile.preferredTimes': 'पसंदीदा समय',
    'profile.myBookings': 'मेरी बुकिंग',
    'profile.myRegistrations': 'मेरे पंजीकरण',

    // Checkout
    'checkout.title': 'चेकआउट',
    'checkout.bookingDetails': 'बुकिंग विवरण',
    'checkout.contactInfo': 'संपर्क जानकारी',
    'checkout.paymentMethod': 'भुगतान विधि',
    'checkout.upi': 'यूपीआई',
    'checkout.card': 'कार्ड',
    'checkout.total': 'कुल',
    'checkout.confirmBooking': 'बुकिंग की पुष्टि करें',

    // Success
    'success.bookingConfirmed': 'बुकिंग की पुष्टि!',
    'success.addToCalendar': 'कैलेंडर में जोड़ें',
    'success.bookingReference': 'बुकिंग संदर्भ',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('picklebay_language') as Language;
    if (saved && ['en', 'hi'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('picklebay_language', lang);
  };

  const t = (key: string): string => {
    return dictionary[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useI18n must be used within LanguageProvider');
  }
  return context;
}

/** Legacy shim to avoid breaking older imports */
export function useLanguage() {
  return useI18n();
}
