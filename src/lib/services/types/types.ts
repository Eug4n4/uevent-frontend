import type { ProfileAttributes } from "../types/profile.types";
import type { AccountAttributes, AccountRelationships } from "./account.types";
import type { EventAttributes, EventQueryParams, EventRelationships } from "./event.types";
import type { TagAttributes, TagQueryParams, TagRelationships } from "./tag.types";

type KnownAttributes = AccountAttributes | ProfileAttributes | TagAttributes | EventAttributes;
type KnownRelationships = AccountRelationships | TagRelationships | EventRelationships | undefined;
type ResourceType = "account" | "profile" | "event" | "company" | "comment" | "tag";
export type KnownQueryParams = TagQueryParams | EventQueryParams;

type Resource<Attr extends KnownAttributes, R extends KnownRelationships = undefined> = {
  id: string;
  type: ResourceType;
  attributes: Attr;
  relationships?: R;
};

export interface ResponsePayload<Attr extends KnownAttributes, R extends KnownRelationships = undefined> {
  data: Resource<Attr, R>;
}

export interface ResponseArrayPayload<Attr extends KnownAttributes, R extends KnownRelationships = undefined> {
  data: Resource<Attr, R>[];
  links: {
    self: string;
    first: string;
    last: string;
    next?: string;
  };
}
