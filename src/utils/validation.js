// This function is used to test if an email address is valid
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

// This function is used to validate registration form input fields
export function validateSignUp({ name, email, password, confirmPassword }) {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Enter your full name.';
  if (!email || !isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters.';
  if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
  return errors;
}

// This function is used to validate sign-in input fields
export function validateSignIn({ email, password }) {
  const errors = {};
  if (!email || !isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!password) errors.password = 'Enter your password.';
  return errors;
}

// This function is used to check if an errors object contains any errors
export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
