export interface TagAttributes {
  name: string;
  description?: string;
}

export interface TagRelationships {
  events: {
    data: {
      type: "event";
      id: string;
    };
  };
}

export interface TagDto extends TagAttributes {
  id: string;
}

export interface TagQueryParams {
  name?: string;
  "page[offset]": number;
  "page[limit]": number;
}
