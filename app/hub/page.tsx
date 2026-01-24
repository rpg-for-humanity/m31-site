'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { languageOptions, SupportedLanguage } from '../contexts/LanguageContext';
import posthog from 'posthog-js';

type Track = 'player' | 'creator';

export default function HubPage() {
  const router = useRouter();
  const [activeTrack, setActiveTrack] = useState<Track>('player');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en-US');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [coins, setCoins] = useState(50);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load language preference
      const savedLang = localStorage.getItem('m31-language');
      const firstTimeDone = localStorage.getItem('m31-language-chosen');
      
      if (savedLang && ['en-US', 'ko-KR', 'fr-FR'].includes(savedLang)) {
        setSelectedLanguage(savedLang as SupportedLanguage);
      }
      
      if (firstTimeDone === 'true') {
        setIsFirstTime(false);
      }

      // Load coins
      const savedData = localStorage.getItem('m31-coffee-save');
      if (savedData) {
        const data = JSON.parse(savedData);
        if (data.coins !== undefined) setCoins(data.coins);
      }
      
      setIsLoaded(true);
    }
  }, []);

  const getCurrentLangOption = () => {
    return languageOptions.find(l => l.code === selectedLanguage) || languageOptions[0];
  };

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    setSelectedLanguage(lang);
    localStorage.setItem('m31-language', lang);
    localStorage.setItem('m31-language-chosen', 'true');
    setIsFirstTime(false);
    setShowLanguageModal(false);
    setShowLanguageDropdown(false);

    // Track language selection event
    posthog.capture('language_selected', {
      language_code: lang,
      language_name: languageOptions.find(l => l.code === lang)?.label || 'Unknown',
    });
  };

  const handlePlayWithLanguage = (lang: SupportedLanguage) => {
    // Set language and navigate to game
    localStorage.setItem('m31-language', lang);
    localStorage.setItem('m31-language-chosen', 'true');

    // Track outpost started event
    posthog.capture('outpost_started', {
      outpost_name: 'Coffee Outpost',
      language_code: lang,
      language_name: languageOptions.find(l => l.code === lang)?.label || 'Unknown',
    });

    router.push('/test/convoset');
  };

  const handleTileClick = () => {
    if (isFirstTime) {
      setShowLanguageModal(true);
    } else {
      // Track outpost started event
      posthog.capture('outpost_started', {
        outpost_name: 'Coffee Outpost',
        language_code: selectedLanguage,
        language_name: languageOptions.find(l => l.code === selectedLanguage)?.label || 'Unknown',
      });

      router.push('/test/convoset');
    }
  };

  const handleStartFromModal = () => {
    localStorage.setItem('m31-language', selectedLanguage);
    localStorage.setItem('m31-language-chosen', 'true');
    setIsFirstTime(false);
    setShowLanguageModal(false);

    // Track outpost started event
    posthog.capture('outpost_started', {
      outpost_name: 'Coffee Outpost',
      language_code: selectedLanguage,
      language_name: languageOptions.find(l => l.code === selectedLanguage)?.label || 'Unknown',
      is_first_time: true,
    });

    router.push('/test/convoset');
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black flex items-center justify-center">
        <div className="text-white/50 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-lg">
              M31
            </div>
            <span className="text-xl font-semibold tracking-tight">
              RPG for Human
              <span className="relative">
                ı
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[8px] text-cyan-400">✦</span>
              </span>
              ty
            </span>
          </div>

          {/* Right side: Language pill + Coins */}
          <div className="flex items-center gap-4">
            {/* Language Pill Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full transition text-sm font-medium"
              >
                <span>{getCurrentLangOption().flag}</span>
                <span>{getCurrentLangOption().shortCode}</span>
                <span className="text-white/50">▾</span>
              </button>
              
              {showLanguageDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-zinc-800 rounded-xl overflow-hidden shadow-xl border border-zinc-700 min-w-[160px]">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-zinc-700 transition text-left ${
                        selectedLanguage === lang.code ? 'bg-zinc-700' : ''
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.label}</span>
                      {selectedLanguage === lang.code && (
                        <span className="ml-auto text-cyan-400">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Coins Display */}
            <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-yellow-500/30">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center">
                <span className="text-xs font-bold text-yellow-900">K</span>
              </div>
              <span className="text-yellow-400 font-bold">{coins}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Track Switcher */}
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => {
              setActiveTrack('player');
              posthog.capture('track_switched', { track: 'player' });
            }}
            className={`px-6 py-3 rounded-full font-semibold text-lg transition-all ${
              activeTrack === 'player'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            🎮 Player
          </button>
          <button
            onClick={() => {
              setActiveTrack('creator');
              posthog.capture('track_switched', { track: 'creator' });
            }}
            className={`px-6 py-3 rounded-full font-semibold text-lg transition-all ${
              activeTrack === 'creator'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            ✏️ Creator
          </button>
        </div>

        {/* Player Track Content */}
        {activeTrack === 'player' && (
          <div className="space-y-10">
            {/* Section: Outposts */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">🏪</span>
                Outposts
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Coffee Outpost - ACTIVE */}
                <div 
                  className="group relative rounded-2xl overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20"
                >
                  {/* Card Background */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-amber-900 via-orange-900 to-brown-900 relative">
                    <img 
                      src="/coffeepost.png" 
                      alt="Coffee Outpost"
                      className="absolute inset-0 w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    {/* Difficulty Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-green-500/90 text-xs font-bold text-white">
                      BEGINNER
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold mb-1">☕ Coffee Outpost</h3>
                      <p className="text-sm text-white/70 mb-3">Take coffee orders from customers</p>
                      
                      {/* Language Chips - Netflix style */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-white/50 uppercase tracking-wide">Play in:</span>
                        {languageOptions.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayWithLanguage(lang.code);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                              selectedLanguage === lang.code
                                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                                : 'bg-white/20 hover:bg-white/30 text-white'
                            }`}
                          >
                            {lang.shortCode}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Overlay - Play Button */}
                  <div 
                    onClick={handleTileClick}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                      <span className="text-black text-3xl ml-1">▶</span>
                    </div>
                  </div>
                </div>

                {/* Airport Check-In - COMING SOON */}
                <div className="relative rounded-2xl overflow-hidden opacity-60 cursor-not-allowed">
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-zinc-600 text-xs font-bold text-white">
                      COMING SOON
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold mb-1">✈️ Airport Check-In</h3>
                      <p className="text-sm text-white/70">Navigate international travel</p>
                    </div>
                    
                    {/* Lock Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl">🔒</div>
                    </div>
                  </div>
                </div>

                {/* Restaurant - COMING SOON */}
                <div className="relative rounded-2xl overflow-hidden opacity-60 cursor-not-allowed">
                  <div className="aspect-[4/3] bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-zinc-600 text-xs font-bold text-white">
                      COMING SOON
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold mb-1">🍽️ Restaurant</h3>
                      <p className="text-sm text-white/70">Take orders & handle reservations</p>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl">🔒</div>
                    </div>
                  </div>
                </div>

                {/* Hospital - COMING SOON */}
                <div className="relative rounded-2xl overflow-hidden opacity-60 cursor-not-allowed">
                  <div className="aspect-[4/3] bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-zinc-600 text-xs font-bold text-white">
                      COMING SOON
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold mb-1">🏥 Medical Office</h3>
                      <p className="text-sm text-white/70">Describe symptoms & understand instructions</p>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl">🔒</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Your M31 World */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">🌌</span>
                Your M31 World
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inventory */}
                <div 
                  onClick={() => router.push('/test/convoset')}
                  className="group rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 cursor-pointer hover:from-zinc-700 hover:to-zinc-800 transition-all border border-zinc-700 hover:border-zinc-600"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-4xl">🏪</div>
                    <div>
                      <h3 className="text-xl font-bold">Inventory</h3>
                      <p className="text-sm text-zinc-400">View your buildings & items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all">
                    <span>Open Inventory</span>
                    <span>→</span>
                  </div>
                </div>

                {/* Customize Kokorobot - GREYED OUT */}
                <div className="relative rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 border border-zinc-800 opacity-60 cursor-not-allowed">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-4xl grayscale">🤖</div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-400">Customize Kokorobot</h3>
                      <p className="text-sm text-zinc-500">Change hairstyles, suits & colors</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-zinc-700/50 px-3 py-1.5 rounded-full text-sm text-zinc-400">
                    <span>🔒</span>
                    <span>Coming Soon</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Creator Track Content */}
        {activeTrack === 'creator' && (
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">✏️</span>
                Creator Studio
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Create New Dialogue Set */}
                <div className="relative rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 border border-zinc-800 border-dashed opacity-60 cursor-not-allowed">
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">➕</div>
                    <h3 className="text-xl font-bold text-zinc-400 mb-2">Create New Dialogue Set</h3>
                    <p className="text-sm text-zinc-500 mb-4">Build conversations for any outpost</p>
                    <div className="inline-flex items-center gap-2 bg-zinc-700/50 px-3 py-1.5 rounded-full text-sm text-zinc-400">
                      <span>🔒</span>
                      <span>Coming Soon</span>
                    </div>
                  </div>
                </div>

                {/* My Dialogue Sets */}
                <div className="relative rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 border border-zinc-800 opacity-60 cursor-not-allowed">
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">📁</div>
                    <h3 className="text-xl font-bold text-zinc-400 mb-2">My Dialogue Sets</h3>
                    <p className="text-sm text-zinc-500 mb-4">Edit & manage your creations</p>
                    <div className="inline-flex items-center gap-2 bg-zinc-700/50 px-3 py-1.5 rounded-full text-sm text-zinc-400">
                      <span>🔒</span>
                      <span>Coming Soon</span>
                    </div>
                  </div>
                </div>

                {/* Fork Existing */}
                <div className="relative rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 border border-zinc-800 opacity-60 cursor-not-allowed">
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">🍴</div>
                    <h3 className="text-xl font-bold text-zinc-400 mb-2">Fork & Remix</h3>
                    <p className="text-sm text-zinc-500 mb-4">Build on existing dialogue sets</p>
                    <div className="inline-flex items-center gap-2 bg-zinc-700/50 px-3 py-1.5 rounded-full text-sm text-zinc-400">
                      <span>🔒</span>
                      <span>Coming Soon</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Creator Stats Preview */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">📊</span>
                Creator Dashboard
              </h2>
              
              <div className="rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 p-8 text-center">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-2">Earn from your content</h3>
                <p className="text-zinc-400 max-w-lg mx-auto mb-6">
                  Create dialogue sets, publish them to the marketplace, and earn Kokoro coins when players use your content.
                </p>
                <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full text-purple-300 font-medium">
                  <span>✨</span>
                  <span>Revenue sharing coming in 2025</span>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* First-Time Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-zinc-700">
            <h2 className="text-2xl font-bold text-center mb-2">Choose your language</h2>
            <p className="text-zinc-400 text-center mb-6">What language do you want to practice?</p>
            
            <div className="space-y-3 mb-6">
              {languageOptions.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${
                    selectedLanguage === lang.code
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-zinc-700 hover:bg-zinc-600 text-white'
                  }`}
                >
                  <span className="text-3xl">{lang.flag}</span>
                  <span className="text-xl font-semibold">{lang.label}</span>
                  {selectedLanguage === lang.code && (
                    <span className="ml-auto text-2xl">✓</span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleStartFromModal}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-cyan-500/30"
            >
              Start Playing
            </button>
            
            <p className="text-center text-zinc-500 text-sm mt-4">
              You can change this anytime in Settings
            </p>
          </div>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {showLanguageDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowLanguageDropdown(false)}
        />
      )}
    </div>
  );
}
