import { formEndpointQueryString } from "@/utils/query";
import { api } from "../api";
import type {
  PromoCodeAttributes,
  PromoCodeCreateAttributes,
  PromoCodeDto,
  PromoCodeQuery,
  PromoCodeRelationships,
  PurchaseAttributes,
  TicketAttributes,
  TicketCreateAttributes,
  TicketDto,
  TicketQuery,
  TicketRelationships,
  UserTicketAttributes,
  UserTicketDto,
  UserTicketRelationships,
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

  static async purchase(ticketId: string, quantity: number, visibility: boolean, promocode?: string) {
    const request = {
      data: {
        type: "purchase",
        attributes: {
          promo_code: promocode,
          quantity,
          visibility,
        },
      },
    };
    const response = await api.post<ResponsePayload<PurchaseAttributes>>(
      `${TicketService.endpoint}/${ticketId}/purchase`,
      request,
    );
    return response.data;
  }

  static async getAll(query?: TicketQuery) {
    const response = await api.get<ResponseArrayPayload<TicketAttributes, TicketRelationships>>(
      formEndpointQueryString(TicketService.endpoint, query),
    );
    return TicketService.toDto(response.data);
  }

  static async getById(id: string) {
    const response = await api.get<ResponsePayload<TicketAttributes, TicketRelationships>>(
      `${TicketService.endpoint}/${id}`,
    );
    return response.data;
  }

  static async getPromocodes(query?: PromoCodeQuery) {
    const response = await api.get<ResponseArrayPayload<PromoCodeAttributes, PromoCodeRelationships>>(
      formEndpointQueryString("promo-codes", query),
    );
    return TicketService.toPromocodeDto(response.data);
  }

  static async getUserTickets(query?: TicketQuery) {
    const response = await api.get<ResponseArrayPayload<UserTicketAttributes, UserTicketRelationships>>(
      formEndpointQueryString("user-tickets", query),
    );
    const data = response.data;
    const ticketIds = new Set<string>();
    for (const ut of data.data) {
      ticketIds.add(ut.relationships!.ticket.data.id);
    }
    const tickets = await Promise.all(Array.from(ticketIds).map((id) => TicketService.getById(id)));
    const ticketsDto: TicketDto[] = [];
    for (const many of tickets) {
      ticketsDto.push({ ...many.data.attributes, event_id: many.data.relationships!.ticket.data.id, id: many.data.id });
    }
    return TicketService.toUserTicketDto(ticketsDto, data);
  }

  static toDto(tickets: ResponseArrayPayload<TicketAttributes, TicketRelationships>) {
    const result: TicketDto[] = [];
    for (const ticket of tickets.data) {
      result.push({ ...ticket.attributes, event_id: ticket.relationships!.ticket.data.id, id: ticket.id });
    }
    return { data: result, links: tickets.links };
  }

  static toUserTicketDto(
    tickets: TicketDto[],
    userTickets: ResponseArrayPayload<UserTicketAttributes, UserTicketRelationships>,
  ) {
    const result: UserTicketDto[] = [];
    return result;
  }

  static toPromocodeDto(promos: ResponseArrayPayload<PromoCodeAttributes, PromoCodeRelationships>) {
    const result: PromoCodeDto[] = [];
    for (const promo of promos.data) {
      result.push({ ...promo.attributes, id: promo.id, ticket_id: promo.relationships!.ticket.data.id });
    }
    return { data: result, links: promos.links };
  }
}
