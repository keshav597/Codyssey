import Link from '../common/Link';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import './dashboard.css';

export default function SkillOverview({ skills }) {
  return (
    <Card className="skill-overview">
      <div className="today-plan__header">
        <h3>Curriculum Progress</h3>
        <Link to="codeverse" className="text-secondary" style={{ fontSize: 13, fontWeight: 600 }}>View Roadmap →</Link>
      </div>
      {skills.map((skill) => (
        <div className="skill-overview__row" key={skill.id}>
          <div className="skill-overview__row-top">
            <span className="skill-overview__name">
              {skill.icon} {skill.name} {skill.status === 'locked' && <span style={{ fontSize: 11, color: '#64748b' }}>🔒 {skill.requiredXP} XP</span>}
            </span>
            <span className="mono text-secondary">
              {skill.status === 'locked' ? 'Locked' : `${skill.progress}%`}
            </span>
          </div>
          <ProgressBar percent={skill.status === 'locked' ? 0 : skill.progress} color={skill.color} height={8} />
        </div>
      ))}
    </Card>
  );
}
