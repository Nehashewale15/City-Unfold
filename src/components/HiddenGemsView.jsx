import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Compass, Bookmark, Plus, Check, Eye, 
  MapPin, Clock, ArrowRight, ShieldCheck, Heart, 
  BookOpen, Star, DollarSign, Filter 
} from 'lucide-react';
import { PUNE_PLACES } from '../data/puneData';

export default function HiddenGemsView({ 
  onSelectPlace, 
  onToggleItinerary, 
  itineraryItems, 
  onToggleBookmark, 
  bookmarkedIds = [],
  onToggleCompare, 
  comparedPlaces 
}) {
  const [activeFilter, setActiveFilter] = useState('all');

  // Categorize places based on genuine data
  const sectionsData = useMemo(() => {
    return {
      worthDetour: PUNE_PLACES.filter(p => p.gemType === 'worth-the-detour' || p.isHiddenGem),
      localStories: PUNE_PLACES.filter(p => p.localStory && (p.gemType === 'local-story' || p.category === 'History & Culture')),
      under200: PUNE_PLACES.filter(p => p.costPerPerson <= 200),
      unexpected: PUNE_PLACES.filter(p => p.gemType === 'unexpected-find' || p.id === 'joshi-railway-museum')
    };
  }, []);

  // Filtered list based on active tab
  const displayedPlaces = useMemo(() => {
    if (activeFilter === 'worth-detour') return sectionsData.worthDetour;
    if (activeFilter === 'local-stories') return sectionsData.localStories;
    if (activeFilter === 'under-200') return sectionsData.under200;
    if (activeFilter === 'unexpected') return sectionsData.unexpected;
    return PUNE_PLACES;
  }, [activeFilter, sectionsData]);

  // Featured Gem of the Day (Pataleshwar or Kelkar Museum)
  const featuredGem = PUNE_PLACES.find(p => p.id === 'pataleshwar-caves') || PUNE_PLACES[0];
  const isFeaturedBookmarked = bookmarkedIds.includes(featuredGem.id);
  const isFeaturedInItinerary = itineraryItems.some(i => i.id === featuredGem.id);

  return (
    <div className="gems-experience-wrapper">
      {/* Cinematic Hero */}
      <div className="gems-hero-header">
        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            letterSpacing: '0.12em', 
            textTransform: 'uppercase', 
            color: 'var(--accent-amber)', 
            marginBottom: '0.75rem' 
          }}>
            <Sparkles size={15} /> Curated Travel Journal • Pune Unseen
          </div>
          
          <h1 className="gems-hero-title">
            Small discoveries. <span>Big stories.</span>
          </h1>
          
          <p className="gems-hero-desc">
            Venture beyond the crowded tourist circuit. Uncover 8th-century subterranean basalt sanctuaries, 
            sixty-year-old Irani breakfast rituals, and hand-built automated miniature railways tucked inside residential alleys.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.6rem', 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '0.5rem 0.95rem', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.8rem',
              border: '1px solid var(--border-hairline)',
              color: 'var(--text-secondary)'
            }}>
              <ShieldCheck size={14} color="var(--accent-amber)" />
              <span>Verified Cultural Archives</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.6rem', 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '0.5rem 0.95rem', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.8rem',
              border: '1px solid var(--border-hairline)',
              color: 'var(--text-secondary)'
            }}>
              <span>🧭 Detour-Optimized</span>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.6rem', 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '0.5rem 0.95rem', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.8rem',
              border: '1px solid var(--border-hairline)',
              color: 'var(--text-secondary)'
            }}>
              <span>📖 Documented Local Lore</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Editorial Spotlight Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(20, 28, 45, 0.85), rgba(10, 15, 26, 0.95))',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-amber-line)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-editorial)',
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        gap: '2rem'
      }}>
        <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span className="stamp-badge verified">★ Curated Spotlight</span>
            <span className="stamp-badge">{featuredGem.verificationBadge}</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#fff', marginBottom: '0.4rem' }}>
            {featuredGem.name}
          </h2>

          <div style={{ color: 'var(--accent-amber)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.25rem' }}>
            {featuredGem.tagline} • {featuredGem.neighborhood}
          </div>

          {/* Why Go callout */}
          <div style={{
            background: 'rgba(12, 18, 29, 0.75)',
            borderLeft: '3px solid var(--accent-amber)',
            padding: '1rem 1.25rem',
            borderRadius: '0 8px 8px 0',
            marginBottom: '1.25rem',
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}>
            <strong style={{ color: '#fde68a' }}>Why It's Worth the Detour: </strong> 
            {featuredGem.whyGo}
          </div>

          {/* Curator quote */}
          <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '1.75rem' }}>
            "{featuredGem.curatorQuote}"
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onToggleItinerary(featuredGem)}
              className={`nav-cta-btn ${isFeaturedInItinerary ? 'added' : ''}`}
              style={{
                background: isFeaturedInItinerary ? 'var(--state-success)' : undefined,
                color: isFeaturedInItinerary ? '#fff' : undefined
              }}
            >
              {isFeaturedInItinerary ? <Check size={16} /> : <Plus size={16} />}
              {isFeaturedInItinerary ? 'In Your Outing Plan' : 'Add to Outing Plan'}
            </button>

            <button 
              onClick={() => onToggleBookmark(featuredGem.id)}
              className={`btn-icon-action ${isFeaturedBookmarked ? 'active' : ''}`}
              style={{ 
                width: '42px', 
                height: '42px', 
                background: isFeaturedBookmarked ? 'var(--accent-amber)' : 'rgba(255,255,255,0.06)',
                color: isFeaturedBookmarked ? '#1c1917' : '#cbd5e1'
              }}
              title="Save to Travel Journal"
            >
              <Bookmark size={16} fill={isFeaturedBookmarked ? "#1c1917" : "none"} />
            </button>

            <button 
              onClick={() => onSelectPlace(featuredGem)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.06)',
                color: '#fff',
                fontSize: '0.84rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                border: '1px solid var(--border-hairline)'
              }}
            >
              <Eye size={15} /> Read Full Dossier
            </button>
          </div>
        </div>

        <div style={{ position: 'relative', minHeight: '340px' }}>
          <img 
            src={featuredGem.image} 
            alt={featuredGem.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80';
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ 
            position: 'absolute', 
            bottom: '1rem', 
            left: '1rem', 
            background: 'rgba(7, 11, 18, 0.85)', 
            backdropFilter: 'blur(8px)',
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-hairline)'
          }}>
            📍 {featuredGem.address} • {featuredGem.priceLevel}
          </div>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="category-pills-row">
          {[
            { id: 'all', label: 'All Curated Gems' },
            { id: 'worth-detour', label: '⭐ Worth the Detour' },
            { id: 'local-stories', label: '📜 Local Stories & Lore' },
            { id: 'under-200', label: '💰 Under ₹200 / Free' },
            { id: 'unexpected', label: '✨ Unexpected Finds' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`category-pill ${activeFilter === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Showing <strong>{displayedPlaces.length}</strong> vetted discoveries
        </div>
      </div>

      {/* Asymmetrical Editorial Card Grid */}
      <div className="places-editorial-grid">
        {displayedPlaces.map((place, idx) => {
          const inItinerary = itineraryItems.some(i => i.id === place.id);
          const isBookmarked = bookmarkedIds.includes(place.id);
          const inCompare = comparedPlaces.some(p => p.id === place.id);
          const isFeaturedLayout = idx % 5 === 0 && displayedPlaces.length > 3;

          return (
            <div 
              key={place.id} 
              className={`place-editorial-card ${isFeaturedLayout ? 'featured-card' : ''}`}
            >
              <div className="card-media-wrapper" style={{ height: isFeaturedLayout ? '260px' : '200px' }}>
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="card-img-editorial"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&auto=format&fit=crop&q=80';
                  }}
                />

                <div className="card-stamps-top">
                  <span className="stamp-badge">{place.category}</span>
                  {place.verificationBadge && (
                    <span className="stamp-badge verified">{place.verificationBadge}</span>
                  )}
                </div>

                <button 
                  onClick={() => onToggleBookmark(place.id)}
                  className={`card-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                  title={isBookmarked ? "Saved in Travel Journal" : "Save to Travel Journal"}
                >
                  <Bookmark size={15} fill={isBookmarked ? "#1c1917" : "none"} />
                </button>
              </div>

              <div className="card-body-editorial">
                <div className="card-header-editorial">
                  <div className="card-title-editorial">{place.name}</div>
                  <div className="card-rating-badge">
                    <Star size={13} fill="#fbbf24" /> {place.rating}
                  </div>
                </div>

                <div className="card-tagline-editorial">{place.tagline}</div>

                {/* Why Go Editorial Preview */}
                {place.whyGo && (
                  <div className="card-why-go-preview">
                    <strong>Why Go:</strong> {place.whyGo}
                  </div>
                )}

                {/* Local Lore snippet if available */}
                {place.localStory && (
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: 'var(--text-stone)', 
                    lineHeight: '1.45', 
                    marginBottom: '1rem',
                    fontStyle: 'italic'
                  }}>
                    📖 "{place.localStory.slice(0, 110)}..."
                  </div>
                )}

                {/* Meta Chips */}
                <div className="card-meta-chips">
                  <span className="meta-chip">
                    📍 {place.neighborhood}
                  </span>
                  <span className="meta-chip" style={{ color: '#34d399' }}>
                    {place.costPerPerson === 0 ? 'Free Entry' : `₹${place.costPerPerson} / person`}
                  </span>
                  {place.detourTime && (
                    <span className="meta-chip" style={{ color: 'var(--accent-amber)' }}>
                      ⏱️ {place.detourTime}
                    </span>
                  )}
                </div>

                {/* Footer Action Buttons */}
                <div className="card-actions-footer">
                  <button 
                    onClick={() => onToggleItinerary(place)}
                    className={`btn-itinerary-primary ${inItinerary ? 'added' : ''}`}
                  >
                    {inItinerary ? (
                      <>
                        <Check size={14} /> In Plan
                      </>
                    ) : (
                      <>
                        <Plus size={14} /> Add to Outing
                      </>
                    )}
                  </button>

                  <button 
                    onClick={() => onToggleCompare(place)}
                    className={`btn-icon-action ${inCompare ? 'active' : ''}`}
                    title={inCompare ? "Remove from comparison" : "Add to comparison"}
                  >
                    ⚖️
                  </button>

                  <button 
                    onClick={() => onSelectPlace(place)}
                    className="btn-icon-action"
                    title="View full history, accessibility & visiting notes"
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
