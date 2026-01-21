import apiClient from "@/lib/axios";
import { Customer, LoginRequest, SignupRequest } from "@/types/auth";

export const authService = {
  // 회원가입
  async signup(data: SignupRequest): Promise<void> {
    await apiClient.post("/auth/signup", data);
  },

  // 로그인
  async login(data: LoginRequest): Promise<void> {
    await apiClient.post("/auth/login", data);
    // 서버가 쿠키로 토큰 설정해줌
  },

  // 현재 유저 정보
  async getMe(): Promise<Customer> {
    const { data } = await apiClient.get<Customer>("/auth/me");
    return data;
  },

  // 로그아웃
  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
  },
};
