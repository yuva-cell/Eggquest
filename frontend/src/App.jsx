import { useState, useEffect, useCallback, useRef } from 'react';
import api, { setAuthToken } from './api.js';
import { SFX, ParticleField, Toast, LevelUpOverlay, ZONES, DIFF_STARS } from './shared.jsx';
import AuthPage from './AuthPage.jsx';
import CharSidebar from './CharSidebar.jsx';
import QuestBoard from './QuestBoard.jsx';
import EggInventory from './EggInventory.jsx';
import PetSanctuary from './PetSanctuary.jsx';
import Shop from './Shop.jsx';

// ── World Map (inline) ────────────────────────────────────────────────────────
function WorldMap({ quests, stats, onZoneClick }) {
  const activeByZone = {};
  quests.filter(q=>q.status==='active').forEach(q=>{ activeByZone[q.zone]=(activeByZone[q.zone]||0)+1; });
  const nodes = [
    {id:'work',x:300,y:165,rx:82,ry:52},{id:'personal',x:525,y:305,rx:72,ry:46},
    {id:'health',x:175,y:345,rx:76,ry:49},{id:'learning',x:415,y:460,rx:74,ry:47},{id:'social',x:645,y:185,rx:70,ry:45},
  ];
  const paths = [[nodes[0],nodes[1]],[nodes[0],nodes[2]],[nodes[1],nodes[4]],[nodes[1],nodes[3]],[nodes[2],nodes[3]]];
  return (
    <div className="map-view">
      <div className="board-header"><div className="board-title">🗺️ &nbsp;The Realm Map</div><div style={{fontSize:'0.72rem',color:'var(--text-muted)',fontFamily:'var(--font-heading)'}}>Click a zone to filter quests</div></div>
      <div className="map-container">
        <svg viewBox="0 0 820 560" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="mapBg" cx="50%" cy="50%" r="70%"><stop offset="0%" stopColor="#1a1526"/><stop offset="100%" stopColor="#050408"/></radialGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="glow2"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            {Object.entries(ZONES).map(([k,z])=><radialGradient key={k} id={`zg-${k}`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={z.color} stopOpacity="0.45"/><stop offset="100%" stopColor={z.color} stopOpacity="0.03"/></radialGradient>)}
          </defs>
          <rect width="820" height="560" fill="url(#mapBg)"/>
          {Array.from({length:12}).map((_,i)=><line key={`h${i}`} x1="0" y1={i*50} x2="820" y2={i*50} stroke="rgba(201,151,42,0.04)" strokeWidth="1"/>)}
          {Array.from({length:17}).map((_,i)=><line key={`v${i}`} x1={i*50} y1="0" x2={i*50} y2="560" stroke="rgba(201,151,42,0.04)" strokeWidth="1"/>)}
          <ellipse cx="405" cy="285" rx="375" ry="245" fill="rgba(18,14,26,0.55)" stroke="rgba(201,151,42,0.07)" strokeWidth="1"/>
          {paths.map(([a,b],i)=><line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(201,151,42,0.18)" strokeWidth="1.5" strokeDasharray="6 4"/>)}
          {nodes.map(node=>{
            const z=ZONES[node.id], cnt=activeByZone[node.id]||0;
            const zs=stats?.byZone?.find(b=>b._id===node.id), total=zs?.count||0, done=zs?.completed||0, pct=total>0?Math.round((done/total)*100):0;
            return (
              <g key={node.id} style={{cursor:'pointer'}} onClick={()=>onZoneClick(node.id)} transform={`translate(${node.x},${node.y})`}>
                <ellipse rx={node.rx+22} ry={node.ry+16} fill={`url(#zg-${node.id})`}><animate attributeName="rx" values={`${node.rx+16};${node.rx+26};${node.rx+16}`} dur="3s" repeatCount="indefinite"/></ellipse>
                <ellipse rx={node.rx} ry={node.ry} fill={`${z.color}15`} stroke={z.color} strokeWidth="1.5" filter="url(#glow)"/>
                <text textAnchor="middle" y="-9" fill={z.color} fontSize="11" fontFamily="Cinzel,serif" fontWeight="700" filter="url(#glow)">{z.label}</text>
                <text textAnchor="middle" y="8" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="Cinzel,serif">{z.emoji} {cnt>0?`${cnt} Active`:'Peaceful'}</text>
                {total>0&&<text textAnchor="middle" y="22" fill={z.color} fontSize="9" fontFamily="Cinzel,serif" opacity="0.65">{pct}% Complete</text>}
                <circle r="5" fill={z.color} filter="url(#glow2)"><animate attributeName="r" values="4;8;4" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.2s" repeatCount="indefinite"/></circle>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ── Dashboard (inline) ────────────────────────────────────────────────────────
function Dashboard({ char, stats, quests }) {
  if (!char||!stats) return <div className="dashboard-view">{[1,2,3].map(i=><div key={i} className="shimmer" style={{height:'80px',marginBottom:'1rem'}}/>)}</div>;
  const recent = quests.filter(q=>q.status==='completed').sort((a,b)=>new Date(b.completedAt)-new Date(a.completedAt)).slice(0,6);
  return (
    <div className="dashboard-view">
      <div className="board-header"><div className="board-title">📊 &nbsp;Kingdom Ledger</div></div>
      <div className="stats-row">
        {[{icon:'⚔️',val:stats.active,label:'Active Quests',color:'var(--amber-bright)'},{icon:'✅',val:stats.completed,label:'Slain',color:'var(--emerald-bright)'},{icon:'💰',val:char.gold,label:'Gold',color:'var(--gold-bright)'},{icon:'⭐',val:char.level,label:'Level',color:'var(--gold)'},{icon:'✨',val:char.xp,label:'XP',color:'var(--sapphire-bright)'},{icon:'💀',val:char.totalFailed,label:'Failed',color:'var(--crimson-bright)'}].map((s,i)=>(
          <div key={i} className="stat-card"><div className="stat-card-icon">{s.icon}</div><div className="stat-card-val" style={{color:s.color}}>{s.val}</div><div className="stat-card-label">{s.label}</div></div>
        ))}
      </div>
      <div className="section-title">⚔️ Zone Progress</div>
      <div className="zone-progress-grid">
        {Object.entries(ZONES).map(([k,z])=>{
          const zs=stats.byZone?.find(b=>b._id===k),total=zs?.count||0,done=zs?.completed||0,pct=total>0?Math.round((done/total)*100):0;
          return (
            <div key={k} className="zone-progress-card">
              <div className="zone-progress-header"><span style={{fontSize:'1.2rem'}}>{z.emoji}</span><div><div style={{fontFamily:'var(--font-heading)',fontSize:'0.78rem',color:'var(--text-bright)'}}>{z.label}</div><div style={{fontSize:'0.6rem',color:'var(--text-muted)',fontFamily:'var(--font-heading)'}}>{done}/{total} complete</div></div><div style={{marginLeft:'auto',fontFamily:'var(--font-heading)',fontSize:'0.82rem',color:z.color}}>{pct}%</div></div>
              <div className="zone-progress-bar"><div className="zone-progress-fill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${z.color}66,${z.color})`}}/></div>
            </div>
          );
        })}
      </div>
      {recent.length>0&&(<><div className="section-title" style={{marginTop:'1.5rem'}}>🏆 Recent Victories</div><div style={{display:'flex',flexDirection:'column',gap:'0.4rem'}}>{recent.map(q=><div key={q._id} className="recent-row"><div><div style={{fontFamily:'var(--font-heading)',fontSize:'0.82rem',color:'var(--text-bright)'}}>{q.title}</div><div style={{fontSize:'0.65rem',color:'var(--text-muted)',fontStyle:'italic'}}>{ZONES[q.zone]?.label} · {DIFF_STARS[q.difficulty]}</div></div><div style={{textAlign:'right'}}><div style={{color:'var(--gold)',fontSize:'0.72rem',fontFamily:'var(--font-heading)'}}>+{q.xpReward} XP</div><div style={{color:'var(--gold-dim)',fontSize:'0.65rem',fontFamily:'var(--font-heading)'}}>+{q.goldReward} 💰</div></div></div>)}</div></>)}
    </div>
  );
}

// ── EGG AWARD POPUP ───────────────────────────────────────────────────────────
function EggAwardPopup({ eggs, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 4000); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="egg-award-popup">
      <div className="egg-award-card">
        <div className="egg-award-title">✨ Eggs Awarded!</div>
        <div className="egg-award-eggs">{eggs.map((e,i)=><span key={i} className="egg-award-egg">{e.emoji||'🥚'}</span>)}</div>
        <div className="egg-award-names">{eggs.map(e=>e.name||'Mystery Egg').join(' · ')}</div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [token, setToken]       = useState(() => localStorage.getItem('qh_token') || '');
  const [username, setUsername] = useState(() => localStorage.getItem('qh_user')  || '');
  const [tab, setTab]           = useState('quests');
  const [quests, setQuests]     = useState([]);
  const [char, setChar]         = useState(null);
  const [stats, setStats]       = useState(null);
  const [eggs, setEggs]         = useState([]);
  const [pets, setPets]         = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [toasts, setToasts]     = useState([]);
  const [levelUp, setLevelUp]   = useState(null);
  const [eggAward, setEggAward] = useState(null);
  const [soundOn, setSoundOn]   = useState(true);
  const [loading, setLoading]   = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toastId = useRef(0);

  useEffect(() => { setAuthToken(token); }, [token]);

  const sfx   = useCallback((type) => SFX.play(type, soundOn), [soundOn]);
  const toast  = useCallback((msg, type='info', icon='⚔️') => {
    const id = ++toastId.current;
    setToasts(t => [...t, {id, msg, type, icon}]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const fetchAll = useCallback(async () => {
    if (!token) return;
    try {
      const [q, c, s, e, p, sh, inv] = await Promise.all([
        api.get('/quests'), api.get('/character'), api.get('/stats'),
        api.get('/eggs'), api.get('/pets'),
        api.get('/shop'), api.get('/shop/inventory'),
      ]);
      setQuests(q.data); setChar(c.data); setStats(s.data);
      setEggs(e.data); setPets(p.data);
      setShopItems(sh.data); setInventory(inv.data);
    } catch(e) {
      if (e.response?.status === 401) handleLogout();
      else toast('Server unreachable. Is the backend running?', 'warning', '⚠️');
    } finally { setLoading(false); }
  }, [token]);

  useEffect(() => { if (token) fetchAll(); else setLoading(false); }, [fetchAll]);

  const handleAuth = ({ token:t, username:u }) => {
    localStorage.setItem('qh_token', t); localStorage.setItem('qh_user', u);
    setToken(t); setUsername(u);
  };
  const handleLogout = () => {
    localStorage.removeItem('qh_token'); localStorage.removeItem('qh_user');
    setToken(''); setUsername(''); setChar(null); setQuests([]); setStats(null);
    setEggs([]); setPets([]); setShopItems([]); setInventory([]);
  };

  const handleAdd = async (form) => {
    sfx('add');
    try {
      const { data } = await api.post('/quests', form);
      await fetchAll();
      toast(`Quest issued: "${data.title}"`, 'info', '📜');
    } catch(e) { toast('Failed to create quest', 'warning', '⚠️'); }
  };

  const handleComplete = async (id) => {
    sfx('complete');
    try {
      const { data } = await api.put(`/quests/${id}/complete`);
      setChar(data.character);
      if (data.eggsAwarded?.length) { sfx('egg'); setEggAward(data.eggsAwarded); }
      if (data.leveledUp) { sfx('levelup'); setLevelUp(data.character.level); }
      toast(`+${data.quest.xpReward} XP  +${data.quest.goldReward} Gold${data.eggsAwarded?.length?' + 🥚 Egg!':''}`, 'success', '✅');
      await fetchAll();
    } catch(e) { toast('Could not complete quest', 'warning', '⚠️'); }
  };

  const handleFail = async (id) => {
    sfx('fail');
    try {
      const { data } = await api.put(`/quests/${id}/fail`);
      setChar(data.character);
      toast('Quest abandoned. -10 HP. Press on, adventurer.', 'warning', '💔');
      await fetchAll();
    } catch(e) {}
  };

  const handleDelete = async (id) => {
    sfx('click'); await api.delete(`/quests/${id}`); await fetchAll();
  };
  const handleUpdate = async (upd) => { const { data } = await api.put('/character', upd); setChar(data); };

  if (!token) return <AuthPage onAuth={handleAuth} />;

  const navTabs = [
    { id:'quests',    label:'📜 Quests' },
    { id:'map',       label:'🗺️ Map' },
    { id:'eggs',      label:`🥚 Eggs${eggs.length>0?` (${eggs.length})`:''}` },
    { id:'sanctuary', label:`🐾 Sanctuary${pets.length>0?` (${pets.length})`:''}` },
    { id:'shop',      label:'🛒 Shop' },
    { id:'dashboard', label:'📊 Ledger' },
  ];

  const closeSidebar = () => setSidebarOpen(false);
  const handleTabChange = (id) => { setTab(id); closeSidebar(); };

  const mobileNavTabs = [
    { id:'quests',    icon:'📜', label:'Quests' },
    { id:'eggs',      icon:'🥚', label:'Eggs' },
    { id:'sanctuary', icon:'🐾', label:'Pets' },
    { id:'shop',      icon:'🛒', label:'Shop' },
    { id:'map',       icon:'🗺️', label:'Map' },
    { id:'dashboard', icon:'📊', label:'Ledger' },
  ];

  return (
    <>
      <ParticleField />
      <div className="app-shell">
        {/* Header */}
        <header className="header">
          <button className="hamburger-btn" onClick={()=>setSidebarOpen(o=>!o)} aria-label="Toggle sidebar">☰</button>
          <div className="header-logo"><span>⚔️</span>QuestHub</div>
          <nav className="header-nav">
            {navTabs.map(t => (
              <button key={t.id} className={`nav-btn ${tab===t.id?'active':''}`} onClick={()=>{ sfx('click'); handleTabChange(t.id); }}>{t.label}</button>
            ))}
          </nav>
          <div className="header-right">
            {char && <div className="header-gold">💰 {char.gold}</div>}
            {char && <div className="header-level">⭐ Lv.{char.level}</div>}
            {eggs.length > 0 && <div className="header-eggs" onClick={()=>handleTabChange('eggs')}>🥚 {eggs.length}</div>}
            <button className="sound-btn" onClick={()=>setSoundOn(s=>!s)}>{soundOn?'🔊':'🔇'}</button>
          </div>
        </header>

        {/* Sidebar overlay backdrop (mobile) */}
        {sidebarOpen && <div className={`sidebar-overlay open`} onClick={closeSidebar} />}

        {/* Sidebar */}
        <CharSidebar
          char={char} username={username} stats={stats} pets={pets} eggs={eggs}
          onUpdate={handleUpdate} onLogout={handleLogout} sfx={sfx}
          onTabChange={handleTabChange}
          sidebarOpen={sidebarOpen}
          onSidebarClose={closeSidebar}
        />

        {/* Main */}
        <main className="main-content">
          {tab==='quests'    && <QuestBoard quests={quests} onAdd={handleAdd} onComplete={handleComplete} onFail={handleFail} onDelete={handleDelete} sfx={sfx} loading={loading} />}
          {tab==='map'       && <WorldMap quests={quests} stats={stats} onZoneClick={()=>{ sfx('click'); handleTabChange('quests'); }} />}
          {tab==='eggs'      && <EggInventory eggs={eggs} onRefresh={fetchAll} sfx={sfx} onTabChange={handleTabChange} />}
          {tab==='sanctuary' && <PetSanctuary pets={pets} inventory={inventory} onRefresh={fetchAll} sfx={sfx} onTabChange={handleTabChange} onError={(m)=>toast(m,'warning','⚠️')} />}
          {tab==='shop'      && <Shop shopItems={shopItems} inventory={inventory} char={char} onBought={()=>{ toast('Purchase successful!','success','🛒'); fetchAll(); }} sfx={sfx} onError={(m)=>toast(m,'warning','⚠️')} />}
          {tab==='dashboard' && <Dashboard char={char} stats={stats} quests={quests} />}
        </main>

        {/* Mobile bottom nav */}
        <nav className="mobile-nav">
          <div className="mobile-nav-inner">
            {mobileNavTabs.map(t => (
              <button key={t.id} className={`mobile-nav-btn ${tab===t.id?'active':''}`} onClick={()=>{ sfx('click'); handleTabChange(t.id); }}>
                <span className="mnav-icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {levelUp  && <LevelUpOverlay level={levelUp} onDone={()=>setLevelUp(null)} />}
      {eggAward && <EggAwardPopup eggs={eggAward} onDone={()=>setEggAward(null)} />}
      <Toast toasts={toasts} />
    </>
  );
}
