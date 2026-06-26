import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function PredictiveAnalytics() {
  const data = [
    { day: 'Today', healthy: 201, heatStress: 24, illnessRisk: 11 },
    { day: 'Day 2', healthy: 198, heatStress: 28, illnessRisk: 12 },
    { day: 'Day 3', healthy: 195, heatStress: 31, illnessRisk: 14 },
    { day: 'Day 4', healthy: 195, heatStress: 33, illnessRisk: 15 },
    { day: 'Day 5', healthy: 193, heatStress: 35, illnessRisk: 16 },
    { day: 'Day 6', healthy: 192, heatStress: 38, illnessRisk: 17 },
    { day: 'Day 7', healthy: 192, heatStress: 38, illnessRisk: 17 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      <div>
        <h1 className="text-headline">Predictive Analytics</h1>
        <p className="text-caption">7-Day forecasts modeled by REDAT AI</p>
      </div>

      <div className="glass-panel" style={{ padding: 'var(--spacing-6)', height: 400 }}>
        <h3 className="text-title" style={{ marginBottom: 'var(--spacing-4)' }}>Next 7 Days Forecast</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="day" stroke="var(--color-text-tertiary)" tickLine={false} axisLine={false} />
            <YAxis stroke="var(--color-text-tertiary)" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-default)' }} />
            <Area type="monotone" dataKey="healthy" stackId="1" stroke="var(--color-success)" fill="var(--color-success)" />
            <Area type="monotone" dataKey="heatStress" stackId="1" stroke="var(--color-warning)" fill="var(--color-warning)" />
            <Area type="monotone" dataKey="illnessRisk" stackId="1" stroke="var(--color-error)" fill="var(--color-error)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <div className="glass-panel" style={{ flex: 1, padding: 'var(--spacing-6)' }}>
          <p className="text-overline">Forecasted by Day 7</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
            <div>
              <p className="text-caption" style={{ color: 'var(--color-success)' }}>Healthy</p>
              <h2 className="text-headline" style={{ color: 'var(--color-success)' }}>192</h2>
            </div>
            <div>
              <p className="text-caption" style={{ color: 'var(--color-warning)' }}>Heat Stress</p>
              <h2 className="text-headline" style={{ color: 'var(--color-warning)' }}>38</h2>
            </div>
            <div>
              <p className="text-caption" style={{ color: 'var(--color-error)' }}>Illness Risk</p>
              <h2 className="text-headline" style={{ color: 'var(--color-error)' }}>17</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
