import type { CompanyDto } from "@/lib/services/types/company.types";
import { createContext } from "react";

interface IOptionalCompanyOwner {
  isLoading: boolean;
  authenticated: boolean;
  myCompany?: CompanyDto;
}

export const OptionalCompanyContext = createContext<IOptionalCompanyOwner | null>(null);
