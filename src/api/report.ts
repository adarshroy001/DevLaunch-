import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getDashboardSummary = async (period: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/dashboard`, {
      params: { period },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    throw error;
  }
};

export const getSalesReport = async (period: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/sales`, {
      params: { period },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sales report:", error);
    throw error;
  }
};

export const getProductionReport = async (period: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/production`, {
      params: { period },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching production report:", error);
    throw error;
  }
};

export const getInventoryReport = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/inventory`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory report:", error);
    throw error;
  }
};

export const getCustomerAnalysis = async (period: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/customers`, {
      params: { period },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching customer analysis:", error);
    throw error;
  }
};
