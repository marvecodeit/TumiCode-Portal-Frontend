import { useState } from "react";
import api from "../api/axios.js";
import toast from "react-hot-toast";
import "./Modal.css";

const CreateUserModal = ({ close }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // ✅ default role
  });

  const submit = async (e) => {
    e.preventDefault();

    // 🔐 frontend validation
    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields are required");
    }

    try {
      await api.post("/admin/create-user", form);
      toast.success("User created 🎉");
      close();
    } catch (err) {
      console.error("Create user error:", err.response?.data);
      toast.error(err.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Create User</h3>

        <form onSubmit={submit}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* ✅ ROLE SELECT (IMPORTANT) */}
          <select
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="modal-actions">
            <button type="submit">Create</button>
            <button type="button" onClick={close}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
