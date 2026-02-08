import { useState } from "react";
import "./DashboardNav.css";
import { MessageCircle, User, Home } from 'lucide-react'
const DashboardNav = ({ activeTab, setActiveTab }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <h3 className="logo">TumiCodes</h3>

        <nav>
          <button
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => {
              setActiveTab("overview");
              setOpen(false);
            }}
          >
            <div className="flex" style={{ display:"flex", alignItems:"center", gap:"10px" }}>
           <Home /> Dashboard
           </div>
          </button>

          <button
            className={activeTab === "users" ? "active" : ""}
            onClick={() => {
              setActiveTab("users");
              setOpen(false);
            }}
          >
            <div className="flex" style={{ display:"flex", alignItems:"center", gap:"10px" }}>
           <User /> Users
           </div>
          </button>
          <button
            className={activeTab === "chat" ? "active" : ""}
            onClick={() => {
              setActiveTab("chat");
              setOpen(false);
            }}
          >
            <div className="flex" style={{ display:"flex", alignItems:"center", gap:"10px" }}>
           <MessageCircle /> Chat Sphere
           </div>
          </button>

          <button
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => {
              setActiveTab("settings");
              setOpen(false);
            }}
          >
            Settings
          </button>
        </nav>
      </aside>
    </>
  );
};

export default DashboardNav;
