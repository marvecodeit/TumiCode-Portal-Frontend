import api  from './axios';

export const fetchUsers = () => api.get("/admin/users");