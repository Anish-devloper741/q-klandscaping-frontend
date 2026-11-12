import { useEffect, useRef, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { waLink } from "../lib/whatsapp";
import heroImg from "../assets/projects/ModernVillaGarden/ModernVillaGarden.png";
import Seo from "../components/seo/Seo";

// Backend address (set VITE_API_URL in the frontend .env file)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SERVICE_OPTIONS = [
  "Luxury Swimming Pool",
  "Modern Villa Garden Pathway",
  "Modern Villa Garden",
  "Fire Pit & Outdoor Seating",
  "Landscape Lighting",
  "Other Landscaping Work",
];

const WHY = [
  ["🌿", "Custom Design", "Solutions designed around your space, style and budget."],
  ["🛡️", "Quality Workmanship", "We use the best materials and skilled professionals for lasting results."],
  ["⏱️", "On-Time Delivery", "We respect your time and complete projects as planned."],
];

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  service: "",
  location: "",
  details: "",
  website: "", // hidden spam trap: real visitors never fill this
};

export default function Contact() {
  const [f, setF] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(null); // summary shown on the thank-you card
  const successRef = useRef(null);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  // Bring the thank-you card into view after a successful submit
  useEffect(() => {
    if (status === "sent") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.errors?.[0]?.message || data.message || "Could not send");

      setSubmitted({
        name: f.name,
        phone: f.phone,
        service: f.service,
        location: f.location,
        ref: data.id ? String(data.id).slice(-6).toUpperCase() : "",
      });
      setF(EMPTY_FORM);
      setStatus("sent");
    } catch (err) {
      setError(err.message || "Could not send your request. Please try again.");
      setStatus("error");
    }
  };

  const sendAnother = () => {
    setSubmitted(null);
    setStatus("idle");
  };

  const firstName = submitted?.name?.trim().split(" ")[0] || "";

  return (
    <>
      <Header />

      <section className="page-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="wrap page-hero-inner">
          <p className="kicker">Q &amp; K Landscaping</p>
          <h1>
            Let's Create Your <span>Dream Outdoor Space</span>
          </h1>
          <p className="page-hero-text">
            Tell us about your project. Our team will get in touch to discuss your requirements
            and provide a free quote.
          </p>
          <ul className="hero-points">
            <li>No-obligation consultation</li>
            <li>Tailored outdoor solutions</li>
            <li>Professional &amp; reliable team</li>
          </ul>
        </div>
      </section>

      <section className="wrap block quote-page">
        <div className="quote-intro">
          <p className="kicker dark-text">Your vision • Our expertise</p>
          <h2>Beautiful Spaces Start with a Conversation</h2>
          <p className="muted">
            Whether you want a luxury swimming pool, a garden pathway, a green landscape or
            outdoor seating — we're here to help. Fill out the form and we'll get back to you
            as soon as possible.
          </p>
          <ul className="why-points">
            {WHY.map(([icon, t, d]) => (
              <li key={t}>
                <span className="why-icon" aria-hidden="true">{icon}</span>
                <div>
                  <strong>{t}</strong>
                  <p className="muted">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {status === "sent" && submitted ? (
          <div className="qsuccess" ref={successRef} role="status" aria-live="polite">
            <div className="qs-icon" aria-hidden="true">
              <svg viewBox="0 0 52 52">
                <circle className="qs-circle" cx="26" cy="26" r="24" />
                <path className="qs-check" d="M15 27l8 8 14-16" />
              </svg>
            </div>

            <h2>Thank you{firstName ? `, ${firstName}` : ""}!</h2>
            <p className="qs-lead">
              Your quote request has been received. Our team will contact you shortly to discuss
              your project.
            </p>

            <ul className="qs-summary">
              <li><span>Service</span><strong>{submitted.service}</strong></li>
              <li><span>Location</span><strong>{submitted.location}</strong></li>
              <li><span>Phone</span><strong>{submitted.phone}</strong></li>
              {submitted.ref && <li><span>Reference</span><strong>#{submitted.ref}</strong></li>}
            </ul>

            <h3>What happens next</h3>
            <ol className="qs-steps">
              <li><b>1</b><span>We review your request and project details.</span></li>
              <li><b>2</b><span>We call or message you within 1–2 business days.</span></li>
              <li><b>3</b><span>We arrange your free consultation and quote.</span></li>
            </ol>

            <div className="qs-actions">
              <a
                className="btn dark"
                href={waLink(
                  `Hi, I just sent a quote request for ${submitted.service}${submitted.ref ? ` (Ref #${submitted.ref})` : ""}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
              <button type="button" className="btn qs-secondary" onClick={sendAnother}>
                Send another request
              </button>
            </div>
          </div>
        ) : (
          <form className="qform" onSubmit={submit}>
            <h2>Request Your Free Quote</h2>
            <p className="muted">Fill in the form below and we'll contact you.</p>

            <div className="qf-row">
              <label>
                Full Name <b>*</b>
                <input required placeholder="Enter your full name" value={f.name} onChange={set("name")} />
              </label>
              <label>
                Phone Number <b>*</b>
                <input required type="tel" placeholder="+971 5X XXX XXXX" value={f.phone} onChange={set("phone")} />
              </label>
            </div>

            <label>
              Email Address
              <input type="email" placeholder="you@example.com" value={f.email} onChange={set("email")} />
            </label>

            <fieldset>
              <legend>Which service do you need? <b>*</b></legend>
              <div className="radio-grid">
                {SERVICE_OPTIONS.map((o) => (
                  <label key={o} className="radio">
                    <input type="radio" name="service" required value={o}
                      checked={f.service === o} onChange={set("service")} />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>

            <label>
              Project Location in the UAE <b>*</b>
              <input required placeholder="e.g. Dubai, Arabian Ranches" value={f.location} onChange={set("location")} />
            </label>

            <label>
              Tell us about your project
              <textarea rows="3" placeholder="Describe the work you need. You can also mention measurements or preferred materials."
                value={f.details} onChange={set("details")} />
            </label>

            {/* Hidden spam trap. Keep it off-screen; do not remove. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={f.website}
              onChange={set("website")}
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />

            <button className="btn dark qf-submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Request My Free Quote"}
            </button>

            {status === "error" && <p className="qf-note qf-error" role="alert">{error}</p>}
            {status !== "error" && (
              <p className="qf-note muted">We'll get back to you within 1–2 business days.</p>
            )}
          </form>
        )}
      </section>

      <Footer />
    </>
  );
}