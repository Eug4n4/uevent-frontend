const managedEvents = [
  { id: "ev-north", name: "YabiYada Fintech Catchup" },
  { id: "ev-softskills", name: "Soft Skills Sandbox" },
];

export function CompanyTicketManagerPage() {
  return (
    <main className="create-layout">
      <section className="story-panel">
        <p className="eyebrow">Ticket & promo setup</p>
        <h2>Configure inventory for published events</h2>
        <p className="lead">Компания выбирает одно из своих мероприятий, после чего добавляет набор билетов и промокоды.</p>
        <ul className="profile-task-list">
          <li>Create at least one ticket tier before publishing</li>
          <li>Promo codes live independently from the public event</li>
          <li>Totals sync with the attendee checkout counter</li>
        </ul>
      </section>

      <form className="create-form">
        <fieldset>
          <legend>Select event</legend>
          <label>
            <span>Event</span>
            <select>
              {managedEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Total tickets available</span>
            <input type="number" placeholder="120" />
          </label>
        </fieldset>

        <fieldset>
          <legend>Promo codes</legend>
          <label>
            <span>Code</span>
            <input type="text" placeholder="FROST20" />
          </label>
          <label>
            <span>Discount (%)</span>
            <input type="number" placeholder="20" />
          </label>
          <label>
            <span>Usage limit</span>
            <input type="number" placeholder="100" />
          </label>
          <button type="button" className="pill-btn">
            Add promo code
          </button>
        </fieldset>

        <div className="form-actions">
          <button type="button" className="pill-btn">
            Save draft
          </button>
          <button type="submit" className="primary-btn">
            Publish availability
          </button>
        </div>
      </form>
    </main>
  );
}
