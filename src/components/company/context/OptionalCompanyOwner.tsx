import { useOptionalAuth } from "@/components/auth/context/optional.auth";
import { useMyCompanies } from "@/hooks/companies";
import { useEffect, useMemo, type PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import { OptionalCompanyContext } from "./CompanyContext";

export const OptionalCompanyOwner: React.FC<PropsWithChildren> = ({ children }) => {
  const { authenticated } = useOptionalAuth();
  const { companies, isLoading, fetchCompanies } = useMyCompanies();
  const params = useParams();
  useEffect(() => {
    fetchCompanies({ query: { me: true } });
  }, [fetchCompanies]);

  const myCompany = useMemo(
    () => companies.find((company) => company.id === (params.id as string)),
    [companies, params.id],
  );

  return <OptionalCompanyContext value={{ isLoading, myCompany, authenticated }}>{children}</OptionalCompanyContext>;
};
