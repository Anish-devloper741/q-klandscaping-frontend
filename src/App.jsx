import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import "./pages-new.css";
import "./footer.css";
import { AdminShell } from "./admin/AdminContext";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Leads from "./admin/Leads";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminShell />}>
  <Route path="login" element={<AdminLogin />} />
  <Route element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="leads" element={<Leads />} />
  </Route>
  </Route>
      </Routes>
    </BrowserRouter>
  );
}
