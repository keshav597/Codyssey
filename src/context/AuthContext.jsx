import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // This state is used to store registered users in localStorage
  const [users, setUsers] = useLocalStorage('codyssey_users', []);
  // This state is used to track the currently logged in session
  const [session, setSession] = useLocalStorage('codyssey_session', null);

  // This function is used to register a new user and store credentials in localStorage
  function signUp({ name, email, password }) {
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser = {
      id: `user-${Date.now()}`,
      name: name || 'Student Developer',
      email: email || 'student@university.edu',
      password: password || '',
      onboardingComplete: true,
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setSession({ userId: newUser.id });
    return { success: true, user: newUser };
  }

  // This function is used to authenticate a user by checking email and password
  function signIn({ email, password }) {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      return { success: false, error: 'Invalid email or password.' };
    }
    setSession({ userId: user.id });
    return { success: true, user };
  }

  // This function is used to sign out the user (clears the session)
  function logout() {
    setSession(null);
  }

  // This function is used to update the profile information of the current student
  function updateProfile(updatedData) {
    setUsers((prev) =>
      prev.map((u) => (u.id === session?.userId ? { ...u, ...updatedData } : u))
    );
  }

  // This function is used to save onboarding setup answers
  function completeOnboarding(profileData) {
    setUsers((prev) =>
      prev.map((u) =>
        session && u.id === session.userId
          ? { ...u, onboardingComplete: true, profile: profileData }
          : u
      )
    );
  }

  // Logged in only if a session exists and the user is found
  const currentUser = session ? users.find((u) => u.id === session.userId) || null : null;

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    signUp,
    signIn,
    logout,
    updateProfile,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
