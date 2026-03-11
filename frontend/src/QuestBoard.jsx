import { useState } from 'react';
import { ZONES, DIFF_STARS } from './shared.jsx';

function AddQuestModal({ onClose, onAdd, initialZone }) {
  const [form, setForm] = useState({ title:'', description:'', zone:initialZone!=='all'?initialZone:'personal', difficulty:'medium', dueDate:'' });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div className="modal-title">⚔️ &nbsp;Issue New Quest</div>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="form-group">
          <label className="form-label">Quest Title *</label>
          <input className="form-input" value={form.title} onChange={e=>set('title',e.target.value)} placeholder="Vanquish the Morning Report..." autoFocus />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-textarea" value={form.description} onChange={e=>set('description',e.target.value)} placeholder="Details of the quest..." />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Zone</label>
            <select className="form-select" value={form.zone} onChange={e=>set('zone',e.target.value)}>
              {Object.entries(ZONES).map(([k,z])=><option key={k} value={k}>{z.emoji} {k.charAt(0).toUpperCase()+k.slice(1)}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Difficulty</label>
            <select className="form-select" value={form.difficulty} onChange={e=>set('difficulty',e.target.value)}>
              <option value="trivial">Trivial ★ (20% egg)</option>
              <option value="easy">Easy ★★ (35% egg)</option>
              <option value="medium">Medium ★★★ (55% egg)</option>
              <option value="hard">Hard ★★★★ (100% egg!)</option>
              <option value="legendary">Legendary ★★★★★ (2 eggs!)</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Due Date (optional)</label>
          <input className="form-input" type="date" value={form.dueDate} onChange={e=>set('dueDate',e.target.value)} />
        </div>
        <button className="submit-btn" onClick={()=>{ if(!form.title.trim()) return; onAdd(form); onClose(); }}>⚔️ &nbsp;Accept Quest</button>
      </div>
    </div>
  );
}

function QuestCard({ quest, onComplete, onFail, onDelete, sfx }) {
  const z = ZONES[quest.zone]||ZONES.personal;
  const isActive = quest.status==='active';
  return (
    <div className={`quest-card ${quest.zone} ${quest.status}`} style={{borderColor:isActive?`${z.color}30`:undefined}} onMouseEnter={()=>sfx('hover')}>
      <div className="quest-card-top">
        <div className="quest-card-title">{quest.title}</div>
        <div className={`difficulty-badge diff-${quest.difficulty}`}>{DIFF_STARS[quest.difficulty]}</div>
      </div>
      {quest.description && <div className="quest-desc">{quest.description}</div>}
      <div className="quest-rewards">
        <div className="reward-item reward-xp">✨ {quest.xpReward} XP</div>
        <div className="reward-item reward-gold">💰 {quest.goldReward} Gold</div>
        <div className="reward-item" style={{color:z.color}}>{z.emoji} {quest.zone}</div>
      </div>
      {quest.dueDate && <div className="quest-due">📅 {new Date(quest.dueDate).toLocaleDateString()}</div>}
      {isActive && (
        <div className="quest-actions">
          <button className="quest-btn quest-btn-complete" onClick={()=>onComplete(quest._id)}>✓ Complete</button>
          <button className="quest-btn quest-btn-fail" onClick={()=>onFail(quest._id)}>✗ Abandon</button>
          <button className="quest-btn quest-btn-delete" onClick={()=>onDelete(quest._id)}>🗑</button>
        </div>
      )}
      {quest.status==='completed' && <div className="quest-stamp stamp-done">✓ DONE</div>}
      {quest.status==='failed'    && <div className="quest-stamp stamp-fail">✗ FAILED</div>}
    </div>
  );
}

export default function QuestBoard({ quests, onAdd, onComplete, onFail, onDelete, sfx, loading }) {
  const [filterZone, setFilterZone] = useState('all');
  const [filterStatus, setFilterStatus] = useState('active');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = quests.filter(q => {
    const zOk = filterZone==='all'||q.zone===filterZone;
    const sOk = filterStatus==='all'||q.status===filterStatus;
    return zOk&&sOk;
  });

  return (
    <div className="board-view">
      <div className="board-header">
        <div className="board-title">📜 &nbsp;Quest Board</div>
        <button className="add-quest-btn" onClick={()=>{sfx('click');setShowAdd(true);}}>+ Issue Quest</button>
      </div>
      <div className="filter-bar">
        <span className="filter-label">Zone:</span>
        {[['all','🌍 All'],...Object.entries(ZONES).map(([k,z])=>[k,`${z.emoji} ${k.charAt(0).toUpperCase()+k.slice(1)}`])].map(([k,l])=>(
          <button key={k} className={`filter-chip ${filterZone===k?'active':''}`} onClick={()=>{sfx('click');setFilterZone(k);}}>{l}</button>
        ))}
      </div>
      <div className="filter-bar">
        <span className="filter-label">Status:</span>
        {[['active','⚔️ Active'],['completed','✅ Completed'],['failed','💀 Failed'],['all','All']].map(([k,l])=>(
          <button key={k} className={`filter-chip ${filterStatus===k?'active':''}`} onClick={()=>{sfx('click');setFilterStatus(k);}}>{l}</button>
        ))}
      </div>
      {loading ? (
        <div>{[1,2,3].map(i=><div key={i} className="shimmer" style={{height:'90px',marginBottom:'0.7rem'}}/>)}</div>
      ) : filtered.length===0 ? (
        <div className="empty-state">
          <div className="empty-icon">⚔️</div>
          <div style={{fontFamily:'var(--font-heading)',color:'var(--gold-dim)',marginBottom:'0.4rem'}}>No Quests Found</div>
          <p>Issue your first quest to begin your legend.</p>
        </div>
      ) : (
        <div className="quest-columns">
          {['active','completed','failed'].map(status => {
            if (filterStatus!=='all'&&filterStatus!==status) return null;
            const col = filtered.filter(q=>q.status===status);
            const icons = {active:'⚔️',completed:'✅',failed:'💀'};
            return (
              <div key={status}>
                <div className="quest-column-header">{icons[status]} {status.charAt(0).toUpperCase()+status.slice(1)} ({col.length})</div>
                {col.map(q=><QuestCard key={q._id} quest={q} onComplete={onComplete} onFail={onFail} onDelete={onDelete} sfx={sfx}/>)}
                {col.length===0&&<div style={{fontSize:'0.68rem',color:'var(--text-muted)',fontStyle:'italic',fontFamily:'var(--font-heading)',padding:'0.8rem 0'}}>None yet</div>}
              </div>
            );
          })}
        </div>
      )}
      {showAdd && <AddQuestModal onClose={()=>setShowAdd(false)} onAdd={onAdd} initialZone={filterZone} />}
    </div>
  );
}
