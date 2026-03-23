import { AuthCard } from "../AuthCard"

type AuthSectionProps = {
  mode: "login" | "register"
  onModeChange: (mode: "login" | "register") => void
}

const dashboardHighlights = [
  "Event reminders plus ticket emails",
  "Toggle “show my name” in attendee lists",
  "Dedicated tabs for tickets, events, and companies",
]

export function AuthSection({
  mode,
  onModeChange,
}: AuthSectionProps) {
  return (
    <section className="auth-anchor">
      <AuthCard mode={mode} onModeChange={onModeChange} />

      <aside className="reminder-panel">
        <p className="eyebrow">Inside the dashboard</p>
        <h3>Admin panel, tickets, events, notifications, profile</h3>
        <ul>
          {dashboardHighlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <p className="muted">
          Stripe responses are mocked locally, but every screen is ready for the demo.
        </p>
      </aside>
    </section>
  )
}
