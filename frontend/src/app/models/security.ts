export interface TravailJwtToken {
  name: string;
  userId: number;
  type: string;
}

export interface UserLoginResponse {
  token: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}
