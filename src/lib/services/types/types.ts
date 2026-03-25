import type { ProfileAttributes } from "../types/profile.types";
import type { AccountAttributes, AccountRelationships } from "./account.types";


type KnownAttributes = AccountAttributes | ProfileAttributes;
type KnownRelationships = AccountRelationships | undefined;
type ResourceType = "account" | "profile" | "event" | "company";

export interface ResponsePayload<Attr extends KnownAttributes, R extends KnownRelationships = undefined> {
  data: {
    id: string;
    type: ResourceType;
    attributes: Attr;
    relationships?: R;
  }
}

