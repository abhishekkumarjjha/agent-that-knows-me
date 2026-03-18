import { useState, useRef, useEffect } from 'react';

const ACCENT = '#3b82f6';
const ACCENT_DIM = '#1d4ed8';
const BG = '#080c14';
const SURFACE = '#0d1220';
const SURFACE2 = '#111827';
const BORDER = '#1e2d45';
const TEXT = '#e2e8f0';
const MUTED = '#64748b';
const MUTED2 = '#334155';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey — I'm Avi's interview agent. Ask me about his background, salary expectations, or how this bot was built."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply || 'Something went wrong. Try again.'
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection error. Try again.'
      }]);
    }
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const fadeIn = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${BG}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 2px; }
        ::selection { background: ${ACCENT}33; color: ${TEXT}; }
        .tag {
          display: inline-block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem;
          padding: 3px 10px;
          border-radius: 99px;
          border: 1px solid ${BORDER};
          color: ${MUTED};
          background: ${SURFACE};
          letter-spacing: 0.04em;
        }
        .chat-input {
          flex: 1;
          background: ${SURFACE};
          border: 1px solid ${BORDER};
          border-radius: 6px;
          padding: 10px 14px;
          color: ${TEXT};
          font-size: 0.875rem;
          font-family: 'IBM Plex Mono', monospace;
          outline: none;
          transition: border-color 0.2s;
        }
        .chat-input:focus { border-color: ${ACCENT}88; }
        .chat-input::placeholder { color: ${MUTED2}; }
        .send-btn {
          background: ${ACCENT};
          border: none;
          border-radius: 6px;
          padding: 10px 18px;
          color: white;
          font-size: 0.8rem;
          font-family: 'IBM Plex Mono', monospace;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .send-btn:hover { background: ${ACCENT_DIM}; }
        .send-btn:active { transform: scale(0.97); }
        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .chip {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          padding: 5px 12px;
          border: 1px solid ${BORDER};
          border-radius: 99px;
          background: transparent;
          color: ${MUTED};
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .chip:hover { border-color: ${ACCENT}88; color: ${ACCENT}; background: ${ACCENT}11; }
        .divider {
          width: 40px;
          height: 1px;
          background: ${ACCENT};
          margin: 1.5rem 0;
          opacity: 0.6;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: BG, color: TEXT, fontFamily: "'IBM Plex Mono', monospace" }}>

        {/* Nav */}
        <nav style={{ ...fadeIn(0), padding: '1.25rem 2rem', borderBottom: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: `${BG}ee`, backdropFilter: 'blur(12px)', zIndex: 10 }}>
          <span style={{ fontSize: '0.85rem', color: ACCENT, fontWeight: 500, letterSpacing: '0.06em' }}>AVI.JHA</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['about', 'experience', 'chat'].map(s => (
              <a key={s} href={`#${s}`} style={{ fontSize: '0.75rem', color: MUTED, textDecoration: 'none', letterSpacing: '0.06em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = TEXT}
                onMouseLeave={e => e.target.style.color = MUTED}>
                {s}
              </a>
            ))}
          </div>
        </nav>

        <main style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem 6rem' }}>

          {/* Hero */}
          <section id="about" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
            <div style={{ ...fadeIn(0.1), marginBottom: '1rem' }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: ACCENT, letterSpacing: '0.1em' }}>AVAILABLE FOR HIRE</span>
            </div>

            <h1 style={{ ...fadeIn(0.2), fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: TEXT, marginBottom: '1.25rem' }}>
              Abhishek<br />
              <span style={{ color: ACCENT }}>Kumar Jha</span>
            </h1>

            <p style={{ ...fadeIn(0.3), fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: MUTED, lineHeight: 1.6, marginBottom: '1.5rem', fontWeight: 400 }}>
              I broke Grok at xAI.<br />
              <span style={{ color: TEXT }}>Now I build things that don't break.</span>
            </p>

            <div style={{ ...fadeIn(0.35), display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
              {['AI Safety', 'Operations', 'Finance', 'Workflow Automation'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <div className="divider" style={{ ...fadeIn(0.4) }} />

            {/* About */}
            <div style={{ ...fadeIn(0.45) }}>
              <p style={{ fontSize: '0.875rem', color: MUTED, lineHeight: 1.9, marginBottom: '1rem' }}>
                Six months red-teaming Grok at xAI — 40–50 high-severity jailbreak reports on a live system with 64M+ users — taught me one thing most builders miss: <span style={{ color: TEXT }}>every LLM integration has failure modes that don't surface until production.</span>
              </p>
              <p style={{ fontSize: '0.875rem', color: MUTED, lineHeight: 1.9, marginBottom: '1rem' }}>
                Before that, I managed operations for 10,000+ customers at Suzuki and built financial models at Horizon Clinical Research. MS in Business Analytics from UT Arlington, GPA 3.82.
              </p>
              <p style={{ fontSize: '0.875rem', color: MUTED, lineHeight: 1.9 }}>
                Most people optimize for speed. <span style={{ color: TEXT }}>I optimize for what breaks.</span> That's not caution — it's the difference between a great automation and a PR crisis.
              </p>
            </div>
          </section>

          {/* Experience */}
          <section id="experience" style={{ paddingBottom: '4rem', ...fadeIn(0.5) }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.7rem', letterSpacing: '0.12em', color: ACCENT, marginBottom: '1.5rem', fontWeight: 600 }}>EXPERIENCE</h2>
            {[
              { role: 'AI Safety & Red Teaming', org: 'xAI', period: '2025', detail: '40–50 high-severity jailbreak reports · Grok · 64M MAU' },
              { role: 'Subject Matter Expert', org: 'Coursera', period: '2023–24', detail: '350,000+ learners reached · Financial Analytics' },
              { role: 'Operations & Finance', org: 'Suzuki / CG MotoCorp', period: '2021–23', detail: '10,000+ customers · Workflow optimization' },
              { role: 'MS Business Analytics', org: 'UT Arlington', period: '2022–24', detail: 'GPA 3.82 · ARIMA/ETS forecasting · LangChain' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ minWidth: '60px', paddingTop: '2px' }}>
                  <span style={{ fontSize: '0.7rem', color: MUTED2, fontFamily: "'IBM Plex Mono', monospace" }}>{item.period}</span>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: TEXT, fontFamily: "'Syne', sans-serif", fontWeight: 600, marginBottom: '2px' }}>{item.role}</div>
                  <div style={{ fontSize: '0.8rem', color: ACCENT, marginBottom: '4px' }}>{item.org}</div>
                  <div style={{ fontSize: '0.75rem', color: MUTED }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Projects */}
          <section style={{ paddingBottom: '4rem', ...fadeIn(0.55) }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.7rem', letterSpacing: '0.12em', color: ACCENT, marginBottom: '1.5rem', fontWeight: 600 }}>PROJECTS</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {[
                { name: 'Deal Triage Agent', desc: 'Reads CRE broker PDFs. Outputs GO / SOFT PASS / HARD PASS in seconds. Eliminates the triage bottleneck before underwriting.', stack: ['Streamlit', 'Claude Sonnet', 'Python'] },
                { name: 'This Interview Bot', desc: 'Next.js + Vercel serverless proxy + Anthropic API. Stateful conversation. Secure key handling. Built as a job application.', stack: ['Next.js', 'Vercel', 'Claude API'] },
              ].map((p, i) => (
                <div key={i} style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '1.25rem', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${ACCENT}55`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}>
                  <div style={{ fontSize: '0.875rem', color: TEXT, fontFamily: "'Syne', sans-serif", fontWeight: 600, marginBottom: '8px' }}>{p.name}</div>
                  <div style={{ fontSize: '0.775rem', color: MUTED, lineHeight: 1.7, marginBottom: '12px' }}>{p.desc}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Chat */}
          <section id="chat" style={{ ...fadeIn(0.6) }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.7rem', letterSpacing: '0.12em', color: ACCENT, marginBottom: '0.5rem', fontWeight: 600 }}>INTERVIEW AGENT</h2>
            <p style={{ fontSize: '0.775rem', color: MUTED, marginBottom: '1.5rem' }}>Ask about background, salary expectations, or how this was built.</p>

            <div style={{ border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', background: SURFACE }}>

              {/* Chat header */}
              <div style={{ padding: '0.875rem 1.25rem', borderBottom: `1px solid ${BORDER}`, background: SURFACE2, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e88' }} />
                <span style={{ fontSize: '0.75rem', color: MUTED, letterSpacing: '0.04em' }}>avi-agent · online</span>
              </div>

              {/* Messages */}
              <div style={{ height: '360px', overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '82%',
                      padding: '10px 14px',
                      borderRadius: m.role === 'user' ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
                      fontSize: '0.825rem',
                      lineHeight: 1.7,
                      fontFamily: "'IBM Plex Mono', monospace",
                      background: m.role === 'user' ? `${ACCENT}22` : SURFACE2,
                      color: m.role === 'user' ? '#93c5fd' : TEXT,
                      border: `1px solid ${m.role === 'user' ? ACCENT + '44' : BORDER}`
                    }}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{ padding: '10px 16px', borderRadius: '10px 10px 10px 2px', background: SURFACE2, border: `1px solid ${BORDER}`, display: 'flex', gap: '4px', alignItems: 'center' }}>
                      {[0, 0.2, 0.4].map((d, i) => (
                        <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: ACCENT, opacity: 0.6, animation: `pulse 1.2s ease-in-out ${d}s infinite` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick chips */}
              <div style={{ padding: '0 1.25rem 0.875rem', display: 'flex', gap: '8px', flexWrap: 'wrap', borderBottom: `1px solid ${BORDER}` }}>
                {['Background', 'Salary expectations', 'How was this built?', 'Why Fairly?'].map(q => (
                  <button key={q} className="chip" onClick={() => { setInput(q); setTimeout(() => { const inp = document.querySelector('.chat-input'); if(inp) inp.focus(); }, 50); }}>{q}</button>
                ))}
              </div>

              {/* Input */}
              <div style={{ padding: '0.875rem 1.25rem', display: 'flex', gap: '8px', background: SURFACE2 }}>
                <input
                  className="chat-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask anything..."
                />
                <button className="send-btn" onClick={sendMessage} disabled={loading}>
                  {loading ? '...' : 'send →'}
                </button>
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '0.7rem', color: MUTED2, fontFamily: "'IBM Plex Mono', monospace" }}>abhishek-jha.vercel.app</span>
          <span style={{ fontSize: '0.7rem', color: MUTED2, fontFamily: "'IBM Plex Mono', monospace" }}>built with Next.js + Anthropic API</span>
        </footer>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </>
  );
}
