import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from '../context/ThemeContext';

// Fix Leaflet's default icon path issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom colored circles for markers
const createIcon = (color) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

const camels = [
  { 
    id: 1, name: 'Zain', lat: 23.541, lng: 55.485, temp: '38.5°C', hr: '42 bpm', status: 'Healthy', color: 'var(--color-success)', 
    owner: 'Mohammed Al M.', activity: 'Grazing normally', comments: ['Drank 15L water this morning.', 'Checked by Dr. Salem on Monday.'] 
  },
  { 
    id: 2, name: 'Safa', lat: 23.538, lng: 55.490, temp: '40.2°C', hr: '58 bpm', status: 'Critical', color: 'var(--color-error)',
    owner: 'Khalid A.', activity: 'Resting (Laying down)', comments: ['Signs of dehydration.', 'Veterinarian dispatched.'] 
  },
  { 
    id: 3, name: 'Noor', lat: 23.545, lng: 55.480, temp: '39.8°C', hr: '52 bpm', status: 'Warning', color: 'var(--color-warning)',
    owner: 'Ali R.', activity: 'Slow movement', comments: ['Monitoring for heat stress.', 'Moved to shaded area.'] 
  },
  { 
    id: 4, name: 'Majid', lat: 23.535, lng: 55.495, temp: '38.7°C', hr: '45 bpm', status: 'Healthy', color: 'var(--color-success)',
    owner: 'Mohammed Al M.', activity: 'Active', comments: ['Normal behavior.'] 
  },
];

export default function LiveCamelMap() {
  const { theme } = useTheme();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 'var(--spacing-4) var(--spacing-6)', backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-default)', zIndex: 10 }}>
        <h1 className="text-headline">Live Camel Map</h1>
        <p className="text-caption">Tracking all active collars across the farm.</p>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer center={[23.540, 55.488]} zoom={14} style={{ height: '100%', width: '100%', zIndex: 1 }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={`https://{s}.basemaps.cartocdn.com/${theme === 'light' ? 'light_all' : 'dark_all'}/{z}/{x}/{y}{r}.png`}
          />
          {camels.map(c => (
            <Marker key={c.id} position={[c.lat, c.lng]} icon={createIcon(c.color)}>
              <Popup>
                <div style={{ color: 'var(--color-text-primary)', backgroundColor: 'var(--color-bg-card)', padding: '12px', borderRadius: '12px', minWidth: '220px', fontFamily: 'Inter, sans-serif' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--color-border-default)', paddingBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{c.name}</h3>
                    <span style={{ backgroundColor: `${c.color}20`, color: c.color, padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>{c.status}</span>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Temp</p>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{c.temp}</p>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Heart Rate</p>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{c.hr}</p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Activity / Owner</p>
                    <p style={{ margin: 0, fontSize: '13px' }}>{c.activity} • {c.owner}</p>
                  </div>

                  <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: '8px', borderRadius: '8px' }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Recent Comments</p>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                      {c.comments.map((comment, i) => (
                        <li key={i} style={{ marginBottom: '2px' }}>{comment}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
