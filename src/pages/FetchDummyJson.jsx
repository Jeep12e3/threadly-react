import { useEffect, useState } from "react";
import DummyPostCard from "../components/DummyPostCard";

function FetchDummyJSON() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // buka aja linknya di browser, nanti akan muncul data JSON
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((data) => {
        // nampilin datanya di console (klik F12 / inspect di browser → tab Console)
        console.log("Fetched posts:", data.posts);
        setPosts(data.posts); // simpan data posts ke state
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal mengambil data");
        setLoading(false);
      });
  }, []);

  // muncul kalau data masih diambil dari API
  if (loading) {
    return <div className="container">Loading...</div>;
  }

  // muncul kalau ada error saat fetch
  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <main className="container">
      <section className="feed">
        {/* Data dari DummyJSON strukturnya beda dari data Threadly,
            jadi kita pakai DummyPostCard khusus biar tau fetch-nya berhasil */}
        {posts.map((post) => (
          <DummyPostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}

export default FetchDummyJSON;
