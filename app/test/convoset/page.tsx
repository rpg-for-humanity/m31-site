'use client';

import { useState, useEffect, useRef } from 'react';

interface OrderItem {
  type: string;
  size: string;
  milk?: string;
  syrup?: string;
}

interface CafeItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function M31CoffeeOutpost() {
  // Game state
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'investor' | 'shop'>('intro');
  const [round, setRound] = useState(1);
  const [coins, setCoins] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  
  // NPC state
  const [isNpcSpeaking, setIsNpcSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Kokorobot animation states
  const [showFullBody, setShowFullBody] = useState(true);
  const [kokoroScale, setKokoroScale] = useState(1);
  const [kokoroOpacity, setKokoroOpacity] = useState(1);
  const [kokoroX, setKokoroX] = useState(-200);
  const [missionVisible, setMissionVisible] = useState(false);
  
  // Round states
  const [round1Selections, setRound1Selections] = useState<OrderItem[]>([]);
  const [currentItem, setCurrentItem] = useState<Partial<OrderItem>>({});
  const [round2Chat, setRound2Chat] = useState<{role: 'npc' | 'player', text: string}[]>([]);
  const [round2Input, setRound2Input] = useState('');
  const [round2Order, setRound2Order] = useState({ type: false, size: false, milk: false, temp: false });
  const [round3Transcript, setRound3Transcript] = useState('');
  const [round3Feedback, setRound3Feedback] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const [investorMessage, setInvestorMessage] = useState('');
  
  // Rounds 4 & 5 state
  const [round4Input, setRound4Input] = useState('');
  const [round4Chat, setRound4Chat] = useState<{role: 'npc' | 'player', text: string}[]>([]);
  const [round4Order, setRound4Order] = useState({ type: false, size: false, milk: false, temp: false });
  const [round5Transcript, setRound5Transcript] = useState('');
  const [round5Feedback, setRound5Feedback] = useState<string[]>([]);
  
  // Coin fountain animation
  const [showCoinFountain, setShowCoinFountain] = useState(false);
  const [fountainCoins, setFountainCoins] = useState<{id: number, x: number, delay: number, height: number, rotation: number}[]>([]);
  
  // Café shop state
  const [ownedCafes, setOwnedCafes] = useState<string[]>([]);
  const [showPurchaseConfirm, setShowPurchaseConfirm] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<CafeItem | null>(null);
  const [showOwnedPopup, setShowOwnedPopup] = useState(false);
  const [justPurchasedCafe, setJustPurchasedCafe] = useState<CafeItem | null>(null);
  
  // Audio refs
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  
  // Menu items
  const drinkTypes = ['Latte', 'Americano', 'Cappuccino', 'Mocha', 'Espresso', 'Flat White', 'Macchiato'];
  const sizes = ['Small', 'Medium', 'Large'];
  const milkOptions = ['Whole', 'Oat', 'Almond', 'Skim', 'Nonfat', 'Soy'];
  const syrupOptions = ['None', 'Vanilla', 'Caramel', 'Hazelnut'];
  
  // Café items for shop
  const cafeItems: CafeItem[] = [
    { id: 'coffeepost', name: 'Coffee Post', price: 300, image: '/images/coffeepost.png' },
    { id: 'retrocafe', name: 'Retro Cafe', price: 400, image: '/images/retrocafe.png' },
    { id: 'flowercafe', name: 'Flower Cafe', price: 500, image: '/images/flowercafe.png' },
    { id: 'moderncafe', name: 'Modern Cafe', price: 600, image: '/images/moderncafe.png' },
    { id: 'rocococafe', name: 'Rococo Cafe', price: 800, image: '/images/rocococafe.png' },
  ];
  
  // NPC dialogue per round
  const npcOrders: Record<number, string> = {
    1: "Hi! I'll have a large Americano, a small oat milk latte, and a small latte with whole milk please.",
    2: "", // Typing round - player orders
    3: "", // Multi-item listening round
    4: "", // Typing round - player orders complex
    5: "", // Speaking round - player speaks
  };
  
  // Round 3 NPC order (more complex)
  const round3Order = "I'd like a medium iced vanilla latte with oat milk, a large hot americano, and a small cappuccino with almond milk please.";
  
  // Correct answers per round
  const correctOrders: Record<number, OrderItem[]> = {
    1: [
      { type: 'Americano', size: 'Large' },
      { type: 'Latte', size: 'Small', milk: 'Oat' },
      { type: 'Latte', size: 'Small', milk: 'Whole' },
    ],
    3: [
      { type: 'Latte', size: 'Medium', milk: 'Oat', syrup: 'Vanilla' },
      { type: 'Americano', size: 'Large' },
      { type: 'Cappuccino', size: 'Small', milk: 'Almond' },
    ],
  };
  
  // Coin rewards per round
  const coinRewards: Record<number, number> = {
    1: 20,
    2: 30,
    3: 50,
    4: 80,
    5: 100,
  };
  
  // Investor images per round
  const investorImages: Record<number, string> = {
    1: '/images/NY-investor1.png',
    2: '/images/NY-investor2.png',
    3: '/images/NY-investor3.png',
    4: '/images/NY-investor4.png',
    5: '/images/NY-investor5.png',
  };

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Get preferred voice
  const getVoice = () => {
    const preferred = ['Samantha', 'Karen', 'Victoria', 'Fiona', 'Moira', 'Tessa'];
    for (const name of preferred) {
      const voice = voices.find(v => v.name.includes(name));
      if (voice) return voice;
    }
    const englishVoice = voices.find(v => 
      v.lang.startsWith('en') && 
      !v.name.toLowerCase().includes('male') &&
      !v.name.toLowerCase().includes('google')
    );
    return englishVoice || voices[0];
  };

  // Speak function
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = getVoice();
      if (voice) utterance.voice = voice;
      utterance.rate = 0.95;
      utterance.pitch = 1.1;
      setIsNpcSpeaking(true);
      utterance.onend = () => setIsNpcSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Play audio file
  const playAudio = (src: string) => {
    const audio = new Audio(src);
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  // Background music control
  const toggleMusic = () => {
    if (!bgMusicRef.current) {
      bgMusicRef.current = new Audio('/Audio/background-music.mp3');
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.3;
    }
    if (isMusicPlaying) {
      bgMusicRef.current.pause();
    } else {
      bgMusicRef.current.play().catch(e => console.log('Music play failed:', e));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  // Coin fountain animation - progressive heights
  const triggerCoinFountain = (roundNum: number) => {
    // Height multiplier based on round (1-5)
    const heightMultiplier = roundNum;
    const baseHeight = 80;
    const coinCount = 10 + (roundNum * 5); // More coins for higher rounds
    
    const newCoins = Array.from({ length: coinCount }, (_, i) => ({
      id: i,
      x: 45 + Math.random() * 10, // Centered with slight variation
      delay: Math.random() * 0.5,
      height: baseHeight + (heightMultiplier * 40) + Math.random() * 60,
      rotation: Math.random() * 720 - 360,
    }));
    
    setFountainCoins(newCoins);
    setShowCoinFountain(true);
    
    // Play victory sound
    playAudio('/Audio/victory-coins.mp3');
    
    // Clear after animation
    setTimeout(() => {
      setShowCoinFountain(false);
      setFountainCoins([]);
    }, 3000);
  };

  // Buy transcript
  const buyTranscript = () => {
    if (coins >= 10) {
      setCoins(prev => prev - 10);
      setShowTranscript(true);
    }
  };

  // Start game - direct to round, no walking animation between rounds
  const startGame = () => {
    setGameState('playing');
    setShowTranscript(false);
    setShowDialogue(true);
    
    // Only do intro animation on first start
    if (round === 1 && kokoroX === -200) {
      // Animate Kokorobot walking in
      let pos = -200;
      const walkIn = setInterval(() => {
        pos += 8;
        setKokoroX(pos);
        if (pos >= 0) {
          clearInterval(walkIn);
          setTimeout(() => {
            speak(npcOrders[1]);
          }, 500);
        }
      }, 30);
    } else {
      // Subsequent rounds - no walking animation
      setKokoroX(0);
      if (round === 1 || round === 3) {
        const orderText = round === 1 ? npcOrders[1] : round3Order;
        setTimeout(() => speak(orderText), 300);
      }
    }
  };

  // Start Round 2 (typing - player orders)
  const startRound2 = () => {
    setRound(2);
    setGameState('playing');
    setShowDialogue(true);
    setRound2Order({ type: false, size: false, milk: false, temp: false });
    
    const greeting = "Hi there! What can I get started for you today?";
    setRound2Chat([{ role: 'npc', text: greeting }]);
    playAudio('/Audio/greeting.mp3');
  };

  // Process Round 2 input
  const processRound2Input = () => {
    if (!round2Input.trim()) return;
    
    const input = round2Input.toLowerCase();
    setRound2Chat(prev => [...prev, { role: 'player', text: round2Input }]);
    setRound2Input('');
    
    const newOrder = { ...round2Order };
    
    // Check for drink types
    if (input.includes('latte') || input.includes('americano') || input.includes('cappuccino') || 
        input.includes('mocha') || input.includes('espresso') || input.includes('coffee') || 
        input.includes('macchiato') || input.includes('flat white')) {
      newOrder.type = true;
    }
    // Check for sizes
    if (input.includes('small') || input.includes('medium') || input.includes('large')) {
      newOrder.size = true;
    }
    // Check for milk
    if (input.includes('oat') || input.includes('whole') || input.includes('skim') || 
        input.includes('almond') || input.includes('soy') || input.includes('regular') || 
        input.includes('milk') || input.includes('nonfat') || input.includes('non-fat')) {
      newOrder.milk = true;
    }
    // Check for temperature
    if (input.includes('iced') || input.includes('ice') || input.includes('hot') || input.includes('cold')) {
      newOrder.temp = true;
    }
    
    setRound2Order(newOrder);
    
    setTimeout(() => {
      let response = '';
      let audioFile = '';
      
      if (!newOrder.type) {
        response = "What kind of drink would you like?";
        audioFile = '/Audio/ask-type.mp3';
      } else if (!newOrder.size) {
        response = "What size?";
        audioFile = '/Audio/ask-size.mp3';
      } else if (!newOrder.temp) {
        response = "Would you like that hot or over ice?";
        audioFile = '/Audio/coffee-temperature.mp3';
      } else if (!newOrder.milk) {
        response = "Any milk preference?";
        audioFile = '/Audio/milk-preference.mp3';
      } else {
        // All required info collected!
        response = "Thank you, it will be at the pick up counter.";
        audioFile = '/Audio/coffee-confirm.mp3';
        setTimeout(() => {
          const reward = coinRewards[2];
          setCoins(prev => prev + reward);
          triggerCoinFountain(2);
          setInvestorMessage(`Well done! +${reward} coins`);
          setGameState('investor');
        }, 2000);
      }
      
      setRound2Chat(prev => [...prev, { role: 'npc', text: response }]);
      if (audioFile) playAudio(audioFile);
    }, 500);
  };

  // Start Round 3 (listen - complex multi-item)
  const startRound3 = () => {
    setRound(3);
    setGameState('playing');
    setShowDialogue(true);
    setShowTranscript(false);
    setRound1Selections([]);
    setCurrentItem({});
    
    setTimeout(() => speak(round3Order), 300);
  };

  // Start Round 4 (typing - complex order)
  const startRound4 = () => {
    setRound(4);
    setGameState('playing');
    setShowDialogue(true);
    setRound4Order({ type: false, size: false, milk: false, temp: false });
    
    const greeting = "Welcome back! What would you like to order?";
    setRound4Chat([{ role: 'npc', text: greeting }]);
    playAudio('/Audio/greeting.mp3');
  };

  // Process Round 4 input
  const processRound4Input = () => {
    if (!round4Input.trim()) return;
    
    const input = round4Input.toLowerCase();
    setRound4Chat(prev => [...prev, { role: 'player', text: round4Input }]);
    setRound4Input('');
    
    const newOrder = { ...round4Order };
    
    if (input.includes('latte') || input.includes('americano') || input.includes('cappuccino') || 
        input.includes('mocha') || input.includes('espresso') || input.includes('coffee') || 
        input.includes('macchiato') || input.includes('flat white')) {
      newOrder.type = true;
    }
    if (input.includes('small') || input.includes('medium') || input.includes('large')) {
      newOrder.size = true;
    }
    if (input.includes('oat') || input.includes('whole') || input.includes('skim') || 
        input.includes('almond') || input.includes('soy') || input.includes('regular') || 
        input.includes('milk') || input.includes('nonfat')) {
      newOrder.milk = true;
    }
    if (input.includes('iced') || input.includes('ice') || input.includes('hot') || input.includes('cold')) {
      newOrder.temp = true;
    }
    
    setRound4Order(newOrder);
    
    setTimeout(() => {
      let response = '';
      let audioFile = '';
      
      if (!newOrder.type) {
        response = "What kind of drink would you like?";
        audioFile = '/Audio/ask-type.mp3';
      } else if (!newOrder.size) {
        response = "What size would that be?";
        audioFile = '/Audio/ask-size.mp3';
      } else if (!newOrder.temp) {
        response = "Hot or iced?";
        audioFile = '/Audio/coffee-temperature.mp3';
      } else if (!newOrder.milk) {
        response = "Any milk preference?";
        audioFile = '/Audio/milk-preference.mp3';
      } else {
        response = "Perfect! Coming right up!";
        audioFile = '/Audio/coffee-confirm.mp3';
        setTimeout(() => {
          const reward = coinRewards[4];
          setCoins(prev => prev + reward);
          triggerCoinFountain(4);
          setInvestorMessage(`Excellent! +${reward} coins`);
          setGameState('investor');
        }, 2000);
      }
      
      setRound4Chat(prev => [...prev, { role: 'npc', text: response }]);
      if (audioFile) playAudio(audioFile);
    }, 500);
  };

  // Start Round 5 (speaking)
  const startRound5 = () => {
    setRound(5);
    setGameState('playing');
    setShowDialogue(true);
    setRound5Transcript('');
    setRound5Feedback([]);
    
    const greeting = "Welcome! Go ahead and tell me your order when you're ready.";
    speak(greeting);
  };

  // Start speech recognition for Round 5
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser. Try Chrome!');
      return;
    }
    
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setRound5Transcript(transcript);
      processRound5Speech(transcript);
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    
    recognition.start();
  };

  // Process Round 5 speech
  const processRound5Speech = (transcript: string) => {
    const input = transcript.toLowerCase();
    const feedback: string[] = [];
    
    const hasType = input.includes('latte') || input.includes('americano') || input.includes('cappuccino') || 
                    input.includes('mocha') || input.includes('espresso') || input.includes('coffee') ||
                    input.includes('macchiato') || input.includes('flat white');
    const hasSize = input.includes('small') || input.includes('medium') || input.includes('large');
    const hasMilk = input.includes('oat') || input.includes('whole') || input.includes('skim') || 
                    input.includes('almond') || input.includes('soy') || input.includes('milk');
    const hasTemp = input.includes('iced') || input.includes('ice') || input.includes('hot');
    
    if (!hasType) feedback.push('drink type');
    if (!hasSize) feedback.push('size');
    if (!hasTemp) feedback.push('temperature');
    if (!hasMilk) feedback.push('milk preference');
    
    setRound5Feedback(feedback);
    
    if (feedback.length === 0) {
      speak("Perfect! Your order is coming right up!");
      setTimeout(() => {
        const reward = coinRewards[5];
        setCoins(prev => prev + reward);
        triggerCoinFountain(5);
        setInvestorMessage(`Amazing! +${reward} coins - Mission Complete!`);
        setGameState('investor');
      }, 1500);
    } else {
      const missing = feedback.join(' or ');
      speak(`I didn't quite catch your ${missing}. Could you repeat that?`);
    }
  };

  // Accept partial score for Round 5
  const acceptRound5Score = () => {
    const baseReward = coinRewards[5];
    const penalty = round5Feedback.length * 20;
    const score = Math.max(baseReward - penalty, 20);
    
    speak("Alright, I'll get that started for you!");
    setTimeout(() => {
      setCoins(prev => prev + score);
      triggerCoinFountain(5);
      setInvestorMessage(`Good effort! +${score} coins - Mission Complete!`);
      setGameState('investor');
    }, 1000);
  };

  // Replay voice
  const replayVoice = () => {
    if (round === 1) {
      speak(npcOrders[1]);
    } else if (round === 3) {
      speak(round3Order);
    }
  };

  // Add to order
  const addToOrder = () => {
    if (currentItem.type && currentItem.size) {
      const maxItems = round === 1 ? 3 : 3;
      if (round1Selections.length < maxItems) {
        setRound1Selections([...round1Selections, currentItem as OrderItem]);
        setCurrentItem({});
      }
    }
  };

  // Remove from order
  const removeFromOrder = (index: number) => {
    setRound1Selections(round1Selections.filter((_, i) => i !== index));
  };

  // Check Round 1 answer
  const checkRound1 = () => {
    const correct = correctOrders[1];
    
    const normalize = (items: OrderItem[]) => 
      items.map(i => `${i.size}-${i.type}-${i.milk || 'none'}`).sort().join(',');
    
    const isCorrect = normalize(round1Selections) === normalize(correct);
    
    if (isCorrect) {
      const reward = coinRewards[1];
      setCoins(prev => prev + reward);
      triggerCoinFountain(1);
      setInvestorMessage(`Great job! +${reward} coins`);
      setGameState('investor');
    } else {
      // Show what was wrong
      speak("Hmm, that doesn't seem quite right. Let me repeat the order.");
      setTimeout(() => speak(npcOrders[1]), 1000);
    }
  };

  // Check Round 3 answer
  const checkRound3 = () => {
    const correct = correctOrders[3];
    
    // More lenient checking for round 3
    const hasLatte = round1Selections.some(i => i.type === 'Latte' && i.size === 'Medium');
    const hasAmericano = round1Selections.some(i => i.type === 'Americano' && i.size === 'Large');
    const hasCappuccino = round1Selections.some(i => i.type === 'Cappuccino' && i.size === 'Small');
    
    const correctCount = [hasLatte, hasAmericano, hasCappuccino].filter(Boolean).length;
    
    if (correctCount >= 2) {
      const reward = coinRewards[3];
      setCoins(prev => prev + reward);
      triggerCoinFountain(3);
      setInvestorMessage(`Nice work! +${reward} coins`);
      setGameState('investor');
    } else {
      speak("Let me repeat that order for you.");
      setTimeout(() => speak(round3Order), 1000);
    }
  };

  // Complete round and move to next
  const completeRound = () => {
    if (round === 1) {
      startRound2();
    } else if (round === 2) {
      startRound3();
    } else if (round === 3) {
      startRound4();
    } else if (round === 4) {
      startRound5();
    } else {
      // Game complete - show shop
      setGameState('shop');
    }
  };

  // Handle café click in shop
  const handleCafeClick = (cafe: CafeItem) => {
    if (ownedCafes.includes(cafe.id)) {
      // Already owned - show guidance popup
      setSelectedCafe(cafe);
      setShowOwnedPopup(true);
    } else {
      // Not owned - show purchase confirmation
      setSelectedCafe(cafe);
      setShowPurchaseConfirm(true);
    }
  };

  // Purchase café
  const purchaseCafe = () => {
    if (selectedCafe && coins >= selectedCafe.price) {
      setCoins(prev => prev - selectedCafe.price);
      setOwnedCafes(prev => [...prev, selectedCafe.id]);
      setShowPurchaseConfirm(false);
      setJustPurchasedCafe(selectedCafe);
      playAudio('/Audio/purchase-success.mp3');
    }
  };

  // Kokoro Star Coin Component
  const KokoroCoin = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <img 
      src="/images/kokoro-star.png" 
      alt="coin" 
      width={size} 
      height={size}
      className={`inline-block ${className}`}
      style={{ imageRendering: 'auto' }}
    />
  );

  // Reset game
  const resetGame = () => {
    setRound(1);
    setGameState('intro');
    setRound1Selections([]);
    setRound2Chat([]);
    setRound2Order({ type: false, size: false, milk: false, temp: false });
    setRound4Chat([]);
    setRound4Order({ type: false, size: false, milk: false, temp: false });
    setRound5Transcript('');
    setRound5Feedback([]);
    setShowTranscript(false);
    setKokoroX(-200);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* M31 Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/m31.jpg')` }}
      />
      
      {/* Darker overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Barren landscape at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-950/90 via-amber-900/50 to-transparent" />
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-950 to-amber-900/70" />

      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-30">
        <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-500/30">
          <span className="text-amber-400 font-mono text-sm">M31 Coffee Outpost</span>
        </div>
        <div className="flex gap-3 items-center">
          {/* Music toggle */}
          <button
            onClick={toggleMusic}
            className="bg-black/60 backdrop-blur-sm rounded-full p-2 border border-purple-500/30 hover:border-purple-400/50 transition"
          >
            <span className="text-purple-400">{isMusicPlaying ? '🔊' : '🔇'}</span>
          </button>
          {/* Coins */}
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-500/30 flex items-center gap-2">
            <KokoroCoin size={24} />
            <span className="text-yellow-400 font-mono">{coins}</span>
          </div>
          {/* Round counter - FIXED: 5/5 */}
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-500/30">
            <span className="text-purple-400 font-mono text-sm">Round {round}/5</span>
          </div>
        </div>
      </div>

      {/* Coin Fountain Animation */}
      {showCoinFountain && (
        <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
          {fountainCoins.map(coin => (
            <div
              key={coin.id}
              className="absolute"
              style={{
                left: `${coin.x}%`,
                bottom: '30%',
                animation: `fountainCoin 2s ease-out ${coin.delay}s forwards`,
                '--fountain-height': `${coin.height}px`,
                '--coin-rotation': `${coin.rotation}deg`,
              } as React.CSSProperties}
            >
              <KokoroCoin size={32 + Math.random() * 16} />
            </div>
          ))}
        </div>
      )}

      {/* Intro Screen */}
      {gameState === 'intro' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-400 mb-2 drop-shadow-lg">M31 Coffee Outpost</h1>
            <p className="text-amber-200/80">Train to be a barista on Andromeda</p>
          </div>
          
          <img 
            src="/kokorobot.png" 
            alt="Kokorobot" 
            className="h-64 w-auto mb-8 drop-shadow-2xl animate-pulse"
          />
          
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg shadow-amber-500/30"
          >
            Start Training
          </button>
        </div>
      )}

      {/* Playing State */}
      {gameState === 'playing' && (
        <div className="absolute inset-0 z-20">
          {/* Kokorobot - positioned based on state */}
          <div 
            className="absolute bottom-24 transition-all duration-300 ease-out"
            style={{ 
              left: `calc(50% + ${kokoroX}px)`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="relative">
              {/* Glow effect when speaking */}
              {isNpcSpeaking && (
                <div className="absolute inset-0 -m-4 bg-amber-400/30 rounded-full blur-2xl animate-pulse" />
              )}
              
              <img 
                src="/kokorobot.png" 
                alt="Kokorobot" 
                className={`h-48 w-auto drop-shadow-2xl ${isNpcSpeaking ? 'animate-bounce' : ''}`}
              />
            </div>
          </div>

          {/* Dialogue/Game Panel */}
          {showDialogue && (
            <div className="absolute bottom-4 left-4 right-4 max-w-4xl mx-auto">
              <div className="bg-black/80 backdrop-blur-md rounded-2xl border border-amber-500/30 p-6">
                
                {/* Round 1 & 3: Listen and Select */}
                {(round === 1 || round === 3) && (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <p className="text-amber-400 text-sm mb-1">Kokorobot-1</p>
                        {showTranscript ? (
                          <p className="text-white text-lg">{round === 1 ? npcOrders[1] : round3Order}</p>
                        ) : (
                          <p className="text-white/50 italic">Listen to the order...</p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={replayVoice}
                          className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-full text-sm transition"
                        >
                          🔊 Replay
                        </button>
                        {!showTranscript && (
                          <button
                            onClick={buyTranscript}
                            disabled={coins < 10}
                            className={`px-3 py-1 rounded-full text-sm transition flex items-center gap-1 ${
                              coins >= 10 
                                ? 'bg-yellow-600 hover:bg-yellow-500 text-white' 
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            💡 Show <KokoroCoin size={14} /> 10
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Order Builder */}
                    <div className="border-t border-amber-500/20 pt-4 mt-4">
                      <p className="text-amber-400 text-sm mb-3">Build the order:</p>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div>
                          <p className="text-xs text-white/60 mb-1">Type</p>
                          <select
                            value={currentItem.type || ''}
                            onChange={e => setCurrentItem({ ...currentItem, type: e.target.value })}
                            className="bg-black/50 border border-amber-500/30 rounded px-3 py-2 text-white"
                          >
                            <option value="">Select...</option>
                            {drinkTypes.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <div>
                          <p className="text-xs text-white/60 mb-1">Size</p>
                          <select
                            value={currentItem.size || ''}
                            onChange={e => setCurrentItem({ ...currentItem, size: e.target.value })}
                            className="bg-black/50 border border-amber-500/30 rounded px-3 py-2 text-white"
                          >
                            <option value="">Select...</option>
                            {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <div>
                          <p className="text-xs text-white/60 mb-1">Milk</p>
                          <select
                            value={currentItem.milk || ''}
                            onChange={e => setCurrentItem({ ...currentItem, milk: e.target.value })}
                            className="bg-black/50 border border-amber-500/30 rounded px-3 py-2 text-white"
                          >
                            <option value="">None</option>
                            {milkOptions.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                        </div>
                        <button
                          onClick={addToOrder}
                          disabled={!currentItem.type || !currentItem.size}
                          className={`self-end px-4 py-2 rounded transition ${
                            currentItem.type && currentItem.size
                              ? 'bg-green-600 hover:bg-green-500 text-white'
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          + Add
                        </button>
                      </div>
                      
                      {/* Current selections */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {round1Selections.map((item, idx) => (
                          <div key={idx} className="bg-amber-900/50 border border-amber-500/30 rounded-full px-3 py-1 text-sm flex items-center gap-2">
                            <span>{item.size} {item.type}{item.milk ? ` (${item.milk})` : ''}</span>
                            <button 
                              onClick={() => removeFromOrder(idx)}
                              className="text-red-400 hover:text-red-300"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <button
                        onClick={round === 1 ? checkRound1 : checkRound3}
                        disabled={round1Selections.length === 0}
                        className={`w-full py-3 rounded-lg font-bold transition ${
                          round1Selections.length > 0
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Submit Order
                      </button>
                    </div>
                  </>
                )}

                {/* Round 2: Typing */}
                {round === 2 && (
                  <>
                    <div className="mb-4 max-h-48 overflow-y-auto">
                      {round2Chat.map((msg, idx) => (
                        <div key={idx} className={`mb-2 ${msg.role === 'player' ? 'text-right' : ''}`}>
                          <span className={`inline-block px-3 py-2 rounded-lg ${
                            msg.role === 'npc' 
                              ? 'bg-amber-900/50 text-amber-100' 
                              : 'bg-blue-600/50 text-blue-100'
                          }`}>
                            {msg.text}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Order progress */}
                    <div className="flex gap-2 mb-3">
                      <span className={`px-2 py-1 rounded text-xs ${round2Order.type ? 'bg-green-600' : 'bg-gray-600'}`}>Type</span>
                      <span className={`px-2 py-1 rounded text-xs ${round2Order.size ? 'bg-green-600' : 'bg-gray-600'}`}>Size</span>
                      <span className={`px-2 py-1 rounded text-xs ${round2Order.temp ? 'bg-green-600' : 'bg-gray-600'}`}>Temp</span>
                      <span className={`px-2 py-1 rounded text-xs ${round2Order.milk ? 'bg-green-600' : 'bg-gray-600'}`}>Milk</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={round2Input}
                        onChange={e => setRound2Input(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && processRound2Input()}
                        placeholder="Type your order..."
                        className="flex-1 bg-black/50 border border-amber-500/30 rounded-lg px-4 py-3 text-white placeholder-white/40"
                      />
                      <button
                        onClick={processRound2Input}
                        className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-lg transition"
                      >
                        Send
                      </button>
                    </div>
                  </>
                )}

                {/* Round 4: Typing (complex) */}
                {round === 4 && (
                  <>
                    <div className="mb-4 max-h-48 overflow-y-auto">
                      {round4Chat.map((msg, idx) => (
                        <div key={idx} className={`mb-2 ${msg.role === 'player' ? 'text-right' : ''}`}>
                          <span className={`inline-block px-3 py-2 rounded-lg ${
                            msg.role === 'npc' 
                              ? 'bg-amber-900/50 text-amber-100' 
                              : 'bg-blue-600/50 text-blue-100'
                          }`}>
                            {msg.text}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mb-3">
                      <span className={`px-2 py-1 rounded text-xs ${round4Order.type ? 'bg-green-600' : 'bg-gray-600'}`}>Type</span>
                      <span className={`px-2 py-1 rounded text-xs ${round4Order.size ? 'bg-green-600' : 'bg-gray-600'}`}>Size</span>
                      <span className={`px-2 py-1 rounded text-xs ${round4Order.temp ? 'bg-green-600' : 'bg-gray-600'}`}>Temp</span>
                      <span className={`px-2 py-1 rounded text-xs ${round4Order.milk ? 'bg-green-600' : 'bg-gray-600'}`}>Milk</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={round4Input}
                        onChange={e => setRound4Input(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && processRound4Input()}
                        placeholder="Type your order..."
                        className="flex-1 bg-black/50 border border-amber-500/30 rounded-lg px-4 py-3 text-white placeholder-white/40"
                      />
                      <button
                        onClick={processRound4Input}
                        className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-lg transition"
                      >
                        Send
                      </button>
                    </div>
                  </>
                )}

                {/* Round 5: Speaking */}
                {round === 5 && (
                  <div className="text-center">
                    <p className="text-amber-400 mb-4">Place your order by speaking!</p>
                    
                    <button
                      onClick={startListening}
                      disabled={isListening}
                      className={`w-24 h-24 rounded-full text-4xl transition-all transform ${
                        isListening 
                          ? 'bg-red-600 animate-pulse scale-110' 
                          : 'bg-gradient-to-br from-amber-500 to-yellow-500 hover:scale-105'
                      }`}
                    >
                      🎤
                    </button>
                    
                    {round5Transcript && (
                      <div className="mt-4 bg-black/50 rounded-lg p-4">
                        <p className="text-white/60 text-sm mb-1">You said:</p>
                        <p className="text-white">{round5Transcript}</p>
                        
                        {round5Feedback.length > 0 && (
                          <div className="mt-3">
                            <p className="text-red-400 text-sm">Missing: {round5Feedback.join(', ')}</p>
                            <div className="flex gap-2 mt-2 justify-center">
                              <button
                                onClick={startListening}
                                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm"
                              >
                                Try Again
                              </button>
                              <button
                                onClick={acceptRound5Score}
                                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
                              >
                                Accept Score
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Investor Screen */}
      {gameState === 'investor' && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
            {/* Investor Image */}
            <div className="mb-4">
              <img 
                src={investorImages[round]} 
                alt="Earth Investor" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl border-2 border-amber-500/30"
              />
            </div>
            
            {/* Message and reward - CTAs moved higher */}
            <div className="bg-black/80 backdrop-blur-md rounded-2xl border border-amber-500/30 p-6 -mt-8 relative">
              <h2 className="text-2xl font-bold text-amber-400 mb-2">Earth Investment Secured!</h2>
              <p className="text-white mb-4">{investorMessage}</p>
              
              {/* Reward display */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <KokoroCoin size={32} />
                <span className="text-3xl font-bold text-yellow-400">+{coinRewards[round]}</span>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                {round < 5 ? (
                  <button
                    onClick={completeRound}
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold py-3 px-8 rounded-full transition"
                  >
                    Next Round →
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setGameState('shop')}
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold py-3 px-8 rounded-full transition"
                    >
                      🏪 Visit Café Shop
                    </button>
                    <button
                      onClick={resetGame}
                      className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-full transition"
                    >
                      🔄 Play Again
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Café Shop */}
      {gameState === 'shop' && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 w-full">
            <div className="bg-black/80 backdrop-blur-md rounded-2xl border border-amber-500/30 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-amber-400">☕ Café Shop</h2>
                <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-yellow-500/30">
                  <KokoroCoin size={24} />
                  <span className="text-yellow-400 font-mono">{coins}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {cafeItems.map(cafe => {
                  const isOwned = ownedCafes.includes(cafe.id);
                  const canAfford = coins >= cafe.price;
                  
                  return (
                    <button
                      key={cafe.id}
                      onClick={() => handleCafeClick(cafe)}
                      className={`relative rounded-xl overflow-hidden transition-all transform hover:scale-105 ${
                        isOwned 
                          ? 'ring-2 ring-green-500' 
                          : canAfford 
                            ? 'ring-2 ring-amber-500/50 hover:ring-amber-400' 
                            : 'opacity-50'
                      }`}
                    >
                      {/* Café image with dark gradient background */}
                      <div className="aspect-square bg-gradient-to-b from-indigo-900/80 via-purple-900/60 to-black/90 p-2">
                        <img 
                          src={cafe.image} 
                          alt={cafe.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      {/* Info bar */}
                      <div className="bg-black/90 p-2">
                        <p className="text-white text-sm font-medium truncate">{cafe.name}</p>
                        <div className="flex items-center gap-1">
                          <KokoroCoin size={14} />
                          <span className={`text-sm ${canAfford ? 'text-yellow-400' : 'text-gray-500'}`}>
                            {cafe.price}
                          </span>
                        </div>
                      </div>
                      
                      {/* Owned badge */}
                      {isOwned && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          ✓ Owned
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={resetGame}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-full transition"
                >
                  🎮 Play Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Confirmation Popup */}
      {showPurchaseConfirm && selectedCafe && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowPurchaseConfirm(false)} />
          <div className="relative z-10 bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-amber-500/30 p-6 max-w-sm mx-4">
            <h3 className="text-xl font-bold text-amber-400 mb-4 text-center">Confirm Purchase</h3>
            
            <div className="aspect-square bg-gradient-to-b from-indigo-900/80 via-purple-900/60 to-black/90 rounded-xl p-4 mb-4">
              <img 
                src={selectedCafe.image} 
                alt={selectedCafe.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            <p className="text-white text-center mb-2">{selectedCafe.name}</p>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-white/60">Price:</span>
              <KokoroCoin size={20} />
              <span className="text-yellow-400 font-bold">{selectedCafe.price}</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-6 text-sm">
              <span className="text-white/60">Your balance:</span>
              <KokoroCoin size={16} />
              <span className={coins >= selectedCafe.price ? 'text-green-400' : 'text-red-400'}>
                {coins}
              </span>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowPurchaseConfirm(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={purchaseCafe}
                disabled={coins < selectedCafe.price}
                className={`flex-1 py-3 rounded-lg font-bold transition ${
                  coins >= selectedCafe.price
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Buy Now ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Just Purchased Popup */}
      {justPurchasedCafe && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="absolute inset-0 bg-black/80" onClick={() => setJustPurchasedCafe(null)} />
          <div className="relative z-10 bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-green-500/30 p-6 max-w-sm mx-4 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-green-400 mb-2">Congratulations!</h3>
            <p className="text-white mb-6">{justPurchasedCafe.name} is now in your inventory!</p>
            
            <p className="text-white/60 text-sm mb-4">What would you like to do?</p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setJustPurchasedCafe(null);
                  // Future: Navigate to M31 map
                  alert('M31 Map coming soon! Your café is saved in inventory.');
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold py-3 px-6 rounded-full transition"
              >
                🗺️ Place on M31 Map
              </button>
              <button
                onClick={() => setJustPurchasedCafe(null)}
                className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-full transition"
              >
                🎮 Keep Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Owned Café Guidance Popup */}
      {showOwnedPopup && selectedCafe && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowOwnedPopup(false)} />
          <div className="relative z-10 bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-green-500/30 p-6 max-w-sm mx-4 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-green-400 mb-2">You own this!</h3>
            <p className="text-white mb-4">{selectedCafe.name} is in your inventory.</p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowOwnedPopup(false);
                  // Future: Navigate to M31 map
                  alert('M31 Map coming soon! Your café is saved in inventory.');
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold py-3 px-6 rounded-full transition"
              >
                🗺️ View on M31 Map
              </button>
              <button
                onClick={() => setShowOwnedPopup(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-full transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fountain animation styles */}
      <style jsx>{`
        @keyframes fountainCoin {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.5);
            opacity: 1;
          }
          40% {
            transform: translateY(calc(-1 * var(--fountain-height))) rotate(calc(var(--coin-rotation) * 0.5)) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(100px) rotate(var(--coin-rotation)) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
