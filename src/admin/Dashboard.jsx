import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "./AdminContext";
import { StatusBadge, formatDate } from "./shared";

export default function Dashboard() {
  const { api } = useAdmin();
  const [stats, setStats] = useState(null);
  const [latest, setLatest] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    Promise.all([api("/api/quotes/stats"), api("/api/quotes?limit=5")])
      .then(([s, l]) => {
        if (!alive) return;
        setStats(s);
        setLatest(l.items);
      })
      .catch((e) => alive && setError(e.message));
    return () => { alive = false; };
  }, [api]);

  if (error) return <p className="adm-error">{error}</p>;
  if (!stats) return <p className="adm-muted">Loading dashboard...</p>;

  const by = stats.byStatus || {};
  const newCount = by.NEW || 0;
  const won = by.WON || 0;
  const conversion = stats.total ? Math.round((won / stats.total) * 100) : 0;
  const services = stats.byService || [];
  const maxService = services[0]?.count || 1;

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Dashboard</h1>
          <p className="adm-muted">How your website enquiries are doing.</p>
        </div>
        <Link className="adm-btn adm-btn-primary" to="/admin/leads">View all leads</Link>
      </header>

      <section className="adm-cards">
        <Link to="/admin/leads?status=NEW" className="adm-card adm-card-hot">
          <span className="adm-card-label">New leads</span>
          <strong>{newCount}</strong>
          <small>{newCount ? "Waiting for your call" : "All caught up"}</small>
        </Link>
        <div className="adm-card">
          <span className="adm-card-label">Total leads</span>
          <strong>{stats.total}</strong>
          <small>All time</small>
        </div>
        <div className="adm-card">
          <span className="adm-card-label">Last 7 days</span>
          <strong>{stats.last7Days}</strong>
          <small>New enquiries</small>
        </div>
        <div className="adm-card">
          <span className="adm-card-label">Won jobs</span>
          <strong>{won}</strong>
          <small>{conversion}% of all leads</small>
        </div>
      </section>

      <div className="adm-grid">
        <section className="adm-panel">
          <h2>Leads by service</h2>
          {services.length === 0 ? (
            <p className="adm-muted">No data yet.</p>
          ) : (
            <ul className="adm-bars">
              {services.map((s) => (
                <li key={s.service}>
                  <div className="adm-bar-top">
                    <span>{s.service}</span>
                    <b>{s.count}</b>
                  </div>
                  <div className="adm-bar"><i style={{ width: `${(s.count / maxService) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="adm-panel">
          <div className="adm-panel-head">
            <h2>Latest leads</h2>
            <Link to="/admin/leads">See all</Link>
          </div>
          {latest.length === 0 ? (
            <p className="adm-muted">
              No leads yet. When someone submits the Contact form, it will appear here.
            </p>
          ) : (
            <ul className="adm-latest">
              {latest.map((q) => (
                <li key={q._id}>
                  <div>
                    <strong>{q.name}</strong>
                    <span className="adm-muted">{q.service} · {q.location}</span>
                    <span className="adm-muted small">{formatDate(q.createdAt)}</span>
                  </div>
                  <StatusBadge status={q.status} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}