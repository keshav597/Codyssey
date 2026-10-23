import {
  LayoutDashboard,
  Rocket,
  BookOpen,
  Award,
  User,
  Settings,
  ShoppingBag,
  Briefcase,
} from 'lucide-react';
import { useNavigation } from '../../hooks/useNavigation';
import './Sidebar.css';

/**
 * NAV_ITEMS — the list of pages in the sidebar navigation.
 *
 * Adding a new page to the app = 3 steps:
 *   1. Add a case in App.jsx switch
 *   2. Add an entry here in NAV_ITEMS
 *   3. Create the page component file
 *
 * The Sidebar reads currentPage from NavigationContext (global state)
 * to highlight the active tab. Each button calls navigate(page) which
 * updates currentPage → triggers App.jsx to render the new page.
 */
const NAV_ITEMS = [
  { page: 'dashboard',  label: 'Dashboard',       icon: LayoutDashboard },
  { page: 'codeverse',  label: 'Roadmap',          icon: Rocket },
  { page: 'learn',      label: 'Learn',            icon: BookOpen },
  { page: 'rewards',    label: 'Badges & Rewards', icon: Award },
  { page: 'shop',       label: 'XP Shop',          icon: ShoppingBag },   // new
  { page: 'portfolio',  label: 'Portfolio',        icon: Briefcase },     // new
  { page: 'profile',    label: 'Profile',          icon: User },
];

export default function Sidebar() {
  const { currentPage, navigate } = useNavigation();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" onClick={() => navigate('dashboard')} style={{ cursor: 'pointer' }}>
        <span className="sidebar-logo-mark">👑</span>
        <span className="sidebar-logo-text">Codyssey</span>
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
              <Icon size={19} strokeWidth={2} />
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
          <Settings size={19} />
          <span className="sidebar-label">Settings</span>
        </button>
      </div>
    </aside>
  );
}
