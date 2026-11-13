import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import "./admin.css";

// Backend address (set VITE_API_URL in the frontend .env file)
const API_URL = import.meta.env.VITE_API_URL || "https://q-klandscaping-backend.vercel.app/";
const TOKEN_KEY = "qk_admin_token";
const EMAIL_KEY = "qk_admin_email";

const AdminContext = createContext(null);

const read = (k) => {
  try { return localStorage.getItem(k); } catch { return null; }
};
const write = (k, v) => {
  try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch { /* ignore */ }
};

// Wraps every /admin page: holds the login token and the helper that talks to the backend
export function AdminShell() {
  const [token, setToken] = useState(() => read(TOKEN_KEY));
  const [email, setEmail] = useState(() => read(EMAIL_KEY) || "");

  // Keep the admin area out of Google
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const logout = useCallback(() => {
    write(TOKEN_KEY, null);
    write(EMAIL_KEY, null);
    setToken(null);
    setEmail("");
  }, []);

  // api("/api/quotes") -> parsed JSON. Sends the token and logs out if it has expired.
  const api = useCallback(
    async (path, { method = "GET", body } = {}) => {
      const res = await fetch(`${API_URL}${path}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401 && token) logout();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      return data;
    },
    [token, logout]
  );

  const login = useCallback(
    async (emailInput, password) => {
      const data = await api("/api/auth/login", {
        method: "POST",
        body: { email: emailInput, password },
      });
      write(TOKEN_KEY, data.token);
      write(EMAIL_KEY, data.admin.email);
      setToken(data.token);
      setEmail(data.admin.email);
    },
    [api]
  );

  const value = useMemo(() => ({ token, email, api, login, logout }), [token, email, api, login, logout]);

  return (
    <AdminContext.Provider value={value}>
      <div className="adm">
        <Outlet />
      </div>
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);