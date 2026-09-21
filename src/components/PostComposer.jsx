import { useState } from "react";

const MAX_CHARS = 280;

function PostComposer({ currentUser, onNewPost }) {
    const [content, setContent] = useState("");
    const isOver = content.length > MAX_CHARS;

    function handlePost() {
        const trimmed = content.trim();
        if (!trimmed || trimmed.length > MAX_CHARS) return;
        onNewPost(trimmed);
        setContent("");
    }

    return (
        <section className="post-composer">
        <div className="composer-user">
            <div className="avatar">{currentUser.displayName.charAt(0)}</div>
            <span>What's happening?</span>
        </div>

        <textarea
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