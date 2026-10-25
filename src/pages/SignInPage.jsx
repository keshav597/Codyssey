import { useState } from 'react';
import Link from '../components/common/Link';
import { useNavigation } from '../hooks/useNavigation';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { validateSignIn, hasErrors } from '../utils/validation';
import { fakeAPI } from '../hooks/useAsyncData';
import './pages.css';

// This component is used to render the user sign-in page
export default function SignInPage() {
  const { signIn } = useAuth();
  const { navigate } = useNavigation();

  // This state is used for email and password input values
  const [form, setForm] = useState({ email: '', password: '' });
  // This state is used to track fields blurred by the user
  const [touched, setTouched] = useState({});
  // This state is used to store submission or credential errors
  const [formError, setFormError] = useState('');
  // This state is used for showing loading spinner on submit
  const [submitting, setSubmitting] = useState(false);

  // This is done for deriving errors from current form state
  const errors = validateSignIn(form);
  const fieldError = (key) => (touched[key] ? errors[key] : '');

  // This function is used to update the field values in state
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // This function is used to mark an input field as touched on blur
  const handleBlur = (key) => () => setTouched((t) => ({ ...t, [key]: true }));

  // This function is used to authenticate user and redirect to dashboard
  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ email: true, password: true });
    if (hasErrors(errors)) return;

    setSubmitting(true);
    setFormError('');

    try {
      await fakeAPI(() => true, 600);

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

  // This function is used to quickly sign in with the default demo account for testing
  const handleQuickDemo = () => {
    navigate('dashboard');
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__logo">
          <div className="auth-card__logo-mark">⚡</div>
          <strong style={{ fontSize: 18 }}>
            Codyssey
          </strong>
        </div>
        <h2 style={{ marginBottom: 4 }}>Welcome back</h2>
        <p className="text-secondary" style={{ fontSize: 13, marginBottom: 22 }}>
          Sign in to continue your engineering track.
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

          <Button
            type="button"
            variant="secondary"
            fullWidth
            size="md"
            onClick={handleQuickDemo}
            style={{ marginTop: 10 }}
          >
            🚀 Quick Demo Login (Skip Auth)
          </Button>
        </form>

        <p className="auth-card__footer">
          New to Codyssey?{' '}
          <Link to="signup" style={{ color: '#059669', fontWeight: 600 }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
