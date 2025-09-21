import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((r) => setPost(r.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!window.confirm("Delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  if (loading) return <p className="muted">Loading post...</p>;
  if (!post) return <p className="muted">Post not found.</p>;

  return (
    <article className="card post-view">
      <div className="card-header">
        <h2 className="card-title">{post.title || "Untitled"}</h2>
        <div className="card-meta">
          {new Date(post.createdAt).toLocaleString()}
        </div>
      </div>

      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}

      <div className="post-content" style={{ marginTop: 12 }}>
        {post.content}
      </div>

      <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
        <Link to={`/edit/${post._id}`} className="btn">
          Edit
        </Link>
        <button onClick={handleDelete} className="btn ghost">
          Delete
        </button>
      </div>
    </article>
  );
}
