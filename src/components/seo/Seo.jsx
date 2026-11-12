import { useEffect } from "react";
import { SITE } from "../../config/site";

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function Seo({ title, description, path = "/", image }) {
  useEffect(() => {
    const url = `${SITE.url}${path}`;
    const img = image ? (image.startsWith("http") ? image : `${SITE.url}${image}`) : null;

    document.title = title;
    setMeta("name", "description", description);

    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE.name);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    if (img) setMeta("property", "og:image", img);

    setMeta("name", "twitter:card", img ? "summary_large_image" : "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    if (img) setMeta("name", "twitter:image", img);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, path, image]);

  return null;
}
