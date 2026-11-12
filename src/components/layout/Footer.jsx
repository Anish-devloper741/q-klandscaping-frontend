import { Link } from "react-router-dom";
import { SITE } from "../../config/site";
import { waLink } from "../../lib/whatsapp";

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const icons = {
  phone: <Icon><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></Icon>,
  mail: <Icon><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></Icon>,
  pin: <Icon><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Icon>,
  globe: <Icon><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></Icon>,
  whatsapp: <Icon><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l1.9-5.4A8.4 8.4 0 1 1 21 11.5z" /><path d="M9 9c0 3 3 6 6 6l1.5-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2z" /></Icon>,
  instagram: <Icon><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></Icon>,
  facebook: <Icon><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></Icon>,
  chevron: <Icon><path d="m9 6 6 6-6 6" /></Icon>,
};

const QUICK_LINKS = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Contact", "/contact"],
];

const OUR_SERVICES = [
  "Luxury Swimming Pool",
  "Modern Villa Garden Pathway",
  "Modern Villa Garden",
  "Fire Pit & Outdoor Seating",
  "Landscape Lighting",
];

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <p className="footer-kicker">{SITE.name}</p>
            <h2>
              Beautiful Outdoor Spaces for a <span>Better Tomorrow</span>
            </h2>
            <p>
              We design, build and maintain stunning landscapes that bring life to your home
              and business.
            </p>
            <div className="footer-social">
              <a href={waLink("Hi, I'd like to ask about landscaping.")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">{icons.whatsapp}</a>
              {SITE.instagram && <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">{icons.instagram}</a>}
              {SITE.facebook && <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">{icons.facebook}</a>}
            </div>
          </div>

          <nav className="footer-col" aria-label="Quick links">
            <h3>Quick Links</h3>
            <ul>
              {QUICK_LINKS.map(([label, to]) => (
                <li key={label}>
                  <Link to={to}>{icons.chevron}{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h3>Our Services</h3>
            <ul>
              {OUR_SERVICES.map((s) => (
                <li key={s}>
                  <Link to="/services">{icons.chevron}{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <span className="fc-icon">{icons.phone}</span>
                <a href={`tel:${SITE.phone}`}>{SITE.phone}<small>(Call or WhatsApp)</small></a>
              </li>
              <li>
                <span className="fc-icon">{icons.mail}</span>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <span className="fc-icon">{icons.pin}</span>
                <span>Dubai, United Arab Emirates<small>(Serving all UAE areas)</small></span>
              </li>
              {SITE.website && (
                <li>
                  <span className="fc-icon">{icons.globe}</span>
                  <a href={`https://${SITE.website}`} target="_blank" rel="noopener noreferrer">{SITE.website}</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="wrap footer-bottom">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="footer-tagline">Beautiful Spaces <span>|</span> Better Living</p>
        </div>
      </footer>

      <a
        className="wa"
        href={waLink("Hi, I'd like to ask about landscaping.")}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp us
      </a>
    </>
  );
}