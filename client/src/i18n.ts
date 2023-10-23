import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "ar",
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        title: "Multi-language app",
        label: "Select another language!",
        about: "About",
        home: "Home",
      },
    },
    ar: {
      translation: {
        title: "تطبيق متعدد اللغات",
        label: "اختر لغة أخرى!",
        about: "حول",
        home: "الصفحة الرئيسية",
      },
    },
  },
});

export default i18n;
