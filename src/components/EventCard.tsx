import type { EventDto } from "@/lib/services/types/event.types";
import { toDateTimeString } from "@/utils/format.date";
import { Link } from "react-router-dom";

export type EventPreview = {
  id: string;
  title: string;
  format: string;
  theme: string;
  summary: string;
  location: string;
  datetime: string;
  price: number;
  currency: string;
  isFree?: boolean;
  organizer: {
    name: string;
    handle: string;
    avatar: string;
  };
  poster: string;
  attendees: Array<{
    name: string;
    showName: boolean;
  }>;
  commentCount: number;
  subscriberCount: number;
  similar: string[];
  mapHint: string;
  visibility: "everyone" | "attendees";
  promoCodes: number;
  isHighlighted?: boolean;
};

type EventCardProps = {
  event: EventDto;
};

// const VIEWER_PLACEHOLDER = "HIDDEN";

export function EventCard({ event }: EventCardProps) {
  // const formattedDate = new Intl.DateTimeFormat("us", {
  //   weekday: "short",
  //   month: "short",
  //   day: "numeric",
  //   hour: "2-digit",
  //   minute: "2-digit",
  // }).format(new Date(event.datetime));

  // const formattedPrice = event.isFree
  //   ? "Free with RSVP"
  //   : `${event.price.toLocaleString("en-US", {
  //       style: "currency",
  //       currency: event.currency,
  //     })}`;

  // const attendees = event.attendees.slice(0, 4);

  return (
    <article className={"event-card"}>
      <div className="badge-row">
        <span>{event.format}</span>
        {/* <span>{event.theme}</span> */}
        {/* <span>Visitor list open</span> */}
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
            {toDateTimeString(event.start_at)} - {toDateTimeString(event.end_at)}
          </strong>
        </div>
        {/* <div>
          <span>Where</span>
          <strong>{event}</strong>
        </div> */}
        {/* <div>
          <span>Price</span>
          <strong>{formattedPrice}</strong>
          {event.promoCodes > 0 && <small>{event.promoCodes} promo code(s) active</small>}
        </div> */}
      </div>

      <div className="organizer-stack">
        {/* <div className="organizer">
          <img src={event.organizer.avatar} alt="" width={48} height={48} />
          <div>
            <strong>{event.organizer.name}</strong>
            <span>{event.organizer.handle}</span>
            <small>{event.subscriberCount}+ organizer followers</small>
          </div>
        </div> */}

        <div className="cta-stack">
          <Link to={`/events/${event.id}`} className="primary-btn ghost link-reset">
            Subscribe to event
          </Link>
          <Link to={`/events/${event.id}`} className="pill-btn link-reset">
            Follow organizer alerts
          </Link>
        </div>
      </div>

      {/* <div className="attendees-row">
        <div className="avatars">
          {attendees.map((person, index) => (
            <span key={`${person.name}-${index}`} title={person.name}>
              {person.showName ? initials(person.name) : VIEWER_PLACEHOLDER}
            </span>
          ))}
        </div>
        <div className="attendee-info">
          <strong>{event.attendees.length} attendees already confirmed</strong>
          <span>Visibility: {event.visibility === "everyone" ? "everyone" : "attendees only"}</span>
        </div>
      </div> */}

      {/* <div className="map-preview">
        <div className="map-marker"></div>
        <div>
          <strong>{event.mapHint}</strong>
          <span>Map placeholder while we wire up the provider.</span>
        </div>
      </div> */}

      {/* <div className="similar-section">
        <div>
          <span>Comments: {event.commentCount}</span>
          <span>Promos: {event.promoCodes > 0 ? "active" : "none"}</span>
        </div>
        <div className="similar-tags">
          {event.similar.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div> */}
    </article>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}
