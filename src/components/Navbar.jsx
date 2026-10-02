// Navigasi pakai react-router-dom.
// NavLink = seperti Link, tapi otomatis kasih class "active" kalau URL-nya cocok.
import { NavLink } from "react-router-dom";

function Navbar({ onLogout }) {
    return (
        <nav className="navbar">
        <div className="navbar-content">
            <h1 className="logo">threadly</h1>

            <div className="nav-links">
            <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                Home
            </NavLink>

            <NavLink
                to="/fetch"
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                Fetch
            </NavLink>

            <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                Profile
            </NavLink>

            {/* Logout: reset user lalu arahkan ke /login */}
            <NavLink to="/login" onClick={onLogout}>
                Logout
            </NavLink>
            </div>
        </div>
        </nav>
    );
}

export default Navbar;
