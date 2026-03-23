import { useState } from "react"


const adminStats = [
  { label: "Live events", value: "04", helper: "publishing this month" },
  { label: "Tickets sold", value: "238", helper: "Stripe mocked receipts" },
  { label: "Followers", value: "1.3K", helper: "organizer subscribers" },
]

const myEvents = [
  {
    name: "YabiYada Fintech Catchup",
    format: "Conference",
    status: "Ticketing open",
    visitors: "60 / 120",
    notify: "new visitors: on",
  },
  {
    name: "Soft Skills Sandbox",
    format: "Workshop",
    status: "Draft: poster ready",
    visitors: "18 / 35",
    notify: "new visitors: on",
  },
  {
    name: "Private Board Dinner",
    format: "Lecture",
    status: "Hidden: publish 14 days out",
    visitors: "12 / 24",
    notify: "new visitors: off",
  },
]

const ticketLedger = [
  { code: "#NIC-4821", event: "YabiYada Fintech Catchup", price: "€95", promo: "NONE", status: "Paid" },
  { code: "#NIC-4822", event: "Soft Skills Sandbox", price: "€32", promo: "CALM20", status: "Paid" },
  { code: "#NIC-4823", event: "LaLaLa Music + Civic Fest", price: "FREE", promo: "N/A", status: "RSVP" },
]

const notifications = [
  { title: "New comment on Soft Skills Sandbox", time: "2m ago", type: "comment" },
  { title: "Ticket payout processed (mock Stripe)", time: "30m ago", type: "payout" },
  { title: "Promo CALM20 redeemed 3x", time: "1h ago", type: "promo" },
]

const profileHints = [
  "Update display photo & tagline",
  "Toggle attendee visibility per event",
  "Edit company legal & redirect URL",
]

export function AdminPage() {
  const [showName, setShowName] = useState(true)
  const [notifyVisitors, setNotifyVisitors] = useState(true)

  return (
    <main className="admin-layout">
      <section className="story-panel">
        <p className="eyebrow">Admin console</p>
        <h2>Manage events, tickets, notifications, and privacy toggles</h2>
        <p className="lead">
          Everything here is mocked but wired to the same components we will use once auth
          and real data arrive. Each block mirrors the backend requirements for the demo.
        </p>
        <div className="toggle-row">
          <label>
            <input
              type="checkbox"
              checked={showName}
              onChange={() => setShowName((value) => !value)}
            />
            Show my name on attendee lists
          </label>
          <label>
            <input
              type="checkbox"
              checked={notifyVisitors}
              onChange={() => setNotifyVisitors((value) => !value)}
            />
            Notify me about new visitors
          </label>
        </div>
      </section>

      <section className="admin-grid">
        {adminStats.map((stat) => (
          <article className="admin-card" key={stat.label}>
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
            <span>{stat.helper}</span>
          </article>
        ))}
      </section>

      <section className="admin-section">
        <header>
          <div>
            <p className="eyebrow">My events</p>
            <h3>Publishing schedule</h3>
          </div>
          <button type="button" className="pill-btn">
            Create event
          </button>
        </header>
        <div className="admin-table">
          {myEvents.map((event) => (
            <article key={event.name}>
              <div>
                <strong>{event.name}</strong>
                <span>{event.format}</span>
              </div>
              <div>
                <span>Status</span>
                <p>{event.status}</p>
              </div>
              <div>
                <span>Visitors</span>
                <p>{event.visitors}</p>
              </div>
              <div>
                <span>Alerts</span>
                <p>{event.notify}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <header>
          <div>
            <p className="eyebrow">Tickets</p>
            <h3>Recent ticket activity</h3>
          </div>
          <button type="button" className="pill-btn">
            Export mock CSV
          </button>
        </header>
        <ul className="ledger-list">
          {ticketLedger.map((ticket) => (
            <li key={ticket.code}>
              <div>
                <strong>{ticket.code}</strong>
                <span>{ticket.event}</span>
              </div>
              <div>
                <span>{ticket.price}</span>
                <small>Promo: {ticket.promo}</small>
              </div>
              <span className="badge success">{ticket.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="admin-flex">
        <article className="admin-section compact">
          <header>
            <div>
              <p className="eyebrow">Notifications</p>
              <h3>What the system will send</h3>
            </div>
          </header>
          <ul className="notification-list">
            {notifications.map((note) => (
              <li key={note.title}>
                <div>
                  <strong>{note.title}</strong>
                  <span>{note.time}</span>
                </div>
                <span className="badge">{note.type}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="admin-section compact">
          <header>
            <div>
              <p className="eyebrow">Profile & company</p>
              <h3>Quick tasks</h3>
            </div>
          </header>
          <ul className="profile-task-list">
            {profileHints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button type="button" className="primary-btn ghost">
            Open company workspace
          </button>
        </article>
      </section>
    </main>
  )
}
