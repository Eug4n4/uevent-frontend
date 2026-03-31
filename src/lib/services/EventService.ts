import { formEndpointQueryString } from "@/utils/query";
import { api } from "../api";
import type { CompanyAttributes } from "./types/company.types";
import type { EventAttributes, EventDto, EventQueryParams, EventRelationships } from "./types/event.types";
import type { ResponseArrayPayload } from "./types/types";

export class EventService {
  static endpoint = "events";

  static includeCompanies(query?: EventQueryParams) {
    if (query) {
      query.include = "companies";
    }
  }

  static toDto(events: ResponseArrayPayload<EventAttributes, EventRelationships>) {
    const newEvents: EventDto[] = [];
    if (events.included !== undefined) {
      for (const include of events.included) {
        const company = {
          id: include.id,
          ...(include.attributes as CompanyAttributes),
        };
        for (const event of events.data) {
          if (event.relationships?.company.data.id === company.id) {
            newEvents.push({
              id: event.id,
              ...event.attributes,
              company,
            });
          }
        }
      }
    }
    return { data: newEvents, links: events.links, included: events.included };
  }

  static async getAll(query?: EventQueryParams) {
    this.includeCompanies(query);
    const response = await api.get<ResponseArrayPayload<EventAttributes, EventRelationships>>(
      formEndpointQueryString(EventService.endpoint, query),
    );
    return this.toDto(response.data);
  }

  static async getMy(query?: EventQueryParams) {
    this.includeCompanies(query);
    const response = await api.get<ResponseArrayPayload<EventAttributes, EventRelationships>>(
      formEndpointQueryString(EventService.endpoint, query),
    );
    return this.toDto(response.data);
  }
}
