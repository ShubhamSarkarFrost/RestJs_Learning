import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostView from "./pages/PostView";
import EditPost from "./pages/EditPost";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">Minimal Blog</h1>
          <nav className="row">
            <Link to="/" className="btn ghost">
              Home
            </Link>
            <Link to="/create" className="btn">
              Create
            </Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
