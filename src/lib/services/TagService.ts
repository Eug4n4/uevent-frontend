import { toUrlSearchParams } from "@/utils/query";
import { api } from "../api";
import type { TagAttributes, TagQueryParams } from "./types/tag.types";
import type { ResponseArrayPayload } from "./types/types";

export class TagService {
  static async getAll(query: TagQueryParams) {
    const params = toUrlSearchParams(query);
    const response = await api.get<ResponseArrayPayload<TagAttributes>>(`events/tags?${params}`);
    return response.data;
  }
}
