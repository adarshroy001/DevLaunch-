import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  status?: string;
}

export const UserService = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await api.get("/users");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async createUser(userData: Omit<User, "id">): Promise<User> {
    try {
      const response = await api.post("/users", userData);
      return response.data.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  async updateUserStatus(id: string, status: string): Promise<User> {
    try {
      const response = await api.patch(`/users/${id}/status`, { status });
      return response.data.data;
    } catch (error) {
      console.error("Error updating user status:", error);
      throw error;
    }
  },
};
