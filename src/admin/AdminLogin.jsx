import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "./AdminContext";

export default function AdminLogin() {
  const { token, login } = useAdmin();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Already logged in: go straight to the dashboard
  if (token) return <Navigate to="/admin" replace />;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <div className="adm-login-page">
      <form className="adm-login" onSubmit={submit}>
        <div className="adm-logo">Q &amp; K</div>
        <h1>Admin Login</h1>
        <p className="adm-muted">Sign in to manage your leads.</p>

        <label>
          Email
          <input type="email" required autoComplete="username" value={form.email} onChange={set("email")} />
        </label>

        <div>
          <label htmlFor="adm-password">Password</label>
          <div className="adm-pass">
            <input
              id="adm-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={form.password}
              onChange={set("password")}
            />
            <button
              type="button"
              className="adm-eye"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              title={showPassword ? "Hide password" : "Show password"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {error && <p className="adm-error" role="alert">{error}</p>}

        <button className="adm-btn adm-btn-primary" disabled={busy}>
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}