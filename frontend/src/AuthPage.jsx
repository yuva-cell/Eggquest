import { useState } from 'react';
import api from './api.js';
import { SFX, ParticleField } from './shared.jsx';

export default function AuthPage({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ username:'', email:'', password:'' });
  const set = (k,v) => { setForm(f => ({...f,[k]:v})); setError(''); };

  const handleSubmit = async () => {
    setLoading(true); setError('');
    try {
      const url  = mode==='login' ? '/auth/login' : '/auth/register';
      const body = mode==='login'
        ? { email:form.email, password:form.password }
        : { username:form.username, email:form.email, password:form.password };
      const { data } = await api.post(url, body);
      SFX.play('login', true);
      onAuth(data);
    } catch (err) {
      console.error('[Auth error]', err);
      if (err.response?.data?.error) {
        // Server responded with an error message (e.g. "Email already registered")
        setError(err.response.data.error);
      } else if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Cannot reach the server. Check your internet or try again shortly.');
      } else {
        setError(`Error: ${err.message || 'Something went wrong. Please try again.'}`);
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <ParticleField />
      <div className="auth-card">
        <div className="auth-logo">⚔️ QuestHub</div>
        <div className="auth-sub">Real-Life RPG · Pet Companions</div>
        <div className="auth-toggle">
          <button className={`auth-toggle-btn ${mode==='login'?'active':''}`} onClick={() => { setMode('login'); setError(''); }}>⚔️ Login</button>
          <button className={`auth-toggle-btn ${mode==='register'?'active':''}`} onClick={() => { setMode('register'); setError(''); }}>🌟 Register</button>
        </div>
        {error && <div className="auth-error">⚠️ &nbsp;{error}</div>}
        {mode==='register' && (
          <div className="form-group">
            <label className="form-label">Hero Name</label>
            <input className="form-input" value={form.username} onChange={e=>set('username',e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSubmit()} placeholder="YourHeroName" autoFocus />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" value={form.email} onChange={e=>set('email',e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSubmit()} placeholder="hero@realm.com" autoFocus={mode==='login'} />
        </div>
        <div className="form-group">
          <label className="form-label">Password {mode==='register'&&<span style={{color:'var(--text-muted)',fontWeight:'normal'}}>(min 6 chars)</span>}</label>
          <input className="form-input" type="password" value={form.password} onChange={e=>set('password',e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSubmit()} placeholder="••••••••" />
        </div>
        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? '⏳ Loading...' : mode==='login' ? '⚔️  Enter the Realm' : '🌟  Begin Your Legend'}
        </button>
        <div style={{textAlign:'center',marginTop:'1rem',fontSize:'0.72rem',color:'var(--text-muted)',fontFamily:'var(--font-heading)'}}>
          {mode==='login'
            ? <><span>No account? </span><span className="auth-link" onClick={()=>setMode('register')}>Register here</span></>
            : <><span>Have an account? </span><span className="auth-link" onClick={()=>setMode('login')}>Login here</span></>}
        </div>
      </div>
    </div>
  );
}
