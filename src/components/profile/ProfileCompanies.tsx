import { useMyCompanies } from "@/hooks/companies";
import { usePagePagination } from "@/hooks/pagination";
import Pagination from "@mui/material/Pagination";
import { useEffect } from "react";

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
          <article className="event-card" key={company.id}>
            <div className="card-head">
              <div>
                <h3>{company.name}</h3>
                <p className="event-summary">{company.email}</p>
              </div>
              <div style={{ width: 140, height: 140 }}>
                <img src={company.banner_url || "/favicon.svg"} alt="" className="poster-thumb" loading="lazy" />
              </div>
            </div>
          </article>
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
