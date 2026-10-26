import { Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import TryLesson from '../components/landing/TryLesson';
import QuestMap from '../components/landing/QuestMap';
import { useAuth } from '../hooks/useAuth';
import './landing.css';

const POWER_UPS = [
  { icon: '⭐', title: 'Earn XP', text: 'Every lesson and quiz gives you points.' },
  { icon: '🔥', title: 'Daily Streak', text: 'Come back every day to keep the flame alive.' },
  { icon: '🏅', title: 'Collect Badges', text: 'Unlock achievements as you master skills.' },
  { icon: '🏆', title: 'Leaderboard', text: 'Fight for the top spot for your university.' },
];

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  // if the player is already logged in there is no need to show this page
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  function goToLogin() {
    document.getElementById('login').scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="lp">
      {/* floating decorations */}
      <span className="float float--1">🪙</span>
      <span className="float float--2">⭐</span>
      <span className="float float--3">💎</span>
      <span className="float float--4">⚡</span>

      <nav className="lp-nav">
        <div className="lp-logo">👾 CODYSSEY</div>
        <div className="lp-nav__chip">LV.1 • 0 XP</div>
      </nav>

      <header className="lp-hero">
        <div className="lp-hero__text">
          <p className="lp-badge">🎮 LEARN TO CODE LIKE A GAME</p>
          <h1>
            LEVEL UP <br />
            YOUR <span>CODE</span>
          </h1>
          <p className="lp-sub">
            Beat quizzes, earn XP, keep your streak and unlock new worlds, from HTML all the way to React.
          </p>
          <button type="button" className="lp-btn" onClick={goToLogin}>▶ PRESS START</button>

          <div className="lp-stats">
            <div><b>4</b> worlds</div>
            <div><b>24</b> lessons</div>
            <div><b>9</b> badges</div>
          </div>
        </div>

        <div className="lp-login" id="login">
          <h2>PLAYER LOGIN</h2>
          <p>Log in to continue your quest.</p>
          <LoginForm />
        </div>
      </header>

      <section className="lp-section">
        <h2 className="lp-title">TRY A QUEST</h2>
        <p className="lp-title-sub">No signup needed. Answer one question and see how it feels.</p>
        <TryLesson />
      </section>

      <section className="lp-section">
        <h2 className="lp-title">CHOOSE YOUR WORLD</h2>
        <p className="lp-title-sub">Finish one world to unlock the next.</p>
        <QuestMap />
      </section>

      <section className="lp-section">
        <h2 className="lp-title">POWER-UPS</h2>
        <div className="powerups">
          {POWER_UPS.map((item) => (
            <div className="powerup" key={item.title}>
              <div className="powerup__icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-final">
        <h2 className="lp-title">READY, PLAYER ONE?</h2>
        <button type="button" className="lp-btn" onClick={goToLogin}>▶ START YOUR QUEST</button>
      </section>

      <footer className="lp-footer">Codyssey • Made with React for Front End Engineering-II</footer>
    </div>
  );
}
