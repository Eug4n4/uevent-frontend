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
        attributes: dto
      }
    }
    return api.post("account/registration", payload)
  }

  static async loginWithPassword(dto: LoginDetails): Promise<AuthResponse> {
    const payload: LoginDto = {
      data: {
        type: "account",
        attributes: dto
      }
    }
    const account = await api.post<ResponsePayload<AccountAttributes, AccountRelationships>>("account/login", payload);
    const profile = await api.get<ResponsePayload<ProfileAttributes>>("profiles/me"); 
    const result = {
      id: account.data.data.id,
      ...account.data.data.attributes,
      ...profile.data.data.attributes
    }
    return result;

  }

  static async loginWithGoogle(code: string) {

  }
    
}