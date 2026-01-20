# M31-Site Repository Structure

## RPG for Humanity Platform

```
m31-site/
│
├── app/                                    # Next.js App Router
│   ├── layout.tsx                          # Root layout (fonts, metadata)
│   ├── page.tsx                            # Landing page (rpgforhumanity.com)
│   ├── globals.css                         # Global styles
│   │
│   ├── test/
│   │   └── convoset/
│   │       └── page.tsx                    # Game prototype (v54)
│   │
│   ├── play/                               # 🔮 FUTURE: Player hub
│   │   ├── page.tsx                        # Netflix-style mission browser
│   │   └── [packId]/
│   │       └── page.tsx                    # Mission player
│   │
│   └── create/                             # 🔮 FUTURE: Creator studio
│       ├── page.tsx                        # Creator dashboard
│       └── editor/
│           └── page.tsx                    # Dialogue set editor
│
├── public/                                 # Static assets (served at /)
│   │
│   ├── packs/                              # 📦 MISSION PACKS (game logic)
│   │   └── m31.cafe.coffeepost.json        # Coffee Outpost - rounds, menu, rewards
│   │   └── m31.restaurant.bistro.json      # 🔮 FUTURE
│   │   └── m31.pharmacy.medstation.json    # 🔮 FUTURE
│   │
│   ├── world/                              # 🗺️ WORLD STRUCTURE
│   │   └── m31.graph.json                  # Zones, portals, build system, tiles
│   │
│   ├── dialogues/                          # 💬 DIALOGUE SETS (creator content)
│   │   ├── dialogue.cafe.set001.json       # Beginner set (EN/KR/FR)
│   │   ├── dialogue.cafe.set002.json       # 🔮 FUTURE: Intermediate
│   │   ├── dialogue.cafe.set003.json       # 🔮 FUTURE: Advanced
│   │   └── community/                      # 🔮 FUTURE: Creator submissions
│   │       └── [creatorId]-[setName].json
│   │
│   ├── templates/                          # 📝 CREATOR TEMPLATES
│   │   └── CREATOR-TEMPLATE-dialogue-set.json
│   │
│   ├── Audio/                              # 🔊 AUDIO FILES
│   │   ├── en/                             # 🔮 FUTURE: Organized by language
│   │   │   └── ...
│   │   ├── ko/
│   │   │   └── ...
│   │   ├── fr/
│   │   │   └── ...
│   │   │
│   │   ├── ask-size.mp3                    # Current audio files
│   │   ├── ask-type.mp3
│   │   ├── coffee-confirm.mp3
│   │   ├── coffee-syrup.mp3
│   │   ├── coffee-temperature.mp3
│   │   ├── confirm-order.mp3
│   │   ├── goodresult.mp3
│   │   ├── kokorobot-greeting.mp3
│   │   ├── kokorobot-ready.mp3
│   │   ├── kokorobot-success.mp3
│   │   ├── kokorobot-wrong.mp3
│   │   ├── milk-lists.mp3
│   │   ├── milk-preference.mp3
│   │   ├── music-round1.mp3
│   │   ├── music-round2.mp3
│   │   ├── music-round3.mp3
│   │   ├── music-victory.mp3
│   │   ├── notavailable.mp3
│   │   ├── order.mp3
│   │   ├── round1-order.mp3
│   │   └── round2-order.mp3
│   │
│   ├── images/                             # 🖼️ IMAGES (current + future)
│   │   ├── cafes/                          # 🔮 FUTURE: Organized
│   │   │   └── ...
│   │   ├── npcs/
│   │   │   └── ...
│   │   └── backgrounds/
│   │       └── ...
│   │
│   ├── coffeepost.png                      # Current cafe images
│   ├── flowercafe.png
│   ├── moderncafe.png
│   ├── retrocafe.png
│   ├── rocococafe.png
│   │
│   ├── kokorobot.png                       # NPC images
│   ├── kokorobot-cb.png
│   ├── kokorobot-closeup.png
│   ├── kokorobot-sideview.png
│   │
│   ├── NY-investor2.png                    # Investor images
│   ├── NY-investor3.png
│   ├── NY-investor4.png
│   ├── NY-investor5.png
│   ├── NY-investor6.png
│   │
│   ├── m31.jpg                             # Background
│   ├── ei-empire.png                       # Logos/branding
│   └── ib.png
│
├── docs/                                   # 📚 DOCUMENTATION
│   ├── RPG4H-DATA-ARCHITECTURE.md          # How JSON schemas connect
│   ├── RPG4H-PLATFORM-OVERVIEW.md          # Player vs Creator tracks
│   └── player.state.example.json           # Example player save data
│
├── lib/                                    # 🔮 FUTURE: Shared utilities
│   ├── playerState.ts                      # localStorage helpers
│   ├── loadPack.ts                         # Fetch mission packs
│   ├── loadDialogue.ts                     # Fetch dialogue sets
│   └── types.ts                            # TypeScript interfaces
│
├── components/                             # 🔮 FUTURE: Reusable components
│   ├── ui/                                 # Generic UI components
│   │   ├── GoldCoin.tsx
│   │   ├── Button.tsx
│   │   └── Modal.tsx
│   ├── game/                               # Game-specific components
│   │   ├── OrderBuilder.tsx
│   │   ├── ChatInput.tsx
│   │   ├── SpeechRecorder.tsx
│   │   └── InvestorScreen.tsx
│   └── hub/                                # Netflix hub components
│       ├── MissionTile.tsx
│       ├── ZoneRow.tsx
│       └── LanguageSelector.tsx
│
├── api/                                    # 🔮 FUTURE: Backend endpoints
│   ├── player/
│   │   └── state.ts                        # GET/POST player progress
│   ├── shop/
│   │   └── buy.ts                          # Purchase items
│   └── creator/
│       └── submit.ts                       # Submit dialogue sets
│
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── eslint.config.mjs
```

