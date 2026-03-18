import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey — I'm Avi's interview agent. Ask me about his background, salary expectations, or how this bot was built."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

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
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Try again.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Try again.' }]);
    }
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#f0f0f0', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      
      <div style={{ maxWidth: '680px', width: '100%' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '0.5rem', color: '#ffffff' }}>
            Abhishek Kumar Jha
          </h1>
          <p style={{ fontSize: '1rem', color: '#888', lineHeight: '1.6' }}>
            I broke Grok at xAI. Now I build things that don't break.
          </p>
          <p style={{ fontSize: '0.85rem', color: '#555', marginTop: '0.5rem' }}>
            AI Safety · Operations · Finance · Workflow Automation
          </p>
        </div>

        {/* Chat */}
        <div style={{ border: '1px solid #222', borderRadius: '8px', overflow: 'hidden' }}>
          
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #222', background: '#111', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
            <span style={{ fontSize: '0.8rem', color: '#666' }}>Interview Agent — online</span>
          </div>

          <div style={{ height: '380px', overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '12px', background: '#0d0d0d' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  background: m.role === 'user' ? '#1a3a2a' : '#161616',
                  color: m.role === 'user' ? '#86efac' : '#d0d0d0',
                  border: m.role === 'user' ? '1px solid #166534' : '1px solid #222'
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '10px 14px', borderRadius: '8px', background: '#161616', border: '1px solid #222', color: '#555', fontSize: '0.875rem' }}>
                  thinking...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div style={{ padding: '0.75rem', borderTop: '1px solid #222', background: '#111', display: 'flex', gap: '8px' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything..."
              style={{ flex: 1, background: '#0a0a0a', border: '1px solid #222', borderRadius: '6px', padding: '8px 12px', color: '#f0f0f0', fontSize: '0.875rem', outline: 'none', fontFamily: 'monospace' }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{ background: '#166534', border: 'none', borderRadius: '6px', padding: '8px 16px', color: '#86efac', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'monospace' }}
            >
              send
            </button>
          </div>
        </div>

        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#333', textAlign: 'center' }}>
          abhishek-jha.vercel.app · built with Next.js + Anthropic API
        </p>

      </div>
    </div>
  );
}
