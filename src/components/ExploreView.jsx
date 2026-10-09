import React, { useState, useMemo } from 'react';
import { 
  Search, Map, LayoutGrid, Star, Shield, CloudRain, 
  DollarSign, Plus, Check, Eye, Compass, Layers, 
  MapPin, Sparkles, Filter 
} from 'lucide-react';
import { PUNE_PLACES } from '../data/puneData';
import CityMapView from './CityMapView';

export default function ExploreView({ 
  onSelectPlace, 
  onToggleItinerary, 
  itineraryItems, 
  onToggleCompare, 
  comparedPlaces,
  onGoToPlanB
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
      // Search matching
      const matchesSearch = 
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      // Category matching
      const matchesCategory = selectedCategory === 'All' || place.category === selectedCategory;

      // Filter toggles
      const matchesIndoor = !indoorOnly || place.isIndoor;
      const matchesBudget = !budgetOnly || place.costPerPerson <= 100;

      return matchesSearch && matchesCategory && matchesIndoor && matchesBudget;
    });
  }, [searchQuery, selectedCategory, indoorOnly, budgetOnly]);

  return (
    <div>
      {/* Hero Header */}
      <div className="hero-section">
        <div className="hero-header">
          <div className="hero-subtitle">
            <Sparkles size={16} /> Intelligent City Navigation • Pune Edition
          </div>
          <h1 className="hero-title">
            Explore Pune Freely. <span>Adapt Instantly.</span>
          </h1>
          <p className="hero-desc">
            Discover historic Peshwa bastions, bustling FC Road street food, and sheltered monsoon havens. 
            When sudden rain, traffic gridlocks, or unexpected closures occur, our <strong>Smart Plan B Engine</strong> recalibrates your outing in seconds.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <button 
              onClick={onGoToPlanB}
              className="nav-cta-btn"
              style={{ padding: '0.75rem 1.4rem', fontSize: '0.95rem' }}
            >
              ⚡ Open Smart Plan B Engine
            </button>
            <button 
              onClick={() => {
                setIndoorOnly(true);
                setSelectedCategory('All');
              }}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                fontSize: '0.9rem',
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <CloudRain size={16} /> View Weather-Proof Indoors
            </button>
          </div>
        </div>

        {/* Hero Metrics Strip */}
        <div className="hero-stats-strip">
          <div className="stat-card">
            <div className="stat-icon" style={{ color: '#818cf8' }}>🏛️</div>
            <div>
              <div className="stat-num">{PUNE_PLACES.length} Curated Spots</div>
              <div className="stat-label">Heritage, Cafes, Stays</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ color: '#34d399' }}>🛡️</div>
            <div>
              <div className="stat-num">Contextual Safety</div>
              <div className="stat-label">Footfall & Lighting Audits</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ color: '#38bdf8' }}>🌧️</div>
            <div>
              <div className="stat-num">Monsoon Resilient</div>
              <div className="stat-label">Indoor Sheltered Filters</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ color: '#fbbf24' }}>⚡</div>
            <div>
              <div className="stat-num">Plan B Ready</div>
              <div className="stat-label">Instant Outing Adaptation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-toolbar">
        <div className="search-and-view-row">
          <div className="search-input-wrapper">
            <Search className="search-icon-inside" size={18} />
            <input 
              type="text" 
              placeholder="Search places by name, history, food, or neighborhood (e.g. Shaniwar, Cafe, Kothrud)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Quick Filter Checkboxes */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIndoorOnly(!indoorOnly)}
              style={{
                padding: '0.55rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                background: indoorOnly ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: indoorOnly ? '#6ee7b7' : '#94a3b8',
                border: indoorOnly ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              🛡️ Weather-Proof Indoor Only
            </button>

            <button
              onClick={() => setBudgetOnly(!budgetOnly)}
              style={{
                padding: '0.55rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                background: budgetOnly ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: budgetOnly ? '#93c5fd' : '#94a3b8',
                border: budgetOnly ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              💰 Budget-Friendly (≤ ₹100)
            </button>
          </div>

          {/* Grid vs Map Toggle */}
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

        {/* Category Pills */}
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
      </div>

      {/* Search results count info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.82rem', color: '#94a3b8' }}>
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
            style={{ color: '#38bdf8', fontSize: '0.8rem', textDecoration: 'underline' }}
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Main View: Grid vs Leaflet Map */}
      {viewMode === 'map' ? (
        <CityMapView 
          places={filteredPlaces}
          selectedPlace={null}
          onSelectPlace={onSelectPlace}
          onToggleItinerary={onToggleItinerary}
          itineraryItems={itineraryItems}
        />
      ) : (
        <div className="places-grid">
          {filteredPlaces.map((place) => {
            const inItinerary = itineraryItems.some(item => item.id === place.id);
            const inCompare = comparedPlaces.some(p => p.id === place.id);

            return (
              <div key={place.id} className="place-card">
                <div className="place-card-image-wrap">
                  <img 
                    src={place.image} 
                    alt={place.name} 
                    className="place-card-img" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  
                  <div className="place-card-badge-top">
                    <span className="tag-badge">{place.category}</span>
                  </div>

                  <span className={`indoor-pill ${place.isIndoor ? 'indoor' : 'outdoor'}`}>
                    {place.isIndoor ? '🛡️ Indoor' : '☀️ Outdoor'}
                  </span>
                </div>

                <div className="place-card-content">
                  <div className="place-card-header">
                    <div className="place-title">{place.name}</div>
                    <div className="place-rating-badge">
                      <Star size={13} fill="#fbbf24" /> {place.rating}
                    </div>
                  </div>

                  <div className="place-tagline">{place.tagline}</div>
                  <div className="place-desc">{place.description}</div>

                  {/* Metadata Grid */}
                  <div className="place-meta-grid">
                    <div className="meta-item">
                      <span>💰</span>
                      <div>
                        <strong>{place.costPerPerson === 0 ? 'Free' : `₹${place.costPerPerson}`}</strong> / pers.
                      </div>
                    </div>
                    <div className="meta-item">
                      <span>📍</span>
                      <div><strong>{place.neighborhood}</strong></div>
                    </div>
                    <div className="meta-item">
                      <span>✨</span>
                      <div>Cleanliness: <strong>{place.cleanlinessRating}/5</strong></div>
                    </div>
                    <div className="meta-item">
                      <span>♿</span>
                      <div>Access: <strong>{place.accessibility.includes('High') ? 'High' : 'Moderate'}</strong></div>
                    </div>
                  </div>

                  {/* Safety & Footfall preview */}
                  <div className="place-card-signals">
                    <div className="signal-chip safe">
                      <Shield size={13} />
                      <span>{place.safetyAdvisory.safetyLevel}</span>
                    </div>
                    <div className="signal-chip weather">
                      <CloudRain size={13} />
                      <span>{place.weatherResilience}</span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="place-card-actions">
                    <button 
                      onClick={() => onToggleItinerary(place)}
                      className={`btn-add-itinerary ${inItinerary ? 'added' : ''}`}
                    >
                      {inItinerary ? (
                        <>
                          <Check size={14} /> Added
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Add to Plan
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
                      title="Inspect full details, accessibility & safety notes"
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
