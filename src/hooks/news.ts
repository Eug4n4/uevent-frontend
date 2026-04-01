import { NewsService } from "@/lib/services/NewsService";
import type { NewsDto, NewsQuery } from "@/lib/services/types/news.types";
import { useCallback, useState } from "react";
import type { PaginationLinks } from "./pagination";

type FetchNewsProps = {
  query?: NewsQuery;
  // eslint-disable-next-line no-unused-vars
  syncFromLinks?: (newLinks: PaginationLinks) => void;
};

export const useNews = () => {
  const [news, setNews] = useState<NewsDto[]>([]);

  const fetchNews = useCallback(async ({ query, syncFromLinks }: FetchNewsProps) => {
    const news = await NewsService.getAll(query);
    setNews(
      news.data.map((company) => {
        return {
          id: company.id,
          ...company.attributes,
        };
      }),
    );
    syncFromLinks?.(news.links);
  }, []);
  return {
    news,
    fetchNews,
  };
};
