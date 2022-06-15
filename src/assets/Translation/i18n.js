import React from "react";
import i18n from "i18next";
import backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from "react-i18next";

import fr from "./fr.json";
import en from "./en.json";
import es from "./es.json";

i18n
    .use(backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: {
            fr: fr ,
            en: en,
            es: es,
        },
        fallbackLng: "fr",
        interpolation: { escapeValue: false },
        keySeparator: false,
        react: {
            useSuspense: false,
            wait: true,
        },
    });

export default i18n;