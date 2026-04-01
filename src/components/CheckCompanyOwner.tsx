import { useMyCompanies } from "@/hooks/companies";
import { useEffect, useMemo, type PropsWithChildren } from "react";
import { Navigate, useParams } from "react-router-dom";

export const CheckCompanyOwner: React.FC<PropsWithChildren> = ({ children }) => {
  const { companies, isLoading, fetchCompanies } = useMyCompanies();
  const params = useParams();
  useEffect(() => {
    fetchCompanies({ query: { me: true } });
  }, [fetchCompanies]);
  const myCompany = useMemo(
    () => companies.find((company) => company.id === (params.id as string)),
    [companies, params.id],
  );
  if (isLoading) {
    return null;
  }

  if (myCompany) {
    return children;
  }
  return <Navigate to={"/"} />;
};
