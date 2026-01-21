import apiClient from "@/lib/axios";
import { NewsPost } from "@/types/news";

export const newsService = {
  async getAllNews(): Promise<NewsPost[]> {
    const { data } = await apiClient.get<NewsPost[]>("/news");
    return data;
  },

  async getNewsById(id: number): Promise<NewsPost> {
    const { data } = await apiClient.get<NewsPost>(`/news/${id}`);
    return data;
  },

  async getRecentNews(limit: number = 3): Promise<NewsPost[]> {
    const { data } = await apiClient.get<NewsPost[]>("/news", {
      params: { limit },
    });
    return data;
  },
};
