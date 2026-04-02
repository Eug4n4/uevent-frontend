import z from "zod";

export const ticketCreateAttributesSchema = z.object({
  name: z.string().min(1, { error: "Name is too long" }).max(255, { error: "Name is too long" }),
  description: z.optional(z.string().max(255, { error: "Description is too loong" })),
  price: z.number({ error: "Price is a number" }).min(1),
  total: z.number({ error: "Total is a number" }).min(1),
});

export type TicketCreateAttributes = z.infer<typeof ticketCreateAttributesSchema>;

export interface TicketAttributes extends TicketCreateAttributes {
  status: "active" | "canceled";
  sold: number;
  available: number;
  created_at: string;
  updated_at: string;
}

export interface TicketRelationships {
  ticket: {
    data: {
      id: string;
      type: "event";
    };
  };
}

export interface TicketDto extends TicketAttributes {
  id: string;
  event_id: string;
}

type TicketSortOptions = "price" | "-price" | "created_at" | "-created_at";

export interface TicketQuery {
  event_id?: string;
  company_id?: string;
  available?: boolean;
  "page[limit]"?: number;
  "page[offset]"?: number;
  sort?: TicketSortOptions;
}
