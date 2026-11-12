import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "./AdminContext";

export default function AdminLogin() {
  const { token, login } = useAdmin();
  const [form, setForm] = useState({ email: "", password: "" });
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
        <label>
          Password
          <input type="password" required autoComplete="current-password" value={form.password} onChange={set("password")} />
        </label>

        {error && <p className="adm-error" role="alert">{error}</p>}

        <button className="adm-btn adm-btn-primary" disabled={busy}>
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}