import {
  LayoutDashboard,
  Milestone,
  CheckSquare,
  Award,
  User,
  Settings,
  ShoppingBag,
  Code2,
  LogOut,
} from 'lucide-react';
import { useNavigation } from '../../hooks/useNavigation';
import { useProgress } from '../../hooks/useProgress';
import { useAuth } from '../../hooks/useAuth';
import './Sidebar.css';

const NAV_ITEMS = [
  { page: 'dashboard',  label: 'Dashboard',      icon: LayoutDashboard },
  { page: 'codeverse',  label: 'Roadmap',        icon: Milestone },
  { page: 'quiz',       label: 'Assessments',    icon: CheckSquare },
  { page: 'rewards',    label: 'Certifications', icon: Award },
  { page: 'shop',       label: 'Perks Store',    icon: ShoppingBag },
  { page: 'profile',    label: 'Profile',        icon: User },
];

// This component is used to render the main navigation sidebar with live XP indicator
export default function Sidebar() {
  const { currentPage, navigate } = useNavigation();
  const { student } = useProgress();
  const { currentUser, logout } = useAuth();

  // Log out, then go back to the landing page
  function handleLogout() {
    logout();
    navigate('landing');
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" onClick={() => navigate('dashboard')} style={{ cursor: 'pointer' }}>
        <div className="sidebar-logo-mark">
          <Code2 size={20} strokeWidth={2.5} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="sidebar-logo-text">Codyssey</span>
          <span className="sidebar-logo-sub">Engineering Track</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ page, label, icon: Icon }) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              type="button"
              onClick={() => navigate(page)}
              className={`sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
            >
              <Icon size={18} strokeWidth={2} />
              <span className="sidebar-label">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div
          onClick={() => navigate('shop')}
          style={{
            padding: '8px 12px',
            margin: '0 8px 8px 8px',
            borderRadius: 8,
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          title="Click to visit Perks Store"
        >
          <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>XP Balance</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#047857' }}>⚡ {student.xp} XP</span>
        </div>

        <button
          type="button"
          onClick={() => navigate('settings')}
          className={`sidebar-link ${currentPage === 'settings' ? 'sidebar-link--active' : ''}`}
        >
          <Settings size={18} />
          <span className="sidebar-label">Settings</span>
        </button>
        <button type="button" onClick={handleLogout} className="sidebar-link sidebar-link--logout">
          <LogOut size={18} />
          <span className="sidebar-label">Log out{currentUser ? ` (${currentUser.name.split(' ')[0]})` : ''}</span>
        </button>
      </div>
    </aside>
  );
}
