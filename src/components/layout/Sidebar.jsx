import {
  LayoutDashboard,
  Milestone,
  CheckSquare,
  Award,
  User,
  Settings,
  ShoppingBag,
  Code2,
} from 'lucide-react';
import { useNavigation } from '../../hooks/useNavigation';
import './Sidebar.css';

const NAV_ITEMS = [
  { page: 'dashboard',  label: 'Dashboard',      icon: LayoutDashboard },
  { page: 'codeverse',  label: 'Roadmap',        icon: Milestone },
  { page: 'quiz',       label: 'Assessments',    icon: CheckSquare },
  { page: 'rewards',    label: 'Certifications', icon: Award },
  { page: 'shop',       label: 'Perks Store',    icon: ShoppingBag },
  { page: 'profile',    label: 'Profile',        icon: User },
];

export default function Sidebar() {
  const { currentPage, navigate } = useNavigation();

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
        <button
          type="button"
          onClick={() => navigate('settings')}
          className={`sidebar-link ${currentPage === 'settings' ? 'sidebar-link--active' : ''}`}
        >
          <Settings size={18} />
          <span className="sidebar-label">Settings</span>
        </button>
      </div>
    </aside>
  );
}

