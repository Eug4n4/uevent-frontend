import type { ProfileAttributes } from "../types/profile.types";
import type { AccountAttributes, AccountRelationships } from "./account.types";
import type { CompanyAttributes, CompanyQueryParams } from "./company.types";
import type {
  EventAttributes,
  EventCreateAttributes,
  EventIncluded,
  EventQueryParams,
  EventRelationships,
} from "./event.types";
import type { TagAttributes, TagQueryParams, TagRelationships } from "./tag.types";

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
  | CompanyAttributes;
type KnownRelationships = AccountRelationships | TagRelationships | EventRelationships | undefined;
type KnownIncluded = EventIncluded | undefined;
type ResourceType = "account" | "profile" | "event" | "company" | "comment" | "tag";
export type KnownQueryParams = TagQueryParams | EventQueryParams | CompanyQueryParams;

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

type CompanyResource = Resource<CompanyAttributes> & {
  type: "company";
};

type AccountResource = Resource<AccountAttributes> & {
  type: "account";
};

type ProfileResource = Resource<ProfileAttributes> & {
  type: "profile";
};

type IncludedResource = CompanyResource | AccountResource | ProfileResource;

export interface ResponsePayload<
  Attr extends KnownAttributes,
  R extends KnownRelationships = undefined,
  I extends KnownIncluded = undefined,
> {
  data: Resource<Attr, R>;
  included?: I;
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
