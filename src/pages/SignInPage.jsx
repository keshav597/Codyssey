import LoginForm from '../components/auth/LoginForm';
import './landing.css';

// Plain sign-in page, same form and same look as the landing page
export default function SignInPage() {
  return (
    <div className="lp lp-center">
      <div className="lp-login">
        <h2>PLAYER LOGIN</h2>
        <p>Welcome back! Your quest is waiting.</p>
        <LoginForm />
      </div>
    </div>
  );
}
