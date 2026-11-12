// Small helpers used by the dashboard and the leads page

export const STATUSES = ["NEW", "CONTACTED", "QUOTED", "WON", "LOST"];

export const STATUS_LABELS = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUOTED: "Quoted",
  WON: "Won",
  LOST: "Lost",
};

export function StatusBadge({ status }) {
  return (
    <span className={`adm-badge adm-badge-${String(status || "NEW").toLowerCase()}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}

export function formatDate(d) {
  return new Date(d).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// UAE-friendly WhatsApp link: 0501234567 and +971 50 123 4567 both work
export function whatsappUrl(phone, text = "") {
  let d = String(phone || "").replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  else if (d.startsWith("0")) d = "971" + d.slice(1);
  else if (d.length === 9 && d.startsWith("5")) d = "971" + d;
  return `https://wa.me/${d}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}