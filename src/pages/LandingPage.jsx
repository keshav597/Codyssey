import { useState } from 'react';
import Link from '../components/common/Link';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useAuth } from '../hooks/useAuth';
import './pages.css';

const LOOP = [
  { step: '01', label: 'Curriculum', icon: '📖', color: '#059669' },
  { step: '02', label: 'Practice',   icon: '💻', color: '#0f766e' },
  { step: '03', label: 'Assess',     icon: '🎯', color: '#475569' },
  { step: '04', label: 'Verify',     icon: '⚡', color: '#059669' },
  { step: '05', label: 'Milestone',  icon: '📈', color: '#0f172a' },
  { step: '06', label: 'Unlock',     icon: '🔓', color: '#10b981' },
  { step: '07', label: 'Certified',  icon: '🎓', color: '#7c3aed' },
];

const FEATURES = [
  { icon: '🗺️', title: 'Visual Engineering Roadmap', body: 'A structured, phased milestone path from web foundations to modern React component architecture.' },
  { icon: '💻', title: 'Hands-on Interactive Modules', body: 'Bite-sized technical lessons with immediate feedback and code validation.' },
  { icon: '🎯', title: 'Verifiable Assessments', body: 'Rigorous technical evaluations per phase to evaluate your readiness and certify competency.' },
];

const STATS = [
  { value: '4', label: 'Engineering Phases' },
  { value: '24', label: 'Interactive Modules' },
  { value: '100%', label: 'Hands-on Practice' },
  { value: '9', label: 'Certifications' },
];

const PREVIEW_NODES = [
  { icon: '⚛️', name: 'React Architecture', state: 'locked' },
  { icon: '⚡', name: 'JavaScript Logic', state: 'current' },
  { icon: '🎨', name: 'CSS Modern Layouts', state: 'completed' },
  { icon: '🌐', name: 'HTML5 Semantics', state: 'completed' },
];

const UNIVERSITIES = [
  { name: 'Chitkara University', sub: 'Punjab & Himachal' },
  { name: 'IIT Delhi', sub: 'New Delhi' },
  { name: 'BITS Pilani', sub: 'Pilani & Goa' },
  { name: 'DTU', sub: 'Delhi' },
  { name: 'VIT Vellore', sub: 'Tamil Nadu' },
  { name: 'Thapar Institute', sub: 'Patiala' },
  { name: 'IIIT Hyderabad', sub: 'Telangana' },
];

const PLATFORM_STATS = [
  { value: '15,000+', label: 'Modules Mastered', variant: 'purple' },
  { value: '45,000+', label: 'Assessments Solved', variant: 'default' },
  { value: '500+', label: 'Colleges Represented', variant: 'default' },
  { value: '98%', label: 'Student Retention', variant: 'teal' },
];

const OTHER_PLATFORMS_LIMITS = [
  'Passive video lectures with no active hands-on coding practice',
  'No instant mistake feedback or interactive explanations',
  'Monotonous text without structured milestone progression',
  'Confusing syllabus without clear step-by-step visual roadmap',
  'No campus leaderboards to collaborate with classmates',
  'Generic certificates instead of verifiable skill achievement badges',
];

const COODYSSEY_ADVANTAGES = [
  'Interactive bite-sized coding lessons with instant feedback',
  'Technical evaluations with XP rewards and daily consistency streaks',
  'Clear engineering roadmap that highlights exactly what to learn next',
  'University leaderboards to represent your college and compete',
  'Personalized learning paths tailored to your engineering goals',
];

