// ── 50+ Egg Variants ──────────────────────────────────────────────────────────
// rarity: common | rare | epic | legendary
export const EGG_VARIANTS = [
  // ── COMMON (20 variants) ──────────────────────────────────────────────────
  { id:'egg_cat',       name:'Cat Egg',        emoji:'🥚', rarity:'common',    species:'Cat',         babyEmoji:'🐱', adultEmoji:'🐈',  adultName:'Royal Cat' },
  { id:'egg_dog',       name:'Dog Egg',        emoji:'🥚', rarity:'common',    species:'Dog',         babyEmoji:'🐶', adultEmoji:'🐕',  adultName:'Loyal Hound' },
  { id:'egg_bunny',     name:'Bunny Egg',      emoji:'🥚', rarity:'common',    species:'Bunny',       babyEmoji:'🐰', adultEmoji:'🐇',  adultName:'Swift Rabbit' },
  { id:'egg_chick',     name:'Chick Egg',      emoji:'🥚', rarity:'common',    species:'Chick',       babyEmoji:'🐣', adultEmoji:'🐓',  adultName:'Thunder Rooster' },
  { id:'egg_frog',      name:'Frog Egg',       emoji:'🥚', rarity:'common',    species:'Frog',        babyEmoji:'🐸', adultEmoji:'🐊',  adultName:'Marsh Guardian' },
  { id:'egg_hamster',   name:'Hamster Egg',    emoji:'🥚', rarity:'common',    species:'Hamster',     babyEmoji:'🐹', adultEmoji:'🦫',  adultName:'Iron Capybara' },
  { id:'egg_penguin',   name:'Penguin Egg',    emoji:'🥚', rarity:'common',    species:'Penguin',     babyEmoji:'🐧', adultEmoji:'🦭',  adultName:'Frost Seal' },
  { id:'egg_turtle',    name:'Turtle Egg',     emoji:'🥚', rarity:'common',    species:'Turtle',      babyEmoji:'🐢', adultEmoji:'🦕',  adultName:'Ancient Tortoise' },
  { id:'egg_monkey',    name:'Monkey Egg',     emoji:'🥚', rarity:'common',    species:'Monkey',      babyEmoji:'🐵', adultEmoji:'🦍',  adultName:'Silver Gorilla' },
  { id:'egg_bear',      name:'Bear Egg',       emoji:'🥚', rarity:'common',    species:'Bear',        babyEmoji:'🐻', adultEmoji:'🐻',  adultName:'Forest Bear' },
  { id:'egg_panda',     name:'Panda Egg',      emoji:'🥚', rarity:'common',    species:'Panda',       babyEmoji:'🐼', adultEmoji:'🐼',  adultName:'Bamboo Giant' },
  { id:'egg_koala',     name:'Koala Egg',      emoji:'🥚', rarity:'common',    species:'Koala',       babyEmoji:'🐨', adultEmoji:'🐨',  adultName:'Eucalyptus Spirit' },
  { id:'egg_pig',       name:'Pig Egg',        emoji:'🥚', rarity:'common',    species:'Pig',         babyEmoji:'🐷', adultEmoji:'🐗',  adultName:'Ironback Boar' },
  { id:'egg_sheep',     name:'Sheep Egg',      emoji:'🥚', rarity:'common',    species:'Sheep',       babyEmoji:'🐑', adultEmoji:'🦙',  adultName:'Cloud Llama' },
  { id:'egg_cow',       name:'Cow Egg',        emoji:'🥚', rarity:'common',    species:'Cow',         babyEmoji:'🐮', adultEmoji:'🦬',  adultName:'Thunder Bison' },
  { id:'egg_chicken',   name:'Chicken Egg',    emoji:'🥚', rarity:'common',    species:'Chicken',     babyEmoji:'🐤', adultEmoji:'🦃',  adultName:'Royal Turkey' },
  { id:'egg_duck',      name:'Duck Egg',       emoji:'🥚', rarity:'common',    species:'Duck',        babyEmoji:'🦆', adultEmoji:'🦢',  adultName:'Crystal Swan' },
  { id:'egg_mouse',     name:'Mouse Egg',      emoji:'🥚', rarity:'common',    species:'Mouse',       babyEmoji:'🐭', adultEmoji:'🐀',  adultName:'Shadow Rat' },
  { id:'egg_fish',      name:'Fish Egg',       emoji:'🥚', rarity:'common',    species:'Fish',        babyEmoji:'🐟', adultEmoji:'🐠',  adultName:'Coral Fish' },
  { id:'egg_crab',      name:'Crab Egg',       emoji:'🥚', rarity:'common',    species:'Crab',        babyEmoji:'🦀', adultEmoji:'🦞',  adultName:'Sea Lobster' },

  // ── RARE (15 variants) ────────────────────────────────────────────────────
  { id:'egg_fox',       name:'Fox Egg',        emoji:'🩵', rarity:'rare',      species:'Fox',         babyEmoji:'🦊', adultEmoji:'🦊',  adultName:'Arcane Fox' },
  { id:'egg_wolf',      name:'Wolf Egg',       emoji:'🩵', rarity:'rare',      species:'Wolf',        babyEmoji:'🐺', adultEmoji:'🐺',  adultName:'Moonhowl Wolf' },
  { id:'egg_deer',      name:'Deer Egg',       emoji:'🩵', rarity:'rare',      species:'Deer',        babyEmoji:'🦌', adultEmoji:'🦌',  adultName:'Stormhorn Stag' },
  { id:'egg_owl',       name:'Owl Egg',        emoji:'🩵', rarity:'rare',      species:'Owl',         babyEmoji:'🦉', adultEmoji:'🦅',  adultName:'Storm Eagle' },
  { id:'egg_parrot',    name:'Parrot Egg',     emoji:'🩵', rarity:'rare',      species:'Parrot',      babyEmoji:'🦜', adultEmoji:'🦚',  adultName:'Jade Peacock' },
  { id:'egg_dolphin',   name:'Dolphin Egg',    emoji:'🩵', rarity:'rare',      species:'Dolphin',     babyEmoji:'🐬', adultEmoji:'🐋',  adultName:'Ocean Whale' },
  { id:'egg_octopus',   name:'Octopus Egg',    emoji:'🩵', rarity:'rare',      species:'Octopus',     babyEmoji:'🐙', adultEmoji:'🦑',  adultName:'Deep Squid' },
  { id:'egg_butterfly', name:'Butterfly Egg',  emoji:'🩵', rarity:'rare',      species:'Butterfly',   babyEmoji:'🐛', adultEmoji:'🦋',  adultName:'Moonwing' },
  { id:'egg_bee',       name:'Bee Egg',        emoji:'🩵', rarity:'rare',      species:'Bee',         babyEmoji:'🐝', adultEmoji:'🐝',  adultName:'Golden Hornet' },
  { id:'egg_lion',      name:'Lion Egg',       emoji:'🩵', rarity:'rare',      species:'Lion',        babyEmoji:'🦁', adultEmoji:'🦁',  adultName:'Sunmane Lion' },
  { id:'egg_tiger',     name:'Tiger Egg',      emoji:'🩵', rarity:'rare',      species:'Tiger',       babyEmoji:'🐯', adultEmoji:'🐅',  adultName:'Shadow Tiger' },
  { id:'egg_elephant',  name:'Elephant Egg',   emoji:'🩵', rarity:'rare',      species:'Elephant',    babyEmoji:'🐘', adultEmoji:'🦣',  adultName:'Tusk Mammoth' },
  { id:'egg_giraffe',   name:'Giraffe Egg',    emoji:'🩵', rarity:'rare',      species:'Giraffe',     babyEmoji:'🦒', adultEmoji:'🦒',  adultName:'Skyreach Giraffe' },
  { id:'egg_hippo',     name:'Hippo Egg',      emoji:'🩵', rarity:'rare',      species:'Hippo',       babyEmoji:'🦛', adultEmoji:'🦛',  adultName:'Ironhide Hippo' },
  { id:'egg_gorilla',   name:'Gorilla Egg',    emoji:'🩵', rarity:'rare',      species:'Gorilla',     babyEmoji:'🦍', adultEmoji:'🦍',  adultName:'Silverback King' },

  // ── EPIC (10 variants) ────────────────────────────────────────────────────
  { id:'egg_unicorn',   name:'Unicorn Egg',    emoji:'💜', rarity:'epic',      species:'Unicorn',     babyEmoji:'🦄', adultEmoji:'🦄',  adultName:'Celestial Unicorn' },
  { id:'egg_phoenix',   name:'Phoenix Egg',    emoji:'💜', rarity:'epic',      species:'Phoenix',     babyEmoji:'🐦', adultEmoji:'🦅',  adultName:'Rebirth Phoenix' },
  { id:'egg_griffin',   name:'Griffin Egg',    emoji:'💜', rarity:'epic',      species:'Griffin',     babyEmoji:'🦁', adultEmoji:'🦅',  adultName:'Skyclaw Griffin' },
  { id:'egg_kraken',    name:'Kraken Egg',     emoji:'💜', rarity:'epic',      species:'Kraken',      babyEmoji:'🐙', adultEmoji:'🦑',  adultName:'Abyss Kraken' },
  { id:'egg_pegasus',   name:'Pegasus Egg',    emoji:'💜', rarity:'epic',      species:'Pegasus',     babyEmoji:'🐴', adultEmoji:'🦄',  adultName:'Stormcloud Pegasus' },
  { id:'egg_manticore', name:'Manticore Egg',  emoji:'💜', rarity:'epic',      species:'Manticore',   babyEmoji:'🦁', adultEmoji:'🐯',  adultName:'Dusk Manticore' },
  { id:'egg_hydra',     name:'Hydra Egg',      emoji:'💜', rarity:'epic',      species:'Hydra',       babyEmoji:'🐍', adultEmoji:'🐲',  adultName:'Tide Hydra' },
  { id:'egg_wyvern',    name:'Wyvern Egg',     emoji:'💜', rarity:'epic',      species:'Wyvern',      babyEmoji:'🦎', adultEmoji:'🐉',  adultName:'Storm Wyvern' },
  { id:'egg_sphinx',    name:'Sphinx Egg',     emoji:'💜', rarity:'epic',      species:'Sphinx',      babyEmoji:'🦁', adultEmoji:'🦁',  adultName:'Eternal Sphinx' },
  { id:'egg_basilisk',  name:'Basilisk Egg',   emoji:'💜', rarity:'epic',      species:'Basilisk',    babyEmoji:'🐍', adultEmoji:'🐊',  adultName:'Petrify Basilisk' },

  // ── LEGENDARY (8 variants) ────────────────────────────────────────────────
  { id:'egg_dragon',    name:'Dragon Egg',     emoji:'🌟', rarity:'legendary', species:'Dragon',      babyEmoji:'🐲', adultEmoji:'🐉',  adultName:'Ancient Dragon' },
  { id:'egg_celestial', name:'Celestial Egg',  emoji:'🌟', rarity:'legendary', species:'Celestial',   babyEmoji:'⭐', adultEmoji:'✨',  adultName:'Star Deity' },
  { id:'egg_shadow',    name:'Shadow Egg',     emoji:'🌟', rarity:'legendary', species:'Shadow Beast', babyEmoji:'👻', adultEmoji:'🌑',  adultName:'Void Shade' },
  { id:'egg_thunder',   name:'Thunder Egg',    emoji:'🌟', rarity:'legendary', species:'Thunderbird', babyEmoji:'⚡', adultEmoji:'🌩️', adultName:'Storm Titan' },
  { id:'egg_cosmic',    name:'Cosmic Egg',     emoji:'🌟', rarity:'legendary', species:'Cosmic Beast', babyEmoji:'🌌', adultEmoji:'🪐', adultName:'Galaxy Wanderer' },
  { id:'egg_inferno',   name:'Inferno Egg',    emoji:'🌟', rarity:'legendary', species:'Inferno',     babyEmoji:'🔥', adultEmoji:'🌋',  adultName:'Volcano Lord' },
  { id:'egg_frost',     name:'Frost Egg',      emoji:'🌟', rarity:'legendary', species:'Frost Drake',  babyEmoji:'❄️', adultEmoji:'🏔️', adultName:'Glacier Drake' },
  { id:'egg_time',      name:'Time Egg',       emoji:'🌟', rarity:'legendary', species:'Chrono Beast', babyEmoji:'⏳', adultEmoji:'🕰️', adultName:'Time Keeper' },
];

