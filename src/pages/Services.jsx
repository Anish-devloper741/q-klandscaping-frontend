import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { SERVICE_CARDS } from "../data/serviceCards";
import heroImg from "../assets/projects/swimmingpole/swimmingpolemaing.png";
import Seo from "../components/seo/Seo";

export default function Services() {
  return (
    <>
      <Header />

      <section className="page-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="wrap page-hero-inner">
          <p className="kicker">Our Services</p>
          <h1>
            Complete <span>Landscaping</span> Solutions for Your Space
          </h1>
          <p className="page-hero-text">
            From stunning pools to beautiful gardens, pathways and outdoor living spaces, we
            design and build landscapes that bring your vision to life.
          </p>
        </div>
      </section>

      <section className="wrap block">
        <div className="svc-grid">
          {SERVICE_CARDS.map((s) => (
            <article key={s.title} className="svc-card">
              {s.image ? (
                <img className="svc-img" src={s.image} alt={s.title} />
              ) : (
                <div className="svc-img svc-img-empty" aria-hidden="true" />
              )}
              <div className="svc-icon" aria-hidden="true">{s.icon}</div>
              <div className="svc-body">
                <h2>{s.title}</h2>
                <p>{s.text}</p>
                <ul className="svc-list">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}

          <aside className="svc-card svc-custom">
            <p className="kicker">Need something custom?</p>
            <h2>Let's Build Your Dream Outdoor Space</h2>
            <p>
              We're here to help you design and create the perfect outdoor space for your home
              or business.
            </p>
            <Link className="btn dark" to="/contact">Get a Free Quote</Link>
          </aside>
        </div>
      </section>

      <section className="svc-band">
        <div className="wrap svc-band-inner">
          <div>
            <p className="kicker">Quality Landscaping Services</p>
            <h2>Your Vision, Our Expertise</h2>
            <p>Beautiful landscapes. Lasting impressions.</p>
          </div>
          <Link className="btn outline-light" to="/contact">Get a Free Quote</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}