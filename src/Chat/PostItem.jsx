import React, { useState } from "react";
import "./chat.css";

const PostItem = ({ post }) => {
  const [zoomed, setZoomed] = useState(false);

  const toggleZoom = () => setZoomed(!zoomed);

  return (
    <div className="post-item">
      {post.image && (
        <div className="post-image-container">
          <img
            src={post.image}
            alt="post"
            className={`post-image ${zoomed ? "zoomed" : ""}`}
            onClick={toggleZoom}
          />
        </div>
      )}

      {post.text && <p className="post-text">{post.text}</p>}
    </div>
  );
};

export default PostItem;
