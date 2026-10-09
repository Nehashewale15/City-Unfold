import React, { useState, useMemo } from 'react';
import { 
  Search, Map, LayoutGrid, Star, Shield, CloudRain, 
  DollarSign, Plus, Check, Eye, Compass, Layers, 
  MapPin, Sparkles, Filter, Bookmark, ArrowRight 
} from 'lucide-react';
import { PUNE_PLACES } from '../data/puneData';
import CityMapView from './CityMapView';

export default function ExploreView({ 
  onSelectPlace, 
  onToggleItinerary, 
  itineraryItems, 
  onToggleBookmark,
  bookmarkedIds = [],
  onToggleCompare, 
  comparedPlaces,
  onGoToPlanB,
  onGoToGems
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [indoorOnly, setIndoorOnly] = useState(false);
  const [budgetOnly, setBudgetOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'

  // Categories
  const categories = [
    'All',
    'History & Culture',
    'Local Food & Cafes',
    'Indoor Experiences',
    'Attractions & Parks',
    'Hotels & Stays'
  ];

  // Filtered places
  const filteredPlaces = useMemo(() => {
    return PUNE_PLACES.filter(place => {
      const matchesSearch = 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (place.whyGo && place.whyGo.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || place.category === selectedCategory;
      const matchesIndoor = !indoorOnly || place.isIndoor;
      const matchesBudget = !budgetOnly || place.costPerPerson <= 100;

      return matchesSearch && matchesCategory && matchesIndoor && matchesBudget;
    });
  }, [searchQuery, selectedCategory, indoorOnly, budgetOnly]);

  // Lead editorial discovery for the hero
  const leadDiscovery = PUNE_PLACES.find(p => p.id === 'kelkar-museum') || PUNE_PLACES[0];

  return (
    <div>
      {/* Editorial Landing Hero */}
      <div className="editorial-hero">
        <div className="editorial-hero-grid">
          <div>
            <div className="hero-editorial-eyebrow">
              <Sparkles size={15} /> Urban Exploration Engine • Pune, Maharashtra
            </div>

            <h1 className="hero-editorial-title">
              Your city has <em>another side.</em>
            </h1>

            <p className="hero-editorial-desc">
              Find hidden places, local stories, and smarter ways to explore. 
              When sudden monsoon showers, highway traffic, or venue closures interrupt your outing, 
              our <strong>Smart Plan B Engine</strong> instantly adapts your itinerary in real time.
            </p>

            {/* Prominent Search Bar */}
            <div className="hero-search-wrapper">
              <Search className="hero-search-icon" size={19} />
              <input 
                type="text" 
                placeholder="Search Peshwa heritage, Irani cafes, underground caves, or hidden lanes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hero-search-input"
              />
            </div>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button 
                onClick={onGoToPlanB}
                className="nav-cta-btn"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                ⚡ Plan My Outing (Plan B Ready)
              </button>

              <button 
                onClick={onGoToGems}
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: '#fde68a',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  border: '1px solid var(--border-amber-line)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>⭐ Explore Hidden Gems Journal</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Featured Visual Vignette */}
          <div className="hero-vignette-card" onClick={() => onSelectPlace(leadDiscovery)} style={{ cursor: 'pointer' }}>
            <img 
              src={leadDiscovery.image} 
              alt={leadDiscovery.name} 
              className="hero-vignette-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&auto=format&fit=crop&q=80';
              }}
            />
            <div className="hero-vignette-overlay">
              <span className="curator-stamp">Featured Cultural Archive</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', marginBottom: '0.2rem' }}>
                {leadDiscovery.name}
              </h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {leadDiscovery.neighborhood} • {leadDiscovery.tagline}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Metrics Ribbon */}
        <div className="editorial-metrics-ribbon">
          <div className="metric-strip-item">
            <div className="metric-strip-icon">🏛️</div>
            <div>
              <div className="metric-strip-val">{PUNE_PLACES.length} Curated Hubs</div>
              <div className="metric-strip-lbl">Heritage, Cafes, Stays</div>
            </div>
          </div>
          <div className="metric-strip-item">
            <div className="metric-strip-icon">📖</div>
            <div>
              <div className="metric-strip-val">100% Lore Verified</div>
              <div className="metric-strip-lbl">Archival Historical Stories</div>
            </div>
          </div>
          <div className="metric-strip-item">
            <div className="metric-strip-icon">🛡️</div>
            <div>
              <div className="metric-strip-val">Contextual Safety</div>
              <div className="metric-strip-lbl">Footfall & Lighting Audits</div>
            </div>
          </div>
          <div className="metric-strip-item">
            <div className="metric-strip-icon">⚡</div>
            <div>
              <div className="metric-strip-val">Adaptive Plan B</div>
              <div className="metric-strip-lbl">Zero-Delay Disruption Engine</div>
            </div>
          </div>
        </div>
      </div>

      {/* Exploration Toolbar & Quick Toggles */}
      <div className="filter-toolbar">
        <div className="toolbar-controls-row">
          {/* Category Filter Pills */}
          <div className="category-pills-row">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Toggles & Fast Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIndoorOnly(!indoorOnly)}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: indoorOnly ? 'var(--state-success-bg)' : 'rgba(255, 255, 255, 0.04)',
                color: indoorOnly ? '#6ee7b7' : 'var(--text-muted)',
                border: indoorOnly ? '1px solid var(--state-success)' : '1px solid var(--border-hairline)'
              }}
            >
              🛡️ Weather-Proof Indoors
            </button>

            <button
              onClick={() => setBudgetOnly(!budgetOnly)}
              style={{
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: budgetOnly ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                color: budgetOnly ? '#fde68a' : 'var(--text-muted)',
                border: budgetOnly ? '1px solid var(--border-amber-line)' : '1px solid var(--border-hairline)'
              }}
            >
              💰 Under ₹100 Budget
            </button>

            <div className="view-toggle-group">
              <button 
                onClick={() => setViewMode('grid')}
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              >
                <LayoutGrid size={15} /> Grid
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`view-toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
              >
                <Map size={15} /> Map View
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          <div>
            Showing <strong>{filteredPlaces.length}</strong> of {PUNE_PLACES.length} Pune destinations
          </div>
          {(searchQuery || selectedCategory !== 'All' || indoorOnly || budgetOnly) && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setIndoorOnly(false);
                setBudgetOnly(false);
              }}
              style={{ color: 'var(--accent-amber)', fontSize: '0.8rem', textDecoration: 'underline' }}
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Main View: Asymmetric Editorial Grid vs Leaflet Map */}
      {viewMode === 'map' ? (
        <CityMapView 
          places={filteredPlaces}
          selectedPlace={null}
          onSelectPlace={onSelectPlace}
          onToggleItinerary={onToggleItinerary}
          itineraryItems={itineraryItems}
        />
      ) : (
        <div className="places-editorial-grid">
          {filteredPlaces.map((place, idx) => {
            const inItinerary = itineraryItems.some(item => item.id === place.id);
            const isBookmarked = bookmarkedIds.includes(place.id);
            const inCompare = comparedPlaces.some(p => p.id === place.id);
            const isFeaturedLayout = idx === 0 && filteredPlaces.length > 2;

            return (
              <div 
                key={place.id} 
                className={`place-editorial-card ${isFeaturedLayout ? 'featured-card' : ''}`}
              >
                <div className="card-media-wrapper" style={{ height: isFeaturedLayout ? '250px' : '205px' }}>
                  <img 
                    src={place.image} 
                    alt={place.name} 
                    className="card-img-editorial"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  
                  <div className="card-stamps-top">
                    <span className="stamp-badge">{place.category}</span>
                    <span className="stamp-badge" style={{ color: place.isIndoor ? '#34d399' : '#f59e0b' }}>
                      {place.isIndoor ? '🛡️ Indoor' : '☀️ Outdoor'}
                    </span>
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
                  <div className="card-excerpt-editorial">{place.description}</div>

                  {/* Why Go highlight if available */}
                  {place.whyGo && (
                    <div className="card-why-go-preview">
                      <strong>Why Go:</strong> {place.whyGo}
                    </div>
                  )}

                  {/* Meta Chips */}
                  <div className="card-meta-chips">
                    <span className="meta-chip">
                      💰 <strong>{place.costPerPerson === 0 ? 'Free' : `₹${place.costPerPerson}`}</strong> / pers.
                    </span>
                    <span className="meta-chip">
                      📍 {place.neighborhood}
                    </span>
                    <span className="meta-chip">
                      ✨ Cleanliness: {place.cleanlinessRating}/5
                    </span>
                  </div>

                  {/* Footer Actions */}
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
                      title="Inspect full details, local stories & safety notes"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
