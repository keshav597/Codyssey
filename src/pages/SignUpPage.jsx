import { useState } from 'react';
import Link from '../components/common/Link';
import { useNavigation } from '../hooks/useNavigation';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { validateSignUp, hasErrors } from '../utils/validation';
import { fakeAPI } from '../hooks/useAsyncData';
import './pages.css';

// This component is used to render the student sign up and registration form
export default function SignUpPage() {
  const { signUp } = useAuth();
  const { navigate } = useNavigation();

  // This state is used to hold controlled input values for the form
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // This state is used to track which input fields the user has focused and blurred
  const [touched, setTouched] = useState({});
  // This state is used to store general submission or server error messages
  const [formError, setFormError] = useState('');
  // This state is used to indicate async form submission in progress
  const [submitting, setSubmitting] = useState(false);

  // This is done for computing validation errors on each render
  const errors = validateSignUp(form);

  // This function is used to return an error message only if the field has been touched
  const fieldError = (key) => (touched[key] ? errors[key] : '');

  // This function is used to update form state when a user types into an input field
  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // This function is used to mark a field as touched when the user blurs away from it
  const handleBlur = (key) => () =>
    setTouched((t) => ({ ...t, [key]: true }));

  // This function is used to handle form submission and validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    if (hasErrors(errors)) return;

    setSubmitting(true);
    setFormError('');

    try {
      await fakeAPI(() => true, 600);

      const result = signUp(form);
      if (!result.success) {
        setFormError(result.error);
        return;
      }
      navigate('setup');
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
          <strong style={{ fontSize: 18 }}>
            Codyssey
          </strong>
        </div>
        <h2 style={{ marginBottom: 4 }}>Create your account</h2>
        <p className="text-secondary" style={{ fontSize: 13, marginBottom: 22 }}>
          Demo client-side authentication — data is saved to browser storage.
        </p>

        {formError && <div className="auth-card__error">{formError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            label="Full Name"
            id="name"
            value={form.name}
            onChange={update('name')}
            onBlur={handleBlur('name')}
            placeholder="Aryan Sharma"
            error={fieldError('name')}
            hint={!touched.name ? 'First and last name' : ''}
            required
          />
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
            style={{ marginTop: 14 }}
          />
          <FormInput
            label="Password"
            id="password"
            type="password"
            value={form.password}
            onChange={update('password')}
            onBlur={handleBlur('password')}
            placeholder="At least 6 characters"
            error={fieldError('password')}
            hint={!touched.password ? 'Minimum 6 characters' : ''}
            required
            style={{ marginTop: 14 }}
          />
          <FormInput
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={update('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            error={fieldError('confirmPassword')}
            required
            style={{ marginTop: 14, marginBottom: 20 }}
          />

          <Button
            type="submit"
            fullWidth
            size="lg"
            disabled={submitting}
          >
            {submitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <p className="auth-card__footer">
          Already have an account?{' '}
          <Link to="signin" style={{ color: '#059669', fontWeight: 600 }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
