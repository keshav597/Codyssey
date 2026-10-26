import { useLocation, useNavigate, useParams } from 'react-router-dom';

// Small wrapper around React Router so every page can keep using navigate('dashboard')
export function useNavigation() {
  const routerNavigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // 'dashboard' -> '/dashboard', 'landing' -> '/'
  function navigate(page, state = {}) {
    const clean = String(page).replace(/^\//, '');
    const path = clean === 'landing' || clean === '' ? '/' : `/${clean}`;
    routerNavigate(path, { state });
  }

  return {
    currentPage: location.pathname.split('/')[1] || 'landing',
    pageParams: { ...params, ...(location.state || {}) },
    navigate,
  };
}
