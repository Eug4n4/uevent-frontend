import { formEndpointQueryString } from "@/utils/query";
import { api } from "../api";
import { EventService } from "./EventService";
import type { EventDto } from "./types/event.types";
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
  TransactionAttributes,
  TransactionQuery,
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

  static async purchase(ticketId: string, quantity: number, promocode?: string) {
    const request = {
      data: {
        type: "purchase",
        attributes: {
          promo_code: promocode,
          quantity,
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

  static async getUserTickets(query?: TransactionQuery) {
    const userTransactions = (
      await api.get<ResponseArrayPayload<TransactionAttributes>>(formEndpointQueryString("transactions", query))
    ).data;
    const result = await Promise.all(
      userTransactions.data.map(async (tr) => {
        const ticket = await TicketService.getById(tr.attributes.check.ticket_id);

        const event = await EventService.getById(ticket.data.relationships!.ticket.data.id);

        return {
          attributes: tr.attributes,
          event: {
            id: event.data.id,
            ...event.data.attributes,
          } as EventDto,
        };
      }),
    );
    return { data: result, links: userTransactions.links };
  }

  static toDto(tickets: ResponseArrayPayload<TicketAttributes, TicketRelationships>) {
    const result: TicketDto[] = [];
    for (const ticket of tickets.data) {
      result.push({ ...ticket.attributes, event_id: ticket.relationships!.ticket.data.id, id: ticket.id });
    }
    return { data: result, links: tickets.links };
  }

  static toPromocodeDto(promos: ResponseArrayPayload<PromoCodeAttributes, PromoCodeRelationships>) {
    const result: PromoCodeDto[] = [];
    for (const promo of promos.data) {
      result.push({ ...promo.attributes, id: promo.id, ticket_id: promo.relationships!.ticket.data.id });
    }
    return { data: result, links: promos.links };
  }
}
