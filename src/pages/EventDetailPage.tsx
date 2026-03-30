import { Link } from "react-router-dom";
import { MapPreview } from "@/components/MapPreview";

// вся эта структура временная, ждём настоящие данные
const eventDetail = {
  id: "ev-north",
  title: "YabiYada Fintech Catchup",
  subtitle: "Mock summit to showcase detail layout",
  description:
    "This entire page is a placeholder so backend teammates can see every block: subscriptions, attendees, map, promo codes, payment placeholder, and organizer context.",
  agenda: [
    "Arrival coffee, QR scan, mock reminders going out",
    "Panel about “fintech and stuff” where we point Stripe integration later",
    "Breakout: show/hide attendee names and prep email reminders",
  ],
  price: "€95",
  promoHint: "PROMO: FROST20 saves 20%",
  location: "Mock Hall, Oslo",
  dateRange: "12 Feb 2025 • 18:00 – 22:00",
  visibility: "Visitor list open to everyone",
  mapHint: "Google Maps placeholder will render here",
  poster: "https://images.unsplash.com/photo-1475724017904-b712052c192a?auto=format&fit=crop&w=900&q=60",
  availableTickets: 48,
};

const attendees = [
  { name: "Alina Kozak", company: "Polar DAO" },
  { name: "Jon A (hidden)", company: "prefers private" },
  { name: "Mateo Garcia", company: "Brightbank" },
  { name: "Iris Y (hidden)", company: "stealth" },
];

const comments = [
  { author: "Mock Organizer", role: "Organizer", body: "We will showcase payment + reminder emails here." },
  { author: "Demo User", role: "Attendee", body: "Toggling “show my name” should reflect instantly." },
  { author: "Beta Host", role: "Organizer", body: "Stripe responses still mocked, but UI is ready." },
];

const organizer = {
  name: "Placeholder Ventures",
  handle: "@mockventures",
  bio: "Team responsible for the sandbox content. Real data will hydrate these cards later.",
  otherEvents: ["Soft Skills Sandbox", "LaLaLa Music + Civic Fest"],
};

const similarEvents = ["Fintech 101", "Payments Sandbox", "Cold Outreach Camp"]; // пока просто всплывающие теги

export function EventDetailPage() {
  const ticketsAvailable = eventDetail.availableTickets ?? 0;
  const ticketsEnabled = ticketsAvailable > 0;

  return (
    <main className="event-detail">
      <section className="story-panel detail-hero">
        <div>
          <p className="eyebrow">Event overview</p>
          <h2>{eventDetail.title}</h2>
          <p className="lead">{eventDetail.subtitle}</p>
          <div className="detail-meta">
            <span>{eventDetail.dateRange}</span>
            <span>{eventDetail.location}</span>
            <span>{eventDetail.visibility}</span>
          </div>
          <div className="detail-cta">
            {ticketsEnabled ? (
              <Link to={`/events/${eventDetail.id}/checkout`} className="primary-btn link-reset">
                Buy ticket
              </Link>
            ) : (
              <button className="primary-btn" disabled>
                Tickets coming soon
              </button>
            )}
            <button className="pill-btn">Follow organizer</button>
          </div>
          <p className="price-block">
            Ticket price: {eventDetail.price} · <span>{eventDetail.promoHint}</span>
          </p>
          <p className="muted">
            {ticketsEnabled
              ? `${ticketsAvailable} tickets currently available.`
              : "Tickets are not yet configured by the organizer. Button stays disabled until they add ticket tiers."}
          </p>
          <p className="muted">
            Payment uses Stripe (mocked locally). After purchase the system emails the ticket and schedules reminders.
          </p>
        </div>
        <img src={eventDetail.poster} alt="Event poster" className="detail-poster" />
      </section>

      <section className="detail-grid">
        <article>
          <h3>About the event</h3>
          <p>{eventDetail.description}</p>
          <ul>
            {eventDetail.agenda.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article>
          <h3>Attendee list</h3>
          <p className="muted">Users can toggle name visibility; we show both states here.</p>
          <ul className="attendee-list">
            {attendees.map((person) => (
              <li key={person.name}>
                <strong>{person.name}</strong>
                <span>{person.company}</span>
              </li>
            ))}
          </ul>
        </article>

        <article>
          <h3>Comments</h3>
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.body}>
                <div>
                  <strong>{comment.author}</strong>
                  <span>{comment.role}</span>
                </div>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </article>

        <article>
          <h3>Map & venue</h3>
          <MapPreview query={eventDetail.location} />
        </article>
      </section>

      <section className="detail-organizer">
        <div>
          <p className="eyebrow">Organizer</p>
          <Link to="/company?view=public" className="link-reset">
            <h3>{organizer.name}</h3>
          </Link>
          <p>{organizer.bio}</p>
          <div className="chip-row">
            {organizer.otherEvents.map((ev) => (
              <span key={ev} className="chip">
                {ev}
              </span>
            ))}
          </div>
        </div>
        <aside>
          <p className="eyebrow">Similar events</p>
          <div className="chip-row">
            {similarEvents.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        </aside>
      </section>

      <section className="detail-comments">
        <div>
          <p className="eyebrow">Community comments</p>
          <h3>What people are saying</h3>
          {/* тут потом пришьём реальный коммент сервис */}
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={`${comment.author}-${comment.body}`}>
                <div>
                  <strong>{comment.author}</strong>
                  <span>{comment.role}</span>
                </div>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <form className="comment-form">
          <label>
            <span>Leave a note (mock only)</span>
            <textarea rows={4} placeholder="Add supportive comment for the demo"></textarea>
          </label>
          <button type="button" className="primary-btn" disabled>
            Post comment (disabled in mock)
          </button>
        </form>
      </section>
    </main>
  );
}
