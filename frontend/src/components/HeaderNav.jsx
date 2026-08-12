import React from 'react';
import { Sparkles, UserCheck, Calendar, Lock } from 'lucide-react';

export default function HeaderNav({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  setCurrentUser, 
  isSept4Mode, 
  setIsSept4Mode 
}) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(16, 16, 16, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-ash-border)',
      padding: '16px 24px'
    }}>
      <div style={{
        maxWidth: 'var(--page-max-width)',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Wordmark */}
        <div 
          onClick={() => setActiveTab('hero')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <span style={{
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--color-bone-white)',
            textTransform: 'uppercase'
          }}>
            Vivid+Co <span style={{ color: 'var(--color-fog-blue)', fontWeight: 400 }}>× Kashish</span>
          </span>
        </div>

        {/* Ghost Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <button 
            className={`ghost-nav-button ${activeTab === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveTab('hero')}
          >
            EXPERTISE
          </button>
          <button 
            className={`ghost-nav-button ${activeTab === 'memories' ? 'active' : ''}`}
            onClick={() => setActiveTab('memories')}
          >
            MEMORIES
          </button>
          <button 
            className={`ghost-nav-button ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            EPHEMERAL CHAT 🔒
          </button>
          <button 
            className={`ghost-nav-button ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            WHY YOU'RE SPECIAL
          </button>
        </nav>

        {/* CTAs & Persona Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* September 4 Special Mode Toggle */}
          <button 
            className="outlined-contact-button"
            style={{ 
              borderColor: isSept4Mode ? '#ff2a2a' : 'var(--color-bone-white)',
              color: isSept4Mode ? '#ff2a2a' : 'var(--color-bone-white)',
              boxShadow: isSept4Mode ? '0 0 12px rgba(255, 42, 42, 0.4)' : 'none'
            }}
            onClick={() => setIsSept4Mode(!isSept4Mode)}
            title="Toggle 4th September Special Birthday Mode"
          >
            <Sparkles size={14} color={isSept4Mode ? '#ff2a2a' : 'var(--color-bone-white)'} />
            {isSept4Mode ? 'SEPT 4 SPECIAL ON ✨' : 'PREVIEW 04.09 MODE'}
          </button>

          {/* Persona Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--color-graphite-veil)',
            borderRadius: '5px',
            padding: '2px',
            border: '1px solid var(--color-ash-border)'
          }}>
            <button
              onClick={() => setCurrentUser('kashish')}
              style={{
                background: currentUser === 'kashish' ? 'var(--color-bone-white)' : 'transparent',
                color: currentUser === 'kashish' ? 'var(--color-obsidian)' : 'var(--color-bone-white)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              KASHISH
            </button>
            <button
              onClick={() => setCurrentUser('dev')}
              style={{
                background: currentUser === 'dev' ? 'var(--color-bone-white)' : 'transparent',
                color: currentUser === 'dev' ? 'var(--color-obsidian)' : 'var(--color-bone-white)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              DEV (HARSHIT)
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
