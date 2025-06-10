import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: `${API_BASE_URL}/inventory`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
interface InventorySummary {
  totalRawMaterials: number;
  lowStockItems: number;
  topSellingProduct: string | null;
  finishedProducts: number;
}

interface RawMaterial {
  id: string;
  itemId: string;
  name: string;
  supplier: string;
  stock: number;
  unit: string;
  price: number;
  status: string;
  reorderLevel: number | null;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
}

interface FinishedProduct {
  id: string;
  itemId: string;
  name: string;
  type: string;
  width: number;
  stock: number;
  unit: string;
  length: number;
  price: number;
  status: string;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

// API Functions
export const getInventorySummary = async (): Promise<InventorySummary> => {
  try {
    const response = await api.get("/summary");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch inventory summary:", error);
    throw error;
  }
};

export const getLowStockAlerts = async (): Promise<RawMaterial[]> => {
  try {
    const response = await api.get("/alerts");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch low stock alerts:", error);
    throw error;
  }
};

export const addRawMaterial = async (data: {
  name: string;
  supplier: string;
  quantity: number;
  unit: string;
  price: number;
  reorderLevel?: number;
  remarks?: string;
}): Promise<RawMaterial> => {
  try {
    const response = await api.post("/raw-materials", data);
    return response.data;
  } catch (error) {
    console.error("Failed to add raw material:", error);
    throw error;
  }
};

export const getRawMaterials = async (params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<RawMaterial>> => {
  try {
    const response = await api.get("/raw-materials", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch raw materials:", error);
    throw error;
  }
};

export const addFinishedProduct = async (data: {
  type: string;
  name: string;
  width: number;
  quantity: number;
  unit: string;
  length: number;
  price: number;
  remarks?: string;
}): Promise<FinishedProduct> => {
  try {
    const response = await api.post("/finished-products", data);
    return response.data;
  } catch (error) {
    console.error("Failed to add finished product:", error);
    throw error;
  }
};

export const getFinishedProducts = async (params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<FinishedProduct>> => {
  try {
    const response = await api.get("/get-finished-products", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch finished products:", error);
    throw error;
  }
};

export const generateInventoryReport = async (params?: {
  category?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}): Promise<{
  rawMaterials: RawMaterial[];
  products: FinishedProduct[];
}> => {
  try {
    const response = await api.get("/report", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to generate inventory report:", error);
    throw error;
  }
};

export const searchInventory = async (params: {
  query: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<{
  rawMaterials: RawMaterial[];
  products: FinishedProduct[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}> => {
  try {
    const response = await api.get("/search", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to search inventory:", error);
    throw error;
  }
};
