import { useNavigation } from '../../hooks/useNavigation';
import Button from '../common/Button';
import './dashboard.css';

// Top banner of the dashboard: greeting + big call-to-action
export default function WelcomeBanner({ name, greeting, levelInfo }) {
  const { navigate } = useNavigation();
  const { current, next, percent } = levelInfo;

  return (
    <section className="welcome">
      <div>
        <p className="welcome__small">{greeting}</p>
        <h2 className="welcome__title">Welcome back, {name}! 👋</h2>
        <p className="welcome__sub">
          You are a <strong>{current.title}</strong>
          {next ? ` — ${100 - percent}% to reach ${next.title}.` : ' — max level reached!'}
        </p>
        <div className="welcome__actions">
          <Button onClick={() => navigate('codeverse')}>Continue Learning</Button>
          <Button variant="secondary" onClick={() => navigate('quiz')}>Take a Quiz</Button>
        </div>
      </div>
      <div className="welcome__level">
        <span>LEVEL</span>
        <strong>{current.level}</strong>
      </div>
    </section>
  );
}
