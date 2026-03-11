import { useState } from 'react';
import api from './api.js';
import { EvolveOverlay } from './shared.jsx';

function PetCard({ pet, inventory, onFed, onRefresh, sfx }) {
  const [feeding, setFeeding] = useState(false);
  const [selectedFood, setSelectedFood] = useState('');
  const [evolvingPet, setEvolvingPet] = useState(null);
  const v = pet.variant;

  const foods = inventory.filter(i => i.item?.type === 'food' && i.quantity > 0);
  const emoji = pet.stage === 'adult' ? (v?.adultEmoji || '🐉') : (v?.babyEmoji || '🐣');
  const hungerPct = Math.min(100, pet.hunger || 0);
  const happyPct  = Math.min(100, pet.happiness || 0);
  const xpPct     = pet.stage === 'adult' ? 100 : Math.min(100, Math.round((pet.xp / pet.xpToEvolve) * 100));

  const doFeed = async () => {
    if (!selectedFood) return;
    try {
      const { data } = await api.post(`/pets/${pet._id}/feed`, { foodItemId: selectedFood });
      sfx('click');
      if (data.evolved) { sfx('evolve'); setEvolvingPet(data.pet); }
      setFeeding(false); setSelectedFood('');
      onFed(data.pet);
    } catch(e) {
      alert(e.response?.data?.error || 'Could not feed pet');
    }
  };

  return (
    <>
      <div className={`pet-card ${pet.stage}`}>
        {pet.stage === 'adult' && <div className="pet-evolved-tag">✨ Adult</div>}
        <div className="pet-stage-badge baby" style={pet.stage==='adult'?{display:'none'}:{}}>
          🐣 Baby · {xpPct}% to Adult
        </div>
        {pet.stage === 'baby' && <div className="pet-stage-badge baby" style={{display:'block'}}>🐣 Baby · {xpPct}%</div>}
        {pet.stage === 'adult' && <div className="pet-stage-badge adult">🐉 Adult</div>}

        <span className="pet-emoji">{emoji}</span>
        <div className="pet-name">{pet.name || v?.adultName}</div>
        <div className="pet-species">
          <span className={`pet-rarity-dot ${v?.rarity}`}></span>
          {v?.species} · {v?.rarity}
        </div>

        <div className="pet-bars">
          <div className="bar-wrap">
            <div className="bar-label"><span>🍖 Hunger</span><span>{pet.hunger}/100</span></div>
            <div className="bar-track hunger-track"><div className="bar-fill hunger-fill" style={{width:`${hungerPct}%`}} /></div>
          </div>
          <div className="bar-wrap">
            <div className="bar-label"><span>💖 Happiness</span><span>{pet.happiness}/100</span></div>
            <div className="bar-track happy-track"><div className="bar-fill happy-fill" style={{width:`${happyPct}%`}} /></div>
          </div>
          {pet.stage === 'baby' && (
            <div className="bar-wrap">
              <div className="bar-label"><span>⭐ Growth</span><span>{pet.xp}/{pet.xpToEvolve}</span></div>
              <div className="bar-track pet-xp-track"><div className="bar-fill pet-xp-fill" style={{width:`${xpPct}%`}} /></div>
            </div>
          )}
        </div>

        {pet.stage === 'baby' && !feeding && (
          <button className="pet-feed-btn" onClick={()=>setFeeding(true)}>🍖 Feed Pet</button>
        )}
        {pet.stage === 'baby' && feeding && (
          <>
            {foods.length === 0 ? (
              <div style={{fontSize:'0.65rem',color:'var(--text-muted)',fontFamily:'var(--font-heading)',textAlign:'center'}}>
                No food! Buy from Shop 🛒
              </div>
            ) : (
              <>
                <select className="pet-feed-select" value={selectedFood} onChange={e=>setSelectedFood(e.target.value)}>
                  <option value="">-- Pick food --</option>
                  {foods.map(f => (
                    <option key={f.itemId} value={f.itemId}>{f.item?.emoji} {f.item?.name} (×{f.quantity})</option>
                  ))}
                </select>
                <div style={{display:'flex',gap:'0.4rem'}}>
                  <button className="pet-feed-btn" onClick={doFeed} disabled={!selectedFood} style={{flex:1}}>✓ Feed</button>
                  <button className="pet-feed-btn" onClick={()=>setFeeding(false)} style={{flex:'0 0 auto',padding:'0.4rem 0.6rem',color:'var(--crimson-bright)',border:'1px solid rgba(220,50,50,0.3)'}}>✕</button>
                </div>
              </>
            )}
          </>
        )}
        {pet.stage === 'adult' && (
          <div style={{textAlign:'center',fontSize:'0.65rem',color:'var(--gold-dim)',fontFamily:'var(--font-heading)',fontStyle:'italic'}}>Fully evolved! 🏆</div>
        )}

        {pet.houseId && <div className="pet-home-badge">🏠 Has a home</div>}
        {pet.decorationId && <div className="pet-home-badge">🪴 Decorated</div>}
      </div>

      {evolvingPet && <EvolveOverlay pet={evolvingPet} onDone={() => { setEvolvingPet(null); onRefresh(); }} />}
    </>
  );
}

export default function PetSanctuary({ pets, inventory, onRefresh, sfx, onTabChange }) {
  const updatePet = (updated) => onRefresh();

  return (
    <div className="pet-view">
      <div className="board-header">
        <div className="board-title">🐾 &nbsp;Pet Sanctuary</div>
        <div style={{fontSize:'0.72rem',color:'var(--text-muted)',fontFamily:'var(--font-heading)'}}>
          {pets.length} companion{pets.length!==1?'s':''} · {pets.filter(p=>p.stage==='adult').length} adults
        </div>
      </div>

      {pets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🐾</div>
          <div style={{fontFamily:'var(--font-heading)',color:'var(--gold-dim)',marginBottom:'0.4rem'}}>No Pets Yet</div>
          <p>Hatch an egg to get your first companion!</p>
          <button className="submit-btn" style={{width:'auto',marginTop:'1rem',padding:'0.5rem 1.5rem'}} onClick={()=>onTabChange('eggs')}>
            🥚 Go to Egg Collection
          </button>
        </div>
      ) : (
        <div className="pet-grid">
          {pets.map(pet => (
            <PetCard key={pet._id} pet={pet} inventory={inventory} onFed={updatePet} onRefresh={onRefresh} sfx={sfx} />
          ))}
        </div>
      )}
    </div>
  );
}
