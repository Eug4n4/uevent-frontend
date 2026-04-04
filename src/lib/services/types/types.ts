import type { ProfileAttributes } from "../types/profile.types";
import type { AccountAttributes, AccountRelationships } from "./account.types";
import type { CompanyAttributes, CompanyBillingAttributes, CompanyQueryParams } from "./company.types";
import type { EventAttributes, EventCreateAttributes, EventQueryParams, EventRelationships } from "./event.types";
import type { NewsAttributes, NewsRelationships } from "./news.types";
import type { TagAttributes, TagQueryParams, TagRelationships } from "./tag.types";
import type { PromoCodeAttributes, TicketAttributes, TicketQuery, TicketRelationships } from "./ticket.types";
import type { CommentAttributes, CommentRelationships, CommentQueryParams } from "./comment.types";

export type ResourceLocation = {
  latitude: number;
  longitude: number;
};

type KnownAttributes =
  | AccountAttributes
  | ProfileAttributes
  | TagAttributes
  | EventAttributes
  | EventCreateAttributes
  | CompanyAttributes
  | CompanyBillingAttributes
  | TicketAttributes
  | PromoCodeAttributes
  | NewsAttributes
  | CommentAttributes;
type KnownRelationships =
  | AccountRelationships
  | TagRelationships
  | EventRelationships
  | TicketRelationships
  | NewsRelationships
  | CommentRelationships
  | undefined;
// type KnownIncluded = EventIncluded | undefined;
type ResourceType =
  | "account"
  | "profile"
  | "event"
  | "company"
  | "comment"
  | "tag"
  | "billing"
  | "ticket"
  | "promo_code";
export type KnownQueryParams = TagQueryParams | EventQueryParams | CompanyQueryParams | TicketQuery | CommentQueryParams;

type Resource<Attr extends KnownAttributes, R extends KnownRelationships = undefined> = {
  id: string;
  type: ResourceType;
  attributes: Attr;
  relationships?: R;
};

type NewResource<Attr extends KnownAttributes, R extends KnownRelationships = undefined> = Omit<
  Resource<Attr, R>,
  "id"
>;

export type CompanyResource = Resource<CompanyAttributes> & {
  type: "company";
};

export type AccountResource = Resource<AccountAttributes> & {
  type: "account";
};

export type ProfileResource = Resource<ProfileAttributes> & {
  type: "profile";
};

export type CommentResource = Resource<CommentAttributes, CommentRelationships> & {
  type: "comment";
};

type IncludedResource = CompanyResource | AccountResource | ProfileResource | CommentResource | undefined;

export interface ResponsePayload<
  Attr extends KnownAttributes,
  R extends KnownRelationships = undefined,
  I extends IncludedResource = undefined,
> {
  data: Resource<Attr, R>;
  included?: I[];
}

export interface RequestPayload<Attr extends KnownAttributes, R extends KnownRelationships = undefined> {
  data: NewResource<Attr, R>;
}

export interface ResponseArrayPayload<Attr extends KnownAttributes, R extends KnownRelationships = undefined> {
  data: Resource<Attr, R>[];
  included?: IncludedResource[];
  links: {
    self: string;
    first: string;
    last: string;
    next?: string;
  };
}
