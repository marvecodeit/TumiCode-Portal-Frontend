import { useState } from "react";
import TopNav from "./TopNav.jsx";
import UserSidebar from "./UserSidebar.jsx";
import "./UserDashboard.css";
import PostForm from '../Chat/PostForm.jsx'
import ChatPage from '../Chat/ChatPage.jsx';
import PostList from '../Chat/PostList.jsx';
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
    <div className="dashboard-wrapper">
      {/* Top Nav */}
      <div className="top-nav">
      <TopNav toggleSidebar={() => setOpenSidebar(!openSidebar)} />
</div>
      <div className="dashboard-layout">
        {/* Sidebar */}
        <UserSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          open={openSidebar}
          close={() => setOpenSidebar(false)}
        />

        {/* Main Content */}
        <main className="dashboard-main">
          {activeTab === "home" && <h2>Welcome 👋</h2>}
          {activeTab === "profile" && <h2>Your Profile</h2>}
          {activeTab === "projects" && <h2>Your Projects</h2>}
          {activeTab === "settings" && <h2>Settings</h2>}
          {activeTab === "chat" && <PostList />}
        </main>
      </div>
    </div>
    </>
  );
};

export default UserDashboard;
