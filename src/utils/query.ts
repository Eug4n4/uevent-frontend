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
