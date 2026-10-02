import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // useRef:
  // Membuat "pointer" ke input username
  const usernameRef = useRef(null);

  // useNavigate: buat pindah halaman lewat kode (setelah login sukses)
  const navigate = useNavigate();

  // useEffect:
  // Begitu halaman login muncul, langsung fokus ke input username
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const err = onLogin(username, password);

    if (err) {
      setError(err);
    } else {
      // Login sukses → pindah ke /home
      navigate("/home");
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <h1 className="logo">threadly</h1>

        <p>Share your thoughts.</p>

        <form onSubmit={handleSubmit}>
          <input
            ref={usernameRef}
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
