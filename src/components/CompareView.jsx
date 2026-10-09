import React from 'react';
import { 
  Star, Shield, Accessibility, MapPin, IndianRupee, 
  Trash2, Plus, Check, RefreshCw, AlertCircle, Compass 
} from 'lucide-react';
import { PUNE_PLACES } from '../data/puneData';

export default function CompareView({ 
  comparedPlaces, 
  onRemoveCompare, 
  onAddCompare, 
  onToggleItinerary, 
  itineraryItems,
  onResetCompare 
}) {
  return (
    <div className="compare-view-wrapper">
      <div className="compare-header-row">
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>
            Multi-Place Trade-off Matrix
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '750px' }}>
            Compare Pune destinations side-by-side on verified factors: affordability, accessibility, 
            realistic safety advisories, and weather resilience. No unsupported claims—just practical trade-offs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={() => {
              // Preload comparison of iconic contrasting places
              const p1 = PUNE_PLACES.find(p => p.id === 'sinhagad-fort');
              const p2 = PUNE_PLACES.find(p => p.id === 'kelkar-museum');
              const p3 = PUNE_PLACES.find(p => p.id === 'fc-road-food-trail');
              onResetCompare([p1, p2, p3]);
            }}
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#cbd5e1',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <RefreshCw size={14} /> Quick Preset: Fort vs Museum vs Food
          </button>
        </div>
      </div>

      {/* Place Selector Pills */}
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem' }}>
          Select Places to Compare (Max 4):
        </div>
        <div className="compare-selector-chips">
          {PUNE_PLACES.map(place => {
            const isSelected = comparedPlaces.some(p => p.id === place.id);
            return (
              <button
                key={place.id}
                onClick={() => isSelected ? onRemoveCompare(place.id) : onAddCompare(place)}
                className={`compare-chip ${isSelected ? 'selected' : ''}`}
              >
                {isSelected ? <Check size={13} /> : <Plus size={13} />}
                {place.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      {comparedPlaces.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem 1.5rem',
          background: 'rgba(19, 29, 51, 0.5)',
          borderRadius: '16px',
          border: '1px dashed rgba(255, 255, 255, 0.15)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⚖️</div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>No Places Selected for Comparison</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            Pick 2 or more destinations using the chips above to inspect trade-offs.
          </p>
          <button
            onClick={() => {
              const p1 = PUNE_PLACES.find(p => p.id === 'shaniwar-wada');
              const p2 = PUNE_PLACES.find(p => p.id === 'aga-khan-palace');
              onResetCompare([p1, p2]);
            }}
            className="nav-cta-btn"
          >
            Compare Shaniwar Wada vs Aga Khan Palace
          </button>
        </div>
      ) : (
        <div className="compare-table-wrapper">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="metric-label-cell">Feature & Metric</th>
                {comparedPlaces.map(place => (
                  <th key={place.id} style={{ minWidth: '220px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ color: '#fff', fontSize: '0.95rem' }}>{place.name}</span>
                      <button 
                        onClick={() => onRemoveCompare(place.id)}
                        style={{ color: '#94a3b8', padding: '2px' }}
                        title="Remove column"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Image & Category */}
              <tr>
                <td className="metric-label-cell">Overview</td>
                {comparedPlaces.map(place => (
                  <td key={place.id}>
                    <img 
                      src={place.image} 
                      alt={place.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80';
                      }}
                      style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.5rem' }} 
                    />
                    <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600 }}>{place.category}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{place.neighborhood}</div>
                  </td>
                ))}
              </tr>

              {/* Affordability */}
              <tr>
                <td className="metric-label-cell">Affordability</td>
                {comparedPlaces.map(place => (
                  <td key={place.id}>
                    <div style={{ fontWeight: 700, color: '#10b981', fontSize: '1.05rem' }}>
                      {place.costPerPerson === 0 ? 'Free (₹0)' : `₹${place.costPerPerson} / person`}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {place.priceLevel}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Rating & Reviews */}
              <tr>
                <td className="metric-label-cell">Rating & Sentiment</td>
                {comparedPlaces.map(place => (
                  <td key={place.id}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#fbbf24', fontWeight: 700 }}>
                      <Star size={16} fill="#fbbf24" /> {place.rating} / 5.0
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {place.reviewCount.toLocaleString()} verified visitor reviews
                    </div>
                  </td>
                ))}
              </tr>

              {/* Weather & Sheltered Status */}
              <tr>
                <td className="metric-label-cell">Weather Resilience</td>
                {comparedPlaces.map(place => (
                  <td key={place.id}>
                    <span className={`indoor-pill ${place.isIndoor ? 'indoor' : 'outdoor'}`} style={{ display: 'inline-flex', position: 'static', marginBottom: '0.4rem' }}>
                      {place.isIndoor ? 'Indoor Sheltered' : 'Outdoor Open-air'}
                    </span>
                    <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                      {place.weatherResilience}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Accessibility */}
              <tr>
                <td className="metric-label-cell">Accessibility</td>
                {comparedPlaces.map(place => (
                  <td key={place.id}>
                    <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                      {place.accessibility}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Safety Nuances & Footfall */}
              <tr>
                <td className="metric-label-cell">Safety & Footfall Context</td>
                {comparedPlaces.map(place => (
                  <td key={place.id}>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      background: 'rgba(99, 102, 241, 0.1)', 
                      padding: '0.5rem', 
                      borderRadius: '6px',
                      color: '#c7d2fe',
                      marginBottom: '0.4rem'
                    }}>
                      🛡️ {place.safetyAdvisory.safetyLevel}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: '1.4' }}>
                      <strong>Density:</strong> {place.safetyAdvisory.crowdDensity}<br />
                      <strong>Notes:</strong> {place.safetyAdvisory.incidentNotes}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Cleanliness */}
              <tr>
                <td className="metric-label-cell">Cleanliness</td>
                {comparedPlaces.map(place => (
                  <td key={place.id}>
                    <div style={{ fontWeight: 700, color: '#60a5fa' }}>
                      {place.cleanlinessRating} / 5.0
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      Public heritage / maintenance audit
                    </div>
                  </td>
                ))}
              </tr>

              {/* Commute Effort */}
              <tr>
                <td className="metric-label-cell">Transit & Commute</td>
                {comparedPlaces.map(place => (
                  <td key={place.id}>
                    <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                      {place.transitNotes}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Actions */}
              <tr>
                <td className="metric-label-cell">Action</td>
                {comparedPlaces.map(place => {
                  const inItinerary = itineraryItems.some(i => i.id === place.id);
                  return (
                    <td key={place.id}>
                      <button
                        onClick={() => onToggleItinerary(place)}
                        className={`btn-add-itinerary ${inItinerary ? 'added' : ''}`}
                      >
                        {inItinerary ? (
                          <>
                            <Check size={14} /> In Itinerary
                          </>
                        ) : (
                          <>
                            <Plus size={14} /> Add to Outing
                          </>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
