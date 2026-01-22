import apiClient from "@/lib/axios";
import { Store } from "@/types/store";

export const storeService = {
  async getAllStores(): Promise<Store[]> {
    const { data } = await apiClient.get<Store[]>("/stores");
    return data;
  },
};
