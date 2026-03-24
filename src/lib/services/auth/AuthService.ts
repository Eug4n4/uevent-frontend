import { api } from "../../api";
import type { LoginDetails, LoginDto, RegisterDetails, RegisterDto } from "./auth.types";

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

  static async loginWithPassword(dto: LoginDetails) {
    const payload: LoginDto = {
      data: {
        type: "account",
        attributes: dto
      }
    }
    return api.post("account/login", payload)

  }

  static async loginWithGoogle(code: string) {

  }
    
}