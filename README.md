# Agent That Knows Me — AI-Powered Personal Portfolio Chatbot

> A conversational AI agent built to answer questions about my background, experience, and projects — deployed live on the web.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?logo=javascript) ![Next.js](https://img.shields.io/badge/Next.js-13%2B-black?logo=next.js) ![Vercel](https://img.shields.io/badge/Deployed-Vercel-000?logo=vercel) ![OpenAI](https://img.shields.io/badge/OpenAI-Powered-412991?logo=openai)

🔗 **Live demo:** [agent-that-knows-me.vercel.app](https://agent-that-knows-me.vercel.app)

---

## What It Does

Instead of a static portfolio, this is a **living AI agent** that can answer questions about me in real time — my work history, skills, projects, and goals. Think of it as a recruiter-ready chatbot that knows my resume cold.

**Example questions a visitor can ask:**
- *"What did you do at xAI?"*
- *"Tell me about your Deal Triage Agent."*
- *"What kind of roles are you targeting?"*
- *"What's your experience with red teaming?"*

Built with a system prompt that encodes my professional background, this agent acts as a 24/7 intelligent proxy for recruiter outreach and founder conversations.

---

## Why I Built This

Traditional portfolio sites are passive. Recruiters skim for 10 seconds and leave. This flips that dynamic — the agent engages them, answers follow-up questions, and surfaces the right context for the right audience. It's a proof-of-concept for **agent-as-resume**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| AI | OpenAI API |
| Deployment | Vercel |
| Language | JavaScript |

---

## Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/abhishekkumarjjha/agent-that-knows-me.git
cd agent-that-knows-me

# 2. Install dependencies
npm install

# 3. Add your OpenAI API key
# Create a .env.local file:
echo "OPENAI_API_KEY=your_key_here" > .env.local

# 4. Run locally
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Project Structure

```
agent-that-knows-me/
├── pages/          # Next.js pages and API routes
├── package.json
└── README.md
```

---

## Author

**Abhishek Kumar Jha**
AI Safety Researcher · Former xAI (Grok) Red Teamer · MS Business Analytics, UT Arlington

[LinkedIn](https://linkedin.com/in/abhishekkumarjjha) · [GitHub](https://github.com/abhishekkumarjjha)

---

## Related Projects

- [Deal Triage Agent](https://github.com/abhishekkumarjjha/deal-triage-agent) — CRE deal triage automation with Claude
- [ChatCSV](https://github.com/abhishekkumarjjha/chatcsv) — Conversational AI for CSV data
