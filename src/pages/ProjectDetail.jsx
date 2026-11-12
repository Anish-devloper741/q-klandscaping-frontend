import { useParams, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { PROJECTS } from "../data/projects";
import { waLink } from "../lib/whatsapp";
import Seo from "../components/seo/Seo";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <>
        <Header />
        <main className="wrap block">
          <h1>Project not found</h1>
          <p><Link to="/projects">Back to all projects</Link></p>
        </main>
        <Footer />
      </>
    );
  }

  const tags = project.work.split(/[•·,]/).map((t) => t.trim()).filter(Boolean);

  return (
    <>
      <Header />

      <section className="project-hero">
        <div className="project-info">
          <h1>{project.title}</h1>
          <p className="project-area">📍 {project.area}</p>
          <p className="project-story">{project.description}</p>
          <ul className="project-tags">
            {tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="project-image">
          {project.image && <img src={project.image} alt={project.title} />}
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="wrap block">
          <h2>Project Gallery</h2>
          <p className="lead">
            {project.galleryIntro || "Explore this project from different views."}
          </p>

          {project.gallery[0].group ? (
            // Grouped gallery (e.g. Day Views / Night Views)
            project.gallery.map((grp) => (
              <div key={grp.group} className="gallery-group">
                <h3 className="gallery-group-title">{grp.group}</h3>
                <div className="gallery-grid">
                  {grp.items.map((item, i) => (
                    <figure key={i}>
                      <img src={item.src} alt={item.caption || project.title} />
                      {item.caption && <figcaption>{item.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Flat gallery (no groups)
            <div className="gallery-grid">
              {project.gallery.map((item, i) => (
                <figure key={i}>
                  <img src={item.src} alt={item.caption || project.title} />
                  {item.caption && <figcaption>{item.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="project-cta">
        <div className="wrap project-cta-inner">
          <div>
            <strong>{project.title}</strong>
            <p className="muted">{project.area}</p>
          </div>
          <a
            className="btn"
            href={waLink(`Hi, I'd like to ask about a project like "${project.title}".`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get in Touch
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}