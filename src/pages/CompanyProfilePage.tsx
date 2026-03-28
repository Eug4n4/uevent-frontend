const company = {
  name: "Placeholder Ventures",
  mission: "Mock company page so бек может оценить структуру",
  followers: "1.3K",
  email: "team@placeholder.co",
  location: "Oslo, Norway",
  redirect: "https://nice.app/mock-company",
};

const companyEvents = [
  { title: "YabiYada Fintech Catchup", date: "12 Feb 2025", status: "Live" },
  { title: "Private Board Dinner", date: "28 Feb 2025", status: "Scheduled" },
];

export function CompanyProfilePage() {
  return (
    <main className="company-layout">
      <section className="story-panel">
        <p className="eyebrow">Company profile</p>
        <h2>{company.name}</h2>
        <p className="lead">{company.mission}</p>
        <div className="company-meta">
          <span>{company.followers} followers</span>
          <span>{company.location}</span>
          <span>{company.email}</span>
        </div>
        <div className="detail-cta">
          <button type="button" className="primary-btn">
            Follow company
          </button>
          <button type="button" className="pill-btn logout-btn">
            Log out
          </button>
        </div>
      </section>

      <section className="company-card">
        <h3>Events by this company</h3>
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
        <button type="button" className="primary-btn ghost">
          Create new event
        </button>
      </section>

      <section className="company-card">
        <h3>Contact & redirects</h3>
        <p>Email: {company.email}</p>
        <p>Location: {company.location}</p>
        <p>Post-purchase redirect: {company.redirect}</p>
        <div className="map-placeholder">
          <p>Office map placeholder</p>
          <span>Гугл мапс появится позже.</span>
        </div>
      </section>
    </main>
  );
}
