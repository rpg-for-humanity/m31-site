'use client';

import { useState, useEffect } from 'react';

type Round = 1 | 2 | 3 | 4 | 5;
type GameState = 'intro' | 'walking' | 'playing' | 'investor';
type OrderItem = {
  type: string;
  size: string;
  temp?: string;
  milk?: string;
  syrup?: string;
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
  const [investorMessage, setInvestorMessage] = useState('');
  const [showDialogue, setShowDialogue] = useState(false);
  const [isNpcSpeaking, setIsNpcSpeaking] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [animatedCoins, setAnimatedCoins] = useState<Coin[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Menu and Shop states
  const [showMenu, setShowMenu] = useState(false);
  const [showCafeShop, setShowCafeShop] = useState(false);
  const [showCoinShop, setShowCoinShop] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [inventoryTab, setInventoryTab] = useState<'buildings' | 'kokorobots' | 'sets'>('buildings');
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<string | null>(null);
  const [purchasedCafes, setPurchasedCafes] = useState<string[]>([]);
  
  // Purchase confirmation popup states
  const [showPurchaseConfirm, setShowPurchaseConfirm] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<{id: string, name: string, price: number, image: string} | null>(null);
  const [showJustPurchased, setShowJustPurchased] = useState(false);
  const [justPurchasedCafe, setJustPurchasedCafe] = useState<{id: string, name: string, price: number, image: string} | null>(null);
  const [showOwnedPopup, setShowOwnedPopup] = useState(false);
  const [ownedCafeToView, setOwnedCafeToView] = useState<{id: string, name: string, image: string} | null>(null);

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
  
  // Cafe options - Updated prices
  const cafeOptions = [
    { id: 'coffeepost', name: 'Coffee Post', price: 500, image: '/coffeepost.png' },
    { id: 'retrocafe', name: 'Retro Café', price: 800, image: '/retrocafe.png' },
    { id: 'flowercafe', name: 'Flower Café', price: 1000, image: '/flowercafe.png' },
    { id: 'moderncafe', name: 'Modern Café', price: 1500, image: '/moderncafe.png' },
    { id: 'rocococafe', name: 'Rococo Café', price: 2000, image: '/rocococafe.png' },
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
      npcOrder: "Hi, a caramel macchiato, medium please.",
      correctOrder: [{ type: 'Macchiato', size: 'Medium', syrup: 'Caramel' }] as OrderItem[],
      itemCount: 1
    },
    2: {
      audio: '/Audio/round2-order.mp3', 
      npcOrder: "Hi, I'd like a large flat white, with hazelnut syrup please.",
      correctOrder: [{ type: 'Flat White', size: 'Large', syrup: 'Hazelnut' }] as OrderItem[],
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

  // Intro - Kokorobot walks to center-left, then mission fades in
  useEffect(() => {
    if (gameState === 'intro') {
      setKokoroX(-200);
      setIsWalking(true);
      setIntroReady(false);
      setMissionVisible(false);
      
      const walkIn = setInterval(() => {
        setKokoroX(prev => {
          // Walk to about 25% from left
          const target = window.innerWidth * 0.25;
          if (prev >= target) {
            clearInterval(walkIn);
            setIsWalking(false);
            // Mission fades in after Kokorobot stops
            setTimeout(() => {
              setMissionVisible(true);
              setTimeout(() => setIntroReady(true), 400);
            }, 200);
            return target;
          }
          return prev + 10;
        });
      }, 20);
      
      return () => clearInterval(walkIn);
    }
  }, [gameState]);

  // Bellagio-style fountain - vertical jets spread from left to right, shoot up, then go to balance
  const triggerCoinAnimation = (currentRound: number) => {
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
    const preferred = ['Samantha', 'Karen', 'Moira', 'Tessa', 'Fiona', 'Victoria', 'Zira', 'Hazel'];
    
    for (const name of preferred) {
      const voice = voices.find(v => v.name.includes(name));
      if (voice) return voice;
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

  const playRoundOrder = (forceRound?: number) => {
    // Only for rounds 1-3 (listen & select)
    const targetRound = forceRound || round;
    const config = roundConfigs[targetRound as 1 | 2 | 3];
    if (!config) return;
    
    console.log(`Playing round ${targetRound} order audio: ${config.audio}`);
    
    // Pause background music while voice plays
    if (audioRef) {
      audioRef.pause();
    }
    
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = config.audio;
    audio.volume = 0.8;
    setIsNpcSpeaking(true);
    
    audio.oncanplay = () => {
      console.log('Audio can play');
      audio.play().then(() => {
        console.log('Audio playing successfully');
      }).catch(err => {
        console.error('Play failed:', err);
        speakTTS(config.npcOrder);
      });
    };
    
    audio.onended = () => {
      console.log('Audio ended');
      setIsNpcSpeaking(false);
      // DON'T start music here - it's already started in completeGame
      // Just resume if it was paused
      if (audioRef && musicPlaying) {
        audioRef.play().catch(() => {});
      }
    };
    
    audio.onerror = (e) => {
      console.error('Audio load error - trying fetch:', e);
      fetch(config.audio)
        .then(res => {
          console.log('Fetch status:', res.status, res.statusText);
          if (!res.ok) {
            speakTTS(config.npcOrder);
          }
        })
        .catch(fetchErr => {
          console.error('Fetch also failed:', fetchErr);
          speakTTS(config.npcOrder);
        });
    };
  };

  const getMusicForRound = (r: number) => {
    // music-round1.mp3 for Round 1-2, music-round2.mp3 for round 3, music-round3.mp3 for round 4,5
    if (r <= 2) return '/Audio/music-round1.mp3';
    if (r === 3) return '/Audio/music-round2.mp3';
    return '/Audio/music-round3.mp3'; // rounds 4 and 5
  };

  // Use a module-level variable to ensure only ONE audio instance exists
  const startBackgroundMusic = (forceRound?: number | boolean) => {
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
    
    const audio = new Audio(musicFile);
    audio.loop = true;
    audio.volume = 0.05; // 5% volume
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
      audioRef.src = '';
    }
    // Kill any orphaned audio
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
    setMusicPlaying(false);
  };

  const speakTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
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
      // Resume only the main audioRef
      if (audioRef) {
        audioRef.play().catch(() => {});
      }
      setMusicPlaying(true);
    }
  };

  const startGame = () => {
    setGameState('walking');
    setShowTranscript(false);
    setIsWalking(true);
    
    // Walk to center then transition
    const walkToCenter = setInterval(() => {
      setKokoroX(prev => {
        const target = window.innerWidth / 2 - 80;
        if (prev >= target) {
          clearInterval(walkToCenter);
          shrinkAndTransition();
          return target;
        }
        return prev + 12;
      });
    }, 20);
  };

  const shrinkAndTransition = () => {
    setIsWalking(false);
    
    let scale = 1;
    let opacity = 1;
    
    const shrinkInterval = setInterval(() => {
      scale -= 0.08;
      opacity -= 0.08;
      setKokoroScale(scale);
      setKokoroOpacity(opacity);
      
      if (scale <= 0) {
        clearInterval(shrinkInterval);
        setShowFullBody(false);
        setGameState('playing');
        setShowDialogue(true);
        playRoundOrder();
        startBackgroundMusic(1); // Start music for Round 1
      }
    }, 25);
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
    
    if (isCorrect) {
      // Stop background music completely
      stopBackgroundMusic();
      // Coin rewards: Round 1 = 20, Round 2 = 30, Round 3 = 50
      const coinReward = round === 1 ? 20 : round === 2 ? 30 : 50;
      // Play celebration sound
      playAudio('/Audio/goodresult.mp3', () => {
        setCoins(prev => prev + coinReward);
        triggerCoinAnimation(round);
        const messages: Record<number, string> = {
          1: "Well done!",
          2: "Great job!",
          3: "Excellent!\nCan she take your orders, too?",
          4: "Impressive!",
          5: "🎉 You're a natural!"
        };
        setInvestorMessage(messages[round] || "Great job!");
        setGameState('investor');
      });
    } else {
      playAudio('/Audio/kokorobot-wrong.mp3');
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
        // Stop background music completely
        stopBackgroundMusic();
        playAudio('/Audio/goodresult.mp3', () => {
          setCoins(prev => prev + 80);
          triggerCoinAnimation(round);
          setInvestorMessage("Impressive!");
          setGameState('investor');
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
    recognition.lang = 'en-US';
    
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
    // Stop background music completely
    stopBackgroundMusic();
    // Play celebration sound and go straight to investor
    playAudio('/Audio/goodresult.mp3', () => {
      setCoins(prev => prev + 500);
      triggerCoinAnimation(round);
      setInvestorMessage("🎉 You're a natural!");
      setGameState('investor');
    });
  };

  const completeGame = () => {
    if (round < 5) {
      // Move to next round
      const nextRound = (round + 1) as Round;
      setRound(nextRound);
      
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

      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-30">
        <div className="flex items-center gap-3">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-5 py-2 border border-amber-500/30">
            <span className="text-amber-400 font-mono">M31 Coffee Outpost</span>
          </div>
          {musicStarted && (
            <button 
              onClick={toggleMusic}
              className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-2 border border-amber-500/30 hover:bg-black/80 transition"
            >
              <span className="text-amber-400 text-lg">{musicPlaying ? '🔊' : '🔇'}</span>
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-5 py-2 border border-yellow-500/30 flex items-center gap-2">
            <KokoroCoin size={24} />
            <span className="text-yellow-400 font-mono font-semibold text-lg">{coins}</span>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-5 py-2 border border-purple-500/30">
            <span className="text-purple-400 font-mono">Round {round}/5</span>
          </div>
        </div>
      </div>

      {/* Full Body Kokorobot - Side view when walking */}
      {showFullBody && (gameState === 'intro' || gameState === 'walking') && (
        <div 
          className="absolute bottom-16 z-20"
          style={{ 
            left: `${kokoroX}px`,
            transform: `scale(${kokoroScale})`,
            opacity: kokoroOpacity
          }}
        >
          <img 
            src={isWalking ? "/kokorobot-sideview.png" : "/kokorobot-cb.png"}
            alt="Kokorobot" 
            className={`h-72 w-auto drop-shadow-2xl ${isWalking ? 'animate-walk' : ''}`}
            style={{
              filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))'
            }}
          />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <span className="text-xs text-amber-400 font-mono bg-black/70 px-3 py-1 rounded-full border border-amber-500/30">
              Kokorobot-1
            </span>
          </div>
        </div>
      )}

      {/* INTRO - Mission text CENTERED with dark box */}
      {gameState === 'intro' && (
        <div className={`absolute inset-0 flex items-center justify-center z-10 transition-all duration-700 ${missionVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center max-w-2xl px-12 py-10 bg-black/70 rounded-3xl shadow-2xl">
            <p className="text-purple-400 font-medium mb-2 text-lg">Round {round} of 5</p>
            <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-yellow-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              M31 Coffee Outpost
            </h1>
            <p className="text-white mb-3 text-lg md:text-xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-normal">
              Kokorobot-1 dreams of becoming a barista someday.
            </p>
            <p className="text-amber-100 mb-3 text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-normal">
              {round <= 3 && currentRoundConfig 
                ? `Listen carefully. Can you take ${currentRoundConfig.itemCount === 1 ? 'this order' : `these ${currentRoundConfig.itemCount} orders`}?`
                : round === 4
                  ? "Type your order to the barista!"
                  : "Speak your order out loud!"
              }
            </p>
            <p className="text-yellow-400 font-medium mb-8 text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Earn coins to build Andromeda's first café!
            </p>
            <button
              onClick={startGame}
              disabled={!introReady}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-semibold py-4 px-14 rounded-full text-xl transition transform hover:scale-105 shadow-lg shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* DIALOGUE BOX - Centered */}
      {gameState === 'playing' && showDialogue && (
        <div className="absolute inset-0 flex items-center justify-center z-20 p-4">
          <div className="w-full max-w-xl animate-fade-in">
            
            {/* Listen & Select UI - Rounds 1-3 */}
            {(round === 1 || round === 2 || round === 3) && currentRoundConfig && (
              <div className="bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-6 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src="/kokorobot-closeup.png" 
                    alt="Kokorobot" 
                    className={`w-28 h-28 object-cover rounded-full border-3 border-amber-500/60 shadow-lg animate-pop-in ${isNpcSpeaking ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-black animate-pulse' : ''}`}
                  />
                  <div className="flex-1">
                    <p className="text-amber-400 text-xl mb-2 font-mono font-semibold">Kokorobot-1</p>
                    
                    {showTranscript ? (
                      <p className="text-xl leading-relaxed text-white">{currentRoundConfig.npcOrder}</p>
                    ) : (
                      <div className="bg-amber-900/40 rounded-xl p-4 text-center border border-amber-500/30">
                        <p className="text-amber-300/80 mb-3 text-lg">🎧 Listen to the order...</p>
                        <button 
                          onClick={buyTranscript}
                          disabled={coins < 10}
                          className={`text-base px-6 py-2 rounded-full transition font-semibold flex items-center gap-2 mx-auto ${
                            coins >= 10 
                              ? 'bg-black/80 text-yellow-400 hover:bg-black/90 border border-yellow-500/60' 
                              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          💡 Show Text for <KokoroCoin size={16} /> 10
                        </button>
                      </div>
                    )}
                    
                    <button 
                      onClick={replayVoice}
                      className="mt-3 text-base text-amber-400/80 hover:text-amber-400 transition flex items-center gap-2 font-medium"
                    >
                      🔊 Replay voice (free)
                    </button>
                  </div>
                </div>
                
                {/* Order Builder */}
                <div className="border-t border-amber-500/30 pt-6">
                  <p className="text-lg text-amber-300/80 mb-4 font-medium">Build the order ({round1Selections.length}/3 items)</p>
                  
                  <div className="flex flex-wrap gap-2 mb-5 min-h-[48px]">
                    {round1Selections.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => removeFromOrder(i)}
                        className="bg-amber-500/30 border border-amber-500/60 rounded-lg px-4 py-2 text-lg hover:bg-red-500/30 hover:border-red-500/60 transition text-amber-200 font-medium"
                      >
                        {item.size} {item.type} {item.milk && `(${item.milk})`} {item.syrup && `+ ${item.syrup}`} ✕
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-3 mb-6">
                    <div>
                      <p className="text-sm text-amber-400/60 mb-2 font-semibold">TYPE</p>
                      <div className="flex flex-col gap-2">
                        {['Americano', 'Latte', 'Cappuccino', 'Flat White', 'Macchiato', 'Mocha', 'Espresso'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setCurrentItem({...currentItem, type})}
                            className={`py-2 px-3 rounded-lg text-sm transition font-medium ${currentItem.type === type ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-amber-400/60 mb-2 font-semibold">SIZE</p>
                      <div className="flex flex-col gap-2">
                        {['Small', 'Medium', 'Large'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setCurrentItem({...currentItem, size})}
                            className={`py-2 px-3 rounded-lg text-sm transition font-medium ${currentItem.size === size ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-amber-400/60 mb-2 font-semibold">MILK</p>
                      <div className="flex flex-col gap-2">
                        {['None', 'Whole', 'Oat', 'Almond', 'Nonfat'].map((milk) => (
                          <button
                            key={milk}
                            onClick={() => setCurrentItem({...currentItem, milk: milk === 'None' ? undefined : milk})}
                            className={`py-2 px-3 rounded-lg text-sm transition font-medium ${(currentItem.milk === milk || (!currentItem.milk && milk === 'None')) ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`}
                          >
                            {milk}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-amber-400/60 mb-2 font-semibold">SYRUP</p>
                      <div className="flex flex-col gap-2">
                        {['None', 'Caramel', 'Vanilla', 'Hazelnut'].map((syrup) => (
                          <button
                            key={syrup}
                            onClick={() => setCurrentItem({...currentItem, syrup: syrup === 'None' ? undefined : syrup})}
                            className={`py-2 px-3 rounded-lg text-sm transition font-medium ${(currentItem.syrup === syrup || (!currentItem.syrup && syrup === 'None')) ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`}
                          >
                            {syrup}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={addToOrder}
                      disabled={!currentItem.type || !currentItem.size || round1Selections.length >= currentRoundConfig.itemCount}
                      className="flex-1 py-4 rounded-xl font-semibold text-xl transition bg-amber-900/60 hover:bg-amber-900/80 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      + Add Item
                    </button>
                    <button
                      onClick={checkRound1}
                      disabled={round1Selections.length !== currentRoundConfig.itemCount}
                      className="flex-1 py-4 rounded-xl font-semibold text-xl transition bg-amber-500 hover:bg-amber-400 text-black disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Submit ✓
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Round 4 - Typing Order */}
            {round === 4 && (
              <div className="bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <img src="/kokorobot-closeup.png" alt="Kokorobot" className="w-20 h-20 rounded-full object-cover border-2 border-amber-500/50" />
                  <div>
                    <p className="text-amber-400 font-mono font-semibold text-xl">Kokorobot-1</p>
                    <p className="text-lg text-purple-400">Your turn! Order one drink by typing.</p>
                  </div>
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
                          triggerCoinAnimation(round);
                          setInvestorMessage("Impressive!");
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
              </div>
            )}

            {/* Round 5 - Speaking Order */}
            {round === 5 && (
              <div className="bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-8 shadow-2xl text-center">
                <img src="/kokorobot-closeup.png" alt="Kokorobot" className="w-24 h-24 rounded-full object-cover border-2 border-amber-500/50 mx-auto mb-4" />
                
                {!round3ConfirmStep ? (
                  <>
                    <p className="text-xl text-green-400 mb-6 font-medium">Speak your order!</p>
                    
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
              </div>
            )}
          </div>
        </div>
      )}

      {/* Earth Investor Video Call - Full screen image with overlay */}
      {gameState === 'investor' && (
        <div className="fixed inset-0 z-40">
          {/* Full screen background image - different investor per round */}
          <img 
            src={round === 1 ? "/ib.png" : `/NY-investor${round}.png`}
            alt="Earth Investor calling from spaceship" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* HUD - with solid black background */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-50">
            <div className="bg-black rounded-full px-5 py-2 border border-amber-500/50">
              <span className="text-amber-400 font-mono">M31 Coffee Outpost</span>
            </div>
            <div className="flex gap-3">
              <div className="bg-black rounded-full px-5 py-2 border border-yellow-500/50 flex items-center gap-2">
                <KokoroCoin size={24} />
                <span className="text-yellow-400 font-mono font-semibold text-lg">{coins}</span>
              </div>
              <div className="bg-black rounded-full px-5 py-2 border border-purple-500/50">
                <span className="text-purple-400 font-mono">Round {round}/5</span>
              </div>
            </div>
          </div>

          {/* LIVE indicator - inside image */}
          <div className="absolute top-20 left-6 flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full z-50">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-xl font-mono font-semibold">LIVE</span>
          </div>

          {/* Bellagio-style fountain jets - starts from center, shoots up, then to balance */}
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
                    {/* Glowing star coin */}
                    <KokoroCoin size={32} className="drop-shadow-[0_0_15px_rgba(255,215,0,0.9)]" />
                    {/* Extra glow effect */}
                    <div className="absolute inset-0 w-8 h-8 bg-yellow-400/40 rounded-full blur-md -z-10" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Coin flying animation */}
          <div className="absolute top-1/2 left-1/2 z-50 animate-fly-to-balance">
            <div className="flex items-center gap-2 bg-black/70 px-4 py-2 rounded-full">
              <KokoroCoin size={32} />
              <span className="text-yellow-400 font-semibold text-2xl">+{round === 1 ? 20 : round === 2 ? 30 : round === 3 ? 50 : round === 4 ? 80 : 100}</span>
            </div>
          </div>

          {/* Text overlay - positioned per round */}
          <div className={`absolute z-50 text-center ${
            round === 5 
              ? 'top-[42%] left-1/2 -translate-x-1/2'  /* Round 5: centered on the table */
              : round === 4 
                ? 'top-[42%] left-1/2 -translate-x-1/2'  /* Round 4: bring message down closer to CTAs */
                : round === 3 
                  ? 'top-[30%] left-1/2 -translate-x-1/2' 
                  : 'top-[45%] left-1/2 -translate-x-1/2'
          }`}>
            <div className="flex items-center gap-2 mb-2 justify-center">
              <KokoroCoin size={32} />
              <span className="text-yellow-400 text-2xl font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>from our Earth Investors</span>
            </div>
            {round === 3 ? (
              <div className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                <p className="text-5xl font-bold mb-2">🎉 Excellent!</p>
                <p className="text-3xl font-semibold">Can she take your orders, too?</p>
              </div>
            ) : (
              <p className="text-white text-4xl font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>🎉 {investorMessage}</p>
            )}
          </div>

          {/* CTAs - positioned per round */}
          <div className={`absolute z-50 flex gap-3 flex-col items-center left-1/2 -translate-x-1/2 ${
            round === 5 
              ? 'bottom-[18%]'
              : 'bottom-[25%]'
          }`}>
            {/* Rounds 3 and 4: Build Your Café + Next Round */}
            {(round === 3 || round === 4) && (
              <>
                <button
                  onClick={() => {
                    setShowCafeShop(true);
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold py-4 px-10 rounded-full text-xl transition shadow-lg shadow-purple-500/40"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  🏪 Build Your Café
                </button>
                <button
                  onClick={completeGame}
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold py-4 px-14 rounded-full text-2xl transition shadow-lg shadow-yellow-500/40"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  Next Round →
                </button>
              </>
            )}
            {/* Round 5: Build Your Café, Try a New Set, Save & Exit */}
            {round === 5 && (
              <>
                <button
                  onClick={() => {
                    setShowCafeShop(true);
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold py-4 px-10 rounded-full text-xl transition shadow-lg shadow-purple-500/40"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  🏪 Build Your Café
                </button>
                <button
                  onClick={() => {
                    alert('🎯 New conversation sets coming soon! Stay tuned for more scenarios to practice.');
                  }}
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold py-4 px-10 rounded-full text-xl transition shadow-lg shadow-yellow-500/40"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  🎯 Try a New Set
                </button>
                <button
                  onClick={() => {
                    // Save progress is automatic, just close/exit
                    alert('✅ Progress saved! Your coins and cafés are stored.');
                  }}
                  className="text-white/80 hover:text-white underline text-lg mt-2 transition"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  Save & Exit
                </button>
              </>
            )}
            {/* Rounds 1-2: Just Next Round */}
            {round < 3 && (
              <button
                onClick={completeGame}
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold py-4 px-14 rounded-full text-2xl transition shadow-lg shadow-yellow-500/40"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                Next Round →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes fountain-jet {
          0% {
            opacity: 0;
            transform: translateX(var(--jx)) translateY(0) scale(0.3);
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
            transform: translateX(calc(var(--jx) * 0.5 + 35vw)) translateY(calc(var(--jy) * 0.2 - 40vh)) scale(calc(var(--s) * 0.6)) rotate(270deg);
          }
          100% {
            opacity: 0;
            transform: translateX(45vw) translateY(-45vh) scale(0.15);
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
            transform: translate(calc(50vw - 250px), calc(-50vh + 40px)) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translate(calc(50vw - 250px), calc(-50vh + 40px)) scale(0.5);
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
            <h2 className="text-4xl font-bold text-center mb-8 text-white" style={{ fontFamily: 'Georgia, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
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
              <h2 className="text-3xl font-bold text-amber-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>🏪 Choose Your Café</h2>
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
            <h3 className="text-2xl font-bold text-amber-400 mb-4">🏪 Purchase Café?</h3>
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

      {/* Coin Shop */}
      {showCoinShop && (
        <div className="fixed inset-0 bg-black/90 z-[80] flex items-center justify-center p-4" onClick={() => setShowCoinShop(false)}>
          <div 
            className="bg-gradient-to-b from-purple-900 to-zinc-900 rounded-2xl p-6 max-w-md w-full border border-purple-500/50"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-center text-purple-300 mb-6">💰 Coin Shop</h2>
            
            <div className="space-y-4 mb-6">
              {coinBundles.map((bundle) => (
                <div 
                  key={bundle.id}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-102 ${
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
              onClick={() => setInventoryTab('sets')}
              className="px-6 py-3 rounded-xl font-semibold bg-zinc-800 text-zinc-500 cursor-not-allowed flex items-center gap-2"
              disabled
            >
              🎯 Convo Sets
              <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded-full">Soon</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {inventoryTab === 'buildings' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Your Buildings</h2>
                
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
                <h2 className="text-2xl font-bold text-white mb-4">Kokorobots Coming Soon!</h2>
                <p className="text-zinc-400 max-w-md mx-auto">
                  Customize your Kokorobot's appearance — change hairstyles, suits, colors, and more!
                </p>
              </div>
            )}

            {inventoryTab === 'sets' && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold text-white mb-4">Convo Sets Coming Soon!</h2>
                <p className="text-zinc-400 max-w-md mx-auto">
                  Unlock and manage your conversation practice sets here.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-700 bg-zinc-900/80">
            <button
              onClick={() => {
                alert('🏬 All Outposts hub coming soon! Practice at different locations.');
              }}
              className="text-purple-400 hover:text-purple-300 font-medium transition flex items-center gap-2"
            >
              🏬 All Outposts
            </button>
            <button
              onClick={() => {
                setShowInventory(false);
                alert('✅ Progress saved! Your coins and items are stored.');
              }}
              className="text-zinc-400 hover:text-zinc-300 font-medium transition"
            >
              Save & Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}