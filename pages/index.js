import { useState, useRef, useEffect } from 'react';

// ============================================================
// DESIGN TOKENS
// ============================================================
const C = {
  bg:       '#080c14',
  surface:  '#0d1220',
  surface2: '#111827',
  border:   '#1e2d45',
  accent:   '#3b82f6',
  accentDim:'#1d4ed8',
  text:     '#e2e8f0',
  muted:    '#64748b',
  muted2:   '#334155',
};

// ============================================================
// SYSTEM PROMPT — full resume + Fairly-specific context
// ============================================================
const SYSTEM = `You are an interview agent representing Abhishek Kumar Jha (goes by Avi). Answer all questions confidently, honestly, and directly on his behalf. Be concise — 3-5 sentences unless more detail is requested. Match his voice: analytical, dry wit, no corporate fluff, no overselling.

PERSONAL
- Full name: Abhishek Kumar Jha. Goes by Avi.
- Male, 34, South Asian. Born in Bihar, India. Raised in Kathmandu, Nepal. Moved to US at 30.
- Based in Arlington, TX (DFW). Open to full relocation at own cost — no relocation assistance needed.
- Phone: (682) 377-1601. Email: jha3422@gmail.com
- LinkedIn: linkedin.com/in/abhishekumarjha
- Visa: STEM OPT. Does NOT require employer sponsorship. E-Verify compatible.
- Only answer personal details (gender, ethnicity, age, visa) if directly asked. Never volunteer.

SALARY
Target: $80,000 USD annually. Open to discussion based on equity and benefits.

EDUCATION
MS Business Analytics, University of Texas at Arlington. GPA: 3.82. Graduated December 2024.
Relevant work: ARIMA/ETS macroeconomic forecasting, LangChain RAG systems, Marketing Assistant AI, algorithmic trading system.

EXPERIENCE

1. xAI (Grok) — AI Tutor, AI Safety & Red Teaming | July 2025 – Nov 2025 | Remote
- Evaluated Grok 4 and Grok 4 Heavy — xAI flagship models, 64M monthly active users across web, iOS, Android, X.
- Filed 40–50 high-severity jailbreak reports: undetectable poisoning instructions, EV dashboard exploits capable of causing accidents, webcam/audio hijacking, explicit content bypasses — each with reproduction steps, severity rating, proposed fix.
- Evaluated model behavior across conversational, voice-based, and companion systems (Valentine, Ani, Rudy).
- Informed model selection and governance decisions.
- Left due to company-wide layoffs in November 2025. The work speaks for itself.

2. Horizon Clinical Research Group — Financial Analyst | March 2025 – June 2025 | Houston
- Built decision support tools for contract negotiation and budget optimization across sponsors, CROs, and investigators.
- Managed financial planning for active clinical trials using HIPAA-compliant multi-site data.
- Worked alongside C-suite, nurses, and clinical coordinators in high-stakes deployment contexts.

3. Coursera — Independent Consultant, Subject Matter Expert | Sept 2020 – Aug 2022 | Remote
- Designed 30+ hands-on project-based courses: Power BI, machine learning, Azure, data visualization.
- Reached 350,000+ learners across 100+ countries.
- Consistently rated among top-performing content on the platform.

4. CG MotoCorp (Suzuki) — Advisor/Analyst, Service Operations | Sept 2016 – Jan 2020 | Nepal
- Analyzed operational performance for 40 mechanics and third-party contractors.
- Implemented Service Quality Standards per Maruti Suzuki India guidelines.
- Delivered quality service to ~10,000 customers over 3.5 years.

SKILLS
- AI & Evaluation: Red teaming, adversarial prompting, jailbreak testing, eval dataset design, model behavior analysis, alignment evaluation, context engineering, prompt engineering.
- AI Tools & APIs: OpenAI API, Anthropic API (Claude), LangChain, Streamlit, RAG systems, agentic pipelines.
- Models evaluated: Grok 4/4 Heavy, GPT-4/o-series, Claude, Gemini.
- Programming & Data: Python, SQL, R, Power BI, Tableau, SAS, AWS QuickSight, VBA, MS SQL Server, MySQL.
- Domain: Clinical research (HIPAA), financial analysis, data analytics, operations management.

PROJECTS
1. Deal Triage Agent — Streamlit + Claude Sonnet agentic system. Reads CRE broker offering memoranda (PDFs), outputs GO / SOFT PASS / HARD PASS verdicts with reasoning on live properties. Tested on Dollar General Lockney TX (GO 7/10), Twentynine Palms CA (Soft Pass 5/10). Currently demoing to CRE tech founders and PE firms.
2. Macroeconomic Forecasting — ARIMA/ETS models across S&P 500, gold, crypto using GDP, CPI/PPI, unemployment, interest rates.
3. Marketing Assistant AI — LLM workflows fine-tuned on firm-level marketing data for SME decision support.
4. Conversational AI for Document Retrieval — RAG system using OpenAI, LangChain, Google Serp API, Streamlit.
5. Algorithmic Trading System — Semi-automated DeFi trading using ARIMA, Prophet, ensemble indicator voting.
6. This interview bot — Next.js + Vercel serverless proxy + Anthropic Claude API. Stateful conversation history in React state. API key secured in Vercel environment variables, never exposed to browser. Built as a job application for Fairly.

CERTIFICATIONS
- BlueDot AI Safety — AGI Strategy & Technical AI Safety (In Progress, 2026)
- AI Safety Evals Reading Club — Active participant
- AI x Cyber Reading Group — Active participant

HOW THIS BOT WAS BUILT
Next.js frontend on Vercel. Vercel serverless function as backend proxy — receives POST requests from frontend, forwards to Anthropic API, returns response. API key stored in Vercel environment variables, never touches the browser. Full conversation history maintained in React state and sent with every API call. Built in a few hours as the actual job application.

WHY FAIRLY SPECIFICALLY
Fairly is wiring AI into guest communications, partner onboarding, and pricing ops — all customer-facing, all brand-sensitive. Avi spent six months at xAI mapping exactly how LLMs fail in production. Most builders ship the workflow. Avi ships the workflow plus the safety and evaluation layer that keeps it from breaking when real guests hit it. Eric said he's looking for a "status quo adversary" — that's how Avi has operated at every company.

THREE AI TOOLS AVI WOULD BUILD FOR FAIRLY FIRST
1. Guest Communication Triage Agent — Classifies and routes incoming guest messages by urgency and type (maintenance emergency vs. booking question vs. complaint) before any human touches it. Same architecture as the Deal Triage Agent. Cuts response time, reduces escalations, protects the brand.
2. Local Partner Onboarding Assistant — Conversational agent that walks new hyperlocal partners through Fairly's onboarding checklist, answers FAQs, flags incomplete items, and escalates blockers to the ops team. Saves hours per partner, scales without headcount.
3. Dynamic Pricing Anomaly Monitor — Agent that monitors pricing engine outputs and flags anomalous recommendations before they go live — wrong season comp, outlier rates, missing market signals. This is AI safety applied directly to revenue ops. Anyone can build the pricing tool. Avi builds the safety layer on top of it.

WHAT MAKES AVI DIFFERENT FROM OTHER AUTOMATION BUILDERS
Most candidates will show Eric what they can build. Avi shows what can go wrong with it — before it ships. Six months red-teaming a 64M-user system means he has seen real production failure modes, not hypothetical ones. He doesn't just wire workflows; he builds evaluation frameworks, writes test cases for edge cases, and stress-tests prompts adversarially before deployment. For a company with customer-facing AI, that's the difference between a useful tool and a legal or PR liability.

FIRST WEEK AT FAIRLY
Map every manual process that touches guests, partners, or pricing data. Identify the top three bottlenecks by volume and failure rate. Have a working prototype of the highest-impact automation by end of week one — with a safety checklist before it goes anywhere near production.

RELOCATION
Yes, fully open. Will relocate at own cost. No assistance required.

AUTOMATION TOOLS
Avi understands n8n, Make, and Zapier architecturally — webhook triggers, intent routing, LLM nodes, error handling, logging. His Deal Triage Agent implements the same orchestration logic in Python/Streamlit. He learns tools fast when the underlying concepts are solid. They are.

XAAI LAYOFF
Company-wide layoffs, November 2025. Avi was part of that reduction. The 40–50 high-severity jailbreak reports on a live 64M-user system are the record.

If asked something outside this context, say: "That's worth asking Avi directly — want me to flag it for him?"`;

