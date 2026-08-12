import React, { useState, useEffect } from 'react';
import { Heart, Plus, Image as ImageIcon, Sparkles, Filter, X } from 'lucide-react';

export default function MemoryGallery() {
  const [memories, setMemories] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('Special Moment');

  const fetchMemories = () => {
    fetch('/api/memories')
      .then((res) => res.json())
      .then((data) => setMemories(data))
      .catch((err) => console.error('Failed to fetch memories:', err));
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const handleLike = (id, e) => {
    e.stopPropagation();
    fetch(`/api/memories/${id}/like`, { method: 'POST' })
      .then((res) => res.json())
      .then((updated) => {
        setMemories((prev) => prev.map((m) => (m.id === id ? updated : m)));
      })
      .catch((err) => console.error('Like error:', err));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    fetch('/api/memories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        imageUrl: imageUrl.trim() || '/assets/prismatic_portrait.jpg',
        category
      })
    })
      .then((res) => res.json())
      .then((newMem) => {
        setMemories([newMem, ...memories]);
        setShowAddModal(false);
        setTitle('');
        setDescription('');
        setImageUrl('');
      });
  };

  const categories = ['ALL', 'SPECIAL MOMENT', 'LATE NIGHT', 'BIRTHDAY SPECIAL', 'ROMANTIC'];

  const filteredMemories = memories.filter((m) => {
    if (filter === 'ALL') return true;
    return m.category?.toUpperCase() === filter;
  });

  return (
    <section style={{
      maxWidth: 'var(--page-max-width)',
      margin: '0 auto',
      padding: '60px 24px',
      minHeight: '80vh'
    }}>
      {/* Section Eyebrow & Title */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{
            fontSize: '15px',
            color: 'var(--color-fog-blue)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            CURATED MEMORIES · FOR KASHISH
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: 'var(--color-bone-white)'
          }}>
            CHRONICLES OF LIGHT & MOMENTS
          </h2>
        </div>

        <button
          className="outlined-contact-button"
          onClick={() => setShowAddModal(true)}
          style={{ fontSize: '14px' }}
        >
          <Plus size={16} /> ADD NEW MEMORY
        </button>
      </div>

      {/* Category Filter Pills */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '40px',
        overflowX: 'auto',
        paddingBottom: '8px'
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              background: filter === cat ? 'var(--color-bone-white)' : 'var(--color-graphite-veil)',
              color: filter === cat ? 'var(--color-obsidian)' : 'var(--color-bone-white)',
              border: '1px solid var(--color-ash-border)',
              borderRadius: '9999px',
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Memory Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '30px'
      }}>
        {filteredMemories.map((m) => (
          <div
            key={m.id}
            onClick={() => setActiveImage(m)}
            className="glass-card"
            style={{
              padding: '0',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={m.imageUrl || '/assets/prismatic_portrait.jpg'}
                alt={m.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(16, 16, 16, 0.75)',
                backdropFilter: 'blur(8px)',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--color-bone-white)',
                border: '1px solid rgba(255, 253, 249, 0.15)'
              }}>
                {m.category || 'Memory'}
              </div>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-bone-white)' }}>
                  {m.title}
                </h3>
                <button
                  onClick={(e) => handleLike(m.id, e)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ff2a2a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  <Heart size={16} fill="#ff2a2a" /> {m.likes}
                </button>
              </div>

              <p style={{ fontSize: '15px', color: 'var(--color-fog-blue)', lineHeight: '1.5' }}>
                {m.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(16, 16, 16, 0.95)',
          backdropFilter: 'blur(16px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px'
        }} onClick={() => setActiveImage(null)}>
          <div style={{
            maxWidth: '900px',
            width: '100%',
            backgroundColor: 'var(--color-graphite-veil)',
            borderRadius: '15px',
            overflow: 'hidden',
            border: '1px solid var(--color-ash-border)'
          }} onClick={(e) => e.stopPropagation()}>
            <img
              src={activeImage.imageUrl}
              alt={activeImage.title}
              style={{ width: '100%', maxHeight: '60vh', objectFit: 'cover' }}
            />
            <div style={{ padding: '24px' }}>
              <h2 style={{ fontSize: '28px', color: 'var(--color-bone-white)', marginBottom: '8px' }}>
                {activeImage.title}
              </h2>
              <p style={{ fontSize: '17px', color: 'var(--color-fog-blue)' }}>
                {activeImage.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add Memory Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(16, 16, 16, 0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            maxWidth: '500px',
            width: '100%',
            backgroundColor: 'var(--color-obsidian)',
            border: '1px solid var(--color-ash-border)',
            borderRadius: '15px',
            padding: '30px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '22px', color: 'var(--color-bone-white)' }}>Add Memory for Kashish</h3>
              <X style={{ cursor: 'pointer' }} onClick={() => setShowAddModal(false)} />
            </div>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', color: 'var(--color-fog-blue)' }}>Memory Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Starlit Walk"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-ash-border)',
                    background: 'var(--color-graphite-veil)',
                    color: 'white',
                    marginTop: '4px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: 'var(--color-fog-blue)' }}>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe this special moment..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-ash-border)',
                    background: 'var(--color-graphite-veil)',
                    color: 'white',
                    marginTop: '4px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: 'var(--color-fog-blue)' }}>Image URL (Optional)</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... or leave blank for default prism art"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-ash-border)',
                    background: 'var(--color-graphite-veil)',
                    color: 'white',
                    marginTop: '4px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: 'var(--color-fog-blue)' }}>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-ash-border)',
                    background: 'var(--color-graphite-veil)',
                    color: 'white',
                    marginTop: '4px'
                  }}
                >
                  <option value="Special Moment">Special Moment</option>
                  <option value="Late Night">Late Night</option>
                  <option value="Birthday Special">Birthday Special</option>
                  <option value="Romantic">Romantic</option>
                </select>
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--color-bone-white)',
                  color: 'var(--color-obsidian)',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                SAVE MEMORY ✨
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
