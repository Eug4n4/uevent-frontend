import { CompanyCard } from "@/components/company/cards/CompanyCard";
import { EventCard } from "@/components/event/cards/EventCard";
import { MapPreview } from "@/components/MapPreview";
import { usePagePagination } from "@/hooks/pagination";
import { EventService } from "@/lib/services/EventService";
import { TicketService } from "@/lib/services/TicketService";
import { CommentService } from "@/lib/services/CommentService";
import type { EventDto } from "@/lib/services/types/event.types";
import type { TicketDto } from "@/lib/services/types/ticket.types";
import type { CommentDto } from "@/lib/services/types/comment.types";
import { toDateTimeString } from "@/utils/format.date";
import Pagination from "@mui/material/Pagination";
import { useCallback, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import type { IRootState } from "@/state/store";

const attendees = [
  { name: "Alina Kozak", company: "Polar DAO" },
  { name: "Jon A (hidden)", company: "prefers private" },
  { name: "Mateo Garcia", company: "Brightbank" },
  { name: "Iris Y (hidden)", company: "stealth" },
];

const SIMILAR_EVENTS_LIMIT = 3;

export function EventDetailPage() {
  const { data: event, included } = useLoaderData<typeof EventService.getById>();
  const [similarEvents, setSimilarEvents] = useState<EventDto[]>();
  const [otherEvents, setOtherEvents] = useState<EventDto[]>();
  const [tickets, setTickets] = useState<TicketDto[]>([]);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentFeedback, setCommentFeedback] = useState<string | null>(null);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const { page, setPage, total, syncFromLinks, buildQuery } = usePagePagination(SIMILAR_EVENTS_LIMIT);
  const {
    page: otherPage,
    setPage: setOtherPage,
    total: otherTotal,
    syncFromLinks: syncOtherFromLinks,
    buildQuery: buildOtherQuery,
  } = usePagePagination(SIMILAR_EVENTS_LIMIT);
  const { user } = useSelector((state: IRootState) => state.auth);

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

  useEffect(() => {
    const getTickets = async () => {
      const tickets = await TicketService.getAll({ event_id: event.id });
      setTickets(tickets.data);
    };
    getTickets();
  }, [event.id]);

  const fetchComments = useCallback(async () => {
    setCommentsLoading(true);
    try {
      const response = await CommentService.list(event.id);
      setComments(response.data);
    } catch (error) {
      console.error("Failed to load comments", error);
    } finally {
      setCommentsLoading(false);
    }
  }, [event.id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const onEventSubscribe = () => {};

  const onCompanySubscribe = () => {};

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      setCommentFeedback("Comment cannot be empty");
      return;
    }
    setIsSubmittingComment(true);
    setCommentFeedback(null);
    try {
      await CommentService.create(event.id, { text: commentText.trim() });
      setCommentText("");
      await fetchComments();
      setCommentFeedback("Comment posted");
    } catch (error) {
      setCommentFeedback(error instanceof Error ? error.message : "Failed to post comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const renderComments = (items: CommentDto[]) => {
    return (
      <ul className="comment-list">
        {items.map((comment) => (
          <li key={comment.id}>
            <div>
              <strong>{comment.profile?.username ?? "Member"}</strong>
              <span>{toDateTimeString(comment.created_at)}</span>
            </div>
            <p>{comment.text}</p>
            {comment.children.length > 0 && renderComments(comment.children)}
          </li>
        ))}
      </ul>
    );
  };

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
            <button className="primary-btn" onClick={() => onCompanySubscribe()}>
              Follow organizer
            </button>
            <button className="primary-btn" onClick={() => onEventSubscribe()}>
              Subscribe to event
            </button>
          </div>
        </div>
        <img src={event.attributes.banner_url} alt="Event poster" className="detail-poster" />
      </section>

      <section className="detail-grid">
        <article>
          <h3>Tickets</h3>
          {tickets.length > 0 ? (
            tickets.map((ticket) => {
              return (
                <section key={ticket.id}>
                  <p>{ticket.name}</p>
                  <p>{ticket.description}</p>
                  <p>{ticket.price} €</p>
                  <p>
                    {ticket.available} / {ticket.total}
                  </p>
                </section>
              );
            })
          ) : (
            <p>Sorry but this event has no tickets!</p>
          )}
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
          <MapPreview query={`${event.attributes.location.latitude},${event.attributes.location.longitude}`} />
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
          {commentsLoading ? <p>Loading comments...</p> : comments.length ? renderComments(comments) : <p>No comments yet.</p>}
        </div>
        <div className="comment-form">
          {user ? (
            <>
              <label>
                <span>Leave a note</span>
                <textarea
                  rows={4}
                  placeholder="Share your thoughts"
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                ></textarea>
              </label>
              <button type="button" className="primary-btn" onClick={handleCommentSubmit} disabled={isSubmittingComment}>
                {isSubmittingComment ? "Posting..." : "Post comment"}
              </button>
              {commentFeedback && <p className="feedback">{commentFeedback}</p>}
            </>
          ) : (
            <p className="muted">Sign in to leave a comment.</p>
          )}
        </div>
      </section>
    </main>
  );
}
