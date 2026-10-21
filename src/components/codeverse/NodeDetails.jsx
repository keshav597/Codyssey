import { useNavigation } from '../../hooks/useNavigation';
import { CheckCircle2, Circle, Lock } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import { getLessonsForSkill } from '../../data/lessons';
import { getQuestsForSkill } from '../../data/quests';
import './codeverse.css';

export default function NodeDetails({ skill, completedLessonIds, quests, onClose }) {
  const { navigate } = useNavigation();
  if (!skill) return null;

  const skillLessons = getLessonsForSkill(skill.id);
  const skillQuests = quests.filter((q) => q.skillId === skill.id);
  const nextQuest = skillQuests.find((q) => q.status !== 'completed');

  return (
    <Modal open={!!skill} onClose={onClose}>
      <div className="node-details">
        <div className="node-details__header">
          <span className="node-details__icon">{skill.icon}</span>
          <div>
            <h2>{skill.name}</h2>
            <p className="text-secondary" style={{ fontSize: 13 }}>{skill.progress}% Complete</p>
          </div>
        </div>

        <ProgressBar percent={skill.progress} color={skill.color} height={10} />

        <div className="node-details__topics">
          {skillLessons.map((lesson) => {
            const done = completedLessonIds.includes(lesson.id);
            return (
              <div className="node-details__topic" key={lesson.id}>
                {done ? (
                  <CheckCircle2 size={16} color="#2dd4a7" />
                ) : (
                  <Circle size={16} color="#656d92" />
                )}
                <span className={done ? 'text-secondary' : ''}>{lesson.title}</span>
              </div>
            );
          })}
        </div>

        <div className="node-details__quest">
          <strong>👑 100 XP MASTERY ASSESSMENT</strong>
          <span>5 questions · 20 XP each · Reattempt until 100 XP achieved</span>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <Button
            style={{ flex: 1 }}
            variant="primary"
            onClick={() => {
              onClose();
              navigate('quiz', {
                skillId: skill.id,
                questTitle: `${skill.name} Mastery Assessment`,
                questionCount: 5,
              });
            }}
          >
            👑 Take Quiz
          </Button>
          <Button
            style={{ flex: 1 }}
            variant="secondary"
            onClick={() => {
              onClose();
              navigate('learn', { skillId: skill.id });
            }}
          >
            Study Lessons
          </Button>
        </div>
      </div>
    </Modal>
  );
}
