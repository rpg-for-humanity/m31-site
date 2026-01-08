'use client';

import { useState, useEffect } from 'react';

type Round = 1 | 2 | 3;
type GameState = 'intro' | 'playing' | 'investor';
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
  const [npcPosition, setNpcPosition] = useState(-200);
  const [showDialogue, setShowDialogue] = useState(false);
  const [isNpcSpeaking, setIsNpcSpeaking] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [animatedCoins, setAnimatedCoins] = useState<Coin[]>([]);
  
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

  // Generate coin animation
  const triggerCoinAnimation = () => {
    const newCoins: Coin[] = [];
    for (let i = 0; i < 15; i++) {
      newCoins.push({
        id: i,
        x: Math.random() * 300 - 150,
        y: Math.random() * -200 - 50,
        rotation: Math.random() * 720 - 360,
        scale: 0.5 + Math.random() * 0.5,
        delay: Math.random() * 0.3
      });
    }
    setAnimatedCoins(newCoins);
    setShowCoinAnimation(true);
    setTimeout(() => setShowCoinAnimation(false), 2000);
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
    // Prefer more natural, upbeat voices
    const preferred = [
      'Samantha', // Apple - natural female
      'Karen', // Australian - friendly
      'Moira', // Irish - warm
      'Tessa', // South African - clear
      'Fiona', // Scottish
      'Victoria', // US female
      'Zira', // Windows natural
      'Hazel', // UK female
    ];
    
    for (const name of preferred) {
      const voice = voices.find(v => v.name.includes(name));
      if (voice) return voice;
    }
    
    // Try to find any female English voice
    const englishVoice = voices.find(v => 
      v.lang.startsWith('en') && 
      !v.name.toLowerCase().includes('male') &&
      (v.name.toLowerCase().includes('female') || 
       v.name.includes('Samantha') ||
       v.name.includes('Google') && v.lang === 'en-US')
    );
    
    return englishVoice || voices.find(v => v.lang.startsWith('en')) || voices[0];
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voice = getVoice();
      if (voice) utterance.voice = voice;
      
      // More upbeat settings
      utterance.rate = 1.0;
      utterance.pitch = 1.2; // Higher pitch = more cheerful
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
    setGameState('playing');
    setShowTranscript(false);
    let pos = -200;
    const walkIn = setInterval(() => {
      pos += 8;
      setNpcPosition(pos);
      if (pos >= 50) {
        clearInterval(walkIn);
        setTimeout(() => {
          setShowDialogue(true);
          speak(npcOrder);
        }, 500);
      }
    }, 30);
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
      setInvestorMessage('Well done! You understood the order perfectly.');
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
          setInvestorMessage("Fantastic! They understood your text. Can they understand you through speaking too?");
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
        setInvestorMessage("Perfect communication! You're ready for real conversations on Earth.");
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
      setInvestorMessage(`Good effort! +${Math.max(score, 100)} coins. Keep practicing!`);
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
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* M31 Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url('/m31.jpg')` }}
      />
      
      {/* Barren landscape overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-amber-950/90 via-amber-900/50 to-transparent" />
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-950 to-amber-900/70" />

      {/* Coin Animation */}
      {showCoinAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {animatedCoins.map((coin) => (
            <div
              key={coin.id}
              className="absolute text-4xl animate-coin-burst"
              style={{
                '--tx': `${coin.x}px`,
                '--ty': `${coin.y}px`,
                '--r': `${coin.rotation}deg`,
                '--s': coin.scale,
                '--d': `${coin.delay}s`,
                animationDelay: `${coin.delay}s`
              } as React.CSSProperties}
            >
              <div className="relative">
                <span className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">🪙</span>
                <div className="absolute inset-0 bg-yellow-400/50 blur-md rounded-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-30">
        <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-amber-500/30">
          <span className="text-amber-400 font-mono text-sm">M31 Coffee Outpost</span>
        </div>
        <div className="flex gap-3">
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-500/30">
            <span className="text-yellow-400 font-mono flex items-center gap-1">
              <span className="text-lg drop-shadow-[0_0_5px_rgba(250,204,21,0.6)]">🪙</span> 
              <span className="font-bold">{coins}</span>
            </span>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-500/30">
            <span className="text-purple-400 font-mono text-sm">Round {round}/3</span>
          </div>
        </div>
      </div>

      {/* Kokorobot */}
      {gameState !== 'intro' && (
        <div 
          className="absolute bottom-24 z-10 transition-all duration-500 ease-out"
          style={{ left: `${npcPosition}px` }}
        >
          <div className="relative">
            {/* Glow effect when speaking */}
            {isNpcSpeaking && (
              <div className="absolute inset-0 -m-4 bg-amber-400/30 rounded-full blur-2xl animate-pulse" />
            )}
            
            {/* Kokorobot Image */}
            <img 
              src="/kokorobot.png" 
              alt="Kokorobot" 
              className={`h-64 w-auto drop-shadow-2xl ${isNpcSpeaking ? 'animate-bounce' : 'animate-float'}`}
              style={{
                filter: isNpcSpeaking ? 'brightness(1.2) drop-shadow(0 0 20px rgba(251, 191, 36, 0.5))' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
              }}
            />
            
            {/* Name tag */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
              <span className="text-xs text-amber-400 font-mono bg-black/70 px-3 py-1 rounded-full border border-amber-500/30">
                Kokorobot-1
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-20 min-h-screen flex flex-col items-center justify-end pb-6 px-4">
        
        {/* INTRO */}
        {gameState === 'intro' && (
          <div className="text-center mb-32">
            <img 
              src="/kokorobot.png" 
              alt="Kokorobot" 
              className="h-48 w-auto mx-auto mb-6 animate-float drop-shadow-2xl"
            />
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
              M31 Coffee Outpost
            </h1>
            <p className="text-amber-200/80 mb-8 max-w-md">
              Kokorobot approaches. She wants coffee.<br />
              Listen carefully. Can you take her order?
            </p>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold py-4 px-12 rounded-full text-lg transition transform hover:scale-105 shadow-lg shadow-amber-500/30"
            >
              Begin Mission
            </button>
          </div>
        )}

        {/* DIALOGUE BOX */}
        {gameState === 'playing' && showDialogue && (
          <div className="w-full max-w-2xl">
            
            {/* Round 1 */}
            {round === 1 && (
              <div className="bg-black/70 backdrop-blur-md rounded-xl border border-amber-500/30 p-6">
                <div className="flex items-start gap-4 mb-6">
                  {/* Closeup photo */}
                  <img 
                    src="/kokorobot-closeup.png" 
                    alt="Kokorobot" 
                    className={`w-14 h-14 object-cover rounded-full border-2 border-amber-500/50 ${isNpcSpeaking ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black' : ''}`}
                  />
                  <div className="flex-1">
                    <p className="text-amber-400 text-sm mb-1 font-mono">Kokorobot-1</p>
                    
                    {showTranscript ? (
                      <p className="text-lg leading-relaxed text-white">{npcOrder}</p>
                    ) : (
                      <div className="bg-amber-900/30 rounded-lg p-4 text-center border border-amber-500/20">
                        <p className="text-amber-300/70 mb-3 italic">🔇 Listen to the order...</p>
                        <button 
                          onClick={buyTranscript}
                          disabled={coins < 10}
                          className={`text-sm px-4 py-2 rounded-full transition ${
                            coins >= 10 
                              ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/50' 
                              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          💡 Show text (10 🪙)
                        </button>
                      </div>
                    )}
                    
                    <button 
                      onClick={replayVoice}
                      className="mt-3 text-sm text-amber-400/70 hover:text-amber-400 transition flex items-center gap-2"
                    >
                      🔊 Replay voice
                    </button>
                  </div>
                </div>
                
                {/* Order Builder */}
                <div className="border-t border-amber-500/20 pt-4">
                  <p className="text-sm text-amber-300/70 mb-3">Build the order ({round1Selections.length}/3 items)</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
                    {round1Selections.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => removeFromOrder(i)}
                        className="bg-amber-500/20 border border-amber-500/50 rounded-lg px-3 py-1 text-sm hover:bg-red-500/20 hover:border-red-500/50 transition text-amber-200"
                      >
                        {item.size} {item.type} {item.milk && `(${item.milk})`} ✕
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-amber-400/50 mb-2">TYPE</p>
                      <div className="flex flex-col gap-1">
                        {['Americano', 'Latte', 'Cappuccino'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setCurrentItem({...currentItem, type})}
                            className={`py-1 px-2 rounded text-sm transition ${currentItem.type === type ? 'bg-amber-500 text-black' : 'bg-amber-900/40 hover:bg-amber-900/60 text-amber-200'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-amber-400/50 mb-2">SIZE</p>
                      <div className="flex flex-col gap-1">
                        {['Small', 'Medium', 'Large'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setCurrentItem({...currentItem, size})}
                            className={`py-1 px-2 rounded text-sm transition ${currentItem.size === size ? 'bg-amber-500 text-black' : 'bg-amber-900/40 hover:bg-amber-900/60 text-amber-200'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-amber-400/50 mb-2">MILK</p>
                      <div className="flex flex-col gap-1">
                        {['None', 'Whole', 'Oat', 'Almond'].map((milk) => (
                          <button
                            key={milk}
                            onClick={() => setCurrentItem({...currentItem, milk: milk === 'None' ? undefined : milk})}
                            className={`py-1 px-2 rounded text-sm transition ${(currentItem.milk === milk || (!currentItem.milk && milk === 'None')) ? 'bg-amber-500 text-black' : 'bg-amber-900/40 hover:bg-amber-900/60 text-amber-200'}`}
                          >
                            {milk}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={addToOrder}
                      disabled={!currentItem.type || !currentItem.size || round1Selections.length >= 3}
                      className="flex-1 py-2 rounded-lg font-bold transition bg-amber-900/50 hover:bg-amber-900/70 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      + Add Item
                    </button>
                    <button
                      onClick={checkRound1}
                      disabled={round1Selections.length !== 3}
                      className="flex-1 py-2 rounded-lg font-bold transition bg-amber-500 hover:bg-amber-400 text-black disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Submit ✓
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Round 2 */}
            {round === 2 && (
              <div className="bg-black/70 backdrop-blur-md rounded-xl border border-amber-500/30 p-6">
                <p className="text-sm text-purple-400 mb-4">Your turn! Order a drink. Specify: type, size, milk.</p>
                
                <div className="h-48 overflow-y-auto mb-4 space-y-3">
                  {round2Chat.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'player' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'npc' && (
                        <img src="/kokorobot-closeup.png" alt="Kokorobot" className="w-8 h-8 rounded-full mr-2 object-cover" />
                      )}
                      <span className={`inline-block rounded-xl px-4 py-2 max-w-[80%] ${
                        msg.role === 'player' ? 'bg-purple-500 text-white' : 'bg-amber-900/50 text-amber-200'
                      }`}>
                        {msg.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mb-4">
                  {[{key: 'type', label: '☕ Type'}, {key: 'size', label: '📏 Size'}, {key: 'milk', label: '🥛 Milk'}].map(({key, label}) => (
                    <span key={key} className={`px-3 py-1 rounded-full text-xs ${round2Order[key as keyof typeof round2Order] ? 'bg-green-500/20 text-green-400' : 'bg-amber-900/40 text-amber-400/50'}`}>
                      {label} {round2Order[key as keyof typeof round2Order] && '✓'}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={round2Input}
                    onChange={(e) => setRound2Input(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && processRound2Input()}
                    placeholder="Type your order..."
                    className="flex-1 bg-amber-900/30 border border-amber-500/30 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 text-white placeholder-amber-400/50"
                  />
                  <button onClick={processRound2Input} className="bg-purple-500 hover:bg-purple-400 text-white font-bold px-6 rounded-xl">
                    Send
                  </button>
                </div>
              </div>
            )}

            {/* Round 3 */}
            {round === 3 && (
              <div className="bg-black/70 backdrop-blur-md rounded-xl border border-amber-500/30 p-6 text-center">
                <p className="text-sm text-green-400 mb-4">Speak your order! Include type, size, and milk.</p>
                
                <button
                  onClick={startListening}
                  disabled={round3Listening}
                  className={`w-32 h-32 rounded-full font-bold text-2xl transition mx-auto mb-4 ${
                    round3Listening ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-r from-green-500 to-amber-500 hover:from-green-400 hover:to-amber-400'
                  }`}
                >
                  {round3Listening ? '🎤' : '🎤 Speak'}
                </button>

                {round3Transcript && (
                  <div className="bg-amber-900/30 rounded-xl p-4 mb-4 text-left border border-amber-500/20">
                    <p className="text-sm text-amber-400/70">You said:</p>
                    <p className="text-lg text-white">"{round3Transcript}"</p>
                  </div>
                )}

                {round3Feedback.length > 0 && (
                  <div className="bg-amber-900/30 rounded-xl p-4 text-left border border-amber-500/20">
                    {round3Feedback.map((f, i) => (
                      <p key={i} className="text-yellow-400">{f}</p>
                    ))}
                    <div className="flex gap-2 mt-4">
                      <button onClick={startListening} className="flex-1 bg-green-500 hover:bg-green-400 text-black font-bold py-2 rounded-lg">
                        Try Again
                      </button>
                      <button onClick={acceptRound3Score} className="flex-1 bg-amber-900/50 hover:bg-amber-900/70 text-amber-200 font-bold py-2 rounded-lg">
                        Accept Score
                      </button>
                    </div>
                  </div>
                )}

                <p className="text-xs text-amber-400/50 mt-4">Max: 500 coins (−100 per missing element)</p>
              </div>
            )}
          </div>
        )}

        {/* Investor Modal */}
        {gameState === 'investor' && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40 p-4">
            <div className="bg-gradient-to-b from-amber-950 to-black rounded-2xl p-8 max-w-md text-center border border-yellow-500/30 relative overflow-hidden">
              {/* Shiny effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent -skew-x-12 animate-shimmer" />
              
              <div className="relative z-10">
                <div className="text-6xl mb-4">🌍</div>
                <h2 className="text-xl font-bold text-yellow-400 mb-2">Earth Investor</h2>
                <p className="text-lg mb-4 text-amber-200">{investorMessage}</p>
                <p className="text-yellow-400 font-bold text-3xl mb-6 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                  +{round === 1 ? 100 : round === 2 ? 100 : 500} 🪙
                </p>
                <button
                  onClick={completeGame}
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold py-3 px-8 rounded-full transition shadow-lg shadow-yellow-500/30"
                >
                  {round < 3 ? 'Next Round →' : 'Mission Complete! 🎉'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
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
          animation: coin-burst 1.5s ease-out forwards;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}