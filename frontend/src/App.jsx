import React, { useState, useEffect } from 'react';
import HeaderNav from './components/HeaderNav';
import PrismHero from './components/PrismHero';
import MemoryGallery from './components/MemoryGallery';
import PrivateChat from './components/PrivateChat';
import LoveNotes from './components/LoveNotes';
import Sept4SpecialMode from './components/Sept4SpecialMode';

export default function App() {
  const [activeTab, setActiveTab] = useState('hero');
  const [currentUser, setCurrentUser] = useState('kashish'); // 'kashish' or 'dev'
  const [isSept4Mode, setIsSept4Mode] = useState(false);

  // Auto-detect September 4th date on mount
  useEffect(() => {
    const today = new Date();
    if (today.getMonth() === 8 && today.getDate() === 4) { // Month 8 is September (0-indexed)
      setIsSept4Mode(true);
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-obsidian)', color: 'var(--color-bone-white)' }}>
      {/* September 4 Special Birthday Overlay View */}
      {isSept4Mode && (
        <Sept4SpecialMode onClose={() => setIsSept4Mode(false)} />
      )}

      {/* Header Navigation */}
      <HeaderNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        isSept4Mode={isSept4Mode}
        setIsSept4Mode={setIsSept4Mode}
      />

      {/* Main Content Area */}
      <main>
        {activeTab === 'hero' && (
          <>
            <PrismHero
              onExploreMemories={() => setActiveTab('memories')}
              onOpenChat={() => setActiveTab('chat')}
            />
            <div className="hairline-divider" />
            <MemoryGallery />
            <div className="hairline-divider" />
            <LoveNotes />
          </>
        )}

        {activeTab === 'memories' && <MemoryGallery />}

        {activeTab === 'chat' && <PrivateChat currentUser={currentUser} />}

        {activeTab === 'notes' && <LoveNotes />}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--color-obsidian)',
        padding: '60px 24px 40px 24px',
        borderTop: '1px solid var(--color-ash-border)',
        marginTop: '108px'
      }}>
        <div style={{
          maxWidth: 'var(--page-max-width)',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '40px'
        }}>
          <div>
            <div style={{
              fontSize: '20px',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              Vivid+Co × Kashish
            </div>
            <p style={{ color: 'var(--color-fog-blue)', fontSize: '15px', maxWidth: '360px' }}>
              Prismatic light through obsidian. Crafted with infinite care by Harshit for Kashish.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '40px', fontSize: '14px', color: 'var(--color-fog-blue)' }}>
            <div>
              <div style={{ color: 'var(--color-bone-white)', fontWeight: 600, marginBottom: '8px' }}>
                SECURITY & PRIVACY
              </div>
              <div>2-Day Chat TTL Purge Enabled</div>
              <div>PostgreSQL Supabase Encryption</div>
            </div>

            <div>
              <div style={{ color: 'var(--color-bone-white)', fontWeight: 600, marginBottom: '8px' }}>
                SPECIAL EDITIONS
              </div>
              <div 
                onClick={() => setIsSept4Mode(true)}
                style={{ cursor: 'pointer', color: '#ff2a2a', fontWeight: 600 }}
              >
                04 September Celebration ✨
              </div>
            </div>
          </div>
        </div>

        <div className="hairline-divider" style={{ margin: '30px 0' }} />

        <div style={{
          maxWidth: 'var(--page-max-width)',
          margin: '0 auto',
          fontSize: '13px',
          color: 'var(--color-fog-blue)',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <div>© {new Date().getFullYear()} Vivid+Co. All rights reserved.</div>
          <div>Designed exclusively for Kashish.</div>
        </div>
      </footer>
    </div>
  );
}
