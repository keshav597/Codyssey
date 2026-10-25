import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import CodeverseProgress from '../components/codeverse/CodeverseProgress';
import SimpleRoadmapView from '../components/codeverse/SimpleRoadmapView';
import InteractiveLesson from '../components/learning/InteractiveLesson';
import Button from '../components/common/Button';
import { ArrowLeft } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';

export default function CodeversePage() {
  const { skillsWithProgress, student, completeLesson } = useProgress();
  const [activeLesson, setActiveLesson] = useState(null);

  const handleFinishLesson = (rewardXP) => {
    if (activeLesson) {
      completeLesson(activeLesson.id, rewardXP);
      setActiveLesson(null);
    }
  };

  return (
    <PageContainer title="Curriculum & Roadmap">
      {activeLesson ? (
        <div className="roadmap-active-lesson">
          <div className="active-lesson-header">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setActiveLesson(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <ArrowLeft size={14} /> Back to Roadmap
            </Button>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>
              Interactive Module • {activeLesson.title}
            </span>
          </div>

          <InteractiveLesson
            lesson={activeLesson}
            alreadyCompleted={student.completedLessonIds.includes(activeLesson.id)}
            onFinish={handleFinishLesson}
            onExit={() => setActiveLesson(null)}
          />
        </div>
      ) : (
        <>
          <CodeverseProgress skills={skillsWithProgress} student={student} />
          <SimpleRoadmapView
            skills={skillsWithProgress}
            completedLessonIds={student.completedLessonIds}
            onSelectLesson={(lesson) => setActiveLesson(lesson)}
          />
        </>
      )}
    </PageContainer>
  );
}
