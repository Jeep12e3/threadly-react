import PostCard from "../components/PostCard";

function ProfilePage({ posts, currentUser, onLike, onDislike }) {
    const userPosts = posts.filter((p) => p.userId === currentUser.id);

    return (
        <main className="container">
        <section className="profile-header">
            <div className="profile-avatar">
            {currentUser.displayName.charAt(0)}
            </div>
            <h2>{currentUser.displayName}</h2>
            <p>@{currentUser.username}</p>
        </section>

        <section className="feed">
            {userPosts.length === 0 && (
            <p className="empty-feed">Belum ada post.</p>
            )}
            {userPosts.map((post) => (
            <PostCard
                key={post.id}
                post={post}
                user={currentUser}
                onLike={onLike}
                onDislike={onDislike}
            />
            ))}
        </section>
        </main>
    );
}

export default ProfilePage;