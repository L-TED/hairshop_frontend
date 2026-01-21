import apiClient from "@/lib/axios";
import { Staff } from "@/types/store";

export const staffService = {
  async getStaffsByStoreId(storeId: number): Promise<Staff[]> {
    const { data } = await apiClient.get<Staff[]>("/staffs", {
      params: { store_id: storeId },
    });
    return data;
  },

  async getStaffById(id: number): Promise<Staff> {
    const { data } = await apiClient.get<Staff>(`/staffs/${id}`);
    return data;
  },
};
