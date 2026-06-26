import React from 'react';
import { mockCamels } from '../data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

export default function HerdOverview() {
  const healthyCount = mockCamels.filter(c => c.status === 'healthy').length;
  const sickCount = mockCamels.filter(c => c.status === 'sick').length;
  const heatStressCount = mockCamels.filter(c => c.status === 'heat_stress').length;
  
  const data = [
    { name: 'Healthy', value: 201, color: 'var(--color-success)' },
    { name: 'Heat Stress', value: 24, color: 'var(--color-warning)' },
    { name: 'Possible Illness', value: 11, color: 'var(--color-error)' },
    { name: 'Low Activity', value: 11, color: 'var(--color-info)' }
  ];

  const barData = [
    { day: 'Mon', alerts: 4 },
    { day: 'Tue', alerts: 7 },
    { day: 'Wed', alerts: 3 },
    { day: 'Thu', alerts: 9 },
    { day: 'Fri', alerts: 14 },
    { day: 'Sat', alerts: 5 },
    { day: 'Sun', alerts: 8 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      <h1 className="text-headline">Herd Overview</h1>
      
      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-4)' }}>
        <div className="glass-panel" style={{ padding: 'var(--spacing-4)' }}>
          <p className="text-overline">Total Camels</p>
          <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>247</h2>
        </div>
        {data.map(item => (
          <div key={item.name} className="glass-panel" style={{ padding: 'var(--spacing-4)' }}>
            <p className="text-overline">{item.name}</p>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: item.color }}>{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-6)' }}>
        <div className="glass-panel" style={{ padding: 'var(--spacing-6)', height: 350 }}>
          <h3 className="text-title" style={{ marginBottom: 'var(--spacing-4)' }}>Health Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="var(--color-bg-card)" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel" style={{ padding: 'var(--spacing-6)', height: 350 }}>
          <h3 className="text-title" style={{ marginBottom: 'var(--spacing-4)' }}>Daily Alerts Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="day" stroke="var(--color-text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-text-tertiary)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'var(--color-bg-elevated)' }} contentStyle={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)' }} />
              <Bar dataKey="alerts" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
