
const ticketOptions = [
  { label: "General admission", price: "€95", perks: ["Access to panels", "Mock reminders via email"] },
  { label: "Workshop add-on", price: "€25", perks: ["Hands-on session", "Priority check-in"] },
]

export function EventCheckoutPage() {
  return (
   
    <main className="checkout-layout">
      <section className="story-panel">
        <p className="eyebrow">Step 1 · Review</p>
        <h2>Confirm your ticket before Stripe</h2>
        <p className="lead">
          Тут показываем сводку заказа и напоминание, что оплата пройдёт через Stripe (фейк на демо).
        </p>
        <ul className="profile-task-list">
          <li>Email ticket will be sent right after payment</li>
          <li>Reminder 24h before the event</li>
          <li>QR code unlocks attendee list if you keep your name visible</li>
        </ul>
      </section>

      <section className="checkout-card">
        <h3>Ticket summary</h3>
        <div className="checkout-summary">
          {ticketOptions.map((option) => (
            <article key={option.label}>
              <div>
                <strong>{option.label}</strong>
                <span>{option.price}</span>
              </div>
              <ul>
                {option.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
              <button type="button" className="pill-btn">
                Select option
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="checkout-card">
        <h3>Payment & attendee info</h3>
        <label>
          <span>Attendee name</span>
          <input type="text" placeholder="Alex Example" />
        </label>
        <label>
          <span>Email (tickets arrive here)</span>
          <input type="email" placeholder="alex@example.com" />
        </label>
        <label>
          <span>Stripe placeholder</span>
          <div className="stripe-mock">
            Stripe Elements will render here. Пока просто заглушка.
          </div>
        </label>
        <button type="button" className="primary-btn">
          Continue to Stripe (mock)
        </button>
      </section>
    </main>
  )
}
