import { useEffect, useRef, useState } from "react";
import { getPosts } from "../api/post.api";
import PostForm from "../Chat/PostForm.jsx";
import PostCard from "../Chat/PostCard.jsx";
import socket from "../api/socket.js";
import { useAuth } from "../components/AuthContext.jsx";
import TopNav from "../components/TopNav.jsx";
import "./chat.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const messagesEndRef = useRef(null); // 👈 ADD THIS

  useEffect(() => {
    getPosts().then((res) => setPosts(res.data));

    socket.on("post:new", (post) =>
      setPosts((prev) => [...prev, post]) // 👈 append to bottom
    );

    socket.on("post:update", (updated) =>
      setPosts((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      )
    );

    socket.on("post:delete", (id) =>
      setPosts((prev) => prev.filter((p) => p._id !== id))
    );

    return () => {
      socket.off("post:new");
      socket.off("post:update");
      socket.off("post:delete");
    };
  }, []);

  // 👇 AUTO SCROLL WHEN POSTS CHANGE
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [posts]);

  return (
    <>
      <TopNav />
      <div className="chat-page">
        <div className="chat-messages">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              currentUserId={user?._id || user?.id}
            />
          ))}

          {/* 👇 SCROLL TARGET */}
          <div ref={messagesEndRef} />
        </div>

        <PostForm />
      </div>
    </>
  );
};

export default PostList;
