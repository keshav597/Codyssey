import { useNavigation } from '../../hooks/useNavigation';
import { CheckCircle2, Circle, Lock, Play, CheckSquare } from 'lucide-react';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import { getLessonsForSkill } from '../../data/lessons';
import './codeverse.css';

// This component is used to render the curriculum roadmap timeline and all phase modules directly
export default function SimpleRoadmapView({ skills, completedLessonIds, onSelectLesson }) {
  const { navigate } = useNavigation();

  return (
    <div className="roadmap-timeline">
      {skills.map((skill, index) => {
        const isLocked = skill.status === 'locked';
        const isCompleted = skill.progress === 100;
        const isCurrent = skill.status === 'current';
        const lessons = getLessonsForSkill(skill.id);

        const completedCount = lessons.filter((l) => completedLessonIds.includes(l.id)).length;

        return (
          <div
            key={skill.id}
            className={`roadmap-phase-card ${
              isCurrent ? 'roadmap-phase-card--current' : isLocked ? 'roadmap-phase-card--locked' : ''
            }`}
          >
            {/* Phase Header */}
            <div className="phase-header">
              <div style={{ flex: 1 }}>
                <div className="phase-meta">
                  <span className="badge-chip badge-chip--default" style={{ fontSize: 10 }}>
                    {skill.phase || `PHASE 0${index + 1}`}
                  </span>
                  {skill.category && (
                    <span className="badge-chip badge-chip--secondary" style={{ fontSize: 10 }}>
                      {skill.category}
                    </span>
                  )}
                  {isCompleted && (
                    <span className="badge-chip badge-chip--success" style={{ fontSize: 10 }}>
                      ✓ COMPLETED
                    </span>
                  )}
                  {isCurrent && (
                    <span className="badge-chip badge-chip--primary" style={{ fontSize: 10 }}>
                      ● ACTIVE TRACK
                    </span>
                  )}
                  {isLocked && (
                    <span className="badge-chip badge-chip--locked" style={{ fontSize: 10 }}>
                      <Lock size={10} /> LOCKED ({skill.requiredXP} XP NEEDED TO UNLOCK)
                    </span>
                  )}
                </div>

                <h3 className="phase-title">
                  <span style={{ fontSize: 22 }}>{skill.icon}</span>
                  {skill.name}
                </h3>

                <p className="phase-desc">{skill.description}</p>

                {skill.competencies && (
                  <div className="phase-competencies">
                    {skill.competencies.map((comp, i) => (
                      <span key={i} className="competency-tag">
                        {comp}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Progress on Right */}
              <div className="phase-progress-side">
                <span className="phase-progress-val">
                  {completedCount} / {lessons.length} Modules
                </span>
                <div style={{ width: 140 }}>
                  <ProgressBar percent={skill.progress} color="#059669" height={6} />
                </div>
              </div>
            </div>

            {/* Modules List — Always visible directly without hide/view toggle */}
            <div className="phase-body">
              <div className="phase-section-title">
                <span>Curriculum Modules & Practical Exercises</span>
                <span style={{ fontSize: 11, color: isLocked ? '#dc2626' : '#64748b' }}>
                  {isLocked
                    ? `🔒 Locked — Earn ${skill.requiredXP} XP to unlock this phase`
                    : 'Interactive coding exercises with instant feedback'}
                </span>
              </div>

              <div className="lessons-list">
                {lessons.map((lesson, lIdx) => {
                  const done = completedLessonIds.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      className={`lesson-row ${done ? 'lesson-row--completed' : ''} ${
                        isLocked ? 'lesson-row--locked' : ''
                      }`}
                      style={{ opacity: isLocked ? 0.6 : 1 }}
                    >
                      <div className="lesson-row__left">
                        <div
                          className={`lesson-status-icon ${
                            done ? 'lesson-status-icon--done' : 'lesson-status-icon--pending'
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 size={13} />
                          ) : isLocked ? (
                            <Lock size={11} color="#94a3b8" />
                          ) : (
                            <Circle size={11} />
                          )}
                        </div>

                        <div>
                          <div className="lesson-title">
                            <span style={{ color: '#64748b', marginRight: 6, fontSize: 12 }}>
                              {index + 1}.{lIdx + 1}
                            </span>
                            {lesson.title}
                          </div>
                          <div className="lesson-tags">
                            <span className="lesson-meta-text">+{lesson.xp} XP</span>
                            {lesson.topics?.slice(0, 2).map((t, tIdx) => (
                              <span key={tIdx} style={{ fontSize: 11, color: '#64748b' }}>
                                • {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Button
                          size="sm"
                          variant={done ? 'secondary' : isCurrent ? 'primary' : 'secondary'}
                          disabled={isLocked}
                          onClick={() => !isLocked && onSelectLesson(lesson)}
                        >
                          {isLocked ? (
                            <>
                              <Lock size={12} /> Locked
                            </>
                          ) : (
                            <>
                              <Play size={12} /> {done ? 'Review' : 'Start'}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Phase Evaluation / Assessment Footer */}
            <div className="phase-footer">
              <div className="phase-assessment-info">
                <CheckSquare size={16} color={isLocked ? '#94a3b8' : '#059669'} />
                <span>
                  <strong>Technical Evaluation:</strong> {skill.name} Assessment (5 Questions • 20 XP each)
                </span>
              </div>

              <Button
                size="sm"
                variant={isCurrent ? 'primary' : 'secondary'}
                disabled={isLocked}
                onClick={() => {
                  if (!isLocked) {
                    navigate('quiz', {
                      skillId: skill.id,
                      questTitle: `${skill.shortName || skill.name} Technical Assessment`,
                      questionCount: 5,
                    });
                  }
                }}
              >
                {isLocked ? `Requires ${skill.requiredXP} XP` : 'Take Assessment →'}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
