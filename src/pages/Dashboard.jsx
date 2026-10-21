import PageContainer from '../components/layout/PageContainer';
import LevelCard from '../components/dashboard/LevelCard';
import StreakCard from '../components/dashboard/StreakCard';
import QuickQuizCard from '../components/dashboard/QuickQuizCard';
import SkillOverview from '../components/dashboard/SkillOverview';
import AchievementPreview from '../components/dashboard/AchievementPreview';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import './pages.css';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { student, levelInfo, skillsWithProgress, unlockedSkillIds, badges } = useProgress();

  const firstName = currentUser?.name?.split(' ')[0] || 'Scholar';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <PageContainer title="Dashboard">
      <p className="text-secondary" style={{ marginBottom: 24, fontSize: 15 }}>
        {greeting}, {firstName} 👑 — Welcome to your Royal Academy. Ready for your 100 XP assessment?
      </p>

      <div className="dash-grid">
        <LevelCard levelInfo={levelInfo} />
        <StreakCard streak={student.streak} />
      </div>

      <div className="dash-grid">
        <QuickQuizCard student={student} unlockedSkillIds={unlockedSkillIds} />
        <SkillOverview skills={skillsWithProgress} />
      </div>

      <AchievementPreview badges={badges} />
    </PageContainer>
  );
}
