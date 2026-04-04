import type { EventDto } from "@/lib/services/types/event.types";
import { toFullDateString } from "@/utils/format.date";
import { useNavigate } from "react-router-dom";

type EventCardProps = {
  event: EventDto;
};

export function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();

  return (
    <article className={"event-card"} onClick={() => navigate(`/events/${event.id}`)}>
      <div className="badge-row">
        <span>{event.format}</span>
      </div>

      <div className="card-head">
        <div>
          <h3>{event.title}</h3>
          <p className="event-summary">{event.text}</p>
        </div>
        <div style={{ width: 140, height: 140 }}>
          <img src={event.banner_url || "/favicon.svg"} alt="" className="poster-thumb" loading="lazy" />
        </div>
      </div>

      <div className="event-meta">
        <div>
          <span>When</span>
          <strong>
            {toFullDateString(event.start_at)} - {toFullDateString(event.end_at)}
          </strong>
        </div>
      </div>

      <div className="organizer-stack">
        <div className="organizer">
          <div>
            <strong>Organizer: {event.company?.name}</strong>
            <br />
            <small>Published at: {toFullDateString(event.publish_at)}</small>
          </div>
        </div>
      </div>
    </article>
  );
}
