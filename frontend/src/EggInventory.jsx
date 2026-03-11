import { useState, useEffect } from 'react';
import api from './api.js';

const PHASE = { idle:'idle', shaking:'shaking', cracking:'cracking', reveal:'reveal' };

function EggHatchModal({ egg, onClose, onHatched, sfx }) {
  const [phase, setPhase] = useState(PHASE.shaking);
  const [result, setResult] = useState(null);
  const v = egg.variant;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(PHASE.cracking), 1200);
    const t2 = setTimeout(async () => {
      try {
        const { data } = await api.post(`/eggs/hatch/${egg._id}`);
        setResult(data);
        setPhase(PHASE.reveal);
        sfx('egg');
      } catch(e) {
        onClose();
      }
    }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="egg-hatch-overlay" onClick={phase===PHASE.reveal ? () => { onHatched(result); onClose(); } : undefined}>
      <div className="egg-hatch-card">
        {phase !== PHASE.reveal ? (
          <>
            <div className="egg-hatch-phase">{phase===PHASE.shaking ? '🥚 Something is moving...' : '💥 It\'s cracking!'}</div>
            <span className={`egg-hatch-emoji ${phase===PHASE.shaking?'egg-shaking':'egg-cracking'}`}>{v?.emoji||'🥚'}</span>
            <span className={`egg-rarity-badge ${v?.rarity}`}>{v?.rarity}</span>
            <div className="egg-hatch-name">{v?.name}</div>
          </>
        ) : (
          <>
            <div className="egg-hatch-phase">🎉 Pet Hatched!</div>
            <span className="egg-rarity-badge legendary" style={{marginBottom:'0.6rem'}}>{v?.rarity} · {v?.species}</span>
            <span className="egg-reveal-emoji">{v?.babyEmoji || '🐣'}</span>
            <div className="egg-hatch-name">{v?.adultName}</div>
            <div className="egg-hatch-species">{v?.species}</div>
            <div className="egg-hatch-hint">Click to meet your new companion!</div>
          </>
        )}
      </div>
    </div>
  );
}

export default function EggInventory({ eggs, onRefresh, sfx, onTabChange }) {
  const [hatchingEgg, setHatchingEgg] = useState(null);

  const handleHatched = () => { onRefresh(); onTabChange('sanctuary'); };

  const rarityOrder = { legendary:0, epic:1, rare:2, common:3 };
  const sorted = [...eggs].sort((a,b) => (rarityOrder[a.variant?.rarity]||3) - (rarityOrder[b.variant?.rarity]||3));

  return (
    <div className="egg-view">
      <div className="board-header">
        <div className="board-title">🥚 &nbsp;Egg Collection</div>
        <div style={{fontSize:'0.72rem',color:'var(--text-muted)',fontFamily:'var(--font-heading)'}}>
          {eggs.length} egg{eggs.length!==1?'s':''} · Complete quests to earn more!
        </div>
      </div>

      {eggs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🥚</div>
          <div style={{fontFamily:'var(--font-heading)',color:'var(--gold-dim)',marginBottom:'0.4rem'}}>No Eggs Yet</div>
          <p>Complete quests to earn surprise eggs. Harder quests = rarer pets!</p>
          <button className="submit-btn" style={{width:'auto',marginTop:'1rem',padding:'0.5rem 1.5rem'}} onClick={()=>onTabChange('quests')}>
            ⚔️ Go to Quest Board
          </button>
        </div>
      ) : (
        <>
          <div style={{display:'flex',gap:'1rem',marginBottom:'1rem',flexWrap:'wrap'}}>
            {['legendary','epic','rare','common'].map(r => {
              const cnt = eggs.filter(e=>e.variant?.rarity===r).length;
              if (!cnt) return null;
              return <span key={r} className={`egg-rarity-badge ${r}`}>{cnt} {r}</span>;
            })}
          </div>
          <div className="egg-grid">
            {sorted.map(egg => (
              <div key={egg._id} className={`egg-card ${egg.variant?.rarity||'common'}`} onClick={() => { sfx('click'); setHatchingEgg(egg); }}>
                <span className="egg-card-emoji">{egg.variant?.emoji||'🥚'}</span>
                <div className="egg-card-name">{egg.variant?.name||'Mystery Egg'}</div>
                <div className={`egg-card-rarity ${egg.variant?.rarity}`}>{egg.variant?.rarity}</div>
                <div className="egg-card-tap">Tap to Hatch!</div>
              </div>
            ))}
          </div>
        </>
      )}

      {hatchingEgg && (
        <EggHatchModal egg={hatchingEgg} onClose={()=>setHatchingEgg(null)} onHatched={handleHatched} sfx={sfx} />
      )}
    </div>
  );
}
