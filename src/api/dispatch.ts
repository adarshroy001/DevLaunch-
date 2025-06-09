import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: `${API_BASE_URL}/dispatch`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
interface Dispatch {
  id: string;
  dispatchId: string;
  orderId: string;
  customer: string;
  status: string;
  date: string;
  carrier: string;
  trackingId: string;
  loadingDate?: string;
  driverName?: string;
  shippingAddress?: string;
  carNumber?: string;
  driverNumber?: string;
  transportation?: string;
  packageDetails?: string;
  remarks?: string;
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

interface TodayDispatchesResponse {
  todaysDispatches: number;
  recentDispatches: Dispatch[];
}

// API Functions
export const createDispatch = async (data: {
  orderId: string;
  loadingDate?: string;
  driverName?: string;
  shippingAddress: string;
  customer: string;
  carNumber?: string;
  driverNumber?: string;
  carrier?: string;
  transportation?: string;
  packageDetails?: string;
  remarks?: string;
}): Promise<Dispatch> => {
  try {
    const response = await api.post("/", data);
    return response.data;
  } catch (error) {
    console.error("Failed to create dispatch:", error);
    throw error;
  }
};

export const getTodayDispatches =
  async (): Promise<TodayDispatchesResponse> => {
    try {
      const response = await api.get("/today");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch today's dispatches:", error);
      throw error;
    }
  };

export const getAllDispatches = async (params?: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<Dispatch>> => {
  try {
    const response = await api.get("/", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dispatches:", error);
    throw error;
  }
};

export const updateDispatchStatus = async (
  id: string,
  data: {
    status: "READY_FOR_PICKUP" | "IN_TRANSIT" | "DELIVERED" | "DELAYED";
    trackingId?: string;
    remarks?: string;
  }
): Promise<Dispatch> => {
  try {
    const response = await api.patch(`/${id}/status`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update dispatch status:", error);
    throw error;
  }
};

export const searchShipments = async (params: {
  query?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  carrier?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<Dispatch>> => {
  try {
    const response = await api.get("/search-shipment", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to search shipments:", error);
    throw error;
  }
};

export const getDeliveredShipments = async (params?: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<Dispatch>> => {
  try {
    const response = await api.get("/delivered", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch delivered shipments:", error);
    throw error;
  }
};

export const getInTransitShipments = async (params?: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<Dispatch>> => {
  try {
    const response = await api.get("/in-transit", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch in-transit shipments:", error);
    throw error;
  }
};
