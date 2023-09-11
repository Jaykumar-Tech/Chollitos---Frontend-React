import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from "./Components/Routes";
import Navbar from './Layouts';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './Lang/en.json';
import esTranslation from './Lang/es.json';
import { _t } from './Utils/_t';
import { useEffect, useState } from 'react';

function App() {
  const [language, setLanguage] = useState('en');

  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: enTranslation,
        },
        es: {
          translation: esTranslation,
        },
      },
      lng: language, // Default language
      fallbackLng: 'en', // Fallback language if translation is missing
      interpolation: {
        escapeValue: false, // React already escapes values by default
      },
    });

  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
