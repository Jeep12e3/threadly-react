// ✅ KUNCI JAWABAN (SOLUTION) — App.jsx
// File ini BUKAN dipakai oleh aplikasi. Ini hanya referensi buat mentor / cek jawaban.
// Beda dengan versi awal: ditambah 1 useEffect untuk update document.title.

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { users } from "./data/user";
import { posts as initialPosts } from "./data/posts";

function App() {
  const [page, setPage] = useState("login"); // "login" | "home" | "profile"
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState(initialPosts);
  const [reactions, setReactions] = useState({});

  // 🎯 useEffect: tiap kali jumlah "posts" berubah, judul tab browser ikut update.
  // Coba tambah post baru → lihat teks di tab browser berubah otomatis.
  useEffect(() => {
    document.title = `Threadly (${posts.length})`;
  }, [posts]); // dependency array: efek jalan lagi hanya kalau "posts" berubah

  function handleLogin(username, password) {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) return "Username atau password salah";
    setCurrentUser(found);
    setPage("home");
    return null;
  }

  function handleLogout() {
    setCurrentUser(null);
    setPage("login");
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

  if (page === "login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      <Navbar page={page} onNavigate={setPage} onLogout={handleLogout} />

      {page === "home" && (
        <HomePage
          posts={posts}
          users={users}
          currentUser={currentUser}
          reactions={reactions}
          onLike={handleLike}
          onDislike={handleDislike}
          onNewPost={handleNewPost}
        />
      )}

      {page === "profile" && (
        <ProfilePage
          posts={posts}
          currentUser={currentUser}
          reactions={reactions}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      )}
    </>
  );
}

export default App;
