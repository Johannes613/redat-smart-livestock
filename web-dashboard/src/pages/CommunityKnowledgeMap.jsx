import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from '../context/ThemeContext';

const createIcon = (emoji, color) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 0 8px rgba(0,0,0,0.5);">${emoji}</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

const pins = [
  { id: 1, type: 'Water', emoji: '💧', lat: 23.541, lng: 55.485, title: 'Fresh Water Well', author: 'Khalid A.', color: 'var(--color-info)', time: '2h ago', comments: ['Water level is good today.', 'Troughs were cleaned.'] },
  { id: 2, type: 'Vet', emoji: '🏥', lat: 23.538, lng: 55.490, title: 'Mobile Vet Clinic', author: 'Dr. Salem', color: 'var(--color-success)', time: '1d ago', comments: ['Available for consultations until 5 PM.', 'Stocked with heat stress IVs.'] },
  { id: 3, type: 'Grazing', emoji: '🌿', lat: 23.545, lng: 55.480, title: 'Green Patches', author: 'Mohammed', color: 'var(--color-success)', time: '3h ago', comments: ['Lots of fresh shrubs.', 'Area is safe and uncrowded.'] },
  { id: 4, type: 'Hazard', emoji: '⚠️', lat: 23.535, lng: 55.495, title: 'Camel Pox Case', author: 'Ali R.', color: 'var(--color-error)', time: '5h ago', comments: ['Avoid this route!', 'Reported to local authorities.'] },
];

export default function CommunityKnowledgeMap() {
  const { theme } = useTheme();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 'var(--spacing-4) var(--spacing-6)', backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-default)', zIndex: 10 }}>
        <h1 className="text-headline">Community Knowledge Map</h1>
        <p className="text-caption">Crowdsourced farm intelligence from the Al Qua'a community.</p>
      </div>
      
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer center={[23.540, 55.488]} zoom={14} style={{ height: '100%', width: '100%', zIndex: 1 }}>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url={`https://{s}.basemaps.cartocdn.com/${theme === 'light' ? 'light_all' : 'dark_all'}/{z}/{x}/{y}{r}.png`}
          />
          {pins.map(p => (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={createIcon(p.emoji, p.color)}>
              <Popup>
                <div style={{ color: 'var(--color-text-primary)', backgroundColor: 'var(--color-bg-card)', padding: '12px', borderRadius: '12px', minWidth: '220px', fontFamily: 'Inter, sans-serif' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', borderBottom: '1px solid var(--color-border-default)', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '24px' }}>{p.emoji}</span>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{p.title}</h3>
                      <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-text-secondary)' }}>Posted by {p.author} • {p.time}</p>
                    </div>
                  </div>
                  
                  <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: '8px', borderRadius: '8px' }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Community Comments</p>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                      {p.comments.map((comment, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>"{comment}"</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend Overlay */}
        <div className="glass-panel" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000, padding: 'var(--spacing-4)', display: 'flex', gap: 'var(--spacing-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '18px' }}>💧</span><span className="text-caption">Water</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '18px' }}>🏥</span><span className="text-caption">Vets</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '18px' }}>🌿</span><span className="text-caption">Grazing</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '18px' }}>⚠️</span><span className="text-caption">Hazards</span></div>
        </div>
      </div>
    </div>
  );
}
