// Shared API types.

export interface SessionPayload {
  unionId: string;
  clientId: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

export interface UserProfile {
  user_id: string;
  name: string;
  email?: string;
  avatar_url?: string;
}
