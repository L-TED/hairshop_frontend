import apiClient from "@/lib/axios";
import { NewsPost } from "@/types/news";

export const newsService = {
  async getAllNews(): Promise<NewsPost[]> {
    const { data } = await apiClient.get<NewsPost[]>("/news-posts");
    return data;
  },

  async getNewsById(id: number): Promise<NewsPost> {
    const { data } = await apiClient.get<NewsPost>(`/news-posts/${id}`);
    return data;
  },
};
