/**
 * PortfolioPage.jsx — Multi-page SPA demo with nested tab routing
 *
 * CONCEPTS DEMONSTRATED:
 * 1. Nested SPA navigation — tabs that act like sub-pages (no URL change)
 * 2. Local state for active tab (currentTab) — this IS local state, only this
 *    component cares about which tab is active. Compare with NavigationContext
 *    which is global because ALL components need to know the current page.
 * 3. Conditional rendering based on state — same pattern as App.jsx's switch,
 *    but scoped to one component.
 * 4. Form handling with touched state, validation, loading state — complete
 *    contact form with all modern form patterns.
 * 5. Reads from multiple contexts (Auth + Progress) — shows how any component
 *    can pull from multiple global state sources.
 */

import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import FormInput from '../components/common/FormInput';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { fakeAPI } from '../hooks/useAsyncData';
import {
  User, Code2, Layers, Trophy, Mail, Github, Linkedin,
  ExternalLink, CheckCircle, Send, AlertCircle
} from 'lucide-react';
import './PortfolioPage.css';

// ─── Tab definitions — same concept as NAV_ITEMS in Sidebar ───────────────────
const TABS = [
  { id: 'about',    label: 'About',        icon: User },
  { id: 'projects', label: 'Projects',     icon: Code2 },
  { id: 'skills',   label: 'Skills',       icon: Layers },
  { id: 'contact',  label: 'Contact',      icon: Mail },
];

// ─── Static project data ────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: 'Personal Portfolio',
    desc: 'A clean portfolio site built with React. Includes tab navigation, dark mode, and a contact form.',
    tags: ['React', 'CSS', 'SPA'],
    emoji: '🌐',
    status: 'Live',
  },
  {
    id: 2,
    title: 'Todo App',
    desc: 'A feature-rich todo app with local storage persistence, drag-and-drop, and filtering.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    emoji: '✅',
    status: 'Live',
  },
  {
    id: 3,
    title: 'Quiz Engine',
    desc: 'A quiz engine with timer, score tracking, and XP rewards. Uses Context API for state.',
    tags: ['React', 'Context API', 'Hooks'],
    emoji: '🧠',
    status: 'In Progress',
  },
  {
    id: 4,
    title: 'XP Dashboard',
    desc: 'A learning dashboard with charts, streak tracking, and achievement badges.',
    tags: ['React', 'Zustand', 'CSS'],
    emoji: '📊',
    status: 'Planned',
  },
];

// ─── Tab Panels ─────────────────────────────────────────────────────────────────

