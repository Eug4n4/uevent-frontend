import { EventCard, type EventPreview } from "../EventCard"

type EventGridProps = {
  events: EventPreview[]
}

export function EventGrid({ events }: EventGridProps) {
  return (
    <section className="events-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  )
}
