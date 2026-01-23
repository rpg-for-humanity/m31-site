(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/test/convoset/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConvosetTest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ConvosetTest() {
    _s();
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('intro');
    const [round, setRound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [coins, setCoins] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(50);
    const [investorMessage, setInvestorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showDialogue, setShowDialogue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isNpcSpeaking, setIsNpcSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showTranscript, setShowTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [voices, setVoices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showCoinAnimation, setShowCoinAnimation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [animatedCoins, setAnimatedCoins] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Menu and Shop states
    const [showMenu, setShowMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCafeShop, setShowCafeShop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCoinShop, setShowCoinShop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [purchasedCafes, setPurchasedCafes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Purchase confirmation popup states
    const [showPurchaseConfirm, setShowPurchaseConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedCafe, setSelectedCafe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showJustPurchased, setShowJustPurchased] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [justPurchasedCafe, setJustPurchasedCafe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showOwnedPopup, setShowOwnedPopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ownedCafeToView, setOwnedCafeToView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Auto-load saved progress on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConvosetTest.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
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
        }
    }["ConvosetTest.useEffect"], []);
    // Auto-save when coins or purchases change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConvosetTest.useEffect": ()=>{
            if (isLoaded && ("TURBOPACK compile-time value", "object") !== 'undefined') {
                const saveData = {
                    coins,
                    purchasedCafes,
                    lastSaved: new Date().toISOString()
                };
                localStorage.setItem('m31-coffee-save', JSON.stringify(saveData));
                console.log('💾 Auto-saved:', saveData);
            }
        }
    }["ConvosetTest.useEffect"], [
        coins,
        purchasedCafes,
        isLoaded
    ]);
    // Cafe options - Updated prices
    const cafeOptions = [
        {
            id: 'coffeepost',
            name: 'Coffee Post',
            price: 500,
            image: '/coffeepost.png'
        },
        {
            id: 'retrocafe',
            name: 'Retro Café',
            price: 800,
            image: '/retrocafe.png'
        },
        {
            id: 'flowercafe',
            name: 'Flower Café',
            price: 1000,
            image: '/flowercafe.png'
        },
        {
            id: 'moderncafe',
            name: 'Modern Café',
            price: 1500,
            image: '/moderncafe.png'
        },
        {
            id: 'rocococafe',
            name: 'Rococo Café',
            price: 2000,
            image: '/rocococafe.png'
        }
    ];
    // Coin bundles
    const coinBundles = [
        {
            id: 'starter',
            coins: 500,
            price: '$0.99',
            label: 'Starter'
        },
        {
            id: 'popular',
            coins: 1500,
            price: '$2.99',
            label: 'Popular',
            best: true
        },
        {
            id: 'pro',
            coins: 5000,
            price: '$7.99',
            label: 'Pro Pack'
        }
    ];
    // Menu items
    const menuItems = [
        {
            name: 'Americano',
            desc: 'Espresso + water'
        },
        {
            name: 'Latte',
            desc: 'Espresso + steamed milk'
        },
        {
            name: 'Cappuccino',
            desc: 'Espresso + foam'
        },
        {
            name: 'Flat White',
            desc: 'Double shot + microfoam'
        },
        {
            name: 'Macchiato',
            desc: 'Espresso + milk foam'
        },
        {
            name: 'Mocha',
            desc: 'Espresso + chocolate + milk'
        },
        {
            name: 'Espresso',
            desc: 'Pure coffee shot'
        }
    ];
    // Animation states
    const [kokoroX, setKokoroX] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-200);
    const [kokoroScale, setKokoroScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [kokoroOpacity, setKokoroOpacity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showFullBody, setShowFullBody] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isWalking, setIsWalking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [introReady, setIntroReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [missionVisible, setMissionVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [round1Selections, setRound1Selections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentItem, setCurrentItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [round2Input, setRound2Input] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [round2Chat, setRound2Chat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [round2Order, setRound2Order] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: false,
        size: false,
        milk: false,
        syrup: false,
        temp: false
    });
    const [round3Listening, setRound3Listening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [round3Transcript, setRound3Transcript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [round3Attempts, setRound3Attempts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [round3Feedback, setRound3Feedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [musicStarted, setMusicStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [musicPlaying, setMusicPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [audioRef, setAudioRef] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Round-specific orders and audio
    const roundConfigs = {
        1: {
            audio: '/Audio/round1-order.mp3',
            npcOrder: "Hi, a caramel macchiato, medium please.",
            correctOrder: [
                {
                    type: 'Macchiato',
                    size: 'Medium',
                    syrup: 'Caramel'
                }
            ],
            itemCount: 1
        },
        2: {
            audio: '/Audio/round2-order.mp3',
            npcOrder: "Hi, I'd like a large flat white, with hazelnut syrup please.",
            correctOrder: [
                {
                    type: 'Flat White',
                    size: 'Large',
                    syrup: 'Hazelnut'
                }
            ],
            itemCount: 1
        },
        3: {
            audio: '/Audio/order.mp3',
            npcOrder: "Can I get a large Americano, and two small lattes — one with oat milk and one with whole milk?",
            correctOrder: [
                {
                    type: 'Americano',
                    size: 'Large'
                },
                {
                    type: 'Latte',
                    size: 'Small',
                    milk: 'Oat'
                },
                {
                    type: 'Latte',
                    size: 'Small',
                    milk: 'Whole'
                }
            ],
            itemCount: 3
        }
    };
    const currentRoundConfig = round <= 3 ? roundConfigs[round] : null;
    // Intro - Kokorobot walks to center-left, then mission fades in
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConvosetTest.useEffect": ()=>{
            if (gameState === 'intro') {
                setKokoroX(-200);
                setIsWalking(true);
                setIntroReady(false);
                setMissionVisible(false);
                const walkIn = setInterval({
                    "ConvosetTest.useEffect.walkIn": ()=>{
                        setKokoroX({
                            "ConvosetTest.useEffect.walkIn": (prev)=>{
                                // Walk to about 25% from left
                                const target = window.innerWidth * 0.25;
                                if (prev >= target) {
                                    clearInterval(walkIn);
                                    setIsWalking(false);
                                    // Mission fades in after Kokorobot stops
                                    setTimeout({
                                        "ConvosetTest.useEffect.walkIn": ()=>{
                                            setMissionVisible(true);
                                            setTimeout({
                                                "ConvosetTest.useEffect.walkIn": ()=>setIntroReady(true)
                                            }["ConvosetTest.useEffect.walkIn"], 400);
                                        }
                                    }["ConvosetTest.useEffect.walkIn"], 200);
                                    return target;
                                }
                                return prev + 10;
                            }
                        }["ConvosetTest.useEffect.walkIn"]);
                    }
                }["ConvosetTest.useEffect.walkIn"], 20);
                return ({
                    "ConvosetTest.useEffect": ()=>clearInterval(walkIn)
                })["ConvosetTest.useEffect"];
            }
        }
    }["ConvosetTest.useEffect"], [
        gameState
    ]);
    // Bellagio-style fountain - vertical jets spread from left to right, shoot up, then go to balance
    const triggerCoinAnimation = (currentRound)=>{
        const newCoins = [];
        // Number of vertical jets increases with round
        const jetCounts = {
            1: 12,
            2: 18,
            3: 24,
            4: 30,
            5: 36
        };
        const coinsPerJet = {
            1: 4,
            2: 5,
            3: 6,
            4: 7,
            5: 8
        };
        // Heights increase per round
        const maxHeightMultipliers = {
            1: 0.4,
            2: 0.55,
            3: 0.7,
            4: 0.85,
            5: 1.0
        };
        const numJets = jetCounts[currentRound] || 20;
        const coinsInJet = coinsPerJet[currentRound] || 5;
        const heightMult = maxHeightMultipliers[currentRound] || 1;
        // Create jets spread across the screen width (left to right)
        const screenWidth = ("TURBOPACK compile-time truthy", 1) ? window.innerWidth : "TURBOPACK unreachable";
        const jetSpacing = screenWidth / (numJets + 1);
        let coinId = 0;
        for(let jet = 0; jet < numJets; jet++){
            // Center jets are taller, edge jets are shorter
            const centerDistance = Math.abs(jet - numJets / 2) / (numJets / 2);
            const jetHeightVariation = 1 - centerDistance * 0.5;
            // Add some randomness
            const randomHeightBoost = 0.8 + Math.random() * 0.4;
            const jetMaxHeight = 300 + 200 * jetHeightVariation * randomHeightBoost * heightMult;
            // X position for this jet (spread across screen from left to right)
            const jetX = jet * jetSpacing - screenWidth / 2 + jetSpacing;
            // Create multiple coins in each jet
            for(let c = 0; c < coinsInJet; c++){
                const coinHeight = jetMaxHeight * (0.5 + c / coinsInJet * 0.5);
                newCoins.push({
                    id: coinId++,
                    x: jetX + (Math.random() * 10 - 5),
                    y: -coinHeight,
                    rotation: Math.random() * 360,
                    scale: 0.25 + Math.random() * 0.2,
                    delay: c * 0.08 + Math.random() * 0.1,
                    jetIndex: jet,
                    coinInJet: c
                });
            }
        }
        setAnimatedCoins(newCoins);
        setShowCoinAnimation(true);
        setTimeout(()=>setShowCoinAnimation(false), 3500);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConvosetTest.useEffect": ()=>{
            const loadVoices = {
                "ConvosetTest.useEffect.loadVoices": ()=>{
                    const availableVoices = window.speechSynthesis.getVoices();
                    setVoices(availableVoices);
                }
            }["ConvosetTest.useEffect.loadVoices"];
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }["ConvosetTest.useEffect"], []);
    // REMOVED: useEffect that was causing music overlap
    // Music is now ONLY started in specific places, not on every round change
    const getVoice = ()=>{
        const preferred = [
            'Samantha',
            'Karen',
            'Moira',
            'Tessa',
            'Fiona',
            'Victoria',
            'Zira',
            'Hazel'
        ];
        for (const name of preferred){
            const voice = voices.find((v)=>v.name.includes(name));
            if (voice) return voice;
        }
        const englishVoice = voices.find((v)=>v.lang.startsWith('en') && !v.name.toLowerCase().includes('male'));
        return englishVoice || voices.find((v)=>v.lang.startsWith('en')) || voices[0];
    };
    const speak = (text, audioFile)=>{
        // If audio file provided, play it instead of TTS
        if (audioFile) {
            const audio = new Audio(audioFile);
            audio.volume = 0.8;
            setIsNpcSpeaking(true);
            audio.onended = ()=>setIsNpcSpeaking(false);
            audio.onerror = (e)=>{
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
                    utterance.onend = ()=>setIsNpcSpeaking(false);
                    window.speechSynthesis.speak(utterance);
                }
            };
            audio.play().catch((err)=>{
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
            utterance.onend = ()=>setIsNpcSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };
    const playRoundOrder = (forceRound)=>{
        // Only for rounds 1-3 (listen & select)
        const targetRound = forceRound || round;
        const config = roundConfigs[targetRound];
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
        audio.oncanplay = ()=>{
            console.log('Audio can play');
            audio.play().then(()=>{
                console.log('Audio playing successfully');
            }).catch((err)=>{
                console.error('Play failed:', err);
                speakTTS(config.npcOrder);
            });
        };
        audio.onended = ()=>{
            console.log('Audio ended');
            setIsNpcSpeaking(false);
            // DON'T start music here - it's already started in completeGame
            // Just resume if it was paused
            if (audioRef && musicPlaying) {
                audioRef.play().catch(()=>{});
            }
        };
        audio.onerror = (e)=>{
            console.error('Audio load error - trying fetch:', e);
            fetch(config.audio).then((res)=>{
                console.log('Fetch status:', res.status, res.statusText);
                if (!res.ok) {
                    speakTTS(config.npcOrder);
                }
            }).catch((fetchErr)=>{
                console.error('Fetch also failed:', fetchErr);
                speakTTS(config.npcOrder);
            });
        };
    };
    const getMusicForRound = (r)=>{
        // music-round1.mp3 for Round 1-2, music-round2.mp3 for round 3, music-round3.mp3 for round 4,5
        if (r <= 2) return '/Audio/music-round1.mp3';
        if (r === 3) return '/Audio/music-round2.mp3';
        return '/Audio/music-round3.mp3'; // rounds 4 and 5
    };
    // Use a module-level variable to ensure only ONE audio instance exists
    const startBackgroundMusic = (forceRound)=>{
        // CRITICAL: First, stop and destroy ANY existing audio
        if (audioRef) {
            audioRef.pause();
            audioRef.currentTime = 0;
            audioRef.src = '';
        }
        // Also find and kill any orphaned audio elements playing music
        if (typeof document !== 'undefined') {
            document.querySelectorAll('audio').forEach((el)=>{
                const audioEl = el;
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
        audio.play().catch(()=>{});
        setAudioRef(audio);
        setMusicStarted(true);
        setMusicPlaying(true);
    };
    // Stop all music completely
    const stopBackgroundMusic = ()=>{
        console.log('🔇 Stopping all music');
        if (audioRef) {
            audioRef.pause();
            audioRef.currentTime = 0;
            audioRef.src = '';
        }
        // Kill any orphaned audio
        if (typeof document !== 'undefined') {
            document.querySelectorAll('audio').forEach((el)=>{
                const audioEl = el;
                if (audioEl.src && audioEl.src.includes('music-round')) {
                    audioEl.pause();
                    audioEl.currentTime = 0;
                    audioEl.src = '';
                }
            });
        }
        setMusicPlaying(false);
    };
    const speakTTS = (text)=>{
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const voice = getVoice();
            if (voice) utterance.voice = voice;
            utterance.rate = 1.0;
            utterance.pitch = 1.2;
            utterance.volume = 1.0;
            setIsNpcSpeaking(true);
            utterance.onend = ()=>{
                setIsNpcSpeaking(false);
                // Just resume existing music, don't start new
                if (audioRef && musicPlaying) {
                    audioRef.play().catch(()=>{});
                }
            };
            window.speechSynthesis.speak(utterance);
        }
    };
    const buyTranscript = ()=>{
        if (coins >= 10) {
            setCoins((prev)=>prev - 10);
            setShowTranscript(true);
        }
    };
    const toggleMusic = ()=>{
        if (musicPlaying) {
            // Stop ALL music
            if (audioRef) {
                audioRef.pause();
            }
            // Also stop any orphaned audio
            if (typeof document !== 'undefined') {
                document.querySelectorAll('audio').forEach((el)=>{
                    const audioEl = el;
                    if (audioEl.src && audioEl.src.includes('music-round')) {
                        audioEl.pause();
                    }
                });
            }
            setMusicPlaying(false);
        } else {
            // Resume only the main audioRef
            if (audioRef) {
                audioRef.play().catch(()=>{});
            }
            setMusicPlaying(true);
        }
    };
    const startGame = ()=>{
        setGameState('walking');
        setShowTranscript(false);
        setIsWalking(true);
        // Walk to center then transition
        const walkToCenter = setInterval(()=>{
            setKokoroX((prev)=>{
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
    const shrinkAndTransition = ()=>{
        setIsWalking(false);
        let scale = 1;
        let opacity = 1;
        const shrinkInterval = setInterval(()=>{
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
    const replayVoice = ()=>{
        playRoundOrder();
    };
    const addToOrder = ()=>{
        if (!currentRoundConfig) return;
        if (currentItem.type && currentItem.size && round1Selections.length < currentRoundConfig.itemCount) {
            setRound1Selections([
                ...round1Selections,
                currentItem
            ]);
            setCurrentItem({});
        }
    };
    const removeFromOrder = (index)=>{
        setRound1Selections(round1Selections.filter((_, i)=>i !== index));
    };
    const checkRound1 = ()=>{
        if (!currentRoundConfig) return;
        const normalize = (items)=>items.map((i)=>`${i.size}-${i.type}-${i.milk || 'none'}-${i.syrup || 'none'}`).sort().join(',');
        const isCorrect = normalize(round1Selections) === normalize(currentRoundConfig.correctOrder);
        if (isCorrect) {
            // Stop background music completely
            stopBackgroundMusic();
            // Coin rewards: Round 1 = 20, Round 2 = 30, Round 3 = 50
            const coinReward = round === 1 ? 20 : round === 2 ? 30 : 50;
            // Play celebration sound
            playAudio('/Audio/goodresult.mp3', ()=>{
                setCoins((prev)=>prev + coinReward);
                triggerCoinAnimation(round);
                const messages = {
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
    const startRound2 = ()=>{
        setRound(2);
        setGameState('playing');
        setShowDialogue(true);
        setShowTranscript(true);
        setRound2Order({
            type: false,
            size: false,
            milk: false,
            syrup: false,
            temp: false
        });
        setRound2OrderDetails({});
        setRound2ConfirmStep(false);
        const greeting = "Hi there! What can I get started for you today?";
        setRound2Chat([
            {
                role: 'npc',
                text: greeting
            }
        ]);
        playAudio('/Audio/kokorobot-greeting.mp3');
    };
    const playAudio = (audioFile, onEnd)=>{
        // Pause background music while voice plays
        if (audioRef) {
            audioRef.pause();
        }
        const audio = new Audio(audioFile);
        audio.volume = 0.8;
        setIsNpcSpeaking(true);
        // Don't resume music after victory/celebration sounds
        const isVictorySound = audioFile.includes('goodresult') || audioFile.includes('kokorobot-success');
        audio.oncanplay = ()=>{
            audio.play().catch((err)=>{
                console.error('Play failed:', err);
                setIsNpcSpeaking(false);
            });
        };
        audio.onended = ()=>{
            setIsNpcSpeaking(false);
            if (onEnd) onEnd();
            // Resume background music (but not after victory sounds)
            if (audioRef && musicPlaying && !isVictorySound) {
                audioRef.play().catch(()=>{});
            }
        };
        audio.onerror = ()=>{
            console.error('Audio error:', audioFile);
            setIsNpcSpeaking(false);
        };
    };
    // Track actual order details for repeating back
    const [round2OrderDetails, setRound2OrderDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [round2ConfirmStep, setRound2ConfirmStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const processRound2Input = ()=>{
        if (!round2Input.trim()) return;
        const input = round2Input.toLowerCase();
        setRound2Chat((prev)=>[
                ...prev,
                {
                    role: 'player',
                    text: round2Input
                }
            ]);
        setRound2Input('');
        // If in confirm step, check for confirmation
        if (round2ConfirmStep) {
            if (input.includes('yes') || input.includes('confirm') || input.includes('correct') || input.includes('that\'s right') || input.includes('looks good') || input.includes('perfect') || input.includes('that\'s it') || input.includes('thats it') || input.includes('thank you') || input.includes('thanks') || input.includes('good') || input.includes('yep') || input.includes('yup') || input.includes('sure') || input.includes('okay') || input.includes('ok')) {
                const response = "Thank you, it will be at the pick up counter.";
                setRound2Chat((prev)=>[
                        ...prev,
                        {
                            role: 'npc',
                            text: response
                        }
                    ]);
                // Stop background music completely
                stopBackgroundMusic();
                playAudio('/Audio/goodresult.mp3', ()=>{
                    setCoins((prev)=>prev + 80);
                    triggerCoinAnimation(round);
                    setInvestorMessage("Impressive!");
                    setGameState('investor');
                });
                return;
            } else if (input.includes('no') || input.includes('change') || input.includes('actually') || input.includes('wait') || input.includes('wrong')) {
                setRound2ConfirmStep(false);
                setRound2Order({
                    type: false,
                    size: false,
                    milk: false,
                    syrup: false,
                    temp: false
                });
                setRound2OrderDetails({});
                const response = "No problem! What would you like instead?";
                setRound2Chat((prev)=>[
                        ...prev,
                        {
                            role: 'npc',
                            text: response
                        }
                    ]);
                playAudio('/Audio/kokorobot-greeting.mp3');
                return;
            }
        }
        // Check for "what do you have" type questions FIRST - before any order processing
        if (input.includes('what do you have') || input.includes('what options') || input.includes('what kinds') || input.includes('what milk') || input.includes('what type')) {
            const response = "We have whole, oat, almond, nonfat, and soy milk. Which would you like?";
            setRound2Chat((prev)=>[
                    ...prev,
                    {
                        role: 'npc',
                        text: response
                    }
                ]);
            playAudio('/Audio/milk-lists.mp3');
            return;
        }
        // Check for unavailable items (like 2%, half and half) BEFORE other processing
        if (input.includes('2%') || input.includes('two percent') || input.includes('two %') || input.includes('with 2') || input.includes('half and half') || input.includes('half & half') || input.includes('cream') || input.includes('coconut')) {
            const response = "We don't have that, but we do have whole, oat, almond, nonfat, and soy milk. Which would you like?";
            setRound2Chat((prev)=>[
                    ...prev,
                    {
                        role: 'npc',
                        text: response
                    }
                ]);
            playAudio('/Audio/milk-lists.mp3');
            return;
        }
        const newOrder = {
            ...round2Order
        };
        const newDetails = {
            ...round2OrderDetails
        };
        // Check if it's a question about availability
        const isQuestion = input.includes('do you have') || input.includes('is there') || input.includes('can i get') || input.includes('?');
        // Check for unknown drink types (things that sound like orders but aren't on menu)
        const unknownDrinks = [
            'black coffee',
            'drip',
            'filter',
            'pour over',
            'cold brew',
            'frappuccino',
            'frappe',
            'chai',
            'tea',
            'matcha',
            'hot chocolate'
        ];
        const hasUnknownDrink = unknownDrinks.some((drink)=>input.includes(drink));
        if (hasUnknownDrink && !round2Order.type) {
            const response = "I'm sorry, we don't have that, but here are your options!";
            setRound2Chat((prev)=>[
                    ...prev,
                    {
                        role: 'npc',
                        text: response
                    }
                ]);
            playAudio('/Audio/notavailable.mp3');
            setTimeout(()=>setShowMenu(true), 1000);
            return;
        }
        // Detect drink type
        if (input.includes('americano')) {
            newOrder.type = true;
            newDetails.type = 'Americano';
        } else if (input.includes('flat white')) {
            newOrder.type = true;
            newDetails.type = 'Flat White';
        } else if (input.includes('latte')) {
            newOrder.type = true;
            newDetails.type = 'Latte';
        } else if (input.includes('cappuccino')) {
            newOrder.type = true;
            newDetails.type = 'Cappuccino';
        } else if (input.includes('macchiato') || input.includes('machiato')) {
            newOrder.type = true;
            newDetails.type = 'Macchiato';
        } else if (input.includes('mocha')) {
            newOrder.type = true;
            newDetails.type = 'Mocha';
        } else if (input.includes('espresso')) {
            newOrder.type = true;
            newDetails.type = 'Espresso';
        }
        // Detect size
        if (input.includes('small')) {
            newOrder.size = true;
            newDetails.size = 'small';
        } else if (input.includes('medium')) {
            newOrder.size = true;
            newDetails.size = 'medium';
        } else if (input.includes('large')) {
            newOrder.size = true;
            newDetails.size = 'large';
        }
        // Detect temperature
        if (input.includes('iced') || input.includes('ice') || input.includes('cold')) {
            newOrder.temp = true;
            newDetails.temp = 'iced';
        } else if (input.includes('hot')) {
            newOrder.temp = true;
            newDetails.temp = 'hot';
        }
        // Detect syrup/flavor
        if (input.includes('caramel')) {
            newOrder.syrup = true;
            newDetails.syrup = 'caramel';
        } else if (input.includes('vanilla')) {
            newOrder.syrup = true;
            newDetails.syrup = 'vanilla';
        } else if (input.includes('hazelnut')) {
            newOrder.syrup = true;
            newDetails.syrup = 'hazelnut';
        } else if (input.includes('no syrup') || input.includes('no flavor') || input.includes('plain')) {
            newOrder.syrup = true;
            newDetails.syrup = 'none';
        }
        // Americano and Espresso don't need milk
        const noMilkDrinks = [
            'Americano',
            'Espresso'
        ];
        if (noMilkDrinks.includes(newDetails.type || '')) {
            newOrder.milk = true;
            newDetails.milk = 'none';
        }
        // Detect milk - including "no" responses
        if (input.includes('no thank') || input.includes('no,') || input.includes('no milk') || input.includes('none') || input.includes('black') || input.includes('regular') || input === 'no' || input.startsWith('no ') || input.includes("i'm good") || input.includes("that's it") || input.includes("that's all")) {
            newOrder.milk = true;
            newDetails.milk = 'none';
        } else if (input.includes('oat')) {
            newOrder.milk = true;
            newDetails.milk = 'oat milk';
        } else if (input.includes('almond')) {
            newOrder.milk = true;
            newDetails.milk = 'almond milk';
        } else if (input.includes('whole')) {
            newOrder.milk = true;
            newDetails.milk = 'whole milk';
        } else if (input.includes('skim')) {
            newOrder.milk = true;
            newDetails.milk = 'skim milk';
        } else if (input.includes('nonfat') || input.includes('non-fat') || input.includes('non fat')) {
            newOrder.milk = true;
            newDetails.milk = 'nonfat milk';
        } else if (input.includes('soy')) {
            newOrder.milk = true;
            newDetails.milk = 'soy milk';
        }
        setRound2Order(newOrder);
        setRound2OrderDetails(newDetails);
        setTimeout(()=>{
            let response = '';
            let audioFile = '';
            // Handle questions about availability
            if (isQuestion && !newOrder.type) {
                if (input.includes('almond') || input.includes('oat') || input.includes('whole') || input.includes('nonfat') || input.includes('soy')) {
                    response = "Yes, we do! Would you like to order something with that?";
                    setRound2Chat((prev)=>[
                            ...prev,
                            {
                                role: 'npc',
                                text: response
                            }
                        ]);
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
            setRound2Chat((prev)=>[
                    ...prev,
                    {
                        role: 'npc',
                        text: response
                    }
                ]);
            if (audioFile) playAudio(audioFile);
        }, 500);
    };
    const startRound3 = ()=>{
        setRound(3);
        setGameState('playing');
        setShowDialogue(true);
        setRound3Order({
            type: false,
            size: false,
            milk: false,
            temp: false,
            syrup: false
        });
        setRound3OrderDetails({});
        setRound3Score(500);
        setRound3ConfirmStep(false);
        setRound3CurrentQuestion('');
        setRound3Transcript('');
        setRound3Feedback([]);
        playAudio('/Audio/kokorobot-ready.mp3');
    };
    const [round3Order, setRound3Order] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: false,
        size: false,
        milk: false,
        temp: false,
        syrup: false
    });
    const [round3OrderDetails, setRound3OrderDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [round3Score, setRound3Score] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(500);
    const [round3ConfirmStep, setRound3ConfirmStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [round3CurrentQuestion, setRound3CurrentQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const startListening = ()=>{
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Speech recognition not supported. Try Chrome.');
            return;
        }
        // Pause music while speaking
        if (audioRef) {
            audioRef.pause();
        }
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        setRound3Listening(true);
        setRound3Transcript('');
        setRound3Feedback([]);
        setRound3CurrentQuestion('');
        let speechTimeout;
        recognition.onresult = (event)=>{
            clearTimeout(speechTimeout);
            const transcript = Array.from(event.results).map((result)=>result[0].transcript).join(' ');
            setRound3Transcript(transcript);
            speechTimeout = setTimeout(()=>{
                recognition.stop();
                evaluateRound3(transcript);
            }, 1500);
        };
        recognition.onerror = ()=>{
            setRound3Listening(false);
            if (audioRef && musicPlaying) {
                audioRef.play().catch(()=>{});
            }
        };
        recognition.onend = ()=>{
            setRound3Listening(false);
            if (audioRef && musicPlaying) {
                audioRef.play().catch(()=>{});
            }
        };
        recognition.start();
        setTimeout(()=>{
            if (round3Listening) {
                recognition.stop();
            }
        }, 8000);
    };
    const evaluateRound3 = (transcript)=>{
        const input = transcript.toLowerCase();
        const newOrder = {
            ...round3Order
        };
        const newDetails = {
            ...round3OrderDetails
        };
        let score = round3Score;
        // Detect drink type
        if (!newOrder.type) {
            if (input.includes('americano')) {
                newOrder.type = true;
                newDetails.type = 'Americano';
            } else if (input.includes('flat white')) {
                newOrder.type = true;
                newDetails.type = 'Flat White';
            } else if (input.includes('latte')) {
                newOrder.type = true;
                newDetails.type = 'Latte';
            } else if (input.includes('cappuccino')) {
                newOrder.type = true;
                newDetails.type = 'Cappuccino';
            } else if (input.includes('macchiato') || input.includes('machiato')) {
                newOrder.type = true;
                newDetails.type = 'Macchiato';
            } else if (input.includes('mocha')) {
                newOrder.type = true;
                newDetails.type = 'Mocha';
            } else if (input.includes('espresso')) {
                newOrder.type = true;
                newDetails.type = 'Espresso';
            }
        }
        // Detect size
        if (!newOrder.size) {
            if (input.includes('small')) {
                newOrder.size = true;
                newDetails.size = 'small';
            } else if (input.includes('medium')) {
                newOrder.size = true;
                newDetails.size = 'medium';
            } else if (input.includes('large')) {
                newOrder.size = true;
                newDetails.size = 'large';
            }
        }
        // Detect temperature
        if (!newOrder.temp) {
            if (input.includes('iced') || input.includes('ice') || input.includes('cold')) {
                newOrder.temp = true;
                newDetails.temp = 'iced';
            } else if (input.includes('hot')) {
                newOrder.temp = true;
                newDetails.temp = 'hot';
            }
        }
        // Detect syrup/flavor
        if (!newOrder.syrup) {
            if (input.includes('caramel')) {
                newOrder.syrup = true;
                newDetails.syrup = 'caramel';
            } else if (input.includes('vanilla')) {
                newOrder.syrup = true;
                newDetails.syrup = 'vanilla';
            } else if (input.includes('hazelnut')) {
                newOrder.syrup = true;
                newDetails.syrup = 'hazelnut';
            } else if (input.includes('no syrup') || input.includes('no flavor') || input.includes('plain')) {
                newOrder.syrup = true;
                newDetails.syrup = 'none';
            } else if (newOrder.type && !input.includes('caramel') && !input.includes('vanilla') && !input.includes('hazelnut')) {
                newOrder.syrup = true;
                newDetails.syrup = 'none';
            }
        }
        // Americano and Espresso don't need milk
        const noMilkDrinks = [
            'Americano',
            'Espresso'
        ];
        if (noMilkDrinks.includes(newDetails.type || '')) {
            newOrder.milk = true;
            newDetails.milk = 'none';
        }
        // Detect milk - for drinks that require milk, "no" alone doesn't work
        const milkRequiredDrinks = [
            'Latte',
            'Cappuccino',
            'Macchiato',
            'Mocha'
        ];
        if (!newOrder.milk) {
            // Check for actual milk choices
            if (input.includes('oat')) {
                newOrder.milk = true;
                newDetails.milk = 'oat milk';
            } else if (input.includes('almond')) {
                newOrder.milk = true;
                newDetails.milk = 'almond milk';
            } else if (input.includes('whole')) {
                newOrder.milk = true;
                newDetails.milk = 'whole milk';
            } else if (input.includes('skim')) {
                newOrder.milk = true;
                newDetails.milk = 'skim milk';
            } else if (input.includes('nonfat') || input.includes('non-fat') || input.includes('non fat')) {
                newOrder.milk = true;
                newDetails.milk = 'nonfat milk';
            } else if (input.includes('soy')) {
                newOrder.milk = true;
                newDetails.milk = 'soy milk';
            } else if (input.includes('regular') || input.includes('normal') || input.includes('default')) {
                newOrder.milk = true;
                newDetails.milk = 'whole milk';
            } else if ((input.includes('no milk') || input.includes('black') || input.includes('no thank')) && !milkRequiredDrinks.includes(newDetails.type || '')) {
                newOrder.milk = true;
                newDetails.milk = 'none';
            }
        }
        setRound3Order(newOrder);
        setRound3OrderDetails(newDetails);
        setRound3Attempts((prev)=>prev + 1);
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
            setRound3Feedback([
                question
            ]);
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
    const acceptRound3Score = ()=>{
        // Stop background music completely
        stopBackgroundMusic();
        // Play celebration sound and go straight to investor
        playAudio('/Audio/goodresult.mp3', ()=>{
            setCoins((prev)=>prev + 500);
            triggerCoinAnimation(round);
            setInvestorMessage("🎉 You're a natural!");
            setGameState('investor');
        });
    };
    const completeGame = ()=>{
        if (round < 5) {
            // Move to next round
            const nextRound = round + 1;
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
                setTimeout(()=>{
                    playRoundOrder(nextRound);
                    startBackgroundMusic(nextRound);
                }, 500);
            } else if (nextRound === 4) {
                // Round 4: Typing - go directly to playing
                setGameState('playing');
                setShowDialogue(true);
                setShowFullBody(false);
                setRound2Chat([]);
                setRound2Order({
                    type: false,
                    size: false,
                    milk: false,
                    syrup: false,
                    temp: false
                });
                setRound2OrderDetails({});
                setRound2ConfirmStep(false);
                const greeting = "Hi there! What can I get started for you today?";
                setRound2Chat([
                    {
                        role: 'npc',
                        text: greeting
                    }
                ]);
                playAudio('/Audio/kokorobot-greeting.mp3');
                startBackgroundMusic();
            } else if (nextRound === 5) {
                // Round 5: Speaking - go directly to playing
                setGameState('playing');
                setShowDialogue(true);
                setShowFullBody(false);
                setRound3Order({
                    type: false,
                    size: false,
                    milk: false,
                    temp: false,
                    syrup: false
                });
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
            setRound2Order({
                type: false,
                size: false,
                milk: false,
                syrup: false,
                temp: false
            });
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
    const KokoroCoin = ({ className = "", size = 24 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: "/kokoro-star.png",
            alt: "coin",
            width: size,
            height: size,
            className: `inline-block ${className}`,
            style: {
                width: size,
                height: size,
                filter: 'drop-shadow(0 2px 4px rgba(255,215,0,0.5))'
            }
        }, void 0, false, {
            fileName: "[project]/app/test/convoset/page.tsx",
            lineNumber: 1057,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-1be5a3ae20e8fc70" + " " + "min-h-screen bg-black text-white overflow-hidden relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    backgroundImage: `url('/m31.jpg')`
                },
                className: "jsx-1be5a3ae20e8fc70" + " " + "absolute inset-0 bg-cover bg-center"
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1074,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-1be5a3ae20e8fc70" + " " + "absolute inset-0 bg-black/20"
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1080,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-1be5a3ae20e8fc70" + " " + "absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-950/90 via-amber-900/40 to-transparent"
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1083,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-1be5a3ae20e8fc70" + " " + "absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-900 to-transparent"
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1086,
                columnNumber: 7
            }, this),
            showCoinAnimation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-1be5a3ae20e8fc70" + " " + "fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center",
                children: animatedCoins.map((coin)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            '--jx': `${coin.x}px`,
                            '--jy': `${coin.y}px`,
                            '--s': coin.scale,
                            animationDelay: `${coin.delay}s`
                        },
                        className: "jsx-1be5a3ae20e8fc70" + " " + "absolute animate-fountain-jet",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                    size: 36,
                                    className: "drop-shadow-[0_0_15px_rgba(255,215,0,0.9)]"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1103,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "absolute inset-0 w-9 h-9 bg-yellow-400/40 rounded-full blur-md -z-10"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1104,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1102,
                            columnNumber: 15
                        }, this)
                    }, coin.id, false, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1092,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1090,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-1be5a3ae20e8fc70" + " " + "absolute top-4 left-4 right-4 flex justify-between items-center z-30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-1be5a3ae20e8fc70" + " " + "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-1be5a3ae20e8fc70" + " " + "bg-black/60 backdrop-blur-sm rounded-full px-5 py-2 border border-amber-500/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-amber-400 font-mono",
                                    children: "M31 Coffee Outpost"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1115,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1114,
                                columnNumber: 11
                            }, this),
                            musicStarted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleMusic,
                                className: "jsx-1be5a3ae20e8fc70" + " " + "bg-black/60 backdrop-blur-sm rounded-full px-3 py-2 border border-amber-500/30 hover:bg-black/80 transition",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-amber-400 text-lg",
                                    children: musicPlaying ? '🔊' : '🔇'
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1122,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1118,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-1be5a3ae20e8fc70" + " " + "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-1be5a3ae20e8fc70" + " " + "bg-black/60 backdrop-blur-sm rounded-full px-5 py-2 border border-yellow-500/30 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                        size: 24,
                                        className: "jsx-1be5a3ae20e8fc70"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1128,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-1be5a3ae20e8fc70" + " " + "text-yellow-400 font-mono font-semibold text-lg",
                                        children: coins
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1129,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-1be5a3ae20e8fc70" + " " + "bg-black/60 backdrop-blur-sm rounded-full px-5 py-2 border border-purple-500/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-purple-400 font-mono",
                                    children: [
                                        "Round ",
                                        round,
                                        "/5"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1132,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1131,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1126,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1112,
                columnNumber: 7
            }, this),
            showFullBody && (gameState === 'intro' || gameState === 'walking') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    left: `${kokoroX}px`,
                    transform: `scale(${kokoroScale})`,
                    opacity: kokoroOpacity
                },
                className: "jsx-1be5a3ae20e8fc70" + " " + "absolute bottom-16 z-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: isWalking ? "/kokorobot-sideview.png" : "/kokorobot-cb.png",
                        alt: "Kokorobot",
                        style: {
                            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))'
                        },
                        className: "jsx-1be5a3ae20e8fc70" + " " + `h-72 w-auto drop-shadow-2xl ${isWalking ? 'animate-walk' : ''}`
                    }, void 0, false, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1147,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-1be5a3ae20e8fc70" + " " + "absolute -bottom-2 left-1/2 -translate-x-1/2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-xs text-amber-400 font-mono bg-black/70 px-3 py-1 rounded-full border border-amber-500/30",
                            children: "Kokorobot-1"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1156,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1155,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1139,
                columnNumber: 9
            }, this),
            gameState === 'intro' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-1be5a3ae20e8fc70" + " " + `absolute inset-0 flex items-center justify-center z-10 transition-all duration-700 ${missionVisible ? 'opacity-100' : 'opacity-0'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-center max-w-2xl px-12 py-10 bg-black/70 rounded-3xl shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-purple-400 font-medium mb-2 text-lg",
                            children: [
                                "Round ",
                                round,
                                " of 5"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1167,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-5xl md:text-6xl font-semibold mb-6 text-yellow-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]",
                            children: "M31 Coffee Outpost"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1168,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-white mb-3 text-lg md:text-xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-normal",
                            children: "Kokorobot-1 dreams of becoming a barista someday."
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1171,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-amber-100 mb-3 text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-normal",
                            children: round <= 3 && currentRoundConfig ? `Listen carefully. Can you take ${currentRoundConfig.itemCount === 1 ? 'this order' : `these ${currentRoundConfig.itemCount} orders`}?` : round === 4 ? "Type your order to the barista!" : "Speak your order out loud!"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1174,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-yellow-400 font-medium mb-8 text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]",
                            children: "Earn coins to build Andromeda's first café!"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1182,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: startGame,
                            disabled: !introReady,
                            className: "jsx-1be5a3ae20e8fc70" + " " + "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-semibold py-4 px-14 rounded-full text-xl transition transform hover:scale-105 shadow-lg shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed",
                            children: "Begin Mission"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1185,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 1166,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1165,
                columnNumber: 9
            }, this),
            gameState === 'walking' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-1be5a3ae20e8fc70" + " " + "absolute inset-0 flex items-center justify-center z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-amber-400 text-2xl animate-pulse font-medium",
                    children: "Starting mission..."
                }, void 0, false, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 1199,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1198,
                columnNumber: 9
            }, this),
            gameState === 'playing' && showDialogue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-1be5a3ae20e8fc70" + " " + "absolute inset-0 flex items-center justify-center z-20 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-1be5a3ae20e8fc70" + " " + "w-full max-w-xl animate-fade-in",
                    children: [
                        (round === 1 || round === 2 || round === 3) && currentRoundConfig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-6 shadow-2xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "flex items-center gap-4 mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/kokorobot-closeup.png",
                                            alt: "Kokorobot",
                                            className: "jsx-1be5a3ae20e8fc70" + " " + `w-28 h-28 object-cover rounded-full border-3 border-amber-500/60 shadow-lg animate-pop-in ${isNpcSpeaking ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-black animate-pulse' : ''}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1212,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-amber-400 text-xl mb-2 font-mono font-semibold",
                                                    children: "Kokorobot-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1218,
                                                    columnNumber: 21
                                                }, this),
                                                showTranscript ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-xl leading-relaxed text-white",
                                                    children: currentRoundConfig.npcOrder
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1221,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "bg-amber-900/40 rounded-xl p-4 text-center border border-amber-500/30",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-amber-300/80 mb-3 text-lg",
                                                            children: "🎧 Listen to the order..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1224,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: buyTranscript,
                                                            disabled: coins < 10,
                                                            className: "jsx-1be5a3ae20e8fc70" + " " + `text-base px-6 py-2 rounded-full transition font-semibold flex items-center gap-2 mx-auto ${coins >= 10 ? 'bg-black/80 text-yellow-400 hover:bg-black/90 border border-yellow-500/60' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`,
                                                            children: [
                                                                "💡 Show Text for ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                                                    size: 16,
                                                                    className: "jsx-1be5a3ae20e8fc70"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                                    lineNumber: 1234,
                                                                    columnNumber: 44
                                                                }, this),
                                                                " 10"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1225,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1223,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: replayVoice,
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "mt-3 text-base text-amber-400/80 hover:text-amber-400 transition flex items-center gap-2 font-medium",
                                                    children: "🔊 Replay voice (free)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1239,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1217,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1211,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "border-t border-amber-500/30 pt-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-lg text-amber-300/80 mb-4 font-medium",
                                            children: [
                                                "Build the order (",
                                                round1Selections.length,
                                                "/3 items)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1250,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex flex-wrap gap-2 mb-5 min-h-[48px]",
                                            children: round1Selections.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>removeFromOrder(i),
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "bg-amber-500/30 border border-amber-500/60 rounded-lg px-4 py-2 text-lg hover:bg-red-500/30 hover:border-red-500/60 transition text-amber-200 font-medium",
                                                    children: [
                                                        item.size,
                                                        " ",
                                                        item.type,
                                                        " ",
                                                        item.milk && `(${item.milk})`,
                                                        " ",
                                                        item.syrup && `+ ${item.syrup}`,
                                                        " ✕"
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1254,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1252,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "grid grid-cols-4 gap-3 mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-1be5a3ae20e8fc70",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-sm text-amber-400/60 mb-2 font-semibold",
                                                            children: "TYPE"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1266,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex flex-col gap-2",
                                                            children: [
                                                                'Americano',
                                                                'Latte',
                                                                'Cappuccino',
                                                                'Flat White',
                                                                'Macchiato',
                                                                'Mocha',
                                                                'Espresso'
                                                            ].map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setCurrentItem({
                                                                            ...currentItem,
                                                                            type
                                                                        }),
                                                                    className: "jsx-1be5a3ae20e8fc70" + " " + `py-2 px-3 rounded-lg text-sm transition font-medium ${currentItem.type === type ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`,
                                                                    children: type
                                                                }, type, false, {
                                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                                    lineNumber: 1269,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1267,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1265,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-1be5a3ae20e8fc70",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-sm text-amber-400/60 mb-2 font-semibold",
                                                            children: "SIZE"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1280,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex flex-col gap-2",
                                                            children: [
                                                                'Small',
                                                                'Medium',
                                                                'Large'
                                                            ].map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setCurrentItem({
                                                                            ...currentItem,
                                                                            size
                                                                        }),
                                                                    className: "jsx-1be5a3ae20e8fc70" + " " + `py-2 px-3 rounded-lg text-sm transition font-medium ${currentItem.size === size ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`,
                                                                    children: size
                                                                }, size, false, {
                                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                                    lineNumber: 1283,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1281,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1279,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-1be5a3ae20e8fc70",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-sm text-amber-400/60 mb-2 font-semibold",
                                                            children: "MILK"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1294,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex flex-col gap-2",
                                                            children: [
                                                                'None',
                                                                'Whole',
                                                                'Oat',
                                                                'Almond',
                                                                'Nonfat'
                                                            ].map((milk)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setCurrentItem({
                                                                            ...currentItem,
                                                                            milk: milk === 'None' ? undefined : milk
                                                                        }),
                                                                    className: "jsx-1be5a3ae20e8fc70" + " " + `py-2 px-3 rounded-lg text-sm transition font-medium ${currentItem.milk === milk || !currentItem.milk && milk === 'None' ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`,
                                                                    children: milk
                                                                }, milk, false, {
                                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                                    lineNumber: 1297,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1295,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1293,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-1be5a3ae20e8fc70",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-sm text-amber-400/60 mb-2 font-semibold",
                                                            children: "SYRUP"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1308,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex flex-col gap-2",
                                                            children: [
                                                                'None',
                                                                'Caramel',
                                                                'Vanilla',
                                                                'Hazelnut'
                                                            ].map((syrup)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setCurrentItem({
                                                                            ...currentItem,
                                                                            syrup: syrup === 'None' ? undefined : syrup
                                                                        }),
                                                                    className: "jsx-1be5a3ae20e8fc70" + " " + `py-2 px-3 rounded-lg text-sm transition font-medium ${currentItem.syrup === syrup || !currentItem.syrup && syrup === 'None' ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`,
                                                                    children: syrup
                                                                }, syrup, false, {
                                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                                    lineNumber: 1311,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1309,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1307,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1264,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: addToOrder,
                                                    disabled: !currentItem.type || !currentItem.size || round1Selections.length >= currentRoundConfig.itemCount,
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "flex-1 py-4 rounded-xl font-semibold text-xl transition bg-amber-900/60 hover:bg-amber-900/80 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed",
                                                    children: "+ Add Item"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1324,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: checkRound1,
                                                    disabled: round1Selections.length !== currentRoundConfig.itemCount,
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "flex-1 py-4 rounded-xl font-semibold text-xl transition bg-amber-500 hover:bg-amber-400 text-black disabled:opacity-30 disabled:cursor-not-allowed",
                                                    children: "Submit ✓"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1331,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1323,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1249,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1210,
                            columnNumber: 15
                        }, this),
                        round === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-8 shadow-2xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "flex items-center gap-4 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/kokorobot-closeup.png",
                                            alt: "Kokorobot",
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "w-20 h-20 rounded-full object-cover border-2 border-amber-500/50"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1347,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-amber-400 font-mono font-semibold text-xl",
                                                    children: "Kokorobot-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1349,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-lg text-purple-400",
                                                    children: "Your turn! Order one drink by typing."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1350,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1348,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1346,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "h-64 overflow-y-auto mb-4 space-y-3 bg-black/30 rounded-xl p-4",
                                    children: round2Chat.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + `flex ${msg.role === 'player' ? 'justify-end' : 'justify-start'}`,
                                            children: [
                                                msg.role === 'npc' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: "/kokorobot-closeup.png",
                                                    alt: "Kokorobot",
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "w-12 h-12 rounded-full mr-2 object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1358,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + `inline-block rounded-xl px-5 py-3 max-w-[80%] text-lg ${msg.role === 'player' ? 'bg-purple-500 text-white' : 'bg-amber-900/60 text-amber-200'}`,
                                                    children: msg.text
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1360,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1356,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1354,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "flex gap-3 mb-4",
                                    children: [
                                        {
                                            key: 'type',
                                            label: '☕ Type'
                                        },
                                        {
                                            key: 'size',
                                            label: '📏 Size'
                                        },
                                        {
                                            key: 'temp',
                                            label: '🧊 Temp'
                                        },
                                        {
                                            key: 'milk',
                                            label: '🥛 Milk'
                                        }
                                    ].map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + `px-4 py-2 rounded-full text-base font-medium ${round2Order[key] ? 'bg-green-500/30 text-green-400 border border-green-500/50' : 'bg-amber-900/50 text-amber-400/60'}`,
                                            children: [
                                                label,
                                                " ",
                                                round2Order[key] && '✓'
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1371,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1369,
                                    columnNumber: 17
                                }, this),
                                round2ConfirmStep ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setRound2ConfirmStep(false);
                                                setRound2Order({
                                                    type: false,
                                                    size: false,
                                                    milk: false,
                                                    syrup: false,
                                                    temp: false
                                                });
                                                setRound2OrderDetails({});
                                                const response = "No problem! What would you like instead?";
                                                setRound2Chat((prev)=>[
                                                        ...prev,
                                                        {
                                                            role: 'npc',
                                                            text: response
                                                        }
                                                    ]);
                                                playAudio('/Audio/kokorobot-greeting.mp3');
                                            },
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex-1 bg-amber-900/60 hover:bg-amber-900/80 text-amber-200 font-semibold py-4 rounded-xl text-xl border border-amber-500/40",
                                            children: "✏️ Modify"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1380,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                const response = "Thank you, it will be at the pick up counter.";
                                                setRound2Chat((prev)=>[
                                                        ...prev,
                                                        {
                                                            role: 'npc',
                                                            text: response
                                                        }
                                                    ]);
                                                // Stop background music
                                                if (audioRef) {
                                                    audioRef.pause();
                                                    setMusicPlaying(false);
                                                }
                                                playAudio('/Audio/goodresult.mp3', ()=>{
                                                    setCoins((prev)=>prev + 80);
                                                    triggerCoinAnimation(round);
                                                    setInvestorMessage("Impressive!");
                                                    setGameState('investor');
                                                });
                                            },
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex-1 bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-xl text-xl",
                                            children: "✓ Confirm Order"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1393,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1379,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: round2Input,
                                            onChange: (e)=>setRound2Input(e.target.value),
                                            onKeyDown: (e)=>e.key === 'Enter' && processRound2Input(),
                                            placeholder: "Type your order...",
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex-1 bg-amber-900/40 border border-amber-500/40 rounded-xl px-5 py-4 text-xl focus:outline-none focus:border-amber-500 text-white placeholder-amber-400/50"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1416,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: processRound2Input,
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "bg-purple-500 hover:bg-purple-400 text-white font-semibold px-10 rounded-xl text-xl",
                                            children: "Send"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1424,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1415,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1345,
                            columnNumber: 15
                        }, this),
                        round === 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-8 shadow-2xl text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/kokorobot-closeup.png",
                                    alt: "Kokorobot",
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "w-24 h-24 rounded-full object-cover border-2 border-amber-500/50 mx-auto mb-4"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1435,
                                    columnNumber: 17
                                }, this),
                                !round3ConfirmStep ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-xl text-green-400 mb-6 font-medium",
                                            children: "Speak your order!"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1439,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: startListening,
                                            disabled: round3Listening,
                                            className: "jsx-1be5a3ae20e8fc70" + " " + `w-40 h-40 rounded-full font-semibold text-4xl transition mx-auto mb-6 shadow-lg ${round3Listening ? 'bg-red-500 animate-pulse shadow-red-500/50' : 'bg-gradient-to-r from-green-500 to-amber-500 hover:from-green-400 hover:to-amber-400 shadow-green-500/30'}`,
                                            children: round3Listening ? '🎤' : '🎤 Speak'
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1441,
                                            columnNumber: 21
                                        }, this),
                                        round3Transcript && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "bg-amber-900/40 rounded-xl p-5 mb-5 text-left border border-amber-500/30",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-base text-amber-400/80 mb-1",
                                                    children: "You said:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1453,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-2xl text-white",
                                                    children: [
                                                        '"',
                                                        round3Transcript,
                                                        '"'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1454,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1452,
                                            columnNumber: 23
                                        }, this),
                                        round3CurrentQuestion && !round3ConfirmStep && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "bg-amber-900/40 rounded-xl p-5 text-left border border-amber-500/30",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-yellow-400 text-xl mb-4",
                                                    children: [
                                                        "🎤 ",
                                                        round3CurrentQuestion
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1460,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-amber-400/60 text-base mb-4",
                                                    children: "Tap the mic to answer"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1461,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1459,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-1be5a3ae20e8fc70" + " " + "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-1be5a3ae20e8fc70" + " " + "bg-green-900/30 rounded-xl p-6 mb-6 border border-green-500/50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-2xl text-white",
                                                    children: round3CurrentQuestion
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1470,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1469,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-1be5a3ae20e8fc70" + " " + "flex gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setRound3ConfirmStep(false);
                                                            setRound3Order({
                                                                type: false,
                                                                size: false,
                                                                milk: false,
                                                                temp: false,
                                                                syrup: false
                                                            });
                                                            setRound3OrderDetails({});
                                                            setRound3Transcript('');
                                                            setRound3CurrentQuestion('');
                                                        },
                                                        className: "jsx-1be5a3ae20e8fc70" + " " + "flex-1 bg-amber-900/60 hover:bg-amber-900/80 text-amber-200 font-semibold py-4 rounded-xl text-xl border border-amber-500/40",
                                                        children: "✏️ Modify"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1474,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: acceptRound3Score,
                                                        className: "jsx-1be5a3ae20e8fc70" + " " + "flex-1 bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-xl text-xl",
                                                        children: "✓ Confirm Order"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1486,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1473,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1468,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1434,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 1206,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1205,
                columnNumber: 9
            }, this),
            gameState === 'investor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-1be5a3ae20e8fc70" + " " + "fixed inset-0 z-40",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: round === 1 ? "/ib.png" : `/NY-investor${round}.png`,
                        alt: "Earth Investor calling from spaceship",
                        className: "jsx-1be5a3ae20e8fc70" + " " + "absolute inset-0 w-full h-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1506,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-1be5a3ae20e8fc70" + " " + "absolute top-4 left-4 right-4 flex justify-between items-center z-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-1be5a3ae20e8fc70" + " " + "bg-black rounded-full px-5 py-2 border border-amber-500/50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-amber-400 font-mono",
                                    children: "M31 Coffee Outpost"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1515,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1514,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-1be5a3ae20e8fc70" + " " + "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-1be5a3ae20e8fc70" + " " + "bg-black rounded-full px-5 py-2 border border-yellow-500/50 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                                size: 24,
                                                className: "jsx-1be5a3ae20e8fc70"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1519,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-1be5a3ae20e8fc70" + " " + "text-yellow-400 font-mono font-semibold text-lg",
                                                children: coins
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1520,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1518,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-1be5a3ae20e8fc70" + " " + "bg-black rounded-full px-5 py-2 border border-purple-500/50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-purple-400 font-mono",
                                            children: [
                                                "Round ",
                                                round,
                                                "/5"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1523,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1522,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1517,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1513,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-1be5a3ae20e8fc70" + " " + "absolute top-20 left-6 flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full z-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-1be5a3ae20e8fc70" + " " + "w-3 h-3 bg-green-500 rounded-full animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1530,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-1be5a3ae20e8fc70" + " " + "text-green-400 text-xl font-mono font-semibold",
                                children: "LIVE"
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1531,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1529,
                        columnNumber: 11
                    }, this),
                    showCoinAnimation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-1be5a3ae20e8fc70" + " " + "fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center",
                        children: animatedCoins.map((coin)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    '--jx': `${coin.x}px`,
                                    '--jy': `${coin.y}px`,
                                    '--s': coin.scale,
                                    animationDelay: `${coin.delay}s`
                                },
                                className: "jsx-1be5a3ae20e8fc70" + " " + "absolute animate-fountain-jet",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                            size: 32,
                                            className: "drop-shadow-[0_0_15px_rgba(255,215,0,0.9)]"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1550,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "absolute inset-0 w-8 h-8 bg-yellow-400/40 rounded-full blur-md -z-10"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1552,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1548,
                                    columnNumber: 19
                                }, this)
                            }, coin.id, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1538,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1536,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-1be5a3ae20e8fc70" + " " + "absolute top-1/2 left-1/2 z-50 animate-fly-to-balance",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex items-center gap-2 bg-black/70 px-4 py-2 rounded-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                    size: 32,
                                    className: "jsx-1be5a3ae20e8fc70"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1562,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-yellow-400 font-semibold text-2xl",
                                    children: [
                                        "+",
                                        round === 1 ? 20 : round === 2 ? 30 : round === 3 ? 50 : round === 4 ? 80 : 100
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1563,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1561,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1560,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-1be5a3ae20e8fc70" + " " + `absolute z-50 text-center ${round === 5 ? 'top-[42%] left-1/2 -translate-x-1/2' /* Round 5: centered on the table */  : round === 4 ? 'top-[42%] left-1/2 -translate-x-1/2' /* Round 4: bring message down closer to CTAs */  : round === 3 ? 'top-[30%] left-1/2 -translate-x-1/2' : 'top-[45%] left-1/2 -translate-x-1/2'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-1be5a3ae20e8fc70" + " " + "flex items-center gap-2 mb-2 justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                        size: 32,
                                        className: "jsx-1be5a3ae20e8fc70"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1578,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: 'system-ui, -apple-system, sans-serif'
                                        },
                                        className: "jsx-1be5a3ae20e8fc70" + " " + "text-yellow-400 text-2xl font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]",
                                        children: "from our Earth Investors"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1579,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1577,
                                columnNumber: 13
                            }, this),
                            round === 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: 'system-ui, -apple-system, sans-serif'
                                },
                                className: "jsx-1be5a3ae20e8fc70" + " " + "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-1be5a3ae20e8fc70" + " " + "text-5xl font-bold mb-2",
                                        children: "🎉 Excellent!"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1583,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-1be5a3ae20e8fc70" + " " + "text-3xl font-semibold",
                                        children: "Can she take your orders, too?"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1584,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1582,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: 'system-ui, -apple-system, sans-serif'
                                },
                                className: "jsx-1be5a3ae20e8fc70" + " " + "text-white text-4xl font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]",
                                children: [
                                    "🎉 ",
                                    investorMessage
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1587,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1568,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-1be5a3ae20e8fc70" + " " + `absolute z-50 flex gap-3 flex-col items-center left-1/2 -translate-x-1/2 ${round === 5 ? 'bottom-[18%]' : 'bottom-[25%]'}`,
                        children: [
                            (round === 3 || round === 4) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowCafeShop(true);
                                        },
                                        style: {
                                            fontFamily: 'system-ui, -apple-system, sans-serif'
                                        },
                                        className: "jsx-1be5a3ae20e8fc70" + " " + "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold py-4 px-10 rounded-full text-xl transition shadow-lg shadow-purple-500/40",
                                        children: "🏪 Build Your Café"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1600,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: completeGame,
                                        style: {
                                            fontFamily: 'system-ui, -apple-system, sans-serif'
                                        },
                                        className: "jsx-1be5a3ae20e8fc70" + " " + "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold py-4 px-14 rounded-full text-2xl transition shadow-lg shadow-yellow-500/40",
                                        children: "Next Round →"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1609,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true),
                            round === 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowCafeShop(true);
                                        },
                                        style: {
                                            fontFamily: 'system-ui, -apple-system, sans-serif'
                                        },
                                        className: "jsx-1be5a3ae20e8fc70" + " " + "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold py-4 px-10 rounded-full text-xl transition shadow-lg shadow-purple-500/40",
                                        children: "🏪 Build Your Café"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1621,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            alert('🎯 New conversation sets coming soon! Stay tuned for more scenarios to practice.');
                                        },
                                        style: {
                                            fontFamily: 'system-ui, -apple-system, sans-serif'
                                        },
                                        className: "jsx-1be5a3ae20e8fc70" + " " + "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold py-4 px-10 rounded-full text-xl transition shadow-lg shadow-yellow-500/40",
                                        children: "🎯 Try a New Set"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1630,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            // Save progress is automatic, just close/exit
                                            alert('✅ Progress saved! Your coins and cafés are stored.');
                                        },
                                        style: {
                                            fontFamily: 'system-ui, -apple-system, sans-serif'
                                        },
                                        className: "jsx-1be5a3ae20e8fc70" + " " + "text-white/80 hover:text-white underline text-lg mt-2 transition",
                                        children: "Save & Exit"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1639,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true),
                            round < 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: completeGame,
                                style: {
                                    fontFamily: 'system-ui, -apple-system, sans-serif'
                                },
                                className: "jsx-1be5a3ae20e8fc70" + " " + "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-semibold py-4 px-14 rounded-full text-2xl transition shadow-lg shadow-yellow-500/40",
                                children: "Next Round →"
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1653,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1592,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1504,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "1be5a3ae20e8fc70",
                children: "@keyframes fountain-jet{0%{opacity:0;transform:translateX(var(--jx))translateY(0)scale(.3)}15%{opacity:1;transform:translateX(var(--jx))translateY(var(--jy))scale(var(--s))}35%{opacity:1;transform:translateX(var(--jx))translateY(calc(var(--jy)*.7))scale(var(--s))rotate(90deg)}55%{opacity:1;transform:translateX(var(--jx))translateY(calc(var(--jy)*.4))scale(var(--s))rotate(180deg)}75%{opacity:.8;transform:translateX(calc(var(--jx)*.5 + 35vw))translateY(calc(var(--jy)*.2 - 40vh))scale(calc(var(--s)*.6))rotate(270deg)}to{opacity:0;transform:translate(45vw)translateY(-45vh)scale(.15)}}.animate-fountain-jet.jsx-1be5a3ae20e8fc70{animation:2.8s ease-out forwards fountain-jet}@keyframes walk{0%{transform:translateY(0)rotate(0)}25%{transform:translateY(-6px)rotate(-2deg)}50%{transform:translateY(0)rotate(0)}75%{transform:translateY(-6px)rotate(2deg)}to{transform:translateY(0)rotate(0)}}.animate-walk.jsx-1be5a3ae20e8fc70{animation:.5s ease-in-out infinite walk}@keyframes fade-in{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.animate-fade-in.jsx-1be5a3ae20e8fc70{animation:.5s ease-out fade-in}@keyframes pop-in{0%{opacity:0;transform:scale(0)}70%{transform:scale(1.1)}to{opacity:1;transform:scale(1)}}.animate-pop-in.jsx-1be5a3ae20e8fc70{animation:.4s ease-out pop-in}@keyframes fly-to-balance{0%{opacity:1;transform:translate(-50%,-50%)scale(1)}70%{opacity:1;transform:translate(calc(50vw - 250px),calc(40px - 50vh))scale(.8)}to{opacity:0;transform:translate(calc(50vw - 250px),calc(40px - 50vh))scale(.5)}}.animate-fly-to-balance.jsx-1be5a3ae20e8fc70{animation:1.5s ease-in-out forwards fly-to-balance}"
            }, void 0, false, void 0, this),
            showMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setShowMenu(false),
                className: "jsx-1be5a3ae20e8fc70" + " " + "fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
                        boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5)'
                    },
                    className: "jsx-1be5a3ae20e8fc70" + " " + "bg-zinc-900 rounded-xl p-8 max-w-2xl w-full border-4 border-zinc-700 shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontFamily: 'Georgia, serif',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                            },
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-4xl font-bold text-center mb-8 text-white",
                            children: "☕ Our Menu"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1751,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "grid grid-cols-1 gap-4",
                            children: menuItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "flex justify-between items-center border-b border-zinc-700/50 pb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: 'Georgia, serif'
                                                    },
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-2xl text-white font-medium",
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1758,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-zinc-400 text-sm italic",
                                                    children: item.desc
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1759,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1757,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-zinc-500 text-xl",
                                            children: "•••"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1761,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1756,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1754,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowMenu(false),
                            className: "jsx-1be5a3ae20e8fc70" + " " + "mt-8 w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg text-lg",
                            children: "Got it!"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1765,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 1743,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1742,
                columnNumber: 9
            }, this),
            showCafeShop && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-1be5a3ae20e8fc70" + " " + "fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-1be5a3ae20e8fc70" + " " + "bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-6 max-w-4xl w-full border border-amber-500/30",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex justify-between items-center mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontFamily: 'system-ui, -apple-system, sans-serif'
                                    },
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-3xl font-bold text-amber-400",
                                    children: "🏪 Choose Your Café"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1780,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                            size: 28,
                                            className: "jsx-1be5a3ae20e8fc70"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1782,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-yellow-400 font-bold text-xl",
                                            children: coins
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1783,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1781,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1779,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6",
                            children: cafeOptions.map((cafe)=>{
                                const owned = purchasedCafes.includes(cafe.id);
                                const canAfford = coins >= cafe.price;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>{
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
                                    },
                                    className: "jsx-1be5a3ae20e8fc70" + " " + `relative rounded-xl overflow-hidden border-2 transition-all ${owned ? 'border-green-500 cursor-pointer hover:scale-105' : canAfford ? 'border-amber-500 hover:border-amber-400 cursor-pointer hover:scale-105' : 'border-zinc-600 opacity-50'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: cafe.image,
                                                    alt: cafe.name,
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "w-full h-32 object-cover bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1812,
                                                    columnNumber: 23
                                                }, this),
                                                owned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full",
                                                    children: "✓ OWNED"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1814,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1811,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "p-3 bg-black/80",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: 'system-ui, -apple-system, sans-serif'
                                                    },
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-white font-medium text-sm",
                                                    children: cafe.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1820,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "flex items-center gap-1 mt-1",
                                                    children: owned ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-1be5a3ae20e8fc70" + " " + "text-green-400 text-sm",
                                                        children: "Tap to view options"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1823,
                                                        columnNumber: 27
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1826,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-1be5a3ae20e8fc70" + " " + `font-bold ${canAfford ? 'text-yellow-400' : 'text-red-400'}`,
                                                                children: cafe.price
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1827,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1821,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1819,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, cafe.id, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1792,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1787,
                            columnNumber: 13
                        }, this),
                        round === 5 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "flex gap-3 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                alert('🎯 New conversation sets coming soon! Stay tuned for more scenarios to practice.');
                                            },
                                            style: {
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            },
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-lg border border-zinc-600",
                                            children: "🎯 Try a New Set"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1842,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                alert('🏪 More outposts coming soon! Restaurant, Department Store, and more.');
                                            },
                                            style: {
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            },
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-lg border border-zinc-600",
                                            children: "🏬 Choose New Outpost"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1851,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1841,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        alert('🗺️ M31 Map coming soon! Your cafés are saved in inventory.');
                                    },
                                    style: {
                                        fontFamily: 'system-ui, -apple-system, sans-serif'
                                    },
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-lg border border-zinc-600 mb-4",
                                    children: "🗺️ Go to M31 Map"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1862,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "flex justify-center gap-6 pt-2 border-t border-zinc-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowCoinShop(true),
                                            style: {
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            },
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-amber-400 hover:text-amber-300 text-sm font-medium transition",
                                            children: "💰 Buy Coins"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1874,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                alert('📦 Inventory view coming soon!');
                                            },
                                            style: {
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            },
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-amber-400 hover:text-amber-300 text-sm font-medium transition",
                                            children: "📦 Check Inventory"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1881,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setShowCafeShop(false);
                                            },
                                            style: {
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            },
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-amber-400 hover:text-amber-300 text-sm font-medium transition",
                                            children: "💾 Save & Exit"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1890,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1873,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-1be5a3ae20e8fc70" + " " + "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowCoinShop(true),
                                        style: {
                                            fontFamily: 'system-ui, -apple-system, sans-serif'
                                        },
                                        className: "jsx-1be5a3ae20e8fc70" + " " + "flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-semibold rounded-lg border border-zinc-600",
                                        children: "💰 Buy Coins"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1905,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowCafeShop(false);
                                            completeGame();
                                        },
                                        style: {
                                            fontFamily: 'system-ui, -apple-system, sans-serif'
                                        },
                                        className: "jsx-1be5a3ae20e8fc70" + " " + "flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold rounded-lg",
                                        children: "▶️ Keep Playing"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1912,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1904,
                                columnNumber: 17
                            }, this)
                        }, void 0, false)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 1778,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1777,
                columnNumber: 9
            }, this),
            showPurchaseConfirm && selectedCafe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-1be5a3ae20e8fc70" + " " + "fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-1be5a3ae20e8fc70" + " " + "bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-8 max-w-md w-full border border-amber-500/50 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-2xl font-bold text-amber-400 mb-4",
                            children: "🏪 Purchase Café?"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1933,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: selectedCafe.image,
                            alt: selectedCafe.name,
                            className: "jsx-1be5a3ae20e8fc70" + " " + "w-48 h-48 object-cover rounded-xl mx-auto mb-4 border-2 border-amber-500/30 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1934,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-white text-xl font-semibold mb-2",
                            children: selectedCafe.name
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1939,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex items-center justify-center gap-2 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-zinc-400",
                                    children: "Price:"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1941,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                    size: 24,
                                    className: "jsx-1be5a3ae20e8fc70"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1942,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-yellow-400 font-bold text-xl",
                                    children: selectedCafe.price
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1943,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1940,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex items-center justify-center gap-2 mb-6 bg-black/50 py-2 px-4 rounded-full inline-flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-zinc-400",
                                    children: "Your balance:"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1946,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                    size: 20,
                                    className: "jsx-1be5a3ae20e8fc70"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1947,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-yellow-400 font-semibold",
                                    children: coins
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1948,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1945,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowPurchaseConfirm(false);
                                        setSelectedCafe(null);
                                    },
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-lg",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1951,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        // Process purchase
                                        setCoins((prev)=>prev - selectedCafe.price);
                                        setPurchasedCafes((prev)=>[
                                                ...prev,
                                                selectedCafe.id
                                            ]);
                                        setShowPurchaseConfirm(false);
                                        // Show just purchased popup
                                        setJustPurchasedCafe(selectedCafe);
                                        setShowJustPurchased(true);
                                        setSelectedCafe(null);
                                    },
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold rounded-lg",
                                    children: "✓ Buy Now"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1960,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1950,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 1932,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1931,
                columnNumber: 9
            }, this),
            showJustPurchased && justPurchasedCafe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-1be5a3ae20e8fc70" + " " + "fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-1be5a3ae20e8fc70" + " " + "bg-gradient-to-b from-green-900/80 to-zinc-900 rounded-2xl p-8 max-w-md w-full border border-green-500/50 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-6xl mb-4",
                            children: "🎉"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1984,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-3xl font-bold text-green-400 mb-4",
                            children: "Congratulations!"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1985,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: justPurchasedCafe.image,
                            alt: justPurchasedCafe.name,
                            className: "jsx-1be5a3ae20e8fc70" + " " + "w-48 h-48 object-cover rounded-xl mx-auto mb-4 border-2 border-green-500/50 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1986,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-white text-xl mb-2",
                            children: justPurchasedCafe.name
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1991,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-green-300 mb-6",
                            children: "is now in your inventory!"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1992,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-zinc-400 text-sm mb-6",
                            children: "What would you like to do?"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1993,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowJustPurchased(false);
                                        setJustPurchasedCafe(null);
                                        alert('🗺️ M31 Map coming soon! Your café is saved in inventory.');
                                    },
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold rounded-lg",
                                    children: "🗺️ Place on M31 Map"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1995,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowJustPurchased(false);
                                        setJustPurchasedCafe(null);
                                        alert('📦 Inventory view coming soon!');
                                    },
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold rounded-lg",
                                    children: "📦 Check Inventory"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2005,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowJustPurchased(false);
                                        setJustPurchasedCafe(null);
                                        alert('🎯 New conversation sets coming soon! Stay tuned for more scenarios to practice.');
                                    },
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold rounded-lg",
                                    children: "🎯 Try a New Set"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2015,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1994,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 1983,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1982,
                columnNumber: 9
            }, this),
            showOwnedPopup && ownedCafeToView && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-1be5a3ae20e8fc70" + " " + "fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-1be5a3ae20e8fc70" + " " + "bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-8 max-w-md w-full border border-green-500/50 text-center relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-2xl font-bold text-green-400 mb-4",
                            children: [
                                "🏪 ",
                                ownedCafeToView.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2034,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: ownedCafeToView.image,
                            alt: ownedCafeToView.name,
                            className: "jsx-1be5a3ae20e8fc70" + " " + "w-48 h-48 object-cover rounded-xl mx-auto mb-6 border-2 border-green-500/50 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2035,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-zinc-300 mb-6",
                            children: "This café is in your inventory. What would you like to do?"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2040,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowOwnedPopup(false);
                                        setOwnedCafeToView(null);
                                        alert('🗺️ M31 Map coming soon! Your café is saved in inventory.');
                                    },
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold rounded-lg",
                                    children: "🗺️ Place on M31 Map"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2042,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowOwnedPopup(false);
                                        setOwnedCafeToView(null);
                                        alert('📦 Inventory view coming soon!');
                                    },
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold rounded-lg",
                                    children: "📦 Check Inventory"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2052,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowOwnedPopup(false);
                                        setOwnedCafeToView(null);
                                        alert('🎯 New conversation sets coming soon! Stay tuned for more scenarios to practice.');
                                    },
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold rounded-lg",
                                    children: "🎯 Try a New Set"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2062,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowOwnedPopup(false);
                                        setOwnedCafeToView(null);
                                    },
                                    className: "jsx-1be5a3ae20e8fc70" + " " + "w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2072,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2041,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 2033,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 2032,
                columnNumber: 9
            }, this),
            showCoinShop && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setShowCoinShop(false),
                className: "jsx-1be5a3ae20e8fc70" + " " + "fixed inset-0 bg-black/90 z-[80] flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    className: "jsx-1be5a3ae20e8fc70" + " " + "bg-gradient-to-b from-purple-900 to-zinc-900 rounded-2xl p-6 max-w-md w-full border border-purple-500/50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-3xl font-bold text-center text-purple-300 mb-6",
                            children: "💰 Coin Shop"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2093,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-1be5a3ae20e8fc70" + " " + "space-y-4 mb-6",
                            children: coinBundles.map((bundle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>{
                                        // Simulate purchase (in real app, this would go to payment)
                                        setCoins((prev)=>prev + bundle.coins);
                                        setShowCoinShop(false);
                                    },
                                    className: "jsx-1be5a3ae20e8fc70" + " " + `relative p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-102 ${bundle.best ? 'border-yellow-400 bg-yellow-400/10' : 'border-zinc-600 bg-zinc-800/50 hover:border-purple-500'}`,
                                    children: [
                                        bundle.best && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full",
                                            children: "⭐ BEST VALUE"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2109,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-1be5a3ae20e8fc70",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-1be5a3ae20e8fc70" + " " + "text-white font-bold text-lg",
                                                            children: bundle.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 2115,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-1be5a3ae20e8fc70" + " " + "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                                                    size: 28
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                                    lineNumber: 2117,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "text-yellow-400 font-bold text-2xl",
                                                                    children: bundle.coins.toLocaleString()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                                    lineNumber: 2118,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 2116,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 2114,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-1be5a3ae20e8fc70" + " " + "bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl text-xl",
                                                    children: bundle.price
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 2121,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2113,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, bundle.id, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2097,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2095,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowCoinShop(false),
                            className: "jsx-1be5a3ae20e8fc70" + " " + "w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg",
                            children: "Maybe Later"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2129,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 2089,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 2088,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/test/convoset/page.tsx",
        lineNumber: 1072,
        columnNumber: 5
    }, this);
}
_s(ConvosetTest, "jXiJFWqTfGgog35Fl+mJnqRaHDM=");
_c = ConvosetTest;
var _c;
__turbopack_context__.k.register(_c, "ConvosetTest");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_test_convoset_page_tsx_33601b47._.js.map