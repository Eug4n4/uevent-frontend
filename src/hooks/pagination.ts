import { getPageFromUrl, getTotalPages } from "@/utils/query";
import { useCallback, useState } from "react";

export type PaginationLinks = {
  self: string;
  first: string;
  last: string;
  next?: string;
  prev?: string;
};

export const usePagePagination = (limit: number) => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  const syncFromLinks = useCallback((newLinks: PaginationLinks) => {
    setPage(getPageFromUrl(newLinks.self));
    setTotal(getTotalPages(newLinks));
  }, []);

  const buildQuery = useCallback(
    (extraParams = {}) => ({
      ...extraParams,
      "page[offset]": (page - 1) * limit,
      "page[limit]": limit,
    }),
    [page, limit],
  );

  return {
    page,
    total,
    setPage,
    buildQuery,
    syncFromLinks,
  };
};
