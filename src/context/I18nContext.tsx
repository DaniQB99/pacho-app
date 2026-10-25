import React, { createContext, useContext, useState, useMemo } from 'react';
import esTranslations from '../locales/es.json';
import enTranslations from '../locales/en.json';

type Locale = 'es' | 'en';

type TranslationsDict = Record<string, any>;

const translations: Record<Locale, TranslationsDict> = {
  es: esTranslations,
  en: enTranslations,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('pacho_locale') as Locale | null;
    if (saved === 'es' || saved === 'en') return saved;
    // Auto-detect browser language
    const navLang = navigator.language.slice(0, 2);
    return navLang === 'es' ? 'es' : 'en';
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('pacho_locale', newLocale);
  };

  const currentDict = useMemo(() => translations[locale] || translations.es, [locale]);

  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let result: any = currentDict;
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return fallback || key;
      }
    }
    return typeof result === 'string' ? result : fallback || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
