import { useNavigate } from 'react-router-dom';
import { ArrowDown, Lock, Play } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';

export default function SimpleRoadmapView({ skills, completedLessonIds }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {skills.map((skill, index) => {
        const isLocked = skill.status === 'locked';
        const isCompleted = skill.progress === 100;
        const isCurrent = skill.status === 'current';

        return (
          <div key={skill.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card
              style={{
                width: '100%',
                maxWidth: 720,
                border: isCurrent ? '2px solid var(--primary)' : '1px solid var(--border)',
                background: isLocked ? 'var(--surface-alt)' : 'var(--surface)',
                opacity: isLocked ? 0.75 : 1,
                boxShadow: isCurrent ? 'var(--shadow-glow-primary)' : 'var(--shadow)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: skill.color ? `${skill.color}22` : 'var(--surface-hover)',
                      border: `1px solid ${skill.color || 'var(--border)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 22,
                    }}
                  >
                    {skill.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="eyebrow" style={{ fontSize: 11 }}>STEP {index + 1}</span>
                      {isCompleted && (
                        <span className="badge-chip badge-chip--success" style={{ fontSize: 10 }}>COMPLETED</span>
                      )}
                      {isCurrent && (
                        <span className="badge-chip badge-chip--primary" style={{ fontSize: 10 }}>IN PROGRESS</span>
                      )}
                      {isLocked && (
                        <span className="badge-chip badge-chip--secondary" style={{ fontSize: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Lock size={10} /> LOCKED
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{skill.name}</h3>
                    <p className="text-secondary" style={{ fontSize: 12 }}>{skill.description}</p>
                  </div>
                </div>

                <div style={{ minWidth: 140, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: skill.color || 'var(--primary)' }}>
                    {skill.progress}% Done
                  </span>
                  <div style={{ width: 120 }}>
                    <ProgressBar percent={skill.progress} color={skill.color} height={6} />
                  </div>
                </div>
              </div>

              {/* Action */}
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="text-muted" style={{ fontSize: 12 }}>
                  {isLocked ? 'Complete previous level to unlock' : `${skill.progress}% of topic material completed`}
                </span>
                <Button
                  variant={isLocked ? 'ghost' : isCurrent ? 'primary' : 'secondary'}
                  disabled={isLocked}
                  onClick={() => navigate('/learn', { state: { skillId: skill.id } })}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', fontSize: 13 }}
                >
                  <Play size={13} /> {isCompleted ? 'Review Level' : 'Start Level'}
                </Button>
              </div>
            </Card>

            {/* Downward connecting line between steps */}
            {index < skills.length - 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0' }}>
                <div style={{ width: 2, height: 24, background: isCompleted ? 'var(--success)' : 'var(--border)' }} />
                <ArrowDown size={14} color={isCompleted ? 'var(--success)' : 'var(--text-muted)'} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
