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

const adminStats = [
  { label: 'Live events', value: '04', helper: 'publishing this month' },
  { label: 'Tickets sold', value: '238', helper: 'Stripe mocked receipts' },
  { label: 'Followers', value: '1.3K', helper: 'organizer subscribers' },
]

const myEvents = [
  {
    name: 'YabiYada Fintech Catchup',
    format: 'Conference',
    status: 'Ticketing open',
    visitors: '60 / 120',
  },
  {
    name: 'Soft Skills Sandbox',
    format: 'Workshop',
    status: 'Draft: poster ready',
    visitors: '18 / 35',
  },
  {
    name: 'Private Board Dinner',
    format: 'Lecture',
    status: 'Hidden: publish 14 days out',
    visitors: '12 / 24',
  },
]

const ticketLedger = [
  { code: '#NIC-4821', event: 'YabiYada Fintech Catchup', price: '€95', promo: 'NONE', status: 'Paid' },
  { code: '#NIC-4822', event: 'Soft Skills Sandbox', price: '€32', promo: 'CALM20', status: 'Paid' },
  { code: '#NIC-4823', event: 'LaLaLa Music + Civic Fest', price: 'FREE', promo: 'N/A', status: 'RSVP' },
]

const profileHints = [
  'Update display photo & tagline',
  'Toggle attendee visibility per event',
  'Edit company legal & redirect URL',
]

export function AdminPage() {
  const [showName, setShowName] = useState(true)

  return (
    <div className="app-shell admin-shell">
      <div className="aura aura-one"></div>
      <div className="aura aura-two"></div>

      <Header
        categories={categories}
        activeCategory={categories[0]}
        onSelect={() => undefined}
        showCategories={false}
      />

      <main className="admin-layout">
        <section className="story-panel">
          <p className="eyebrow">Admin console</p>
          <h2>Manage events, tickets, and privacy toggles</h2>
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
    </div>
  )
}
