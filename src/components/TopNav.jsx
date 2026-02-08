import { Menu, LogOut } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./TopNav.css";

const TopNav = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out 👋");
    navigate("/login");
  };

  return (
    <header className="topnav">
      {/* Mobile menu button */}
      <button className="menu-icon" onClick={toggleSidebar}>
        <Menu size={22} />
      </button>

      <div className="topnav-user">
        <div className="name">{user?.name}</div>
        <div className="email">{user?.email}</div>
      </div>

      <button onClick={handleLogout} className="logout-btn">
        <LogOut size={20} />
      </button>
    </header>
  );
};

export default TopNav;