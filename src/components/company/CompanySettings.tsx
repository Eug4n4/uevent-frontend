import type { CompanyService } from "@/lib/services/CompanyService";
import { useRouteLoaderData } from "react-router-dom";

export const CompanySettings = () => {
  const data = useRouteLoaderData<typeof CompanyService.getById>("company-profile");
  const company = data!.data;
  return <div>{company.attributes.name}</div>;
};
