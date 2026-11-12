import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { PROJECTS } from "../data/projects";
import Seo from "../components/seo/Seo";

export default function Projects() {
  return (
    <>
      <Header />
      <main className="wrap block">
        <h1>Recent projects</h1>
        <p className="lead">A few of the gardens we've designed and built.</p>
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
      </main>
      <Footer />
    </>
  );
}