import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import CircularProgress from '../common/CircularProgress';
import XPCounter from '../common/XPCounter';
import './dashboard.css';

// This component is used to display current level, title, and XP progress toward next level
export default function LevelCard({ levelInfo }) {
  const { current, next, xpIntoLevel, xpForNextLevel, percent } = levelInfo;

  return (
    <Card className="level-card">
      <div className="level-card__top">
        <CircularProgress percent={percent} size={72} stroke={7} color="#059669">
          <span style={{ fontWeight: 700, fontSize: 18, color: '#0f172a' }}>{current.level}</span>
        </CircularProgress>
        <div>
          <div className="level-card__title">Current Level</div>
          <div className="level-card__badge" style={{ color: '#047857', background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
            {current.title}
          </div>
        </div>
      </div>
      <ProgressBar
        percent={percent}
        color="#059669"
        height={10}
        label={
          <>
            <span className="mono">
              <XPCounter value={xpIntoLevel} suffix="" /> / {next ? xpForNextLevel : '—'} XP
            </span>
            <span>{next ? `Next: ${next.title}` : '🏆 Max Level'}</span>
          </>
        }
      />
    </Card>
  );
}
