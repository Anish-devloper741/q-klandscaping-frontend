import { NavLink, Link } from "react-router-dom";
import { SITE } from "../../config/site";
import logo from "../../assets/logo.png";

export default function Header() {
  return (
    <header className="top">
      <Link to="/" className="logo">
        <img
          src={logo}
          alt={SITE.name}
          style={{ height: "32px", width: "32px", objectFit: "contain" }}
        />
        {SITE.name}
      </Link>
      <nav>
        <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Services
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Projects
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Contact
        </NavLink>
        <Link className="btn small" to="/contact">Get a free quote</Link>
      </nav>
    </header>
  );
}