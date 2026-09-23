// 🧭 VERSI react-router-dom
// Pakai <NavLink> untuk pindah halaman lewat URL.
// NavLink otomatis kasih class "active" kalau URL-nya lagi cocok → ga perlu cek manual.
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
                to="/profile"
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                Profile
            </NavLink>
            <button onClick={onLogout}>Logout</button>
            </div>
        </div>
        </nav>
    );
}

export default Navbar;
