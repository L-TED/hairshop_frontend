// 로그인한 유저 정보
export interface Customer {
  id: string;
  username: string;
  // hash_password는 클라이언트에 안 보내므로 제외
}

// refresh_tokens는 서버에서 자동 처리하므로 타입 불필요

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user?: Customer;
}

export interface TokenResponse {
  accessToken: string;
}
