import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import SkillProgress from '../components/skills/SkillProgress';
import GitHubProfileViewer from '../components/profile/GitHubProfileViewer';
import { collegeDetails } from '../data/colleges';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { BookOpen } from 'lucide-react';
import './pages.css';

// This component is used to render the student profile, college rank, and GitHub API viewer
export default function ProfilePage() {
  const { currentUser } = useAuth();
  const { student, levelInfo, skillsWithProgress, badges } = useProgress();

  const unlockedBadges = badges.filter((b) => b.unlocked);
  const challengesCompleted = student.completedQuestIds.length;

  const collegeName = student.onboarding?.college || 'Chitkara University';
  const collegeObj = collegeDetails.find((c) => c.name === collegeName) || collegeDetails[0];

  return (
    <PageContainer title="Profile & Academic Record">
      <div className="dash-grid">
        <Card>
          <div className="profile-header">
            <div className="profile-avatar">{currentUser?.name?.[0]?.toUpperCase() || 'C'}</div>
            <div>
              <h2>{currentUser?.name || 'Coder'}</h2>
              <p className="text-secondary" style={{ fontSize: 13 }}>
                Level {levelInfo.current.level} — {levelInfo.current.title} · <span className="mono">{student.xp} XP</span> · 🔥 {student.streak.count} Day Streak
              </p>
            </div>
          </div>

          <div style={{ margin: '14px 0', padding: '12px 14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>{collegeObj?.badge || '🎓'}</span>
            <div>
              <strong style={{ fontSize: 13, display: 'block', color: '#0f172a' }}>{collegeName}</strong>
              <span className="text-secondary" style={{ fontSize: 11 }}>
                Campus Rank: Top 5% · {collegeObj?.location || 'India'}
              </span>
            </div>
          </div>

          <div className="stat-row"><span>Lessons completed</span><strong>{student.completedLessonIds.length}</strong></div>
          <div className="stat-row"><span>Quizzes completed</span><strong>{student.quizHistory.length}</strong></div>
          <div className="stat-row"><span>Quests completed</span><strong>{challengesCompleted}</strong></div>
          <div className="stat-row"><span>Achievements</span><strong>{unlockedBadges.length}</strong></div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontSize: 16 }}>Skills</h3>
            <span className="badge-chip badge-chip--primary" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
              <BookOpen size={12} /> Curriculum Aligned
            </span>
          </div>
          {skillsWithProgress.map((skill) => (
            <SkillProgress key={skill.id} skill={skill} />
          ))}
        </Card>
      </div>

      {/* Earned badges and certifications */}
      <Card style={{ marginTop: 20 }}>
        <h3 style={{ marginBottom: 14 }}>Achievements & Badges</h3>
        {unlockedBadges.length === 0 ? (
          <p className="empty-note">Your collection starts here. Complete quizzes & lessons to earn badges!</p>
        ) : (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {unlockedBadges.map((b) => (
              <span key={b.id} className="badge-chip badge-chip--success">{b.icon} {b.name}</span>
            ))}
          </div>
        )}
      </Card>

      {/* GitHub REST API Profile Viewer (Lectures 67–72) */}
      <GitHubProfileViewer />
    </PageContainer>
  );
}