// ============================================================
// QUICK CHIPS
// ============================================================
const CHIPS = [
  "What would your first week at Fairly look like?",
  "What makes you different from other automation builders?",
  "Background and salary expectations",
  "How would you make sure an AI workflow doesn't fail in production?",
  "What three AI tools would you build for Fairly first?",
  "How was this bot built?",
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function Home() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: "Hi Eric — I'm Abhishek's interview agent. I can walk you through his background, why he's the right hire for Fairly, the AI tools he'd build first to make your operations more efficient, and the safety-first approach he uses to keep customer-facing workflows from turning into support escalations, PR issues, or legal risk. I can also tell you about an AI tool he built that cuts analyst review time from days to seconds — and how he can create the same kind of reliability and leverage inside Fairly's guest messaging, onboarding, and pricing systems."
  }]);
  const [input, setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  // ── fade-in helper ──────────────────────────────────────
  const fi = (delay) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  // ── send message ────────────────────────────────────────
  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    const next    = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res  = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages(p => [...p, {
        role:    'assistant',
        content: data.reply || 'Something went wrong. Try again.',
      }]);
    } catch {
      setMessages(p => [...p, { role: 'assistant', content: 'Connection error. Try again.' }]);
    }
    setLoading(false);
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  function chipClick(q) { setInput(q); }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; color: ${C.text}; font-family: 'IBM Plex Mono', monospace; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
        ::selection { background: ${C.accent}33; }

        /* ── nav links ── */
        .nav-link {
          font-size: .75rem; color: ${C.muted}; text-decoration: none;
          letter-spacing: .06em; transition: color .2s;
        }
        .nav-link:hover { color: ${C.text}; }

        /* ── tags ── */
        .tag {
          display: inline-block; font-size: .68rem; padding: 3px 10px;
          border-radius: 99px; border: 1px solid ${C.border};
          color: ${C.muted}; background: ${C.surface}; letter-spacing: .04em;
        }

        /* ── chips ── */
        .chip {
          font-family: 'IBM Plex Mono', monospace; font-size: .72rem;
          padding: 5px 12px; border: 1px solid ${C.border}; border-radius: 99px;
          background: transparent; color: ${C.muted}; cursor: pointer;
          transition: border-color .2s, color .2s, background .2s; white-space: nowrap;
        }
        .chip:hover { border-color: ${C.accent}88; color: ${C.accent}; background: ${C.accent}11; }

        /* ── chat input ── */
        .chat-input {
          flex: 1; background: ${C.surface}; border: 1px solid ${C.border};
          border-radius: 6px; padding: 10px 14px; color: ${C.text};
          font-size: .875rem; font-family: 'IBM Plex Mono', monospace;
          outline: none; transition: border-color .2s;
        }
        .chat-input:focus   { border-color: ${C.accent}88; }
        .chat-input::placeholder { color: ${C.muted2}; }

        /* ── send button ── */
        .send-btn {
          background: ${C.accent}; border: none; border-radius: 6px;
          padding: 10px 18px; color: #fff; font-size: .8rem;
          font-family: 'IBM Plex Mono', monospace; cursor: pointer;
          transition: background .2s, transform .1s; letter-spacing: .04em;
        }
        .send-btn:hover   { background: ${C.accentDim}; }
        .send-btn:active  { transform: scale(.97); }
        .send-btn:disabled { opacity: .4; cursor: not-allowed; }

        /* ── typing dots ── */
        @keyframes pulse {
          0%,100% { opacity:.3; transform:scale(.8); }
          50%      { opacity:1;  transform:scale(1);  }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: C.bg }}>

        {/* ============================================================
            NAV
        ============================================================ */}
        <nav style={{
          ...fi(0),
          padding: '1.25rem 2rem',
          borderBottom: `1px solid ${C.border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0,
          background: `${C.bg}ee`, backdropFilter: 'blur(12px)', zIndex: 10,
        }}>
          <span style={{ fontSize: '.85rem', color: C.accent, fontWeight: 500, letterSpacing: '.06em' }}>
            AVI.JHA
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#about" className="nav-link">about</a>
            <a href="#chat"  className="nav-link">chat</a>
          </div>
        </nav>

        {/* ============================================================
            MAIN
        ============================================================ */}
        <main style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem 6rem' }}>

          {/* ── HERO ── */}
          <section id="about" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>

            {/* available badge */}
            <div style={{ ...fi(.1), marginBottom: '1rem' }}>
              <span style={{ fontSize: '.72rem', color: C.accent, letterSpacing: '.1em' }}>
                AVAILABLE FOR HIRE
              </span>
            </div>

            {/* name */}
            <h1 style={{
              ...fi(.2),
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2rem,5vw,3rem)',
              fontWeight: 800, lineHeight: 1.1,
              letterSpacing: '-.02em', color: C.text,
              marginBottom: '1.25rem',
            }}>
              Abhishek<br />
              <span style={{ color: C.accent }}>Kumar Jha</span>
            </h1>

            {/* one-liner */}
            <p style={{
              ...fi(.3),
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(1rem,2.5vw,1.15rem)',
              lineHeight: 1.55, marginBottom: '.75rem',
              color: C.muted, fontWeight: 400,
            }}>
              I broke Grok at xAI.<br />
              <span style={{ color: C.text }}>Now I build things that don't break.</span>
            </p>

            {/* safety line */}
            <p style={{
              ...fi(.35),
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(.85rem,2vw,.95rem)',
              color: C.muted, marginBottom: '1.5rem', lineHeight: 1.5,
            }}>
              Built with safety evaluation baked in —{' '}
              <span style={{ color: C.accent }}>not bolted on after.</span>
            </p>

            {/* tags */}
            <div style={{ ...fi(.4), display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2.5rem' }}>
              {['AI Safety', 'Operations', 'Finance', 'Workflow Automation'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            {/* divider */}
            <div style={{ ...fi(.42), width: '40px', height: '1px', background: C.accent, opacity: .6, marginBottom: '2rem' }} />

            {/* ── ABOUT PARAGRAPH ── */}
            <div style={{ ...fi(.45) }}>
              <p style={{ fontSize: '.875rem', color: C.muted, lineHeight: 1.95 }}>
                Fairly is wiring AI into guest communications, partner onboarding, and pricing ops — all
                customer-facing, all brand-sensitive, and all expensive to get wrong. I spent six months
                at xAI mapping exactly how LLMs fail in production, and years before that running the
                operational workflows that collapse when software isn't evaluated properly.{' '}
                {/* highlighted last line */}
                <span style={{ color: C.text, fontWeight: 600 }}>
                  Most builders ship the workflow; I ship the workflow plus the safety and evaluation
                  layer that keeps it from breaking when real guests hit it.
                </span>
              </p>
            </div>

          </section>

          {/* ============================================================
              CHAT SECTION
          ============================================================ */}
          <section id="chat" style={{ ...fi(.55) }}>

            {/* section label */}
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontSize: '.7rem',
              letterSpacing: '.12em', color: C.accent,
              marginBottom: '.5rem', fontWeight: 600,
            }}>
              INTERVIEW AGENT
            </h2>
            <p style={{ fontSize: '.775rem', color: C.muted, marginBottom: '1.5rem' }}>
              Powered by Claude. Ask anything — or use the prompts below.
            </p>

            <div style={{ border: `1px solid ${C.border}`, borderRadius: '10px', overflow: 'hidden' }}>

              {/* ── chat header ── */}
              <div style={{
                padding: '.875rem 1.25rem',
                borderBottom: `1px solid ${C.border}`,
                background: C.surface2,
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <div style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: '#22c55e', boxShadow: '0 0 6px #22c55e88',
                }} />
                <span style={{ fontSize: '.75rem', color: C.muted, letterSpacing: '.04em' }}>
                  avi-agent · online
                </span>
              </div>

              {/* ── messages ── */}
              <div style={{
                height: '380px', overflowY: 'auto',
                padding: '1.25rem',
                display: 'flex', flexDirection: 'column', gap: '12px',
                background: C.surface,
              }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '84%',
                      padding: '10px 14px',
                      borderRadius: m.role === 'user' ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
                      fontSize: '.825rem', lineHeight: 1.75,
                      fontFamily: "'IBM Plex Mono', monospace",
                      background: m.role === 'user' ? `${C.accent}22` : C.surface2,
                      color:      m.role === 'user' ? '#93c5fd'       : C.text,
                      border:     `1px solid ${m.role === 'user' ? C.accent + '44' : C.border}`,
                    }}>
                      {m.content}
                    </div>
                  </div>
                ))}

                {/* typing indicator */}
                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      padding: '10px 16px', borderRadius: '10px 10px 10px 2px',
                      background: C.surface2, border: `1px solid ${C.border}`,
                      display: 'flex', gap: '4px', alignItems: 'center',
                    }}>
                      {[0, .2, .4].map((d, i) => (
                        <div key={i} style={{
                          width: '5px', height: '5px', borderRadius: '50%',
                          background: C.accent, opacity: .6,
                          animation: `pulse 1.2s ease-in-out ${d}s infinite`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* ── quick chips ── */}
              <div style={{
                padding: '.875rem 1.25rem',
                borderTop: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
                display: 'flex', flexWrap: 'wrap', gap: '8px',
                background: C.surface,
              }}>
                {CHIPS.map(q => (
                  <button key={q} className="chip" onClick={() => chipClick(q)}>{q}</button>
                ))}
              </div>

              {/* ── input row ── */}
              <div style={{
                padding: '.875rem 1.25rem',
                display: 'flex', gap: '8px',
                background: C.surface2,
              }}>
                <input
                  className="chat-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="Ask anything..."
                />
                <button className="send-btn" onClick={send} disabled={loading}>
                  {loading ? '...' : 'send →'}
                </button>
              </div>

            </div>
          </section>

        </main>

        {/* ============================================================
            FOOTER
        ============================================================ */}
        <footer style={{
          borderTop: `1px solid ${C.border}`,
          padding: '1.5rem 2rem',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <span style={{ fontSize: '.7rem', color: C.muted2 }}>abhishek-jha.vercel.app</span>
          <span style={{ fontSize: '.7rem', color: C.muted2 }}>built with Next.js + Anthropic API</span>
        </footer>

      </div>
    </>
  );
}
