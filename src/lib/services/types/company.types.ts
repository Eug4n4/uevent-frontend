import z from "zod";
import type { ResourceLocation } from "./types";

export interface CompanyAttributes {
  name: string;
  email: string;
  address: string;
  banner_url: string;
  location: ResourceLocation;
}

export interface CompanyUpdateAttributes extends Pick<CompanyAttributes, "name" | "address" | "location"> {}

export interface CompanyCreateAttributes extends Omit<CompanyAttributes, "banner_url"> {}

export interface CompanyDto extends CompanyAttributes {
  id: string;
}

export interface CompanyQueryParams {
  "page[offset]"?: number;
  "page[limit]"?: number;
  me?: boolean;
}

export const companyBillingCreateSchema = z.object({
  stripe_account_id: z.string().regex(/^acct.*/, { error: "Invalid stripe account id" }),
});

export type CompanyBillingCreateAttributes = z.infer<typeof companyBillingCreateSchema>;

export interface CompanyBillingAttributes {
  stripe_account_id: string;
  created_at: string;
}
