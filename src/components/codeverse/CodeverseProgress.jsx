import ProgressBar from '../common/ProgressBar';
import './codeverse.css';

export default function CodeverseProgress({ skills, student }) {
  const totalPercent = Math.round(
    skills.reduce((sum, s) => sum + s.progress, 0) / skills.length
  );
  const completedLessonsCount = student?.completedLessonIds?.length || 0;
  const totalLessonsCount = skills.reduce((sum, s) => sum + (s.lessonIds?.length || 0), 0);

  const activePhase = skills.find((s) => s.status === 'current') || skills[0];

  return (
    <div className="roadmap-header">
      <div className="roadmap-title-row">
        <div>
          <h2 className="roadmap-heading">Software Engineering Curriculum</h2>
          <p className="roadmap-desc">
            A structured, competency-based roadmap from core web foundations to modern reactive application development.
          </p>
        </div>
      </div>

      <div className="roadmap-overview">
        <div className="roadmap-metrics-grid">
          <div className="roadmap-metric">
            <span className="roadmap-metric__label">Curriculum Progress</span>
            <span className="roadmap-metric__value">{totalPercent}%</span>
            <div style={{ marginTop: 6, width: '100%', maxWidth: 180 }}>
              <ProgressBar percent={totalPercent} color="#059669" height={6} />
            </div>
          </div>

          <div className="roadmap-metric">
            <span className="roadmap-metric__label">Lessons Completed</span>
            <span className="roadmap-metric__value">
              {completedLessonsCount} <span style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>/ {totalLessonsCount}</span>
            </span>
            <span className="roadmap-metric__sub">
              {totalLessonsCount - completedLessonsCount === 0 ? 'All modules completed' : `${totalLessonsCount - completedLessonsCount} modules remaining`}
            </span>
          </div>

          <div className="roadmap-metric">
            <span className="roadmap-metric__label">Engineering XP</span>
            <span className="roadmap-metric__value">{student?.xp || 0} XP</span>
            <span style={{ fontSize: 12, color: '#64748b' }}>Score 100 XP per phase to master</span>
          </div>

          <div className="roadmap-metric">
            <span className="roadmap-metric__label">Active Milestone</span>
            <span className="roadmap-metric__value" style={{ fontSize: 17 }}>
              {activePhase.shortName || activePhase.name}
            </span>
            <span style={{ fontSize: 12, color: '#047857', fontWeight: 600 }}>
              {activePhase.phase || 'Phase 01'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
