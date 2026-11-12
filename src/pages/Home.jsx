import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { SITE } from "../config/site";
import { SERVICES } from "../data/services";
import { PROJECTS } from "../data/projects";
import { STEPS } from "../data/steps";
import { waLink } from "../lib/whatsapp";
import BeforeAfter from "../components/media/BeforeAfter";
import QuoteForm from "../components/conversion/QuoteForm";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import mainImage from "../assets/main.png";
import Seo from "../components/seo/Seo";
export default function Home() {
  return (
    <>
      <Header />
      <section className="why">
  <div className="wrap why-grid">
    <div className="why-panel" aria-hidden="true">
  <img src={mainImage} alt="" className="why-panel-img" />
</div>
    <div className="why-content">
      <p className="eyebrow">Why homeowners choose us</p>
      <h2>Gardens built to survive the summer, not just photograph well in spring.</h2>
      <dl className="why-list">
        <div>
          <dt>Built for this climate</dt>
          <dd>Plant and irrigation choices sized for Dubai heat, not a imported plan that fails by June.</dd>
        </div>
        <div>
          <dt>One crew, start to finish</dt>
          <dd>The same team designs, builds and maintains — nothing lost between contractors.</dd>
        </div>
        <div>
          <dt>Fixed quote before we start</dt>
          <dd>A price after the site visit, in writing, before any work begins.</dd>
        </div>
        <div>
          <dt>Licensed and insured</dt>
          <dd>{SITE.licence}, with coverage on every job we take on.</dd>
        </div>
      </dl>
    </div>
  </div>
</section>
      <section id="services" className="wrap block">
  <h2>What we do</h2>
  <ul className="services">
    {SERVICES.map(([t, d]) => (
      <li key={t}><strong>{t}</strong><span>{d}</span></li>
    ))}
  </ul>
</section>

<section id="projects" className="band">
  <div className="wrap block">
    <h2>Recent projects</h2>
    <div className="projects">
      {PROJECTS.map((p) => (
        <Link key={p.slug} to={`/projects/${p.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
          <article>
            {p.image ? (
              <img src={p.image} alt={p.title} className="ph" />
            ) : (
              <div className="ph" role="img" aria-label={p.title} />
            )}
            <h3>{p.title}</h3>
            <p>{p.area}</p>
            <p className="muted">{p.work}</p>
          </article>
        </Link>
      ))}
    </div>
  </div>
</section>

<section id="process" className="wrap block">
  <h2>How a project works</h2>
  <ol className="steps">
    {STEPS.map(([t, d], i) => (
      <li key={t}><span>{i + 1}</span><div><strong>{t}</strong><p>{d}</p></div></li>
    ))}
  </ol>
</section>

<section id="quote" className="band dark">
  <div className="wrap block split">
    <div>
      <h2>Tell us about your garden</h2>
      <p className="lead">We reply on WhatsApp, usually within a few hours.</p>
    </div>
    <QuoteForm />
  </div>
</section>
      <Footer />
    </>
  );
}