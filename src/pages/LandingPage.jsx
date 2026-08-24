import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import './pages.css';

const LOOP = [
  { step: '01', label: 'Learn',    icon: '📖', color: '#6366f1' },
  { step: '02', label: 'Practice', icon: '💻', color: '#8b5cf6' },
  { step: '03', label: 'Quest',    icon: '⚔️',  color: '#c026d3' },
  { step: '04', label: 'XP',       icon: '⚡', color: '#f59e0b' },
  { step: '05', label: 'Level Up', icon: '🚀', color: '#22d3ee' },
  { step: '06', label: 'Unlock',   icon: '🔓', color: '#10b981' },
  { step: '07', label: 'Badge',    icon: '🏆', color: '#fb923c' },
];

const FEATURES = [
  { icon: '🚀', title: 'Codeverse', body: 'A living galaxy that visualizes what you\'ve unlocked — HTML, CSS, JavaScript, React — one node at a time.' },
  { icon: '⚔️', title: 'Quests', body: 'Daily, learning, quiz, and challenge quests turn each concept into a short, rewarding mission.' },
  { icon: '🔥', title: 'XP, Levels & Streaks', body: 'Every lesson and quiz earns XP, levels you up, and keeps your streak alive.' },
];

const STATS = [
  { value: '4', label: 'Skill Worlds' },
  { value: '24', label: 'Micro Lessons' },
  { value: '14', label: 'Quests' },
  { value: '10', label: 'Badges' },
];

const PREVIEW_NODES = [
  { icon: '🚀', name: 'React', state: 'locked' },
  { icon: '⚡', name: 'JavaScript', state: 'current' },
  { icon: '🌙', name: 'CSS', state: 'completed' },
  { icon: '🌍', name: 'HTML', state: 'completed' },
];

const COLLABORATORS = [
  { name: 'Forbes', sub: '' },
  { name: 'ChainIDE', sub: 'Swift. Simple. Smart.' },
  { name: 'Mask', sub: '' },
  { name: 'JoyID', sub: '' },
  { name: 'NERVAPE STUDIO', sub: '' },
  { name: 'Flowverse NFT', sub: '' },
  { name: 'DappRadar', sub: '' },
];

const INVESTORS = [
  { name: 'animoca BRANDS', desc: '' },
  { name: 'MatchA', desc: '' },
  { name: 'Dapper', desc: '' },
  { name: 'MN Capital', desc: '' },
  { name: 'BONFIRE UNION', desc: '' },
  { name: 'TESS VENTURES', desc: '' },
  { name: 'FENBUSHI CAPITAL', desc: '' },
  { name: 'HASHGLOBAL', desc: '' },
  { name: 'Sky9 CAPITAL', desc: '' },
  { name: 'SevenX Ventures', desc: '' },
  { name: 'ArkStream Capital', desc: '' },
  { name: 'PANONY', desc: '' },
];

const ECO_STATS = [
  { value: '102K+', label: 'AI Agents Deployed', variant: 'purple' },
  { value: '3.3M+', label: 'Tasks Completed', variant: 'default' },
  { value: '159K+', label: 'Tweets Generated', variant: 'default' },
  { value: '24/7', label: 'Never Stops', variant: 'teal' },
];

const OTHER_AGENTS_LIMITS = [
  'Single-use chatbots that forget conversations instantly',
  'Manual triggers required for every task execution',
  'Limited to text generation and basic web searches',
  'No understanding of Web3 protocols or market dynamics',
  'Work in isolation with no collaboration capabilities',
  'Generic responses with no domain specialization',
  'Require constant human oversight and manual interaction',
];

