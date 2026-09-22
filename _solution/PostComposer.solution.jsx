// ✅ KUNCI JAWABAN (SOLUTION) — PostComposer.jsx
// Beda dengan versi awal:
//   1. useRef  → auto-focus textarea saat komponen muncul
//   2. useEffect → simpan draft ke localStorage biar ga hilang saat refresh

import { useState, useEffect, useRef } from "react";

const MAX_CHARS = 280;
const DRAFT_KEY = "threadly-draft";

function PostComposer({ currentUser, onNewPost }) {
  // 🎯 useState: baca draft lama dari localStorage sebagai nilai awal (lazy initializer)
  const [content, setContent] = useState(() => {
    return localStorage.getItem(DRAFT_KEY) || "";
  });

  // 🎯 useRef: "pointer" ke elemen textarea di DOM. Awalnya null.
  const textareaRef = useRef(null);

  const isOver = content.length > MAX_CHARS;

  // 🎯 useEffect (auto-focus): dijalankan SEKALI setelah render pertama ([] kosong)
  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  // 🎯 useEffect (simpan draft): tiap "content" berubah, simpan ke localStorage
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, content);
  }, [content]);

  function handlePost() {
    const trimmed = content.trim();
    if (!trimmed || trimmed.length > MAX_CHARS) return;
    onNewPost(trimmed);
    setContent("");
    localStorage.removeItem(DRAFT_KEY); // draft udah jadi post → hapus
  }

  return (
    <section className="post-composer">
      <div className="composer-user">
        <div className="avatar">{currentUser.displayName.charAt(0)}</div>
        <span>What's happening?</span>
      </div>

      <textarea
        ref={textareaRef}
        placeholder="Share your thoughts..."
        rows="3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="composer-footer">
        <span className={`character-count ${isOver ? "over-limit" : ""}`}>
          {content.length} / {MAX_CHARS}
        </span>

        <button
          className="primary-button"
          onClick={handlePost}
          disabled={!content.trim() || isOver}
        >
          Post
        </button>
      </div>
    </section>
  );
}

export default PostComposer;
