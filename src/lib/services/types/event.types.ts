import type { CompanyDto } from "./company.types";

export interface EventAttributes {
  title: string;
  text: string;
  status: string;
  banner_url: string;
  format: string;
  publish_at: string;
  start_at: string;
  end_at: string;
  company?: EventIncluded;
}

export interface EventIncluded extends CompanyDto {}

export interface EventRelationships {
  company: {
    data: {
      type: "company";
      id: string;
    };
  };
  tags?: {
    data: [
      {
        id: string;
        type: "tag";
      },
    ];
  };
}

export interface EventDto extends EventAttributes {
  id: string;
}

export interface EventQueryParams {
  "page[offset]"?: number;
  "page[limit]"?: number;
  published?: boolean[] | boolean;
  company_id?: string;
  format?: string;
  include?: string;
  tag_id?: string[];
  sort?: string;
}
