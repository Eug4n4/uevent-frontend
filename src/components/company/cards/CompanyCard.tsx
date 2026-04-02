import type { CompanyDto } from "@/lib/services/types/company.types";
import { useNavigate } from "react-router-dom";

type CompanyCardProps = {
  company: CompanyDto;
};

export const CompanyCard = ({ company }: CompanyCardProps) => {
  const navigate = useNavigate();
  return (
    <article className="event-card" key={company.id} onClick={() => navigate(`/company/${company.id}`)}>
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
  );
};