export const EGG_BY_ID = Object.fromEntries(EGG_VARIANTS.map(e => [e.id, e]));

// Rarity pools for random draws
export const RARITY_POOLS = {
  common:    EGG_VARIANTS.filter(e => e.rarity === 'common').map(e => e.id),
  rare:      EGG_VARIANTS.filter(e => e.rarity === 'rare').map(e => e.id),
  epic:      EGG_VARIANTS.filter(e => e.rarity === 'epic').map(e => e.id),
  legendary: EGG_VARIANTS.filter(e => e.rarity === 'legendary').map(e => e.id),
};

// Pick a random entry from an array
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Award egg(s) based on quest difficulty
export function rollEggsForDifficulty(difficulty) {
  const roll = Math.random();
  const eggs = [];
  switch (difficulty) {
    case 'trivial':
      if (roll < 0.20) eggs.push(pick(RARITY_POOLS.common));
      break;
    case 'easy':
      if (roll < 0.35) eggs.push(pick(RARITY_POOLS.common));
      break;
    case 'medium':
      if (roll < 0.55) {
        eggs.push(roll < 0.15 ? pick(RARITY_POOLS.rare) : pick(RARITY_POOLS.common));
      }
      break;
    case 'hard':
      // Guaranteed at least 1 egg
      eggs.push(roll < 0.30 ? pick(RARITY_POOLS.epic) : roll < 0.65 ? pick(RARITY_POOLS.rare) : pick(RARITY_POOLS.common));
      if (roll < 0.25) eggs.push(pick(RARITY_POOLS.common)); // bonus egg
      break;
    case 'legendary':
      // Always 1-2 eggs with higher rarity
      eggs.push(roll < 0.15 ? pick(RARITY_POOLS.legendary) : roll < 0.50 ? pick(RARITY_POOLS.epic) : pick(RARITY_POOLS.rare));
      if (roll < 0.40) eggs.push(pick(RARITY_POOLS.rare));   // bonus egg
      break;
  }
  return eggs; // array of variantIds
}
