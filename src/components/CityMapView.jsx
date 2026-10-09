import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Plus, Check, Eye } from 'lucide-react';

export default function CityMapView({ places, selectedPlace, onSelectPlace, onToggleItinerary, itineraryItems }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map if not already done
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [18.5204, 73.8567], // Pune center
        zoom: 12,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear previous markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Custom marker icon helper
    places.forEach((place) => {
      const [lat, lng] = place.coordinates;
      
      const isIndoor = place.isIndoor;
      const markerColor = isIndoor ? '#10b981' : '#6366f1';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background: ${markerColor};
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            border: 2px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
            font-weight: bold;
            cursor: pointer;
          ">
            ${place.category === 'Local Food & Cafes' ? '🍽️' : isIndoor ? '🏛️' : '📍'}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      // Popup Content
      const popupDiv = document.createElement('div');
      popupDiv.style.minWidth = '200px';
      popupDiv.innerHTML = `
        <div style="font-family: inherit; padding: 4px;">
          <div style="font-weight: 700; font-size: 14px; color: #f8fafc; margin-bottom: 2px;">${place.name}</div>
          <div style="font-size: 12px; color: #94a3b8; margin-bottom: 6px;">${place.neighborhood} • ${place.costPerPerson === 0 ? 'Free' : '₹' + place.costPerPerson}</div>
          <div style="font-size: 11px; color: #38bdf8; margin-bottom: 8px;">★ ${place.rating} (${place.reviewCount} reviews)</div>
          <button id="view-btn-${place.id}" style="
            background: #6366f1; 
            color: white; 
            border: none; 
            padding: 5px 10px; 
            border-radius: 6px; 
            font-size: 11px; 
            font-weight: 600; 
            cursor: pointer;
            width: 100%;
          ">View Details</button>
        </div>
      `;

      marker.bindPopup(popupDiv);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`view-btn-${place.id}`);
        if (btn) {
          btn.onclick = () => onSelectPlace(place);
        }
      });

      markersRef.current[place.id] = marker;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [places]);

  // Pan to selected place if available
  useEffect(() => {
    if (selectedPlace && mapInstanceRef.current) {
      const [lat, lng] = selectedPlace.coordinates;
      mapInstanceRef.current.setView([lat, lng], 14, { animate: true });
      if (markersRef.current[selectedPlace.id]) {
        markersRef.current[selectedPlace.id].openPopup();
      }
    }
  }, [selectedPlace]);

  return (
    <div className="map-layout-wrapper">
      <div className="leaflet-map-holder" ref={mapContainerRef} />
      
      {/* Sidebar of places for instant pan & select */}
      <div className="map-sidebar-places">
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', padding: '0.2rem 0' }}>
          Interactive Map Pins ({places.length} Locations)
        </div>
        {places.map((place) => {
          const inItinerary = itineraryItems.some(item => item.id === place.id);
          return (
            <div 
              key={place.id}
              onClick={() => {
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.setView(place.coordinates, 14, { animate: true });
                  if (markersRef.current[place.id]) {
                    markersRef.current[place.id].openPopup();
                  }
                }
              }}
              style={{
                background: 'rgba(19, 29, 51, 0.7)',
                borderRadius: '10px',
                padding: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#fff' }}>{place.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {place.neighborhood} • {place.costPerPerson === 0 ? 'Free' : `₹${place.costPerPerson}`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPlace(place);
                  }}
                  style={{
                    padding: '0.35rem 0.6rem',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#cbd5e1',
                    fontSize: '0.75rem'
                  }}
                  title="Quick View"
                >
                  <Eye size={14} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleItinerary(place);
                  }}
                  style={{
                    padding: '0.35rem 0.6rem',
                    borderRadius: '6px',
                    background: inItinerary ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                    color: inItinerary ? '#6ee7b7' : '#c7d2fe',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                  title={inItinerary ? "In Itinerary" : "Add to Itinerary"}
                >
                  {inItinerary ? <Check size={14} /> : <Plus size={14} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
