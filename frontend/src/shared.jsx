import { useState, useEffect, useMemo } from 'react';

// ── SOUND ENGINE ──────────────────────────────────────────────────────────────
export const SFX = {
  ctx: null,
  init() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); },
  play(type, enabled = true) {
    if (!enabled) return;
    try {
      this.init();
      const ctx = this.ctx, now = ctx.currentTime;
      const plays = {
        complete: () => { [523,659,784,1047].forEach((f,i) => { const o=ctx.createOscillator(),g=ctx.createGain(); o.type='sine'; o.frequency.value=f; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.25,now+i*0.1); g.gain.exponentialRampToValueAtTime(0.001,now+i*0.1+0.5); o.start(now+i*0.1); o.stop(now+i*0.1+0.55); }); },
        levelup: () => { [392,494,587,784,987,1174,1568].forEach((f,i) => { const o=ctx.createOscillator(),g=ctx.createGain(); o.type=i%2===0?'square':'sine'; o.frequency.value=f; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.18,now+i*0.08); g.gain.exponentialRampToValueAtTime(0.001,now+i*0.08+0.55); o.start(now+i*0.08); o.stop(now+i*0.08+0.6); }); },
        fail: () => { [280,240,190].forEach((f,i) => { const o=ctx.createOscillator(),g=ctx.createGain(); o.type='sawtooth'; o.connect(g); g.connect(ctx.destination); o.frequency.setValueAtTime(f,now+i*0.13); o.frequency.linearRampToValueAtTime(f*0.55,now+i*0.13+0.22); g.gain.setValueAtTime(0.22,now+i*0.13); g.gain.exponentialRampToValueAtTime(0.001,now+i*0.13+0.32); o.start(now+i*0.13); o.stop(now+i*0.13+0.35); }); },
        click: () => { const o=ctx.createOscillator(),g=ctx.createGain(); o.type='sine'; o.frequency.value=880; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.08,now); g.gain.exponentialRampToValueAtTime(0.001,now+0.07); o.start(now); o.stop(now+0.08); },
        add: () => { [440,550,660].forEach((f,i) => { const o=ctx.createOscillator(),g=ctx.createGain(); o.type='triangle'; o.frequency.value=f; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.12,now+i*0.09); g.gain.exponentialRampToValueAtTime(0.001,now+i*0.09+0.28); o.start(now+i*0.09); o.stop(now+i*0.09+0.3); }); },
        login: () => { [330,440,550,660].forEach((f,i) => { const o=ctx.createOscillator(),g=ctx.createGain(); o.type='triangle'; o.frequency.value=f; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.15,now+i*0.07); g.gain.exponentialRampToValueAtTime(0.001,now+i*0.07+0.4); o.start(now+i*0.07); o.stop(now+i*0.07+0.45); }); },
        egg: () => { [660,880,1047,1320].forEach((f,i) => { const o=ctx.createOscillator(),g=ctx.createGain(); o.type=i%2===0?'triangle':'sine'; o.frequency.value=f; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.2,now+i*0.1); g.gain.exponentialRampToValueAtTime(0.001,now+i*0.1+0.5); o.start(now+i*0.1); o.stop(now+i*0.1+0.6); }); },
        evolve: () => { [330,440,550,660,784,880,1047,1568].forEach((f,i) => { const o=ctx.createOscillator(),g=ctx.createGain(); o.type=i%3===0?'square':'sine'; o.frequency.value=f; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.2,now+i*0.07); g.gain.exponentialRampToValueAtTime(0.001,now+i*0.07+0.5); o.start(now+i*0.07); o.stop(now+i*0.07+0.55); }); },
      };
      plays[type]?.();
    } catch(e) {}
  }
};

export const ZONES = {
  work:     { label:'The Iron Forge',      color:'#4a8fff', emoji:'⚒️' },
  personal: { label:'The Mystic Grove',    color:'#c060ff', emoji:'🌿' },
  health:   { label:'The Vitality Temple', color:'#2ecc71', emoji:'💚' },
  learning: { label:"The Scholar's Tower", color:'#ff9020', emoji:'📚' },
  social:   { label:'The Grand Tavern',    color:'#f0c040', emoji:'🍺' },
};
export const DIFF_STARS = { trivial:'★☆☆☆☆', easy:'★★☆☆☆', medium:'★★★☆☆', hard:'★★★★☆', legendary:'★★★★★' };
export const CLASS_ICONS = ['🧙','⚔️','🏹','🛡️','🔮','🗡️','👑','🦸','🧝','🧟'];
export const TITLES = ['The Beginner','The Apprentice','The Wanderer','The Fighter','The Brave','The Skilled','The Expert','The Veteran','The Champion','The Legend','The Mythic','The Immortal'];

export function ParticleField() {
  const particles = useMemo(() => Array.from({ length:30 }, (_,i) => ({
    id:i, left:`${Math.random()*100}%`,
    duration:`${9+Math.random()*14}s`, delay:`-${Math.random()*15}s`,
    size:Math.random()>0.8?'3px':'2px', drift:`${(Math.random()-0.5)*100}px`,
  })),[]);
  return (
    <div className="particle-field">
      {particles.map(p => (
        <div key={p.id} className="particle" style={{ left:p.left, width:p.size, height:p.size, animationDuration:p.duration, animationDelay:p.delay, '--drift':p.drift }} />
      ))}
    </div>
  );
}

export function Toast({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span className="toast-icon">{t.icon}</span>
          <span className="toast-msg">{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

export function LevelUpOverlay({ level, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="levelup-overlay" onClick={onDone}>
      <div className="levelup-card">
        <div className="levelup-rays" />
        <div className="levelup-title">⚔️ LEVEL UP ⚔️</div>
        <div className="levelup-num">{level}</div>
        <div className="levelup-title-text">{TITLES[Math.min(level-1, TITLES.length-1)]}</div>
        <div className="levelup-sub">A new power awakens within you</div>
        <div className="levelup-hint">Click to continue your journey</div>
      </div>
    </div>
  );
}

export function EvolveOverlay({ pet, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 4000); return () => clearTimeout(t); }, [onDone]);
  const v = pet?.variant;
  return (
    <div className="evolve-overlay" onClick={onDone}>
      <div className="evolve-card">
        <div className="evolve-rays" />
        <div className="evolve-title">✨ EVOLVED! ✨</div>
        <span className="evolve-emoji">{v?.adultEmoji || '🐉'}</span>
        <div className="evolve-name">{v?.adultName || pet?.name}</div>
        <div className="evolve-sub">Your pet has reached its final form!</div>
        <div className="evolve-hint">Click to continue</div>
      </div>
    </div>
  );
}
