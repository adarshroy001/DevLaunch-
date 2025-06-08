import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL + "/dashboard",
  headers: {
    "Content-Type": "application/json",
  },
});
interface SearchResult {
  orders: any[];
  products: any[];
  customers: any[];
}

// Fetch manufacturing dashboard data
export const fetchDashboardData = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error: unknown) {
    console.error("Failed to fetch dashboard data:", error);
    throw error;
  }
};

// Search dashboard (orders, products, customers)
export const searchDashboard = async (query: string): Promise<SearchResult> => {
  if (!query) throw new Error("Search query is required");

  try {
    const response = await api.get("/search", {
      params: { query },
    });
    return response.data.data as SearchResult;
  } catch (error: unknown) {
    console.error("Dashboard search failed:", error);
    throw error;
  }
};
