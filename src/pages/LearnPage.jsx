import { useEffect, useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LessonCard from '../components/learning/LessonCard';
import InteractiveLesson from '../components/learning/InteractiveLesson';
import { getLessonsForSkill } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';

export default function LearnPage() {
  const { pageParams, navigate } = useNavigation();
  const { student, skillsWithProgress, completeLesson } = useProgress();
  const [activeSkillId, setActiveSkillId] = useState(pageParams?.skillId || 'html');
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    if (pageParams?.skillId) setActiveSkillId(pageParams.skillId);
  }, [pageParams]);

  const activeSkill = skillsWithProgress.find((s) => s.id === activeSkillId);
  const lessons = getLessonsForSkill(activeSkillId);

  const isCompleted = (id) => student.completedLessonIds.includes(id);

  const handleFinishLesson = (rewardXP) => {
    completeLesson(activeLesson.id, rewardXP);
    setActiveLesson(null);
  };
  const handleGoToQuiz = (targetSkillId) => {
    navigate('quiz', {
      skillId: targetSkillId,
      questTitle: `${targetSkillId.toUpperCase()} Mastery Quiz`,
      questionCount: 5,
    });
  };

  const skillOrder = ['html', 'css', 'javascript', 'react'];
  const currentSkillIdx = skillOrder.indexOf(activeSkillId);
  const prevSkillId = currentSkillIdx > 0 ? skillOrder[currentSkillIdx - 1] : 'html';

  return (
    <PageContainer title="Learn">
      <div className="skill-filter">
        {skillsWithProgress.map((skill) => (
          <button
            key={skill.id}
            className={`skill-filter__btn ${activeSkillId === skill.id ? 'skill-filter__btn--active' : ''}`}
            onClick={() => {
              setActiveSkillId(skill.id);
              setActiveLesson(null);
            }}
          >
            {skill.icon} {skill.name} {skill.status === 'locked' ? '🔒' : ''}
          </button>
        ))}
      </div>

      {activeSkill?.status === 'locked' ? (
        <Card style={{ textAlign: 'center', padding: '40px 24px' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
          <h3 style={{ fontSize: 22, marginBottom: 8 }}>{activeSkill.name} is Locked</h3>
          <p className="text-secondary" style={{ maxWidth: 440, margin: '0 auto 18px' }}>
            Requires <strong>{activeSkill.requiredXP} XP</strong> to unlock. You currently have <strong>{student.xp} XP</strong> ({activeSkill.requiredXP - student.xp} XP remaining).
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Button onClick={() => handleGoToQuiz(prevSkillId)} size="md">
              👑 Take {prevSkillId.toUpperCase()} Quiz to Reach {activeSkill.requiredXP} XP
            </Button>
          </div>
        </Card>
      ) : activeLesson ? (
        <InteractiveLesson
          lesson={activeLesson}
          alreadyCompleted={isCompleted(activeLesson.id)}
          onFinish={handleFinishLesson}
          onExit={() => setActiveLesson(null)}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              completed={isCompleted(lesson.id)}
              onClick={() => setActiveLesson(lesson)}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
