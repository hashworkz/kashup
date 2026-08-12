import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function PrismHero({ onExploreMemories, onOpenChat }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 450);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 450;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;

    const drawCube = (x, y, size, angle) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Glass core
      ctx.fillStyle = 'rgba(16, 16, 16, 0.7)';
      ctx.strokeStyle = '#fffdf9';
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.rect(-size / 2, -size / 2, size, size);
      ctx.fill();
      ctx.stroke();

      // Specular highlight
      ctx.beginPath();
      ctx.moveTo(-size / 2, -size / 2);
      ctx.lineTo(-size / 4, -size / 2);
      ctx.strokeStyle = 'rgba(255, 253, 249, 0.8)';
      ctx.stroke();

      // RGB Dispersion Caustics Edges
      // Red dispersion offset
      ctx.beginPath();
      ctx.rect(-size / 2 - 4, -size / 2 - 2, size, size);
      ctx.strokeStyle = 'rgba(255, 42, 42, 0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Cyan dispersion offset
      ctx.beginPath();
      ctx.rect(-size / 2 + 4, -size / 2 + 2, size, size);
      ctx.strokeStyle = 'rgba(42, 127, 255, 0.6)';
      ctx.stroke();

      // Lime dispersion offset
      ctx.beginPath();
      ctx.rect(-size / 2, -size / 2 - 5, size, size);
      ctx.strokeStyle = 'rgba(42, 255, 42, 0.4)';
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw caustics light rays
      const gradRed = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 220);
      gradRed.addColorStop(0, 'rgba(255, 42, 42, 0.18)');
      gradRed.addColorStop(0.5, 'rgba(42, 127, 255, 0.12)');
      gradRed.addColorStop(1, 'transparent');
      ctx.fillStyle = gradRed;
      ctx.fillRect(0, 0, width, height);

      // Staggered Cluster of 5 Glass Cubes
      const cubes = [
        { offsetX: 0, offsetY: -30, size: 100, speed: 0.5 },
        { offsetX: -110, offsetY: 40, size: 80, speed: -0.4 },
        { offsetX: 120, offsetY: -50, size: 85, speed: 0.6 },
        { offsetX: -140, offsetY: -70, size: 70, speed: -0.3 },
        { offsetX: 130, offsetY: 60, size: 75, speed: 0.5 }
      ];

      cubes.forEach((c) => {
        const floatY = Math.sin(time + c.offsetX) * 12;
        const rotateAngle = Math.sin(time * c.speed) * 0.15;
        drawCube(centerX + c.offsetX, centerY + c.offsetY + floatY, c.size, rotateAngle);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '60px 24px',
      overflow: 'hidden',
      backgroundColor: 'var(--color-obsidian)'
    }}>
      {/* Prism Caustics Light Glow Background */}
      <div className="prism-glow-bg" />

      <div style={{
        maxWidth: 'var(--page-max-width)',
        width: '100%',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
      }}>
        {/* Eyebrow Label */}
        <div style={{
          fontSize: '17px',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          color: 'var(--color-fog-blue)',
          marginBottom: '24px'
        }}>
          EST. FOR KASHISH · PRISMATIC LIGHT THROUGH OBSIDIAN
        </div>

        {/* Dynamic 3D Prism Glass Canvas Artifact */}
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto -60px auto', position: 'relative' }}>
          <canvas ref={canvasRef} style={{ width: '100%', height: '450px', display: 'block' }} />
        </div>

        {/* 136px Stacked Sculptural Display Headline */}
        <h1 className="display-headline prism-shimmer" style={{
          fontSize: 'clamp(44px, 8vw, 115px)',
          lineHeight: '1.00',
          letterSpacing: '-0.02em',
          maxWidth: '1200px',
          margin: '0 auto 32px auto',
          textShadow: '0 0 30px rgba(255, 253, 249, 0.15)'
        }}>
          WE ARE STORYTELLERS STRATEGISTS & SOULMATES
        </h1>

        {/* Left-Aligned Subtitle Paragraph beneath display headline */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          maxWidth: '1080px',
          margin: '0 auto',
          textAlign: 'left',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          <p style={{
            fontSize: 'var(--text-body-lg)',
            lineHeight: '1.4',
            maxWidth: '440px',
            color: 'var(--color-bone-white)'
          }}>
            Building brand value & everlasting warmth is our singular mission. 
            A private digital haven crafted exclusively for Kashish by Harshit.
          </p>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button 
              className="outlined-contact-button"
              onClick={onExploreMemories}
              style={{ fontSize: '15px', padding: '12px 24px' }}
            >
              EXPLORE MEMORIES <ArrowRight size={16} />
            </button>
            <button 
              className="ghost-nav-button"
              onClick={onOpenChat}
              style={{ fontSize: '15px', borderBottom: '1px solid var(--color-bone-white)', paddingBottom: '4px' }}
            >
              OPEN PRIVATE CHAT (2-DAY TTL)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
