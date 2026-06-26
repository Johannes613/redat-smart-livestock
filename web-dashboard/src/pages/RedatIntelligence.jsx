import React from 'react';
import { Activity, Thermometer, Droplets } from 'lucide-react';

export default function RedatIntelligence() {
  const insights = [
    {
      id: 1,
      title: 'Heat Stress Escalation',
      description: 'Heat stress cases increased by 22% during the last 5 days.',
      cause: 'Ambient temperature consistently above 45°C coupled with high humidity in the Al Qua\'a East region.',
      action: 'Increase water provisions in eastern grazing zones.',
      icon: Thermometer,
      color: 'var(--color-warning)'
    },
    {
      id: 2,
      title: 'Potential Illness Cluster',
      description: '12 camels reduced movement significantly within the northern grazing area.',
      cause: 'Movement patterns strongly correlate with early-stage respiratory infections based on historical AI models.',
      action: 'Deploy veterinary team to inspect the northern herd.',
      icon: Activity,
      color: 'var(--color-error)'
    },
    {
      id: 3,
      title: 'Resource Optimization',
      description: 'Herd density near Wadi Al Ain well has reached 90% capacity.',
      cause: 'Drying of smaller seasonal pools is forcing convergence.',
      action: 'Distribute auxiliary water troughs to secondary grazing areas.',
      icon: Droplets,
      color: 'var(--color-info)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      <div>
        <h1 className="text-headline">REDAT Intelligence</h1>
        <p className="text-caption">AI-generated insights combining health predictions, weather, and camel density.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        {insights.map(insight => {
          const Icon = insight.icon;
          return (
            <div key={insight.id} className="glass-panel" style={{ padding: 'var(--spacing-6)', display: 'flex', gap: 'var(--spacing-6)' }}>
              <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-lg)', backgroundColor: `${insight.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={32} color={insight.color} />
              </div>
              <div>
                <h3 className="text-title" style={{ color: insight.color, marginBottom: '8px' }}>Insight #{insight.id}: {insight.title}</h3>
                <p style={{ fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>{insight.description}</p>
                <div style={{ backgroundColor: 'var(--color-bg-base)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  <p className="text-caption" style={{ marginBottom: '4px' }}><strong>Possible Cause:</strong> {insight.cause}</p>
                  <p className="text-caption"><strong>Recommended Action:</strong> {insight.action}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
