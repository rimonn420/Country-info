import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      search_placeholder: "Search by country or capital...",
      loading: "Loading countries...",
      error: "Failed to fetch countries. Try again later.",
      no_country_found: "No country found",
      capital: "Capital",
      region: "Region",
      population: "Population",
      area: "Area",
      currency: "Currency",
      language: "Language",
      note: "Note",
      view_map: "View {{capital}} on Google Maps",
      close: "Close",
      created_by: "Created by Rimon",
    },
  },
  bn: {
    translation: {
      welcome: "স্বাগতম",
      search_placeholder: "দেশ বা রাজধানী অনুসন্ধান করুন...",
      loading: "দেশগুলি লোড হচ্ছে...",
      error: "দেশগুলি আনার সময় সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।",
      no_country_found: "কোনো দেশ পাওয়া যায়নি",
      capital: "রাজধানী",
      region: "অঞ্চল",
      population: "জনসংখ্যা",
      area: "অবস্থান",
      currency: "মুদ্রা",
      language: "ভাষা",
      note: "নোট",
      view_map: "{{capital}}-এর গুগল মানচিত্র দেখুন",
      close: "বন্ধ করুন",
      created_by: "রিমন দ্বারা তৈরি",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // ডিফল্ট ভাষা English
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
