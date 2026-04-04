export interface ProfileAttributes {
  username: string;
  visibility: boolean;
  avatar_url: string;
  updated_at: string;
  created_at: string;
}

export type EditableProfileAttributes = Pick<ProfileAttributes, "username" | "visibility">;

export interface ProfileDto extends ProfileAttributes {
  id: string;
}
