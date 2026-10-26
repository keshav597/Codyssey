import PageContainer from '../components/layout/PageContainer';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import StatTile from '../components/dashboard/StatTile';
import QuickQuizCard from '../components/dashboard/QuickQuizCard';
import SkillOverview from '../components/dashboard/SkillOverview';
import AchievementPreview from '../components/dashboard/AchievementPreview';
import StudyTasksCard from '../components/dashboard/StudyTasksCard';
import UniversityLeaderboard from '../components/dashboard/UniversityLeaderboard';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import './pages.css';

// Pick a greeting from the hour of the day
function getGreeting(hour) {
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

// Dashboard page: banner, stats, skills, quiz, to-do list and leaderboard
export default function Dashboard() {
  const { currentUser } = useAuth();
  const { student, levelInfo, skillsWithProgress, unlockedSkillIds, badges } = useProgress();

  const firstName = currentUser?.name?.split(' ')[0] || 'Scholar';
  const unlockedBadges = badges.filter((b) => b.unlocked).length;
  const doneLessons = student.completedLessonIds.length;

  return (
    <PageContainer title="Dashboard">
      <WelcomeBanner name={firstName} greeting={getGreeting(new Date().getHours())} levelInfo={levelInfo} />

      {/* Four quick stats */}
      <div className="stat-row">
        <StatTile icon="⚡" label="Total XP" value={student.xp} color="#d1fae5" />
        <StatTile icon="🔥" label="Day streak" value={student.streak.count} color="#ffedd5" />
        <StatTile icon="📘" label="Lessons done" value={doneLessons} color="#dbeafe" />
        <StatTile icon="🏅" label="Badges" value={`${unlockedBadges}/${badges.length}`} color="#ede9fe" />
      </div>

      <div className="dash-grid">
        <SkillOverview skills={skillsWithProgress} />
        <QuickQuizCard student={student} unlockedSkillIds={unlockedSkillIds} />
      </div>

      <div className="dash-grid">
        <StudyTasksCard />
        <UniversityLeaderboard userCollege={currentUser?.profile?.college} />
      </div>

      <AchievementPreview badges={badges} />
    </PageContainer>
  );
}
