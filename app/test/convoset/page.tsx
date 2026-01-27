'use client';

import { useState, useEffect, useRef } from 'react';
import { SupportedLanguage, getVoiceForLang, getStoredLanguage, languageInfo } from '../../utils/tts';
import posthog from 'posthog-js';

// PostHog tracking helper
const track = (event: string, properties?: Record<string, any>) => {
  try {
    posthog.capture(event, properties);
  } catch (e) {
    console.log('PostHog tracking:', event, properties);
  }
};
type Round = 1 | 2 | 3 | 4 | 5;
type GameState = 'intro' | 'walking' | 'playing' | 'investor';
type OrderItem = {
  type: string;
  size: string;
  temp?: string;
  milk?: string;
  syrup?: string;
};

type InvestorMessage = {
  title: string;
  subtitle?: string;
};

type Coin = {
  id: number;
  x: number;           // horizontal position of the jet
  y: number;           // max height this coin reaches
  rotation: number;
  scale: number;
  delay: number;
  jetIndex: number;    // which vertical jet column (0-29)
  coinInJet: number;   // position within the jet (for staggered timing)
};

export default function ConvosetTest() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [round, setRound] = useState<Round>(1);
  const [coins, setCoins] = useState(50);
  const [investorMessage, setInvestorMessage] = useState<InvestorMessage>({
    title: "Great job!",
  });
  const [showDialogue, setShowDialogue] = useState(false);
  const [isNpcSpeaking, setIsNpcSpeaking] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [animatedCoins, setAnimatedCoins] = useState<Coin[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en-US');
  // Menu and Shop states
  const [showMenu, setShowMenu] = useState(false);
  const [showCafeShop, setShowCafeShop] = useState(false);
  const [showCoinShop, setShowCoinShop] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [inventoryTab, setInventoryTab] = useState<'buildings' | 'kokorobots' | 'items'>('buildings');
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<string | null>(null);
  const [purchasedCafes, setPurchasedCafes] = useState<string[]>([]);
  
  // Purchase confirmation popup states
  const [showPurchaseConfirm, setShowPurchaseConfirm] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<{id: string, name: string, price: number, image: string} | null>(null);
  const [showJustPurchased, setShowJustPurchased] = useState(false);
  const [justPurchasedCafe, setJustPurchasedCafe] = useState<{id: string, name: string, price: number, image: string} | null>(null);
  const [showOwnedPopup, setShowOwnedPopup] = useState(false);
  const [ownedCafeToView, setOwnedCafeToView] = useState<{id: string, name: string, image: string} | null>(null);
  
  // Friendly feedback modal state
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  
  // Reward summary state (shown after Round 5 completion)
  const [showRewardSummary, setShowRewardSummary] = useState(false);
  const [totalCoinsEarned, setTotalCoinsEarned] = useState(0);
  
  // Investor background loading state (prevents race condition)
  const [investorBgReady, setInvestorBgReady] = useState(false);
  
  // Mobile audio unlock refs (fixes autoplay restrictions)
  const orderAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockedRef = useRef(false);
  
  // Fallback for mobile audio if autoplay blocked
  const [needsOrderTap, setNeedsOrderTap] = useState(false);
  
  // Email capture modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  
  // Calculate coins earned per round
  const getCoinsForRound = (r: number) => {
    const coinRewards: Record<number, number> = { 1: 20, 2: 30, 3: 50, 4: 80, 5: 100 };
    return coinRewards[r] ?? 0;
  };

  // Feedback form
  const FEEDBACK_FORM_URL = "https://forms.gle/H42F4Vz4uZXtqHaB8";
  
  const openFeedbackForm = () => {
    window.open(FEEDBACK_FORM_URL, "_blank", "noopener,noreferrer");
  };
  
  // Handle email submission
  const handleEmailSubmit = async () => {
    if (!emailInput || !emailInput.includes('@')) {
      setEmailError('Please enter a valid email');
      return;
    }
    
    try {
      // For now, just save to localStorage (later: send to Supabase)
      const waitlistData = {
        email: emailInput,
        coinsEarned: totalCoinsEarned,
        timestamp: new Date().toISOString(),
        source: 'coffee_outpost_demo'
      };
      
      // Store locally
      const existing = JSON.parse(localStorage.getItem('rpg4h-waitlist') || '[]');
      existing.push(waitlistData);
      localStorage.setItem('rpg4h-waitlist', JSON.stringify(existing));
      
      // Track signup completed
      track('signup_completed', { 
        coins_earned: totalCoinsEarned,
        source: 'coffee_outpost_demo'
      });
      
      setEmailSubmitted(true);
      setEmailError('');
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowEmailModal(false);
      }, 2000);
    } catch (err) {
      setEmailError('Something went wrong. Please try again.');
    }
  };

  // Auto-load saved progress on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedData = localStorage.getItem('m31-coffee-save');
        if (savedData) {
          const data = JSON.parse(savedData);
          if (data.coins !== undefined) setCoins(data.coins);
          if (data.purchasedCafes) setPurchasedCafes(data.purchasedCafes);
          console.log('🎮 Progress loaded:', data);
        }
      } catch (e) {
        console.log('No saved progress found');
      }
      // Load language preference
      setSelectedLanguage(getStoredLanguage());
      setIsLoaded(true);
    }
  }, []);

  // Auto-save when coins or purchases change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      const saveData = {
        coins,
        purchasedCafes,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('m31-coffee-save', JSON.stringify(saveData));
      console.log('💾 Auto-saved:', saveData);
    }
  }, [coins, purchasedCafes, isLoaded]);
  
  // Cafe options - Updated prices for Level 3 economy
  const cafeOptions = [
    { id: 'coffeepost', name: 'Coffee Post', price: 800, image: '/coffeepost.png' },
    { id: 'retrocafe', name: 'Retro Café', price: 1500, image: '/retrocafe.png' },
    { id: 'flowercafe', name: 'Flower Café', price: 2500, image: '/flowercafe.png' },
    { id: 'moderncafe', name: 'Modern Café', price: 4000, image: '/moderncafe.png' },
    { id: 'rocococafe', name: 'Rococo Café', price: 6000, image: '/rocococafe.png' },
  ];
  
  // Coin bundles
  const coinBundles = [
    { id: 'starter', coins: 500, price: '$0.99', label: 'Starter' },
    { id: 'popular', coins: 1500, price: '$2.99', label: 'Popular', best: true },
    { id: 'pro', coins: 5000, price: '$7.99', label: 'Pro Pack' },
  ];
  
  // Menu items
  const menuItems = [
    { name: 'Americano', desc: 'Espresso + water' },
    { name: 'Latte', desc: 'Espresso + steamed milk' },
    { name: 'Cappuccino', desc: 'Espresso + foam' },
    { name: 'Flat White', desc: 'Double shot + microfoam' },
    { name: 'Macchiato', desc: 'Espresso + milk foam' },
    { name: 'Mocha', desc: 'Espresso + chocolate + milk' },
    { name: 'Espresso', desc: 'Pure coffee shot' },
  ];
  
  // Animation states
  const [kokoroX, setKokoroX] = useState(-200);
  const [kokoroScale, setKokoroScale] = useState(1);
  const [kokoroOpacity, setKokoroOpacity] = useState(1);
  const [showFullBody, setShowFullBody] = useState(true);
  const [isWalking, setIsWalking] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [missionVisible, setMissionVisible] = useState(false);
  
  const [round1Selections, setRound1Selections] = useState<OrderItem[]>([]);
  const [currentItem, setCurrentItem] = useState<Partial<OrderItem>>({});
  
  const [round2Input, setRound2Input] = useState('');
  const [round2Chat, setRound2Chat] = useState<{role: 'npc' | 'player', text: string}[]>([]);
  const [round2Order, setRound2Order] = useState<{type: boolean, size: boolean, milk: boolean, syrup: boolean, temp: boolean}>({
    type: false, size: false, milk: false, syrup: false, temp: false
  });
  
  const [round3Listening, setRound3Listening] = useState(false);
  const [round3Transcript, setRound3Transcript] = useState('');
  const [round3Attempts, setRound3Attempts] = useState(0);
  const [round3Feedback, setRound3Feedback] = useState<string[]>([]);
  const [musicStarted, setMusicStarted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  // Round-specific orders and audio
  const roundConfigs = {
    1: {
      audio: '/Audio/round1-order.mp3',
      npcOrder: "Hi, a medium caramel macchiato, with half & half please.",
      correctOrder: [{ type: 'Macchiato', size: 'Medium', milk: 'Half & Half', syrup: 'Caramel' }] as OrderItem[],
      itemCount: 1
    },
    2: {
      audio: '/Audio/round2-order.mp3', 
      npcOrder: "Hi, I'd like a large flat white with nonfat milk, and hazelnut syrup please.",
      correctOrder: [{ type: 'Flat White', size: 'Large', milk: 'Nonfat', syrup: 'Hazelnut' }] as OrderItem[],
      itemCount: 1
    },
    3: {
      audio: '/Audio/order.mp3',
      npcOrder: "Can I get a large Americano, and two small lattes — one with oat milk and one with whole milk?",
      correctOrder: [
        { type: 'Americano', size: 'Large' },
        { type: 'Latte', size: 'Small', milk: 'Oat' },
        { type: 'Latte', size: 'Small', milk: 'Whole' },
      ] as OrderItem[],
      itemCount: 3
    }
  };

  const currentRoundConfig = round <= 3 ? roundConfigs[round as 1 | 2 | 3] : null;

  // Mobile audio prime function - call inside user tap to unlock audio
  const primeRoundOrderAudio = async (roundNum: number) => {
    if (audioUnlockedRef.current) return;

    const config = roundConfigs[roundNum as 1 | 2 | 3];
    if (!config?.audio) return;

    const a = new Audio(config.audio);
    a.preload = 'auto';
    a.muted = true;

    try {
      await a.play();          // ✅ happens inside the user tap
      a.pause();
      a.currentTime = 0;
      a.muted = false;
      orderAudioRef.current = a;
      audioUnlockedRef.current = true;
      console.log('🔓 Round audio primed for mobile');
    } catch (e) {
      console.warn('primeRoundOrderAudio failed', e);
    }

    // Also prime background music
    try {
      const musicFile = getMusicForRound(1);
      const musicPrimer = new Audio(musicFile);
      musicPrimer.muted = true;
      await musicPrimer.play();
      musicPrimer.pause();
      musicPrimer.currentTime = 0;
      console.log('🔓 Music primed for mobile');
    } catch (e) {
      console.warn('Music prime failed', e);
    }

    // Also nudge speech synthesis (helps on iOS)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      window.speechSynthesis.speak(u);
    }
  };

  // Intro - Kokorobot appears at position, mission fades in
  useEffect(() => {
    if (gameState === 'intro') {
      // Skip walking - just place Kokoro at final position
      const isMobile = window.innerWidth < 768;
      const targetX = isMobile ? window.innerWidth * 0.30 : window.innerWidth * 0.40;
      setKokoroX(targetX);
      setIsWalking(false);
      setIntroReady(false);
      setMissionVisible(false);
      
      // Mission fades in after short delay
      setTimeout(() => {
        setMissionVisible(true);
        setTimeout(() => setIntroReady(true), 400);
      }, 300);
    }
  }, [gameState]);

  // Bellagio-style fountain - vertical jets spread from left to right, shoot up, then go to balance
  const triggerCoinAnimation = (currentRound: number) => {
    // Only trigger if investor background is ready (prevents race condition)
    // Animation will be triggered by useEffect when investorBgReady becomes true
    const newCoins: Coin[] = [];
    
    // Number of vertical jets increases with round
    const jetCounts = { 1: 12, 2: 18, 3: 24, 4: 30, 5: 36 };
    const coinsPerJet = { 1: 4, 2: 5, 3: 6, 4: 7, 5: 8 };
    // Heights increase per round
    const maxHeightMultipliers = { 1: 0.4, 2: 0.55, 3: 0.7, 4: 0.85, 5: 1.0 };
    
    const numJets = jetCounts[currentRound as keyof typeof jetCounts] || 20;
    const coinsInJet = coinsPerJet[currentRound as keyof typeof coinsPerJet] || 5;
    const heightMult = maxHeightMultipliers[currentRound as keyof typeof maxHeightMultipliers] || 1;
    
    // Create jets spread across the screen width (left to right)
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const jetSpacing = screenWidth / (numJets + 1);
    
    let coinId = 0;
    
    for (let jet = 0; jet < numJets; jet++) {
      // Center jets are taller, edge jets are shorter
      const centerDistance = Math.abs(jet - numJets / 2) / (numJets / 2);
      const jetHeightVariation = 1 - (centerDistance * 0.5);
      
      // Add some randomness
      const randomHeightBoost = 0.8 + Math.random() * 0.4;
      const jetMaxHeight = 300 + (200 * jetHeightVariation * randomHeightBoost * heightMult);
      
      // X position for this jet (spread across screen from left to right)
      const jetX = (jet * jetSpacing) - (screenWidth / 2) + jetSpacing;
      
      // Create multiple coins in each jet
      for (let c = 0; c < coinsInJet; c++) {
        const coinHeight = jetMaxHeight * (0.5 + (c / coinsInJet) * 0.5);
        newCoins.push({
          id: coinId++,
          x: jetX + (Math.random() * 10 - 5), // Slight wobble
          y: -coinHeight, // negative = up
          rotation: Math.random() * 360,
          scale: 0.25 + Math.random() * 0.2,
          delay: (c * 0.08) + (Math.random() * 0.1),
          jetIndex: jet,
          coinInJet: c
        });
      }
    }
    
    setAnimatedCoins(newCoins);
    setShowCoinAnimation(true);
    setTimeout(() => setShowCoinAnimation(false), 3500);
  };

  // Reset investor background ready state when entering investor screen
  // Preload the image in JS to ensure onLoad fires reliably
  useEffect(() => {
    if (gameState === 'investor') {
      setInvestorBgReady(false);
      
      // Preload image in JavaScript (more reliable than relying on <img> onLoad)
      const isMobile = window.innerWidth <= 768;
      const imgSrc = round === 1 
        ? (isMobile ? "/ib-mobile.webp" : "/ib.webp")
        : (isMobile ? `/NY-investor${round}-mobile.webp` : `/NY-investor${round}.webp`);
      
      const img = new Image();
      img.onload = () => {
        setInvestorBgReady(true);
        triggerCoinAnimation(round);
      };
      img.onerror = () => {
        console.warn('Investor image failed to load');
        setInvestorBgReady(true);
        triggerCoinAnimation(round);
      };
      img.src = imgSrc;
      
      // Fallback timeout (10 seconds) in case something goes very wrong
      const timeout = setTimeout(() => {
        if (!img.complete) {
          console.warn('Investor image load timeout - proceeding anyway');
          setInvestorBgReady(true);
          triggerCoinAnimation(round);
        }
      }, 10000);
      
      return () => clearTimeout(timeout);
    }
  }, [gameState, round]);

  // Preload next investor image when round starts
  useEffect(() => {
    if (gameState === 'playing') {
      const nextRound = round + 1;
      if (nextRound <= 5) {
        const img = new Image();
        img.src = `/NY-investor${nextRound}.webp`;
        // Also preload mobile version
        const imgMobile = new Image();
        imgMobile.src = `/NY-investor${nextRound}-mobile.webp`;
      }
    }
  }, [gameState, round]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // REMOVED: useEffect that was causing music overlap
  // Music is now ONLY started in specific places, not on every round change

  const getVoice = () => {
  // Use multi-language voice selection
  const voice = getVoiceForLang(voices, selectedLanguage);
  if (voice) return voice;
  
  // Fallback to original English logic if utility fails
  const preferred = ['Samantha', 'Karen', 'Moira', 'Tessa', 'Fiona', 'Victoria', 'Zira', 'Hazel'];
  
  for (const name of preferred) {
    const v = voices.find(v => v.name.includes(name));
    if (v) return v;
  }
  
  const englishVoice = voices.find(v => 
    v.lang.startsWith('en') && 
    !v.name.toLowerCase().includes('male')
  );
  
  return englishVoice || voices.find(v => v.lang.startsWith('en')) || voices[0];
};

  const speak = (text: string, audioFile?: string) => {
    // If audio file provided, play it instead of TTS
    if (audioFile) {
      const audio = new Audio(audioFile);
      audio.volume = 0.8;
      setIsNpcSpeaking(true);
      audio.onended = () => setIsNpcSpeaking(false);
      audio.onerror = (e) => {
        console.error('Audio failed to load:', audioFile, e);
        setIsNpcSpeaking(false);
        // Fallback to TTS if audio fails
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          const voice = getVoice();
          if (voice) utterance.voice = voice;
          utterance.rate = 1.0;
          utterance.pitch = 1.2;
          setIsNpcSpeaking(true);
          utterance.onend = () => setIsNpcSpeaking(false);
          window.speechSynthesis.speak(utterance);
        }
      };
      audio.play().catch((err) => {
        console.error('Audio play failed:', err);
        setIsNpcSpeaking(false);
      });
      return;
    }
    
    // Fallback to TTS
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voice = getVoice();
      if (voice) utterance.voice = voice;
      
      utterance.rate = 1.0;
      utterance.pitch = 1.2;
      utterance.volume = 1.0;
      
      setIsNpcSpeaking(true);
      utterance.onend = () => setIsNpcSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const playRoundOrder = async (forceRound?: number, startMusicAfter?: boolean) => {
    // Only for rounds 1-3 (listen & select)
    const targetRound = forceRound || round;
    const config = roundConfigs[targetRound as 1 | 2 | 3];
    if (!config) return;
    
    console.log(`Playing round ${targetRound} order audio: ${config.audio}`);
    
    // Pause background music while voice plays
    if (audioRef) {
      audioRef.pause();
    }
    
    // Get or create audio element
    let audio = orderAudioRef.current ?? new Audio(config.audio);
    
    // If reusing primed audio, ensure it's the right file for this round
    const desired = new URL(config.audio, window.location.href).toString();
    if (audio.src !== desired) {
      audio.src = config.audio;
      audio.load();
      console.log('Updated audio src for round', targetRound);
    }
    
    orderAudioRef.current = audio;
    
    try {
      audio.currentTime = 0;
      audio.volume = 0.8;
      setIsNpcSpeaking(true);
      
      // Set handlers BEFORE calling play (helps mobile reliability)
      audio.onended = () => {
        console.log('Audio ended');
        setIsNpcSpeaking(false);
        
        // If this is Round 1 start, begin music now that voice is done
        if (startMusicAfter) {
          console.log('Starting music after Round 1 voice');
          startBackgroundMusic(1);
        } else if (audioRef && musicPlaying) {
          // Just resume existing music if it was paused
          audioRef.play().catch(() => {});
        }
      };
      
      await audio.play();
      console.log('Audio playing successfully');
      setNeedsOrderTap(false); // Audio worked, no fallback needed
    } catch (err) {
      console.warn('Order audio play blocked', err);
      setIsNpcSpeaking(false);
      
      // Show tap-to-play fallback on mobile instead of auto TTS
      setNeedsOrderTap(true);
      
      // Still start music if this was Round 1
      if (startMusicAfter) {
        startBackgroundMusic(1);
      }
    }
  };

  const getMusicForRound = (r: number) => {
    // music-round1.mp3 for Round 1-2, music-round2.mp3 for round 3, music-round3.mp3 for round 4,5
    if (r <= 2) return '/Audio/music-round1.mp3';
    if (r === 3) return '/Audio/music-round2.mp3';
    return '/Audio/music-round3.mp3'; // rounds 4 and 5
  };

  // Use a module-level variable to ensure only ONE audio instance exists
  const startBackgroundMusic = (forceRound?: number | boolean) => {
    // DON'T start music if user has turned it off
    if (!musicPlaying && musicStarted) {
      console.log('🎵 Music is muted, not starting');
      return;
    }
    
    // CRITICAL: First, stop and destroy ANY existing audio
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
      audioRef.src = '';
    }
    
    // Also find and kill any orphaned audio elements playing music
    if (typeof document !== 'undefined') {
      document.querySelectorAll('audio').forEach((el) => {
        const audioEl = el as HTMLAudioElement;
        if (audioEl.src && audioEl.src.includes('music-round')) {
          audioEl.pause();
          audioEl.currentTime = 0;
          audioEl.src = '';
        }
      });
    }
    
    const targetRound = typeof forceRound === 'number' ? forceRound : round;
    const musicFile = getMusicForRound(targetRound);
    
    console.log(`🎵 Starting music for round ${targetRound}: ${musicFile}`);
    
    // Stop existing before creating new
    stopBackgroundMusic();
    
    const audio = new Audio(musicFile);
    audio.loop = true;
    audio.volume = 0.05;
    audio.play().catch(() => {});
    setAudioRef(audio);
    setMusicStarted(true);
    setMusicPlaying(true);
  };
  
  // Stop all music completely
  const stopBackgroundMusic = () => {
    console.log('🔇 Stopping all music');
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
      try { audioRef.src = ''; } catch(e) {}
    }
    // Kill ALL audio elements playing music (aggressive cleanup)
    if (typeof document !== 'undefined') {
      document.querySelectorAll('audio').forEach((el) => {
        const audioEl = el as HTMLAudioElement;
        if (audioEl.src && (audioEl.src.includes('music-round') || audioEl.src.includes('Audio'))) {
          audioEl.pause();
          audioEl.currentTime = 0;
          try { audioEl.src = ''; } catch(e) {}
        }
      });
    }
    // Don't set musicPlaying to false here - that's only for user muting
  };
  
  // Pause music temporarily (for sound effects) - will auto-resume
  const pauseBackgroundMusic = () => {
    console.log('⏸️ Pausing music temporarily');
    if (audioRef) {
      audioRef.pause();
    }
  };
  
  // Resume music after sound effect
  const resumeBackgroundMusic = () => {
    console.log('▶️ Resuming music');
    if (audioRef && musicPlaying) {
      audioRef.play().catch(() => {});
    }
  };

  const speakTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      const voice = getVoice();
      if (voice) utterance.voice = voice;
      utterance.rate = 1.0;
      utterance.pitch = 1.2;
      utterance.volume = 1.0;
      setIsNpcSpeaking(true);
      utterance.onend = () => {
        setIsNpcSpeaking(false);
        // Just resume existing music, don't start new
        if (audioRef && musicPlaying) {
          audioRef.play().catch(() => {});
        }
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const buyTranscript = () => {
    if (coins >= 10) {
      setCoins(prev => prev - 10);
      setShowTranscript(true);
      
      // Track hint used
      track('hint_used', { round, level: 3, cost: 10 });
    }
  };

  const toggleMusic = () => {
    if (musicPlaying) {
      // Stop ALL music
      if (audioRef) {
        audioRef.pause();
      }
      // Also stop any orphaned audio
      if (typeof document !== 'undefined') {
        document.querySelectorAll('audio').forEach((el) => {
          const audioEl = el as HTMLAudioElement;
          if (audioEl.src && audioEl.src.includes('music-round')) {
            audioEl.pause();
          }
        });
      }
      setMusicPlaying(false);
    } else {
      // Try to resume existing audioRef first
      if (audioRef && audioRef.src) {
        audioRef.play().catch(() => {
          // If resume fails, create new audio
          const musicFile = getMusicForRound(round);
          const audio = new Audio(musicFile);
          audio.loop = true;
          audio.volume = 0.05;
          audio.play().catch(() => {});
          setAudioRef(audio);
        });
      } else {
        // No audioRef exists, create new one
        const musicFile = getMusicForRound(round);
        const audio = new Audio(musicFile);
        audio.loop = true;
        audio.volume = 0.05;
        audio.play().catch(() => {});
        setAudioRef(audio);
      }
      setMusicPlaying(true);
    }
  };

  const startGame = async () => {
    // 🔑 PLAY REAL AUDIO IMMEDIATELY IN THE TAP - this is required for mobile
    await playRoundOrder(1, true);
    
    // Track mission started
    track('mission_started', { 
      level: 3, 
      starting_coins: coins,
      timestamp: new Date().toISOString()
    });
    
    // Skip walking - go directly to playing
    setShowTranscript(false);
    setShowFullBody(false);
    setGameState('playing');
    setShowDialogue(true);
    track('round_started', { round: 1, level: 3 });
  };

  // Keep shrinkAndTransition for reference but not used
  const shrinkAndTransition = () => {
    setIsWalking(false);
    setShowFullBody(false);
    setGameState('playing');
    setShowDialogue(true);
    track('round_started', { round: 1, level: 3 });
  };

  const replayVoice = () => {
    playRoundOrder();
  };

  const addToOrder = () => {
    if (!currentRoundConfig) return;
    if (currentItem.type && currentItem.size && round1Selections.length < currentRoundConfig.itemCount) {
      setRound1Selections([...round1Selections, currentItem as OrderItem]);
      setCurrentItem({});
    }
  };

  const removeFromOrder = (index: number) => {
    setRound1Selections(round1Selections.filter((_, i) => i !== index));
  };

  const checkRound1 = () => {
    if (!currentRoundConfig) return;
    
    const normalize = (items: OrderItem[]) => 
      items.map(i => `${i.size}-${i.type}-${i.milk || 'none'}-${i.syrup || 'none'}`).sort().join(',');
    
    const isCorrect = normalize(round1Selections) === normalize(currentRoundConfig.correctOrder);
    
    // Track attempt submitted
    track('attempt_submitted', { 
      round, 
      level: 3, 
      correct: isCorrect,
      selections: round1Selections.length
    });
    
    if (isCorrect) {
      // Pause background music for celebration sound
      pauseBackgroundMusic();
      // Coin rewards: Round 1 = 20, Round 2 = 30, Round 3 = 50
      const coinReward = round === 1 ? 20 : round === 2 ? 30 : 50;
      // Track total coins earned
      setTotalCoinsEarned(prev => prev + coinReward);
      
      // Track round completed
      track('round_completed', { 
        round, 
        level: 3, 
        coins_earned: coinReward,
        passed: true
      });
      
      // Play celebration sound
      playAudio('/Audio/goodresult.mp3', () => {
        setCoins(prev => prev + coinReward);
        // Note: triggerCoinAnimation is now called when investor image loads (prevents race condition)
        const messages: Record<number, InvestorMessage> = {
          1: { title: "Well done!" },
          2: { title: "Great job!" },
          3: { title: "Excellent!", subtitle: "Can she take your orders too?" },
          4: { title: "Impressive!" },
          5: { title: "You're a natural!" }
        };

        setInvestorMessage(messages[round] ?? { title: "Great job!" });
        setGameState("investor");
        
        // Track reward screen viewed
        track('reward_screen_viewed', { round, level: 3, coins_earned: coinReward });
      });

    } else {
      // Wrong answer - play error sound and show friendly feedback
      playAudio('/Audio/kokorobot-wrong.mp3');
      setShowFeedbackModal(true);
      setRound1Selections([]);
      setCurrentItem({});
    }
  };

  const startRound2 = () => {
    setRound(2);
    setGameState('playing');
    setShowDialogue(true);
    setShowTranscript(true);
    setRound2Order({ type: false, size: false, milk: false, syrup: false, temp: false });
    setRound2OrderDetails({});
    setRound2ConfirmStep(false);
    const greeting = "Hi there! What can I get started for you today?";
    setRound2Chat([{ role: 'npc', text: greeting }]);
    playAudio('/Audio/kokorobot-greeting.mp3');
  };

  const playAudio = (audioFile: string, onEnd?: () => void) => {
    // Pause background music while voice plays
    if (audioRef) {
      audioRef.pause();
    }
    
    const audio = new Audio(audioFile);
    audio.volume = 0.8;
    setIsNpcSpeaking(true);
    
    // Don't resume music after victory/celebration sounds
    const isVictorySound = audioFile.includes('goodresult') || audioFile.includes('kokorobot-success');
    
    audio.oncanplay = () => {
      audio.play().catch(err => {
        console.error('Play failed:', err);
        setIsNpcSpeaking(false);
      });
    };
    
    audio.onended = () => {
      setIsNpcSpeaking(false);
      if (onEnd) onEnd();
      // Resume background music (but not after victory sounds)
      if (audioRef && musicPlaying && !isVictorySound) {
        audioRef.play().catch(() => {});
      }
    };
    
    audio.onerror = () => {
      console.error('Audio error:', audioFile);
      setIsNpcSpeaking(false);
    };
  };

  // Track actual order details for repeating back
  const [round2OrderDetails, setRound2OrderDetails] = useState<{type?: string, size?: string, temp?: string, milk?: string, syrup?: string}>({});
  const [round2ConfirmStep, setRound2ConfirmStep] = useState(false);

  const processRound2Input = () => {
    if (!round2Input.trim()) return;
    
    const input = round2Input.toLowerCase();
    setRound2Chat(prev => [...prev, { role: 'player', text: round2Input }]);
    setRound2Input('');
    
    // If in confirm step, check for confirmation
    if (round2ConfirmStep) {
      if (input.includes('yes') || input.includes('confirm') || input.includes('correct') || input.includes('that\'s right') || input.includes('looks good') || input.includes('perfect') || input.includes('that\'s it') || input.includes('thats it') || input.includes('thank you') || input.includes('thanks') || input.includes('good') || input.includes('yep') || input.includes('yup') || input.includes('sure') || input.includes('okay') || input.includes('ok')) {
        const response = "Thank you, it will be at the pick up counter.";
        setRound2Chat(prev => [...prev, { role: 'npc', text: response }]);
        // Pause background music for celebration
        pauseBackgroundMusic();
        // Track total coins earned
        setTotalCoinsEarned(prev => prev + 80);
        
        // Track round completed
        track('round_completed', { 
          round: 4, 
          level: 3, 
          coins_earned: 80,
          passed: true
        });
        
        playAudio('/Audio/goodresult.mp3', () => {
          setCoins(prev => prev + 80);
          // Note: triggerCoinAnimation is now called when investor image loads (prevents race condition)
          setInvestorMessage({ title: "Impressive!" });
          setGameState('investor');
          
          // Track reward screen viewed
          track('reward_screen_viewed', { round: 4, level: 3, coins_earned: 80 });
        });
        return;
      } else if (input.includes('no') || input.includes('change') || input.includes('actually') || input.includes('wait') || input.includes('wrong')) {
        setRound2ConfirmStep(false);
        setRound2Order({ type: false, size: false, milk: false, syrup: false, temp: false });
        setRound2OrderDetails({});
        const response = "No problem! What would you like instead?";
        setRound2Chat(prev => [...prev, { role: 'npc', text: response }]);
        playAudio('/Audio/kokorobot-greeting.mp3');
        return;
      }
    }
    
    // Check for "what do you have" type questions FIRST - before any order processing
    if (input.includes('what do you have') || input.includes('what options') || input.includes('what kinds') || input.includes('what milk') || input.includes('what type')) {
      const response = "We have whole, oat, almond, nonfat, and soy milk. Which would you like?";
      setRound2Chat(prev => [...prev, { role: 'npc', text: response }]);
      playAudio('/Audio/milk-lists.mp3');
      return;
    }
    
    // Check for unavailable items (like 2%, half and half) BEFORE other processing
    if (input.includes('2%') || input.includes('two percent') || input.includes('two %') || input.includes('with 2') || input.includes('half and half') || input.includes('half & half') || input.includes('cream') || input.includes('coconut')) {
      const response = "We don't have that, but we do have whole, oat, almond, nonfat, and soy milk. Which would you like?";
      setRound2Chat(prev => [...prev, { role: 'npc', text: response }]);
      playAudio('/Audio/milk-lists.mp3');
      return;
    }
    
    const newOrder = { ...round2Order };
    const newDetails = { ...round2OrderDetails };
    
    // Check if it's a question about availability
    const isQuestion = input.includes('do you have') || input.includes('is there') || input.includes('can i get') || input.includes('?');
    
    // Check for unknown drink types (things that sound like orders but aren't on menu)
    const unknownDrinks = ['black coffee', 'drip', 'filter', 'pour over', 'cold brew', 'frappuccino', 'frappe', 'chai', 'tea', 'matcha', 'hot chocolate'];
    const hasUnknownDrink = unknownDrinks.some(drink => input.includes(drink));
    
    if (hasUnknownDrink && !round2Order.type) {
      const response = "I'm sorry, we don't have that, but here are your options!";
      setRound2Chat(prev => [...prev, { role: 'npc', text: response }]);
      playAudio('/Audio/notavailable.mp3');
      setTimeout(() => setShowMenu(true), 1000);
      return;
    }
    
    // Detect drink type
    if (input.includes('americano')) { newOrder.type = true; newDetails.type = 'Americano'; }
    else if (input.includes('flat white')) { newOrder.type = true; newDetails.type = 'Flat White'; }
    else if (input.includes('latte')) { newOrder.type = true; newDetails.type = 'Latte'; }
    else if (input.includes('cappuccino')) { newOrder.type = true; newDetails.type = 'Cappuccino'; }
    else if (input.includes('macchiato') || input.includes('machiato')) { newOrder.type = true; newDetails.type = 'Macchiato'; }
    else if (input.includes('mocha')) { newOrder.type = true; newDetails.type = 'Mocha'; }
    else if (input.includes('espresso')) { newOrder.type = true; newDetails.type = 'Espresso'; }
    
    // Detect size
    if (input.includes('small')) { newOrder.size = true; newDetails.size = 'small'; }
    else if (input.includes('medium')) { newOrder.size = true; newDetails.size = 'medium'; }
    else if (input.includes('large')) { newOrder.size = true; newDetails.size = 'large'; }
    
    // Detect temperature
    if (input.includes('iced') || input.includes('ice') || input.includes('cold')) { newOrder.temp = true; newDetails.temp = 'iced'; }
    else if (input.includes('hot')) { newOrder.temp = true; newDetails.temp = 'hot'; }
    
    // Detect syrup/flavor
    if (input.includes('caramel')) { newOrder.syrup = true; newDetails.syrup = 'caramel'; }
    else if (input.includes('vanilla')) { newOrder.syrup = true; newDetails.syrup = 'vanilla'; }
    else if (input.includes('hazelnut')) { newOrder.syrup = true; newDetails.syrup = 'hazelnut'; }
    else if (input.includes('no syrup') || input.includes('no flavor') || input.includes('plain')) { newOrder.syrup = true; newDetails.syrup = 'none'; }
    
    // Americano and Espresso don't need milk
    const noMilkDrinks = ['Americano', 'Espresso'];
    if (noMilkDrinks.includes(newDetails.type || '')) {
      newOrder.milk = true;
      newDetails.milk = 'none';
    }
    
    // Detect milk - including "no" responses
    if (input.includes('no thank') || input.includes('no,') || input.includes('no milk') || input.includes('none') || input.includes('black') || input.includes('regular') || (input === 'no') || input.startsWith('no ') || input.includes("i'm good") || input.includes("that's it") || input.includes("that's all")) {
      newOrder.milk = true;
      newDetails.milk = 'none';
    } else if (input.includes('oat')) { newOrder.milk = true; newDetails.milk = 'oat milk'; }
    else if (input.includes('almond')) { newOrder.milk = true; newDetails.milk = 'almond milk'; }
    else if (input.includes('whole')) { newOrder.milk = true; newDetails.milk = 'whole milk'; }
    else if (input.includes('skim')) { newOrder.milk = true; newDetails.milk = 'skim milk'; }
    else if (input.includes('nonfat') || input.includes('non-fat') || input.includes('non fat')) { newOrder.milk = true; newDetails.milk = 'nonfat milk'; }
    else if (input.includes('soy')) { newOrder.milk = true; newDetails.milk = 'soy milk'; }
    
    setRound2Order(newOrder);
    setRound2OrderDetails(newDetails);
    
    setTimeout(() => {
      let response = '';
      let audioFile = '';
      
      // Handle questions about availability
      if (isQuestion && !newOrder.type) {
        if (input.includes('almond') || input.includes('oat') || input.includes('whole') || input.includes('nonfat') || input.includes('soy')) {
          response = "Yes, we do! Would you like to order something with that?";
          setRound2Chat(prev => [...prev, { role: 'npc', text: response }]);
          playAudio('/Audio/ask-type.mp3');
          return;
        }
      }
      
      if (!newOrder.type) {
        response = "What kind of coffee would you like?";
        audioFile = '/Audio/ask-type.mp3';
      } else if (!newOrder.size) {
        response = "Sure, what size? We have small, medium, and large.";
        audioFile = '/Audio/ask-size.mp3';
      } else if (!newOrder.temp) {
        response = "Would you like that hot or over ice?";
        audioFile = '/Audio/coffee-temperature.mp3';
      } else if (!newOrder.milk) {
        response = "Any milk preference? We have whole, oat, almond, nonfat, and soy.";
        audioFile = '/Audio/milk-preference.mp3';
      } else {
        // All required info collected! Show confirmation
        const milkText = newDetails.milk === 'none' ? '' : ` with ${newDetails.milk}`;
        const syrupText = newDetails.syrup && newDetails.syrup !== 'none' ? ` ${newDetails.syrup}` : '';
        response = `Got it! One ${newDetails.size} ${newDetails.temp}${syrupText} ${newDetails.type}${milkText}. Anything else? Please confirm your order.`;
        setRound2ConfirmStep(true);
      }
      
      setRound2Chat(prev => [...prev, { role: 'npc', text: response }]);
      if (audioFile) playAudio(audioFile);
    }, 500);
  };

  const startRound3 = () => {
    setRound(3);
    setGameState('playing');
    setShowDialogue(true);
    setRound3Order({ type: false, size: false, milk: false, temp: false, syrup: false });
    setRound3OrderDetails({});
    setRound3Score(500);
    setRound3ConfirmStep(false);
    setRound3CurrentQuestion('');
    setRound3Transcript('');
    setRound3Feedback([]);
    playAudio('/Audio/kokorobot-ready.mp3');
  };

  const [round3Order, setRound3Order] = useState<{type: boolean, size: boolean, milk: boolean, temp: boolean, syrup: boolean}>({
    type: false, size: false, milk: false, temp: false, syrup: false
  });

  const [round3OrderDetails, setRound3OrderDetails] = useState<{type?: string, size?: string, temp?: string, milk?: string, syrup?: string}>({});
  const [round3Score, setRound3Score] = useState(500);
  const [round3ConfirmStep, setRound3ConfirmStep] = useState(false);
  const [round3CurrentQuestion, setRound3CurrentQuestion] = useState('');

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported. Try Chrome.');
      return;
    }
    
    // Pause music while speaking
    if (audioRef) {
      audioRef.pause();
    }
    
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = selectedLanguage;
    
    setRound3Listening(true);
    setRound3Transcript('');
    setRound3Feedback([]);
    setRound3CurrentQuestion('');
    
    let speechTimeout: NodeJS.Timeout;
    
    recognition.onresult = (event: any) => {
      clearTimeout(speechTimeout);
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join(' ');
      setRound3Transcript(transcript);
      
      speechTimeout = setTimeout(() => {
        recognition.stop();
        evaluateRound3(transcript);
      }, 1500);
    };
    
    recognition.onerror = () => {
      setRound3Listening(false);
      if (audioRef && musicPlaying) {
        audioRef.play().catch(() => {});
      }
    };
    recognition.onend = () => {
      setRound3Listening(false);
      if (audioRef && musicPlaying) {
        audioRef.play().catch(() => {});
      }
    };
    recognition.start();
    
    setTimeout(() => {
      if (round3Listening) {
        recognition.stop();
      }
    }, 8000);
  };

  const evaluateRound3 = (transcript: string) => {
    const input = transcript.toLowerCase();
    const newOrder = { ...round3Order };
    const newDetails = { ...round3OrderDetails };
    let score = round3Score;
    
    // Detect drink type
    if (!newOrder.type) {
      if (input.includes('americano')) { newOrder.type = true; newDetails.type = 'Americano'; }
      else if (input.includes('flat white')) { newOrder.type = true; newDetails.type = 'Flat White'; }
      else if (input.includes('latte')) { newOrder.type = true; newDetails.type = 'Latte'; }
      else if (input.includes('cappuccino')) { newOrder.type = true; newDetails.type = 'Cappuccino'; }
      else if (input.includes('macchiato') || input.includes('machiato')) { newOrder.type = true; newDetails.type = 'Macchiato'; }
      else if (input.includes('mocha')) { newOrder.type = true; newDetails.type = 'Mocha'; }
      else if (input.includes('espresso')) { newOrder.type = true; newDetails.type = 'Espresso'; }
    }
    
    // Detect size
    if (!newOrder.size) {
      if (input.includes('small')) { newOrder.size = true; newDetails.size = 'small'; }
      else if (input.includes('medium')) { newOrder.size = true; newDetails.size = 'medium'; }
      else if (input.includes('large')) { newOrder.size = true; newDetails.size = 'large'; }
    }
    
    // Detect temperature
    if (!newOrder.temp) {
      if (input.includes('iced') || input.includes('ice') || input.includes('cold')) { newOrder.temp = true; newDetails.temp = 'iced'; }
      else if (input.includes('hot')) { newOrder.temp = true; newDetails.temp = 'hot'; }
    }
    
    // Detect syrup/flavor
    if (!newOrder.syrup) {
      if (input.includes('caramel')) { newOrder.syrup = true; newDetails.syrup = 'caramel'; }
      else if (input.includes('vanilla')) { newOrder.syrup = true; newDetails.syrup = 'vanilla'; }
      else if (input.includes('hazelnut')) { newOrder.syrup = true; newDetails.syrup = 'hazelnut'; }
      else if (input.includes('no syrup') || input.includes('no flavor') || input.includes('plain')) { newOrder.syrup = true; newDetails.syrup = 'none'; }
      // Auto-pass syrup for drinks that don't typically have syrup mentioned
      else if (newOrder.type && !input.includes('caramel') && !input.includes('vanilla') && !input.includes('hazelnut')) {
        newOrder.syrup = true;
        newDetails.syrup = 'none';
      }
    }
    
    // Americano and Espresso don't need milk
    const noMilkDrinks = ['Americano', 'Espresso'];
    if (noMilkDrinks.includes(newDetails.type || '')) {
      newOrder.milk = true;
      newDetails.milk = 'none';
    }
    
    // Detect milk - for drinks that require milk, "no" alone doesn't work
    const milkRequiredDrinks = ['Latte', 'Cappuccino', 'Macchiato', 'Mocha'];
    if (!newOrder.milk) {
      // Check for actual milk choices
      if (input.includes('oat')) { newOrder.milk = true; newDetails.milk = 'oat milk'; }
      else if (input.includes('almond')) { newOrder.milk = true; newDetails.milk = 'almond milk'; }
      else if (input.includes('whole')) { newOrder.milk = true; newDetails.milk = 'whole milk'; }
      else if (input.includes('skim')) { newOrder.milk = true; newDetails.milk = 'skim milk'; }
      else if (input.includes('nonfat') || input.includes('non-fat') || input.includes('non fat')) { newOrder.milk = true; newDetails.milk = 'nonfat milk'; }
      else if (input.includes('soy')) { newOrder.milk = true; newDetails.milk = 'soy milk'; }
      else if (input.includes('regular') || input.includes('normal') || input.includes('default')) { newOrder.milk = true; newDetails.milk = 'whole milk'; }
      // Only allow "no milk" for non-milk-required drinks
      else if ((input.includes('no milk') || input.includes('black') || input.includes('no thank')) && !milkRequiredDrinks.includes(newDetails.type || '')) { 
        newOrder.milk = true; newDetails.milk = 'none'; 
      }
    }
    
    setRound3Order(newOrder);
    setRound3OrderDetails(newDetails);
    setRound3Attempts(prev => prev + 1);
    
    // Check what's missing and ask follow-up
    let question = '';
    let audioFile = '';
    
    if (!newOrder.type) {
      question = "What kind of coffee would you like?";
      audioFile = '/Audio/ask-type.mp3';
    } else if (!newOrder.size) {
      question = "What size?";
      audioFile = '/Audio/ask-size.mp3';
    } else if (!newOrder.temp) {
      question = "Would you like that hot or over ice?";
      audioFile = '/Audio/coffee-temperature.mp3';
    } else if (!newOrder.milk) {
      question = `A ${newDetails.type} requires a milk choice. We have whole, oat, almond, nonfat, or soy.`;
      audioFile = '/Audio/milk-preference.mp3';
    }
    
    if (question) {
      // Still missing info - ask follow-up
      setRound3CurrentQuestion(question);
      setRound3Feedback([question]);
      playAudio(audioFile);
    } else {
      // All info collected! Show confirmation
      setRound3ConfirmStep(true);
      setRound3Feedback([]);
      const milkText = newDetails.milk === 'none' ? '' : ` with ${newDetails.milk}`;
      const syrupText = newDetails.syrup && newDetails.syrup !== 'none' ? ` ${newDetails.syrup}` : '';
      setRound3CurrentQuestion(`Perfect! One ${newDetails.size} ${newDetails.temp}${syrupText} ${newDetails.type}${milkText}.`);
    }
  };

  const acceptRound3Score = () => {
    // Pause background music for celebration
    pauseBackgroundMusic();
    // Track total coins earned (Round 5 = 100 coins)
    setTotalCoinsEarned(prev => prev + 100);
    
    // Track round completed
    track('round_completed', { 
      round: 5, 
      level: 3, 
      coins_earned: 100,
      passed: true
    });
    
    // Track mission completed
    track('mission_completed', { 
      level: 3, 
      total_coins_earned: totalCoinsEarned + 100,
      timestamp: new Date().toISOString()
    });
    
    // Play celebration sound and go straight to investor
    playAudio('/Audio/goodresult.mp3', () => {
      setCoins(prev => prev + 100);
      // Note: triggerCoinAnimation is now called when investor image loads (prevents race condition)
      setInvestorMessage({ title: "You're a natural!" });
      setGameState('investor');
      
      // Track reward screen viewed
      track('reward_screen_viewed', { round: 5, level: 3, coins_earned: 100 });
    });
  };

  const completeGame = () => {
    if (round < 5) {
      // Move to next round
      const nextRound = (round + 1) as Round;
      setRound(nextRound);
      
      // Track round started
      track('round_started', { round: nextRound, level: 3 });
      
      // ALL rounds after round 1 go DIRECTLY to playing - NO intro/walking
      if (nextRound === 2 || nextRound === 3) {
        // Rounds 2-3: Listen & Select - go DIRECTLY to playing
        setGameState('playing');
        setShowDialogue(true);
        setRound1Selections([]);
        setCurrentItem({});
        setShowTranscript(false);
        setShowFullBody(false);
        // Play the round audio after a short delay - pass the correct round number!
        setTimeout(() => {
          playRoundOrder(nextRound);
          startBackgroundMusic(nextRound);
        }, 500);
      } else if (nextRound === 4) {
        // Round 4: Typing - go directly to playing
        setGameState('playing');
        setShowDialogue(true);
        setShowFullBody(false);
        setRound2Chat([]);
        setRound2Order({ type: false, size: false, milk: false, syrup: false, temp: false });
        setRound2OrderDetails({});
        setRound2ConfirmStep(false);
        const greeting = "Hi there! What can I get started for you today?";
        setRound2Chat([{ role: 'npc', text: greeting }]);
        playAudio('/Audio/kokorobot-greeting.mp3');
        startBackgroundMusic();
      } else if (nextRound === 5) {
        // Round 5: Speaking - go directly to playing
        setGameState('playing');
        setShowDialogue(true);
        setShowFullBody(false);
        setRound3Order({ type: false, size: false, milk: false, temp: false, syrup: false });
        setRound3OrderDetails({});
        setRound3Score(500);
        setRound3ConfirmStep(false);
        setRound3CurrentQuestion('');
        setRound3Transcript('');
        setRound3Feedback([]);
        playAudio('/Audio/kokorobot-ready.mp3');
        startBackgroundMusic();
      }
    } else {
      // After Round 5, reset to Round 1 with intro
      setRound(1);
      setGameState('intro');
      setRound1Selections([]);
      setCurrentItem({});
      setRound2Chat([]);
      setRound2Order({ type: false, size: false, milk: false, syrup: false, temp: false });
      setRound3Transcript('');
      setRound3Feedback([]);
      setShowTranscript(false);
      setShowFullBody(true);
      setKokoroScale(1);
      setKokoroOpacity(1);
      setKokoroX(-200);
      setMissionVisible(false);
    }
  };

  // Kokoro Star Coin - uses your custom kokoro-star.png
  const KokoroCoin = ({ className = "", size = 24 }: { className?: string, size?: number }) => (
    <img 
      src="/kokoro-star.png" 
      alt="coin" 
      width={size} 
      height={size}
      className={`inline-block ${className}`}
      style={{ 
        width: size, 
        height: size,
        filter: 'drop-shadow(0 2px 4px rgba(255,215,0,0.5))'
      }}
    />
  );

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* M31 Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/m31.jpg')` }}
      />
      
      {/* Darker overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Barren landscape at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-950/90 via-amber-900/40 to-transparent" />
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-900 to-transparent" />

      {/* Bellagio-style Gold Coin Fountain Animation - from center */}
      {showCoinAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
          {animatedCoins.map((coin) => (
            <div
              key={coin.id}
              className="absolute animate-fountain-jet"
              style={{
                '--jx': `${coin.x}px`,
                '--jy': `${coin.y}px`,
                '--s': coin.scale,
                animationDelay: `${coin.delay}s`
              } as React.CSSProperties}
            >
              <div className="relative">
                <KokoroCoin size={36} className="drop-shadow-[0_0_15px_rgba(255,215,0,0.9)]" />
                <div className="absolute inset-0 w-9 h-9 bg-yellow-400/40 rounded-full blur-md -z-10" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* HUD - Responsive for mobile, uses safe-area for iPhone notch/Android status bar */}
      <div 
        className="absolute top-6 md:top-4 left-3 right-3 md:left-4 md:right-4 flex justify-between items-center z-30"
      >
        <div className="flex items-center gap-1 md:gap-3">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 md:px-4 py-1 md:py-1.5 border border-zinc-500/30 flex items-center">
            <span className="text-zinc-100 font-sans text-xs md:text-sm">M31 · Lv.3 · {round}/5</span>
          </div>
          {musicStarted && (
            <button 
              onClick={toggleMusic}
              className="bg-black/60 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 md:py-1.5 border border-zinc-500/30 hover:bg-black/80 transition flex items-center"
            >
              <span className="text-zinc-100 text-xs md:text-sm">{musicPlaying ? '🔊' : '🔇'}</span>
            </button>
          )}
          {/* Language Pill */}
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 md:py-1.5 border border-zinc-500/30 flex items-center gap-1 md:gap-2">
            <span className="text-xs md:text-sm">{languageInfo[selectedLanguage].flag}</span>
            <span className="text-zinc-100 font-sans text-xs md:text-sm">{languageInfo[selectedLanguage].shortCode}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-3">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-2 md:px-4 py-1 md:py-1.5 border border-zinc-500/30 flex items-center gap-1 md:gap-2">
            <KokoroCoin size={20} />
            <span className="text-zinc-100 font-sans text-xs md:text-sm">{coins}</span>
          </div>
          {/* Save button */}
          <button 
            onClick={() => alert('✅ Progress saved locally!')}
            className="bg-black/60 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 md:py-1.5 border border-zinc-500/30 hover:bg-black/80 transition flex items-center"
            title="Save Progress"
            aria-label="Save Progress"
          >
            <span className="text-zinc-100 text-xs md:text-sm">✅</span>
          </button>
          {/* Exit button */}
          <button 
            onClick={() => { 
              if(confirm('Exit game? Your progress is saved.')) {
                track('mission_abandoned', { round, level: 3, coins_at_exit: coins, state: 'playing' });
                window.location.href = '/'; 
              }
            }}
            className="bg-black/60 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 md:py-1.5 border border-zinc-500/30 hover:bg-black/80 transition flex items-center"
            title="Exit Game"
            aria-label="Exit Game"
          >
            <span className="text-zinc-100 text-xs md:text-sm">✕</span>
          </button>
        </div>
      </div>

      {/* Full Body Kokorobot */}
      {showFullBody && (gameState === 'intro' || gameState === 'walking') && (
        <div
          className={`absolute bottom-24 md:bottom-28 z-[60] pointer-events-none ${
            isWalking ? '' : 'transition-opacity duration-300'
          }`}
          style={{
            left: `${kokoroX}px`,
            transform: 'translateX(-50%)',
            opacity: kokoroOpacity,
          }}
        >
          <div className="relative w-fit">
            <img
              src={isWalking ? "/kokorobot-sideview.png" : "/kokorobot-cb.png"}
              alt="Kokorobot"
              className={[
                "block w-auto drop-shadow-2xl",
                isWalking ? "animate-walk" : "",
              ].join(" ")}
              style={{ height: 'clamp(160px, 26vh, 260px)' }}
            />

            {/* Name badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
              <span className="text-xs text-amber-400 font-sans font-medium bg-black/70 px-2 py-1 rounded-full border border-amber-500/30 whitespace-nowrap">
                Kokoro
              </span>
            </div>
          </div>
        </div>
      )}

      {/* INTRO MISSION CARD */}
      {gameState === 'intro' && missionVisible && (
        <div className="absolute inset-0 z-30 flex items-center justify-center px-4 pt-20 pb-32 md:pt-0 md:pb-0">
          <div 
            className={`bg-black/70 backdrop-blur-md rounded-3xl p-5 md:p-8 max-w-sm md:max-w-md w-full border border-amber-500/30 text-center transition-opacity transition-transform duration-500 ${
              missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-purple-400 text-sm md:text-base font-medium mb-2">Round {round} of 5</p>
            <h1 className="text-amber-400 text-2xl md:text-3xl font-medium mb-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              M31 Coffee Outpost
            </h1>
            <p className="text-amber-200 text-sm md:text-base mb-6 leading-relaxed">
              Learn to understand, and be understood.<br />
              Earn rewards to build Andromeda's first café!
            </p>
            <button
              onClick={startGame}
              disabled={!introReady}
              className={`px-8 py-3 rounded-full text-lg font-semibold transition-all ${
                introReady 
                  ? 'bg-amber-500 hover:bg-amber-400 text-black cursor-pointer' 
                  : 'bg-amber-500/50 text-black/50 cursor-wait'
              }`}
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              Begin Mission
            </button>
          </div>
        </div>
      )}

      {/* WALKING STATE */}
      {gameState === 'walking' && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-amber-400 text-2xl animate-pulse font-medium">Starting mission...</p>
        </div>
      )}

      {/* DIALOGUE BOX - Mobile-friendly layout */}
      {gameState === 'playing' && showDialogue && (
        <div className="absolute inset-0 flex flex-col items-center justify-start md:justify-center z-20 pt-20 md:pt-0 pb-2">
          <div className="w-full max-w-xl overflow-y-auto px-2 md:px-4">
            <div className="w-full max-w-xl mx-auto animate-fade-in">
            
            {/* Listen & Select UI - Rounds 1-3 */}
            {(round === 1 || round === 2 || round === 3) && currentRoundConfig && (
              <div className="bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-4 md:p-6 shadow-2xl">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <img 
                    src="/kokorobot-closeup.png" 
                    alt="Kokorobot" 
                    className={`w-20 h-20 md:w-28 md:h-28 object-cover rounded-full border-[3px] border-amber-500/60 shadow-lg animate-pop-in ${isNpcSpeaking ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-black animate-pulse' : ''}`}
                  />
                  <div className="flex-1">
                    <p className="text-amber-400 text-lg md:text-xl mb-1 font-sans font-medium">M31 Coffee Outpost</p>
                    
                    {showTranscript ? (
                      <p className="text-base md:text-xl leading-relaxed text-white">{currentRoundConfig.npcOrder}</p>
                    ) : (
                      <div className="bg-black/60 rounded-xl p-3 border border-amber-500/30">
                        <p className="text-amber-300 mb-1 text-sm md:text-base font-medium">📋 Register Training</p>
                        <p className="text-amber-100 text-xs md:text-sm mb-3">You're on register. Enter Kokoro's exact order.</p>
                        
                        {/* Tap to hear order - fallback for mobile when autoplay blocked */}
                        {needsOrderTap && (
                          <div className="mb-3 bg-amber-500/15 border border-amber-400/30 rounded-xl p-3 text-center">
                            <p className="text-amber-200 text-sm mb-2">
                              Tap to hear Kokoro's order (mobile needs one extra tap).
                            </p>
                            <button 
                              onClick={() => {
                                setNeedsOrderTap(false);
                                replayVoice();
                              }}
                              className="px-4 py-2 rounded-lg bg-amber-500 text-black font-semibold"
                            >
                              🔊 Play Order
                            </button>
                          </div>
                        )}
                        
                        {/* Matching rounded buttons */}
                        <div className="flex gap-2 justify-center">
                          <button 
                            onClick={replayVoice}
                            className="px-4 py-2 rounded-xl transition font-medium flex flex-col items-center justify-center bg-transparent hover:bg-amber-900/50 text-amber-400 text-sm border border-amber-500/40 min-w-[100px]"
                          >
                            <span>🔊 Replay</span>
                            <span className="text-xs text-amber-400/60">(Free)</span>
                          </button>
                          <button 
                            onClick={buyTranscript}
                            disabled={coins < 10}
                            className={`px-4 py-2 rounded-xl transition font-medium flex flex-col items-center justify-center text-sm border min-w-[100px] ${
                              coins >= 10 
                                ? 'bg-transparent hover:bg-amber-900/50 text-amber-400 border-amber-500/40' 
                                : 'bg-transparent text-slate-500 border-slate-600 cursor-not-allowed'
                            }`}
                          >
                            <span>💡 Show Text</span>
                            <span className="flex items-center gap-1 text-xs">
                              <KokoroCoin size={12} />
                              <span>10</span>
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Instruction hint */}
                <p className="text-amber-400/60 text-xs text-center mb-3">Tap Type → Size → Milk → Syrup → Add Item → Submit.</p>
                
                {/* Order Builder - Mobile Responsive */}
                <div className="border-t border-amber-500/30 pt-4">
                  {/* Current Order Summary */}
                  <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
                    {round1Selections.length > 0 ? (
                      round1Selections.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => removeFromOrder(i)}
                          className="bg-amber-500/30 border border-amber-500/60 rounded-lg px-3 py-1.5 text-sm hover:bg-red-500/30 hover:border-red-500/60 transition text-amber-200 font-medium"
                        >
                          {item.size} {item.type} {item.milk && `(${item.milk})`} {item.syrup && `+ ${item.syrup}`} ✕
                        </button>
                      ))
                    ) : (
                      <p className="text-amber-400/50 text-sm">Receipt preview</p>
                    )}
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${currentItem.type ? 'bg-amber-400' : 'bg-amber-900'}`} />
                      <span className="text-xs text-amber-400/60">Type</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${currentItem.size ? 'bg-amber-400' : 'bg-amber-900'}`} />
                      <span className="text-xs text-amber-400/60">Size</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${currentItem.milk ? 'bg-amber-400' : 'bg-amber-900'}`} />
                      <span className="text-xs text-amber-400/60">Milk</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${currentItem.syrup ? 'bg-amber-400' : 'bg-amber-900'}`} />
                      <span className="text-xs text-amber-400/60">Syrup</span>
                    </div>
                  </div>

                  {/* Selection Grid - 2 columns on mobile, 4 on desktop */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 max-h-[40vh] md:max-h-none overflow-y-auto">
                    {/* TYPE */}
                    <div className="bg-black/30 rounded-xl p-2 md:p-3">
                      <p className="text-xs text-amber-400/60 mb-2 font-semibold uppercase tracking-wide">Type ☕</p>
                      <div className="flex flex-col gap-1">
                        {['Americano', 'Latte', 'Cappuccino', 'Flat White', 'Macchiato', 'Mocha', 'Espresso'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setCurrentItem({...currentItem, type})}
                            className={`py-1.5 px-2 rounded-lg text-xs transition font-medium ${
                              currentItem.type === type 
                                ? 'bg-amber-500 text-black' 
                                : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SIZE */}
                    <div className="bg-black/30 rounded-xl p-2 md:p-3">
                      <p className="text-xs text-amber-400/60 mb-2 font-semibold uppercase tracking-wide">Size 📏</p>
                      <div className="flex flex-col gap-1">
                        {['Small', 'Medium', 'Large'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setCurrentItem({...currentItem, size})}
                            className={`py-1.5 px-2 rounded-lg text-xs transition font-medium ${
                              currentItem.size === size 
                                ? 'bg-amber-500 text-black' 
                                : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* MILK */}
                    <div className="bg-black/30 rounded-xl p-2 md:p-3">
                      <p className="text-xs text-amber-400/60 mb-2 font-semibold uppercase tracking-wide">Milk 🥛</p>
                      <div className="flex flex-col gap-1">
                        {['None', 'Whole', 'Half & Half', 'Oat', 'Almond', 'Nonfat'].map((milk) => (
                          <button
                            key={milk}
                            onClick={() => setCurrentItem({...currentItem, milk: milk === 'None' ? undefined : milk})}
                            className={`py-1.5 px-2 rounded-lg text-xs transition font-medium ${
                              (currentItem.milk === milk || (!currentItem.milk && milk === 'None')) 
                                ? 'bg-amber-500 text-black' 
                                : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'
                            }`}
                          >
                            {milk}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SYRUP */}
                    <div className="bg-black/30 rounded-xl p-2 md:p-3">
                      <p className="text-xs text-amber-400/60 mb-2 font-semibold uppercase tracking-wide">Syrup 🍯</p>
                      <div className="flex flex-col gap-1">
                        {['None', 'Caramel', 'Vanilla', 'Hazelnut'].map((syrup) => (
                          <button
                            key={syrup}
                            onClick={() => setCurrentItem({...currentItem, syrup: syrup === 'None' ? undefined : syrup})}
                            className={`py-1.5 px-2 rounded-lg text-xs transition font-medium ${
                              (currentItem.syrup === syrup || (!currentItem.syrup && syrup === 'None')) 
                                ? 'bg-amber-500 text-black' 
                                : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'
                            }`}
                          >
                            {syrup}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Current Selection Preview */}
                  {(currentItem.type || currentItem.size) && (
                    <div className="bg-amber-900/30 rounded-lg p-2 mb-3 text-center">
                      <p className="text-amber-200 text-sm">
                        Building: <span className="font-semibold">
                          {currentItem.size || '___'} {currentItem.type || '___'}
                          {currentItem.milk && ` (${currentItem.milk})`}
                          {currentItem.syrup && ` + ${currentItem.syrup}`}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Action Buttons - Sticky at bottom */}
                  <div className="sticky bottom-0 bg-black/90 pt-3 -mx-4 md:-mx-6 px-4 md:px-6 pb-2 -mb-4 md:-mb-6 rounded-b-2xl">
                    <div className="flex gap-3">
                      <button
                        onClick={addToOrder}
                        disabled={!currentItem.type || !currentItem.size || round1Selections.length >= currentRoundConfig.itemCount}
                        className="flex-1 py-3 rounded-xl font-semibold text-sm md:text-base transition bg-amber-900/60 hover:bg-amber-900/80 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        + Add Item
                      </button>
                      <button
                        onClick={checkRound1}
                        disabled={round1Selections.length !== currentRoundConfig.itemCount}
                        className="flex-1 py-3 rounded-xl font-semibold text-sm md:text-base transition bg-amber-500 hover:bg-amber-400 text-black disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Submit ✓
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Round 4 - Typing Order */}
            {round === 4 && (
              <>
                <h2 className="text-amber-400 font-sans font-semibold text-2xl text-left mb-1">M31 Coffee Outpost</h2>
                <div className="bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-8 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <img src="/kokorobot-closeup.png" alt="Kokorobot" className="w-20 h-20 rounded-full object-cover border-2 border-amber-500/50" />
                    <div>
                      <p className="text-amber-400 font-sans font-medium text-base md:text-base mb-2" >☕ Customer Training</p>
                      <p className="text-amber-100 text-sm md:text-sm">Your turn to order! What would you like? She can only take ONE order for now.</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    <button
                      onClick={() => setShowMenu(true)}
                      className="text-amber-400 hover:text-amber-300 text-sm transition flex items-center gap-1"
                    >
                      📋 View Menu
                    </button>
                  </div>
                
                <div className="h-64 overflow-y-auto mb-4 space-y-3 bg-black/30 rounded-xl p-4">
                  {round2Chat.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'player' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'npc' && (
                        <img src="/kokorobot-closeup.png" alt="Kokorobot" className="w-12 h-12 rounded-full mr-2 object-cover" />
                      )}
                      <span className={`inline-block rounded-xl px-5 py-3 max-w-[80%] text-lg ${
                        msg.role === 'player' ? 'bg-purple-500 text-white' : 'bg-amber-900/60 text-amber-200'
                      }`}>
                        {msg.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mb-4">
                  {[{key: 'type', label: '☕ Type'}, {key: 'size', label: '📏 Size'}, {key: 'temp', label: '🧊 Temp'}, {key: 'milk', label: '🥛 Milk'}].map(({key, label}) => (
                    <span key={key} className={`px-4 py-2 rounded-full text-base font-medium ${round2Order[key as keyof typeof round2Order] ? 'bg-green-500/30 text-green-400 border border-green-500/50' : 'bg-amber-900/50 text-amber-400/60'}`}>
                      {label} {round2Order[key as keyof typeof round2Order] && '✓'}
                    </span>
                  ))}
                </div>

                {/* Show Confirm/Modify buttons when order is complete */}
                {round2ConfirmStep ? (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setRound2ConfirmStep(false);
                        setRound2Order({ type: false, size: false, milk: false, syrup: false, temp: false });
                        setRound2OrderDetails({});
                        const response = "No problem! What would you like instead?";
                        setRound2Chat(prev => [...prev, { role: 'npc', text: response }]);
                        playAudio('/Audio/kokorobot-greeting.mp3');
                      }}
                      className="flex-1 bg-amber-900/60 hover:bg-amber-900/80 text-amber-200 font-semibold py-4 rounded-xl text-xl border border-amber-500/40"
                    >
                      ✏️ Modify
                    </button>
                    <button 
                      onClick={() => {
                        const response = "Thank you, it will be at the pick up counter.";
                        setRound2Chat(prev => [...prev, { role: 'npc', text: response }]);
                        // Stop background music
                        if (audioRef) {
                          audioRef.pause();
                          setMusicPlaying(false);
                        }
                        playAudio('/Audio/goodresult.mp3', () => {
                          setCoins(prev => prev + 80);
                          // Note: triggerCoinAnimation is now called when investor image loads (prevents race condition)
                          setInvestorMessage({ title: "Impressive!" });
                          setGameState('investor');
                        });
                      }}
                      className="flex-1 bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-xl text-xl"
                    >
                      ✓ Confirm Order
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={round2Input}
                      onChange={(e) => setRound2Input(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && processRound2Input()}
                      placeholder="Type your order..."
                      className="flex-1 bg-amber-900/40 border border-amber-500/40 rounded-xl px-5 py-4 text-xl focus:outline-none focus:border-amber-500 text-white placeholder-amber-400/50"
                    />
                    <button onClick={processRound2Input} className="bg-purple-500 hover:bg-purple-400 text-white font-semibold px-10 rounded-xl text-xl">
                      Send
                    </button>
                  </div>
                )}
                
                {/* Skip option with coin info */}
                <div className="mt-4 pt-4 border-t border-amber-500/20 text-center">
                  <p className="text-amber-400/60 text-xs mb-2">Round 4: Type your order · Earn +80 coins</p>
                  <button
                    onClick={() => {
                      // Skip to next round without coins
                      setRound(5);
                      setGameState('playing');
                      setShowDialogue(true);
                      setRound3Transcript('');
                      setRound3ConfirmStep(false);
                      startBackgroundMusic(5);
                    }}
                    className="text-zinc-500 hover:text-zinc-300 text-sm transition underline"
                  >
                    Skip this round (no coins)
                  </button>
                </div>
              </div>
            </>
            )}

            {/* Round 5 - Speaking Order */}
            {round === 5 && (
              <>
                <h2 className="text-amber-400 font-sans font-semibold text-2xl text-left ml-4 mb-1">M31 Coffee Outpost</h2>
                <div className="bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-8 shadow-2xl text-center">
                  <img src="/kokorobot-closeup.png" alt="Kokorobot" className="w-24 h-24 rounded-full object-cover border-2 border-amber-500/50 mx-auto mb-2" />
                  <p className="text-amber-400 font-sans font-medium text-base md:text-base mb-1">☕ Customer Training</p>
                  <p className="text-amber-100 text-sm md:text-sm mb-3">Now train her to take your order by voice!</p>
                  
                  <div className="flex justify-center mb-4">
                    <button
                      onClick={() => setShowMenu(true)}
                      className="text-amber-400 hover:text-amber-300 text-xs transition flex items-center gap-1"
                    >
                      📋 View Menu
                    </button>
                  </div>
                  
                  {!round3ConfirmStep ? (
                    <>
                      <button
                        onClick={startListening}
                        disabled={round3Listening}
                        className={`w-40 h-40 rounded-full font-semibold text-4xl transition mx-auto mb-6 shadow-lg ${
                          round3Listening ? 'bg-red-500 animate-pulse shadow-red-500/50' : 'bg-gradient-to-r from-green-500 to-amber-500 hover:from-green-400 hover:to-amber-400 shadow-green-500/30'
                        }`}
                      >
                        {round3Listening ? '🎤' : '🎤 Speak'}
                    </button>

                    {round3Transcript && (
                      <div className="bg-amber-900/40 rounded-xl p-5 mb-5 text-left border border-amber-500/30">
                        <p className="text-base text-amber-400/80 mb-1">You said:</p>
                        <p className="text-2xl text-white">"{round3Transcript}"</p>
                      </div>
                    )}

                    {round3CurrentQuestion && !round3ConfirmStep && (
                      <div className="bg-amber-900/40 rounded-xl p-5 text-left border border-amber-500/30">
                        <p className="text-yellow-400 text-xl mb-4">🎤 {round3CurrentQuestion}</p>
                        <p className="text-amber-400/60 text-base mb-4">Tap the mic to answer</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Order Summary with Confirm/Modify */}
                    <div className="text-center">
                      <div className="bg-green-900/30 rounded-xl p-6 mb-6 border border-green-500/50">
                        <p className="text-2xl text-white">{round3CurrentQuestion}</p>
                      </div>
                      
                      <div className="flex gap-3">
                        <button 
                          onClick={() => {
                            setRound3ConfirmStep(false);
                            setRound3Order({ type: false, size: false, milk: false, temp: false, syrup: false });
                            setRound3OrderDetails({});
                            setRound3Transcript('');
                            setRound3CurrentQuestion('');
                          }}
                          className="flex-1 bg-amber-900/60 hover:bg-amber-900/80 text-amber-200 font-semibold py-4 rounded-xl text-xl border border-amber-500/40"
                        >
                          ✏️ Modify
                        </button>
                        <button 
                          onClick={acceptRound3Score}
                          className="flex-1 bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-xl text-xl"
                        >
                          ✓ Confirm Order
                        </button>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Skip option with coin info */}
                <div className="mt-4 pt-4 border-t border-amber-500/20">
                  <p className="text-amber-400/60 text-xs mb-2">Round 5: Speak your order · Earn +100 coins</p>
                  <button
                    onClick={() => {
                      // Skip to completion without coins
                      stopBackgroundMusic();
                      setInvestorMessage({ title: "You're a natural!" });
                      setGameState('investor');
                    }}
                    className="text-zinc-500 hover:text-zinc-300 text-sm transition underline"
                  >
                    Skip this round (no coins)
                  </button>
                </div>
              </div>
            </>
            )}
            </div>
          </div>
        </div>
      )}

      {/* Earth Investor Video Call - Frame-based layout */}
      {gameState === 'investor' && (
        <div className="fixed inset-0 z-40 bg-black flex items-center justify-center">
          {/* FRAME: everything pins to this box, not the viewport */}
          <div className="relative w-full h-full md:w-[min(96vw,1200px)] md:h-[min(92vh,800px)] md:rounded-2xl overflow-hidden bg-black">
            
            {/* Background image - fills the frame */}
            <img 
              src={round === 1 ? "/ib.webp" : `/NY-investor${round}.webp`}
              srcSet={round === 1 
                ? "/ib-mobile.webp 768w, /ib.webp 1920w"
                : `/NY-investor${round}-mobile.webp 768w, /NY-investor${round}.webp 1920w`
              }
              sizes="(max-width: 768px) 768px, 1920px"
              alt="Earth Investor calling from spaceship" 
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
            
            {/* All overlays inside the same frame */}
            <div className="absolute inset-0 z-50 pointer-events-none">
              
              {/* Lighter gradient overlay for HUD readability */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/70 via-black/40 to-transparent pointer-events-none" />
              
              {/* HUD - top bar */}
              <div className="absolute top-5 md:top-4 left-4 right-4 md:left-6 md:right-6 flex justify-between items-center pointer-events-auto">
                <div className="bg-black/80 rounded-full px-3 md:px-4 py-1 md:py-1.5 border border-zinc-500/30 flex items-center">
                  <span className="text-zinc-100 font-sans text-xs md:text-sm whitespace-nowrap">M31 · Lv.3 · {round}/5</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  {/* Balance - coins fly here */}
                  <div className="bg-black/80 rounded-full px-3 md:px-4 py-1 md:py-1.5 border border-zinc-500/30 flex items-center gap-1 md:gap-2">
                    <KokoroCoin size={20} className="md:w-5 md:h-5" />
                    <span className="text-zinc-100 font-sans text-xs md:text-sm">{coins}</span>
                  </div>
                  {/* Save button */}
                  <button 
                    onClick={() => alert('✅ Progress saved locally!')}
                    className="bg-black/80 rounded-full px-2 md:px-3 py-1 md:py-1.5 border border-zinc-500/30 hover:bg-black/60 transition flex items-center"
                    title="Save Progress"
                    aria-label="Save Progress"
                  >
                    <span className="text-zinc-100 text-xs md:text-sm">✅ </span>
                  </button>
                  {/* Exit button */}
                  <button 
                    onClick={() => { 
                      if(confirm('Exit game? Your progress is saved.')) {
                        track('mission_abandoned', { round, level: 3, coins_at_exit: coins, state: 'investor' });
                        window.location.href = '/'; 
                      }
                    }}
                    className="bg-black/80 rounded-full px-2 md:px-3 py-1 md:py-1.5 border border-zinc-500/30 hover:bg-black/60 transition flex items-center"
                    title="Exit Game"
                    aria-label="Exit Game"
                  >
                    <span className="text-zinc-100 text-xs md:text-sm">✕</span>
                  </button>
                </div>
              </div>

              {/* LIVE indicator - just below HUD */}
              <div className="absolute top-16 md:top-12 left-5 md:left-6 flex items-center gap-2 pointer-events-none">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                <span className="text-green-400 text-xs md:text-base font-sans font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {round === 5 
                    ? <>
                        <span className="md:hidden">LIVE: LEVEL 3 CLEAR!!! {totalCoinsEarned} COINS EARNED!</span>
                        <span className="hidden md:inline">LIVE: LEVEL 3 CLEAR!!! {totalCoinsEarned} COINS EARNED!</span>
                      </>
                    : `LIVE: +${round === 1 ? 20 : round === 2 ? 30 : round === 3 ? 50 : round === 4 ? 80 : 100} COINS FROM EARTH!`
                  }
                </span>
              </div>

              {/* Bellagio-style fountain jets */}
              {showCoinAnimation && (
                <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                  {animatedCoins.map((coin) => (
                    <div
                      key={coin.id}
                      className="absolute animate-fountain-jet"
                      style={{
                        '--jx': `${coin.x}px`,
                        '--jy': `${coin.y}px`,
                        '--s': coin.scale,
                        animationDelay: `${coin.delay}s`
                      } as React.CSSProperties}
                    >
                      <div className="relative">
                        <KokoroCoin size={32} className="drop-shadow-[0_0_15px_rgba(255,215,0,0.9)]" />
                        <div className="absolute inset-0 w-8 h-8 bg-yellow-400/40 rounded-full blur-md -z-10" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Coin flying animation */}
              <div className="absolute top-[55%] left-1/2 animate-fly-to-balance">
                <div className="flex items-center gap-1 md:gap-2 bg-black/70 px-3 md:px-4 py-1 md:py-2 rounded-full">
                  <KokoroCoin size={24} className="md:w-8 md:h-8" />
                  <span className="text-yellow-400 font-semibold text-lg md:text-2xl">+{round === 1 ? 20 : round === 2 ? 30 : round === 3 ? 50 : round === 4 ? 80 : 100}</span>
                </div>
              </div>

              {/* Title/Subtitle - centered */}
              <div className={`absolute left-[55%] -translate-x-1/2 w-[min(92%,520px)] text-center pointer-events-none ${
                round === 5 ? 'top-[50%] -translate-y-1/2' : 'top-[50%] -translate-y-1/2'
              }`}>
                <h2 className="text-2xl md:text-4xl font-medium text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {investorMessage.title}
                </h2>
                {round === 5 ? (
                  <p className="mt-2 text-base md:text-xl text-white/90 leading-snug drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    Ready for more levels in new outposts?
                  </p>
                ) : (
                  investorMessage.subtitle && (
                    <p className="mt-2 text-base md:text-xl text-white/90 leading-snug drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {investorMessage.subtitle}
                    </p>
                  )
                )}
              </div>

              {/* CTAs - positioned based on round */}
              <div 
                className={`absolute flex gap-2 md:gap-3 flex-col pointer-events-auto ${
                  round === 5
                    ? 'bottom-20 md:bottom-[20%] right-8 md:right-24 items-end'
                    : round === 3 || round === 4
                    ? 'bottom-20 md:bottom-[25%] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-24 items-center md:items-end w-[min(92%,360px)] md:w-auto'
                    : 'bottom-24 md:bottom-[30%] right-8 md:right-24 items-end'
                }`}
              >
                {/* Rounds 3 and 4: Build Your Café + Next Round */}
                {(round === 3 || round === 4) && (
                  <>
                    <button
                      onClick={() => setShowCafeShop(true)}
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold py-2.5 px-8 rounded-lg text-base transition border border-zinc-100/30"
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                    >
                      Build Your Café
                    </button>
                    <button
                      onClick={completeGame}
                      className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold py-2.5 px-8 rounded-lg text-base transition shadow-lg border border-zinc-400/50"
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                    >
                      Next Round →
                    </button>
                  </>
                )}
                
                {/* Round 5: Completion CTAs */}
                {round === 5 && (
                  <>
                    <button
                      onClick={() => {
                        track('cta_signup_clicked', { round: 5, level: 3, coins_earned: totalCoinsEarned });
                        setShowEmailModal(true);
                      }}
                      className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold py-3 px-8 rounded-lg text-base transition shadow-lg border border-zinc-400/50"
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                    >
                      Save {totalCoinsEarned} Coins Earned
                    </button>
                    <div className="flex flex-col items-end">
                      <button
                        onClick={() => setShowCafeShop(true)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold py-3 px-8 rounded-lg text-base transition border border-zinc-100/30"
                        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                      >
                        Build Your Café
                      </button>
                      <button
                        onClick={openFeedbackForm}
                        className="text-white hover:text-black text-sm font-semibold mt-1 transition underline underline-offset-4"
                        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                      >
                        Send Feedback
                      </button>
                    </div>
                  </>
                )}
                
                {/* Rounds 1-2: Just Next Round */}
                {round < 3 && (
                  <button
                    onClick={completeGame}
                    className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 font-semibold py-2.5 px-8 rounded-lg text-base transition shadow-lg border border-zinc-100/30"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    Next Round →
                  </button>
                )}
              </div>
              
            </div>
          </div>
        </div>
      )}

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes fountain-jet {
          0% {
            opacity: 0;
            transform: translateX(var(--jx)) translateY(50px) scale(0.3);
          }
          15% {
            opacity: 1;
            transform: translateX(var(--jx)) translateY(var(--jy)) scale(var(--s));
          }
          35% {
            opacity: 1;
            transform: translateX(var(--jx)) translateY(calc(var(--jy) * 0.7)) scale(var(--s)) rotate(90deg);
          }
          55% {
            opacity: 1;
            transform: translateX(var(--jx)) translateY(calc(var(--jy) * 0.4)) scale(var(--s)) rotate(180deg);
          }
          75% {
            opacity: 0.8;
            transform: translateX(calc(var(--jx) * 0.3 + 40%)) translateY(calc(var(--jy) * 0.1 - 45%)) scale(calc(var(--s) * 0.6)) rotate(270deg);
          }
          100% {
            opacity: 0;
            transform: translateX(45%) translateY(-48%) scale(0.15);
          }
        }
        .animate-fountain-jet {
          animation: fountain-jet 2.8s ease-out forwards;
        }
        @keyframes walk {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(-2deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-6px) rotate(2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-walk {
          animation: walk 0.5s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes pop-in {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.4s ease-out;
        }
        @keyframes fly-to-balance {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          70% {
            opacity: 1;
            transform: translate(42%, -52%) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translate(42%, -52%) scale(0.5);
          }
        }
        .animate-fly-to-balance {
          animation: fly-to-balance 1.5s ease-in-out forwards;
        }
      `}</style>

      {/* Menu Popup - Chalkboard Style */}
      {showMenu && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowMenu(false)}>
          <div 
            className="bg-zinc-900 rounded-xl p-8 max-w-2xl w-full border-4 border-zinc-700 shadow-2xl"
            onClick={e => e.stopPropagation()}
            style={{ 
              backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5)'
            }}
          >
            <h2 className="text-4xl font-medium text-center mb-8 text-white" style={{ fontFamily: 'Georgia, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              ☕ Our Menu
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {menuItems.map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-zinc-700/50 pb-3">
                  <div>
                    <p className="text-2xl text-white font-medium" style={{ fontFamily: 'Georgia, serif' }}>{item.name}</p>
                    <p className="text-zinc-400 text-sm italic">{item.desc}</p>
                  </div>
                  <div className="text-zinc-500 text-xl">•••</div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowMenu(false)}
              className="mt-8 w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg text-lg"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Cafe Shop */}
      {showCafeShop && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-6 max-w-4xl w-full border border-amber-500/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-medium text-amber-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>🏪 Choose Your Café</h2>
              <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full">
                <KokoroCoin size={28} />
                <span className="text-yellow-400 font-bold text-xl">{coins}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {cafeOptions.map((cafe) => {
                const owned = purchasedCafes.includes(cafe.id);
                const canAfford = coins >= cafe.price;
                return (
                  <div 
                    key={cafe.id}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                      owned ? 'border-green-500 cursor-pointer hover:scale-105' : canAfford ? 'border-amber-500 hover:border-amber-400 cursor-pointer hover:scale-105' : 'border-zinc-600 opacity-50'
                    }`}
                    onClick={() => {
                      if (owned) {
                        // Show owned popup with options
                        setOwnedCafeToView(cafe);
                        setShowOwnedPopup(true);
                      } else if (canAfford) {
                        // Show purchase confirmation
                        setSelectedCafe(cafe);
                        setShowPurchaseConfirm(true);
                      } else {
                        setShowCoinShop(true);
                      }
                    }}
                  >
                    <div className="relative">
                      <img src={cafe.image} alt={cafe.name} className="w-full h-32 object-cover bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90" />
                      {owned && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          ✓ OWNED
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-black/80">
                      <p className="text-white font-medium text-sm" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{cafe.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {owned ? (
                          <span className="text-green-400 text-sm">Tap to view options</span>
                        ) : (
                          <>
                            <KokoroCoin size={18} />
                            <span className={`font-bold ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>{cafe.price}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Different buttons based on whether game is complete (round 5) or mid-game */}
            {round === 5 ? (
              <>
                {/* Round 5 Complete: Full options */}
                <div className="flex gap-3 mb-4">
                  <button 
                    onClick={() => {
                      alert('🎯 New conversation sets coming soon! Stay tuned for more scenarios to practice.');
                    }}
                    className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-lg border border-zinc-600"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    🎯 Try a New Set
                  </button>
                  <button 
                    onClick={() => {
                      alert('🏪 More outposts coming soon! Restaurant, Department Store, and more.');
                    }}
                    className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-lg border border-zinc-600"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    🏬 Choose New Outpost
                  </button>
                </div>
                
                <button 
                  onClick={() => {
                    alert('🗺️ M31 Map coming soon! Your cafés are saved in inventory.');
                  }}
                  className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-lg border border-zinc-600 mb-4"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  🗺️ Go to M31 Map
                </button>
                
                {/* Small Links - all mustard yellow */}
                <div className="flex justify-center gap-6 pt-2 border-t border-zinc-700">
                  <button 
                    onClick={() => setShowCoinShop(true)}
                    className="text-amber-400 hover:text-amber-300 text-sm font-medium transition"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    💰 Buy Coins
                  </button>
                  <button 
                    onClick={() => {
                      setShowCafeShop(false);
                      setShowInventory(true);
                    }}
                    className="text-amber-400 hover:text-amber-300 text-sm font-medium transition"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    📦 Check Inventory
                  </button>
                  <button 
                    onClick={() => {
                      setShowCafeShop(false);
                    }}
                    className="text-amber-400 hover:text-amber-300 text-sm font-medium transition"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    💾 Save & Exit
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Mid-game (rounds 3-4): Simple options */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowCoinShop(true)}
                    className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-semibold rounded-lg border border-zinc-600"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    💰 Buy Coins
                  </button>
                  <button 
                    onClick={() => {
                      setShowCafeShop(false);
                      completeGame();
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold rounded-lg"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    ▶️ Keep Playing
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Purchase Confirmation Popup */}
      {showPurchaseConfirm && selectedCafe && (
        <div className="fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-8 max-w-md w-full border border-amber-500/50 text-center">
            <h3 className="text-2xl font-medium text-amber-400 mb-4">🏪 Purchase Café?</h3>
            <img 
              src={selectedCafe.image} 
              alt={selectedCafe.name} 
              className="w-48 h-48 object-cover rounded-xl mx-auto mb-4 border-2 border-amber-500/30 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90"
            />
            <p className="text-white text-xl font-semibold mb-2">{selectedCafe.name}</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-zinc-400">Price:</span>
              <KokoroCoin size={24} />
              <span className="text-yellow-400 font-bold text-xl">{selectedCafe.price}</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-6 bg-black/50 py-2 px-4 rounded-full inline-flex">
              <span className="text-zinc-400">Your balance:</span>
              <KokoroCoin size={20} />
              <span className="text-yellow-400 font-semibold">{coins}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPurchaseConfirm(false);
                  setSelectedCafe(null);
                }}
                className="flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Process purchase
                  setCoins(prev => prev - selectedCafe.price);
                  setPurchasedCafes(prev => [...prev, selectedCafe.id]);
                  setShowPurchaseConfirm(false);
                  // Show just purchased popup
                  setJustPurchasedCafe(selectedCafe);
                  setShowJustPurchased(true);
                  setSelectedCafe(null);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold rounded-lg"
              >
                ✓ Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Just Purchased Popup */}
      {showJustPurchased && justPurchasedCafe && (
        <div className="fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-green-900/80 to-zinc-900 rounded-2xl p-8 max-w-md w-full border border-green-500/50 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-green-400 mb-4">Congratulations!</h3>
            <img 
              src={justPurchasedCafe.image} 
              alt={justPurchasedCafe.name} 
              className="w-48 h-48 object-cover rounded-xl mx-auto mb-4 border-2 border-green-500/50 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90"
            />
            <p className="text-white text-xl mb-2">{justPurchasedCafe.name}</p>
            <p className="text-green-300 mb-6">is now in your inventory!</p>
            <p className="text-zinc-400 text-sm mb-6">What would you like to do?</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowJustPurchased(false);
                  setJustPurchasedCafe(null);
                  alert('🗺️ M31 Map coming soon! Your café is saved in inventory.');
                }}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold rounded-lg"
              >
                🗺️ Place on M31 Map
              </button>
              <button
                onClick={() => {
                  setShowJustPurchased(false);
                  setJustPurchasedCafe(null);
                  setShowCafeShop(false);
                  setShowInventory(true);
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold rounded-lg"
              >
                📦 Check Inventory
              </button>
              <button
                onClick={() => {
                  setShowJustPurchased(false);
                  setJustPurchasedCafe(null);
                  alert('🎯 New conversation sets coming soon! Stay tuned for more scenarios to practice.');
                }}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold rounded-lg"
              >
                🎯 Try a New Set
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Owned Cafe Popup */}
      {showOwnedPopup && ownedCafeToView && (
        <div className="fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-8 max-w-md w-full border border-green-500/50 text-center relative">
            <h3 className="text-2xl font-bold text-green-400 mb-4">🏪 {ownedCafeToView.name}</h3>
            <img 
              src={ownedCafeToView.image} 
              alt={ownedCafeToView.name} 
              className="w-48 h-48 object-cover rounded-xl mx-auto mb-6 border-2 border-green-500/50 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90"
            />
            <p className="text-zinc-300 mb-6">This café is in your inventory. What would you like to do?</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowOwnedPopup(false);
                  setOwnedCafeToView(null);
                  alert('🗺️ M31 Map coming soon! Your café is saved in inventory.');
                }}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold rounded-lg"
              >
                🗺️ Place on M31 Map
              </button>
              <button
                onClick={() => {
                  setShowOwnedPopup(false);
                  setOwnedCafeToView(null);
                  setShowCafeShop(false);
                  setShowInventory(true);
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold rounded-lg"
              >
                📦 Check Inventory
              </button>
              <button
                onClick={() => {
                  setShowOwnedPopup(false);
                  setOwnedCafeToView(null);
                  alert('🎯 New conversation sets coming soon! Stay tuned for more scenarios to practice.');
                }}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold rounded-lg"
              >
                🎯 Try a New Set
              </button>
              <button
                onClick={() => {
                  setShowOwnedPopup(false);
                  setOwnedCafeToView(null);
                }}
                className="w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Friendly Feedback Modal - Wrong Answer */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-amber-200">
            {/* Kokoro kaomoji face */}
            <div className="text-5xl mb-4 text-amber-900 relative inline-block" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              <span>{"(๑>◡<๑)"}</span>
              {/* Pink cheeks */}
              <span className="absolute left-[15%] top-[45%] w-3 h-3 bg-pink-300 rounded-full opacity-70"></span>
              <span className="absolute right-[15%] top-[45%] w-3 h-3 bg-pink-300 rounded-full opacity-70"></span>
            </div>
            <h3 className="text-2xl font-medium text-amber-800 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Almost there!
            </h3>
            <p className="text-amber-700 mb-6 text-base leading-relaxed">
              Let's try again! Tap 🔊 Replay to hear the order.
            </p>
            <button
              onClick={() => {
                setShowFeedbackModal(false);
                replayVoice();
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-900 font-bold rounded-full text-lg shadow-lg transition-all"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              🔊 Replay Order
            </button>
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="mt-3 text-amber-600 hover:text-amber-800 font-medium transition-colors"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}

      {/* Email Capture Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90] flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-3xl p-6 md:p-8 max-w-md w-full text-center shadow-2xl border border-pink-500/30">
            {!emailSubmitted ? (
              <>
                {/* Header */}
                <div className="mb-6">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    Save Your Progress!
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base">
                    Keep your <span className="text-yellow-400 font-semibold">{totalCoinsEarned} coins</span> for new levels
                  </p>
                </div>
                
                {/* Email Input */}
                <div className="mb-4">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      setEmailError('');
                    }}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-700/50 border border-zinc-600 text-white placeholder-zinc-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-base"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  />
                  {emailError && (
                    <p className="text-red-400 text-sm mt-2">{emailError}</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <button
                  onClick={handleEmailSubmit}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold rounded-full text-lg shadow-lg transition-all mb-3"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  Get Notified at Launch 🚀
                </button>
                
                {/* Privacy note */}
                <p className="text-zinc-500 text-xs mb-4">
                  We'll only email you about RPG for Humanity updates.
                </p>
                
                {/* Close button */}
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-zinc-400 hover:text-white text-sm transition-colors"
                >
                  Maybe later
                </button>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="py-4">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    You're on the list!
                  </h3>
                  <p className="text-zinc-300 text-sm md:text-base">
                    We'll notify you when new levels are ready.
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4 text-yellow-400">
                    <KokoroCoin size={24} />
                    <span className="font-semibold">{totalCoinsEarned} coins saved</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Coin Shop */}
      {showCoinShop && (
        <div className="fixed inset-0 bg-black/90 z-[80] flex items-center justify-center p-4" onClick={() => setShowCoinShop(false)}>
          <div 
            className="bg-gradient-to-b from-purple-900 to-zinc-900 rounded-2xl p-6 max-w-md w-full border border-purple-500/50"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-3xl font-medium text-center text-purple-300 mb-6">💰 Coin Shop</h2>
            
            <div className="space-y-4 mb-6">
              {coinBundles.map((bundle) => (
                <div 
                  key={bundle.id}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                    bundle.best ? 'border-yellow-400 bg-yellow-400/10' : 'border-zinc-600 bg-zinc-800/50 hover:border-purple-500'
                  }`}
                  onClick={() => {
                    // Simulate purchase (in real app, this would go to payment)
                    setCoins(prev => prev + bundle.coins);
                    setShowCoinShop(false);
                  }}
                >
                  {bundle.best && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                      ⭐ BEST VALUE
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-bold text-lg">{bundle.label}</p>
                      <div className="flex items-center gap-2">
                        <KokoroCoin size={28} />
                        <span className="text-yellow-400 font-bold text-2xl">{bundle.coins.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl text-xl">
                      {bundle.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setShowCoinShop(false)}
              className="w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}

      {/* Inventory View */}
      {showInventory && (
        <div className="fixed inset-0 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 z-[60] flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700">
            <button
              onClick={() => setShowInventory(false)}
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition font-medium"
            >
              <span className="text-xl">←</span>
              <span>Back to Coffee Outpost</span>
            </button>
            <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full">
              <KokoroCoin size={28} />
              <span className="text-yellow-400 font-bold text-xl">{coins}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 px-6 py-4 border-b border-zinc-700">
            <button
              onClick={() => setInventoryTab('buildings')}
              className={`px-6 py-3 rounded-xl font-semibold transition ${
                inventoryTab === 'buildings'
                  ? 'bg-amber-500 text-black'
                  : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
              }`}
            >
              🏪 Buildings
            </button>
            <button
              onClick={() => setInventoryTab('kokorobots')}
              className="px-6 py-3 rounded-xl font-semibold bg-zinc-800 text-zinc-500 cursor-not-allowed flex items-center gap-2"
              disabled
            >
              🤖 Kokorobots
              <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded-full">Soon</span>
            </button>
            <button
              className="px-6 py-3 rounded-xl font-semibold bg-zinc-800 text-zinc-500 cursor-not-allowed flex items-center gap-2"
              disabled
            >
              🌳 Items
              <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded-full">Soon</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {inventoryTab === 'buildings' && (
              <div>
                <h2 className="text-2xl font-medium text-white mb-6">Your Buildings</h2>
                
                {purchasedCafes.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🏪</div>
                    <p className="text-zinc-400 text-xl mb-6">No buildings yet!</p>
                    <button
                      onClick={() => {
                        setShowInventory(false);
                        setShowCafeShop(true);
                      }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold py-3 px-8 rounded-full text-lg transition"
                    >
                      🛒 Shop for Cafés
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Buildings Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                      {purchasedCafes.map((cafeId) => {
                        const cafe = cafeOptions.find(c => c.id === cafeId);
                        if (!cafe) return null;
                        const isSelected = selectedInventoryItem === cafeId;
                        return (
                          <div
                            key={cafeId}
                            onClick={() => setSelectedInventoryItem(isSelected ? null : cafeId)}
                            className={`relative rounded-xl overflow-hidden cursor-pointer transition-all transform hover:scale-105 ${
                              isSelected 
                                ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-zinc-800' 
                                : 'border-2 border-zinc-600 hover:border-amber-500/50'
                            }`}
                          >
                            <img 
                              src={cafe.image} 
                              alt={cafe.name}
                              className="w-full aspect-square object-cover bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                              <p className="text-white font-semibold text-sm">{cafe.name}</p>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-amber-400 text-black rounded-full p-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      
                      {/* Buy More Card */}
                      <div
                        onClick={() => {
                          setShowInventory(false);
                          setShowCafeShop(true);
                        }}
                        className="rounded-xl border-2 border-dashed border-zinc-600 hover:border-amber-500/50 cursor-pointer transition-all flex flex-col items-center justify-center aspect-square bg-zinc-800/50 hover:bg-zinc-800"
                      >
                        <span className="text-4xl mb-2">+</span>
                        <span className="text-zinc-400 font-medium">Buy More</span>
                      </div>
                    </div>

                    {/* Action Button - only show when item selected */}
                    {selectedInventoryItem && (
                      <div className="flex justify-center mb-8">
                        <button
                          onClick={() => {
                            alert('🗺️ M31 Map coming soon! Your café is saved and ready to place.');
                          }}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold py-4 px-10 rounded-full text-xl transition shadow-lg shadow-blue-500/30"
                        >
                          🗺️ Place on M31 Map
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {inventoryTab === 'kokorobots' && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🤖</div>
                <h2 className="text-2xl font-medium text-white mb-4">Kokorobots Coming Soon!</h2>
                <p className="text-zinc-400 max-w-md mx-auto">
                  Customize your Kokorobot's appearance — change hairstyles, suits, colors, and more!
                </p>
              </div>
            )}

          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-t border-zinc-700 bg-zinc-900/80">
            <button
              onClick={() => {
                alert('🏬 All Outposts hub coming soon! Practice at different locations.');
              }}
              className="text-amber-400 hover:text-amber-300 font-semibold text-lg transition flex items-center gap-2"
            >
              🏬 All Outposts
            </button>
            <button
              onClick={() => {
                setShowInventory(false);
                alert('✅ Progress saved! Your coins and items are stored.');
              }}
              className="text-amber-400 hover:text-amber-300 font-semibold text-lg transition"
            >
              Save & Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}