import { CompanyProfileTopMenu } from "@/components/company/CompanyProfileTopMenu";
import { Outlet } from "react-router-dom";

export function CompanyProfilePage() {
  return (
    <main className="company-layout">
      <CompanyProfileTopMenu />
      <Outlet />
    </main>
  );
}
