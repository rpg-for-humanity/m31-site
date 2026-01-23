module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/utils/tts.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Multi-language TTS utilities for RPG4H
// Supports English (en-US), Korean (ko-KR), and French (fr-FR)
__turbopack_context__.s([
    "getSpeechRecognitionLang",
    ()=>getSpeechRecognitionLang,
    "getStoredLanguage",
    ()=>getStoredLanguage,
    "getVoiceForLang",
    ()=>getVoiceForLang,
    "languageInfo",
    ()=>languageInfo,
    "speakWithLanguage",
    ()=>speakWithLanguage
]);
const getVoiceForLang = (voices, lang)=>{
    const prefix = lang.split('-')[0]; // en / ko / fr
    // Preferred voices by language (female voices preferred for NPC)
    const preferredVoices = {
        'en-US': [
            'Samantha',
            'Karen',
            'Moira',
            'Tessa',
            'Fiona',
            'Victoria',
            'Zira',
            'Hazel'
        ],
        'ko-KR': [
            'Yuna',
            'Sora',
            'Heami',
            'Google 한국어'
        ],
        'fr-FR': [
            'Amélie',
            'Audrey',
            'Aurelie',
            'Thomas',
            'Google français'
        ]
    };
    // Try preferred voices first
    for (const name of preferredVoices[lang] || []){
        const voice = voices.find((v)=>v.name.includes(name));
        if (voice) return voice;
    }
    // Fall back to any voice matching the language prefix
    const langVoice = voices.find((v)=>v.lang.toLowerCase().startsWith(prefix) && !v.name.toLowerCase().includes('male'));
    if (langVoice) return langVoice;
    // Any voice for this language
    const anyLangVoice = voices.find((v)=>v.lang.toLowerCase().startsWith(prefix));
    if (anyLangVoice) return anyLangVoice;
    // Ultimate fallback
    return voices[0] || null;
};
const speakWithLanguage = (text, lang, voices, options)=>{
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
        utterance.onerror = (event)=>options.onError?.(event);
    }
    window.speechSynthesis.speak(utterance);
};
const getSpeechRecognitionLang = (lang)=>{
    return lang; // Direct mapping works for these languages
};
const getStoredLanguage = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return 'en-US';
    //TURBOPACK unreachable
    ;
    const stored = undefined;
};
const languageInfo = {
    'en-US': {
        flag: '🇺🇸',
        label: 'English',
        shortCode: 'EN'
    },
    'ko-KR': {
        flag: '🇰🇷',
        label: '한국어',
        shortCode: 'KR'
    },
    'fr-FR': {
        flag: '🇫🇷',
        label: 'Français',
        shortCode: 'FR'
    }
};
}),
"[project]/app/test/convoset/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConvosetTest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$tts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/tts.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function ConvosetTest() {
    const [gameState, setGameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('intro');
    const [round, setRound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [coins, setCoins] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(50);
    const [investorMessage, setInvestorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        title: "Great job!"
    });
    const [showDialogue, setShowDialogue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isNpcSpeaking, setIsNpcSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showTranscript, setShowTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [voices, setVoices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showCoinAnimation, setShowCoinAnimation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [animatedCoins, setAnimatedCoins] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedLanguage, setSelectedLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('en-US');
    // Menu and Shop states
    const [showMenu, setShowMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCafeShop, setShowCafeShop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCoinShop, setShowCoinShop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showInventory, setShowInventory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [inventoryTab, setInventoryTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('buildings');
    const [selectedInventoryItem, setSelectedInventoryItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [purchasedCafes, setPurchasedCafes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Purchase confirmation popup states
    const [showPurchaseConfirm, setShowPurchaseConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedCafe, setSelectedCafe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showJustPurchased, setShowJustPurchased] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [justPurchasedCafe, setJustPurchasedCafe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showOwnedPopup, setShowOwnedPopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ownedCafeToView, setOwnedCafeToView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Friendly feedback modal state
    const [showFeedbackModal, setShowFeedbackModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Reward summary state (shown after Round 5 completion)
    const [showRewardSummary, setShowRewardSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [totalCoinsEarned, setTotalCoinsEarned] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Email capture modal state
    const [showEmailModal, setShowEmailModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [emailInput, setEmailInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [emailSubmitted, setEmailSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [emailError, setEmailError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // Calculate coins earned per round
    const getCoinsForRound = (r)=>{
        const coinRewards = {
            1: 20,
            2: 30,
            3: 50,
            4: 80,
            5: 100
        };
        return coinRewards[r] ?? 0;
    };
    // Feedback form
    const FEEDBACK_FORM_URL = "https://forms.gle/H42F4Vz4uZXtqHaB8";
    const openFeedbackForm = ()=>{
        window.open(FEEDBACK_FORM_URL, "_blank", "noopener,noreferrer");
    };
    // Handle email submission
    const handleEmailSubmit = async ()=>{
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
            setEmailSubmitted(true);
            setEmailError('');
            // Close modal after 2 seconds
            setTimeout(()=>{
                setShowEmailModal(false);
            }, 2000);
        } catch (err) {
            setEmailError('Something went wrong. Please try again.');
        }
    };
    // Auto-load saved progress on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    // Auto-save when coins or purchases change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        coins,
        purchasedCafes,
        isLoaded
    ]);
    // Cafe options - Updated prices for Level 3 economy
    const cafeOptions = [
        {
            id: 'coffeepost',
            name: 'Coffee Post',
            price: 800,
            image: '/coffeepost.png'
        },
        {
            id: 'retrocafe',
            name: 'Retro Café',
            price: 1500,
            image: '/retrocafe.png'
        },
        {
            id: 'flowercafe',
            name: 'Flower Café',
            price: 2500,
            image: '/flowercafe.png'
        },
        {
            id: 'moderncafe',
            name: 'Modern Café',
            price: 4000,
            image: '/moderncafe.png'
        },
        {
            id: 'rocococafe',
            name: 'Rococo Café',
            price: 6000,
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
    const [kokoroX, setKokoroX] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(-200);
    const [kokoroScale, setKokoroScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [kokoroOpacity, setKokoroOpacity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showFullBody, setShowFullBody] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isWalking, setIsWalking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [introReady, setIntroReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [missionVisible, setMissionVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [round1Selections, setRound1Selections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentItem, setCurrentItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [round2Input, setRound2Input] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [round2Chat, setRound2Chat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [round2Order, setRound2Order] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        type: false,
        size: false,
        milk: false,
        syrup: false,
        temp: false
    });
    const [round3Listening, setRound3Listening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [round3Transcript, setRound3Transcript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [round3Attempts, setRound3Attempts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [round3Feedback, setRound3Feedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [musicStarted, setMusicStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [musicPlaying, setMusicPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [audioRef, setAudioRef] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Round-specific orders and audio
    const roundConfigs = {
        1: {
            audio: '/Audio/round1-order.mp3',
            npcOrder: "Hi, a medium caramel macchiato, with half & half please.",
            correctOrder: [
                {
                    type: 'Macchiato',
                    size: 'Medium',
                    milk: 'Half & Half',
                    syrup: 'Caramel'
                }
            ],
            itemCount: 1
        },
        2: {
            audio: '/Audio/round2-order.mp3',
            npcOrder: "Hi, I'd like a large flat white with nonfat milk, and hazelnut syrup please.",
            correctOrder: [
                {
                    type: 'Flat White',
                    size: 'Large',
                    milk: 'Nonfat',
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (gameState === 'intro') {
            setKokoroX(-200);
            setIsWalking(true);
            setIntroReady(false);
            setMissionVisible(false);
            const walkIn = setInterval(()=>{
                setKokoroX((prev)=>{
                    // Walk more toward center - responsive target
                    // Mobile: ~30% from left, Desktop: ~40% from left (closer to center)
                    const isMobile = window.innerWidth < 768;
                    const target = isMobile ? window.innerWidth * 0.30 : window.innerWidth * 0.40;
                    if (prev >= target) {
                        clearInterval(walkIn);
                        setIsWalking(false);
                        // Mission fades in after Kokorobot stops
                        setTimeout(()=>{
                            setMissionVisible(true);
                            setTimeout(()=>setIntroReady(true), 400);
                        }, 200);
                        return target;
                    }
                    return prev + 10;
                });
            }, 20);
            return ()=>clearInterval(walkIn);
        }
    }, [
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
        const screenWidth = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 1200;
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadVoices = ()=>{
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);
    // REMOVED: useEffect that was causing music overlap
    // Music is now ONLY started in specific places, not on every round change
    const getVoice = ()=>{
        // Use multi-language voice selection
        const voice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$tts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVoiceForLang"])(voices, selectedLanguage);
        if (voice) return voice;
        // Fallback to original English logic if utility fails
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
            const v = voices.find((v)=>v.name.includes(name));
            if (v) return v;
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
        // Stop existing before creating new
        stopBackgroundMusic();
        const audio = new Audio(musicFile);
        audio.loop = true;
        audio.volume = 0.05;
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
            try {
                audioRef.src = '';
            } catch (e) {}
        }
        // Kill ALL audio elements playing music (aggressive cleanup)
        if (typeof document !== 'undefined') {
            document.querySelectorAll('audio').forEach((el)=>{
                const audioEl = el;
                if (audioEl.src && (audioEl.src.includes('music-round') || audioEl.src.includes('Audio'))) {
                    audioEl.pause();
                    audioEl.currentTime = 0;
                    try {
                        audioEl.src = '';
                    } catch (e) {}
                }
            });
        }
    // Don't set musicPlaying to false here - that's only for user muting
    };
    // Pause music temporarily (for sound effects) - will auto-resume
    const pauseBackgroundMusic = ()=>{
        console.log('⏸️ Pausing music temporarily');
        if (audioRef) {
            audioRef.pause();
        }
    };
    // Resume music after sound effect
    const resumeBackgroundMusic = ()=>{
        console.log('▶️ Resuming music');
        if (audioRef && musicPlaying) {
            audioRef.play().catch(()=>{});
        }
    };
    const speakTTS = (text)=>{
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
            // Try to resume existing audioRef first
            if (audioRef && audioRef.src) {
                audioRef.play().catch(()=>{
                    // If resume fails, create new audio
                    const musicFile = getMusicForRound(round);
                    const audio = new Audio(musicFile);
                    audio.loop = true;
                    audio.volume = 0.05;
                    audio.play().catch(()=>{});
                    setAudioRef(audio);
                });
            } else {
                // No audioRef exists, create new one
                const musicFile = getMusicForRound(round);
                const audio = new Audio(musicFile);
                audio.loop = true;
                audio.volume = 0.05;
                audio.play().catch(()=>{});
                setAudioRef(audio);
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
            // Pause background music for celebration sound
            pauseBackgroundMusic();
            // Coin rewards: Round 1 = 20, Round 2 = 30, Round 3 = 50
            const coinReward = round === 1 ? 20 : round === 2 ? 30 : 50;
            // Track total coins earned
            setTotalCoinsEarned((prev)=>prev + coinReward);
            // Play celebration sound
            playAudio('/Audio/goodresult.mp3', ()=>{
                setCoins((prev)=>prev + coinReward);
                triggerCoinAnimation(round);
                const messages = {
                    1: {
                        title: "Well done!"
                    },
                    2: {
                        title: "Great job!"
                    },
                    3: {
                        title: "Excellent!",
                        subtitle: "Can she take your orders too?"
                    },
                    4: {
                        title: "Impressive!"
                    },
                    5: {
                        title: "You're a natural!"
                    }
                };
                setInvestorMessage(messages[round] ?? {
                    title: "Great job!"
                });
                setGameState("investor");
            });
        } else {
            // Wrong answer - play error sound and show friendly feedback
            playAudio('/Audio/kokorobot-wrong.mp3');
            setShowFeedbackModal(true);
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
    const [round2OrderDetails, setRound2OrderDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [round2ConfirmStep, setRound2ConfirmStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
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
                // Pause background music for celebration
                pauseBackgroundMusic();
                // Track total coins earned
                setTotalCoinsEarned((prev)=>prev + 80);
                playAudio('/Audio/goodresult.mp3', ()=>{
                    setCoins((prev)=>prev + 80);
                    triggerCoinAnimation(round);
                    setInvestorMessage({
                        title: "Impressive!"
                    });
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
    const [round3Order, setRound3Order] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        type: false,
        size: false,
        milk: false,
        temp: false,
        syrup: false
    });
    const [round3OrderDetails, setRound3OrderDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [round3Score, setRound3Score] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(500);
    const [round3ConfirmStep, setRound3ConfirmStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [round3CurrentQuestion, setRound3CurrentQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
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
        recognition.lang = selectedLanguage;
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
        // Pause background music for celebration
        pauseBackgroundMusic();
        // Track total coins earned (Round 5 = 100 coins)
        setTotalCoinsEarned((prev)=>prev + 100);
        // Play celebration sound and go straight to investor
        playAudio('/Audio/goodresult.mp3', ()=>{
            setCoins((prev)=>prev + 100);
            triggerCoinAnimation(round);
            setInvestorMessage({
                title: "You're a natural!"
            });
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
    const KokoroCoin = ({ className = "", size = 24 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
            lineNumber: 1187,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-aec33852ef9bce6a" + " " + "min-h-screen bg-black text-white overflow-hidden relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    backgroundImage: `url('/m31.jpg')`
                },
                className: "jsx-aec33852ef9bce6a" + " " + "absolute inset-0 bg-cover bg-center"
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1204,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "absolute inset-0 bg-black/20"
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-950/90 via-amber-900/40 to-transparent"
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-900 to-transparent"
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1216,
                columnNumber: 7
            }, this),
            showCoinAnimation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center",
                children: animatedCoins.map((coin)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            '--jx': `${coin.x}px`,
                            '--jy': `${coin.y}px`,
                            '--s': coin.scale,
                            animationDelay: `${coin.delay}s`
                        },
                        className: "jsx-aec33852ef9bce6a" + " " + "absolute animate-fountain-jet",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-aec33852ef9bce6a" + " " + "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                    size: 36,
                                    className: "drop-shadow-[0_0_15px_rgba(255,215,0,0.9)]"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1233,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "absolute inset-0 w-9 h-9 bg-yellow-400/40 rounded-full blur-md -z-10"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1234,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1232,
                            columnNumber: 15
                        }, this)
                    }, coin.id, false, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1222,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1220,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "absolute top-6 md:top-4 left-2 md:left-4 right-2 md:right-4 flex justify-between items-center z-30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-1 md:gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-aec33852ef9bce6a" + " " + "bg-black/60 backdrop-blur-sm rounded-full px-2 md:px-4 py-1 md:py-1.5 border border-zinc-500/30 flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-100 font-sans text-xs md:text-sm",
                                    children: [
                                        "M31 · Lv.3 · ",
                                        round,
                                        "/5"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1245,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1244,
                                columnNumber: 11
                            }, this),
                            musicStarted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleMusic,
                                className: "jsx-aec33852ef9bce6a" + " " + "bg-black/60 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 md:py-1.5 border border-zinc-500/30 hover:bg-black/80 transition flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-100 text-xs md:text-sm",
                                    children: musicPlaying ? '🔊' : '🔇'
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1252,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1248,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-aec33852ef9bce6a" + " " + "bg-black/60 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 md:py-1.5 border border-zinc-500/30 flex items-center gap-1 md:gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-xs md:text-sm",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$tts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["languageInfo"][selectedLanguage].flag
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1257,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-100 font-sans text-xs md:text-sm",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$tts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["languageInfo"][selectedLanguage].shortCode
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1258,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1256,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1243,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-1 md:gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-aec33852ef9bce6a" + " " + "bg-black/60 backdrop-blur-sm rounded-full px-2 md:px-4 py-1 md:py-1.5 border border-zinc-500/30 flex items-center gap-1 md:gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                        size: 20,
                                        className: "jsx-aec33852ef9bce6a"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1263,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-100 font-sans text-xs md:text-sm",
                                        children: coins
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1264,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1262,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>alert('✅ Progress saved locally!'),
                                className: "jsx-aec33852ef9bce6a" + " " + "bg-black/60 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 md:py-1.5 border border-zinc-500/30 hover:bg-black/80 transition flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-100 text-xs md:text-sm",
                                    children: "✅"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1271,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1267,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    if (confirm('Exit game? Your progress is saved.')) window.location.href = '/';
                                },
                                className: "jsx-aec33852ef9bce6a" + " " + "bg-black/60 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 md:py-1.5 border border-zinc-500/30 hover:bg-black/80 transition flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-100 text-xs md:text-sm",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1278,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1274,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1261,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1242,
                columnNumber: 7
            }, this),
            showFullBody && (gameState === 'intro' || gameState === 'walking') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    left: `${kokoroX}px`,
                    transform: 'translateX(-50%)',
                    opacity: kokoroOpacity
                },
                className: "jsx-aec33852ef9bce6a" + " " + `absolute bottom-24 md:bottom-28 z-[60] pointer-events-none ${isWalking ? '' : 'transition-opacity duration-300'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-aec33852ef9bce6a" + " " + "relative w-fit",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: isWalking ? "/kokorobot-sideview.png" : "/kokorobot-cb.png",
                            alt: "Kokorobot",
                            style: {
                                height: 'clamp(160px, 26vh, 260px)'
                            },
                            className: "jsx-aec33852ef9bce6a" + " " + ([
                                "block w-auto drop-shadow-2xl",
                                isWalking ? "animate-walk" : ""
                            ].join(" ") || "")
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1296,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-aec33852ef9bce6a" + " " + "absolute -bottom-3 left-1/2 -translate-x-1/2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-aec33852ef9bce6a" + " " + "text-xs text-amber-400 font-sans font-medium bg-black/70 px-2 py-1 rounded-full border border-amber-500/30 whitespace-nowrap",
                                children: "Kokoro"
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1308,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1307,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 1295,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1285,
                columnNumber: 9
            }, this),
            gameState === 'intro' && missionVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "absolute inset-0 z-30 flex items-center justify-center px-4 pt-20 pb-32 md:pt-0 md:pb-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-aec33852ef9bce6a" + " " + `bg-black/70 backdrop-blur-md rounded-3xl p-5 md:p-8 max-w-sm md:max-w-md w-full border border-amber-500/30 text-center transition-opacity transition-transform duration-500 ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-aec33852ef9bce6a" + " " + "text-purple-400 text-sm md:text-base font-medium mb-2",
                            children: [
                                "Round ",
                                round,
                                " of 5"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1324,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                fontFamily: 'system-ui, -apple-system, sans-serif'
                            },
                            className: "jsx-aec33852ef9bce6a" + " " + "text-amber-400 text-2xl md:text-3xl font-medium mb-4",
                            children: "M31 Coffee Outpost"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1325,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-aec33852ef9bce6a" + " " + "text-amber-200 text-sm md:text-base mb-6 leading-relaxed",
                            children: [
                                "Learn to understand, and be understood.",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                    className: "jsx-aec33852ef9bce6a"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1329,
                                    columnNumber: 54
                                }, this),
                                "Earn rewards to build Andromeda's first café!"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1328,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: startGame,
                            disabled: !introReady,
                            style: {
                                fontFamily: 'system-ui, -apple-system, sans-serif'
                            },
                            className: "jsx-aec33852ef9bce6a" + " " + `px-8 py-3 rounded-full text-lg font-semibold transition-all ${introReady ? 'bg-amber-500 hover:bg-amber-400 text-black cursor-pointer' : 'bg-amber-500/50 text-black/50 cursor-wait'}`,
                            children: "Begin Mission"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1332,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 1319,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1318,
                columnNumber: 9
            }, this),
            gameState === 'walking' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "absolute inset-0 flex items-center justify-center z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "jsx-aec33852ef9bce6a" + " " + "text-amber-400 text-2xl animate-pulse font-medium",
                    children: "Starting mission..."
                }, void 0, false, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 1351,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1350,
                columnNumber: 9
            }, this),
            gameState === 'playing' && showDialogue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "absolute inset-0 flex flex-col items-center justify-start md:justify-center z-20 pt-20 md:pt-0 pb-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-aec33852ef9bce6a" + " " + "w-full max-w-xl overflow-y-auto px-2 md:px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-aec33852ef9bce6a" + " " + "w-full max-w-xl mx-auto animate-fade-in",
                        children: [
                            (round === 1 || round === 2 || round === 3) && currentRoundConfig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-aec33852ef9bce6a" + " " + "bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-4 md:p-6 shadow-2xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-3 md:gap-4 mb-3 md:mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: "/kokorobot-closeup.png",
                                                alt: "Kokorobot",
                                                className: "jsx-aec33852ef9bce6a" + " " + `w-20 h-20 md:w-28 md:h-28 object-cover rounded-full border-3 border-amber-500/60 shadow-lg animate-pop-in ${isNpcSpeaking ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-black animate-pulse' : ''}`
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1365,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "text-amber-400 text-lg md:text-xl mb-1 font-sans font-medium",
                                                        children: "M31 Coffee Outpost"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1371,
                                                        columnNumber: 21
                                                    }, this),
                                                    showTranscript ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "text-base md:text-xl leading-relaxed text-white",
                                                        children: currentRoundConfig.npcOrder
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1374,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "bg-black/60 rounded-xl p-3 border border-amber-500/30",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "text-amber-300 mb-1 text-sm md:text-base font-medium",
                                                                children: "📋 Register Training"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1377,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "text-amber-100 text-xs md:text-sm mb-3",
                                                                children: "You're on register. Enter Kokoro's exact order."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1378,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "flex gap-2 justify-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: replayVoice,
                                                                        className: "jsx-aec33852ef9bce6a" + " " + "px-4 py-2 rounded-xl transition font-medium flex flex-col items-center justify-center bg-transparent hover:bg-amber-900/50 text-amber-400 text-sm border border-amber-500/40 min-w-[100px]",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "jsx-aec33852ef9bce6a",
                                                                                children: "🔊 Replay"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                                lineNumber: 1386,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "jsx-aec33852ef9bce6a" + " " + "text-xs text-amber-400/60",
                                                                                children: "(Free)"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                                lineNumber: 1387,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                                        lineNumber: 1382,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: buyTranscript,
                                                                        disabled: coins < 10,
                                                                        className: "jsx-aec33852ef9bce6a" + " " + `px-4 py-2 rounded-xl transition font-medium flex flex-col items-center justify-center text-sm border min-w-[100px] ${coins >= 10 ? 'bg-transparent hover:bg-amber-900/50 text-amber-400 border-amber-500/40' : 'bg-transparent text-slate-500 border-slate-600 cursor-not-allowed'}`,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "jsx-aec33852ef9bce6a",
                                                                                children: "💡 Show Text"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                                lineNumber: 1398,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-1 text-xs",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                                                                        size: 12,
                                                                                        className: "jsx-aec33852ef9bce6a"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                                                        lineNumber: 1400,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "jsx-aec33852ef9bce6a",
                                                                                        children: "10"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                                                        lineNumber: 1401,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                                lineNumber: 1399,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                                        lineNumber: 1389,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1381,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1376,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1370,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1364,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-amber-400/60 text-xs text-center mb-3",
                                        children: "Tap Type → Size → Milk → Syrup → Add Item → Submit."
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1411,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "border-t border-amber-500/30 pt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "flex flex-wrap gap-2 mb-4 min-h-[40px]",
                                                children: round1Selections.length > 0 ? round1Selections.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>removeFromOrder(i),
                                                        className: "jsx-aec33852ef9bce6a" + " " + "bg-amber-500/30 border border-amber-500/60 rounded-lg px-3 py-1.5 text-sm hover:bg-red-500/30 hover:border-red-500/60 transition text-amber-200 font-medium",
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
                                                        lineNumber: 1419,
                                                        columnNumber: 25
                                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-aec33852ef9bce6a" + " " + "text-amber-400/50 text-sm",
                                                    children: "Receipt preview"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1428,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1416,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "flex items-center justify-center gap-2 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + `w-2 h-2 rounded-full ${currentItem.type ? 'bg-amber-400' : 'bg-amber-900'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1435,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "text-xs text-amber-400/60",
                                                                children: "Type"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1436,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1434,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + `w-2 h-2 rounded-full ${currentItem.size ? 'bg-amber-400' : 'bg-amber-900'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1439,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "text-xs text-amber-400/60",
                                                                children: "Size"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1440,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1438,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + `w-2 h-2 rounded-full ${currentItem.milk ? 'bg-amber-400' : 'bg-amber-900'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1443,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "text-xs text-amber-400/60",
                                                                children: "Milk"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1444,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1442,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + `w-2 h-2 rounded-full ${currentItem.syrup ? 'bg-amber-400' : 'bg-amber-900'}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1447,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "text-xs text-amber-400/60",
                                                                children: "Syrup"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1448,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1446,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1433,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 max-h-[40vh] md:max-h-none overflow-y-auto",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "bg-black/30 rounded-xl p-2 md:p-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "text-xs text-amber-400/60 mb-2 font-semibold uppercase tracking-wide",
                                                                children: "Type ☕"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1456,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "flex flex-col gap-1",
                                                                children: [
                                                                    'Americano',
                                                                    'Latte',
                                                                    'Cappuccino',
                                                                    'Flat White',
                                                                    'Macchiato',
                                                                    'Mocha',
                                                                    'Espresso'
                                                                ].map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setCurrentItem({
                                                                                ...currentItem,
                                                                                type
                                                                            }),
                                                                        className: "jsx-aec33852ef9bce6a" + " " + `py-1.5 px-2 rounded-lg text-xs transition font-medium ${currentItem.type === type ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`,
                                                                        children: type
                                                                    }, type, false, {
                                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                                        lineNumber: 1459,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1457,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1455,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "bg-black/30 rounded-xl p-2 md:p-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "text-xs text-amber-400/60 mb-2 font-semibold uppercase tracking-wide",
                                                                children: "Size 📏"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1476,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "flex flex-col gap-1",
                                                                children: [
                                                                    'Small',
                                                                    'Medium',
                                                                    'Large'
                                                                ].map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setCurrentItem({
                                                                                ...currentItem,
                                                                                size
                                                                            }),
                                                                        className: "jsx-aec33852ef9bce6a" + " " + `py-1.5 px-2 rounded-lg text-xs transition font-medium ${currentItem.size === size ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`,
                                                                        children: size
                                                                    }, size, false, {
                                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                                        lineNumber: 1479,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1477,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1475,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "bg-black/30 rounded-xl p-2 md:p-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "text-xs text-amber-400/60 mb-2 font-semibold uppercase tracking-wide",
                                                                children: "Milk 🥛"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1496,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "flex flex-col gap-1",
                                                                children: [
                                                                    'None',
                                                                    'Whole',
                                                                    'Half & Half',
                                                                    'Oat',
                                                                    'Almond',
                                                                    'Nonfat'
                                                                ].map((milk)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setCurrentItem({
                                                                                ...currentItem,
                                                                                milk: milk === 'None' ? undefined : milk
                                                                            }),
                                                                        className: "jsx-aec33852ef9bce6a" + " " + `py-1.5 px-2 rounded-lg text-xs transition font-medium ${currentItem.milk === milk || !currentItem.milk && milk === 'None' ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`,
                                                                        children: milk
                                                                    }, milk, false, {
                                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                                        lineNumber: 1499,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1497,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1495,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "bg-black/30 rounded-xl p-2 md:p-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "text-xs text-amber-400/60 mb-2 font-semibold uppercase tracking-wide",
                                                                children: "Syrup 🍯"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1516,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "flex flex-col gap-1",
                                                                children: [
                                                                    'None',
                                                                    'Caramel',
                                                                    'Vanilla',
                                                                    'Hazelnut'
                                                                ].map((syrup)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setCurrentItem({
                                                                                ...currentItem,
                                                                                syrup: syrup === 'None' ? undefined : syrup
                                                                            }),
                                                                        className: "jsx-aec33852ef9bce6a" + " " + `py-1.5 px-2 rounded-lg text-xs transition font-medium ${currentItem.syrup === syrup || !currentItem.syrup && syrup === 'None' ? 'bg-amber-500 text-black' : 'bg-amber-900/50 hover:bg-amber-900/70 text-amber-200'}`,
                                                                        children: syrup
                                                                    }, syrup, false, {
                                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                                        lineNumber: 1519,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 1517,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1515,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1453,
                                                columnNumber: 19
                                            }, this),
                                            (currentItem.type || currentItem.size) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "bg-amber-900/30 rounded-lg p-2 mb-3 text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-aec33852ef9bce6a" + " " + "text-amber-200 text-sm",
                                                    children: [
                                                        "Building: ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-aec33852ef9bce6a" + " " + "font-semibold",
                                                            children: [
                                                                currentItem.size || '___',
                                                                " ",
                                                                currentItem.type || '___',
                                                                currentItem.milk && ` (${currentItem.milk})`,
                                                                currentItem.syrup && ` + ${currentItem.syrup}`
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1539,
                                                            columnNumber: 35
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1538,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1537,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "sticky bottom-0 bg-black/90 pt-3 -mx-4 md:-mx-6 px-4 md:px-6 pb-2 -mb-4 md:-mb-6 rounded-b-2xl",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-aec33852ef9bce6a" + " " + "flex gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: addToOrder,
                                                            disabled: !currentItem.type || !currentItem.size || round1Selections.length >= currentRoundConfig.itemCount,
                                                            className: "jsx-aec33852ef9bce6a" + " " + "flex-1 py-3 rounded-xl font-semibold text-sm md:text-base transition bg-amber-900/60 hover:bg-amber-900/80 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed",
                                                            children: "+ Add Item"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1551,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: checkRound1,
                                                            disabled: round1Selections.length !== currentRoundConfig.itemCount,
                                                            className: "jsx-aec33852ef9bce6a" + " " + "flex-1 py-3 rounded-xl font-semibold text-sm md:text-base transition bg-amber-500 hover:bg-amber-400 text-black disabled:opacity-30 disabled:cursor-not-allowed",
                                                            children: "Submit ✓"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1558,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1550,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1549,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1414,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1363,
                                columnNumber: 15
                            }, this),
                            round === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-aec33852ef9bce6a" + " " + "bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-8 shadow-2xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-4 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: "/kokorobot-closeup.png",
                                                alt: "Kokorobot",
                                                className: "jsx-aec33852ef9bce6a" + " " + "w-20 h-20 rounded-full object-cover border-2 border-amber-500/50"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1575,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-aec33852ef9bce6a",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "text-amber-400 font-sans font-medium text-xl",
                                                        children: "Kokoro"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1577,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "text-lg text-purple-400",
                                                        children: "Your turn! Order one drink by typing."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1578,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1576,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1574,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "h-64 overflow-y-auto mb-4 space-y-3 bg-black/30 rounded-xl p-4",
                                        children: round2Chat.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-aec33852ef9bce6a" + " " + `flex ${msg.role === 'player' ? 'justify-end' : 'justify-start'}`,
                                                children: [
                                                    msg.role === 'npc' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/kokorobot-closeup.png",
                                                        alt: "Kokorobot",
                                                        className: "jsx-aec33852ef9bce6a" + " " + "w-12 h-12 rounded-full mr-2 object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1586,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + `inline-block rounded-xl px-5 py-3 max-w-[80%] text-lg ${msg.role === 'player' ? 'bg-purple-500 text-white' : 'bg-amber-900/60 text-amber-200'}`,
                                                        children: msg.text
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1588,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1584,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1582,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "flex gap-3 mb-4",
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
                                        ].map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-aec33852ef9bce6a" + " " + `px-4 py-2 rounded-full text-base font-medium ${round2Order[key] ? 'bg-green-500/30 text-green-400 border border-green-500/50' : 'bg-amber-900/50 text-amber-400/60'}`,
                                                children: [
                                                    label,
                                                    " ",
                                                    round2Order[key] && '✓'
                                                ]
                                            }, key, true, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1599,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1597,
                                        columnNumber: 17
                                    }, this),
                                    round2ConfirmStep ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                className: "jsx-aec33852ef9bce6a" + " " + "flex-1 bg-amber-900/60 hover:bg-amber-900/80 text-amber-200 font-semibold py-4 rounded-xl text-xl border border-amber-500/40",
                                                children: "✏️ Modify"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1608,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                        setInvestorMessage({
                                                            title: "Impressive!"
                                                        });
                                                        setGameState('investor');
                                                    });
                                                },
                                                className: "jsx-aec33852ef9bce6a" + " " + "flex-1 bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-xl text-xl",
                                                children: "✓ Confirm Order"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1621,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1607,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: round2Input,
                                                onChange: (e)=>setRound2Input(e.target.value),
                                                onKeyDown: (e)=>e.key === 'Enter' && processRound2Input(),
                                                placeholder: "Type your order...",
                                                className: "jsx-aec33852ef9bce6a" + " " + "flex-1 bg-amber-900/40 border border-amber-500/40 rounded-xl px-5 py-4 text-xl focus:outline-none focus:border-amber-500 text-white placeholder-amber-400/50"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1644,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: processRound2Input,
                                                className: "jsx-aec33852ef9bce6a" + " " + "bg-purple-500 hover:bg-purple-400 text-white font-semibold px-10 rounded-xl text-xl",
                                                children: "Send"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1652,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1643,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "mt-4 pt-4 border-t border-amber-500/20 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "text-amber-400/60 text-xs mb-2",
                                                children: "Round 4: Type your order · Earn +80 coins"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1660,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    // Skip to next round without coins
                                                    setRound(5);
                                                    setGameState('playing');
                                                    setShowDialogue(true);
                                                    setRound3Transcript('');
                                                    setRound3ConfirmStep(false);
                                                    startBackgroundMusic(5);
                                                },
                                                className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-500 hover:text-zinc-300 text-sm transition underline",
                                                children: "Skip this round (no coins)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1661,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1659,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1573,
                                columnNumber: 15
                            }, this),
                            round === 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-aec33852ef9bce6a" + " " + "bg-black/85 backdrop-blur-lg rounded-2xl border border-amber-500/40 p-8 shadow-2xl text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/kokorobot-closeup.png",
                                        alt: "Kokorobot",
                                        className: "jsx-aec33852ef9bce6a" + " " + "w-24 h-24 rounded-full object-cover border-2 border-amber-500/50 mx-auto mb-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1682,
                                        columnNumber: 17
                                    }, this),
                                    !round3ConfirmStep ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "text-xl text-green-400 mb-6 font-medium",
                                                children: "Speak your order!"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1686,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: startListening,
                                                disabled: round3Listening,
                                                className: "jsx-aec33852ef9bce6a" + " " + `w-40 h-40 rounded-full font-semibold text-4xl transition mx-auto mb-6 shadow-lg ${round3Listening ? 'bg-red-500 animate-pulse shadow-red-500/50' : 'bg-gradient-to-r from-green-500 to-amber-500 hover:from-green-400 hover:to-amber-400 shadow-green-500/30'}`,
                                                children: round3Listening ? '🎤' : '🎤 Speak'
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1688,
                                                columnNumber: 21
                                            }, this),
                                            round3Transcript && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "bg-amber-900/40 rounded-xl p-5 mb-5 text-left border border-amber-500/30",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "text-base text-amber-400/80 mb-1",
                                                        children: "You said:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1700,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "text-2xl text-white",
                                                        children: [
                                                            '"',
                                                            round3Transcript,
                                                            '"'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1701,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1699,
                                                columnNumber: 23
                                            }, this),
                                            round3CurrentQuestion && !round3ConfirmStep && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "bg-amber-900/40 rounded-xl p-5 text-left border border-amber-500/30",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "text-yellow-400 text-xl mb-4",
                                                        children: [
                                                            "🎤 ",
                                                            round3CurrentQuestion
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1707,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "text-amber-400/60 text-base mb-4",
                                                        children: "Tap the mic to answer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1708,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1706,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-aec33852ef9bce6a" + " " + "text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-aec33852ef9bce6a" + " " + "bg-green-900/30 rounded-xl p-6 mb-6 border border-green-500/50",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "text-2xl text-white",
                                                        children: round3CurrentQuestion
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1717,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1716,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-aec33852ef9bce6a" + " " + "flex gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                            className: "jsx-aec33852ef9bce6a" + " " + "flex-1 bg-amber-900/60 hover:bg-amber-900/80 text-amber-200 font-semibold py-4 rounded-xl text-xl border border-amber-500/40",
                                                            children: "✏️ Modify"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1721,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: acceptRound3Score,
                                                            className: "jsx-aec33852ef9bce6a" + " " + "flex-1 bg-green-500 hover:bg-green-400 text-black font-semibold py-4 rounded-xl text-xl",
                                                            children: "✓ Confirm Order"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1733,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1720,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1715,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "mt-4 pt-4 border-t border-amber-500/20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "text-amber-400/60 text-xs mb-2",
                                                children: "Round 5: Speak your order · Earn +100 coins"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1746,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    // Skip to completion without coins
                                                    stopBackgroundMusic();
                                                    setInvestorMessage({
                                                        title: "You're a natural!"
                                                    });
                                                    setGameState('investor');
                                                },
                                                className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-500 hover:text-zinc-300 text-sm transition underline",
                                                children: "Skip this round (no coins)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1747,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1745,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 1681,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 1359,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 1358,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1357,
                columnNumber: 9
            }, this),
            gameState === 'investor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "fixed inset-0 z-40 bg-black flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-aec33852ef9bce6a" + " " + "relative w-full h-full md:w-[min(96vw,1200px)] md:h-[min(92vh,800px)] md:rounded-2xl overflow-hidden bg-black",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: round === 1 ? "/ib.png" : `/NY-investor${round}.png`,
                            alt: "Earth Investor calling from spaceship",
                            className: "jsx-aec33852ef9bce6a" + " " + "absolute inset-0 w-full h-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1773,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-aec33852ef9bce6a" + " " + "absolute inset-0 z-50 pointer-events-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "absolute top-0 left-0 right-0 h-27 bg-gradient-to-b from-black/100 via-black/85 to-transparent pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1783,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "absolute left-4 right-4 md:left-6 md:right-6 top-5 md:top-2 flex justify-between items-center pointer-events-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-aec33852ef9bce6a" + " " + "bg-black/80 rounded-full px-3 md:px-4 py-1 md:py-1.5 border border-zinc-500/30 flex items-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-100 font-sans text-xs md:text-sm whitespace-nowrap",
                                                children: [
                                                    "M31 · Lv.3 · ",
                                                    round,
                                                    "/5"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1788,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1787,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-2 md:gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-aec33852ef9bce6a" + " " + "bg-black/80 rounded-full px-3 md:px-4 py-1 md:py-1.5 border border-zinc-500/30 flex items-center gap-1 md:gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                                            size: 20,
                                                            className: "jsx-aec33852ef9bce6a" + " " + "md:w-5 md:h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1793,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-100 font-sans text-xs md:text-sm",
                                                            children: coins
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1794,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1792,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>alert('✅ Progress saved locally!'),
                                                    className: "jsx-aec33852ef9bce6a" + " " + "bg-black/80 rounded-full px-2 md:px-3 py-1 md:py-1.5 border border-zinc-500/30 hover:bg-black/60 transition flex items-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-100 text-xs md:text-sm",
                                                        children: "✅ "
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1801,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1797,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        if (confirm('Exit game? Your progress is saved.')) window.location.href = '/';
                                                    },
                                                    className: "jsx-aec33852ef9bce6a" + " " + "bg-black/80 rounded-full px-2 md:px-3 py-1 md:py-1.5 border border-zinc-500/30 hover:bg-black/60 transition flex items-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-100 text-xs md:text-sm",
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1808,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1804,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1790,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1786,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "absolute left-5 md:left-6 top-[72px] md:top-12 flex items-center gap-2 pointer-events-none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-aec33852ef9bce6a" + " " + "w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1815,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-aec33852ef9bce6a" + " " + "text-green-400 text-xs md:text-base font-sans font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]",
                                            children: round === 5 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "md:hidden",
                                                        children: [
                                                            "LIVE: LEVEL 3 CLEAR!!! ",
                                                            totalCoinsEarned,
                                                            " COINS EARNED!"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1819,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "hidden md:inline",
                                                        children: [
                                                            "LIVE: LEVEL 3 CLEAR!!! ",
                                                            totalCoinsEarned,
                                                            " COINS EARNED!"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1820,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true) : `LIVE: +${round === 1 ? 20 : round === 2 ? 30 : round === 3 ? 50 : round === 4 ? 80 : 100} COINS FROM EARTH!`
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1816,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1814,
                                    columnNumber: 15
                                }, this),
                                showCoinAnimation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "absolute inset-0 overflow-hidden flex items-center justify-center",
                                    children: animatedCoins.map((coin)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                '--jx': `${coin.x}px`,
                                                '--jy': `${coin.y}px`,
                                                '--s': coin.scale,
                                                animationDelay: `${coin.delay}s`
                                            },
                                            className: "jsx-aec33852ef9bce6a" + " " + "absolute animate-fountain-jet",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                                        size: 32,
                                                        className: "drop-shadow-[0_0_15px_rgba(255,215,0,0.9)]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1842,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "absolute inset-0 w-8 h-8 bg-yellow-400/40 rounded-full blur-md -z-10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 1843,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1841,
                                                columnNumber: 23
                                            }, this)
                                        }, coin.id, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1831,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1829,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "absolute top-[55%] left-1/2 animate-fly-to-balance",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-1 md:gap-2 bg-black/70 px-3 md:px-4 py-1 md:py-2 rounded-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                                size: 24,
                                                className: "jsx-aec33852ef9bce6a" + " " + "md:w-8 md:h-8"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1853,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "text-yellow-400 font-semibold text-lg md:text-2xl",
                                                children: [
                                                    "+",
                                                    round === 1 ? 20 : round === 2 ? 30 : round === 3 ? 50 : round === 4 ? 80 : 100
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 1854,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 1852,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1851,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-aec33852ef9bce6a" + " " + `absolute left-[55%] -translate-x-1/2 w-[min(92%,520px)] text-center pointer-events-none ${round === 5 ? 'top-[50%] -translate-y-1/2' : 'top-[50%] -translate-y-1/2'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            },
                                            className: "jsx-aec33852ef9bce6a" + " " + "text-2xl md:text-4xl font-medium text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-tight",
                                            children: investorMessage.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1862,
                                            columnNumber: 17
                                        }, this),
                                        round === 5 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            },
                                            className: "jsx-aec33852ef9bce6a" + " " + "mt-2 text-base md:text-xl text-white/90 leading-snug drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]",
                                            children: "Ready for more levels in new outposts?"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1866,
                                            columnNumber: 19
                                        }, this) : investorMessage.subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            },
                                            className: "jsx-aec33852ef9bce6a" + " " + "mt-2 text-base md:text-xl text-white/90 leading-snug drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]",
                                            children: investorMessage.subtitle
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1871,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1859,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-aec33852ef9bce6a" + " " + `absolute flex gap-2 md:gap-3 flex-col pointer-events-auto ${round === 5 ? 'bottom-16 md:bottom-[20%] right-12 md:right-80 items-end' : round === 3 || round === 4 ? 'bottom-16 md:bottom-[25%] left-1/2 -translate-x-1/2 items-center w-[min(92%,360px)]' : 'bottom-30 md:bottom-[38%] right-12 md:left-1/2 md:-translate-x-1/2 md:right-auto items-end md:items-center'}`,
                                    children: [
                                        (round === 3 || round === 4) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setShowCafeShop(true),
                                                    style: {
                                                        fontFamily: 'system-ui, -apple-system, sans-serif'
                                                    },
                                                    className: "jsx-aec33852ef9bce6a" + " " + "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold py-2.5 px-8 rounded-lg text-base transition border border-zinc-100/30",
                                                    children: "Build Your Café"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1889,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: completeGame,
                                                    style: {
                                                        fontFamily: 'system-ui, -apple-system, sans-serif'
                                                    },
                                                    className: "jsx-aec33852ef9bce6a" + " " + "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold py-2.5 px-8 rounded-lg text-base transition shadow-lg border border-zinc-400/50",
                                                    children: "Next Round →"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1896,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        round === 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setShowEmailModal(true),
                                                    style: {
                                                        fontFamily: 'system-ui, -apple-system, sans-serif'
                                                    },
                                                    className: "jsx-aec33852ef9bce6a" + " " + "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold py-3 px-8 rounded-lg text-base transition shadow-lg border border-zinc-400/50",
                                                    children: [
                                                        "Save ",
                                                        totalCoinsEarned,
                                                        " Coins Earned"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1909,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-aec33852ef9bce6a" + " " + "flex flex-col items-end",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setShowCafeShop(true),
                                                            style: {
                                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                                            },
                                                            className: "jsx-aec33852ef9bce6a" + " " + "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold py-3 px-8 rounded-lg text-base transition border border-zinc-100/30",
                                                            children: "Build Your Café"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1917,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: openFeedbackForm,
                                                            style: {
                                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                                            },
                                                            className: "jsx-aec33852ef9bce6a" + " " + "text-white hover:text-black text-sm font-semibold mt-1 transition underline underline-offset-4",
                                                            children: "Send Feedback"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 1924,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 1916,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        round < 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: completeGame,
                                            style: {
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            },
                                            className: "jsx-aec33852ef9bce6a" + " " + "bg-zinc-700 hover:bg-zinc-600 text-zinc-100 font-semibold py-2.5 px-8 rounded-lg text-base transition shadow-lg border border-zinc-100/30",
                                            children: "Next Round →"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 1937,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 1879,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 1780,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 1770,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 1768,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "aec33852ef9bce6a",
                children: "@keyframes fountain-jet{0%{opacity:0;transform:translateX(var(--jx))translateY(50px)scale(.3)}15%{opacity:1;transform:translateX(var(--jx))translateY(var(--jy))scale(var(--s))}35%{opacity:1;transform:translateX(var(--jx))translateY(calc(var(--jy)*.7))scale(var(--s))rotate(90deg)}55%{opacity:1;transform:translateX(var(--jx))translateY(calc(var(--jy)*.4))scale(var(--s))rotate(180deg)}75%{opacity:.8;transform:translateX(calc(var(--jx)*.3 + 40%))translateY(calc(var(--jy)*.1 - 45%))scale(calc(var(--s)*.6))rotate(270deg)}to{opacity:0;transform:translate(45%)translateY(-48%)scale(.15)}}.animate-fountain-jet.jsx-aec33852ef9bce6a{animation:2.8s ease-out forwards fountain-jet}@keyframes walk{0%{transform:translateY(0)rotate(0)}25%{transform:translateY(-6px)rotate(-2deg)}50%{transform:translateY(0)rotate(0)}75%{transform:translateY(-6px)rotate(2deg)}to{transform:translateY(0)rotate(0)}}.animate-walk.jsx-aec33852ef9bce6a{animation:.5s ease-in-out infinite walk}@keyframes fade-in{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.animate-fade-in.jsx-aec33852ef9bce6a{animation:.5s ease-out fade-in}@keyframes pop-in{0%{opacity:0;transform:scale(0)}70%{transform:scale(1.1)}to{opacity:1;transform:scale(1)}}.animate-pop-in.jsx-aec33852ef9bce6a{animation:.4s ease-out pop-in}@keyframes fly-to-balance{0%{opacity:1;transform:translate(-50%,-50%)scale(1)}70%{opacity:1;transform:translate(42%,-52%)scale(.8)}to{opacity:0;transform:translate(42%,-52%)scale(.5)}}.animate-fly-to-balance.jsx-aec33852ef9bce6a{animation:1.5s ease-in-out forwards fly-to-balance}"
            }, void 0, false, void 0, this),
            showMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setShowMenu(false),
                className: "jsx-aec33852ef9bce6a" + " " + "fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
                        boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5)'
                    },
                    className: "jsx-aec33852ef9bce6a" + " " + "bg-zinc-900 rounded-xl p-8 max-w-2xl w-full border-4 border-zinc-700 shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontFamily: 'Georgia, serif',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                            },
                            className: "jsx-aec33852ef9bce6a" + " " + "text-4xl font-medium text-center mb-8 text-white",
                            children: "☕ Our Menu"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2038,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-aec33852ef9bce6a" + " " + "grid grid-cols-1 gap-4",
                            children: menuItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "flex justify-between items-center border-b border-zinc-700/50 pb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-aec33852ef9bce6a",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: 'Georgia, serif'
                                                    },
                                                    className: "jsx-aec33852ef9bce6a" + " " + "text-2xl text-white font-medium",
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 2045,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-400 text-sm italic",
                                                    children: item.desc
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 2046,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2044,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-500 text-xl",
                                            children: "•••"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2048,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2043,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2041,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowMenu(false),
                            className: "jsx-aec33852ef9bce6a" + " " + "mt-8 w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg text-lg",
                            children: "Got it!"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2052,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 2030,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 2029,
                columnNumber: 9
            }, this),
            showCafeShop && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-aec33852ef9bce6a" + " " + "bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-6 max-w-4xl w-full border border-amber-500/30",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-aec33852ef9bce6a" + " " + "flex justify-between items-center mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontFamily: 'system-ui, -apple-system, sans-serif'
                                    },
                                    className: "jsx-aec33852ef9bce6a" + " " + "text-3xl font-medium text-amber-400",
                                    children: "🏪 Choose Your Café"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2067,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                            size: 28,
                                            className: "jsx-aec33852ef9bce6a"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2069,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-aec33852ef9bce6a" + " " + "text-yellow-400 font-bold text-xl",
                                            children: coins
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2070,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2068,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2066,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-aec33852ef9bce6a" + " " + "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6",
                            children: cafeOptions.map((cafe)=>{
                                const owned = purchasedCafes.includes(cafe.id);
                                const canAfford = coins >= cafe.price;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    className: "jsx-aec33852ef9bce6a" + " " + `relative rounded-xl overflow-hidden border-2 transition-all ${owned ? 'border-green-500 cursor-pointer hover:scale-105' : canAfford ? 'border-amber-500 hover:border-amber-400 cursor-pointer hover:scale-105' : 'border-zinc-600 opacity-50'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-aec33852ef9bce6a" + " " + "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: cafe.image,
                                                    alt: cafe.name,
                                                    className: "jsx-aec33852ef9bce6a" + " " + "w-full h-32 object-cover bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 2099,
                                                    columnNumber: 23
                                                }, this),
                                                owned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-aec33852ef9bce6a" + " " + "absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full",
                                                    children: "✓ OWNED"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 2101,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2098,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-aec33852ef9bce6a" + " " + "p-3 bg-black/80",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontFamily: 'system-ui, -apple-system, sans-serif'
                                                    },
                                                    className: "jsx-aec33852ef9bce6a" + " " + "text-white font-medium text-sm",
                                                    children: cafe.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 2107,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-1 mt-1",
                                                    children: owned ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-aec33852ef9bce6a" + " " + "text-green-400 text-sm",
                                                        children: "Tap to view options"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 2110,
                                                        columnNumber: 27
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 2113,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + `font-bold ${canAfford ? 'text-yellow-400' : 'text-red-400'}`,
                                                                children: cafe.price
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 2114,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 2108,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2106,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, cafe.id, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2079,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2074,
                            columnNumber: 13
                        }, this),
                        round === 5 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "flex gap-3 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                alert('🎯 New conversation sets coming soon! Stay tuned for more scenarios to practice.');
                                            },
                                            style: {
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            },
                                            className: "jsx-aec33852ef9bce6a" + " " + "flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-lg border border-zinc-600",
                                            children: "🎯 Try a New Set"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2129,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                alert('🏪 More outposts coming soon! Restaurant, Department Store, and more.');
                                            },
                                            style: {
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            },
                                            className: "jsx-aec33852ef9bce6a" + " " + "flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-lg border border-zinc-600",
                                            children: "🏬 Choose New Outpost"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2138,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2128,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        alert('🗺️ M31 Map coming soon! Your cafés are saved in inventory.');
                                    },
                                    style: {
                                        fontFamily: 'system-ui, -apple-system, sans-serif'
                                    },
                                    className: "jsx-aec33852ef9bce6a" + " " + "w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-lg border border-zinc-600 mb-4",
                                    children: "🗺️ Go to M31 Map"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2149,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "flex justify-center gap-6 pt-2 border-t border-zinc-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowCoinShop(true),
                                            style: {
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            },
                                            className: "jsx-aec33852ef9bce6a" + " " + "text-amber-400 hover:text-amber-300 text-sm font-medium transition",
                                            children: "💰 Buy Coins"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2161,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setShowCafeShop(false);
                                                setShowInventory(true);
                                            },
                                            style: {
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            },
                                            className: "jsx-aec33852ef9bce6a" + " " + "text-amber-400 hover:text-amber-300 text-sm font-medium transition",
                                            children: "📦 Check Inventory"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2168,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setShowCafeShop(false);
                                            },
                                            style: {
                                                fontFamily: 'system-ui, -apple-system, sans-serif'
                                            },
                                            className: "jsx-aec33852ef9bce6a" + " " + "text-amber-400 hover:text-amber-300 text-sm font-medium transition",
                                            children: "💾 Save & Exit"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2178,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2160,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-aec33852ef9bce6a" + " " + "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowCoinShop(true),
                                        style: {
                                            fontFamily: 'system-ui, -apple-system, sans-serif'
                                        },
                                        className: "jsx-aec33852ef9bce6a" + " " + "flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-semibold rounded-lg border border-zinc-600",
                                        children: "💰 Buy Coins"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2193,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowCafeShop(false);
                                            completeGame();
                                        },
                                        style: {
                                            fontFamily: 'system-ui, -apple-system, sans-serif'
                                        },
                                        className: "jsx-aec33852ef9bce6a" + " " + "flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold rounded-lg",
                                        children: "▶️ Keep Playing"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2200,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2192,
                                columnNumber: 17
                            }, this)
                        }, void 0, false)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 2065,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 2064,
                columnNumber: 9
            }, this),
            showPurchaseConfirm && selectedCafe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-aec33852ef9bce6a" + " " + "bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-8 max-w-md w-full border border-amber-500/50 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "jsx-aec33852ef9bce6a" + " " + "text-2xl font-medium text-amber-400 mb-4",
                            children: "🏪 Purchase Café?"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2221,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: selectedCafe.image,
                            alt: selectedCafe.name,
                            className: "jsx-aec33852ef9bce6a" + " " + "w-48 h-48 object-cover rounded-xl mx-auto mb-4 border-2 border-amber-500/30 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2222,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-aec33852ef9bce6a" + " " + "text-white text-xl font-semibold mb-2",
                            children: selectedCafe.name
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2227,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-aec33852ef9bce6a" + " " + "flex items-center justify-center gap-2 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-400",
                                    children: "Price:"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2229,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                    size: 24,
                                    className: "jsx-aec33852ef9bce6a"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2230,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "text-yellow-400 font-bold text-xl",
                                    children: selectedCafe.price
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2231,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2228,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-aec33852ef9bce6a" + " " + "flex items-center justify-center gap-2 mb-6 bg-black/50 py-2 px-4 rounded-full inline-flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-400",
                                    children: "Your balance:"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2234,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                    size: 20,
                                    className: "jsx-aec33852ef9bce6a"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2235,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "text-yellow-400 font-semibold",
                                    children: coins
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2236,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2233,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-aec33852ef9bce6a" + " " + "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowPurchaseConfirm(false);
                                        setSelectedCafe(null);
                                    },
                                    className: "jsx-aec33852ef9bce6a" + " " + "flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-lg",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2239,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                    className: "jsx-aec33852ef9bce6a" + " " + "flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold rounded-lg",
                                    children: "✓ Buy Now"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2248,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2238,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 2220,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 2219,
                columnNumber: 9
            }, this),
            showJustPurchased && justPurchasedCafe && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-aec33852ef9bce6a" + " " + "bg-gradient-to-b from-green-900/80 to-zinc-900 rounded-2xl p-8 max-w-md w-full border border-green-500/50 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-aec33852ef9bce6a" + " " + "text-6xl mb-4",
                            children: "🎉"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2272,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "jsx-aec33852ef9bce6a" + " " + "text-3xl font-bold text-green-400 mb-4",
                            children: "Congratulations!"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2273,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: justPurchasedCafe.image,
                            alt: justPurchasedCafe.name,
                            className: "jsx-aec33852ef9bce6a" + " " + "w-48 h-48 object-cover rounded-xl mx-auto mb-4 border-2 border-green-500/50 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2274,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-aec33852ef9bce6a" + " " + "text-white text-xl mb-2",
                            children: justPurchasedCafe.name
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2279,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-aec33852ef9bce6a" + " " + "text-green-300 mb-6",
                            children: "is now in your inventory!"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2280,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-400 text-sm mb-6",
                            children: "What would you like to do?"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2281,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-aec33852ef9bce6a" + " " + "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowJustPurchased(false);
                                        setJustPurchasedCafe(null);
                                        alert('🗺️ M31 Map coming soon! Your café is saved in inventory.');
                                    },
                                    className: "jsx-aec33852ef9bce6a" + " " + "w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold rounded-lg",
                                    children: "🗺️ Place on M31 Map"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2283,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowJustPurchased(false);
                                        setJustPurchasedCafe(null);
                                        setShowCafeShop(false);
                                        setShowInventory(true);
                                    },
                                    className: "jsx-aec33852ef9bce6a" + " " + "w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold rounded-lg",
                                    children: "📦 Check Inventory"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2293,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowJustPurchased(false);
                                        setJustPurchasedCafe(null);
                                        alert('🎯 New conversation sets coming soon! Stay tuned for more scenarios to practice.');
                                    },
                                    className: "jsx-aec33852ef9bce6a" + " " + "w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold rounded-lg",
                                    children: "🎯 Try a New Set"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2304,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2282,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 2271,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 2270,
                columnNumber: 9
            }, this),
            showOwnedPopup && ownedCafeToView && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-aec33852ef9bce6a" + " " + "bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl p-8 max-w-md w-full border border-green-500/50 text-center relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "jsx-aec33852ef9bce6a" + " " + "text-2xl font-bold text-green-400 mb-4",
                            children: [
                                "🏪 ",
                                ownedCafeToView.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2323,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: ownedCafeToView.image,
                            alt: ownedCafeToView.name,
                            className: "jsx-aec33852ef9bce6a" + " " + "w-48 h-48 object-cover rounded-xl mx-auto mb-6 border-2 border-green-500/50 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2324,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-300 mb-6",
                            children: "This café is in your inventory. What would you like to do?"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2329,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-aec33852ef9bce6a" + " " + "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowOwnedPopup(false);
                                        setOwnedCafeToView(null);
                                        alert('🗺️ M31 Map coming soon! Your café is saved in inventory.');
                                    },
                                    className: "jsx-aec33852ef9bce6a" + " " + "w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold rounded-lg",
                                    children: "🗺️ Place on M31 Map"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2331,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowOwnedPopup(false);
                                        setOwnedCafeToView(null);
                                        setShowCafeShop(false);
                                        setShowInventory(true);
                                    },
                                    className: "jsx-aec33852ef9bce6a" + " " + "w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold rounded-lg",
                                    children: "📦 Check Inventory"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2341,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowOwnedPopup(false);
                                        setOwnedCafeToView(null);
                                        alert('🎯 New conversation sets coming soon! Stay tuned for more scenarios to practice.');
                                    },
                                    className: "jsx-aec33852ef9bce6a" + " " + "w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold rounded-lg",
                                    children: "🎯 Try a New Set"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2352,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowOwnedPopup(false);
                                        setOwnedCafeToView(null);
                                    },
                                    className: "jsx-aec33852ef9bce6a" + " " + "w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2362,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2330,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 2322,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 2321,
                columnNumber: 9
            }, this),
            showFeedbackModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-aec33852ef9bce6a" + " " + "bg-gradient-to-b from-amber-50 to-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-amber-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: 'system-ui, -apple-system, sans-serif'
                            },
                            className: "jsx-aec33852ef9bce6a" + " " + "text-5xl mb-4 text-amber-900 relative inline-block",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-aec33852ef9bce6a",
                                    children: "(๑>◡<๑)"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2382,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "absolute left-[15%] top-[45%] w-3 h-3 bg-pink-300 rounded-full opacity-70"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2384,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "absolute right-[15%] top-[45%] w-3 h-3 bg-pink-300 rounded-full opacity-70"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2385,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2381,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                fontFamily: 'system-ui, -apple-system, sans-serif'
                            },
                            className: "jsx-aec33852ef9bce6a" + " " + "text-2xl font-medium text-amber-800 mb-2",
                            children: "Almost there!"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2387,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "jsx-aec33852ef9bce6a" + " " + "text-amber-700 mb-6 text-base leading-relaxed",
                            children: "Let's try again! Tap 🔊 Replay to hear the order."
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2390,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setShowFeedbackModal(false);
                                replayVoice();
                            },
                            style: {
                                fontFamily: 'system-ui, -apple-system, sans-serif'
                            },
                            className: "jsx-aec33852ef9bce6a" + " " + "w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-900 font-bold rounded-full text-lg shadow-lg transition-all",
                            children: "🔊 Replay Order"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2393,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowFeedbackModal(false),
                            className: "jsx-aec33852ef9bce6a" + " " + "mt-3 text-amber-600 hover:text-amber-800 font-medium transition-colors",
                            children: "Got it, thanks!"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2403,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 2379,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 2378,
                columnNumber: 9
            }, this),
            showEmailModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "fixed inset-0 bg-black/80 backdrop-blur-md z-[90] flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-aec33852ef9bce6a" + " " + "bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-3xl p-6 md:p-8 max-w-md w-full text-center shadow-2xl border border-pink-500/30",
                    children: !emailSubmitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-aec33852ef9bce6a" + " " + "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-4xl mb-3",
                                        children: "🎉"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2421,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontFamily: 'system-ui, -apple-system, sans-serif'
                                        },
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-xl md:text-2xl font-medium text-white mb-2",
                                        children: "Save Your Progress!"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2422,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-400 text-sm md:text-base",
                                        children: [
                                            "Keep your ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "text-yellow-400 font-semibold",
                                                children: [
                                                    totalCoinsEarned,
                                                    " coins"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 2426,
                                                columnNumber: 31
                                            }, this),
                                            " for new levels"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2425,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2420,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-aec33852ef9bce6a" + " " + "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        value: emailInput,
                                        onChange: (e)=>{
                                            setEmailInput(e.target.value);
                                            setEmailError('');
                                        },
                                        placeholder: "Enter your email",
                                        style: {
                                            fontFamily: 'system-ui, -apple-system, sans-serif'
                                        },
                                        className: "jsx-aec33852ef9bce6a" + " " + "w-full px-4 py-3 rounded-xl bg-zinc-700/50 border border-zinc-600 text-white placeholder-zinc-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-base"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2432,
                                        columnNumber: 19
                                    }, this),
                                    emailError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-red-400 text-sm mt-2",
                                        children: emailError
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2444,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2431,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleEmailSubmit,
                                style: {
                                    fontFamily: 'system-ui, -apple-system, sans-serif'
                                },
                                className: "jsx-aec33852ef9bce6a" + " " + "w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold rounded-full text-lg shadow-lg transition-all mb-3",
                                children: "Get Notified at Launch 🚀"
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2449,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-500 text-xs mb-4",
                                children: "We'll only email you about RPG for Humanity updates."
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2458,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowEmailModal(false),
                                className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-400 hover:text-white text-sm transition-colors",
                                children: "Maybe later"
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2463,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-aec33852ef9bce6a" + " " + "py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "text-5xl mb-4",
                                    children: "✅"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2474,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontFamily: 'system-ui, -apple-system, sans-serif'
                                    },
                                    className: "jsx-aec33852ef9bce6a" + " " + "text-xl md:text-2xl font-bold text-green-400 mb-2",
                                    children: "You're on the list!"
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2475,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-300 text-sm md:text-base",
                                    children: "We'll notify you when new levels are ready."
                                }, void 0, false, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2478,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-aec33852ef9bce6a" + " " + "flex items-center justify-center gap-2 mt-4 text-yellow-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                            size: 24,
                                            className: "jsx-aec33852ef9bce6a"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2482,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-aec33852ef9bce6a" + " " + "font-semibold",
                                            children: [
                                                totalCoinsEarned,
                                                " coins saved"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2483,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2481,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2473,
                            columnNumber: 17
                        }, this)
                    }, void 0, false)
                }, void 0, false, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 2416,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 2415,
                columnNumber: 9
            }, this),
            showCoinShop && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setShowCoinShop(false),
                className: "jsx-aec33852ef9bce6a" + " " + "fixed inset-0 bg-black/90 z-[80] flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    className: "jsx-aec33852ef9bce6a" + " " + "bg-gradient-to-b from-purple-900 to-zinc-900 rounded-2xl p-6 max-w-md w-full border border-purple-500/50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "jsx-aec33852ef9bce6a" + " " + "text-3xl font-medium text-center text-purple-300 mb-6",
                            children: "💰 Coin Shop"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2499,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-aec33852ef9bce6a" + " " + "space-y-4 mb-6",
                            children: coinBundles.map((bundle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>{
                                        // Simulate purchase (in real app, this would go to payment)
                                        setCoins((prev)=>prev + bundle.coins);
                                        setShowCoinShop(false);
                                    },
                                    className: "jsx-aec33852ef9bce6a" + " " + `relative p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-102 ${bundle.best ? 'border-yellow-400 bg-yellow-400/10' : 'border-zinc-600 bg-zinc-800/50 hover:border-purple-500'}`,
                                    children: [
                                        bundle.best && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-aec33852ef9bce6a" + " " + "absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full",
                                            children: "⭐ BEST VALUE"
                                        }, void 0, false, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2515,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-aec33852ef9bce6a" + " " + "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-aec33852ef9bce6a",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-aec33852ef9bce6a" + " " + "text-white font-bold text-lg",
                                                            children: bundle.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 2521,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                                                    size: 28
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                                    lineNumber: 2523,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-aec33852ef9bce6a" + " " + "text-yellow-400 font-bold text-2xl",
                                                                    children: bundle.coins.toLocaleString()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                                    lineNumber: 2524,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 2522,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 2520,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-aec33852ef9bce6a" + " " + "bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl text-xl",
                                                    children: bundle.price
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 2527,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/test/convoset/page.tsx",
                                            lineNumber: 2519,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, bundle.id, true, {
                                    fileName: "[project]/app/test/convoset/page.tsx",
                                    lineNumber: 2503,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2501,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowCoinShop(false),
                            className: "jsx-aec33852ef9bce6a" + " " + "w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg",
                            children: "Maybe Later"
                        }, void 0, false, {
                            fileName: "[project]/app/test/convoset/page.tsx",
                            lineNumber: 2535,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/test/convoset/page.tsx",
                    lineNumber: 2495,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 2494,
                columnNumber: 9
            }, this),
            showInventory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-aec33852ef9bce6a" + " " + "fixed inset-0 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 z-[60] flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-aec33852ef9bce6a" + " " + "flex items-center justify-between px-6 py-4 border-b border-zinc-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowInventory(false),
                                className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-2 text-amber-400 hover:text-amber-300 transition font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-xl",
                                        children: "←"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2554,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-aec33852ef9bce6a",
                                        children: "Back to Coffee Outpost"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2555,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2550,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-aec33852ef9bce6a" + " " + "flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KokoroCoin, {
                                        size: 28,
                                        className: "jsx-aec33852ef9bce6a"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2558,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-yellow-400 font-bold text-xl",
                                        children: coins
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2559,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2557,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 2549,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-aec33852ef9bce6a" + " " + "flex gap-2 px-6 py-4 border-b border-zinc-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setInventoryTab('buildings'),
                                className: "jsx-aec33852ef9bce6a" + " " + `px-6 py-3 rounded-xl font-semibold transition ${inventoryTab === 'buildings' ? 'bg-amber-500 text-black' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`,
                                children: "🏪 Buildings"
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2565,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setInventoryTab('kokorobots'),
                                disabled: true,
                                className: "jsx-aec33852ef9bce6a" + " " + "px-6 py-3 rounded-xl font-semibold bg-zinc-800 text-zinc-500 cursor-not-allowed flex items-center gap-2",
                                children: [
                                    "🤖 Kokorobots",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-xs bg-zinc-700 px-2 py-0.5 rounded-full",
                                        children: "Soon"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2581,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2575,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: true,
                                className: "jsx-aec33852ef9bce6a" + " " + "px-6 py-3 rounded-xl font-semibold bg-zinc-800 text-zinc-500 cursor-not-allowed flex items-center gap-2",
                                children: [
                                    "🌳 Items",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-xs bg-zinc-700 px-2 py-0.5 rounded-full",
                                        children: "Soon"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2588,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2583,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 2564,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-aec33852ef9bce6a" + " " + "flex-1 overflow-y-auto px-6 py-6",
                        children: [
                            inventoryTab === 'buildings' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-aec33852ef9bce6a",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-2xl font-medium text-white mb-6",
                                        children: "Your Buildings"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2596,
                                        columnNumber: 17
                                    }, this),
                                    purchasedCafes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-center py-16",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "text-6xl mb-4",
                                                children: "🏪"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 2600,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-400 text-xl mb-6",
                                                children: "No buildings yet!"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 2601,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setShowInventory(false);
                                                    setShowCafeShop(true);
                                                },
                                                className: "jsx-aec33852ef9bce6a" + " " + "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold py-3 px-8 rounded-full text-lg transition",
                                                children: "🛒 Shop for Cafés"
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 2602,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2599,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-aec33852ef9bce6a",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8",
                                                children: [
                                                    purchasedCafes.map((cafeId)=>{
                                                        const cafe = cafeOptions.find((c)=>c.id === cafeId);
                                                        if (!cafe) return null;
                                                        const isSelected = selectedInventoryItem === cafeId;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            onClick: ()=>setSelectedInventoryItem(isSelected ? null : cafeId),
                                                            className: "jsx-aec33852ef9bce6a" + " " + `relative rounded-xl overflow-hidden cursor-pointer transition-all transform hover:scale-105 ${isSelected ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-zinc-800' : 'border-2 border-zinc-600 hover:border-amber-500/50'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: cafe.image,
                                                                    alt: cafe.name,
                                                                    className: "jsx-aec33852ef9bce6a" + " " + "w-full aspect-square object-cover bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-black/90"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                                    lineNumber: 2630,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-aec33852ef9bce6a" + " " + "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "jsx-aec33852ef9bce6a" + " " + "text-white font-semibold text-sm",
                                                                        children: cafe.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                                        lineNumber: 2636,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                                    lineNumber: 2635,
                                                                    columnNumber: 29
                                                                }, this),
                                                                isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-aec33852ef9bce6a" + " " + "absolute top-2 right-2 bg-amber-400 text-black rounded-full p-1",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        fill: "currentColor",
                                                                        viewBox: "0 0 20 20",
                                                                        className: "jsx-aec33852ef9bce6a" + " " + "w-4 h-4",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            fillRule: "evenodd",
                                                                            d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                                                            clipRule: "evenodd",
                                                                            className: "jsx-aec33852ef9bce6a"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                                            lineNumber: 2641,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                                        lineNumber: 2640,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                                    lineNumber: 2639,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, cafeId, true, {
                                                            fileName: "[project]/app/test/convoset/page.tsx",
                                                            lineNumber: 2621,
                                                            columnNumber: 27
                                                        }, this);
                                                    }),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        onClick: ()=>{
                                                            setShowInventory(false);
                                                            setShowCafeShop(true);
                                                        },
                                                        className: "jsx-aec33852ef9bce6a" + " " + "rounded-xl border-2 border-dashed border-zinc-600 hover:border-amber-500/50 cursor-pointer transition-all flex flex-col items-center justify-center aspect-square bg-zinc-800/50 hover:bg-zinc-800",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "text-4xl mb-2",
                                                                children: "+"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 2657,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-400 font-medium",
                                                                children: "Buy More"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                                lineNumber: 2658,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/test/convoset/page.tsx",
                                                        lineNumber: 2650,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 2615,
                                                columnNumber: 21
                                            }, this),
                                            selectedInventoryItem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-aec33852ef9bce6a" + " " + "flex justify-center mb-8",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        alert('🗺️ M31 Map coming soon! Your café is saved and ready to place.');
                                                    },
                                                    className: "jsx-aec33852ef9bce6a" + " " + "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold py-4 px-10 rounded-full text-xl transition shadow-lg shadow-blue-500/30",
                                                    children: "🗺️ Place on M31 Map"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/test/convoset/page.tsx",
                                                    lineNumber: 2665,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/test/convoset/page.tsx",
                                                lineNumber: 2664,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2613,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2595,
                                columnNumber: 15
                            }, this),
                            inventoryTab === 'kokorobots' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-aec33852ef9bce6a" + " " + "text-center py-16",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-6xl mb-4",
                                        children: "🤖"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2682,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-2xl font-medium text-white mb-4",
                                        children: "Kokorobots Coming Soon!"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2683,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-aec33852ef9bce6a" + " " + "text-zinc-400 max-w-md mx-auto",
                                        children: "Customize your Kokorobot's appearance — change hairstyles, suits, colors, and more!"
                                    }, void 0, false, {
                                        fileName: "[project]/app/test/convoset/page.tsx",
                                        lineNumber: 2684,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2681,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 2593,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-aec33852ef9bce6a" + " " + "flex items-center justify-between px-6 py-5 border-t border-zinc-700 bg-zinc-900/80",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    alert('🏬 All Outposts hub coming soon! Practice at different locations.');
                                },
                                className: "jsx-aec33852ef9bce6a" + " " + "text-amber-400 hover:text-amber-300 font-semibold text-lg transition flex items-center gap-2",
                                children: "🏬 All Outposts"
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2694,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setShowInventory(false);
                                    alert('✅ Progress saved! Your coins and items are stored.');
                                },
                                className: "jsx-aec33852ef9bce6a" + " " + "text-amber-400 hover:text-amber-300 font-semibold text-lg transition",
                                children: "Save & Exit"
                            }, void 0, false, {
                                fileName: "[project]/app/test/convoset/page.tsx",
                                lineNumber: 2702,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/test/convoset/page.tsx",
                        lineNumber: 2693,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/test/convoset/page.tsx",
                lineNumber: 2547,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/test/convoset/page.tsx",
        lineNumber: 1202,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__51388427._.js.map