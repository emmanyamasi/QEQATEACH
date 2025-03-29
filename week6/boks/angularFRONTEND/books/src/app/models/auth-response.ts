export interface AuthResponse {
  access_token: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    id: number;
    role_id: number;
  };
}
