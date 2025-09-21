import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const res = await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/posts/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card">
      <h2>Create Post</h2>
      <form
        onSubmit={handleSubmit}
        style={{ marginTop: 12, display: "grid", gap: 12 }}
      >
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Short title (optional)"
          />
        </div>

        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
          />
        </div>

        <div>
          <label>Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
