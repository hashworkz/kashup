import React, { useState, useEffect, useRef } from 'react';
import { Send, Lock, Clock, ShieldCheck, RefreshCw, Trash2, Heart } from 'lucide-react';

export default function PrivateChat({ currentUser }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const recipient = currentUser === 'dev' ? 'kashish' : 'dev';

  const fetchMessages = () => {
    fetch('/api/chat/messages')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(data);
        }
      })
      .catch((err) => console.error('Failed to fetch messages:', err));
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    fetch('/api/chat/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: currentUser,
        recipient: recipient,
        content: inputText
      })
    })
      .then((res) => res.json())
      .then((newMsg) => {
        setMessages((prev) => [...prev, newMsg]);
        setInputText('');
        setLoading(false);
      })
      .catch((err) => {
        console.error('Send error:', err);
        setLoading(false);
      });
  };

  return (
    <section style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 20px',
      minHeight: '75vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Banner — 2 Day Self-Destruct Warning */}
      <div style={{
        background: 'rgba(73, 87, 100, 0.3)',
        border: '1px solid var(--color-ash-border)',
        borderRadius: '15px',
        padding: '16px 24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Lock color="#ff2a2a" size={20} />
          <div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-bone-white)' }}>
              2-DAY EPHEMERAL PRIVATE CHAT
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-fog-blue)' }}>
              Messages auto-delete from PostgreSQL 48 hours after being sent. Shared only between Dev & Kashish.
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(255, 42, 42, 0.1)',
          padding: '6px 14px',
          borderRadius: '9999px',
          border: '1px solid rgba(255, 42, 42, 0.3)'
        }}>
          <Clock size={14} color="#ff2a2a" />
          <span style={{ fontSize: '13px', color: '#ff2a2a', fontWeight: 600 }}>
            AUTO-PURGE: 48h TTL
          </span>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div style={{
        flex: 1,
        background: 'var(--color-obsidian)',
        border: '1px solid var(--color-ash-border)',
        borderRadius: '15px',
        padding: '24px',
        minHeight: '420px',
        maxHeight: '550px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '20px'
      }}>
        {messages.length === 0 ? (
          <div style={{
            margin: 'auto',
            textAlign: 'center',
            color: 'var(--color-fog-blue)',
            padding: '40px'
          }}>
            <ShieldCheck size={40} style={{ marginBottom: '12px', opacity: 0.7 }} />
            <p style={{ fontSize: '18px', marginBottom: '6px' }}>No active messages yet.</p>
            <p style={{ fontSize: '14px' }}>
              Start your private conversation below. Messages will automatically disappear in 2 days.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.sender?.toLowerCase() === currentUser?.toLowerCase();
            const dateStr = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <div
                key={msg.id || index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  alignSelf: isMe ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  fontSize: '11px',
                  color: 'var(--color-fog-blue)',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {isMe ? 'YOU' : msg.sender} · {dateStr}
                </div>
                <div style={{
                  background: isMe ? 'var(--color-graphite-veil)' : 'rgba(255, 253, 249, 0.08)',
                  color: 'var(--color-bone-white)',
                  padding: '14px 18px',
                  borderRadius: isMe ? '15px 15px 2px 15px' : '15px 15px 15px 2px',
                  border: '1px solid var(--color-ash-border)',
                  fontSize: '16px',
                  lineHeight: '1.4',
                  wordBreak: 'break-word',
                  boxShadow: isMe ? '0 4px 12px rgba(0,0,0,0.3)' : 'none'
                }}>
                  {msg.content}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Type a private message as ${currentUser === 'dev' ? 'Dev (Harshit)' : 'Kashish'}...`}
          style={{
            flex: 1,
            backgroundColor: 'var(--color-graphite-veil)',
            border: '1px solid var(--color-ash-border)',
            borderRadius: '10px',
            padding: '14px 20px',
            color: 'var(--color-bone-white)',
            fontSize: '16px',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          disabled={loading || !inputText.trim()}
          style={{
            backgroundColor: 'var(--color-bone-white)',
            color: 'var(--color-obsidian)',
            border: 'none',
            borderRadius: '10px',
            padding: '0 24px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: loading || !inputText.trim() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'opacity 0.2s ease'
          }}
        >
          SEND <Send size={16} />
        </button>
      </form>
    </section>
  );
}
