import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uzJson from "./src/i18/uz/translation.json";
import ruJson from "./src/i18/ru/translation.json";
import cyrilicJson from "./src/i18/cyrilic/translation.json";

i18n.use(initReactI18next).init({
  lng: localStorage.getItem("queueWebLanguage") || "ru",
  fallbackLng: "uz",
  resources: {
    uz: {
      translation: uzJson,
    },
    ru: {
      translation: ruJson,
    },
    cyrillic: {
      translation: cyrilicJson,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
