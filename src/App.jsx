import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ExploreView from './components/ExploreView';
import HiddenGemsView from './components/HiddenGemsView';
import PlanBEngine from './components/PlanBEngine';
import CompareView from './components/CompareView';
import CitySignalsView from './components/CitySignalsView';
import PlaceDetailModal from './components/PlaceDetailModal';
import { PUNE_PLACES } from './data/puneData';
import { AlertCircle, Shield } from 'lucide-react';

export default function App() {
  // Navigation State: 'explore' | 'gems' | 'planb' | 'compare' | 'signals'
  const [activeTab, setActiveTab] = useState('explore');

  // Modal State
  const [activeModalPlace, setActiveModalPlace] = useState(null);

  // Itinerary State with localStorage persistence
  const [itinerary, setItinerary] = useState(() => {
    try {
      const saved = localStorage.getItem('cityshift_itinerary');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not read localStorage", e);
    }
    return [
      PUNE_PLACES.find(p => p.id === 'sinhagad-fort') || PUNE_PLACES[0],
      PUNE_PLACES.find(p => p.id === 'fc-road-food-trail') || PUNE_PLACES[1],
      PUNE_PLACES.find(p => p.id === 'shaniwar-wada') || PUNE_PLACES[2]
    ];
  });

  // Outing Budget & Party size with localStorage
  const [budget, setBudget] = useState(() => {
    try {
      const saved = localStorage.getItem('cityshift_budget');
      if (saved) return Number(saved);
    } catch (e) {}
    return 1500;
  });

  const [partySize, setPartySize] = useState(() => {
    try {
      const saved = localStorage.getItem('cityshift_partysize');
      if (saved) return Number(saved);
    } catch (e) {}
    return 2;
  });

  // Bookmarked Places (Travel Journal) with localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('cityshift_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['pataleshwar-caves', 'vohuman-cafe', 'joshi-railway-museum'];
  });

  // Comparison list
  const [comparedPlaces, setComparedPlaces] = useState(() => {
    return [
      PUNE_PLACES.find(p => p.id === 'shaniwar-wada') || PUNE_PLACES[0],
      PUNE_PLACES.find(p => p.id === 'kelkar-museum') || PUNE_PLACES[3]
    ];
  });

  // Save states to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cityshift_itinerary', JSON.stringify(itinerary));
    } catch (e) {}
  }, [itinerary]);

  useEffect(() => {
    try {
      localStorage.setItem('cityshift_budget', budget.toString());
      localStorage.setItem('cityshift_partysize', partySize.toString());
    } catch (e) {}
  }, [budget, partySize]);

  useEffect(() => {
    try {
      localStorage.setItem('cityshift_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {}
  }, [bookmarkedIds]);

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Itinerary Toggle Helper
  const handleToggleItinerary = (place) => {
    const exists = itinerary.some(item => item.id === place.id);
    if (exists) {
      setItinerary(itinerary.filter(item => item.id !== place.id));
      showToast(`Removed "${place.name}" from itinerary.`);
    } else {
      setItinerary([...itinerary, place]);
      showToast(`Added "${place.name}" to outing plan!`);
    }
  };

  // Bookmark Toggle Helper
  const handleToggleBookmark = (id) => {
    const exists = bookmarkedIds.includes(id);
    const place = PUNE_PLACES.find(p => p.id === id);
    const placeName = place ? place.name : 'Place';

    if (exists) {
      setBookmarkedIds(bookmarkedIds.filter(item => item !== id));
      showToast(`Removed "${placeName}" from Travel Journal.`);
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      showToast(`Saved "${placeName}" to your Travel Journal!`);
    }
  };

  // Compare Toggle Helper
  const handleToggleCompare = (place) => {
    const exists = comparedPlaces.some(p => p.id === place.id);
    if (exists) {
      setComparedPlaces(comparedPlaces.filter(p => p.id !== place.id));
      showToast(`Removed "${place.name}" from comparison.`);
    } else {
      if (comparedPlaces.length >= 4) {
        showToast("Maximum 4 places can be compared at once. Remove one first.");
        return;
      }
      setComparedPlaces([...comparedPlaces, place]);
      showToast(`Added "${place.name}" to comparison matrix.`);
    }
  };

  const handleAddCompare = (place) => {
    if (comparedPlaces.length >= 4) {
      showToast("Maximum 4 places can be compared at once.");
      return;
    }
    if (!comparedPlaces.some(p => p.id === place.id)) {
      setComparedPlaces([...comparedPlaces, place]);
      showToast(`Added "${place.name}" to comparison.`);
    }
  };

  const handleRemoveCompare = (id) => {
    const place = comparedPlaces.find(p => p.id === id);
    setComparedPlaces(comparedPlaces.filter(p => p.id !== id));
    if (place) {
      showToast(`Removed "${place.name}" from comparison.`);
    }
  };

  // Reset to default demo data
  const handleResetAll = () => {
    if (window.confirm("Reset your CityShift demo session to default sample itinerary and budget?")) {
      setItinerary([
        PUNE_PLACES.find(p => p.id === 'sinhagad-fort') || PUNE_PLACES[0],
        PUNE_PLACES.find(p => p.id === 'fc-road-food-trail') || PUNE_PLACES[1],
        PUNE_PLACES.find(p => p.id === 'shaniwar-wada') || PUNE_PLACES[2]
      ]);
      setBudget(1500);
      setPartySize(2);
      setBookmarkedIds(['pataleshwar-caves', 'vohuman-cafe', 'joshi-railway-museum']);
      setComparedPlaces([
        PUNE_PLACES.find(p => p.id === 'shaniwar-wada') || PUNE_PLACES[0],
        PUNE_PLACES.find(p => p.id === 'kelkar-museum') || PUNE_PLACES[3]
      ]);
      localStorage.clear();
      showToast("Session reset to defaults.");
    }
  };

  // Total cost computation
  const totalCost = itinerary.reduce((sum, item) => sum + (item.costPerPerson || 0), 0) * partySize;

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        itineraryCount={itinerary.length}
        totalCost={totalCost}
        compareCount={comparedPlaces.length}
        bookmarkedCount={bookmarkedIds.length}
        onResetAll={handleResetAll}
      />

      {/* Main Body */}
      <main className="main-content">
        {/* Transparent Demo & Hackathon Banner */}
        <div className="demo-banner">
          <div className="demo-banner-content">
            <span className="demo-tag">Urban Editorial Beta</span>
            <span>
              CityShift • Curated cultural intelligence for <strong>Pune, Maharashtra</strong>. 
              Disruptions and citizen alerts are simulated demo models to evaluate the <strong>Smart Plan B Engine</strong>.
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Zero API keys required • 100% Client-Side Engine
          </div>
        </div>

        {/* View Routing */}
        {activeTab === 'explore' && (
          <ExploreView 
            onSelectPlace={(place) => setActiveModalPlace(place)}
            onToggleItinerary={handleToggleItinerary}
            itineraryItems={itinerary}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
            onToggleCompare={handleToggleCompare}
            comparedPlaces={comparedPlaces}
            onGoToPlanB={() => setActiveTab('planb')}
            onGoToGems={() => setActiveTab('gems')}
          />
        )}

        {activeTab === 'gems' && (
          <HiddenGemsView 
            onSelectPlace={(place) => setActiveModalPlace(place)}
            onToggleItinerary={handleToggleItinerary}
            itineraryItems={itinerary}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
            onToggleCompare={handleToggleCompare}
            comparedPlaces={comparedPlaces}
          />
        )}

        {activeTab === 'planb' && (
          <PlanBEngine 
            itinerary={itinerary}
            setItinerary={setItinerary}
            budget={budget}
            setBudget={setBudget}
            partySize={partySize}
            setPartySize={setPartySize}
            onOpenExplore={() => setActiveTab('explore')}
          />
        )}

        {activeTab === 'compare' && (
          <CompareView 
            comparedPlaces={comparedPlaces}
            onRemoveCompare={handleRemoveCompare}
            onAddCompare={handleAddCompare}
            onToggleItinerary={handleToggleItinerary}
            itineraryItems={itinerary}
            onResetCompare={(preset) => setComparedPlaces(preset)}
          />
        )}

        {activeTab === 'signals' && (
          <CitySignalsView />
        )}
      </main>

      {/* Place Detail Dossier Modal */}
      {activeModalPlace && (
        <PlaceDetailModal 
          place={activeModalPlace}
          onClose={() => setActiveModalPlace(null)}
          onToggleItinerary={handleToggleItinerary}
          isInItinerary={itinerary.some(item => item.id === activeModalPlace.id)}
          onToggleCompare={handleToggleCompare}
          isCompared={comparedPlaces.some(p => p.id === activeModalPlace.id)}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={bookmarkedIds.includes(activeModalPlace.id)}
        />
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#f8fafc', fontSize: '1.05rem', marginBottom: '0.2rem' }}>
              CityShift — Explore Freely. Adapt Instantly.
            </div>
            <div>
              Urban Editorial × Midnight City Intelligence • Pune Heritage & Resilient Exploration Platform
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span>Architecture: React 19 + Vite + Leaflet</span>
            <span>Deterministic Plan B Engine</span>
          </div>
        </div>
      </footer>

      {/* Non-blocking feedback toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'rgba(12, 18, 29, 0.96)',
          border: '1px solid var(--accent-amber)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 16px var(--accent-amber-glow)',
          color: '#fff',
          padding: '0.85rem 1.3rem',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.86rem',
          fontWeight: 600,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          animation: 'slideUp 0.25s ease'
        }}>
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
