import { useState } from "react"

const subscriptions = [
  { title: "YabiYada Fintech Catchup", status: "Subscribed", organizer: "@mockventures" },
  { title: "Soft Skills Sandbox", status: "Subscribed", organizer: "@talkingheads" },
]

const tickets = [
  { code: "#NIC-4821", event: "YabiYada Fintech Catchup", seat: "Free roam", status: "ready" },
  { code: "#NIC-4822", event: "Soft Skills Sandbox", seat: "Row B · 09", status: "emailed" },
]

export function UserProfilePage() {
  const [avatar, setAvatar] = useState("https://placehold.co/160x160?text=nICE")

  return (
    <div className="app-shell">
      <div className="aura aura-one"></div>
      <div className="aura aura-two"></div>


      <main className="profile-layout">
        <section className="story-panel">
          <p className="eyebrow">User profile</p>
          <h2>Control your avatar, subs, and tickets</h2>
          <p className="lead">
            Все моково — когда появится реальный бек, просто подставим ответы профиля.
          </p>
          <button type="button" className="pill-btn logout-btn">
            Log out
          </button>
        </section>

        <section className="profile-card">
          <h3>Avatar</h3>
          <div className="avatar-block">
            <img src={avatar} alt="profile avatar" />
            <button
              type="button"
              className="pill-btn"
              onClick={() => setAvatar("https://placehold.co/160x160?text=COOL")}
            >
              Upload placeholder
            </button>
          </div>
          <label>
            <span>Display name</span>
            <input type="text" placeholder="nICE explorer" />
          </label>
          <label>
            <span>Bio</span>
            <textarea rows={3} placeholder="Describe yourself for attendees." />
          </label>
        </section>

        <section className="profile-card">
          <h3>Subscriptions</h3>
          <ul className="subscription-list">
            {subscriptions.map((sub) => (
              <li key={sub.title}>
                <div>
                  <strong>{sub.title}</strong>
                  <span>{sub.organizer}</span>
                </div>
                <span className="badge">{sub.status}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="profile-card">
          <h3>Tickets</h3>
          <div className="ticket-table">
            {tickets.map((ticket) => (
              <article key={ticket.code}>
                <div>
                  <strong>{ticket.code}</strong>
                  <span>{ticket.event}</span>
                </div>
                <div>
                  <span>{ticket.seat}</span>
                  <span className="badge success">{ticket.status}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
