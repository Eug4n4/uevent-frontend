import type { ProfileAttributes } from "../types/profile.types";

export interface CommentAttributes {
  text: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface CommentRelationships {
  profile: {
    data: {
      type: "profile";
      id: string;
    };
  };
  children?: {
    data: {
      id: string;
      type: "comment";
    }[];
  };
}

export interface CommentDto extends CommentAttributes {
  id: string;
  profile?: (ProfileAttributes & { id: string }) | null;
  children: CommentDto[];
}

export interface CommentCreateAttributes {
  text: string;
  parent_id?: string;
}

export type CommentUpdateAttributes = Pick<CommentCreateAttributes, "text">;

export interface CommentQueryParams {
  "page[offset]"?: number;
  "page[limit]"?: number;
}
