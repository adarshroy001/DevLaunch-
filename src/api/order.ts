import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

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
  } catch (error: unknown) {
    console.error("Failed to create order:", error);
    throw error;
  }
};

// Get all orders (with pagination and optional filters via query params)
export const getOrders = async (params?: any) => {
  try {
    const response = await api.get("/", { params });
    return response.data;
  } catch (error: unknown) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

// Filter orders
export const filterOrders = async (params?: any) => {
  try {
    const response = await api.get("/filter/getBook", { params });
    return response.data;
  } catch (error: any) {
    console.error("Failed to filter orders:", error);
    throw error;
  }
};

// Search orders
export const searchOrders = async (params: {
  query?: string;
  page?: number;
  limit?: number;
  status?: string;

  [key: string]: any;
}) => {
  try {
    // Remove undefined values from params
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined)
    );

    const response = await api.get("/search-orders-book", {
      params: cleanParams,
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to search orders:", error);

    // Provide more structured error information
    const apiError = {
      message: error.response?.data?.message || "Search failed",
      status: error.response?.status || 500,
      data: error.response?.data || null,
    };

    throw apiError;
  }
};
