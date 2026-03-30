import { useMemo, useState } from "react";

const ticketInfo = {
  label: "General admission",
  description: ["Access to every panel", "Email reminders + QR pass"],
  price: 95,
  currency: "EUR",
  available: 48,
};

export function EventCheckoutPage() {
  const [quantity, setQuantity] = useState(1);
  const [promo, setPromo] = useState("");

  const total = useMemo(() => {
    return ticketInfo.price * quantity;
  }, [quantity]);

  const adjustQty = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

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
          <article>
            <div>
              <strong>{ticketInfo.label}</strong>
              <span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: ticketInfo.currency,
                }).format(ticketInfo.price)}
              </span>
            </div>
            <ul>
              {ticketInfo.description.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            <p className="muted">{ticketInfo.available} total tickets released so far.</p>
          </article>
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
        <div className="quantity-row">
          <div className="qty-label">
            <span>Tickets</span>
            <small>{ticketInfo.available} available</small>
          </div>
          <div className="qty-controls">
            <button type="button" onClick={() => adjustQty(-1)}>
              −
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={() => adjustQty(1)}>
              +
            </button>
          </div>
        </div>
        <label>
          <span>Promo code</span>
          <div className="promo-row">
            <input type="text" placeholder="FROST20" value={promo} onChange={(e) => setPromo(e.target.value)} />
            <button type="button" className="pill-btn ghost">
              Apply
            </button>
          </div>
        </label>
        <div className="total-row">
          <span>Total (before Stripe)</span>
          <strong>€{total.toFixed(2)}</strong>
        </div>
        <label>
          <span>Stripe placeholder</span>
          <div className="stripe-mock">Stripe Elements will render here. Пока просто заглушка.</div>
        </label>
        <button type="button" className="primary-btn">
          Continue to Stripe (mock)
        </button>
      </section>
    </main>
  );
}
