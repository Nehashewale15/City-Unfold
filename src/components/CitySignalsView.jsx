import React, { useState } from 'react';
import { 
  CloudRain, AlertTriangle, CheckCircle, Info, Construction, 
  MapPin, Clock, Plus, ShieldAlert, Sparkles, Send 
} from 'lucide-react';
import { SAMPLE_CITY_SIGNALS } from '../data/puneData';

export default function CitySignalsView() {
  const [signals, setSignals] = useState(SAMPLE_CITY_SIGNALS);
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);

  // New report form state
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState('traffic');
  const [newDesc, setNewDesc] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const filteredSignals = signals.filter(sig => {
    if (filterType === 'all') return true;
    return sig.type === filterType;
  });

  const handleCreateReport = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) return;

    const newSignal = {
      id: `sig-${Date.now()}`,
      type: newCategory,
      severity: newCategory === 'weather' ? 'warning' : newCategory === 'hazard' ? 'alert' : 'info',
      title: `DEMO CITIZEN REPORT: ${newTitle}`,
      location: newLocation,
      timestamp: 'Just now (Simulated Feed)',
      source: 'Judge / Visitor Demo Input',
      description: newDesc || 'User reported observation during active exploration testing.',
      impact: 'Simulated localized impact.',
      recommendedAction: 'Proceed with caution or choose Plan B alternative.'
    };

    setSignals([newSignal, ...signals]);
    setShowModal(false);
    setNewTitle('');
    setNewLocation('');
    setNewDesc('');
    setSubmittedNotice(true);
    setTimeout(() => setSubmittedNotice(false), 5000);
  };

  return (
    <div className="signals-view-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>
            City Signals & Citizen Reports
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '750px' }}>
            Real-time urban intelligence for Pune: monsoon updates, road works, cleanliness audits, 
            and crowd congestion advisories. Every card is marked with simulation sources for hackathon transparency.
          </p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="nav-cta-btn"
        >
          <Plus size={16} /> Submit Simulated Report
        </button>
      </div>

      {submittedNotice && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '10px',
          padding: '0.85rem 1.25rem',
          color: '#6ee7b7',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontSize: '0.88rem'
        }}>
          <CheckCircle size={18} />
          Your demo report has been added to the simulated signals feed!
        </div>
      )}

      {/* Filter Tabs */}
      <div className="category-pills-row">
        {[
          { id: 'all', label: 'All Signals' },
          { id: 'weather', label: '🌧️ Weather Alerts' },
          { id: 'traffic', label: '🚗 Traffic & Transit' },
          { id: 'civic', label: '🚧 Infrastructure Works' },
          { id: 'hazard', label: '⚠️ Crowd & Hazards' },
          { id: 'cleanliness', label: '✨ Cleanliness Drives' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilterType(cat.id)}
            className={`category-pill ${filterType === cat.id ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Signals List */}
      <div className="signals-feed-list">
        {filteredSignals.map(sig => {
          const Icon = 
            sig.type === 'weather' ? CloudRain :
            sig.type === 'traffic' ? AlertTriangle :
            sig.type === 'civic' ? Construction :
            sig.type === 'cleanliness' ? Sparkles : ShieldAlert;

          return (
            <div key={sig.id} className={`signal-card ${sig.severity}`}>
              <div className="signal-icon-box">
                <Icon size={22} color={
                  sig.severity === 'warning' ? '#ef4444' :
                  sig.severity === 'alert' ? '#f59e0b' :
                  sig.severity === 'success' ? '#10b981' : '#38bdf8'
                } />
              </div>

              <div className="signal-content">
                <div className="signal-header-row">
                  <div className="signal-title">{sig.title}</div>
                  <div className="signal-time">
                    <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {sig.timestamp}
                  </div>
                </div>

                <div className="signal-desc">
                  {sig.description}
                </div>

                <div style={{
                  background: 'rgba(15, 23, 42, 0.4)',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '6px',
                  marginBottom: '0.75rem',
                  fontSize: '0.78rem',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <div style={{ color: '#cbd5e1' }}><strong>Expected Impact:</strong> {sig.impact}</div>
                  <div style={{ color: '#38bdf8', marginTop: '2px' }}><strong>Recommended Action:</strong> {sig.recommendedAction}</div>
                </div>

                <div className="signal-meta-row">
                  <div>
                    <MapPin size={13} style={{ display: 'inline', marginRight: '3px' }} />
                    {sig.location}
                  </div>
                  <div>
                    Source: <span style={{ color: '#cbd5e1' }}>{sig.source}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Report Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px', padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.4rem' }}>
              Submit Simulated Citizen Report
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
              Test submitting a live report. Will be tagged with demo labels and immediately visible in the active session.
            </p>

            <form onSubmit={handleCreateReport} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Report Title
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Waterlogged underpass near Deccan Chowk" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="search-input"
                  style={{ padding: '0.65rem 0.85rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Location in Pune
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. FC Road near Vaishali Restaurant" 
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  className="search-input"
                  style={{ padding: '0.65rem 0.85rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Category
                </label>
                <select 
                  value={newCategory} 
                  onChange={e => setNewCategory(e.target.value)}
                  className="search-input"
                  style={{ padding: '0.65rem 0.85rem', background: '#1e293b' }}
                >
                  <option value="traffic">Traffic Bottleneck</option>
                  <option value="weather">Weather / Rain Inundation</option>
                  <option value="hazard">Safety / Crowd Surge</option>
                  <option value="cleanliness">Cleanliness Observation</option>
                  <option value="civic">Road Maintenance</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Details & Observations
                </label>
                <textarea 
                  rows={3}
                  placeholder="Briefly describe what you observed..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="search-input"
                  style={{ padding: '0.65rem 0.85rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{ padding: '0.6rem 1rem', borderRadius: '8px', color: '#94a3b8' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="nav-cta-btn"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Send size={14} /> Submit Demo Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
