/**
 * FormInput.jsx — Enhanced reusable input component
 *
 * IMPROVEMENTS over the basic Input.jsx:
 * 1. Supports `onBlur` → enables "touched" validation pattern
 * 2. Supports `hint` → shows helper text below input (turns red on error)
 * 3. Supports `type="textarea"` → renders a <textarea> instead of <input>
 * 4. Supports `disabled` → grays out the field
 * 5. Supports `rows` → textarea height control
 * 6. Proper `aria-*` attributes for accessibility
 *
 * USAGE EXAMPLES:
 *
 * // Basic controlled input
 * <FormInput label="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
 *
 * // With error (shown from parent — e.g., only when touched)
 * <FormInput label="Email" id="email" value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   onBlur={handleBlur('email')}
 *   error={touched.email ? errors.email : ''}
 * />
 *
 * // With hint text
 * <FormInput label="Password" id="pw" type="password" value={pw}
 *   hint="Must be at least 6 characters"
 *   error={errors.password}
 * />
 *
 * // Textarea
 * <FormInput label="Bio" id="bio" type="textarea" rows={4} value={bio}
 *   onChange={(e) => setBio(e.target.value)}
 * />
 *
 * // Disabled
 * <FormInput label="Email" id="email" value={user.email} disabled />
 */

import './FormInput.css';

export default function FormInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  onBlur,          // new: for "touched" pattern
  placeholder = '',
  error = '',
  required = false,
  disabled = false, // new: disabled state
  hint = '',        // new: helper text shown below input
  rows = 4,         // new: for textarea
  style = {},       // for wrapper div
  maxLength,        // new: character limit
}) {
  // Decide which element to render
  const isTextarea = type === 'textarea';

  const inputClass = [
    'finput',
    error   ? 'finput--error'    : '',
    disabled ? 'finput--disabled' : '',
  ].filter(Boolean).join(' ');

  // Shared props for both input and textarea
  const sharedProps = {
    id,
    value,
    onChange,
    onBlur,
    placeholder,
    disabled,
    maxLength,
    className: inputClass,
    'aria-invalid': !!error,
    'aria-describedby': (error || hint) ? `${id}-desc` : undefined,
  };

  return (
    <div className="ffield" style={style}>
      {label && (
        <label htmlFor={id} className="ffield__label">
          {label}
          {required && <span className="ffield__required" aria-hidden="true"> *</span>}
        </label>
      )}

      {isTextarea ? (
        <textarea rows={rows} {...sharedProps} />
      ) : (
        <input type={type} {...sharedProps} />
      )}

      {/* Hint or Error — same element, different color */}
      {(error || hint) && (
        <p
          id={`${id}-desc`}
          className={`ffield__hint ${error ? 'ffield__hint--error' : ''}`}
        >
          {error || hint}
        </p>
      )}

      {/* Character counter — shows remaining chars if maxLength is set */}
      {maxLength && (
        <span className="ffield__counter">
          {String(value || '').length}/{maxLength}
        </span>
      )}
    </div>
  );
}
