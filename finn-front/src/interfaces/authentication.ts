export interface ApiToken {
  refresh: string;
  access: string;
}

export interface TokenExistence {
  access: string | null;
  refresh: string | null;
}

export interface TokenResponse {
  access: string;
  refresh?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface UserResponse {
  id?: number;
  fullName: string;
  email: string;
}

export interface UserAuthCredentials {
  email: string;
  password: string;
  fullname: string;
}

export interface UserUpdateCredentials {
  id?: number;
  email: string;
  password?: string | undefined;
  fullname: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  fullname: string;
}
