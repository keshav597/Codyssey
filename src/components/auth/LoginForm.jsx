import { useState } from 'react';
import Link from '../common/Link';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '../../hooks/useNavigation';
import { validateSignIn, hasErrors } from '../../utils/validation';
import { fakeAPI } from '../../hooks/useAsyncData';
import '../../pages/pages.css';

// Login form, used on the landing page and on /signin
export default function LoginForm() {
  const { signIn } = useAuth();
  const { navigate } = useNavigation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  // errors are worked out from whatever is typed right now
  const errors = validateSignIn(form);
  const showError = (field) => (touched[field] ? errors[field] : '');

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const handleBlur = (field) => () => setTouched({ ...touched, [field]: true });

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (hasErrors(errors)) return;

    setLoading(true);
    setFormError('');
    await fakeAPI(() => true, 600); // pretend we are talking to a server

    const result = signIn(form);
    setLoading(false);

    if (!result.success) {
      setFormError(result.error);
      return;
    }
    navigate(result.user.onboardingComplete === false ? 'setup' : 'dashboard');
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {formError && <div className="auth-card__error">{formError}</div>}

      <FormInput
        label="Email"
        id="login-email"
        type="email"
        value={form.email}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        placeholder="player@email.com"
        error={showError('email')}
        required
      />
      <FormInput
        label="Password"
        id="login-password"
        type="password"
        value={form.password}
        onChange={handleChange('password')}
        onBlur={handleBlur('password')}
        error={showError('password')}
        required
        style={{ marginTop: 14, marginBottom: 20 }}
      />

      <Button type="submit" fullWidth size="lg" disabled={loading}>
        {loading ? 'Loading...' : '▶ Start Game'}
      </Button>

      <p className="auth-card__footer">
        New player? <Link to="signup" className="lp-link">Create account</Link>
      </p>
    </form>
  );
}
