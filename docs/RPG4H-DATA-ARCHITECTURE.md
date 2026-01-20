# RPG for Humanity - Data Architecture

## Overview

Your platform uses **three core data files** that work together:

```
┌─────────────────────────────────────────────────────────────────┐
│                        PLATFORM                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────┐     ┌─────────────────┐                   │
│   │  m31.graph.json │     │ player.state    │                   │
│   │  (World Map)    │────▶│ (Per Player)    │                   │
│   └────────┬────────┘     └────────┬────────┘                   │
│            │                       │                             │
│            │    ┌──────────────────┘                             │
│            │    │                                                │
│            ▼    ▼                                                │
│   ┌─────────────────────────────────────────┐                   │
│   │        Mission Packs (Content)          │                   │
│   │  • m31.cafe.coffeepost.json             │                   │
│   │  • m31.restaurant.bistro.json (future)  │                   │
│   │  • m31.pharmacy.medstation.json (future)│                   │
│   └─────────────────────────────────────────┘                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## File 1: m31.graph.json (World Structure)

**Purpose:** Defines the entire M31 world - zones, portals, buildable areas, and Netflix-style tiles.

**Who reads it:**
- Netflix Hub UI → renders zone tiles
- RPG World UI → renders map, portals, player buildings
- Unity (later) → same data, different renderer

**Key sections:**

```json
{
  "buildSystem": {
    "enabled": true,
    "gridSize": { "width": 100, "height": 100 },
    "buildableZones": ["zone.m31.concourse", "zone.m31.habitat"]
  },
  
  "buildingTypes": {
    "cafes": {
      "items": [
        { "itemId": "cafe.coffeepost", "priceCoins": 300, "size": {...} }
      ]
    }
  },
  
  "stations": [
    {
      "id": "zone.m31.concourse",
      "buildable": true,
      "playerBuildings": [],  // ← Populated from player.state
      "tiles": [...],         // ← Netflix-style content tiles
      "portals": [...]        // ← Walk to other zones
    }
  ]
}
```

---

## File 2: m31.cafe.coffeepost.json (Mission Pack)

**Purpose:** Contains ALL content for one mission/game - rounds, dialogue, audio, rewards, shops.

**Who reads it:**
- Game Client → loads rounds, validates answers, plays audio
- Netflix Tile → shows title, difficulty, progress
- Creator Tools → edit/fork missions

**Key sections:**

```json
{
  "id": "pack.m31.cafe.coffeepost",
  "title": "M31 Coffee Outpost",
  "difficulty": "beginner",
  
  "rounds": [
    {
      "id": "r1",
      "mode": "listen_select",
      "npcOrderText": "Hi, a caramel macchiato...",
      "correctOrder": [{ "type": "Macchiato", "size": "Medium" }],
      "rewardCoins": 20
    }
  ],
  
  "menu": {
    "drinks": [...],
    "sizes": [...],
    "milks": [...]
  },
  
  "shops": {
    "cafeShop": { "items": [...] },
    "coinShop": { "bundles": [...] }
  }
}
```

---

## File 3: player.state.json (Player Progress)

**Purpose:** Tracks ONE player's coins, inventory, placed buildings, and progress.

**Storage:**
- MVP: `localStorage` in browser
- Production: Database via `/api/player/state`

**Key sections:**

```json
{
  "player": { "id": "player_001" },
  
  "economy": {
    "coins": 1250,
    "totalEarned": 1880,
    "totalSpent": 630
  },
  
  "inventory": {
    "ownedCafes": [
      { "itemId": "cafe.coffeepost", "purchasedAt": "..." }
    ]
  },
  
  "worldPlacements": {
    "zone.m31.concourse": [
      {
        "itemId": "cafe.coffeepost",
        "position": { "x": 20, "y": 65 },
        "enterable": true,
        "launchPack": "pack.m31.cafe.coffeepost"
      }
    ]
  },
  
  "progress": {
    "currentPack": {
      "packId": "pack.m31.cafe.coffeepost",
      "currentRound": 3
    }
  }
}
```

---

## How They Connect

### Buying a Café

```
1. Player clicks "Buy Coffee Post" (300 coins)
2. Game reads buildingTypes.cafes from m31.graph.json
3. Game checks player.state.economy.coins >= 300
4. Game updates player.state:
   - economy.coins -= 300
   - inventory.ownedCafes.push({ itemId: "cafe.coffeepost" })
5. Save to localStorage (or API)
```

### Placing a Café on the Map

```
1. Player enters "Build Mode"
2. Game shows inventory.ownedCafes (unplaced buildings)
3. Player drags Coffee Post to position {x: 20, y: 65}
4. Game checks buildSystem.placementRules (min distance, etc.)
5. Game updates player.state.worldPlacements:
   {
     "zone.m31.concourse": [
       { "itemId": "cafe.coffeepost", "position": {x: 20, y: 65} }
     ]
   }
6. Building appears on map, clickable to enter mission
```

### Entering a Placed Café

```
1. Player clicks their placed Coffee Post building
2. Game reads launchPack: "pack.m31.cafe.coffeepost"
3. Game fetches /packs/m31.cafe.coffeepost.json
4. Game loads round based on player.state.progress.currentRound
5. Player plays the mission!
```

### Netflix Hub View

```
1. Hub reads m31.graph.json → stations[0].tiles
2. For each tile, check player.state.progress for mastery %
3. Render tiles with:
   - Thumbnail, title, difficulty
   - Progress bar (40% complete)
   - "Play" or "Continue" button
4. Click tile → load mission pack → start game
```

---

## Build Mode: Placing Buildings Anywhere

The grid system uses percentage-based coordinates (0-100):

```
        NORTH (y = 0)
           │
    ┌──────┴──────┐
    │  ☕         │  ← Coffee Post at {x: 20, y: 15}
    │             │
W ──│      ⬡      │── E (x = 100)
    │             │
    │         🌸  │  ← Flower Café at {x: 75, y: 70}
    └──────┬──────┘
           │
        SOUTH (y = 100)
```

**Placement Rules:**
- Buildings can't overlap
- Minimum 15 units apart
- Can't place on restricted areas (portals, monuments)
- Max 10 buildings per zone

---

## File Locations

```
m31-site/
├── public/
│   ├── packs/
│   │   └── m31.cafe.coffeepost.json    # Mission content
│   └── world/
│       └── m31.graph.json              # World structure
├── app/
│   └── ... (React components read these JSONs)
└── lib/
    └── playerState.ts                   # localStorage helper
```

---

## What Stays Hardcoded vs. Data-Driven

| Hardcoded (in React) | Data-Driven (in JSON) |
|----------------------|----------------------|
| UI layout/styling | Round content, dialogue |
| Game loop logic | Menu items, prices |
| Animation code | Audio file paths |
| Input handling | NPC names, portraits |
| Rendering engine | Shop items, rewards |

---

## Next Steps

1. **Add localStorage helper** - Save/load player.state
2. **Refactor convoset.tsx** - Fetch JSON instead of hardcoded values
3. **Build "Build Mode" UI** - Drag/drop buildings on map
4. **Create Netflix Hub page** - Grid of mission tiles

This architecture scales to:
- Multiple languages (add `m31.cafe.coffeepost.ko.json`)
- Creator marketplace (submit new packs)
- Unity port (same JSONs, different renderer)
