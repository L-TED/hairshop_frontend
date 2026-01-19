export interface NewsPost {
  id: number;
  title: string;
  contents: string;
  thumbnail_url: string | null;
  created_at: string; // ISO 8601
}
