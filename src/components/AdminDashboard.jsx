import { useEffect, useState } from "react";
import CreateUserModal from "./CreateUserModal.jsx";
import DashboardNav from "./DashboardNav.jsx";
import TopNav from "./TopNav.jsx";
import toast from "react-hot-toast";
import { fetchUsers } from "../api/admin.api.js";
import "./AdminDashboard.css";
import PostForm from "../Chat/PostForm.jsx";
import ChatPage from "../Chat/ChatPage.jsx";
import PostsList from "../Chat/PostList.jsx";
const AdminDashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "users") {
      loadUsers();
    }
  }, [activeTab]);


const loadUsers = async () => {
  try {
    setLoading(true);
    const res = await fetchUsers();
    setUsers(res.data);
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to load users");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="dashboard-wrapper">
      <br />
      <br />
      <br />
      <TopNav />

      <div className="admin-layout">
        <DashboardNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="admin-main">
          <header className="admin-header">
            <h2>{activeTab.toUpperCase()}</h2>

            {activeTab === "users" && (
              <button onClick={() => setOpenModal(true)}>
                + Create User
              </button>
            )}
          </header>

          <section className="admin-content">
            {activeTab === "overview" && <p>Welcome Admin 👋</p>}

            {activeTab === "users" && (
              <>
                {loading ? (
                  <p>Loading users...</p>
                ) : (
                  <div className="table-wrapper">
                    <table className="users-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length === 0 ? (
                          <tr>
                            <td colSpan="3">No users found</td>
                          </tr>
                        ) : (
                          users.map((u, i) => (
                            <tr key={u._id}>
                              <td>{i + 1}</td>
                              <td>{u.name}</td>
                              <td>{u.email}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
                
              </>
            )}

            {activeTab === "settings" && <p>Settings panel</p>}
            {activeTab === "chat" && <PostsList /> }
          </section>
        </main>
      </div>

      {openModal && (
        <CreateUserModal
          close={() => {
            setOpenModal(false);
            loadUsers(); //  refresh list🔄
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
