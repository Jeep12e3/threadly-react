import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import FetchDummyJSON from "./pages/FetchDummyJson";
import { users } from "./data/user";
import { posts as initialPosts } from "./data/posts";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState(initialPosts);
  const [reactions, setReactions] = useState({});

  // useEffect:
  // Mengubah judul tab browser sesuai jumlah post.
  // Misalnya jumlah post = 4 → "Threadly (4)"
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

        if (current === "like") {
          // udah like → batal like
          return {
            ...p,
            likes: p.likes - 1,
          };
        }

        if (current === "dislike") {
          // dari dislike → pindah ke like
          return {
            ...p,
            likes: p.likes + 1,
            dislikes: p.dislikes - 1,
          };
        }

        // belum react
        return {
          ...p,
          likes: p.likes + 1,
        };
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

        if (current === "dislike") {
          // udah dislike → batal
          return {
            ...p,
            dislikes: p.dislikes - 1,
          };
        }

        if (current === "like") {
          // dari like → pindah ke dislike
          return {
            ...p,
            dislikes: p.dislikes + 1,
            likes: p.likes - 1,
          };
        }

        // belum react
        return {
          ...p,
          dislikes: p.dislikes + 1,
        };
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

  return (
    <>
      {/* Navbar cuma muncul kalau sudah login */}
      {currentUser && <Navbar onLogout={handleLogout} />}

      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* Route yang butuh login: kalau belum login → dilempar ke /login */}
        <Route
          path="/home"
          element={
            currentUser ? (
              <HomePage
                posts={posts}
                users={users}
                currentUser={currentUser}
                reactions={reactions}
                onLike={handleLike}
                onDislike={handleDislike}
                onNewPost={handleNewPost}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            currentUser ? (
              <ProfilePage
                posts={posts}
                currentUser={currentUser}
                reactions={reactions}
                onLike={handleLike}
                onDislike={handleDislike}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/fetch"
          element={currentUser ? <FetchDummyJSON /> : <Navigate to="/login" />}
        />

        {/* URL lain (termasuk "/") → arahkan ke /home kalau login, atau /login kalau belum */}
        <Route
          path="*"
          element={<Navigate to={currentUser ? "/home" : "/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