export default function LandingPage() {
  const { currentUser } = useAuth();

  return (
    <div className="landing">
      <div className="container">
        <nav className="landing-nav glass">
          <div className="landing-nav__logo">
            <span className="landing-nav__mark">⚡</span> Codyssey
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link to="dashboard">
              <Button size="md" variant="primary">Open Dashboard</Button>
            </Link>
          </div>
        </nav>

        <section className="landing-hero">
          <p className="eyebrow landing-hero__eyebrow">Curriculum • Practice • Evaluation</p>
          <h1>
            Master modern software engineering with <span className="gradient-text">a structured visual roadmap.</span>
          </h1>
          <p>
            Codyssey is a professional learning platform for developers. Complete hands-on modules, test your skills through verified evaluations,
            and follow a structured milestone track from HTML5 and CSS3 to advanced JavaScript and React.
          </p>
          <div className="landing-hero__ctas">
            <Link to="dashboard">
              <Button size="lg" variant="primary">Start Engineering Track</Button>
            </Link>
            <Link to="codeverse">
              <Button size="lg" variant="secondary">View Roadmap</Button>
            </Link>
          </div>
        </section>

        <div className="landing-stats">
          {STATS.map((s) => (
            <div className="landing-stat" key={s.label}>
              <div className="landing-stat__value gradient-text">{s.value}</div>
              <div className="landing-stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="landing-collaborators-section">
          <p className="landing-section-subtitle">Top Colleges & Universities on Codyssey</p>
          <div className="landing-collaborators-row">
            {UNIVERSITIES.map((c) => (
              <div key={c.name} className="collaborator-item">
                <span className="collaborator-name">{c.name}</span>
                {c.sub && <span className="collaborator-sub">{c.sub}</span>}
              </div>
            ))}
          </div>
        </section>

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

        <section className="landing-eco-section">
          <div className="landing-eco-header">
            <span className="landing-badge">⚡ COODYSSEY STATS</span>
            <h2>Gamified Learning in Action</h2>
            <p className="text-secondary">Real-time learning impact across engineering students.</p>
          </div>

          <div className="landing-eco-grid">
            {PLATFORM_STATS.map((st) => (
              <div key={st.label} className={`eco-card eco-card--${st.variant}`}>
                <div className="eco-card__value">{st.value}</div>
                <div className="eco-card__label">{st.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-advantages-section">
          <div className="center-text" style={{ marginBottom: 32 }}>
            <span className="landing-badge">⭐ THE COODYSSEY DIFFERENCE</span>
            <h2 style={{ fontSize: 32, marginTop: 12 }}>Why Choose Codyssey?</h2>
          </div>

          <div className="advantages-grid">
            <div className="advantage-card advantage-card--other glass">
              <h3 className="advantage-card__title">Traditional Coding Sites</h3>
              <ul className="advantage-list">
                {OTHER_PLATFORMS_LIMITS.map((item, idx) => (
                  <li key={idx} className="advantage-item advantage-item--fail">
                    <span className="advantage-icon advantage-icon--fail">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="advantage-card advantage-card--codyssey glass">
              <div className="advantage-card__brand">
                <span className="landing-nav__mark">⚡</span>
                <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '0.05em' }}>Codyssey</span>
              </div>
              <ul className="advantage-list">
                {COODYSSEY_ADVANTAGES.map((item, idx) => (
                  <li key={idx} className="advantage-item advantage-item--pass">
                    <span className="advantage-icon advantage-icon--pass">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="landing-showcase">
          <div>
            <p className="eyebrow" style={{ marginBottom: 10 }}>Curriculum Roadmap</p>
            <h2 style={{ fontSize: 28, marginBottom: 12 }}>Your engineering progress, visualized clearly.</h2>
            <p className="text-secondary" style={{ maxWidth: 420, lineHeight: 1.7 }}>
              Every skill you complete unlocks the next technical milestone in your track. Finish HTML5, and CSS3 unlocks.
              Finish CSS3, and JavaScript comes online. It's a structured milestone track designed for college evaluations.
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

      <footer className="landing-footer-container">
        <div className="container">
          <div className="landing-footer-grid">
            <div className="footer-brand-col">
              <div className="landing-nav__logo" style={{ marginBottom: 14 }}>
                <span className="landing-nav__mark">⚡</span> Codyssey
              </div>
              <p className="footer-brand-desc">
                The gamified programming platform designed for engineering students to master web development through interactive quests, quizzes, streaks, and skill roadmaps.
              </p>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Ecosystem</h4>
              <ul className="footer-links">
                <li><Link to="signup">Codeverse Galaxy</Link></li>
                <li><Link to="signup">Coding Quests</Link></li>
                <li><Link to="signup">Skill Worlds</Link></li>
                <li><Link to="signup">University Leaderboard</Link></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Learning Paths</h4>
              <ul className="footer-links">
                <li><Link to="signup">HTML & Semantic Web</Link></li>
                <li><Link to="signup">CSS & Modern Design</Link></li>
                <li><Link to="signup">JavaScript Core</Link></li>
                <li><Link to="signup">React & Components</Link></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Platform</h4>
              <ul className="footer-links">
                <li><Link to="signin">Sign In</Link></li>
                <li><Link to="signup">Create Account</Link></li>
                <li><Link to="setup">Onboarding Setup</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}