function AboutTab({ user, student, levelInfo }) {
  const skills = [
    { name: 'HTML & Semantics', level: 85, color: '#f97316' },
    { name: 'CSS & Layout', level: 70, color: '#0ea5e9' },
    { name: 'JavaScript', level: 55, color: '#eab308' },
    { name: 'React & Hooks', level: 35, color: '#6366f1' },
  ];

  return (
    <div className="portfolio-about">
      <Card className="about-hero-card">
        <div className="about-avatar">{user?.name?.[0]?.toUpperCase() || 'C'}</div>
        <div className="about-info">
          <h2 className="about-name">{user?.name || 'Coder'}</h2>
          <p className="about-title">
            {levelInfo.current.title} · Level {levelInfo.current.level} Developer
          </p>
          <p className="about-bio">
            Engineering student on a quest to master web development. Currently grinding through
            HTML, CSS, JavaScript, and React — earning XP one lesson at a time. 🚀
          </p>
          <div className="about-links">
            <a href="#" className="about-link"><Github size={16} /> GitHub</a>
            <a href="#" className="about-link"><Linkedin size={16} /> LinkedIn</a>
            <a href="#" className="about-link about-link--primary"><ExternalLink size={16} /> View Full Portfolio</a>
          </div>
        </div>
      </Card>

      <Card>
        <h3 style={{ marginBottom: 20, fontSize: 16 }}>Quick Stats</h3>
        <div className="about-stats">
          <div className="about-stat">
            <span className="about-stat__value">{student.completedLessonIds.length}</span>
            <span className="about-stat__label">Lessons Done</span>
          </div>
          <div className="about-stat">
            <span className="about-stat__value">{student.quizHistory.length}</span>
            <span className="about-stat__label">Quizzes Taken</span>
          </div>
          <div className="about-stat">
            <span className="about-stat__value">{student.xp}</span>
            <span className="about-stat__label">Total XP</span>
          </div>
          <div className="about-stat">
            <span className="about-stat__value">{student.streak.count}🔥</span>
            <span className="about-stat__label">Day Streak</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ProjectsTab() {
  // LOCAL state — only this tab cares about the filter
  const [filter, setFilter] = useState('All');
  const statuses = ['All', 'Live', 'In Progress', 'Planned'];

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.status === filter);

  return (
    <div>
      {/* Status filter — demonstrates local state for UI control */}
      <div className="projects-filter" style={{ marginBottom: 20 }}>
        {statuses.map((s) => (
          <button
            key={s}
            className={`shop-cat-btn ${filter === s ? 'shop-cat-btn--active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filtered.map((p) => (
          <Card key={p.id} className="project-card" hover>
            <div className="project-emoji">{p.emoji}</div>
            <div className={`project-status project-status--${p.status.toLowerCase().replace(' ', '-')}`}>
              {p.status}
            </div>
            <h4 className="project-title">{p.title}</h4>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tags">
              {p.tags.map((t) => (
                <span key={t} className="project-tag">{t}</span>
              ))}
            </div>
            <Button variant="ghost" size="sm" style={{ marginTop: 12, gap: 6, display: 'flex', alignItems: 'center' }}>
              <ExternalLink size={13} /> View Project
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SkillsTab({ skillsWithProgress }) {
  return (
    <div className="portfolio-skills">
      <Card>
        <h3 style={{ marginBottom: 20, fontSize: 16 }}>Learning Roadmap Progress</h3>
        {skillsWithProgress.map((skill) => (
          <div key={skill.id} className="skill-progress-row">
            <div className="skill-progress-header">
              <span>{skill.icon} {skill.name}</span>
              <span className="skill-progress-pct">{skill.progress}%</span>
            </div>
            <div className="skill-bar">
              <div
                className="skill-bar__fill"
                style={{
                  width: `${skill.progress}%`,
                  background: skill.color,
                }}
              />
            </div>
            <span className={`skill-status-chip skill-status-chip--${skill.status}`}>
              {skill.status === 'locked' ? '🔒 Locked' :
               skill.status === 'completed' ? '✅ Complete' :
               skill.progress > 0 ? '🔥 In Progress' : '⬜ Not Started'}
            </span>
          </div>
        ))}
      </Card>

      <Card style={{ marginTop: 20 }}>
        <h3 style={{ marginBottom: 16, fontSize: 16 }}>Technologies I'm Learning</h3>
        <div className="tech-grid">
          {['HTML5', 'CSS3', 'JavaScript', 'React', 'Git', 'VS Code', 'Figma', 'Node.js'].map((tech) => (
            <div key={tech} className="tech-chip">{tech}</div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/**
 * ContactTab — Full form with all modern form patterns:
 *   ✓ Controlled inputs (value + onChange)
 *   ✓ Touched state (only show errors after blurring a field)
 *   ✓ Real-time validation as user types after touching
 *   ✓ Loading state on submit (async simulated with fakeAPI)
 *   ✓ Success state after submission
 *   ✓ Form-level error handling
 *   ✓ Reusable FormInput component
 */
function ContactTab() {
  // All form field values in one object — clean pattern
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  // Track which fields have been visited (blurred at least once)
  // This prevents showing errors before the user even touches the field
  const [touched, setTouched] = useState({});

  // Validation errors — recalculated on every render (pure derived state)
  // Only SHOWN for touched fields (but always computed for submit check)
  const errors = validateContactForm(form);

  // Submission states
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success | error
  const [formError, setFormError] = useState('');

  // Generic update handler — same pattern as SignUpPage
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // Mark a field as touched when it loses focus
  const handleBlur = (key) => () => setTouched((t) => ({ ...t, [key]: true }));

  // Only show error for a field if it's been touched
  const fieldError = (key) => (touched[key] ? errors[key] : '');

  const hasAnyError = Object.keys(errors).length > 0;

  async function handleSubmit(e) {
    e.preventDefault();

    // Touch all fields so errors show on submit attempt
    setTouched({ name: true, email: true, subject: true, message: true });

    if (hasAnyError) return; // stop if there are validation errors

    setSubmitState('loading');
    setFormError('');

    try {
      // Simulate sending email — in real app: await fetch('/api/contact', { body: JSON.stringify(form) })
      await fakeAPI(() => true, 1800);
      setSubmitState('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTouched({});
    } catch {
      setSubmitState('error');
      setFormError('Failed to send message. Please try again.');
    }
  }

  if (submitState === 'success') {
    return (
      <Card style={{ textAlign: 'center', padding: 50 }}>
        <CheckCircle size={52} color="#10b981" style={{ marginBottom: 16 }} />
        <h3 style={{ marginBottom: 8 }}>Message Sent!</h3>
        <p className="text-secondary" style={{ marginBottom: 20 }}>Thanks for reaching out! I'll get back to you soon.</p>
        <Button variant="secondary" onClick={() => setSubmitState('idle')}>Send Another</Button>
      </Card>
    );
  }

  return (
    <div className="portfolio-contact">
      <Card style={{ maxWidth: 560 }}>
        <h3 style={{ marginBottom: 6, fontSize: 18 }}>Get in Touch</h3>
        <p className="text-secondary" style={{ marginBottom: 24, fontSize: 14 }}>
          Have a question or want to collaborate? Send me a message!
        </p>

        {formError && (
          <div className="form-error-banner">
            <AlertCircle size={16} />
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 0 }}>
            {/* FormInput = enhanced reusable input with touched/blur support */}
            <FormInput
              label="Your Name"
              id="contact-name"
              value={form.name}
              onChange={update('name')}
              onBlur={handleBlur('name')}
              placeholder="Aryan Sharma"
              error={fieldError('name')}
              required
              hint="First and last name"
            />
            <FormInput
              label="Email Address"
              id="contact-email"
              type="email"
              value={form.email}
              onChange={update('email')}
              onBlur={handleBlur('email')}
              placeholder="you@example.com"
              error={fieldError('email')}
              required
            />
          </div>

          <FormInput
            label="Subject"
            id="contact-subject"
            value={form.subject}
            onChange={update('subject')}
            onBlur={handleBlur('subject')}
            placeholder="Collaboration, feedback, or just hello!"
            error={fieldError('subject')}
            required
            style={{ marginTop: 16 }}
          />

          <FormInput
            label="Message"
            id="contact-message"
            type="textarea"
            value={form.message}
            onChange={update('message')}
            onBlur={handleBlur('message')}
            placeholder="Write your message here..."
            error={fieldError('message')}
            required
            rows={5}
            style={{ marginTop: 16 }}
          />

          <Button
            type="submit"
            fullWidth
            disabled={submitState === 'loading'}
            style={{ marginTop: 20 }}
          >
            {submitState === 'loading' ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                <span className="spin" style={{ display: 'inline-block' }}>⟳</span> Sending...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                <Send size={16} /> Send Message
              </span>
            )}
          </Button>
        </form>
      </Card>

      <Card style={{ maxWidth: 560, marginTop: 20 }}>
        <h4 style={{ marginBottom: 14, fontSize: 15 }}>Other Ways to Reach Me</h4>
        <div className="contact-links">
          <a href="#" className="contact-link-item">
            <Github size={20} />
            <div>
              <strong>GitHub</strong>
              <span>github.com/yourname</span>
            </div>
          </a>
          <a href="#" className="contact-link-item">
            <Linkedin size={20} />
            <div>
              <strong>LinkedIn</strong>
              <span>linkedin.com/in/yourname</span>
            </div>
          </a>
          <a href="#" className="contact-link-item">
            <Mail size={20} />
            <div>
              <strong>Email</strong>
              <span>you@example.com</span>
            </div>
          </a>
        </div>
      </Card>
    </div>
  );
}

// ─── Validation function for contact form ─────────────────────────────────────
function validateContactForm({ name, email, subject, message }) {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (!subject || subject.trim().length < 3) errors.subject = 'Subject must be at least 3 characters.';
  if (!message || message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
  return errors;
}

// ─── Main Portfolio Page ────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const { currentUser } = useAuth();
  const { student, levelInfo, skillsWithProgress } = useProgress();

  /**
   * NESTED SPA ROUTING — local state for tab navigation
   *
   * This is the SAME pattern as NavigationContext but scoped locally:
   *   - NavigationContext: global, controls which PAGE is shown
   *   - currentTab here: local, controls which TAB within this page is shown
   *
   * Rule: if ONLY this component needs to know about it → local useState
   *       if MULTIPLE components need it → context or Zustand
   */
  const [currentTab, setCurrentTab] = useState('about');

  // Render the active tab's content — same as App.jsx switch statement
  function renderTab() {
    switch (currentTab) {
      case 'about':    return <AboutTab user={currentUser} student={student} levelInfo={levelInfo} />;
      case 'projects': return <ProjectsTab />;
      case 'skills':   return <SkillsTab skillsWithProgress={skillsWithProgress} />;
      case 'contact':  return <ContactTab />;
      default:         return <AboutTab user={currentUser} student={student} levelInfo={levelInfo} />;
    }
  }

  return (
    <PageContainer title="Portfolio">
      {/* Tab Navigation — mirrors Sidebar but as horizontal tabs */}
      <div className="portfolio-tabs">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`portfolio-tab ${currentTab === id ? 'portfolio-tab--active' : ''}`}
            onClick={() => setCurrentTab(id)}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content — re-renders when currentTab changes */}
      <div className="portfolio-content">
        {renderTab()}
      </div>
    </PageContainer>
  );
}
