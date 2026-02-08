import { useEffect, useState } from "react";
import { MoreVertical, X } from "lucide-react";
import { deletePost, updatePost } from "../api/post.api";
import toast from "react-hot-toast";

const PostCard = ({ post, currentUserId }) => {
  const postUserId =
    typeof post.user === "string" ? post.user : post.user?._id;
  const isOwner = postUserId === currentUserId;

  const [editing, setEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [text, setText] = useState(post.text || "");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);

  useEffect(() => {
    setText(post.text || "");
  }, [post.text]);

  const handleDelete = async () => {
    try {
      const confirmDelete = await new Promise((resolve) => {
        toast(
          (t) => (
            <div>
              <p>Delete this post?</p>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <button
                  onClick={() => {
                    resolve(true);
                    toast.dismiss(t.id);
                  }}
                  style={dangerBtn}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    resolve(false);
                    toast.dismiss(t.id);
                  }}
                  style={grayBtn}
                >
                  No
                </button>
              </div>
            </div>
          ),
          { duration: Infinity }
        );
      });

      if (!confirmDelete) return;

      await deletePost(post._id);
      toast.success("Post deleted");
      setMenuOpen(false);
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const handleUpdate = async () => {
    if (!text.trim()) {
      toast.error("Post cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await updatePost(post._id, { text });
      toast.success("Post updated");
      setEditing(false);
    } catch {
      toast.error("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div style={overlay}>
          <X onClick={() => setPreviewImage(false)} style={closeIcon} />
          <img src={post.image} alt="preview" style={previewImg} />
        </div>
      )}

      <div style={card}>
        {/* HEADER */}
        <div style={header}>
          <div>
            <strong>{post.user?.name || "User"}</strong>
            <p style={email}>{post.user?.email}</p>
          </div>

          {isOwner && !editing && (
            <div style={{ position: "relative" }}>
              <MoreVertical
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => setMenuOpen((p) => !p)}
              />

              {menuOpen && (
                <div style={menu}>
                  <button
                    onClick={() => {
                      setEditing(true);
                      setMenuOpen(false);
                    }}
                    style={menuBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    style={{ ...menuBtn, color: "red" }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* IMAGE */}
        {post.image && (
          <img
            src={post.image}
            alt="post"
            style={postImage}
            onClick={() => setPreviewImage(true)}
          />
        )}

        {/* TEXT */}
        {editing ? (
          <>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              style={textarea}
            />
            <div style={{ marginTop: "8px" }}>
              <button onClick={handleUpdate} disabled={loading} style={primaryBtn}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditing(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          post.text && <p style={textStyle}>{post.text}</p>
        )}
      </div>
    </>
  );
};

/* ---------------- STYLES ---------------- */

const card = {
  background: "#ffffff",
  padding: "14px",
  borderRadius: "16px",
  marginBottom: "14px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const email = {
  fontSize: "12px",
  color: "#777",
};

const postImage = {
  maxWidth: "240px",
  maxHeight: "180px",
  width: "auto",
  height: "auto",
  objectFit: "cover",
  borderRadius: "12px",
  marginTop: "8px",
  cursor: "pointer",
};


const textStyle = {
  marginTop: "10px",
  fontSize: "15px",
  lineHeight: "1.5",
};

const textarea = {
  width: "100%",
  marginTop: "10px",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ddd",
};

const menu = {
  position: "absolute",
  right: 0,
  top: "22px",
  background: "#fff",
  borderRadius: "10px",
  width: "120px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  zIndex: 10,
};

const menuBtn = {
  width: "100%",
  padding: "10px",
  textAlign: "left",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const primaryBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "6px 14px",
  borderRadius: "8px",
};

const dangerBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "6px 14px",
  borderRadius: "6px",
};

const grayBtn = {
  background: "#999",
  color: "white",
  border: "none",
  padding: "6px 14px",
  borderRadius: "6px",
};

/* IMAGE MODAL */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
};

const previewImg = {
  maxWidth: "90%",
  maxHeight: "90%",
  borderRadius: "16px",
};

const closeIcon = {
  position: "absolute",
  top: "20px",
  right: "20px",
  color: "white",
  cursor: "pointer",
};

export default PostCard;
