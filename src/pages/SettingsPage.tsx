import React from 'react';
import type { Theme } from '../App';

interface SettingsPageProps {
  theme: Theme;
  toggleTheme: () => void;
}

function SettingsSection({ title, icon, iconBg, children }: {
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ui-card" style={{ padding: '1.6rem 1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          {title}
        </h2>
      </div>
      <hr className="divider" style={{ marginBottom: '1.1rem' }} />
      {children}
    </div>
  );
}

function InfoRow({ label, value, valueStyle }: { label: string; value: string; valueStyle?: React.CSSProperties }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0.7rem 0', borderBottom: '1px solid var(--border-color)',
    }}>
      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', ...valueStyle }}>{value}</span>
    </div>
  );
}

export function SettingsPage({ theme, toggleTheme }: SettingsPageProps) {
  return (
    <div className="animate-fade-in" style={{ maxWidth: 680 }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
          Settings
        </h1>
        <p style={{ margin: '0.3rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Manage your ZenTask preferences.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        {/* Appearance */}
        <SettingsSection
          title="Appearance"
          iconBg="var(--accent-soft)"
          icon={
            <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--accent)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          }
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: '0.925rem', color: 'var(--text-primary)' }}>
                Application Theme
              </p>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Currently using <strong>{theme === 'dark' ? 'Dark' : 'Light'}</strong> mode
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Sun icon */}
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20"
                style={{ color: theme === 'light' ? '#f59e0b' : 'var(--text-muted)' }}>
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
              <button
                onClick={toggleTheme}
                className={`toggle-switch ${theme === 'light' ? 'on' : ''}`}
                aria-label="Toggle theme"
              />
              {/* Moon icon */}
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"
                style={{ color: theme === 'dark' ? '#818cf8' : 'var(--text-muted)' }}>
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </div>
          </div>
        </SettingsSection>

        {/* About */}
        <SettingsSection
          title="About Application"
          iconBg="rgba(16,185,129,0.12)"
          icon={
            <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#10b981' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        >
          <div>
            <InfoRow label="Version" value="v1.3 — Flat Dashboard Theme" />
            <InfoRow label="Framework" value="Electron + React + Vite" />
            <InfoRow label="Database" value="Better-SQLite3" />
            <InfoRow
              label="Design System"
              value="Custom Flat UI"
              valueStyle={{ color: 'var(--accent)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem 0' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Developer</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>Zenologic</span>
            </div>
          </div>
        </SettingsSection>

        {/* Danger Zone */}
        <SettingsSection
          title="Danger Zone"
          iconBg="rgba(239,68,68,0.10)"
          icon={
            <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ef4444' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        >
          <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            These actions are permanent and cannot be undone.
          </p>
          <button
            disabled
            style={{
              width: '100%', textAlign: 'left',
              padding: '0.8rem 1rem', borderRadius: 10,
              border: '1px solid rgba(239,68,68,0.25)',
              background: 'rgba(239,68,68,0.05)',
              color: '#ef4444', fontWeight: 600, fontSize: '0.875rem',
              cursor: 'not-allowed', opacity: 0.5, fontFamily: 'inherit',
            }}
          >
            Clear All Data (Factory Reset)
          </button>
        </SettingsSection>

      </div>
    </div>
  );
}
