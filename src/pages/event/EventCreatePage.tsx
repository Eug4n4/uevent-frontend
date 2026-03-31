import { useState } from "react";
import { MapPreview } from "@/components/MapPreview";

// подсказки чисто для презентации
const hints = [
  "Poster upload optional — default art will be used otherwise",
  "Choose who sees attendees: everyone or confirmed visitors",
  "Pick a publication date (immediate or schedule ahead)",
  "Redirect URL is where buyers land after Stripe confirmation",
];

export function EventCreatePage() {
  const [visibility, setVisibility] = useState<"everyone" | "attendees">("everyone");

  return (
    <main className="create-layout">
      <section className="story-panel">
        <p className="eyebrow">Create event</p>
        <h2>All config knobs the backend asked for</h2>
        <p className="lead">
          This form is purely illustrative — it mirrors the required fields: posters, attendee visibility, publication
          timing, and redirect URL.
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
          <MapPreview query="Warehouse Pier, Gdansk" />
        </fieldset>

        <fieldset>
          <legend>Redirects</legend>
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
          <legend>Attendee privacy</legend>
          <div className="radio-group">
            <span>Attendee list visible to</span>
            <label>
              <input type="radio" checked={visibility === "everyone"} onChange={() => setVisibility("everyone")} />
              Everyone
            </label>
            <label>
              <input type="radio" checked={visibility === "attendees"} onChange={() => setVisibility("attendees")} />
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
  );
}
