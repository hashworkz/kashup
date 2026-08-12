import React, { useState } from 'react';
import { Heart, Sparkles, Lock, Unlock, Moon, Star } from 'lucide-react';

export default function LoveNotes() {
  const notes = [
    {
      id: 1,
      title: "Your Unmatched Grace",
      preview: "Click to flip and reveal reason #1",
      content: "You bring a sense of poise and warmth into every room you enter. Even on monochrome days, your energy creates a full spectrum of joy."
    },
    {
      id: 2,
      title: "The Way You Smile",
      preview: "Click to flip and reveal reason #2",
      content: "Your genuine laughter has a way of turning stress into serenity. It's the highlight of my day, every single time."
    },
    {
      id: 3,
      title: "Our Late-Night Conversations",
      preview: "Click to flip and reveal reason #3",
      content: "From random midnight thoughts to deep life goals, talking with you feels like home. Time simply disappears."
    },
    {
      id: 4,
      title: "Your Kindness & Heart",
      preview: "Click to flip and reveal reason #4",
      content: "You care so deeply about the people in your life. Your empathy and tenderness are truly extraordinary."
    },
    {
      id: 5,
      title: "My Favorite Muse",
      preview: "Click to flip and reveal reason #5",
      content: "Every design decision, RGB refraction, and line of code in this application was inspired by making you feel cherished."
    },
    {
      id: 6,
      title: "Timeless Connection",
      preview: "Click to flip and reveal reason #6",
      content: "No matter how much the world changes, what we share remains authentic, real, and forever special."
    }
  ];

  const [flipped, setFlipped] = useState({});

  const toggleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section style={{
      maxWidth: 'var(--page-max-width)',
      margin: '0 auto',
      padding: '60px 24px',
      minHeight: '80vh'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{
          fontSize: '15px',
          color: 'var(--color-fog-blue)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '12px'
        }}>
          INTERACTIVE SECRET NOTES
        </div>
        <h2 className="display-headline-sm" style={{
          fontSize: 'clamp(32px, 5vw, 64px)',
          fontWeight: 400,
          color: 'var(--color-bone-white)',
          marginBottom: '16px'
        }}>
          WHY YOU ARE SO SPECIAL, KASHISH
        </h2>
        <p style={{ fontSize: '18px', color: 'var(--color-fog-blue)', maxWidth: '600px', margin: '0 auto' }}>
          Tap any card below to flip it open and read a personal message written just for you.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '28px'
      }}>
        {notes.map((n) => {
          const isFlipped = flipped[n.id];
          return (
            <div
              key={n.id}
              onClick={() => toggleFlip(n.id)}
              style={{
                perspective: '1000px',
                height: '240px',
                cursor: 'pointer'
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transition: 'transform 0.6s cubic-bezier(0.52, 0.01, 0, 1)',
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}>
                {/* Front Side */}
                <div className="glass-card" style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '28px',
                  border: '1px solid rgba(255, 253, 249, 0.15)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Sparkles color="#ff2a2a" size={24} />
                    <span style={{ fontSize: '12px', color: 'var(--color-fog-blue)', textTransform: 'uppercase' }}>
                      NOTE #{n.id}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-bone-white)', marginBottom: '8px' }}>
                      {n.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--color-fog-blue)' }}>
                      {n.preview}
                    </p>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--color-bone-white)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Unlock size={14} /> TAP TO REVEAL
                  </div>
                </div>

                {/* Back Side */}
                <div className="glass-card" style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '28px',
                  backgroundColor: 'rgba(73, 87, 100, 0.5)',
                  borderColor: '#ff2a2a'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Heart color="#ff2a2a" fill="#ff2a2a" size={20} />
                    <span style={{ fontSize: '12px', color: 'var(--color-bone-white)', fontWeight: 600 }}>
                      FROM HARSHIT
                    </span>
                  </div>

                  <p style={{ fontSize: '16px', lineHeight: '1.5', color: 'var(--color-bone-white)', italic: 'true' }}>
                    "{n.content}"
                  </p>

                  <div style={{ fontSize: '12px', color: 'var(--color-fog-blue)' }}>
                    Tap again to close
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
