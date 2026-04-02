import { CompanyCard } from "@/components/company/cards/CompanyCard";
import { EventCard } from "@/components/event/cards/EventCard";
import { MapPreview } from "@/components/MapPreview";
import { usePagePagination } from "@/hooks/pagination";
import { EventService } from "@/lib/services/EventService";
import type { EventDto } from "@/lib/services/types/event.types";
import { toDateTimeString } from "@/utils/format.date";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

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

const SIMILAR_EVENTS_LIMIT = 3;

export function EventDetailPage() {
  const { data: event, included } = useLoaderData<typeof EventService.getById>();
  const [similarEvents, setSimilarEvents] = useState<EventDto[]>();
  const [otherEvents, setOtherEvents] = useState<EventDto[]>();
  const { page, setPage, total, syncFromLinks, buildQuery } = usePagePagination(SIMILAR_EVENTS_LIMIT);
  const {
    page: otherPage,
    setPage: setOtherPage,
    total: otherTotal,
    syncFromLinks: syncOtherFromLinks,
    buildQuery: buildOtherQuery,
  } = usePagePagination(SIMILAR_EVENTS_LIMIT);

  useEffect(() => {
    const getSimilar = async () => {
      const events = await EventService.getAll(buildQuery({ format: event.attributes.format }));
      setSimilarEvents(events.data);
      syncFromLinks(events.links);
    };
    getSimilar();
  }, [event.attributes.format, buildQuery, syncFromLinks]);

  useEffect(() => {
    const getOther = async () => {
      const events = await EventService.getAll(buildOtherQuery({ company_id: included![0].id }));
      setOtherEvents(events.data);
      syncOtherFromLinks(events.links);
    };
    getOther();
  }, [included, buildOtherQuery, syncOtherFromLinks]);

  return (
    <main className="event-detail">
      <section className="story-panel detail-hero">
        <div>
          <p className="eyebrow">Event overview</p>
          <h2>{event.attributes.title}</h2>
          <div className="detail-meta">
            <span>
              When: {toDateTimeString(event.attributes.start_at)} - {toDateTimeString(event.attributes.end_at)}
            </span>
            <span>Format: {event.attributes.format}</span>
          </div>
          <hr />
          <div className="detail-about">
            <h3>About</h3>
            <p>{event.attributes.text}</p>
          </div>
          <div className="detail-cta">
            <button className="pill-btn">Follow organizer</button>
          </div>
        </div>
        <img src={event.attributes.banner_url} alt="Event poster" className="detail-poster" />
      </section>

      <section className="detail-grid">
        <article>
          <h3>Tickets</h3>
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
          <h3>Location</h3>
          <MapPreview
            position={{ lat: event.attributes.location.latitude, lng: event.attributes.location.longitude }}
          />
        </article>
      </section>
      <section className="detail-organizer">
        <h3 className="eyebrow">Organizer</h3>
        {included && <CompanyCard company={{ ...included[0].attributes, id: included[0].id }} />}
      </section>
      <section className="detail-similar-events">
        <h3 className="eyebrow">Similar events</h3>

        <div>
          {similarEvents &&
            similarEvents.map((similar) => {
              if (similar.id !== event.id) {
                return <EventCard key={similar.id} event={similar} />;
              }
            })}
        </div>
        <div className="pagination-container">
          <Pagination page={page} count={total} onChange={(_, value) => setPage(value)} size="large" />
        </div>
      </section>

      <section className="detail-similar-events">
        <h3 className="eyebrow">Other organizer events</h3>

        <div>
          {otherEvents &&
            otherEvents.map((other) => {
              if (other.id !== event.id) {
                return <EventCard key={other.id} event={other} />;
              }
            })}
        </div>
        <div className="pagination-container">
          <Pagination page={otherPage} count={otherTotal} onChange={(_, value) => setOtherPage(value)} size="large" />
        </div>
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
