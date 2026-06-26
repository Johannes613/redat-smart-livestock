import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Activity,
  BrainCircuit,
  Users,
  TrendingUp,
  BellRing
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Herd Overview', path: '/' },
  { icon: Map, label: 'Live Camel Map', path: '/live-map' },
  { icon: Activity, label: 'AI Risk Heatmap', path: '/ai-heatmap' },
  { icon: BrainCircuit, label: 'REDAT Intelligence', path: '/intelligence' },
  { icon: Users, label: 'Community Map', path: '/community-map' },
  { icon: TrendingUp, label: 'Predictive Analytics', path: '/predictive' },
  { icon: BellRing, label: 'Alert Center', path: '/alerts' },
];

export default function Sidebar() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg-surface)', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div style={{ padding: '24px 16px 16px', borderBottom: '1px solid var(--color-border-default)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-accent-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-accent-border)' }}>
            <img src="/redat_ai.png" alt="REDAT" style={{ width: 20, height: 20, filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(15deg)' }} />
          </div>
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '15px' }}>REDAT CC</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 12px', gap: '4px', display: 'flex', flexDirection: 'column' }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
                backgroundColor: isActive ? 'var(--color-accent-muted)' : 'transparent',
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                border: isActive ? '1px solid var(--color-accent-border)' : '1px solid transparent',
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} color={isActive ? 'var(--color-accent)' : 'var(--color-text-tertiary)'} />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid var(--color-border-default)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 4px' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--color-bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-primary)', fontSize: '12px', fontWeight: 700 }}>
            MA
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: 'var(--color-text-primary)', fontSize: '13px', fontWeight: 600, margin: 0 }}>
              Mohammed Al M.
            </p>
            <p style={{ color: 'var(--color-text-tertiary)', fontSize: '11px', margin: '2px 0 0' }}>
              Farm Manager
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
