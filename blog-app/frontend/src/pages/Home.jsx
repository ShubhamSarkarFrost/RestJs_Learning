import React, { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      const res = await API.get("/posts");
      setPosts(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section>
        <h2 style={{ marginTop: 0 }}>Posts</h2>
        {loading && <p className="muted">Loading posts...</p>}
        {!loading && posts.length === 0 && (
          <p className="muted">No posts yet. Click Create to add one.</p>
        )}

        <div>
          {posts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
