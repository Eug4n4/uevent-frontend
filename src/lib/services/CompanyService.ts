import { formEndpointQueryString } from "@/utils/query";
import { api } from "../api";
import type { CompanyAttributes, CompanyQueryParams } from "./types/company.types";
import type { ResponseArrayPayload } from "./types/types";

export class CompanyService {
  static endpoint = "companies";
  static async getMy(query?: CompanyQueryParams) {
    const response = await api.get<ResponseArrayPayload<CompanyAttributes>>(
      formEndpointQueryString(CompanyService.endpoint, query),
    );
    return response.data;
  }
}
