import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// ── Error Boundary — prevents full black screen on uncaught errors ─────────────
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('💥 React error:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight:'100vh', display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center',
          background:'#0a0812', color:'#e0c97f', fontFamily:'serif', gap:'1rem', padding:'2rem'
        }}>
          <div style={{fontSize:'3rem'}}>⚔️</div>
          <div style={{fontSize:'1.4rem', fontWeight:'bold'}}>Something went wrong</div>
          <div style={{fontSize:'0.9rem', color:'#a0a0c0', maxWidth:'400px', textAlign:'center'}}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop:'1rem', padding:'0.6rem 1.5rem', background:'#e0c97f22',
              border:'1px solid #e0c97f55', color:'#e0c97f', borderRadius:'8px',
              cursor:'pointer', fontFamily:'serif', fontSize:'1rem'
            }}
          >🔄 Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
