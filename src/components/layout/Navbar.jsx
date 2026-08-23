import { Flame, Moon, Sun } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import XPCounter from '../common/XPCounter';
import './Navbar.css';

/** Top bar shown inside the authenticated app shell — XP/streak/level + light/dark theme toggle. */
export default function Navbar({ title }) {
  const { student, levelInfo, updateSettings } = useProgress();

  const isLight = student.settings?.theme === 'light';

  const toggleTheme = () => {
    updateSettings({ theme: isLight ? 'dark' : 'light' });
  };

  return (
    <header className="navbar">
      <h1 className="navbar-title">{title}</h1>

      <div className="navbar-stats">
        <button
          type="button"
          className="navbar-theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
        >
          {isLight ? <Moon size={16} color="var(--primary)" /> : <Sun size={16} color="var(--warning)" />}
          <span style={{ fontSize: 12 }}>{isLight ? 'Dark' : 'Light'}</span>
        </button>

        <span className={`navbar-stat navbar-stat--streak ${student.streak.count > 0 ? 'navbar-stat--streak-lit' : ''}`}>
          <Flame size={16} /> {student.streak.count} day streak
        </span>
        <span className="navbar-stat navbar-stat--xp">
          <XPCounter value={student.xp} />
        </span>
        <span className="navbar-stat navbar-stat--level">
          LV {levelInfo.current.level} · {levelInfo.current.title}
        </span>
      </div>
    </header>
  );
}


