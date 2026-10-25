import { useNavigation } from '../../hooks/useNavigation';
import Card from '../common/Card';
import Button from '../common/Button';
import { skills } from '../../data/skills';
import './dashboard.css';

export default function QuickQuizCard({ student, unlockedSkillIds }) {
  const { navigate } = useNavigation();

  // Find the next skill that isn't yet mastered with 100 XP
  const nextTargetSkill =
    skills.find((s) => (student.skillScores?.[s.id] || 0) < 100 && unlockedSkillIds.includes(s.id)) ||
    skills[0];

  const currentScore = student.skillScores?.[nextTargetSkill.id] || 0;
  const isMastered = currentScore >= 100;

  const handleStartQuiz = (skillId) => {
    navigate('quiz', {
      skillId,
      questTitle: `${skillId.toUpperCase()} Mastery Assessment`,
      questionCount: 5,
    });
  };

  return (
    <Card className="today-plan">
      <div className="today-plan__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700 }}>Next Technical Assessment</h3>
        </div>
        <span className="badge-chip badge-chip--xp">20 XP / Question</span>
      </div>

      <div className="quest-row" style={{ marginTop: 8 }}>
        <div className="quest-row__info">
          <span className="quest-row__title" style={{ fontSize: 15, fontWeight: 600 }}>
            {nextTargetSkill.icon} {nextTargetSkill.name} Assessment
          </span>
          <span className="quest-row__meta mono">
            {isMastered
              ? '✓ 100 / 100 XP (Mastered)'
              : `Current score: ${currentScore} / 100 XP · 5 questions`}
          </span>
        </div>

        <Button
          size="md"
          variant="primary"
          onClick={() => handleStartQuiz(nextTargetSkill.id)}
        >
          {isMastered ? 'Retake Assessment' : 'Start Assessment →'}
        </Button>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
        {skills.map((s) => {
          const unlocked = unlockedSkillIds.includes(s.id);
          const score = student.skillScores?.[s.id] || 0;
          return (
            <button
              key={s.id}
              type="button"
              disabled={!unlocked}
              onClick={() => handleStartQuiz(s.id)}
              className="skill-filter__btn"
              style={{
                fontSize: 12,
                padding: '6px 14px',
                opacity: unlocked ? 1 : 0.5,
                background: score >= 100 ? '#ecfdf5' : '#ffffff',
                borderColor: score >= 100 ? '#10b981' : undefined,
                color: score >= 100 ? '#047857' : undefined,
              }}
            >
              {s.icon} {s.name} {score >= 100 ? '✓' : !unlocked ? '🔒' : `(${score} XP)`}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
