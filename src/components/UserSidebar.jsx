import { Home, User, Folder, Settings, X, MessageCircle } from "lucide-react";

const UserSidebar = ({ activeTab, setActiveTab, open, close }) => {
  return (
    <aside className={`user-sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-header">
        <h3>TumiCodes</h3>
        <X className="close-btn" onClick={close} />
      </div>

      <nav>
        <button
          className={activeTab === "home" ? "active" : ""}
          onClick={() => setActiveTab("home")}
        >
          <Home size={18} /> Home
        </button>

        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          <User size={18} /> Profile
        </button>

        <button
          className={activeTab === "projects" ? "active" : ""}
          onClick={() => setActiveTab("projects")}
        >
          <Folder size={18} /> Projects
        </button>

        <button
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={18} /> Settings
        </button>
        <button
          className={activeTab === "chat" ? "active" : ""}
          onClick={() => setActiveTab("chat")}
        >
          <MessageCircle size={18} /> Chat Hub
        </button>
      </nav>
    </aside>
  );
};

export default UserSidebar;
