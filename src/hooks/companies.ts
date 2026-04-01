import { CompanyService } from "@/lib/services/CompanyService";
import type { CompanyDto, CompanyQueryParams } from "@/lib/services/types/company.types";
import { useCallback, useState } from "react";
import type { PaginationLinks } from "./pagination";

type FetchCompaniesProps = {
  query?: CompanyQueryParams;
  // eslint-disable-next-line no-unused-vars
  syncFromLinks?: (newLinks: PaginationLinks) => void;
};

export const useMyCompanies = () => {
  const [companies, setCompanies] = useState<CompanyDto[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchCompanies = useCallback(async ({ query, syncFromLinks }: FetchCompaniesProps) => {
    const companies = await CompanyService.getMy(query);
    setCompanies(
      companies.data.map((company) => {
        return {
          id: company.id,
          ...company.attributes,
        };
      }),
    );
    syncFromLinks?.(companies.links);
    setLoading(false);
  }, []);
  return {
    companies,
    fetchCompanies,
    isLoading,
  };
};
