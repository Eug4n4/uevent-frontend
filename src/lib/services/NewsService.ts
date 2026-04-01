import { api } from "../api";
import type { NewsAttributes, NewsRelationships } from "./types/news.types";
import type { ResponsePayload } from "./types/types";

export class NewsService {
  static endpoint = "news";
  static async create(payload: NewsAttributes, companyId: string) {
    const request = {
      data: {
        type: "news",
        attributes: payload,
        relationships: {
          company: {
            data: {
              id: companyId,
              type: "company",
            },
          },
        },
      },
    };
    const response = await api.post<ResponsePayload<NewsAttributes, NewsRelationships>>(NewsService.endpoint, request);
    return response.data;
  }
}
