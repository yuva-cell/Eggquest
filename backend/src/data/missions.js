/**
 * missions.js — Preset mission / quest templates
 *
 * These templates are organised by `zone` and `difficulty`.
 * They are used:
 *   • As starter-pack seed data when a new user registers.
 *   • As inspiration snippets surfaced in the "Quick Add" UI.
 *
 * Schema mirrors the Quest model:
 *   { title, description, zone, difficulty }
 *
 * XP / Gold rewards are calculated dynamically by the quest route,
 * so they do NOT need to be present here.
 */

// ─── Zone keys must match the Quest model enum ───────────────────────────────
// 'work' | 'personal' | 'health' | 'learning' | 'social'

export const MISSION_TEMPLATES = [

  // ─── WORK ─────────────────────────────────────────────────────────────────
  {
    title: 'Clear the Inbox Dungeon',
    description: 'Reach Inbox Zero — vanquish every unread message lurking in your email.',
    zone: 'work',
    difficulty: 'easy',
  },
  {
    title: 'Slay the Weekly Report',
    description: 'Complete and submit this week\'s status report before the timer runs out.',
    zone: 'work',
    difficulty: 'medium',
  },
  {
    title: 'Conquer the Project Deadline',
    description: 'Deliver the full milestone on time with QA passing and documentation done.',
    zone: 'work',
    difficulty: 'hard',
  },
  {
    title: 'Attend the Morning Muster',
    description: 'Show up and actively contribute to the daily stand-up meeting.',
    zone: 'work',
    difficulty: 'trivial',
  },
  {
    title: 'Forge the Grand Roadmap',
    description: 'Draft and get sign-off on a quarterly product roadmap spanning all teams.',
    zone: 'work',
    difficulty: 'legendary',
  },
  {
    title: 'Code Review Crusade',
    description: 'Review three open pull requests with constructive, detailed feedback.',
    zone: 'work',
    difficulty: 'easy',
  },
  {
    title: 'Bug Bounty Hunt',
    description: 'Track down and squash a critical bug that\'s been plaguing production.',
    zone: 'work',
    difficulty: 'hard',
  },

  // ─── PERSONAL ─────────────────────────────────────────────────────────────
  {
    title: 'Tame the Cluttered Den',
    description: 'Declutter and organise one full room in your home — donate what you don\'t need.',
    zone: 'personal',
    difficulty: 'medium',
  },
  {
    title: 'Budget Reckoning',
    description: 'Review last month\'s spending and create a budget plan for the next 30 days.',
    zone: 'personal',
    difficulty: 'easy',
  },
  {
    title: 'The Midnight Journal',
    description: 'Write a journal entry capturing today\'s victories, struggles, and lessons.',
    zone: 'personal',
    difficulty: 'trivial',
  },
  {
    title: 'Spring Cleaning Saga',
    description: 'Deep-clean the entire home — windows, appliances, forgotten corners, all of it.',
    zone: 'personal',
    difficulty: 'legendary',
  },
  {
    title: 'Cook a Legendary Meal',
    description: 'Prepare a brand-new recipe from scratch without ordering takeout.',
    zone: 'personal',
    difficulty: 'medium',
  },
  {
    title: 'Digital Detox Hour',
    description: 'Spend 60 minutes completely offline — no phone, no screens, no distractions.',
    zone: 'personal',
    difficulty: 'easy',
  },

  // ─── HEALTH ───────────────────────────────────────────────────────────────
  {
    title: 'Dawn Warrior Run',
    description: 'Complete a 5 km morning run before 8 AM.',
    zone: 'health',
    difficulty: 'medium',
  },
  {
    title: 'Hydration Quest',
    description: 'Drink 8 glasses of water today — track every sip.',
    zone: 'health',
    difficulty: 'trivial',
  },
  {
    title: 'Iron Citadel Workout',
    description: 'Complete a 45-minute full-body strength training session.',
    zone: 'health',
    difficulty: 'hard',
  },
  {
    title: 'Sleep Realm Restoration',
    description: 'Be in bed by 10 PM and sleep for a full 8 hours.',
    zone: 'health',
    difficulty: 'easy',
  },
  {
    title: 'Iron-Monk Fitness Month',
    description: 'Exercise every single day for 30 consecutive days without missing one.',
    zone: 'health',
    difficulty: 'legendary',
  },
  {
    title: 'Vegetable Victory',
    description: 'Eat at least 5 different vegetables in a single day.',
    zone: 'health',
    difficulty: 'easy',
  },
  {
    title: 'Meditation Sanctuary',
    description: 'Complete a 20-minute guided mindfulness meditation session.',
    zone: 'health',
    difficulty: 'trivial',
  },

  // ─── LEARNING ─────────────────────────────────────────────────────────────
  {
    title: 'Chapter of Wisdom',
    description: 'Read one full chapter of a non-fiction book and summarise the key ideas.',
    zone: 'learning',
    difficulty: 'easy',
  },
  {
    title: 'Skill Forge: 1-Hour Sprint',
    description: 'Dedicate one focused hour to practising or learning a new skill.',
    zone: 'learning',
    difficulty: 'medium',
  },
  {
    title: 'The Great Course',
    description: 'Finish an entire online course module with quiz score above 80%.',
    zone: 'learning',
    difficulty: 'hard',
  },
  {
    title: 'Flash Card Blitz',
    description: 'Review your Anki / flash card deck — hit your daily review goal.',
    zone: 'learning',
    difficulty: 'trivial',
  },
  {
    title: 'Master\'s Thesis of Knowledge',
    description: 'Complete a full certification or multi-week course from start to finish.',
    zone: 'learning',
    difficulty: 'legendary',
  },
  {
    title: 'Language Rune Practice',
    description: 'Complete one Duolingo or language-learning lesson streak without breaking it.',
    zone: 'learning',
    difficulty: 'trivial',
  },
  {
    title: 'Build the Side Project',
    description: 'Spend 2 hours coding on your personal project and push at least one commit.',
    zone: 'learning',
    difficulty: 'medium',
  },

  // ─── SOCIAL ──────────────────────────────────────────────────────────────
  {
    title: 'Messenger of Peace',
    description: 'Reach out to a friend or family member you haven\'t spoken to in a while.',
    zone: 'social',
    difficulty: 'trivial',
  },
  {
    title: 'Guild Night Organised',
    description: 'Plan and host a social event or game night for friends or colleagues.',
    zone: 'social',
    difficulty: 'hard',
  },
  {
    title: 'Coffee with an Ally',
    description: 'Have a meaningful one-on-one conversation over coffee or a video call.',
    zone: 'social',
    difficulty: 'easy',
  },
  {
    title: 'Compliment Crusade',
    description: 'Give three genuine, specific compliments to people around you today.',
    zone: 'social',
    difficulty: 'trivial',
  },
  {
    title: 'Community Champion',
    description: 'Volunteer for or organise a community event that benefits others.',
    zone: 'social',
    difficulty: 'legendary',
  },
  {
    title: 'Network Expedition',
    description: 'Attend a networking event or online meetup and connect with two new people.',
    zone: 'social',
    difficulty: 'medium',
  },
  {
    title: 'Mentorship Bond',
    description: 'Spend an hour mentoring someone or seeking mentorship from an expert.',
    zone: 'social',
    difficulty: 'hard',
  },
];

/**
 * Returns a filtered list of mission templates.
 *
 * @param {string} [zone]       - Filter by zone key (optional)
 * @param {string} [difficulty] - Filter by difficulty key (optional)
 * @returns {Array} Matching templates
 */
export function getMissionTemplates(zone, difficulty) {
  return MISSION_TEMPLATES.filter(m => {
    const zoneOk = !zone || m.zone === zone;
    const diffOk = !difficulty || m.difficulty === difficulty;
    return zoneOk && diffOk;
  });
}

/**
 * Returns a small, random set of mission templates as starter quests.
 * Called when a new user registers so they have something to do right away.
 *
 * @param {number} [count=5] - How many starter quests to return
 * @returns {Array}
 */
export function getStarterMissions(count = 5) {
  const shuffled = [...MISSION_TEMPLATES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default MISSION_TEMPLATES;
