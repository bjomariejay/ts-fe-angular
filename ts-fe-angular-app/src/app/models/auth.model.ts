export interface AuthenticatedUser {
  id: number;
  name: string;
  age: number;
  address: string;
  username: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  age: number;
  address: string;
  username: string;
  password: string;
}

export interface AuthSuccessResponse {
  success: boolean;
  user?: AuthenticatedUser;
  token?: string;
  message?: string;
}

export interface CurrentUserResponse {
  success: boolean;
  user?: AuthenticatedUser;
  message?: string;
}
