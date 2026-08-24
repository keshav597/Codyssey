import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

/**
 * AuthContext — demo, client-side-only authentication.
 * Accounts and sessions are maintained in React memory (useState)
 * without persisting to browser localStorage, ensuring users are not
 * automatically logged in across app restarts.
 */
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [session, setSession] = useState(null);

  // Clear any legacy auth session/users stored in browser localStorage on mount
  useEffect(() => {
    try {
      window.localStorage.removeItem('codyssey_users');
      window.localStorage.removeItem('codyssey_session');
    } catch (err) {
      console.warn('Failed to clear legacy auth storage', err);
    }
  }, []);

  const signUp = useCallback(
    ({ name, email, password }) => {
      const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return { success: false, error: 'An account with this email already exists.' };
      }
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password,
        onboardingComplete: false,
        createdAt: new Date().toISOString(),
      };
      setUsers((prev) => [...prev, newUser]);
      setSession({ userId: newUser.id });
      return { success: true, user: newUser };
    },
    [users]
  );

  const signIn = useCallback(
    ({ email, password }) => {
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (!user) {
        return { success: false, error: 'Invalid email or password.' };
      }
      setSession({ userId: user.id });
      return { success: true, user };
    },
    [users]
  );

  const logout = useCallback(() => {
    setSession(null);
  }, []);

  const completeOnboarding = useCallback(
    (profileData) => {
      setUsers((prev) =>
        prev.map((u) =>
          session && u.id === session.userId
            ? { ...u, onboardingComplete: true, profile: profileData }
            : u
        )
      );
    },
    [session]
  );

  const currentUser = useMemo(
    () => (session ? users.find((u) => u.id === session.userId) || null : null),
    [session, users]
  );

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: !!currentUser,
      signUp,
      signIn,
      logout,
      completeOnboarding,
    }),
    [currentUser, signUp, signIn, logout, completeOnboarding]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
