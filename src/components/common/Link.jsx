import { Link as RouterLink } from 'react-router-dom';

// Reusable link: to="signup" -> goes to /signup (no page reload)
export default function Link({ to, children, style = {}, ...rest }) {
  const path = to === 'landing' ? '/' : `/${String(to).replace(/^\//, '')}`;
  return (
    <RouterLink to={path} style={{ textDecoration: 'none', ...style }} {...rest}>
      {children}
    </RouterLink>
  );
}
