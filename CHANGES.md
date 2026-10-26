# Codyssey – What changed (Evaluation-II)

## Problems found in the old version
1. **No real routing** – pages were switched with a `switch` + context, so the browser Back button, URLs and refresh did not work.
2. **Fake login** – `isAuthenticated` was always `true`, the app opened straight on the dashboard, and "Quick Demo (Skip Auth)" bypassed login.
3. **Logout did nothing useful** – it just logged in as the demo user again.
4. No protected routes, no dynamic route, 404 only worked by accident.
5. Landing page had no login; two big pages (landing / dashboard) were cluttered.
6. Passwords are stored in plain text in localStorage (fine for a college demo, but say so in viva – real apps use a backend + hashing).
7. Leaderboard data had no loading / error state.

## What I changed (files)
| Topic (rubric) | Change | File |
|---|---|---|
| Navigation layout | React Router: public routes, nested protected routes, dynamic route `/quiz/:skillId`, `*` = 404 | `src/App.jsx`, `src/main.jsx` |
| Protected routes | `ProtectedRoute` uses `<Outlet/>` + `<Navigate/>` | `src/components/common/ProtectedRoute.jsx` |
| Context API | Auth now really works (session = null when logged out) | `src/context/AuthContext.jsx` |
| Form handling | One reusable `LoginForm` (validation, touched, loading, error) used on Landing + Sign-in | `src/components/auth/LoginForm.jsx` |
| Landing + login | Hero + login card + features + steps | `src/pages/LandingPage.jsx`, `landing.css` |
| Dashboard | Welcome banner, 4 stat tiles, skills, quiz, to-do, leaderboard | `src/pages/Dashboard.jsx`, `WelcomeBanner.jsx`, `StatTile.jsx` |
| Async state | Leaderboard uses `useAsyncData` (loading / error / retry) | `UniversityLeaderboard.jsx` |
| Logout | Sidebar logout button → landing page | `Sidebar.jsx` |

There is no demo account any more: create an account on /signup, then log in.

## Easy viva explanation
- `useState` – form fields, touched, loading, error.
- `useContext` – AuthContext (login/logout), StudentContext (XP, streak).
- `useEffect` – inside `useAsyncData` (fetch on mount).
- `Zustand` store – shop cart (global state).
- Custom hooks – `useAuth`, `useProgress`, `useLocalStorage`, `useAsyncData`, `useNavigation`.
- Router flow: Landing (login) → `/dashboard`. Not logged in + visiting `/dashboard` → redirected to `/`.

## Landing page v2 (gamified)
Inspired by gamified coding sites like Codedex (pixel-art RPG world, XP, badges, quests).
- `pages/LandingPage.jsx` - hero + login, quick quest, world map, power-ups.
- `components/landing/TryLesson.jsx` - playable quiz, only `useState`.
- `components/landing/QuestMap.jsx` - worlds from an array + `.map()`.
- `pages/landing.css` - all styles (pixel font, chunky buttons).
- Demo account and the demo button were removed (`LoginForm.jsx`, `AuthContext.jsx`). Dashboard files were not touched.
