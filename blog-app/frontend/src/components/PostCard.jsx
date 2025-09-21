import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <article className="card">
      <div className="card-header">
        <h3 className="card-title">{post.title || "Untitled"}</h3>
        <div className="card-meta">
          {new Date(post.createdAt).toLocaleString()}
        </div>
      </div>

      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}

      <p className="muted">
        {post.content?.length > 200
          ? post.content.slice(0, 200) + "..."
          : post.content}
      </p>

      <div style={{ marginTop: 12 }}>
        <Link to={`/posts/${post._id}`} className="btn">
          View
        </Link>
      </div>
    </article>
  );
}
