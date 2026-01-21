// Multi-language TTS utilities for RPG4H
// Supports English (en-US), Korean (ko-KR), and French (fr-FR)

export type SupportedLanguage = 'en-US' | 'ko-KR' | 'fr-FR';

// Get the best voice for a given language
export const getVoiceForLang = (
  voices: SpeechSynthesisVoice[], 
  lang: SupportedLanguage
): SpeechSynthesisVoice | null => {
  const prefix = lang.split('-')[0]; // en / ko / fr
  
  // Preferred voices by language (female voices preferred for NPC)
  const preferredVoices: Record<SupportedLanguage, string[]> = {
    'en-US': ['Samantha', 'Karen', 'Moira', 'Tessa', 'Fiona', 'Victoria', 'Zira', 'Hazel'],
    'ko-KR': ['Yuna', 'Sora', 'Heami', 'Google 한국어'],
    'fr-FR': ['Amélie', 'Audrey', 'Aurelie', 'Thomas', 'Google français'],
  };
  
  // Try preferred voices first
  for (const name of preferredVoices[lang] || []) {
    const voice = voices.find(v => v.name.includes(name));
    if (voice) return voice;
  }
  
  // Fall back to any voice matching the language prefix
  const langVoice = voices.find(v => 
    v.lang.toLowerCase().startsWith(prefix) && 
    !v.name.toLowerCase().includes('male')
  );
  if (langVoice) return langVoice;
  
  // Any voice for this language
  const anyLangVoice = voices.find(v => v.lang.toLowerCase().startsWith(prefix));
  if (anyLangVoice) return anyLangVoice;
  
  // Ultimate fallback
  return voices[0] || null;
};

// Speak text using TTS with the correct language
export const speakWithLanguage = (
  text: string,
  lang: SupportedLanguage,
  voices: SpeechSynthesisVoice[],
  options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (error: any) => void;
  }
): void => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    options?.onError?.('Speech synthesis not supported');
    return;
  }
  
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  
  const voice = getVoiceForLang(voices, lang);
  if (voice) utterance.voice = voice;
  
  utterance.rate = options?.rate ?? 1.0;
  utterance.pitch = options?.pitch ?? 1.2;
  utterance.volume = options?.volume ?? 1.0;
  
  if (options?.onStart) {
    utterance.onstart = options.onStart;
  }
  
  if (options?.onEnd) {
    utterance.onend = options.onEnd;
  }
  
  if (options?.onError) {
    utterance.onerror = (event) => options.onError?.(event);
  }
  
  window.speechSynthesis.speak(utterance);
};

// Speech recognition language mapping
export const getSpeechRecognitionLang = (lang: SupportedLanguage): string => {
  return lang; // Direct mapping works for these languages
};

// Get localStorage language or default
export const getStoredLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return 'en-US';
  
  const stored = localStorage.getItem('m31-language');
  if (stored && ['en-US', 'ko-KR', 'fr-FR'].includes(stored)) {
    return stored as SupportedLanguage;
  }
  return 'en-US';
};

// Language display info
export const languageInfo: Record<SupportedLanguage, { flag: string; label: string; shortCode: string }> = {
  'en-US': { flag: '🇺🇸', label: 'English', shortCode: 'EN' },
  'ko-KR': { flag: '🇰🇷', label: '한국어', shortCode: 'KR' },
  'fr-FR': { flag: '🇫🇷', label: 'Français', shortCode: 'FR' },
};
