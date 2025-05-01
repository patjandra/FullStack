import { NavLink, Link } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">Weatherly</Link>
      </div>
      <div className="navbar-right">
        <NavLink to="/location" className={({ isActive }) => isActive ? "active" : undefined}>Location</NavLink>
        <NavLink to="/saved" className={({ isActive }) => isActive ? "active" : undefined}>Saved</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : undefined}>About</NavLink>
      </div>
    </nav>
  );
} 