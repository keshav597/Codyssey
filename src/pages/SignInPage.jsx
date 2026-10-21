/**
 * SignInPage.jsx — Enhanced with:
 *   ✓ Touched state  — errors only show after a field has been blurred
 *   ✓ Loading state  — button shows "Signing In..." during submit
 *   ✓ FormInput component (with onBlur, hint support)
 */

import { useState } from 'react';
import Link from '../components/common/Link';
import { useNavigation } from '../hooks/useNavigation';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { validateSignIn, hasErrors } from '../utils/validation';
import './pages.css';

const fakeAPI = (fn, delayMs = 800) => new Promise((resolve) => setTimeout(() => resolve(fn()), delayMs));

export default function SignInPage() {
  const { signIn } = useAuth();
  const { navigate } = useNavigation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Derived — always computed from current form values
  const errors = validateSignIn(form);
  const fieldError = (key) => (touched[key] ? errors[key] : '');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const handleBlur = (key) => () => setTouched((t) => ({ ...t, [key]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reveal all field errors at once
    setTouched({ email: true, password: true });
    if (hasErrors(errors)) return;

    setSubmitting(true);
    setFormError('');

    try {
      // Simulate async auth request (800ms delay)
      await fakeAPI(() => true, 800);

      const result = signIn(form);
      if (!result.success) {
        setFormError(result.error);
        return;
      }
      navigate(result.user?.onboardingComplete !== false ? 'dashboard' : 'setup');
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__logo">
          <div className="auth-card__logo-mark">⚡</div>
          <strong style={{ fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif", fontSize: 18 }}>
            Codyssey
          </strong>
        </div>
        <h2 style={{ marginBottom: 4 }}>Welcome back</h2>
        <p className="text-secondary" style={{ fontSize: 13, marginBottom: 22 }}>
          Ready for today's quest?
        </p>

        {formError && <div className="auth-card__error">{formError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            label="Email"
            id="email"
            type="email"
            value={form.email}
            onChange={update('email')}
            onBlur={handleBlur('email')}
            placeholder="you@example.com"
            error={fieldError('email')}
            required
          />
          <FormInput
            label="Password"
            id="password"
            type="password"
            value={form.password}
            onChange={update('password')}
            onBlur={handleBlur('password')}
            error={fieldError('password')}
            required
            style={{ marginTop: 14, marginBottom: 20 }}
          />
          <Button type="submit" fullWidth size="lg" disabled={submitting}>
            {submitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <p className="auth-card__footer">
          New to Codyssey?{' '}
          <Link to="/signup" style={{ color: '#6366f1', fontWeight: 600 }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
