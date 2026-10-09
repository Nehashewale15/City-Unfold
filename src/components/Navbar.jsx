import React from 'react';
import { 
  Compass, MapPin, Sparkles, Scale, BellRing, 
  Layers, RotateCcw, ArrowRight, Bookmark, Star 
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  itineraryCount, 
  totalCost, 
  compareCount, 
  bookmarkedCount = 0,
  onResetAll 
}) {
  return (
    <header className="navbar">
      <div className="brand-section">
        <div className="brand-logo" onClick={() => setActiveTab('explore')}>
          <div className="brand-icon">
            <Compass size={20} color="#fff" />
          </div>
          <span style={{ letterSpacing: '-0.02em' }}>CityShift</span>
        </div>

        <div className="city-badge">
          <span className="pulse-dot"></span>
          <span>Pune, MH</span>
          <span style={{ opacity: 0.6 }}>• Editorial Beta</span>
        </div>
      </div>

      {/* Center Navigation Tabs */}
      <nav className="nav-tabs">
        <button 
          onClick={() => setActiveTab('explore')}
          className={`nav-tab-btn ${activeTab === 'explore' ? 'active' : ''}`}
        >
          <Layers size={14} /> Explore & Map
        </button>

        <button 
          onClick={() => setActiveTab('gems')}
          className={`nav-tab-btn ${activeTab === 'gems' ? 'active hidden-gems-tab' : ''}`}
          style={{ color: activeTab === 'gems' ? '#fef08a' : undefined }}
        >
          <Star size={14} fill={activeTab === 'gems' ? '#f59e0b' : 'none'} color="#f59e0b" />
          <span>Hidden Gems</span>
        </button>

        <button 
          onClick={() => setActiveTab('planb')}
          className={`nav-tab-btn ${activeTab === 'planb' ? 'active' : ''}`}
        >
          <Sparkles size={14} color={activeTab === 'planb' ? '#f59e0b' : 'var(--text-muted)'} />
          <span>Plan B Engine</span>
          {itineraryCount > 0 && (
            <span className="badge-counter">{itineraryCount}</span>
          )}
        </button>

        <button 
          onClick={() => setActiveTab('compare')}
          className={`nav-tab-btn ${activeTab === 'compare' ? 'active' : ''}`}
        >
          <Scale size={14} />
          <span>Compare</span>
          {compareCount > 0 && (
            <span className="badge-counter">{compareCount}</span>
          )}
        </button>

        <button 
          onClick={() => setActiveTab('signals')}
          className={`nav-tab-btn ${activeTab === 'signals' ? 'active' : ''}`}
        >
          <BellRing size={14} />
          <span>City Signals</span>
          <span className="badge-counter" style={{ background: 'rgba(239, 68, 68, 0.4)' }}>5</span>
        </button>
      </nav>

      {/* Right Actions: Travel Journal & Itinerary Quick View */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        {bookmarkedCount > 0 && (
          <button 
            onClick={() => setActiveTab('gems')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid var(--border-amber-line)',
              color: '#fde68a',
              fontSize: '0.78rem',
              fontWeight: 600
            }}
            title="Saved places in Travel Journal"
          >
            <Bookmark size={13} fill="#f59e0b" color="#f59e0b" />
            <span>Journal ({bookmarkedCount})</span>
          </button>
        )}

        <button 
          onClick={() => setActiveTab('planb')}
          className="nav-cta-btn"
          title="Open Plan B Outing Engine"
        >
          <span>Outing: {itineraryCount} spots</span>
          <span style={{ opacity: 0.85, fontSize: '0.78rem' }}>• ₹{totalCost}</span>
          <ArrowRight size={14} />
        </button>

        <button 
          onClick={onResetAll}
          className="btn-icon-action"
          title="Reset demo data to defaults"
        >
          <RotateCcw size={15} />
        </button>
      </div>
    </header>
  );
}
