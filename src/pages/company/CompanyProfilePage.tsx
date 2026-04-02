import { useOptionalCompanyOwner } from "@/components/company/context/optional.owner";
import { MapPreview } from "@/components/MapPreview";
import { useNews } from "@/hooks/news";
import { usePagePagination } from "@/hooks/pagination";
import { CompanyService } from "@/lib/services/CompanyService";
import { toDateTimeString } from "@/utils/format.date";
import Pagination from "@mui/material/Pagination";
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const PAGE_LIMIT = 3;

export function CompanyProfilePage() {
  const { data: company } = useLoaderData<typeof CompanyService.getById>();
  const { page, setPage, total, syncFromLinks, buildQuery } = usePagePagination(PAGE_LIMIT);
  const { authenticated, myCompany } = useOptionalCompanyOwner();
  const { news, fetchNews } = useNews();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews({ query: buildQuery({ company_id: company.id }), syncFromLinks });
  }, [fetchNews, buildQuery, syncFromLinks, company.id]);

  return (
    <main className="company-layout">
      <section className="story-panel">
        <p className="eyebrow">Company profile</p>
        <h2>{company.attributes.name}</h2>
        <section className="company-card">
          <h3>Contact information</h3>
          <p>Email: {company.attributes.email}</p>
          <p>Location: {company.attributes.address}</p>

          <MapPreview
            position={{ lat: company.attributes.location.latitude, lng: company.attributes.location.longitude }}
          />
        </section>
      </section>

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
    </main>
  );
}
