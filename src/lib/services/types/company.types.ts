export interface CompanyAttributes {
  name: string;
  email: string;
  address: string;
  banner_url: string;
}

export interface CompanyDto extends CompanyAttributes {
  id: string;
}

export interface CompanyQueryParams {
  "page[offset]"?: number;
  "page[limit]"?: number;
  me?: boolean;
}
