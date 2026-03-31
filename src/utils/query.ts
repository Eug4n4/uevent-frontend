import type { KnownQueryParams } from "@/lib/services/types/types";

export const toUrlSearchParams = (params: KnownQueryParams) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => query.append(key, v));
    } else if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });
  return query;
};

type PaginationLinks = {
  self: string;
  first: string;
  last: string;
  next?: string;
  prev?: string;
};

export const getPageFromUrl = (url: string) => {
  const parsed = new URL(url);
  const offset = Number(parsed.searchParams.get("page[offset]") || 0);
  const limit = Number(parsed.searchParams.get("page[limit]") || 1);

  return Math.floor(offset / limit) + 1;
};

export const getTotalPages = (links: PaginationLinks) => {
  return getPageFromUrl(links.last);
};

export const formEndpointQueryString = (endpoint: string, query?: KnownQueryParams) => {
  let params: URLSearchParams;
  if (query) {
    params = toUrlSearchParams(query);
    endpoint += `?${params}`;
  }
  return endpoint;
};
