import { useState, useEffect } from 'react';
import api from './api.js';

export default function Shop({ shopItems, inventory, char, onBought, sfx }) {
  const [tab, setTab] = useState('food');
  const [buying, setBuying] = useState(null);

  const filtered = shopItems.filter(i => i.type === tab);

  const doBuy = async (item) => {
    if (buying) return;
    if (!char || char.gold < item.cost) {
      alert(`Not enough gold! Need ${item.cost}, have ${char?.gold || 0}`);
      return;
    }
    setBuying(item.id);
    try {
      const { data } = await api.post('/shop/buy', { itemId: item.id, quantity: 1 });
      sfx('click');
      onBought(data);
    } catch(e) {
      alert(e.response?.data?.error || 'Purchase failed');
    } finally { setBuying(null); }
  };

  const getOwned = (id) => shopItems.find(i=>i.id===id)?.owned || inventory.find(i=>i.itemId===id)?.quantity || 0;

  return (
    <div className="shop-view">
      <div className="board-header">
        <div className="board-title">🛒 &nbsp;The Grand Market</div>
        <div style={{fontFamily:'var(--font-heading)',fontSize:'0.85rem',color:'var(--gold)'}}>
          💰 {char?.gold || 0} Gold Available
        </div>
      </div>

      <div className="shop-tabs">
        {[['food','🍖 Food'],['decoration','🪴 Decoration'],['house','🏠 House']].map(([t,l]) => (
          <button key={t} className={`shop-tab-btn ${tab===t?'active':''}`} onClick={() => { sfx('click'); setTab(t); }}>{l}</button>
        ))}
      </div>

      <div style={{marginBottom:'1rem',fontSize:'0.72rem',color:'var(--text-muted)',fontFamily:'var(--font-heading)'}}>
        {tab==='food' && '🍖 Food fills your pet\'s hunger and happiness — needed to grow into an adult!'}
        {tab==='decoration' && '🪴 Decorate your pet\'s den to make them happier!'}
        {tab==='house' && '🏠 Give your pet a proper home — from a cozy cave to a floating palace!'}
      </div>

      <div className="shop-grid">
        {filtered.map(item => {
          const owned = getOwned(item.id);
          const canAfford = char && char.gold >= item.cost;
          return (
            <div key={item.id} className="shop-item-card">
              <span className="shop-item-emoji">{item.emoji}</span>
              <div className="shop-item-name">{item.name}</div>
              <div className="shop-item-desc">{item.description}</div>
              {item.type === 'food' && (
                <div className="shop-item-boosts">
                  {item.hungerBoost > 0 && <span className="boost-tag hunger">+{item.hungerBoost} Hunger</span>}
                  {item.happinessBoost > 0 && <span className="boost-tag happy">+{item.happinessBoost} Happy</span>}
                </div>
              )}
              <div className="shop-item-cost">💰 {item.cost} Gold</div>
              {owned > 0 && <div className="shop-item-owned">✅ Owned: {owned}</div>}
              <button
                className="shop-buy-btn"
                onClick={() => doBuy(item)}
                disabled={!canAfford || buying === item.id}
              >
                {buying === item.id ? '⏳ Buying...' : canAfford ? '🛒 Buy' : '❌ Too Poor'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
