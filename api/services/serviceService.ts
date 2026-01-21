import apiClient from "@/lib/axios";
import { Service } from "@/types/service";

export const serviceService = {
  async getAllServices(): Promise<Service[]> {
    const { data } = await apiClient.get<Service[]>("/services");
    return data;
  },
};
