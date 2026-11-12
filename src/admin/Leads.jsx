import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAdmin } from "./AdminContext";
import { STATUSES, STATUS_LABELS, StatusBadge, formatDate, whatsappUrl } from "./shared";

export default function Leads() {
  const { api } = useAdmin();
  const [params] = useSearchParams();
  const startStatus = STATUSES.includes(params.get("status")) ? params.get("status") : "";

  const [status, setStatus] = useState(startStatus);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [reload, setReload] = useState(0);

  // Wait until the admin stops typing before searching
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Load leads whenever the filters or page change
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");

    const qs = new URLSearchParams({ page: String(page), limit: "15" });
    if (status) qs.set("status", status);
    if (search) qs.set("search", search);

    api(`/api/quotes?${qs}`)
      .then((d) => alive && setData(d))
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, [api, status, search, page, reload]);

  async function updateLead(id, changes) {
    try {
      const { quote } = await api(`/api/quotes/${id}`, { method: "PATCH", body: changes });
      setData((d) => ({ ...d, items: d.items.map((q) => (q._id === id ? quote : q)) }));
      setSelected((s) => (s && s._id === id ? quote : s));
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    }
  }

  async function removeLead(id) {
    if (!window.confirm("Delete this lead permanently?")) return;
    try {
      await api(`/api/quotes/${id}`, { method: "DELETE" });
      setSelected(null);
      setReload((r) => r + 1);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Leads</h1>
          <p className="adm-muted">{data.total} {data.total === 1 ? "request" : "requests"}</p>
        </div>
      </header>

      <div className="adm-toolbar">
        <input
          type="search"
          placeholder="Search name, phone, email, location..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>
      </div>

      {error && <p className="adm-error" role="alert">{error}</p>}

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Service</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && data.items.length === 0 && (
              <tr><td colSpan="6" className="adm-empty">Loading...</td></tr>
            )}
            {!loading && data.items.length === 0 && (
              <tr><td colSpan="6" className="adm-empty">No leads found.</td></tr>
            )}
            {data.items.map((q) => (
              <tr key={q._id} className="adm-row" onClick={() => setSelected(q)}>
                <td className="adm-nowrap">{formatDate(q.createdAt)}</td>
                <td>
                  <strong>{q.name}</strong>
                  {q.email && <span className="adm-muted small block">{q.email}</span>}
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <a href={`tel:${q.phone}`}>{q.phone}</a>
                  <a
                    className="adm-wa"
                    href={whatsappUrl(q.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </td>
                <td>{q.service}</td>
                <td>{q.location}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <select
                    className={`adm-status adm-badge-${q.status.toLowerCase()}`}
                    value={q.status}
                    onChange={(e) => updateLead(q._id, { status: e.target.value })}
                    aria-label={`Status for ${q.name}`}
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.pages > 1 && (
        <div className="adm-pager">
          <button className="adm-btn adm-btn-ghost" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            ← Previous
          </button>
          <span>Page {page} of {data.pages}</span>
          <button className="adm-btn adm-btn-ghost" disabled={page >= data.pages} onClick={() => setPage(page + 1)}>
            Next →
          </button>
        </div>
      )}

      {selected && (
        <LeadDrawer
          lead={selected}
          onClose={() => setSelected(null)}
          onUpdate={updateLead}
          onDelete={removeLead}
        />
      )}
    </>
  );
}

// Side panel with the full details of one lead, status and private notes
function LeadDrawer({ lead, onClose, onUpdate, onDelete }) {
  const [notes, setNotes] = useState(lead.notes || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNotes(lead.notes || "");
    setSaved(false);
  }, [lead._id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function saveNotes() {
    setSaving(true);
    const ok = await onUpdate(lead._id, { notes });
    setSaving(false);
    setSaved(ok);
  }

  const greeting = `Hello ${lead.name}, this is Q & K Landscaping about your ${lead.service} request.`;

  return (
    <div className="adm-backdrop" onClick={onClose}>
      <aside className="adm-drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Lead details">
        <div className="adm-drawer-head">
          <div>
            <h2>{lead.name}</h2>
            <span className="adm-muted small">Received {formatDate(lead.createdAt)}</span>
          </div>
          <button className="adm-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="adm-actions">
          <a className="adm-btn adm-btn-primary" href={`tel:${lead.phone}`}>Call</a>
          <a className="adm-btn adm-btn-wa" href={whatsappUrl(lead.phone, greeting)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          {lead.email && <a className="adm-btn adm-btn-ghost" href={`mailto:${lead.email}`}>Email</a>}
        </div>

        <dl className="adm-details">
          <dt>Phone</dt><dd>{lead.phone}</dd>
          {lead.email && (<><dt>Email</dt><dd>{lead.email}</dd></>)}
          <dt>Service</dt><dd>{lead.service}</dd>
          <dt>Location</dt><dd>{lead.location}</dd>
          <dt>Project details</dt>
          <dd className="adm-pre">{lead.details || "No details provided."}</dd>
        </dl>

        <label className="adm-field">
          Status
          <select value={lead.status} onChange={(e) => onUpdate(lead._id, { status: e.target.value })}>
            {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
        </label>

        <label className="adm-field">
          Private notes
          <textarea
            rows="4"
            maxLength={2000}
            placeholder="e.g. Site visit booked Saturday, villa 600 sqm"
            value={notes}
            onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
          />
        </label>
        <div className="adm-actions">
          <button className="adm-btn adm-btn-primary" onClick={saveNotes} disabled={saving}>
            {saving ? "Saving..." : "Save notes"}
          </button>
          {saved && <span className="adm-ok">Saved ✓</span>}
          <span className="adm-spacer" />
          <StatusBadge status={lead.status} />
        </div>

        <button className="adm-btn adm-btn-danger" onClick={() => onDelete(lead._id)}>Delete lead</button>
      </aside>
    </div>
  );
}