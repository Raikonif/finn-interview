import api from "@/services/api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/authentication";
import type {
  ApiToken,
  AuthCredentials,
  UserAuthCredentials,
  TokenExistence,
  TokenResponse,
  UserResponse, UserUpdateCredentials,
} from "@/interfaces/authentication.ts";
import { storage } from "@/utils/storage";

export const getJWTLocalStorage = (): TokenExistence => {
    return {
        access: storage.getItem(ACCESS_TOKEN),
        refresh: storage.getItem(REFRESH_TOKEN),
    };
};

export const setJWTLocalStorage = (token: TokenResponse): void => {
    storage.setItem(ACCESS_TOKEN, token.access);
    if (token.refresh) {
        storage.setItem(REFRESH_TOKEN, token.refresh);
    }
};

export const removeJWTLocalStorage = (): void => {
    storage.removeItem(ACCESS_TOKEN);
    storage.removeItem(REFRESH_TOKEN);
};

export const getJWTLocalStorageSecure = (): TokenResponse => {
    const access = storage.getItem(ACCESS_TOKEN);
    const refresh = storage.getItem(REFRESH_TOKEN);

    if (!access) {
        throw new Error("Access token is missing");
    }

    return refresh ? { access, refresh } : { access };
};

export const isLoggedIn = () => {
  const tokens = getJWTLocalStorage();
  return tokens.access !== null;
};


export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await api.get<UserResponse>("api/users/me")
  return response.data
}

export const getUsers = async (): Promise<UserResponse[]> => {
  const response = await api.get<UserResponse[]>("api/users")
  return response.data
}

export const signInUser = async ({email, password}: AuthCredentials): Promise<ApiToken | string> => {
  const response = await api.post<ApiToken | string>("api/auth/login", {
    email: email,
    password: password
  })
  return response.data
}

export const signUpUser = async ({email, password, fullname}: UserAuthCredentials): Promise<UserResponse> => {
  const response = await api.post("api/auth/register", {
    email: email,
    password: password,
    fullName: fullname
  })
  return response.data
}

export const updateUser = async ({email, password, fullname}: UserUpdateCredentials): Promise<UserResponse> => {
  const response = await api.put(`api/users/email/${email}`, {
    email: email,
    password: password,
    fullName: fullname
  })
  return response.data
}

export const deleteUser = async (email: string) => {
  const response = await api.delete(`api/users/email/${email}`)
  return response.status
}
