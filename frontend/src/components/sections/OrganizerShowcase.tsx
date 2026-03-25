import { Link } from 'react-router-dom'

type OrganizerSpotlight = {
  name: string
  mission: string
  metrics: string[]
  entrypoint: string
  path: string
}

type OrganizerShowcaseProps = {
  spotlights: OrganizerSpotlight[]
}

export function OrganizerShowcase({ spotlights }: OrganizerShowcaseProps) {
  return (
    <section className="organizer-showcase" id="companies">
      <div>
        <p className="eyebrow">Companies</p>
        <h3>Organizers expand their reach through nICE</h3>
        <p>
          This is where we demo company creation and both event-creation flows (with or without a poster).
        </p>
      </div>
      <div className="spotlight-grid">
        {spotlights.map((spotlight) => (
          <article key={spotlight.name}>
            <header>
              <h4>{spotlight.name}</h4>
              <p>{spotlight.mission}</p>
            </header>
            <ul>
              {spotlight.metrics.map((metric) => (
                <li key={metric}>{metric}</li>
              ))}
            </ul>
            <Link to={spotlight.path} className="pill-btn link-reset">
              {spotlight.entrypoint}
            </Link>
         </article>
       ))}
     </div>
   </section>
 )
}
