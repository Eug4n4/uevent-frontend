import type { ResourceLocation } from "./types";

export interface CompanyAttributes {
  name: string;
  email: string;
  address: string;
  banner_url: string;
  location: ResourceLocation;
}

export interface CompanyCreateAttributes extends Omit<CompanyAttributes, "banner_url"> {}

export interface CompanyDto extends CompanyAttributes {
  id: string;
}

export interface CompanyQueryParams {
  "page[offset]"?: number;
  "page[limit]"?: number;
  me?: boolean;
}
