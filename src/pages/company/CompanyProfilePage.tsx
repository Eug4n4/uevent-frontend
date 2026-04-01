import { MapPreview } from "@/components/MapPreview";
import { CompanyService } from "@/lib/services/CompanyService";
import { useLoaderData, useNavigate } from "react-router-dom";

const companyEvents = [
  { title: "YabiYada Fintech Catchup", date: "12 Feb 2025", status: "Live" },
  { title: "Private Board Dinner", date: "28 Feb 2025", status: "Scheduled" },
];

export function CompanyProfilePage() {
  const { data: company } = useLoaderData<typeof CompanyService.getById>();
  const navigate = useNavigate();

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
          <button type="button" className="primary-btn ghost" onClick={() => navigate("news")}>
            Create news
          </button>
        </div>
        <ul className="subscription-list">
          {companyEvents.map((event) => (
            <li key={event.title}>
              <div>
                <strong>{event.title}</strong>
                <span>{event.date}</span>
              </div>
              <span className="badge">{event.status}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* <section className="company-card">
        <h3>Contact information</h3>
        <p>Email: {company.attributes.email}</p>
        <p>Location: {company.attributes.address}</p>

        <MapPreview
          position={{ lat: company.attributes.location.latitude, lng: company.attributes.location.longitude }}
        />
      </section> */}
    </main>
  );
}
