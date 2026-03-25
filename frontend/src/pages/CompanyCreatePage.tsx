import { Header } from '../components/Header'

const categories = [
  'Conferences',
  'Lectures',
  'Workshops',
  'Fests',
  'Retreats',
  'Community Labs',
]

const checklist = [
  'Company name, email, location are required per spec',
  'Upload a logo/poster to use across events',
  'Plan redirect URL for event buyers',
]

export function CompanyCreatePage() {

  return (
    <div className="app-shell">
      <div className="aura aura-one"></div>
      <div className="aura aura-two"></div>

      <Header
        categories={categories}
        activeCategory={categories[0]}
        onSelect={() => undefined}
        showCategories={false}
      />

      <main className="create-layout">
        <section className="story-panel">
          <p className="eyebrow">Create company</p>
          <h2>Your brand space for events</h2>
          <p className="lead">
            This mock form mirrors every field backend teammates expect: legal info, contact,
            and redirect links. Replace with real data once APIs are wired.
          </p>
          <ul className="profile-task-list">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <form className="create-form">
          {/* форма-заготовка, чтоб показать все поля */}
          <fieldset>
            <legend>Company basics</legend>
            <label>
              <span>Company name</span>
              <input type="text" placeholder="Placeholder Ventures" />
            </label>
            <label>
              <span>Public tagline</span>
              <input type="text" placeholder="Hybrid events for curious people" />
            </label>
            <label>
              <span>Contact email</span>
              <input type="email" placeholder="founders@placeholder.co" />
            </label>
            <label>
              <span>Location / HQ</span>
              <input type="text" placeholder="Oslo, Norway" />
            </label>
          </fieldset>

          <fieldset>
            <legend>Description</legend>
            <label>
              <span>About the company</span>
              <textarea rows={4} placeholder="Share a short mission statement for the profile page." />
            </label>
          </fieldset>

          <fieldset>
            <legend>Links & redirect</legend>
            <label>
              <span>Website</span>
              <input type="url" placeholder="https://nice.app" />
            </label>
            <label>
              <span>Redirect URL after ticket purchase</span>
              <input type="url" placeholder="https://nice.app/thanks" />
            </label>
            <label>
              <span>Support / helpdesk link</span>
              <input type="url" placeholder="https://help.nice.app" />
            </label>
          </fieldset>

          <fieldset>
            <legend>Branding</legend>
            <div className="upload-drop">
              <p>Upload company logo / poster</p>
              <small>PNG/SVG preferred. Optional — default ice cube mascot otherwise.</small>
            </div>
          </fieldset>

          <fieldset>
            <legend>Office location</legend>
            <label>
              <span>Address</span>
              <input type="text" placeholder="Fjord Street 12" />
            </label>
            <div className="map-placeholder">
              <p>Google Maps placeholder</p>
              <span>We will drop the actual map picker here later.</span>
            </div>
          </fieldset>

          <div className="form-actions">
            <button type="button" className="pill-btn">
              Save draft
            </button>
            <button type="submit" className="primary-btn">
              Publish company profile
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
