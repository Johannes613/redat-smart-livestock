import React from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import { useTheme } from '../context/ThemeContext';

export default function AIRiskHeatmap() {
  const { theme } = useTheme();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 'var(--spacing-4) var(--spacing-6)', backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-default)', zIndex: 10 }}>
        <h1 className="text-headline">AI Risk Heatmap</h1>
        <p className="text-caption">Digital twin visualization of aggregated predictions and health clusters.</p>
      </div>
      
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer center={[23.545, 55.485]} zoom={13} style={{ height: '100%', width: '100%', zIndex: 1 }}>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url={`https://{s}.basemaps.cartocdn.com/${theme === 'light' ? 'light_all' : 'dark_all'}/{z}/{x}/{y}{r}.png`}
          />
          
          {/* Heat Stress Hotspot */}
          <Circle 
            center={[23.548, 55.480]} 
            radius={800} 
            pathOptions={{ color: 'var(--color-warning)', fillColor: 'var(--color-warning)', fillOpacity: 0.4, weight: 0 }} 
          />
          
          {/* Illness Cluster */}
          <Circle 
            center={[23.535, 55.495]} 
            radius={500} 
            pathOptions={{ color: 'var(--color-error)', fillColor: 'var(--color-error)', fillOpacity: 0.5, weight: 0 }} 
          />

          {/* Low Activity Cluster */}
          <Circle 
            center={[23.550, 55.498]} 
            radius={600} 
            pathOptions={{ color: 'var(--color-info)', fillColor: 'var(--color-info)', fillOpacity: 0.3, weight: 0 }} 
          />
        </MapContainer>

        {/* Legend Overlay */}
        <div className="glass-panel" style={{ position: 'absolute', bottom: '30px', right: '30px', zIndex: 1000, padding: 'var(--spacing-4)', minWidth: '200px' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '12px', fontWeight: 'bold' }}>Risk Zones</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: 'var(--color-warning)', opacity: 0.7 }}></div>
            <span className="text-caption">Heat Stress Hotspots</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: 'var(--color-error)', opacity: 0.7 }}></div>
            <span className="text-caption">Illness Clusters</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: 'var(--color-info)', opacity: 0.7 }}></div>
            <span className="text-caption">Low Activity Clusters</span>
          </div>
        </div>
      </div>
    </div>
  );
}
