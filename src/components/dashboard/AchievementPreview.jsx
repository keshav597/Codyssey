import { useNavigation } from '../../hooks/useNavigation';
import Button from '../common/Button';
import '../rewards/rewards.css';

export default function AchievementPreview({ badges }) {
  const { navigate } = useNavigation();

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const showcaseBadges = badges.slice(0, 4);

  return (
    <div className="royal-badge-box" style={{ marginTop: 24 }}>
      <div className="royal-badge-box__header">
        <div className="royal-badge-box__title-area">
          <div className="royal-badge-box__icon-frame">
            <span style={{ fontSize: 20 }}>🎓</span>
          </div>
          <div>
            <h3 className="royal-badge-box__title" style={{ fontSize: 18 }}>
              Engineering Certifications & Milestones
            </h3>
            <p className="royal-badge-box__subtitle">
              Verified credentials awarded for curriculum milestones and technical evaluations
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="royal-badge-box__stat-pill">
            <span>✓ {unlockedCount} / {badges.length} Certified</span>
          </div>
          <Button onClick={() => navigate('rewards')} size="sm" variant="secondary">
            View All →
          </Button>
        </div>
      </div>

      <div className="badge-grid--grand">
        {showcaseBadges.map((b) => {
          const rarity = (b.rarity || 'rare').toLowerCase();
          return (
            <div
              key={b.id}
              className={`badge-card--big ${b.unlocked ? 'badge-card--unlocked' : 'badge-card--locked'}`}
            >
              <span className={`badge-card__rarity badge-card__rarity--${rarity}`}>
                {b.rarity || 'Rare'}
              </span>

              <div className="badge-card__pedestal">
                <span>{b.unlocked ? b.icon : '🔒'}</span>
              </div>

              <h4 className="badge-card__name">{b.name}</h4>
              <p className="badge-card__desc">{b.description}</p>

              <div className="badge-card__footer">
                <span className={`badge-card__status ${b.unlocked ? 'badge-card__status--unlocked' : 'badge-card__status--locked'}`}>
                  {b.unlocked ? '✓ Verified' : 'Pending'}
                </span>
                <span className="badge-card__xp">+{b.xp || 25} XP</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
