import { formEndpointQueryString } from "@/utils/query";
import { api } from "../api";
import type { TicketAttributes, TicketDto, TicketQuery, TicketRelationships } from "./types/ticket.types";
import type { ResponseArrayPayload } from "./types/types";

export class TicketService {
  static endpoint = "tickets";
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
