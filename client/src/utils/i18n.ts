import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const ar = require("./languages/ar.json");
const en = require("./languages/en.json");

i18n.use(initReactI18next).init({
  lng: "ar",
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
});

export default i18n;
