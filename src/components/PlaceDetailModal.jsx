import React from 'react';
import { 
  X, MapPin, DollarSign, Star, Shield, CloudRain, 
  Accessibility, Compass, Plus, Check, Bookmark, 
  BookOpen, Sparkles, ShieldCheck, Heart 
} from 'lucide-react';

export default function PlaceDetailModal({ 
  place, 
  onClose, 
  onToggleItinerary, 
  isInItinerary, 
  onToggleCompare, 
  isCompared,
  onToggleBookmark,
  isBookmarked 
}) {
  if (!place) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dossier-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Hero Media Header */}
        <div className="modal-dossier-hero">
          <img 
            src={place.image} 
            alt={place.name} 
            className="modal-dossier-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80';
            }}
          />

          <div className="modal-dossier-scrim">
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.45rem', flexWrap: 'wrap' }}>
              <span className="stamp-badge">{place.category}</span>
              <span className={`indoor-pill ${place.isIndoor ? 'indoor' : 'outdoor'}`}>
                {place.isIndoor ? '🛡️ Weather-Proof Indoor' : '☀️ Open Air / Outdoor'}
              </span>
              {place.verificationBadge && (
                <span className="stamp-badge verified">{place.verificationBadge}</span>
              )}
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#fff', marginBottom: '0.2rem' }}>
              {place.name}
            </h2>

            <div style={{ color: 'var(--accent-amber)', fontSize: '0.9rem', fontWeight: 500 }}>
              {place.tagline} • 📍 {place.address}
            </div>
          </div>
        </div>

        {/* Body Content Dossier */}
        <div className="dossier-content-body">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: '1.65' }}>
            {place.description}
          </p>

          {/* Quick Metrics Strip */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
            gap: '0.85rem', 
            background: 'rgba(12, 18, 29, 0.75)', 
            padding: '1.15rem', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-hairline)'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Est. Cost / Person</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#34d399' }}>
                {place.costPerPerson === 0 ? 'Free (₹0)' : `₹${place.costPerPerson}`}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Rating & Reviews</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Star size={16} fill="#fbbf24" /> {place.rating} 
                <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>({place.reviewCount?.toLocaleString()})</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Cleanliness Audit</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38bdf8' }}>
                {place.cleanlinessRating} / 5.0
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Detour Proximity</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#fde68a' }}>
                {place.detourTime || place.neighborhood}
              </div>
            </div>
          </div>

          {/* "Why Go?" Section */}
          {place.whyGo && (
            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid var(--border-amber-line)',
              borderRadius: 'var(--radius-md)',
              padding: '1.1rem 1.3rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#fde68a', fontSize: '0.88rem', marginBottom: '0.35rem' }}>
                <Sparkles size={16} /> Why It's Worth Visiting
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
                {place.whyGo}
              </div>
            </div>
          )}

          {/* Local Story & Heritage Lore */}
          {place.localStory && (
            <div className="dossier-story-box">
              <div className="dossier-story-title">
                📖 Local Story & Heritage Lore
              </div>
              <div className="dossier-story-text">
                {place.localStory}
              </div>
            </div>
          )}

          {/* Practical Visiting, Safety & Accessibility */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ 
              background: 'rgba(18, 26, 42, 0.5)', 
              border: '1px solid var(--border-hairline)', 
              borderRadius: 'var(--radius-sm)', 
              padding: '0.85rem 1rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--accent-amber)', marginBottom: '0.25rem', fontSize: '0.82rem' }}>
                <Shield size={15} /> Safety & Footfall Context
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <strong>Crowd Profile:</strong> {place.safetyAdvisory.crowdDensity}.<br />
                <strong>Lighting Score:</strong> {place.safetyAdvisory.lightingScore}.<br />
                <strong>Advisory Notes:</strong> {place.safetyAdvisory.incidentNotes}
              </div>
            </div>

            <div style={{ 
              background: 'rgba(18, 26, 42, 0.5)', 
              border: '1px solid var(--border-hairline)', 
              borderRadius: 'var(--radius-sm)', 
              padding: '0.85rem 1rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.25rem', fontSize: '0.82rem' }}>
                <Accessibility size={15} /> Accessibility & Inclusivity
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {place.accessibility}
              </div>
            </div>

            <div style={{ 
              background: 'rgba(18, 26, 42, 0.5)', 
              border: '1px solid var(--border-hairline)', 
              borderRadius: 'var(--radius-sm)', 
              padding: '0.85rem 1rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#34d399', marginBottom: '0.25rem', fontSize: '0.82rem' }}>
                <Compass size={15} /> Transit & Commute Highlights
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {place.transitNotes}
              </div>
            </div>
          </div>

          {/* Highlights Chips */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.45rem' }}>
              Key Highlights & Experiences
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {place.highlights?.map((h, i) => (
                <span key={i} style={{ 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  padding: '0.3rem 0.75rem', 
                  borderRadius: 'var(--radius-xs)', 
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-hairline)'
                }}>
                  ✨ {h}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button 
              className={`btn-itinerary-primary ${isInItinerary ? 'added' : ''}`}
              onClick={() => onToggleItinerary(place)}
              style={{ padding: '0.95rem', fontSize: '0.92rem', borderRadius: 'var(--radius-md)' }}
            >
              {isInItinerary ? (
                <>
                  <Check size={18} /> In Your Outing Plan
                </>
              ) : (
                <>
                  <Plus size={18} /> Add to Outing Plan
                </>
              )}
            </button>

            <button 
              className={`btn-icon-action ${isBookmarked ? 'active' : ''}`}
              onClick={() => onToggleBookmark && onToggleBookmark(place.id)}
              style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)' }}
              title={isBookmarked ? "Saved in Travel Journal" : "Save to Travel Journal"}
            >
              <Bookmark size={18} fill={isBookmarked ? "var(--accent-amber)" : "none"} />
            </button>

            <button 
              className={`btn-icon-action ${isCompared ? 'active' : ''}`}
              onClick={() => onToggleCompare(place)}
              style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)' }}
              title={isCompared ? "Remove from comparison" : "Add to comparison matrix"}
            >
              ⚖️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
