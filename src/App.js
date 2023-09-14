import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from "./Components/Routes";
import Navbar from './Layouts';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './Lang/en.json';
import esTranslation from './Lang/es.json';
import { useEffect, useState } from 'react';
import { getLangService } from './Services/Lang';

function App() {
  const [language, setLanguage] = useState('en');
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const getLangFunc = async () => {
      var response = await getLangService();
      setLanguage(response?.data?.data)
      setLoading(false)
    }
    getLangFunc();
  }, [])

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
      fallbackLng: language, // Fallback language if translation is missing
      interpolation: {
        escapeValue: false, // React already escapes values by default
      },
    });

  return (
    <>
      {!isLoading &&
        <BrowserRouter>
          <Navbar />
          <Routes />
        </BrowserRouter>
      }
    </>
  );
}

export default App;
