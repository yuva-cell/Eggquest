// ── Shop Items ────────────────────────────────────────────────────────────────
export const SHOP_ITEMS = [

  // ── FOOD ──────────────────────────────────────────────────────────────────
  { id:'food_apple',    type:'food',       name:'Magic Apple',       emoji:'🍎', cost:10,  description:'A crisp enchanted apple.',         hungerBoost:15, happinessBoost:5  },
  { id:'food_bread',    type:'food',       name:'Arcane Bread',      emoji:'🍞', cost:8,   description:'Freshly baked magical bread.',      hungerBoost:20, happinessBoost:3  },
  { id:'food_meat',     type:'food',       name:'Dragon Meat',       emoji:'🍖', cost:25,  description:'Rich meat from a fallen beast.',    hungerBoost:35, happinessBoost:10 },
  { id:'food_fish',     type:'food',       name:'Silver Fish',       emoji:'🐟', cost:15,  description:'A shimmering enchanted fish.',      hungerBoost:25, happinessBoost:8  },
  { id:'food_cake',     type:'food',       name:'Celebration Cake',  emoji:'🎂', cost:30,  description:'A magical cake full of joy.',       hungerBoost:25, happinessBoost:20 },
  { id:'food_honey',    type:'food',       name:'Forest Honey',      emoji:'🍯', cost:20,  description:'Sweet golden mystical honey.',      hungerBoost:18, happinessBoost:15 },
  { id:'food_carrot',   type:'food',       name:'Rainbow Carrot',    emoji:'🥕', cost:12,  description:'A vibrant multicolored carrot.',    hungerBoost:18, happinessBoost:6  },
  { id:'food_mushroom', type:'food',       name:'Moon Mushroom',     emoji:'🍄', cost:18,  description:'Glowing mushroom from the forest.', hungerBoost:22, happinessBoost:12 },
  { id:'food_berry',    type:'food',       name:'Star Berries',      emoji:'🍇', cost:14,  description:'Sweet berries that sparkle.',       hungerBoost:16, happinessBoost:9  },
  { id:'food_potion',   type:'food',       name:'Growth Potion',     emoji:'🧪', cost:50,  description:'Accelerates pet growth significantly!', hungerBoost:40, happinessBoost:30 },
  { id:'food_nut',      type:'food',       name:'Golden Acorn',      emoji:'🌰', cost:10,  description:'A perfectly preserved acorn.',      hungerBoost:14, happinessBoost:5  },
  { id:'food_corn',     type:'food',       name:'Mystic Corn',       emoji:'🌽', cost:9,   description:'Ancient grain from the realm.',     hungerBoost:16, happinessBoost:4  },
  { id:'food_candy',    type:'food',       name:'Sugar Crystal',     emoji:'🍬', cost:22,  description:'Sweet crystallized treats.',        hungerBoost:10, happinessBoost:18 },
  { id:'food_taco',     type:'food',       name:'Realm Feast',       emoji:'🌮', cost:35,  description:'A full feast from the tavern.',     hungerBoost:45, happinessBoost:15 },
  { id:'food_elixir',   type:'food',       name:'Legendary Elixir',  emoji:'⚗️', cost:80,  description:'Ultra-rare elixir. Massive boost!', hungerBoost:60, happinessBoost:50 },

  // ── DECORATION ───────────────────────────────────────────────────────────
  { id:'deco_flower',   type:'decoration', name:'Wild Flower',       emoji:'🌸', cost:20,  description:'Beautiful flower to decorate the den.' },
  { id:'deco_tree',     type:'decoration', name:'Ancient Oak',       emoji:'🌳', cost:35,  description:'A majestic oak tree for the yard.' },
  { id:'deco_crystal',  type:'decoration', name:'Magic Crystal',     emoji:'💎', cost:60,  description:'A glowing crystal that lights the den.' },
  { id:'deco_lantern',  type:'decoration', name:'Mystic Lantern',    emoji:'🏮', cost:40,  description:'A warm glowing magical lantern.' },
  { id:'deco_fountain', type:'decoration', name:'Starfall Fountain', emoji:'⛲', cost:75,  description:'A fountain that flows with starlight.' },
  { id:'deco_chest',    type:'decoration', name:'Treasure Chest',    emoji:'📦', cost:50,  description:'A treasure chest for display.' },
  { id:'deco_banner',   type:'decoration', name:'Royal Banner',      emoji:'🚩', cost:30,  description:'A banner bearing your coat of arms.' },
  { id:'deco_candle',   type:'decoration', name:'Dragon Candle',     emoji:'🕯️', cost:25,  description:'A long-burning magical candle.' },
  { id:'deco_rug',      type:'decoration', name:'Realm Tapestry',    emoji:'🖼️', cost:45,  description:'A handwoven tapestry from distant lands.' },
  { id:'deco_statue',   type:'decoration', name:'Hero Statue',       emoji:'🗿', cost:90,  description:'A statue of a legendary hero.' },
  { id:'deco_rainbow',  type:'decoration', name:'Eternal Rainbow',   emoji:'🌈', cost:100, description:'A permanent rainbow arching overhead.' },
  { id:'deco_moon',     type:'decoration', name:'Moonstone Orb',     emoji:'🌙', cost:65,  description:'A glowing orb that mimics the moon.' },

  // ── HOUSE ────────────────────────────────────────────────────────────────
  { id:'house_cave',    type:'house',      name:'Cozy Cave',         emoji:'🕳️', cost:50,  description:'A warm underground cave dwelling.' },
  { id:'house_hut',     type:'house',      name:'Forest Hut',        emoji:'🛖', cost:80,  description:'A rustic hut in the heart of the forest.' },
  { id:'house_cottage', type:'house',      name:'Magic Cottage',     emoji:'🏡', cost:120, description:'A charming cottage with a garden.' },
  { id:'house_tower',   type:'house',      name:'Mage Tower',        emoji:'🗼', cost:200, description:'A tall tower filled with arcane energy.' },
  { id:'house_castle',  type:'house',      name:'Mini Castle',       emoji:'🏯', cost:350, description:'A proper castle befitting a noble pet.' },
  { id:'house_cloud',   type:'house',      name:'Cloud Palace',      emoji:'☁️', cost:500, description:'A palace floating high in the clouds.' },
  { id:'house_volcano', type:'house',      name:'Volcano Lair',      emoji:'🌋', cost:400, description:'A fierce lair inside an active volcano.' },
  { id:'house_ocean',   type:'house',      name:'Ocean Palace',      emoji:'🏖️', cost:300, description:'An underwater palace by the sea.' },
  { id:'house_star',    type:'house',      name:'Star Fortress',     emoji:'⭐', cost:600, description:'A fortress built on a fallen star.' },
  { id:'house_crystal', type:'house',      name:'Crystal Sanctum',   emoji:'💠', cost:450, description:'A magnificent sanctum of pure crystal.' },
];

export const SHOP_BY_ID = Object.fromEntries(SHOP_ITEMS.map(i => [i.id, i]));
