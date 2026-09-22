// 🧭 VERSI react-router-dom
// Bedanya dengan versi utama (branch main):
//   - Navigasi TIDAK pakai useState "page" lagi.
//   - Halaman ditentukan oleh URL (/login, /home, /profile) lewat <Routes>.
//   - State auth & posts tetap di App (biar dibagikan ke semua halaman).

import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { users } from "./data/user";
import { posts as initialPosts } from "./data/posts";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState(initialPosts);
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    document.title = `Threadly (${posts.length})`;
  }, [posts]);

  function handleLogin(username, password) {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) return "Username atau password salah";
    setCurrentUser(found);
    return null;
  }

  function handleLogout() {
    setCurrentUser(null);
  }

  function handleLike(postId) {
    const current = reactions[postId];

    setPosts((posts) =>
      posts.map((p) => {
        if (p.id !== postId) return p;
        if (current === "like") return { ...p, likes: p.likes - 1 };
        if (current === "dislike")
          return { ...p, likes: p.likes + 1, dislikes: p.dislikes - 1 };
        return { ...p, likes: p.likes + 1 };
      })
    );

    setReactions((prev) => ({
      ...prev,
      [postId]: current === "like" ? null : "like",
    }));
  }

  function handleDislike(postId) {
    const current = reactions[postId];

    setPosts((posts) =>
      posts.map((p) => {
        if (p.id !== postId) return p;
        if (current === "dislike") return { ...p, dislikes: p.dislikes - 1 };
        if (current === "like")
          return { ...p, dislikes: p.dislikes + 1, likes: p.likes - 1 };
        return { ...p, dislikes: p.dislikes + 1 };
      })
    );

    setReactions((prev) => ({
      ...prev,
      [postId]: current === "dislike" ? null : "dislike",
    }));
  }

  function handleNewPost(content) {
    const newPost = {
      id: Date.now(),
      userId: currentUser.id,
      content,
      likes: 0,
      dislikes: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
  }

  // Belum login → apa pun URL-nya, tampilkan halaman login.
  if (!currentUser) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        {/* URL lain diarahkan ke /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Sudah login → tampilkan Navbar + halaman sesuai URL.
  return (
    <>
      <Navbar onLogout={handleLogout} />

      <Routes>
        <Route
          path="/home"
          element={
            <HomePage
              posts={posts}
              users={users}
              currentUser={currentUser}
              reactions={reactions}
              onLike={handleLike}
              onDislike={handleDislike}
              onNewPost={handleNewPost}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              posts={posts}
              currentUser={currentUser}
              reactions={reactions}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          }
        />
        {/* default: arahkan ke /home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
