import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import Sidebar from './Sidebar';
import { useTheme } from '../../context/ThemeContext';

export default function AppLayout({ children }) {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isFullHeight = ['/live-map', '/ai-heatmap', '/community-map'].includes(pathname);

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'var(--color-bg-base)',
      color: 'var(--color-text-primary)'
    }}>
      {/* Desktop sidebar */}
      <aside style={{
        display: 'flex',
        flexDirection: 'column',
        width: '240px',
        flexShrink: 0,
        height: '100%',
        overflowY: 'auto',
        borderRight: '1px solid var(--color-border-default)'
      }}>
        <Sidebar />
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        {/* Topbar placeholder for future expansion */}
        <div style={{ 
          height: '60px', 
          borderBottom: '1px solid var(--color-border-default)', 
          backgroundColor: 'var(--color-bg-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--spacing-6)'
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>REDAT Command Center</h2>
          <button 
            onClick={toggleTheme}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: 40, 
              height: 40, 
              borderRadius: 'var(--radius-full)', 
              backgroundColor: 'var(--color-bg-elevated)',
              color: 'var(--color-text-primary)'
            }}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {isFullHeight ? (
          <main style={{ flex: 1, overflow: 'hidden' }}>
            {children}
          </main>
        ) : (
          <main style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ padding: 'var(--spacing-6)', maxWidth: '1280px', margin: '0 auto' }}>
              {children}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
