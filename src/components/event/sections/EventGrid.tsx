import type { EventDto } from "@/lib/services/types/event.types";
import { EventCard } from "../cards/EventCard";

type EventGridProps = {
  events: EventDto[];
};

export function EventGrid({ events }: EventGridProps) {
  return (
    <section className="events-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}
