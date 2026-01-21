// lib/axios.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL, // NestJS 서버 주소
  withCredentials: true, // 쿠키 자동 포함
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 모든 요청에 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    // 쿠키에서 토큰 가져오기 (선택사항, 서버가 자동 처리하면 생략 가능)
    // const token = document.cookie
    //   .split('; ')
    //   .find(row => row.startsWith('accessToken='))
    //   ?.split('=')[1];

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터: 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그인 페이지로
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
