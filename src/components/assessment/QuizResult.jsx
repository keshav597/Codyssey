import Button from '../common/Button';
import XPCounter from '../common/XPCounter';
import { skills } from '../../data/skills';
import './assessment.css';

export default function QuizResult({
  correct,
  total = 5,
  xpAwarded = 0,
  score = 0,
  passed = false,
  skillId = 'html',
  onContinue,
  onReattempt,
}) {
  const currentSkill = skills.find((s) => s.id === skillId);
  const skillIndex = skills.findIndex((s) => s.id === skillId);
  const nextSkill = skills[skillIndex + 1] || null;

  return (
    <div className="quiz-result">
      <div className="quiz-result__crown-icon">{passed ? '🎯' : '📝'}</div>
      <h2>{passed ? 'TECHNICAL ASSESSMENT PASSED' : 'EVALUATION INCOMPLETE · 100 XP REQUIRED'}</h2>

      <div className="quiz-result__score mono">
        {score} <span style={{ fontSize: 24, opacity: 0.6 }}>/ 100 XP</span>
      </div>

      <p className="text-secondary" style={{ fontSize: 14.5, fontWeight: 500 }}>
        {correct} of {total} questions correct (20 XP per question)
      </p>

      {passed ? (
        <div className="quiz-banner quiz-banner--success">
          <p>
            ✓ <strong>Milestone Verified:</strong> You earned full score on this evaluation!
            {nextSkill && (
              <span>
                {' '}<strong>{nextSkill.name}</strong> is now unlocked in your roadmap.
              </span>
            )}
          </p>
        </div>
      ) : (
        <div className="quiz-banner quiz-banner--retry">
          <p>
            ⚠️ <strong>Target not met:</strong> You scored <strong>{score} XP</strong>. You need <strong>100 XP</strong> (all 5 questions correct) to unlock {nextSkill ? nextSkill.name : 'the next milestone'}.
          </p>
          <p style={{ marginTop: 6, fontSize: 13, opacity: 0.9 }}>
            You can reattempt the quiz right now to reach 100 XP!
          </p>
        </div>
      )}

      <div className="quiz-result__xp-gain">
        <span className="text-muted" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          XP Added To Profile
        </span>
        <p className="badge-chip badge-chip--xp" style={{ fontSize: 16, padding: '8px 20px', marginTop: 4 }}>
          <XPCounter value={xpAwarded} prefix="+" />
        </p>
      </div>

      <div className="quiz-result__actions">
        {onReattempt && (
          <Button
            onClick={onReattempt}
            variant={passed ? 'secondary' : 'primary'}
            size="lg"
            style={{ flex: 1 }}
          >
            🔄 {passed ? 'Practice Again' : 'Reattempt Quiz (Reach 100 XP)'}
          </Button>
        )}
        <Button
          onClick={onContinue}
          variant={passed ? 'primary' : 'secondary'}
          size="lg"
          style={{ flex: 1 }}
        >
          {passed ? 'Continue Journey' : 'Back to Quests'}
        </Button>
      </div>
    </div>
  );
}
