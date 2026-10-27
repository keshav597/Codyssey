import { Flame, Zap } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import XPCounter from '../common/XPCounter';
import './Navbar.css';

export default function Navbar({ title }) {
  const { student, levelInfo } = useProgress();

  return (
    <header className="navbar">
      <h1 className="navbar-title">{title}</h1>

      <div className="navbar-stats">
        <span className={`navbar-stat navbar-stat--streak ${student.streak.count > 0 ? 'navbar-stat--streak-lit' : ''}`}>
          <Flame size={16} /> {student.streak.count} day streak
        </span>
        <span className="navbar-stat navbar-stat--xp" style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
          <Zap size={14} color="#059669" />
          <XPCounter value={student.xp} />
        </span>
        <span className="navbar-stat navbar-stat--level">
          LV {levelInfo.current.level} · {levelInfo.current.title}
        </span>
      </div>
    </header>
  );
}