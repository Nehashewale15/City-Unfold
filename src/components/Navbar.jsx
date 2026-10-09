import React from 'react';
import { 
  Compass, MapPin, Sparkles, Scale, BellRing, 
  Layers, RotateCcw, ArrowRight 
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  itineraryCount, 
  totalCost, 
  compareCount, 
  onResetAll 
}) {
  return (
    <header className="navbar">
      <div className="brand-section">
        <div className="brand-logo" onClick={() => setActiveTab('explore')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">
            <Compass size={20} color="#fff" />
          </div>
          <span>CityShift</span>
        </div>

        <div className="city-badge">
          <span className="pulse-dot"></span>
          <span>Pune, MH</span>
          <span style={{ opacity: 0.6 }}>• Demo Mode</span>
        </div>
      </div>

      {/* Center Navigation Tabs */}
      <nav className="nav-tabs">
        <button 
          onClick={() => setActiveTab('explore')}
          className={`nav-tab-btn ${activeTab === 'explore' ? 'active' : ''}`}
        >
          <Layers size={15} /> Explore & Map
        </button>

        <button 
          onClick={() => setActiveTab('planb')}
          className={`nav-tab-btn ${activeTab === 'planb' ? 'active' : ''}`}
        >
          <Sparkles size={15} color={activeTab === 'planb' ? '#fff' : '#818cf8'} />
          <span>Smart Plan B Engine</span>
          {itineraryCount > 0 && (
            <span className="badge-counter">{itineraryCount}</span>
          )}
        </button>

        <button 
          onClick={() => setActiveTab('compare')}
          className={`nav-tab-btn ${activeTab === 'compare' ? 'active' : ''}`}
        >
          <Scale size={15} />
          <span>Compare</span>
          {compareCount > 0 && (
            <span className="badge-counter">{compareCount}</span>
          )}
        </button>

        <button 
          onClick={() => setActiveTab('signals')}
          className={`nav-tab-btn ${activeTab === 'signals' ? 'active' : ''}`}
        >
          <BellRing size={15} />
          <span>City Signals</span>
          <span className="badge-counter" style={{ background: 'rgba(239, 68, 68, 0.4)' }}>5</span>
        </button>
      </nav>

      {/* Right Action / Itinerary Quick View */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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
          title="Reset demo data to factory defaults"
        >
          <RotateCcw size={15} />
        </button>
      </div>
    </header>
  );
}
