import React from 'react';
import { 
  X, MapPin, DollarSign, Star, Shield, CloudRain, 
  Accessibility, Compass, Plus, Check, ExternalLink 
} from 'lucide-react';

export default function PlaceDetailModal({ place, onClose, onToggleItinerary, isInItinerary, onToggleCompare, isCompared }) {
  if (!place) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div style={{ position: 'relative', height: '260px', width: '100%', overflow: 'hidden' }}>
          <img 
            src={place.image} 
            alt={place.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            background: 'linear-gradient(to top, rgba(15,23,42,0.95), transparent)', 
            padding: '1.5rem 1.5rem 0.75rem' 
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="tag-badge">{place.category}</span>
              <span className={`indoor-pill ${place.isIndoor ? 'indoor' : 'outdoor'}`}>
                {place.isIndoor ? '🛡️ Weather-Proof Indoor' : '☀️ Open Air / Outdoor'}
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', color: '#fff' }}>{place.name}</h2>
            <div style={{ color: '#38bdf8', fontSize: '0.88rem', fontWeight: 500 }}>
              {place.tagline}
            </div>
          </div>
        </div>

        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.6' }}>
            {place.description}
          </p>

          {/* Quick Metrics */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
            gap: '0.75rem', 
            background: 'rgba(15, 23, 42, 0.6)', 
            padding: '1rem', 
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Est. Cost / Person</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>
                {place.costPerPerson === 0 ? 'Free (₹0)' : `₹${place.costPerPerson}`}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Rating & Reviews</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Star size={16} fill="#fbbf24" /> {place.rating} <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({place.reviewCount.toLocaleString()})</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Cleanliness Score</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#60a5fa' }}>
                {place.cleanlinessRating} / 5.0
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Neighborhood</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e2e8f0' }}>
                {place.neighborhood}
              </div>
            </div>
          </div>

          {/* Deep Insights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ 
              background: 'rgba(99, 102, 241, 0.08)', 
              border: '1px solid rgba(99, 102, 241, 0.25)', 
              borderRadius: '10px', 
              padding: '0.85rem 1rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#a5b4fc', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
                <Shield size={16} /> Safety & Footfall Context
              </div>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                <strong>Crowd Profile:</strong> {place.safetyAdvisory.crowdDensity}.<br />
                <strong>Lighting & Ambience:</strong> {place.safetyAdvisory.lightingScore}.<br />
                <strong>Local Notes:</strong> {place.safetyAdvisory.incidentNotes}
              </div>
            </div>

            <div style={{ 
              background: 'rgba(6, 182, 212, 0.08)', 
              border: '1px solid rgba(6, 182, 212, 0.25)', 
              borderRadius: '10px', 
              padding: '0.85rem 1rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
                <Accessibility size={16} /> Accessibility & Inclusivity
              </div>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                {place.accessibility}
              </div>
            </div>

            <div style={{ 
              background: 'rgba(16, 185, 129, 0.08)', 
              border: '1px solid rgba(16, 185, 129, 0.25)', 
              borderRadius: '10px', 
              padding: '0.85rem 1rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#6ee7b7', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
                <Compass size={16} /> Transit & Commute Highlights
              </div>
              <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                {place.transitNotes}
              </div>
            </div>
          </div>

          {/* Highlights Pills */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.4rem' }}>
              Key Highlights & Experiences
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {place.highlights.map((h, i) => (
                <span key={i} style={{ 
                  background: 'rgba(255, 255, 255, 0.06)', 
                  padding: '0.25rem 0.65rem', 
                  borderRadius: '6px', 
                  fontSize: '0.78rem',
                  color: '#e2e8f0' 
                }}>
                  ✨ {h}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button 
              className={`btn-add-itinerary ${isInItinerary ? 'added' : ''}`}
              onClick={() => onToggleItinerary(place)}
              style={{ padding: '0.85rem', fontSize: '0.9rem' }}
            >
              {isInItinerary ? (
                <>
                  <Check size={18} /> In Your Outing Plan
                </>
              ) : (
                <>
                  <Plus size={18} /> Add to Outing Itinerary
                </>
              )}
            </button>
            <button 
              className={`btn-icon-action ${isCompared ? 'active' : ''}`}
              onClick={() => onToggleCompare(place)}
              style={{ width: '48px', height: '48px' }}
              title={isCompared ? "Remove from comparison" : "Add to comparison"}
            >
              ⚖️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
