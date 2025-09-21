// src/pages/EditPost.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((r) => {
        setTitle(r.data.title || "");
        setContent(r.data.content || "");
        setExistingImage(r.data.imageUrl || null);
      })
      .catch((err) => console.error(err));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const res = await API.put(`/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/posts/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  }

  return (
    <div className="card">
      <h2>Edit Post</h2>
      <form
        onSubmit={handleSubmit}
        style={{ marginTop: 12, display: "grid", gap: 12 }}
      >
        <div>
          <label>Title</label>
          <br />
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
          />
        </div>
        <div>
          <label>Existing Image</label>
          <br />
          {existingImage ? (
            <img
              src={existingImage}
              alt="existing"
              style={{
                width: "100%",
                maxHeight: 260,
                objectFit: "cover",
                borderRadius: 8,
                marginTop: 8,
              }}
            />
          ) : (
            <p className="muted">No image</p>
          )}
        </div>
        <div>
          <label>Replace Image (optional)</label>
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
