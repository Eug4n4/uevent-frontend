import { useState } from 'react'
import { Header } from '../components/Header'

const categories = [
  'Conferences',
  'Lectures',
  'Workshops',
  'Fests',
  'Retreats',
  'Community Labs',
]

// подсказки чисто для презентации
const hints = [
  'Poster upload optional — default art will be used otherwise',
  'Choose who sees attendees: everyone or confirmed visitors',
  'Pick a publication date (immediate or schedule ahead)',
  'Promo codes are optional but nice to show in the demo',
  'Redirect URL is where buyers land after Stripe confirmation',
]

export function EventCreatePage() {
  const [notify, setNotify] = useState(true)
  const [visibility, setVisibility] = useState<'everyone' | 'attendees'>('everyone')

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
          <p className="eyebrow">Create event</p>
          <h2>All config knobs the backend asked for</h2>
          <p className="lead">
            This form is purely illustrative — it mirrors the required fields: posters, notifications,
            attendee visibility, publication timing, promo codes, and redirect URL.
          </p>
          <ul className="profile-task-list">
            {hints.map((hint) => (
              <li key={hint}>{hint}</li>
            ))}
          </ul>
        </section>

        <form className="create-form">
          {/* всё ниже — болванка, ждёт настоящего сабмита */}
          <fieldset>
            <legend>Basics</legend>
            <label>
              <span>Event title</span>
              <input type="text" placeholder="LaLaLa Music + Civic Fest" />
            </label>
            <label>
              <span>Format</span>
              <select>
                <option>Conference</option>
                <option>Lecture</option>
                <option>Workshop</option>
                <option>Fest</option>
              </select>
            </label>
            <label>
              <span>Theme</span>
              <select>
                <option>Business</option>
                <option>Politics</option>
                <option>Psychology</option>
                <option>Tech</option>
              </select>
            </label>
            <label>
              <span>Description</span>
              <textarea rows={4} placeholder="Add a quick mock description" />
            </label>
          </fieldset>

          <fieldset>
            <legend>Schedule & location</legend>
            <label>
              <span>Date & time</span>
              <input type="datetime-local" />
            </label>
            <label>
              <span>Address</span>
              <input type="text" placeholder="Warehouse Pier, Gdansk" />
            </label>
            <div className="map-placeholder">
              <p>Google Maps picker placeholder</p>
              <span>We will drop a map component here when the API key is ready.</span>
            </div>
          </fieldset>

          <fieldset>
            <legend>Tickets & promos</legend>
            <label>
              <span>Base price</span>
              <input type="number" placeholder="95" />
            </label>
            <label>
              <span>Promo codes</span>
              <textarea rows={3} placeholder="CALM20 - 20%\nFROST10 - 10%\nVIPFREE - 100%" />
            </label>
            <label>
              <span>Redirect URL after payment</span>
              <input type="url" placeholder="https://nice.app/thank-you" />
            </label>
          </fieldset>

          <fieldset>
            <legend>Poster upload</legend>
            <div className="upload-drop">
              <p>Drop poster here or click to upload</p>
              <small>JPG/PNG, 2MB limit — optional, default art if empty.</small>
            </div>
          </fieldset>

          <fieldset>
            <legend>Notifications & privacy</legend>
            <label className="toggle-inline">
              <input
                type="checkbox"
                checked={notify}
                onChange={() => setNotify((value) => !value)}
              />
              Notify me about every new visitor
            </label>
            <div className="radio-group">
              <span>Attendee list visible to</span>
              <label>
                <input
                  type="radio"
                  checked={visibility === 'everyone'}
                  onChange={() => setVisibility('everyone')}
                />
                Everyone
              </label>
              <label>
                <input
                  type="radio"
                  checked={visibility === 'attendees'}
                  onChange={() => setVisibility('attendees')}
                />
                Only confirmed attendees
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Publication</legend>
            <label>
              <span>Publish date</span>
              <input type="date" />
            </label>
            <label>
              <span>Auto-publish?</span>
              <select>
                <option>Publish immediately</option>
                <option>Schedule +14 days</option>
                <option>Custom date</option>
              </select>
            </label>
          </fieldset>

          <div className="form-actions">
            <button type="button" className="pill-btn">
              Save draft
            </button>
            <button type="submit" className="primary-btn">
              Publish mock event
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