---

## File Purposes

### Core Data Files (JSON)

| File | Purpose | Who Creates |
|------|---------|-------------|
| `packs/*.json` | Game logic: rounds, menu, rewards, shops | You (platform owner) |
| `world/*.json` | World map: zones, portals, build grid | You (platform owner) |
| `dialogues/*.json` | Content: order text, audio paths, answers | You + Creators |
| `templates/*.json` | Blank templates for creators | You (platform owner) |

### Current vs Future

| Status | Meaning |
|--------|---------|
| ✅ | Currently exists |
| 🔮 FUTURE | Planned for later phases |

---

## Data Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   m31.graph     │     │  coffeepost     │     │  dialogue.set   │
│   (world map)   │────▶│  (game pack)    │────▶│  (content)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                        GAME CLIENT                              │
│                    (app/test/convoset)                          │
└─────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────┐
│  player.state   │
│  (localStorage) │
└─────────────────┘
```

---

## Languages Supported

| Code | Language | Flag |
|------|----------|------|
| `en-US` | English | 🇺🇸 |
| `ko-KR` | Korean | 🇰🇷 |
| `fr-FR` | French | 🇫🇷 |

---

## Quick Reference

### Run locally
```bash
cd ~/m31-site
npm run dev
# Open http://localhost:3000/test/convoset
```

### Deploy changes
```bash
git add .
git commit -m "your message"
git push
```

### Add new dialogue set
1. Copy `public/templates/CREATOR-TEMPLATE-dialogue-set.json`
2. Fill in dialogues for all 3 languages
3. Save to `public/dialogues/dialogue.cafe.setXXX.json`
4. Register in mission pack or hub

---

## Phase Roadmap

| Phase | Focus | Key Files |
|-------|-------|-----------|
| **1** ✅ | Prototype + JSON extraction | `convoset/page.tsx`, `packs/`, `world/` |
| **2** | Language selector + load from JSON | `lib/loadPack.ts`, `dialogues/` |
| **3** | Netflix hub UI | `app/play/`, `components/hub/` |
| **4** | Creator studio | `app/create/`, `api/creator/` |
| **5** | Payments + revenue | `api/shop/`, Stripe integration |
| **6** | Unity integration | Export JSON → Unity WebGL |