const WORLD3_ADVANTAGES = [
  'Long-lived agents with persistent memory and continuous learning',
  'True autonomous operation - deploy once, runs forever without supervision',
  'Full Web3 execution: multi-chain transactions, DApp interactions, browser automation',
  'Built-in Web3 World Model with deep knowledge of DeFi, NFTs, DAOs, and emerging protocols',
  'Multi-agent collaboration with shared knowledge and coordinated task execution',
];

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-orb landing-orb--1" aria-hidden="true" />
      <div className="landing-orb landing-orb--2" aria-hidden="true" />

      <div className="container">
        {/* Navigation */}
        <nav className="landing-nav glass">
          <div className="landing-nav__logo">
            <span className="landing-nav__mark">⚡</span> Codyssey
          </div>
          <Link to="/signin">
            <Button variant="ghost">Sign In</Button>
          </Link>
        </nav>

        {/* Hero Section */}
        <section className="landing-hero">
          <p className="eyebrow landing-hero__eyebrow">Learn. Play. Build. Level Up.</p>
          <h1>
            Turn learning to code into <span className="gradient-text">a game you actually want to play.</span>
          </h1>
          <p>
            Codyssey is a gamified programming platform. Complete quests, earn XP, level up,
            and watch your Codeverse light up as you master HTML, CSS, JavaScript, and React.
          </p>
          <div className="landing-hero__ctas">
            <Link to="/signup">
              <Button size="lg">START YOUR ODYSSEY 🚀</Button>
            </Link>
            <Link to="/signin">
              <Button size="lg" variant="secondary">I already have an account</Button>
            </Link>
          </div>
        </section>

        {/* Key Stats Bar */}
        <div className="landing-stats">
          {STATS.map((s) => (
            <div className="landing-stat" key={s.label}>
              <div className="landing-stat__value gradient-text">{s.value}</div>
              <div className="landing-stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Collaborators Row */}
        <section className="landing-collaborators-section">
          <p className="landing-section-subtitle">Our collaborators</p>
          <div className="landing-collaborators-row">
            {COLLABORATORS.map((c) => (
              <div key={c.name} className="collaborator-item">
                <span className="collaborator-name">{c.name}</span>
                {c.sub && <span className="collaborator-sub">{c.sub}</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Investors Section */}
        <section className="landing-investors-section glass">
          <p className="eyebrow center-text">Trusted by leading investors driving the future of Web3.</p>
          <h2 className="landing-investors-title">The best investors trust WORLD3</h2>
          
          <div className="landing-investors-grid">
            {INVESTORS.map((inv) => (
              <div key={inv.name} className="investor-card">
                <span className="investor-card__name">{inv.name}</span>
                {inv.desc && <span className="investor-card__desc">{inv.desc}</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Gamified Learning Loop */}
        <div className="landing-loop">
          {LOOP.map((s, i) => (
            <div key={s.step} className="landing-loop__item">
              <div className="landing-loop__card">
                <span className="landing-loop__num">{s.step}</span>
                <span className="landing-loop__icon">{s.icon}</span>
                <span className="landing-loop__label">{s.label}</span>
              </div>
              {i < LOOP.length - 1 && (
                <span className="landing-loop__arrow">›</span>
              )}
            </div>
          ))}
        </div>

        {/* Eco Data Section */}
        <section className="landing-eco-section">
          <div className="landing-eco-header">
            <span className="landing-badge">⚡ ECO DATA</span>
            <h2>Autonomous Efficiency in Action</h2>
            <p className="text-secondary">Your non-stop Web3 Agent's real-time impact.</p>
          </div>

          <div className="landing-eco-grid">
            {ECO_STATS.map((st) => (
              <div key={st.label} className={`eco-card eco-card--${st.variant}`}>
                <div className="eco-card__value">{st.value}</div>
                <div className="eco-card__label">{st.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Advantages / Comparison Section */}
        <section className="landing-advantages-section">
          <div className="center-text" style={{ marginBottom: 32 }}>
            <span className="landing-badge">⭐ ADVANTAGES</span>
            <h2 style={{ fontSize: 32, marginTop: 12 }}>Why Choose WORLD3 Agents?</h2>
          </div>

          <div className="advantages-grid">
            {/* Other Agents */}
            <div className="advantage-card advantage-card--other glass">
              <h3 className="advantage-card__title">Other Agents</h3>
              <ul className="advantage-list">
                {OTHER_AGENTS_LIMITS.map((item, idx) => (
                  <li key={idx} className="advantage-item advantage-item--fail">
                    <span className="advantage-icon advantage-icon--fail">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WORLD3 Agents */}
            <div className="advantage-card advantage-card--world3 glass">
              <div className="advantage-card__brand">
                <span className="landing-nav__mark">⚡</span>
                <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '0.05em' }}>WORLD3</span>
              </div>
              <ul className="advantage-list">
                {WORLD3_ADVANTAGES.map((item, idx) => (
                  <li key={idx} className="advantage-item advantage-item--pass">
                    <span className="advantage-icon advantage-icon--pass">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Codeverse Showcase */}
        <section className="landing-showcase">
          <div>
            <p className="eyebrow" style={{ marginBottom: 10 }}>The Codeverse</p>
            <h2 style={{ fontSize: 28, marginBottom: 12 }}>Your progress, visualized as a galaxy.</h2>
            <p className="text-secondary" style={{ maxWidth: 420, lineHeight: 1.7 }}>
              Every skill you learn lights up a node in your Codeverse. Finish HTML, and CSS unlocks.
              Finish CSS, and JavaScript comes online. It's not a roadmap you read — it's a universe you build.
            </p>
          </div>
          <div className="landing-preview glass">
            {PREVIEW_NODES.map((n) => (
              <div key={n.name} className={`landing-preview__node landing-preview__node--${n.state}`}>
                <span style={{ fontSize: 22 }}>{n.state === 'locked' ? '🔒' : n.icon}</span>
                <span>{n.name}</span>
              </div>
            ))}
          </div>
        </section>

      {/* Core Platform Features */}
        <section className="landing-features">
          {FEATURES.map((f) => (
            <Card key={f.title} className="landing-feature" hover>
              <div className="landing-feature__icon">{f.icon}</div>
              <h3 style={{ marginBottom: 8 }}>{f.title}</h3>
              <p className="text-secondary" style={{ fontSize: 14 }}>{f.body}</p>
            </Card>
          ))}
        </section>
      </div>

      {/* Rich Landing Footer */}
      <footer className="landing-footer-container">
        <div className="container">
          <div className="landing-footer-grid">
            <div className="footer-brand-col">
              <div className="landing-nav__logo" style={{ marginBottom: 14 }}>
                <span className="landing-nav__mark">⚡</span> Codyssey / WORLD3
              </div>
              <p className="footer-brand-desc">
                Empowering the future of Web3 learning and autonomous AI agents with persistent memory, continuous learning, and multi-agent execution.
              </p>
              <div className="footer-socials">
                <a href="#twitter" aria-label="Twitter" className="footer-social-icon">𝕏</a>
                <a href="#discord" aria-label="Discord" className="footer-social-icon">👾</a>
                <a href="#github" aria-label="GitHub" className="footer-social-icon">💻</a>
                <a href="#telegram" aria-label="Telegram" className="footer-social-icon">✈️</a>
              </div>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Ecosystem</h4>
              <ul className="footer-links">
                <li><Link to="/signup">Codeverse Galaxy</Link></li>
                <li><Link to="/signup">AI Quests</Link></li>
                <li><Link to="/signup">Skill Worlds</Link></li>
                <li><Link to="/signup">Autonomous Agents</Link></li>
                <li><Link to="/signup">Leaderboard</Link></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Resources</h4>
              <ul className="footer-links">
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#whitepaper">Whitepaper</a></li>
                <li><a href="#news">Ecosystem News</a></li>
                <li><a href="#status">System Status</a></li>
                <li><a href="#brand">Brand Assets</a></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Community</h4>
              <ul className="footer-links">
                <li><a href="#dao">DAO Governance</a></li>
                <li><a href="#grants">Ecosystem Grants</a></li>
                <li><a href="#ambassadors">Ambassadors</a></li>
                <li><a href="#discord">Discord Community</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


