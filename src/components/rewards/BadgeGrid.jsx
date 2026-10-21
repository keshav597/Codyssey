import { useState } from 'react';
import './rewards.css';

export default function BadgeGrid({ badges }) {
  const [filter, setFilter] = useState('all');

  const filtered = badges.filter((b) => {
    if (filter === 'unlocked') return b.unlocked;
    if (filter === 'locked') return !b.unlocked;
    return true;
  });

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const totalXP = badges.filter((b) => b.unlocked).reduce((sum, b) => sum + (b.xp || 0), 0);

  return (
    <div className="royal-badge-box">
      <div className="royal-badge-box__header">
        <div className="royal-badge-box__title-area">
          <div className="royal-badge-box__icon-frame">👑</div>
          <div>
            <h2 className="royal-badge-box__title">Royal Trophy & Badge Vault</h2>
            <p className="royal-badge-box__subtitle">
              Prestige milestones unlocked through skill mastery and quiz excellence
            </p>
          </div>
        </div>

        <div className="royal-badge-box__stats">
          <div className="royal-badge-box__stat-pill">
            <span>🏆 {unlockedCount} / {badges.length} Unlocked</span>
          </div>
          <div className="royal-badge-box__stat-pill" style={{ background: '#f0fdf4', borderColor: '#bbf7d0', color: '#15803d' }}>
            <span>⚡ +{totalXP} Badge XP</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        {['all', 'unlocked', 'locked'].map((f) => (
          <button
            key={f}
            type="button"
            className={`skill-filter__btn ${filter === f ? 'skill-filter__btn--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? `All Badges (${badges.length})` : f === 'unlocked' ? `Unlocked (${unlockedCount})` : `Locked (${badges.length - unlockedCount})`}
          </button>
        ))}
      </div>

      <div className="badge-grid--grand">
        {filtered.map((b) => {
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

              <h3 className="badge-card__name">{b.name}</h3>
              <p className="badge-card__desc">{b.description}</p>

              <div className="badge-card__footer">
                <span className={`badge-card__status ${b.unlocked ? 'badge-card__status--unlocked' : 'badge-card__status--locked'}`}>
                  {b.unlocked ? '✨ Unlocked' : '🔒 Locked'}
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
