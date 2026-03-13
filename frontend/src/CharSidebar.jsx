import { useState, useEffect } from 'react';
import { ZONES, CLASS_ICONS, TITLES } from './shared.jsx';

export default function CharSidebar({ char, username, stats, pets, eggs, onUpdate, onLogout, sfx, onTabChange, sidebarOpen, onSidebarClose }) {
  const [editingName, setEditingName] = useState(false);
  const [nameVal, setNameVal] = useState('');
  const [classIdx, setClassIdx] = useState(0);
  useEffect(() => { if (char) setNameVal(char.name); }, [char]);

  const saveName = () => { if (nameVal.trim()) onUpdate({ name:nameVal.trim() }); setEditingName(false); };
  const xpPct  = char ? Math.min(100, Math.round((char.xp/char.xpToNext)*100)) : 0;
  const hpPct  = char ? Math.round((char.hp/char.maxHp)*100) : 0;
  const hpColor= hpPct>60?'var(--emerald-bright)':hpPct>30?'var(--amber-bright)':'var(--crimson-bright)';

  if (!char) return (
    <div className={`sidebar${sidebarOpen?' open':''}`}>{[1,2,3].map(i=><div key={i} className="shimmer" style={{height:'60px',marginBottom:'0.7rem'}}/>)}</div>
  );

  const petCount  = pets?.length || 0;
  const eggCount  = eggs?.length || 0;
  const adultCount= pets?.filter(p=>p.stage==='adult').length || 0;

  const handleTabChange = (id) => { onTabChange(id); if (onSidebarClose) onSidebarClose(); };

  return (
    <div className={`sidebar${sidebarOpen?' open':''}`}>
      {/* Character Card */}
      <div className="char-card">
        <div className="char-avatar" onClick={() => { sfx('click'); setClassIdx(i=>(i+1)%CLASS_ICONS.length); }} title="Click to change class">
          <div className="char-avatar-ring" />
          {CLASS_ICONS[classIdx]}
        </div>
        {editingName ? (
          <input className="char-edit-input" value={nameVal} onChange={e=>setNameVal(e.target.value)} onBlur={saveName} onKeyDown={e=>e.key==='Enter'&&saveName()} autoFocus />
        ) : (
          <div className="char-name" onClick={()=>setEditingName(true)} title="Click to rename">{char.name}</div>
        )}
        <div className="char-title">{char.title}</div>
        <div className="char-level-badge">⚔️ LVL {char.level}</div>
        <div className="bar-wrap">
          <div className="bar-label"><span>EXP</span><span>{char.xp}/{char.xpToNext}</span></div>
          <div className="bar-track xp-track"><div className="bar-fill xp-fill" style={{width:`${xpPct}%`}} /></div>
        </div>
        <div className="bar-wrap">
          <div className="bar-label" style={{color:hpColor}}><span>HP</span><span>{char.hp}/{char.maxHp}</span></div>
          <div className="bar-track hp-track"><div className="bar-fill hp-fill" style={{width:`${hpPct}%`,background:hpColor}} /></div>
        </div>
        <div className="stats-grid">
          {[['⚔️','STR',char.strength],['📖','INT',char.intelligence],['🌀','AGI',char.agility],['🎭','CHA',char.charisma]].map(([icon,name,val])=>(
            <div key={name} className="stat-item">
              <span className="stat-icon">{icon}</span>
              <div className="stat-info"><span className="stat-name">{name}</span><span className="stat-val">{val}</span></div>
            </div>
          ))}
        </div>
        <div className="char-footer">
          <span>💰 {char.gold}</span>
          <span>✅ {char.totalCompleted}</span>
          <span>💀 {char.totalFailed}</span>
        </div>
      </div>

      {/* Pet & Egg Summary */}
      <div className="sidebar-box">
        <div className="sidebar-box-title">🐾 Companions</div>
        <div className="sidebar-stat-row" onClick={()=>handleTabChange('eggs')} style={{cursor:'pointer'}}>
          <span>🥚 Unhatched Eggs</span><span style={{color:'var(--rarity-rare)'}}>{eggCount}</span>
        </div>
        <div className="sidebar-stat-row" onClick={()=>handleTabChange('sanctuary')} style={{cursor:'pointer'}}>
          <span>🐣 Baby Pets</span><span style={{color:'var(--sapphire-bright)'}}>{petCount - adultCount}</span>
        </div>
        <div className="sidebar-stat-row" onClick={()=>handleTabChange('sanctuary')} style={{cursor:'pointer'}}>
          <span>🐉 Adult Pets</span><span style={{color:'var(--gold-bright)'}}>{adultCount}</span>
        </div>
      </div>

      {/* Zone Legend */}
      <div className="zone-legend">
        <div className="zone-legend-title">⚔️ Realm Zones</div>
        {Object.entries(ZONES).map(([k,z]) => {
          const zs = stats?.byZone?.find(b=>b._id===k);
          return (
            <div key={k} className="zone-item">
              <div className="zone-dot" style={{background:z.color}} />
              <span>{z.emoji} {k.charAt(0).toUpperCase()+k.slice(1)}</span>
              {zs?.count>0 && <span className="zone-count">{zs.completed}/{zs.count}</span>}
            </div>
          );
        })}
      </div>

      {/* Quest Summary */}
      <div className="sidebar-box">
        <div className="sidebar-box-title">📜 Quest Log</div>
        <div className="sidebar-stat-row"><span>🔥 Active</span><span style={{color:'var(--amber-bright)'}}>{stats?.active||0}</span></div>
        <div className="sidebar-stat-row"><span>✅ Completed</span><span style={{color:'var(--emerald-bright)'}}>{stats?.completed||0}</span></div>
        <div className="sidebar-stat-row"><span>💀 Failed</span><span style={{color:'var(--crimson-bright)'}}>{(stats?.total||0)-(stats?.active||0)-(stats?.completed||0)}</span></div>
      </div>

      <button className="logout-btn" onClick={onLogout}>🚪 &nbsp;Logout ({username})</button>
    </div>
  );
}
