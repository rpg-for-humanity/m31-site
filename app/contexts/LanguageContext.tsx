'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLanguage = 'en-US' | 'ko-KR' | 'fr-FR';

type LanguageContextType = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  isFirstTime: boolean;
  setFirstTimeComplete: () => void;
  languageLabel: string;
  languageFlag: string;
};

const languageLabels: Record<SupportedLanguage, string> = {
  'en-US': 'English',
  'ko-KR': '한국어',
  'fr-FR': 'Français',
};

const languageFlags: Record<SupportedLanguage, string> = {
  'en-US': '🇺🇸',
  'ko-KR': '🇰🇷',
  'fr-FR': '🇫🇷',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en-US');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('m31-language');
      const firstTimeDone = localStorage.getItem('m31-language-chosen');
      
      if (saved && ['en-US', 'ko-KR', 'fr-FR'].includes(saved)) {
        setLanguageState(saved as SupportedLanguage);
      }
      
      if (firstTimeDone === 'true') {
        setIsFirstTime(false);
      }
      
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when language changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('m31-language', language);
    }
  }, [language, isLoaded]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
  };

  const setFirstTimeComplete = () => {
    setIsFirstTime(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('m31-language-chosen', 'true');
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isFirstTime,
        setFirstTimeComplete,
        languageLabel: languageLabels[language],
        languageFlag: languageFlags[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Language chip data for UI
export const languageOptions: { code: SupportedLanguage; label: string; flag: string; shortCode: string }[] = [
  { code: 'en-US', label: 'English', flag: '🇺🇸', shortCode: 'EN' },
  { code: 'ko-KR', label: '한국어', flag: '🇰🇷', shortCode: 'KR' },
  { code: 'fr-FR', label: 'Français', flag: '🇫🇷', shortCode: 'FR' },
];
