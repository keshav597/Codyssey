import { useNavigation } from './hooks/useNavigation';

import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import SetupPage from './pages/SetupPage';
import Dashboard from './pages/Dashboard';
import CodeversePage from './pages/CodeversePage';
import AssessmentPage from './pages/AssessmentPage';
import RewardsPage from './pages/RewardsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import ShopPage from './pages/ShopPage';

// This component is used as the root SPA router to render pages based on active route
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
    case 'roadmap':
    case 'learn':
      return <CodeversePage />;
    case 'quiz':
      return <AssessmentPage />;
    case 'rewards':
      return <RewardsPage />;
    case 'profile':
      return <ProfilePage />;
    case 'settings':
      return <SettingsPage />;
    case 'shop':
      return <ShopPage />;
    default:
      return <NotFoundPage />;
  }
}