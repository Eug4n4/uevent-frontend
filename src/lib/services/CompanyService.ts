import { formEndpointQueryString } from "@/utils/query";
import { api } from "../api";
import type { CompanyAttributes, CompanyCreateAttributes, CompanyQueryParams } from "./types/company.types";
import type { ResponseArrayPayload, ResponsePayload } from "./types/types";
import { uploadFile } from "./utils";

export class CompanyService {
  static endpoint = "companies";

  static async create(payload: CompanyCreateAttributes) {
    const request = {
      data: {
        type: "company",
        attributes: payload,
      },
    };
    const response = await api.post<ResponsePayload<CompanyAttributes>>(CompanyService.endpoint, request);
    return response.data;
  }

  static async uploadBanner(file: Blob, id: string) {
    return uploadFile(file, `${CompanyService.endpoint}/${id}/banner`);
  }

  static async getMy(query?: CompanyQueryParams) {
    const response = await api.get<ResponseArrayPayload<CompanyAttributes>>(
      formEndpointQueryString(CompanyService.endpoint, query),
    );
    return response.data;
  }
}
