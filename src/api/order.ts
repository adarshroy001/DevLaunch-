import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: `${API_BASE_URL}/orders`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create new order
export const createOrder = async (data: any) => {
  try {
    const response = await api.post("/", data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to create order:", error);
    throw error;
  }
};

// Get all orders (with pagination and optional filters via query params)
export const getOrders = async (params?: any) => {
  try {
    const response = await api.get("/", { params });
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

// Filter orders
export const filterOrders = async (params?: any) => {
  try {
    const response = await api.get("/filter", { params });
    return response.data;
  } catch (error: any) {
    console.error("Failed to filter orders:", error);
    throw error;
  }
};

// Search orders
export const searchOrders = async (params: { query: string, [key: string]: any }) => {
  if (!params.query) throw new Error("Search query is required");

  try {
    const response = await api.get("/search-orders-book", { params });
    return response.data;
  } catch (error: any) {
    console.error("Failed to search orders:", error);
    throw error;
  }
};
