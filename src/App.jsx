import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';

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
import ShopPage from './pages/ShopPage';
import NotFoundPage from './pages/NotFoundPage';

// Root of the SPA: public pages first, then protected pages (login required), then 404
export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Protected routes (nested inside ProtectedRoute) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/codeverse" element={<CodeversePage />} />
        <Route path="/quiz" element={<AssessmentPage />} />
        <Route path="/quiz/:skillId" element={<AssessmentPage />} /> {/* dynamic route */}
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
