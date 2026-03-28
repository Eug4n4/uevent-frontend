import axios from "axios";
import { api } from "../api";
import type { AccountAttributes, AccountRelationships } from "./types/account.types";
import type { AuthResponse, LoginDetails, LoginDto, RegisterDetails, RegisterDto } from "./types/auth.types";
import { type ProfileAttributes } from "./types/profile.types";
import { type ResponsePayload } from "./types/types";

export class AuthService {
  static async register(dto: RegisterDetails) {
    const payload: RegisterDto = {
      data: {
        type: "account",
        attributes: dto,
      },
    };
    return api.post("accounts/registration", payload);
  }

  static async loginWithPassword(dto: LoginDetails): Promise<AuthResponse> {
    const payload: LoginDto = {
      data: {
        type: "account",
        attributes: dto,
      },
    };
    const account = await api.post<ResponsePayload<AccountAttributes, AccountRelationships>>("accounts/login", payload);
    const profile = await api.get<ResponsePayload<ProfileAttributes>>("profiles/me");
    const result = {
      id: account.data.data.id,
      ...account.data.data.attributes,
      ...profile.data.data.attributes,
    };
    return result;
  }

  static loginWithGoogle() {
    window.location.href = `${api.defaults.baseURL}/accounts/login/google`;
  }

  static async logout() {
    await api.post("accounts/logout");
  }

  static async refresh(signal: AbortSignal) {
    await axios.post("accounts/refresh", undefined, { baseURL: api.defaults.baseURL, withCredentials: true, signal });
  }
}
