import { formEndpointQueryString } from "@/utils/query";
import { api } from "../api";
import type {
  PromoCodeCreateAttributes,
  TicketAttributes,
  TicketCreateAttributes,
  TicketDto,
  TicketQuery,
  TicketRelationships,
} from "./types/ticket.types";
import type { ResponseArrayPayload, ResponsePayload } from "./types/types";

export class TicketService {
  static endpoint = "tickets";

  static async create(ticket: TicketCreateAttributes, eventId: string) {
    const request = {
      data: {
        type: "ticket",
        attributes: ticket,
        relationships: {
          event: {
            data: {
              id: eventId,
              type: "event",
            },
          },
        },
      },
    };
    const response = await api.post<ResponsePayload<TicketAttributes, TicketRelationships>>(
      TicketService.endpoint,
      request,
    );
    return response.data;
  }

  static async createPromocode(promo: PromoCodeCreateAttributes, ticketId: string) {
    const request = {
      data: {
        type: "promo_code",
        attributes: promo,
        relationships: {
          ticket: {
            data: {
              id: ticketId,
              type: "ticket",
            },
          },
        },
      },
    };
    const response = await api.post("promo-codes", request);
    return response.data;
  }

  static async getAll(query?: TicketQuery) {
    const response = await api.get<ResponseArrayPayload<TicketAttributes, TicketRelationships>>(
      formEndpointQueryString(TicketService.endpoint, query),
    );
    return TicketService.toDto(response.data);
  }

  static toDto(tickets: ResponseArrayPayload<TicketAttributes, TicketRelationships>) {
    const result: TicketDto[] = [];
    for (const ticket of tickets.data) {
      result.push({ ...ticket.attributes, event_id: ticket.relationships!.ticket.data.id, id: ticket.id });
    }
    return { data: result, links: tickets.links };
  }
}
