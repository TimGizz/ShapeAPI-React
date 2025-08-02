import { createContext } from 'react';

type LangContextType = {
    lang: 'ru' | 'en'
    setLang: (lang: 'ru' | 'en') => void
}

export const LangContext = createContext<LangContextType | undefined>(undefined);
