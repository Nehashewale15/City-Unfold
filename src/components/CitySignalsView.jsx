import React, { useState } from 'react';
import { 
  CloudRain, AlertTriangle, CheckCircle, Info, Construction, 
  MapPin, Clock, Plus, ShieldAlert, Sparkles, Send, Volume2, 
  VolumeX, Image, ThumbsUp, X, Play, Pause 
} from 'lucide-react';
import { SAMPLE_CITY_SIGNALS } from '../data/puneData';

export default function CitySignalsView() {
  const [signals, setSignals] = useState(SAMPLE_CITY_SIGNALS);
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  
  // Audio voice note simulation state
  const [activeVoiceNoteId, setActiveVoiceNoteId] = useState(null);
  const [showTranscriptId, setShowTranscriptId] = useState(null);

  // Expanded photo preview modal
  const [expandedPhoto, setExpandedPhoto] = useState(null);

  // User confirmed reports tracking
  const [confirmedIds, setConfirmedIds] = useState({});

  // New report form state
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState('traffic');
  const [newDesc, setNewDesc] = useState('');
  const [attachVoiceNote, setAttachVoiceNote] = useState(false);
  const [formError, setFormError] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const filteredSignals = signals.filter(sig => {
    if (filterType === 'all') return true;
    return sig.type === filterType;
  });

  const handleToggleVoiceNote = (id) => {
    if (activeVoiceNoteId === id) {
      setActiveVoiceNoteId(null);
    } else {
      setActiveVoiceNoteId(id);
      // Automatically show transcript when playing
      setShowTranscriptId(id);
    }
  };

  const handleConfirmSignal = (id) => {
    if (confirmedIds[id]) return; // already confirmed
    
    setConfirmedIds({ ...confirmedIds, [id]: true });
    setSignals(signals.map(s => {
      if (s.id === id) {
        return { ...s, confirmations: (s.confirmations || 0) + 1 };
      }
      return s;
    }));
  };

  const handleCreateReport = (e) => {
    e.preventDefault();
    setFormError('');

    if (newTitle.trim().length < 5) {
      setFormError('Report title must be at least 5 characters.');
      return;
    }
    if (newLocation.trim().length < 3) {
      setFormError('Please specify a valid Pune location or landmark.');
      return;
    }
    if (newDesc.trim().length < 10) {
      setFormError('Please provide at least 10 characters describing the situation.');
      return;
    }

    const newSignal = {
      id: `sig-${Date.now()}`,
      type: newCategory,
      severity: newCategory === 'weather' ? 'warning' : newCategory === 'hazard' ? 'alert' : 'info',
      title: `DEMO CITIZEN REPORT: ${newTitle.trim()}`,
      location: newLocation.trim(),
      timestamp: 'Just now (Simulated Feed)',
      source: 'Judge / Visitor Demo Input',
      description: newDesc.trim(),
      impact: 'Simulated localized impact.',
      recommendedAction: 'Proceed with caution or choose Plan B alternative.',
      confirmations: 1,
      photo: null,
      voiceNote: attachVoiceNote ? {
        duration: "0:12",
        speaker: "Judge Voice Note Demo",
        transcript: `Voice recording: "${newDesc.trim()}"`
      } : null
    };

    setSignals([newSignal, ...signals]);
    setShowModal(false);
    setNewTitle('');
    setNewLocation('');
    setNewDesc('');
    setAttachVoiceNote(false);
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
            Real-time urban intelligence for Pune: monsoon updates, road works, citizen photos, audio voice notes, 
            and crowd congestion advisories. Every record is marked with demo labels for hackathon transparency.
          </p>
        </div>

        <button 
          onClick={() => {
            setFormError('');
            setShowModal(true);
          }}
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
          Your demo report has been validated and added to the simulated signals feed!
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

          const isPlaying = activeVoiceNoteId === sig.id;
          const isTranscriptOpen = showTranscriptId === sig.id;
          const isConfirmed = confirmedIds[sig.id];

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

                {/* Photo & Voice Note Attachments Strip */}
                {(sig.photo || sig.voiceNote) && (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    flexWrap: 'wrap', 
                    marginBottom: '0.75rem', 
                    background: 'rgba(0,0,0,0.25)', 
                    padding: '0.6rem 0.85rem', 
                    borderRadius: '8px', 
                    border: '1px solid rgba(255,255,255,0.06)' 
                  }}>
                    {/* Photo Attachment Thumbnail */}
                    {sig.photo && (
                      <div 
                        onClick={() => setExpandedPhoto({ src: sig.photo, title: sig.title })}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                        title="Click to expand photo"
                      >
                        <img 
                          src={sig.photo} 
                          alt="Citizen attachment" 
                          onError={(e) => { e.target.style.display = 'none'; }}
                          style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.2)' }}
                        />
                        <div style={{ fontSize: '0.75rem', color: '#93c5fd' }}>
                          <Image size={13} style={{ display: 'inline', marginRight: '3px' }} />
                          Photo Verified (Click to enlarge)
                        </div>
                      </div>
                    )}

                    {/* Simulated Voice Note Player */}
                    {sig.voiceNote && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: '220px' }}>
                        <button
                          onClick={() => handleToggleVoiceNote(sig.id)}
                          style={{
                            background: isPlaying ? '#10b981' : 'rgba(99, 102, 241, 0.25)',
                            color: '#fff',
                            border: '1px solid rgba(99, 102, 241, 0.4)',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontWeight: 600
                          }}
                        >
                          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                          {isPlaying ? 'Playing Audio' : `Play Voice Note (${sig.voiceNote.duration})`}
                        </button>

                        {/* Animated waveform bars when playing */}
                        {isPlaying && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '16px' }}>
                            {[12, 18, 10, 16, 20, 14, 8].map((h, idx) => (
                              <span 
                                key={idx} 
                                style={{ 
                                  width: '3px', 
                                  height: `${h}px`, 
                                  background: '#10b981', 
                                  borderRadius: '2px',
                                  animation: 'pulse 1s infinite'
                                }} 
                              />
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() => setShowTranscriptId(isTranscriptOpen ? null : sig.id)}
                          style={{ fontSize: '0.72rem', color: '#94a3b8', textDecoration: 'underline' }}
                        >
                          {isTranscriptOpen ? 'Hide transcript' : 'Read transcript'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Voice Note Transcript Display */}
                {sig.voiceNote && isTranscriptOpen && (
                  <div style={{
                    background: 'rgba(99, 102, 241, 0.08)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: '6px',
                    padding: '0.5rem 0.75rem',
                    marginBottom: '0.75rem',
                    fontSize: '0.75rem',
                    color: '#c7d2fe'
                  }}>
                    <strong>🎙️ {sig.voiceNote.speaker}:</strong> "{sig.voiceNote.transcript}"
                  </div>
                )}

                {/* Impact & Action */}
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

                {/* Meta details & Upvote confirmation */}
                <div className="signal-meta-row" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div>
                      <MapPin size={13} style={{ display: 'inline', marginRight: '3px' }} />
                      {sig.location}
                    </div>
                    <div>
                      Source: <span style={{ color: '#cbd5e1' }}>{sig.source}</span>
                    </div>
                  </div>

                  {/* Citizen Confirmations */}
                  <button
                    onClick={() => handleConfirmSignal(sig.id)}
                    style={{
                      background: isConfirmed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      color: isConfirmed ? '#6ee7b7' : '#cbd5e1',
                      border: isConfirmed ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      cursor: isConfirmed ? 'default' : 'pointer'
                    }}
                    title={isConfirmed ? "You confirmed this report" : "Click to confirm this report"}
                  >
                    <ThumbsUp size={12} />
                    <span>{sig.confirmations || 0} Citizens Verified</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Photo Lightbox */}
      {expandedPhoto && (
        <div className="modal-overlay" onClick={() => setExpandedPhoto(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px', padding: '1.25rem', textAlign: 'center' }}>
            <button className="modal-close-btn" onClick={() => setExpandedPhoto(null)}>
              <X size={18} />
            </button>
            <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.75rem' }}>{expandedPhoto.title}</h4>
            <img 
              src={expandedPhoto.src} 
              alt="Expanded citizen report preview" 
              style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', borderRadius: '8px' }} 
            />
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>
              Sample Citizen Photo Attachment (Demonstration Record)
            </div>
          </div>
        </div>
      )}

      {/* Submit Report Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', padding: '1.75rem' }}>
            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.4rem' }}>
              Submit Simulated Citizen Report
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
              Test submitting a live report with audio simulation. It will be verified and added to the active session.
            </p>

            {formError && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '8px',
                padding: '0.65rem 0.85rem',
                color: '#fca5a5',
                fontSize: '0.8rem',
                marginBottom: '1rem'
              }}>
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleCreateReport} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Report Title (min. 5 chars)
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
                  Location in Pune (min. 3 chars)
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
                  Details & Observations (min. 10 chars)
                </label>
                <textarea 
                  rows={3}
                  placeholder="Briefly describe what you observed..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="search-input"
                  style={{ padding: '0.65rem 0.85rem', resize: 'vertical' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input 
                  type="checkbox" 
                  id="attach-voicenote" 
                  checked={attachVoiceNote}
                  onChange={e => setAttachVoiceNote(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <label htmlFor="attach-voicenote" style={{ fontSize: '0.8rem', color: '#cbd5e1', cursor: 'pointer' }}>
                  Attach Simulated Voice Note Recording (Audio clip)
                </label>
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
