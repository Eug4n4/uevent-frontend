import { toUrlSearchParams } from "@/utils/query";
import { api } from "../api";
import type { EventAttributes, EventQueryParams, EventRelationships } from "./types/event.types";
import type { ResponseArrayPayload } from "./types/types";

export class EventService {
  static async getAll(query?: EventQueryParams) {
    let endpoint = "events";
    let params: URLSearchParams;
    if (query) {
      params = toUrlSearchParams(query);
      endpoint += `?${params}`;
    }
    const response = await api.get<ResponseArrayPayload<EventAttributes, EventRelationships>>(endpoint);
    return response.data;
  }
}
