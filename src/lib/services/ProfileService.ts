import { api } from "../api";
import type { AccountAttributes, AccountRelationships } from "./types/account.types";
import type { AuthResponse } from "./types/auth.types";
import type { ProfileAttributes } from "./types/profile.types";
import type { ResponsePayload } from "./types/types";

export class ProfileService {
  static async getProfileWithAccount(): Promise<AuthResponse> {
    const account = await api.get<ResponsePayload<AccountAttributes, AccountRelationships>>("accounts/me");
    const profile = await api.get<ResponsePayload<ProfileAttributes>>("profiles/me");
    const result = {
      id: account.data.data.id,
      ...account.data.data.attributes,
      ...profile.data.data.attributes,
    };
    return result;
  }

  static async updateMyAvatar(avatar: Blob) {
    const formData = new FormData();
    formData.append("avatar", avatar);
    return await api.post<ResponsePayload<ProfileAttributes>>("profiles/me/avatar", formData);
  }

  static async update(username: string, visibility: boolean, profileId: string) {
    const payload = {
      data: {
        id: profileId,
        type: "profile",
        attributes: { username, visibility },
      },
    };
    return await api.patch<ResponsePayload<ProfileAttributes>>("profiles/me", payload);
  }
}
