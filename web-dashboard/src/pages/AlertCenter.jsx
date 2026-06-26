import React from 'react';
import { AlertCircle, ThermometerSun, Activity } from 'lucide-react';

export default function AlertCenter() {
  const alerts = [
    {
      id: 1,
      camel: 'Safa (#103)',
      type: 'Critical',
      prediction: 'Respiratory Illness',
      confidence: '94%',
      temp: '40.2°C',
      time: '10 mins ago',
      color: 'var(--color-error)'
    },
    {
      id: 2,
      camel: 'Noor (#87)',
      type: 'Warning',
      prediction: 'Heat Stress',
      confidence: '91%',
      temp: '39.8°C',
      time: '45 mins ago',
      color: 'var(--color-warning)'
    },
    {
      id: 3,
      camel: 'Layla (#42)',
      type: 'Info',
      prediction: 'Low Activity (Pregnancy)',
      confidence: '88%',
      temp: '38.0°C',
      time: '2 hours ago',
      color: 'var(--color-info)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      <div>
        <h1 className="text-headline">Alert Center</h1>
        <p className="text-caption">All high-priority alerts across your entire herd.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        {alerts.map(alert => (
          <div key={alert.id} className="glass-panel" style={{ padding: 'var(--spacing-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-full)', backgroundColor: `${alert.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertCircle size={24} color={alert.color} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 className="text-title" style={{ fontSize: '18px' }}>{alert.camel}</h3>
                  <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', backgroundColor: `${alert.color}20`, color: alert.color, fontSize: '12px', fontWeight: 600 }}>{alert.type}</span>
                </div>
                <p className="text-caption" style={{ color: 'var(--color-text-primary)', fontSize: '14px' }}>Prediction: <strong>{alert.prediction}</strong> (Confidence: {alert.confidence})</p>
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ThermometerSun size={14} color="var(--color-text-tertiary)" />
                    <span className="text-caption">{alert.temp}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <p className="text-caption" style={{ marginBottom: '8px' }}>{alert.time}</p>
              <button style={{ padding: '8px 16px', backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-primary)' }}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
