import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Star, Gift, X, Volume2, Music } from 'lucide-react';

export default function Sept4SpecialMode({ onClose }) {
  const [data, setData] = useState(null);
  const [unlockedIndex, setUnlockedIndex] = useState(null);

  useEffect(() => {
    // Launch celebratory confetti burst
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff2a2a', '#2a7fff', '#2aff2a', '#fffdf9', '#ffd700']
    });

    // Fetch 4th September special data from backend API
    fetch('/api/special/sept4?force=true')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(() => {
        // Fallback default payload if backend offline
        setData({
          title: "Happy Special Day, Kashish! ✨",
          headline: "TO THE MOST MAGNIFICENT PERSON IN MY UNIVERSE",
          subtitle: "Today, September 4th, the cosmos aligned to bring light into the world. You are the chromatic prism that turns monochrome days into vibrant magic.",
          wishes: [
            "May your smile remain as radiant as prismatic caustics through obsidian glass.",
            "May all your wildest dreams take flight, surrounded by unconditional love and warmth.",
            "Thank you for being my anchor, my muse, and my favorite conversation every single day.",
            "Always remember: you are deeply cherished, today and for all the days to come."
          ],
          surprises: [
            { code: "SECRET-01", note: "A lifetime pass to endless hugs, warm coffee, and midnight talks." },
            { code: "SECRET-02", note: "Every single line of code in this application was written thinking of your smile." },
            { code: "SECRET-03", note: "Your presence makes the ordinary feel extraordinary." }
          ]
        });
      });
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      backgroundColor: 'rgba(10, 10, 10, 0.95)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      color: 'var(--color-bone-white)',
      padding: '40px 24px'
    }}>
      {/* Background RGB Caustics Glow */}
      <div className="prism-glow-bg" style={{ width: '800px', height: '800px', opacity: 0.8 }} />

      {/* Top Header */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto 30px auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles color="#ff2a2a" size={28} />
          <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.1em' }}>
            04 SEPTEMBER SPECIAL EDITION
          </span>
        </div>

        {onClose && (
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255, 253, 249, 0.1)',
              border: '1px solid var(--color-ash-border)',
              color: 'var(--color-bone-white)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 20px',
          borderRadius: '9999px',
          border: '1px solid #ff2a2a',
          color: '#ff2a2a',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          marginBottom: '24px',
          backgroundColor: 'rgba(255, 42, 42, 0.1)'
        }}>
          HAPPY SEPTEMBER 4TH, KASHISH ❤️
        </div>

        <h1 className="display-headline-sm" style={{
          fontSize: 'clamp(36px, 6vw, 76px)',
          lineHeight: '1.05',
          margin: '0 auto 24px auto',
          color: 'var(--color-bone-white)'
        }}>
          {data?.headline || "TO THE MOST MAGNIFICENT PERSON IN MY UNIVERSE"}
        </h1>

        <p style={{
          fontSize: '20px',
          color: 'var(--color-fog-blue)',
          maxWidth: '680px',
          margin: '0 auto 48px auto',
          lineHeight: '1.6'
        }}>
          {data?.subtitle}
        </p>

        {/* September 4th Birthday Hero Artwork */}
        <div style={{
          position: 'relative',
          borderRadius: '15px',
          overflow: 'hidden',
          marginBottom: '60px',
          border: '1px solid rgba(255, 253, 249, 0.2)',
          boxShadow: '0 0 40px rgba(255, 42, 42, 0.2)'
        }}>
          <img 
            src="/assets/september4_memory.jpg" 
            alt="September 4th Celebration"
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(16,16,16,0.9) 0%, transparent 60%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '30px'
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-bone-white)' }}>
                04 SEPTEMBER 🌟
              </div>
              <div style={{ color: 'var(--color-fog-blue)', fontSize: '16px' }}>
                A date etched in light & love.
              </div>
            </div>
          </div>
        </div>

        {/* Wishes List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '60px'
        }}>
          {data?.wishes?.map((wish, idx) => (
            <div key={idx} className="glass-card" style={{ textAlign: 'left', padding: '24px' }}>
              <Star color="#ffd700" size={24} style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '17px', lineHeight: '1.5', color: 'var(--color-bone-white)' }}>
                "{wish}"
              </p>
            </div>
          ))}
        </div>

        {/* Secret Surprise Unlockables */}
        <h2 style={{ fontSize: '28px', marginBottom: '24px', textTransform: 'uppercase' }}>
          🎁 September 4 Secret Surprises
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '60px'
        }}>
          {data?.surprises?.map((s, idx) => (
            <div 
              key={idx} 
              onClick={() => setUnlockedIndex(unlockedIndex === idx ? null : idx)}
              style={{
                background: unlockedIndex === idx ? 'rgba(255, 42, 42, 0.15)' : 'var(--color-graphite-veil)',
                border: '1px solid ' + (unlockedIndex === idx ? '#ff2a2a' : 'var(--color-ash-border)'),
                borderRadius: '15px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
            >
              <Gift color={unlockedIndex === idx ? '#ff2a2a' : 'var(--color-bone-white)'} size={32} style={{ marginBottom: '12px' }} />
              <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>
                {s.code}
              </div>
              <div style={{ fontSize: '14px', color: unlockedIndex === idx ? 'var(--color-bone-white)' : 'var(--color-fog-blue)' }}>
                {unlockedIndex === idx ? s.note : "Click to reveal secret note"}
              </div>
            </div>
          ))}
        </div>

        <div style={{ paddingBottom: '60px' }}>
          <button 
            className="outlined-contact-button"
            onClick={() => {
              confetti({ particleCount: 150, spread: 120 });
            }}
            style={{ fontSize: '16px', padding: '14px 28px' }}
          >
            CELEBRATE & TRIGGER CONFETTI 🎉
          </button>
        </div>
      </div>
    </div>
  );
}
