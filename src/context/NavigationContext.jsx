import { createContext, useState } from 'react';

export const NavigationContext = createContext(null);

function sanitizePageName(raw) {
  if (!raw) return 'dashboard';
  const clean = String(raw).startsWith('/') ? raw.slice(1).toLowerCase() : String(raw).toLowerCase();
  return clean || 'dashboard';
}

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [pageParams, setPageParams] = useState({});

  function navigate(targetPage, params = {}) {
    const clean = sanitizePageName(targetPage);
    setPageParams(params || {});
    setCurrentPage(clean);
  }

  const value = {
    currentPage,
    pageParams,
    navigate,
    isPublicPage: ['landing', 'signin', 'signup'].includes(currentPage),
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}
