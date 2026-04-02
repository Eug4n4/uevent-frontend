import { useNews } from "@/hooks/news";
import { usePagePagination } from "@/hooks/pagination";
import type { CompanyService } from "@/lib/services/CompanyService";
import { toDateTimeString } from "@/utils/format.date";
import Pagination from "@mui/material/Pagination";
import { useEffect } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { useOptionalCompanyOwner } from "./context/optional.owner";

const PAGE_LIMIT = 3;

export const CompanyNews = () => {
  const data = useRouteLoaderData<typeof CompanyService.getById>("company-profile");
  const company = data!.data;
  const { authenticated, myCompany } = useOptionalCompanyOwner();
  const { page, setPage, total, syncFromLinks, buildQuery } = usePagePagination(PAGE_LIMIT);

  const { news, fetchNews } = useNews();

  useEffect(() => {
    fetchNews({ query: buildQuery({ company_id: company.id }), syncFromLinks });
  }, [fetchNews, buildQuery, syncFromLinks, company.id]);

  const navigate = useNavigate();
  return (
    <section className="company-card">
      <div className="header">
        <h3>Company news</h3>
        {authenticated && myCompany && (
          <button type="button" className="primary-btn ghost" onClick={() => navigate("news")}>
            Create news
          </button>
        )}
      </div>
      <ul className="subscription-list">
        {news.map((value) => (
          <li key={value.id}>
            <div>
              <strong>{value.name}</strong>
              <p>{value.text}</p>
            </div>
            <span>Created at: {toDateTimeString(value.created_at)}</span>
          </li>
        ))}
      </ul>
      <div className="pagination-container">
        <Pagination page={page} count={total} onChange={(_, value) => setPage(value)} size="large" />
      </div>
    </section>
  );
};
