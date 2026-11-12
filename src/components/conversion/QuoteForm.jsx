import { useState } from "react";
import { SERVICES } from "../../data/services";
import { waLink } from "../../lib/whatsapp";

export default function QuoteForm() {
  const [f, setF] = useState({ name: "", area: "", service: SERVICES[0][0], note: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = (e) => {
    e.preventDefault();
    const msg = `Hi, I'd like a quote.\nName: ${f.name}\nCommunity: ${f.area}\nService: ${f.service}\n${f.note}`;
    window.open(waLink(msg), "_blank", "noopener");
  };
  return (
    <form className="quote" onSubmit={send}>
      <label>Your name<input required value={f.name} onChange={set("name")} /></label>
      <label>Community<input required placeholder="e.g. Dubai Hills" value={f.area} onChange={set("area")} /></label>
      <label>Service
        <select value={f.service} onChange={set("service")}>
          {SERVICES.map(([s]) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label>Tell us about the space<textarea rows="3" value={f.note} onChange={set("note")} /></label>
      <button className="btn">Send on WhatsApp</button>
    </form>
  );
}