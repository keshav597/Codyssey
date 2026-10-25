import { useMemo, useState, useRef, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import ConfettiBurst from '../common/ConfettiBurst';
import FillBlankExercise from './FillBlankExercise';
import QuickCheckStep from './QuickCheckStep';
import LessonProgressBar from './LessonProgressBar';
import { getFillBlankForLesson, getQuickCheckForLesson } from '../../data/lessonExercises';
import { getQuestionsForSkill } from '../../data/questions';
import { getLessonsForSkill } from '../../data/lessons';
import { Edit3, Save, Check } from 'lucide-react';
import './learning.css';

// This component is used to run an interactive multi-step coding lesson
export default function InteractiveLesson({ lesson, alreadyCompleted, onFinish, onExit }) {
  const fillBlank = useMemo(() => getFillBlankForLesson(lesson.id), [lesson.id]);

  const quickCheck = useMemo(() => {
    const skillLessons = getLessonsForSkill(lesson.skillId);
    const skillQuestions = getQuestionsForSkill(lesson.skillId, 8);
    return getQuickCheckForLesson(lesson, skillLessons, skillQuestions);
  }, [lesson.id, lesson.skillId]);

  const steps = useMemo(() => {
    const s = ['learn'];
    if (fillBlank) s.push('fillBlank');
    if (quickCheck) s.push('quickCheck');
    s.push('complete');
    return s;
  }, [fillBlank, quickCheck]);

  const [stepIndex, setStepIndex] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [attemptKey, setAttemptKey] = useState(0);

  // useRef hook to focus note input (Lectures 31–36)
  const noteTextareaRef = useRef(null);
  const [notes, setNotes] = useState(() => {
    try {
      return localStorage.getItem(`codyssey_note_${lesson.id}`) || '';
    } catch {
      return '';
    }
  });
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [savedNoteToast, setSavedNoteToast] = useState(false);

  // This function is used to focus the note textarea using useRef
  const handleEditNote = () => {
    setIsEditingNote(true);
    setTimeout(() => {
      noteTextareaRef.current?.focus();
    }, 50);
  };

  // This function is used to save lesson notes to localStorage
  const handleSaveNote = () => {
    try {
      localStorage.setItem(`codyssey_note_${lesson.id}`, notes);
      setIsEditingNote(false);
      setSavedNoteToast(true);
      setTimeout(() => setSavedNoteToast(false), 2000);
    } catch (err) {
      console.warn('Failed to save notes', err);
    }
  };

  // This function is used to calculate the reward XP based on user accuracy
  const getRewardXP = () => {
    if (correctStreak === 0 && mistakes > 0) return 0;
    if (mistakes === 0) return lesson.xp;
    if (mistakes === 1) return Math.max(0, Math.round(lesson.xp * 0.5));
    return 0;
  };

  const rewardXP = getRewardXP();

  // This function is used to advance through lesson steps
  const advance = (wasCorrect) => {
    if (wasCorrect) {
      setCorrectStreak((c) => c + 1);
    } else {
      setMistakes((m) => m + 1);
    }
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  // This function is used to reset state and retry the lesson
  const handleAttemptAgain = () => {
    setAttemptKey((k) => k + 1);
    setStepIndex(0);
    setCorrectStreak(0);
    setMistakes(0);
  };

  const currentStep = steps[stepIndex];

  return (
    <Card>
      <LessonProgressBar
        stepIndex={stepIndex}
        totalSteps={steps.length}
        onExit={onExit}
      />

      {currentStep === 'learn' && (
        <div className="lesson-content">
          <div>
            <p className="eyebrow">{lesson.xp} XP Reward</p>
            <h2>{lesson.title}</h2>
          </div>

          {lesson.content.map((para, i) => (
            <p key={i} className="text-secondary" style={{ lineHeight: 1.7 }}>
              {para}
            </p>
          ))}

          {lesson.code && (
            <pre className="lesson-content__code">
              {lesson.code}
            </pre>
          )}

          {/* Interactive Study Notes Scratchpad (Mini notes app feature) */}
          <div style={{ marginTop: 20, marginBottom: 20, padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Edit3 size={14} color="#059669" /> My Study Notes
              </span>
              {isEditingNote ? (
                <Button size="sm" onClick={handleSaveNote} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px' }}>
                  <Save size={12} /> Save Note
                </Button>
              ) : (
                <button
                  type="button"
                  onClick={handleEditNote}
                  style={{ background: 'none', border: 'none', color: '#059669', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                >
                  {notes ? 'Edit' : '+ Add Note'}
                </button>
              )}
            </div>

            {isEditingNote ? (
              <textarea
                ref={noteTextareaRef}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your personal study summary or notes here..."
                rows={3}
                style={{
                  width: '100%',
                  padding: 8,
                  borderRadius: 6,
                  border: '1px solid #cbd5e1',
                  fontSize: 13,
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            ) : (
              <p style={{ fontSize: 13, color: notes ? '#334155' : '#94a3b8', margin: 0, fontStyle: notes ? 'normal' : 'italic' }}>
                {notes || 'No notes added for this lesson yet. Click "+ Add Note" to record key takeaways.'}
              </p>
            )}

            {savedNoteToast && (
              <span style={{ fontSize: 11, color: '#059669', marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Check size={12} /> Note saved to browser storage!
              </span>
            )}
          </div>

          <Button fullWidth onClick={() => advance(true)}>
            Let's Practice →
          </Button>
        </div>
      )}

      {currentStep === 'fillBlank' && fillBlank && (
        <FillBlankExercise
          key={`fillBlank-${attemptKey}`}
          exercise={fillBlank}
          onComplete={advance}
        />
      )}

      {currentStep === 'quickCheck' && quickCheck && (
        <QuickCheckStep
          key={`quickCheck-${attemptKey}`}
          question={quickCheck}
          onComplete={advance}
        />
      )}

      {currentStep === 'complete' && (
        <div className="lesson-complete" style={{ position: 'relative' }}>
          {mistakes === 0 && steps.length > 2 && <ConfettiBurst pieceCount={30} />}

          <div className="lesson-complete__burst">{mistakes === 0 ? '🎉' : '👍'}</div>
          <h2>Lesson Complete!</h2>

          {mistakes === 0 ? (
            <p className="text-secondary" style={{ marginBottom: 6 }}>
              Perfect run — you nailed every step!
            </p>
          ) : (
            <p className="text-secondary" style={{ marginBottom: 6 }}>
              You made {mistakes} {mistakes === 1 ? 'mistake' : 'mistakes'}. Try again to get the full XP!
            </p>
          )}

          <p
            className="badge-chip badge-chip--xp"
            style={{ fontSize: 15, padding: '10px 18px', margin: '14px 0' }}
          >
            +{rewardXP} XP
          </p>

          {mistakes > 0 && (
            <p className="text-secondary" style={{ fontSize: 13, marginBottom: 16 }}>
              Full reward: {lesson.xp} XP
            </p>
          )}

          {mistakes > 0 && (
            <Button
              size="lg"
              fullWidth
              variant="secondary"
              onClick={handleAttemptAgain}
              style={{ marginBottom: 25 }}
            >
              🔄 Attempt Again
            </Button>
          )}

          <Button
            size="lg"
            fullWidth
            onClick={() => onFinish(rewardXP)}
            style={{ marginBottom: 16 }}
          >
            {alreadyCompleted ? `⚡ Claim +${rewardXP} Practice XP` : `⚡ Claim +${rewardXP} XP`}
          </Button>
        </div>
      )}
    </Card>
  );
}