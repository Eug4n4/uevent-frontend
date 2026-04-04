import z from "zod";

export const ticketCreateAttributesSchema = z.object({
  name: z.string().min(3, { error: "Name is too short" }).max(255, { error: "Name is too long" }),
  description: z.optional(z.string().max(255, { error: "Description is too loong" })),
  price: z.number({ error: "Price is a number" }).min(0),
  total: z.number({ error: "Total is a number" }).min(1),
});

export const promocodeCreateAttributesSchema = z.object({
  code: z.string().min(3, { error: "Too short" }).max(50, { error: "Too long" }),
  discount_percent: z.number().min(1).max(100),
  total: z.number().min(1, { error: "At least 1" }),
});

export type PromoCodeCreateAttributes = z.infer<typeof promocodeCreateAttributesSchema>;

export type TicketCreateAttributes = z.infer<typeof ticketCreateAttributesSchema>;

export interface TicketAttributes extends TicketCreateAttributes {
  status: "active" | "canceled";
  sold: number;
  available: number;
  created_at: string;
  updated_at: string;
}

export interface UserTicketAttributes {
  visibility: boolean;
  status: "unused" | "used" | "canceled";
  created_at: string;
  updated_at: string;
}

export interface UserTicketDto extends UserTicketAttributes, Omit<TicketAttributes, "status"> {
  id: string;
}

export interface UserTicketRelationships {
  account: { data: { id: string; type: "account" } };
  ticket: { data: { id: string; type: "ticket" } };
  promo_code?: { data: { id: string; type: "promo_code" } };
  transaction: { data: { id: string; type: "transaction" } };
}

export interface PromoCodeAttributes extends PromoCodeCreateAttributes {
  status: "active" | "canceled";
  used: number;
  remaining: number;
  created_at: string;
  updated_at: string;
}

export interface PromoCodeRelationships extends Pick<UserTicketRelationships, "ticket"> {}

export interface TransactionCheck {
  quantity: number;
  ticket_id: string;
  account_id: string;
  promo_code: string;
  unit_price: number;
  final_price: number;
  ticket_name: string;
  discount_percent: number;
}

export interface TransactionAttributes {
  status: "pending" | "paid" | "returned";
  description: string;
  final_price: number;
  check: TransactionCheck;
  created_at: string;
  updated_at: string;
}

export interface PurchaseAttributes {
  client_secret: string;
  transaction_id: string;
  final_price: number;
  currency: string;
}

export interface TicketRelationships {
  ticket: {
    data: {
      id: string;
      type: "event";
    };
  };
}

export interface PromoCodeDto extends PromoCodeAttributes {
  id: string;
  ticket_id: string;
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

export interface TransactionQuery {
  account_id?: string;

  company_id?: string;

  ticket_id?: string;

  event_id?: string;

  promo_code_id?: string;

  "page[limit]"?: number;

  "page[offset]"?: number;
}

export interface PromoCodeQuery {
  ticket_id?: string;
  event_id?: string;
  "page[limit]"?: number;
  "page[offset]"?: number;
  code?: string;
  available?: boolean;
}
