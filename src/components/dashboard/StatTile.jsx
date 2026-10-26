import './dashboard.css';

// Small reusable tile showing one number (XP, streak, badges...)
export default function StatTile({ icon, label, value, color }) {
  return (
    <div className="stat-tile">
      <div className="stat-tile__icon" style={{ background: color }}>{icon}</div>
      <div>
        <div className="stat-tile__value">{value}</div>
        <div className="stat-tile__label">{label}</div>
      </div>
    </div>
  );
}
