import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "./AdminContext";

const linkClass = ({ isActive }) => "adm-link" + (isActive ? " active" : "");

// Sidebar + page area. Anyone not logged in is sent to the login page.
export default function AdminLayout() {
  const { token, email, logout } = useAdmin();

  if (!token) return <Navigate to="/admin/login" replace />;

  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <div className="adm-brand">
          <span className="adm-logo small">Q &amp; K</span>
          <span>Admin</span>
        </div>

        <nav className="adm-nav">
          <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
          <NavLink to="/admin/leads" className={linkClass}>Leads</NavLink>
          <a className="adm-link" href="/" target="_blank" rel="noopener noreferrer">View website ↗</a>
        </nav>

        <div className="adm-side-foot">
          <span className="adm-email" title={email}>{email}</span>
          <button className="adm-btn adm-btn-ghost" onClick={logout}>Log out</button>
        </div>
      </aside>

      <main className="adm-main">
        <Outlet />
      </main>
    </div>
  );
}