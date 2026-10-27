import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function useNavigation() {
  const routerNavigate = useNavigate();
  const location = useLocation();
  const params = useParams();

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
