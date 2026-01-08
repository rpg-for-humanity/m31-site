'use client';

import { useState, useEffect } from 'react';

type Round = 1 | 2 | 3;
type GameState = 'intro' | 'walking' | 'playing' | 'investor';
type OrderItem = {
  type: string;
  size: string;
  milk?: string;
};

type Coin = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
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
  const [round2Order, setRound2Order] = useState<{type: boolean, size: boolean, milk: boolean}>({
    type: false, size: false, milk: false
  });
  
  const [round3Listening, setRound3Listening] = useState(false);
  const [round3Transcript, setRound3Transcript] = useState('');
  const [round3Attempts, setRound3Attempts] = useState(0);
  const [round3Feedback, setRound3Feedback] = useState<string[]>([]);

  const npcOrder = "Can I get a large Americano, and two small lattes — one with oat milk and one with whole milk?";

  const correctOrder: OrderItem[] = [
    { type: 'Americano', size: 'Large' },
    { type: 'Latte', size: 'Small', milk: 'Oat' },
    { type: 'Latte', size: 'Small', milk: 'Whole' },
  ];

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

  const triggerCoinAnimation = () => {
    const newCoins: Coin[] = [];
    for (let i = 0; i < 20; i++) {
      newCoins.push({
        id: i,
        x: Math.random() * 400 - 200,
        y: Math.random() * -300 - 50,
        rotation: Math.random() * 720 - 360,
        scale: 0.6 + Math.random() * 0.6,
        delay: Math.random() * 0.4
      });
    }
    setAnimatedCoins(newCoins);
    setShowCoinAnimation(true);
    setTimeout(() => setShowCoinAnimation(false), 2500);
  };

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

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

  const speak = (text: string) => {
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

  const buyTranscript = () => {
    if (coins >= 10) {
      setCoins(prev => prev - 10);
      setShowTranscript(true);
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
        speak(npcOrder);
      }
    }, 25);
  };

  const replayVoice = () => {
    speak(npcOrder);
  };

  const addToOrder = () => {
    if (currentItem.type && currentItem.size && round1Selections.length < 3) {
      setRound1Selections([...round1Selections, currentItem as OrderItem]);
      setCurrentItem({});
    }
  };

  const removeFromOrder = (index: number) => {
    setRound1Selections(round1Selections.filter((_, i) => i !== index));
  };

  const checkRound1 = () => {
    const normalize = (items: OrderItem[]) => 
      items.map(i => `${i.size}-${i.type}-${i.milk || 'none'}`).sort().join(',');
    
    const isCorrect = normalize(round1Selections) === normalize(correctOrder);
    
    if (isCorrect) {
      setCoins(prev => prev + 100);
      triggerCoinAnimation();
      setInvestorMessage('Well done!');
      setGameState('investor');
    } else {
      speak("Hmm, that's not quite right. Listen again!");
      setRound1Selections([]);
      setCurrentItem({});
    }
  };

  const startRound2 = () => {
    setRound(2);
    setGameState('playing');
    setShowDialogue(true);
    setShowTranscript(true);
    const greeting = "Hi there! What can I get started for you today?";
    setRound2Chat([{ role: 'npc', text: greeting }]);
    speak(greeting);
  };

  const processRound2Input = () => {
    if (!round2Input.trim()) return;
    
    const input = round2Input.toLowerCase();
    setRound2Chat(prev => [...prev, { role: 'player', text: round2Input }]);
    setRound2Input('');
    
    const newOrder = { ...round2Order };
    
    if (input.includes('latte') || input.includes('americano') || input.includes('cappuccino') || input.includes('mocha') || input.includes('espresso') || input.includes('coffee')) {
      newOrder.type = true;
    }
    if (input.includes('small') || input.includes('medium') || input.includes('large')) {
      newOrder.size = true;
    }
    if (input.includes('oat') || input.includes('whole') || input.includes('skim') || input.includes('almond') || input.includes('soy') || input.includes('regular') || input.includes('milk')) {
      newOrder.milk = true;
    }
    
    setRound2Order(newOrder);
    
    setTimeout(() => {
      let response = '';
      
      if (!newOrder.type) {
        response = "What kind of drink would you like?";
      } else if (!newOrder.size) {
        response = "What size — small, medium, or large?";
      } else if (!newOrder.milk) {
        response = "Any milk preference? We have oat, almond, whole, or skim.";
      } else {
        response = "Perfect! Coming right up!";
        setTimeout(() => {
          setCoins(prev => prev + 100);
          triggerCoinAnimation();
          setInvestorMessage("Great work!");
          setGameState('investor');
        }, 1500);
      }
      
      setRound2Chat(prev => [...prev, { role: 'npc', text: response }]);
      speak(response);
    }, 500);
  };

  const startRound3 = () => {
    setRound(3);
    setGameState('playing');
    setShowDialogue(true);
    const greeting = "Ready when you are! Tap the mic and speak your order.";
    speak(greeting);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported. Try Chrome.');
      return;
    }
    
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    setRound3Listening(true);
    setRound3Transcript('');
    setRound3Feedback([]);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setRound3Transcript(transcript);
      evaluateRound3(transcript);
    };
    
    recognition.onerror = () => setRound3Listening(false);
    recognition.onend = () => setRound3Listening(false);
    recognition.start();
  };

  const evaluateRound3 = (transcript: string) => {
    const input = transcript.toLowerCase();
    const feedback: string[] = [];
    let score = 500;
    let missing: string[] = [];
    
    if (!(input.includes('latte') || input.includes('americano') || input.includes('cappuccino') || input.includes('mocha') || input.includes('coffee'))) {
      feedback.push('☕ Coffee type not detected');
      missing.push('coffee type');
      score -= 100;
    }
    if (!(input.includes('small') || input.includes('medium') || input.includes('large'))) {
      feedback.push('📏 Size not detected');
      missing.push('size');
      score -= 100;
    }
    if (!(input.includes('oat') || input.includes('whole') || input.includes('skim') || input.includes('almond') || input.includes('soy') || input.includes('milk'))) {
      feedback.push('🥛 Milk type not detected');
      missing.push('milk preference');
      score -= 100;
    }
    
    setRound3Feedback(feedback);
    setRound3Attempts(prev => prev + 1);
    
    if (feedback.length === 0) {
      speak("Got it! Your order is coming right up!");
      setTimeout(() => {
        setCoins(prev => prev + 500);
        triggerCoinAnimation();
        setInvestorMessage("Perfect!");
        setGameState('investor');
      }, 1500);
    } else {
      const clarification = `I didn't quite catch your ${missing.join(' or ')}. Could you repeat that?`;
      speak(clarification);
    }
  };

  const acceptRound3Score = () => {
    const score = 500 - (round3Feedback.length * 100);
    speak("Alright, I'll get that started for you!");
    setTimeout(() => {
      setCoins(prev => prev + Math.max(score, 100));
      triggerCoinAnimation();
      setInvestorMessage("Good effort!");
      setGameState('investor');
    }, 1000);
  };

  const completeGame = () => {
    if (round === 1) startRound2();
    else if (round === 2) startRound3();
    else {
      setRound(1);
      setGameState('intro');
      setRound1Selections([]);
      setRound2Chat([]);
      setRound2Order({ type: false, size: false, milk: false });
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

  // Gold coin SVG component
  const GoldCoin = ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="url(#goldGradient)" stroke="#B8860B" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="7" fill="none" stroke="#DAA520" strokeWidth="1"/>
      <text x="12" y="16" textAnchor="middle" fill="#8B6914" fontSize="10" fontWeight="bold">$</text>
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700"/>
          <stop offset="50%" stopColor="#FFA500"/>
          <stop offset="100%" stopColor="#DAA520"/>
        </linearGradient>
      </defs>
    </svg>
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

      {/* Gold Coin Animation */}
      {showCoinAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {animatedCoins.map((coin) => (
            <div
              key={coin.id}
              className="absolute animate-coin-burst"
              style={{
                '--tx': `${coin.x}px`,
                '--ty': `${coin.y}px`,
                '--r': `${coin.rotation}deg`,
                '--s': coin.scale,
                animationDelay: `${coin.delay}s`
              } as React.CSSProperties}
            >
              <div className="w-12 h-12 relative">
                <div className="absolute inset-0 bg-yellow-400/60 rounded-full blur-md" />
                <GoldCoin className="w-12 h-12 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-30">
        <div className="bg-black/60 backdrop-blur-sm rounded-full px-5 py-2 border border-amber-500/30">
          <span className="text-amber-400 font-mono">M31 Coffee Outpost</span>
        </div>
        <div className="flex gap-3">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-5 py-2 border border-yellow-500/30 flex items-center gap-2">
            <GoldCoin className="w-6 h-6" />
            <span className="text-yellow-400 font-mono font-bold text-lg">{coins}</span>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-5 py-2 border border-purple-500/30">
            <span className="text-purple-400 font-mono">Round {round}/3</span>
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-yellow-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              M31 Coffee Outpost
            </h1>
            <p className="text-white mb-3 text-lg md:text-xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Kokorobot-1 dreams of becoming a barista someday.
            </p>
            <p className="text-amber-100 mb-3 text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Listen carefully. Can you take her order?
            </p>
            <p className="text-yellow-400 font-semibold mb-8 text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Earn coins to build Andromeda's first café!
            </p>
            <button
              onClick={startGame}
              disabled={!introReady}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold py-4 px-14 rounded-full text-xl transition transform hover:scale-105 shadow-lg shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="w-full max-w-2xl animate-fade-in">
            
            {/* Round 1 */}
            {round === 1 && (
              <div className="bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-8 shadow-2xl">
                <div className="flex items-start gap-5 mb-6">
                  <img 
                    src="/kokorobot-closeup.png" 
                    alt="Kokorobot" 
                    className={`w-24 h-24 object-cover rounded-full border-3 border-amber-500/60 shadow-lg animate-pop-in ${isNpcSpeaking ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-black animate-pulse' : ''}`}
                  />
                  <div className="flex-1">
                    <p className="text-amber-400 text-xl mb-2 font-mono font-bold">Kokorobot-1</p>
                    
                    {showTranscript ? (
                      <p className="text-2xl leading-relaxed text-white">{npcOrder}</p>
                    ) : (
                      <div className="bg-amber-900/40 rounded-xl p-6 text-center border border-amber-500/30">
                        <p className="text-amber-300/80 mb-4 text-xl">🎧 Listen to the order...</p>
                        <button 
                          onClick={buyTranscript}
                          disabled={coins < 10}
                          className={`text-lg px-8 py-3 rounded-full transition font-semibold flex items-center gap-2 mx-auto ${
                            coins >= 10 
                              ? 'bg-yellow-500/30 text-yellow-400 hover:bg-yellow-500/40 border border-yellow-500/60' 
                              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          💡 Show text (10 <GoldCoin className="w-5 h-5 inline" />)
                        </button>
                      </div>
                    )}
                    
                    <button 
                      onClick={replayVoice}
                      className="mt-4 text-lg text-amber-400/80 hover:text-amber-400 transition flex items-center gap-2 font-medium"
                    >
                      🔊 Replay voice
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
                        {item.size} {item.type} {item.milk && `(${item.milk})`} ✕
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-5 mb-6">
                    <div>
                      <p className="text-sm text-amber-400/60 mb-2 font-semibold">TYPE</p>
                      <div className="flex flex-col gap-2">
                        {['Americano', 'Latte', 'Cappuccino'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setCurrentItem({...currentItem, type})}
                            className={`py-3 px-4 rounded-lg text-lg transition font-medium ${currentItem.type === type ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`}
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
                            className={`py-3 px-4 rounded-lg text-lg transition font-medium ${currentItem.size === size ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-amber-400/60 mb-2 font-semibold">MILK</p>
                      <div className="flex flex-col gap-2">
                        {['None', 'Whole', 'Oat', 'Almond'].map((milk) => (
                          <button
                            key={milk}
                            onClick={() => setCurrentItem({...currentItem, milk: milk === 'None' ? undefined : milk})}
                            className={`py-3 px-4 rounded-lg text-lg transition font-medium ${(currentItem.milk === milk || (!currentItem.milk && milk === 'None')) ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`}
                          >
                            {milk}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={addToOrder}
                      disabled={!currentItem.type || !currentItem.size || round1Selections.length >= 3}
                      className="flex-1 py-4 rounded-xl font-bold text-xl transition bg-amber-900/60 hover:bg-amber-900/80 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      + Add Item
                    </button>
                    <button
                      onClick={checkRound1}
                      disabled={round1Selections.length !== 3}
                      className="flex-1 py-4 rounded-xl font-bold text-xl transition bg-amber-500 hover:bg-amber-400 text-black disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Submit ✓
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Round 2 */}
            {round === 2 && (
              <div className="bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <img src="/kokorobot-closeup.png" alt="Kokorobot" className="w-20 h-20 rounded-full object-cover border-2 border-amber-500/50" />
                  <div>
                    <p className="text-amber-400 font-mono font-bold text-xl">Kokorobot-1</p>
                    <p className="text-lg text-purple-400">Your turn! Order a drink.</p>
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
                  {[{key: 'type', label: '☕ Type'}, {key: 'size', label: '📏 Size'}, {key: 'milk', label: '🥛 Milk'}].map(({key, label}) => (
                    <span key={key} className={`px-4 py-2 rounded-full text-base font-medium ${round2Order[key as keyof typeof round2Order] ? 'bg-green-500/30 text-green-400 border border-green-500/50' : 'bg-amber-900/50 text-amber-400/60'}`}>
                      {label} {round2Order[key as keyof typeof round2Order] && '✓'}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={round2Input}
                    onChange={(e) => setRound2Input(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && processRound2Input()}
                    placeholder="Type your order..."
                    className="flex-1 bg-amber-900/40 border border-amber-500/40 rounded-xl px-5 py-4 text-xl focus:outline-none focus:border-amber-500 text-white placeholder-amber-400/50"
                  />
                  <button onClick={processRound2Input} className="bg-purple-500 hover:bg-purple-400 text-white font-bold px-10 rounded-xl text-xl">
                    Send
                  </button>
                </div>
              </div>
            )}

            {/* Round 3 */}
            {round === 3 && (
              <div className="bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-8 shadow-2xl text-center">
                <img src="/kokorobot-closeup.png" alt="Kokorobot" className="w-24 h-24 rounded-full object-cover border-2 border-amber-500/50 mx-auto mb-4" />
                <p className="text-xl text-green-400 mb-6 font-medium">Speak your order! Include type, size, and milk.</p>
                
                <button
                  onClick={startListening}
                  disabled={round3Listening}
                  className={`w-40 h-40 rounded-full font-bold text-4xl transition mx-auto mb-6 shadow-lg ${
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

                {round3Feedback.length > 0 && (
                  <div className="bg-amber-900/40 rounded-xl p-5 text-left border border-amber-500/30">
                    {round3Feedback.map((f, i) => (
                      <p key={i} className="text-yellow-400 text-xl mb-1">{f}</p>
                    ))}
                    <div className="flex gap-4 mt-5">
                      <button onClick={startListening} className="flex-1 bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-xl text-xl">
                        Try Again
                      </button>
                      <button onClick={acceptRound3Score} className="flex-1 bg-amber-900/60 hover:bg-amber-900/80 text-amber-200 font-bold py-4 rounded-xl text-xl">
                        Accept Score
                      </button>
                    </div>
                  </div>
                )}

                <p className="text-base text-amber-400/60 mt-5">Max: 500 coins (−100 per missing element)</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Earth Investor Video Call - Full screen image with overlay */}
      {gameState === 'investor' && (
        <div className="fixed inset-0 z-40">
          {/* Full screen background image */}
          <img 
            src="/ib.png" 
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
                <GoldCoin className="w-6 h-6" />
                <span className="text-yellow-400 font-mono font-bold text-lg">{coins}</span>
              </div>
              <div className="bg-black rounded-full px-5 py-2 border border-purple-500/50">
                <span className="text-purple-400 font-mono">Round {round}/3</span>
              </div>
            </div>
          </div>

          {/* LIVE indicator - inside image */}
          <div className="absolute top-20 left-6 flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full z-50">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-xl font-mono font-bold">LIVE</span>
          </div>

          {/* Coin flying animation */}
          <div className="absolute top-1/2 left-1/2 z-50 animate-fly-to-balance">
            <div className="flex items-center gap-2 bg-black/70 px-4 py-2 rounded-full">
              <GoldCoin className="w-8 h-8" />
              <span className="text-yellow-400 font-bold text-2xl">+{round === 1 ? 100 : round === 2 ? 100 : 500}</span>
            </div>
          </div>

          {/* Text overlay on image - centered on Empire State Building area */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center z-50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <GoldCoin className="w-8 h-8" />
              <span className="text-yellow-400 text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">from our Earth Investors</span>
            </div>
            <p className="text-white text-4xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">{investorMessage} Can she take your orders, too?</p>
          </div>

          {/* Button at bottom */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50">
            <button
              onClick={completeGame}
              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold py-4 px-14 rounded-full text-2xl transition shadow-lg shadow-yellow-500/40"
            >
              {round < 3 ? 'Next Round →' : 'Mission Complete! 🎉'}
            </button>
          </div>
        </div>
      )}

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes coin-burst {
          0% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) rotate(var(--r)) scale(var(--s));
          }
        }
        .animate-coin-burst {
          animation: coin-burst 2s ease-out forwards;
        }
        @keyframes walk {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-walk {
          animation: walk 0.3s ease-in-out infinite;
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
            transform: translate(calc(50vw - 100px), calc(-50vh + 40px)) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translate(calc(50vw - 100px), calc(-50vh + 40px)) scale(0.5);
          }
        }
        .animate-fly-to-balance {
          animation: fly-to-balance 1.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}