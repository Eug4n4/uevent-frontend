import { useMyCompanies } from "@/hooks/companies";
import { usePagePagination } from "@/hooks/pagination";
import Pagination from "@mui/material/Pagination";
import { useEffect } from "react";
import { CompanyCard } from "../company/cards/CompanyCard";

const PAGE_LIMIT = 3;

const ProfileCompanies = () => {
  const { companies, fetchCompanies } = useMyCompanies();
  const { page, setPage, total, syncFromLinks, buildQuery } = usePagePagination(PAGE_LIMIT);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    fetchCompanies({ query: buildQuery({ me: true }), syncFromLinks });
  }, [buildQuery, syncFromLinks, fetchCompanies]);

  const getMyCompanies = () => {
    if (companies === undefined || companies.length === 0) {
      return <p>You don't have any companies</p>;
    }
    return (
      <>
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </>
    );
  };

  return (
    <>
      <h3>My companies</h3>
      {getMyCompanies()}
      <div className="pagination-container">
        <Pagination page={page} count={total} onChange={(_, value) => setPage(value)} size="large" />
      </div>
    </>
  );
};

export default ProfileCompanies;
