/**
 * SignUpPage.jsx — Enhanced with:
 *   ✓ Touched state  — errors only show after a field has been blurred
 *   ✓ Loading state  — button shows "Creating..." during async operation
 *   ✓ Real-time validation after touching (on-blur + on-change combination)
 *   ✓ Uses FormInput component (enhanced reusable input with hint, onBlur)
 *
 * FORM VALIDATION STRATEGY: "Validate on blur, re-validate on change"
 *   1. When user focuses then leaves a field (blur) → mark as touched → show error
 *   2. While typing in a touched field → errors update in real-time
 *   3. On submit → touch all fields → show all remaining errors
 */

import { useState } from 'react';
import Link from '../components/common/Link';
import { useNavigation } from '../hooks/useNavigation';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { validateSignUp, hasErrors } from '../utils/validation';
import { fakeAPI } from '../hooks/useAsyncData';
import './pages.css';

export default function SignUpPage() {
  const { signUp } = useAuth();
  const { navigate } = useNavigation();

  // All field values in one state object
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Tracks which fields the user has visited (blurred at least once)
  const [touched, setTouched] = useState({});

  // Form-level error (e.g., email already exists from server/context)
  const [formError, setFormError] = useState('');

  // Submission loading state — prevents double-submit, shows spinner
  const [submitting, setSubmitting] = useState(false);

  // DERIVED (not stored) — recalculated every render from current `form`
  const errors = validateSignUp(form);

  // Only show error for a field if it has been touched by the user
  const fieldError = (key) => (touched[key] ? errors[key] : '');

  // Generic value updater — same pattern as before
  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // Mark field as touched on blur — triggers error display for that field
  const handleBlur = (key) => () =>
    setTouched((t) => ({ ...t, [key]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Touch all fields so all errors become visible at once
    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    if (hasErrors(errors)) return; // block submit if validation fails

    setSubmitting(true);
    setFormError('');

    try {
      // Simulate async sign-up (real app: await fetch('/api/signup', { body: form }))
      await fakeAPI(() => true, 800);

      const result = signUp(form);
      if (!result.success) {
        setFormError(result.error);
        return;
      }
      navigate('setup');
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false); // always reset — even on error
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
        <h2 style={{ marginBottom: 4 }}>Create your account</h2>
        <p className="text-secondary" style={{ fontSize: 13, marginBottom: 22 }}>
          Demo, client-side authentication — data is stored in your browser only.
        </p>

        {formError && <div className="auth-card__error">{formError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            label="Full Name"
            id="name"
            value={form.name}
            onChange={update('name')}
            onBlur={handleBlur('name')}      /* marks field touched on blur */
            placeholder="Aryan Sharma"
            error={fieldError('name')}        /* only shows if touched */
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

          {/* Disabled + shows loading text during async submit */}
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
          <Link to="/signin" style={{ color: '#6366f1', fontWeight: 600 }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
