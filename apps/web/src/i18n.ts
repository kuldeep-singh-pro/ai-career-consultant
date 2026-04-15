import i18n from "i18next";

import {
  initReactI18next,
} from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        dashboard: "Dashboard",
        profile: "Profile",
        settings: "Settings",
      },
    },

    hi: {
      translation: {
        dashboard: "डैशबोर्ड",
        profile: "प्रोफ़ाइल",
        settings: "सेटिंग्स",
      },
    },
  },

  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;