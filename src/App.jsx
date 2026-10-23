import { useNavigation } from './hooks/useNavigation';

import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import SetupPage from './pages/SetupPage';
import Dashboard from './pages/Dashboard';
import CodeversePage from './pages/CodeversePage';
import LearnPage from './pages/LearnPage';
import AssessmentPage from './pages/AssessmentPage';
import RewardsPage from './pages/RewardsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import ShopPage from './pages/ShopPage';       // new: Zustand cart + async data
import PortfolioPage from './pages/PortfolioPage'; // new: nested SPA tabs + form

/**
 * App.jsx — The "Router Outlet"
 *
 * This is the SPA router: reads currentPage from NavigationContext
 * and renders the matching page component.
 *
 * Same concept as react-router's <Routes> / <Switch>:
 *   <Route path="/shop" element={<ShopPage />} />  ← react-router
 *   case 'shop': return <ShopPage />;              ← our custom router
 */
export default function App() {
  const { currentPage } = useNavigation();

  switch (currentPage) {
    case 'dashboard':
    case '':
      return <Dashboard />;
    case 'landing':
      return <LandingPage />;
    case 'signin':
      return <SignInPage />;
    case 'signup':
      return <SignUpPage />;
    case 'setup':
      return <SetupPage />;
    case 'codeverse':
      return <CodeversePage />;
    case 'learn':
      return <LearnPage />;
    case 'quiz':
      return <AssessmentPage />;
    case 'rewards':
      return <RewardsPage />;
    case 'profile':
      return <ProfilePage />;
    case 'settings':
      return <SettingsPage />;
    case 'shop':
      return <ShopPage />;        // demonstrates Zustand + async loading state
    case 'portfolio':
      return <PortfolioPage />;   // demonstrates nested SPA routing + form handling
    default:
      return <NotFoundPage />;
  }
}