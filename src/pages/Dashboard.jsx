import PageContainer from '../components/layout/PageContainer';
import LevelCard from '../components/dashboard/LevelCard';
import StreakCard from '../components/dashboard/StreakCard';
import QuickQuizCard from '../components/dashboard/QuickQuizCard';
import SkillOverview from '../components/dashboard/SkillOverview';
import AchievementPreview from '../components/dashboard/AchievementPreview';
import StudyTasksCard from '../components/dashboard/StudyTasksCard';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import './pages.css';

// This function is used to determine a personalized greeting based on time of day
function getGreeting(hour) {
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

// This component is used to render the student learning dashboard and analytics
export default function Dashboard() {
  const { currentUser } = useAuth();
  const { student, levelInfo, skillsWithProgress, unlockedSkillIds, badges } = useProgress();

  const firstName = currentUser?.name?.split(' ')[0] || 'Scholar';
  const hour = new Date().getHours();
  const greeting = getGreeting(hour);

  return (
    <PageContainer title="Dashboard">
      <p className="text-secondary" style={{ marginBottom: 24, fontSize: 14.5 }}>
        {greeting}, {firstName} — Track your engineering milestones, complete active modules, and prepare for technical evaluations.
      </p>

      {/* Main metrics overview */}
      <div className="dash-grid">
        <LevelCard levelInfo={levelInfo} />
        <StreakCard streak={student.streak} />
      </div>

      {/* Quick quiz and skill overview */}
      <div className="dash-grid">
        <QuickQuizCard student={student} unlockedSkillIds={unlockedSkillIds} />
        <SkillOverview skills={skillsWithProgress} />
      </div>

      {/* Interactive study tasks (To-Do app mini project) */}
      <div style={{ marginTop: 20 }}>
        <StudyTasksCard />
      </div>

      {/* Certification and achievement preview */}
      <AchievementPreview badges={badges} />
    </PageContainer>
  );
}
