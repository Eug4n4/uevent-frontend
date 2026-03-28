type HeroSectionProps = {
  category: string;
  highlights: Array<{ label: string; value: string }>;
  scenarios: string[];
};

export function HeroSection({ category, highlights, scenarios }: HeroSectionProps) {
  return (
    <section className="hero-grid" id="home">
      <div className="story-panel">
        <p className="eyebrow">Powered by nICE</p>
        <h2>Chilled spaces for warm introductions</h2>
        <p className="lead">
          nICE curates {category.toLowerCase()} for any social energy level—scroll, prep a talk, or spin up invite-only
          salons without context switching.
        </p>

        <div className="chips-row">
          <span className="chip">Instant tickets</span>
          <span className="chip glow">Organizer alerts</span>
          <span className="chip">Private attendee mode</span>
        </div>

        <div className="highlight-panel">
          {highlights.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <aside className="hero-side">
        <p className="eyebrow">Demo storyline</p>
        <h3>Home → Event → Payment → Dashboard</h3>
        <ul>
          {scenarios.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
