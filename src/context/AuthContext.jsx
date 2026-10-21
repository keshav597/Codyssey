import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext(null);

const DEFAULT_USER = {
  id: 'user-royal',
  name: 'Royal Scholar',
  email: 'scholar@royal.academy',
  onboardingComplete: true,
  createdAt: new Date().toISOString(),
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('codyssey_users', [DEFAULT_USER]);
  const [session, setSession] = useLocalStorage('codyssey_session', { userId: DEFAULT_USER.id });

  function signUp({ name, email, password }) {
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser = {
      id: `user-${Date.now()}`,
      name: name || 'Royal Scholar',
      email: email || 'scholar@royal.academy',
      password: password || '',
      onboardingComplete: true,
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setSession({ userId: newUser.id });
    return { success: true, user: newUser };
  }

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

  function logout() {
    // Keeps active guest/scholar state instead of locking user out
    setSession({ userId: DEFAULT_USER.id });
  }

  function updateProfile(updatedData) {
    setUsers((prev) =>
      prev.map((u) => (u.id === (session?.userId || DEFAULT_USER.id) ? { ...u, ...updatedData } : u))
    );
  }

  function completeOnboarding(profileData) {
    setUsers((prev) =>
      prev.map((u) =>
        session && u.id === session.userId
          ? { ...u, onboardingComplete: true, profile: profileData }
          : u
      )
    );
  }

  const currentUser =
    (session ? users.find((u) => u.id === session.userId) : null) || users[0] || DEFAULT_USER;

  const value = {
    currentUser,
    isAuthenticated: true,
    signUp,
    signIn,
    logout,
    updateProfile,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
