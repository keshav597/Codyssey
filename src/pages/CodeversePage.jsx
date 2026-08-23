import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import CodeverseBackground from '../components/codeverse/CodeverseBackground';
import CodeverseConnector from '../components/codeverse/CodeverseConnector';
import CodeverseProgress from '../components/codeverse/CodeverseProgress';
import LearningNode from '../components/codeverse/LearningNode';
import NodeDetails from '../components/codeverse/NodeDetails';
import SimpleRoadmapView from '../components/codeverse/SimpleRoadmapView';
import { useProgress } from '../hooks/useProgress';
import { LayoutList, Network } from 'lucide-react';
import '../components/codeverse/codeverse.css';

export default function CodeversePage() {
  const { skillsWithProgress, student, questsWithStatus } = useProgress();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [viewMode, setViewMode] = useState('roadmap'); // 'roadmap' | 'tree'

  // Reverse order for vertical canvas bottom-to-top chain.
  const chain = [...skillsWithProgress].reverse();

  return (
    <PageContainer title="Codeverse — Skill Roadmap">
      {/* View toggle */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button
          type="button"
          className={`setup-option ${viewMode === 'roadmap' ? 'setup-option--selected' : ''}`}
          onClick={() => setViewMode('roadmap')}
          style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <LayoutList size={15} /> List View
        </button>
        <button
          type="button"
          className={`setup-option ${viewMode === 'tree' ? 'setup-option--selected' : ''}`}
          onClick={() => setViewMode('tree')}
          style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <Network size={15} /> Node Tree View
        </button>
      </div>

      <CodeverseProgress skills={skillsWithProgress} />

      {viewMode === 'roadmap' ? (
        <div style={{ marginTop: 20 }}>
          <SimpleRoadmapView skills={skillsWithProgress} completedLessonIds={student.completedLessonIds} />
        </div>
      ) : (
        <div className="codeverse-canvas">
          <CodeverseBackground />
          <div className="codeverse-chain">
            {chain.map((skill, i) => (
              <div key={skill.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <LearningNode skill={skill} onClick={setSelectedSkill} />
                {i < chain.length - 1 && (
                  <CodeverseConnector active={skill.status === 'completed' || skill.status === 'current'} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <NodeDetails
        skill={selectedSkill}
        completedLessonIds={student.completedLessonIds}
        quests={questsWithStatus}
        onClose={() => setSelectedSkill(null)}
      />
    </PageContainer>
  );
}
