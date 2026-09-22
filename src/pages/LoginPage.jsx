// 🧭 VERSI react-router-dom
// Bedanya: setelah login sukses, pindah ke /home pakai useNavigate (bukan setPage).
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); // fungsi untuk pindah halaman lewat kode

    function handleSubmit(e) {
        e.preventDefault();
        const err = onLogin(username, password);
        if (err) {
            setError(err);
            return;
        }
        navigate("/home"); // login sukses → pindah ke home
    }

    return (
        <main className="login-page">
        <div className="login-card">
            <h1 className="logo">threadly</h1>
            <p>Share your thoughts.</p>

            <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="login-error">{error}</p>}
            <button className="primary-button" type="submit">
                Login
            </button>
            </form>

            <p className="login-hint">Try: calista / 123456</p>
        </div>
        </main>
    );
}

export default LoginPage;
