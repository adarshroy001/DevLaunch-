import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Create a new order
export const createOrder = async (orderData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create order");
  }
};

// Get all orders with pagination and filters
export const getOrders = async (params: any = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`, { params });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch orders");
  }
};

// Get order book data
export const getOrderBook = async (filter?: string) => {
  try {
    const params = filter ? { filter } : {};
    const response = await axios.get(`${API_BASE_URL}/orders/book`, { params });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch order book"
    );
  }
};

// Get order details
export const getOrderDetails = async (orderId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch order details"
    );
  }
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/orders/${orderId}/status`,
      { status }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update order status"
    );
  }
};

// Update order products
export const updateOrderProducts = async (orderId: string, products: any[]) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/orders/${orderId}/products`,
      { products }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update order products"
    );
  }
};

// Get pending orders
export const getPendingOrders = async (params: any = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/pending`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch pending orders"
    );
  }
};

// Get dispatched orders
export const getDispatchedOrders = async (params: any = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/dispatched`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch dispatched orders"
    );
  }
};

// Get cancelled orders
export const getCancelledOrders = async (params: any = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/cancelled`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch cancelled orders"
    );
  }
};

// Filter orders
export const filterOrders = async (params: any = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/filter`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to filter orders");
  }
};

// Filter order book
export const filterOrderBook = async (params: any = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/filter/getBook`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to filter order book"
    );
  }
};

// Search orders
export const searchOrders = async (query: string, params: any = {}) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/orders/search-orders-book`,
      {
        params: { ...params, query },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to search orders");
  }
};
