export const SESSION_COOKIE = "session_token";

export interface UserResponse {
  id: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
  user: UserResponse;
}