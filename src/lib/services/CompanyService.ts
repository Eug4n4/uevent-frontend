import { formEndpointQueryString } from "@/utils/query";
import { api } from "../api";
import type {
  CompanyAttributes,
  CompanyBillingAttributes,
  CompanyBillingCreateAttributes,
  CompanyCreateAttributes,
  CompanyQueryParams,
} from "./types/company.types";
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

  static async createBilling(payload: CompanyBillingCreateAttributes, companyId: string) {
    const request = {
      data: {
        type: "billing",
        attributes: payload,
      },
    };
    const response = await api.post(`${CompanyService.endpoint}/${companyId}/billing`, request);
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

  static async getById(id: string) {
    const response = await api.get<ResponsePayload<CompanyAttributes>>(`${CompanyService.endpoint}/${id}`);
    return response.data;
  }

  static async getBilling(companyId: string) {
    const response = await api.get<ResponsePayload<CompanyBillingAttributes>>(
      `${CompanyService.endpoint}/${companyId}/billing`,
    );
    return response.data;
  }
}
