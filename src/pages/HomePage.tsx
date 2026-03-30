import { EventService } from "@/lib/services/EventService";
import type { EventDto, EventQueryParams } from "@/lib/services/types/event.types";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { EventGrid } from "../components/sections/EventGrid";
import { FilterPanel } from "../components/sections/FilterPanel";
import { OrganizerShowcase } from "../components/sections/OrganizerShowcase";

const formatFilters = [
  { label: "Lection", value: "lection" },
  { label: "Workshop", value: "workshop" },
  { label: "Concert", value: "concert" },
  { label: "Meeting", value: "meeting" },
];

const sortOptions = [
  { label: "Soonest start", value: "start_at" },
  { label: "Latest start", value: "-start_at" },
  { label: "Soonest end", value: "end_at" },
  { label: "Latest end", value: "-end_at" },
];

// спотлайты для кнопок навигации, дальше прикрутим реальные ссылки
const organizerSpotlights = [
  {
    name: "FjordVentures",
    mission: "Host intimate international meetups across Nordic countries.",
    metrics: ["12 live events", "SaaS, Impact, Media"],
    entrypoint: "Submit company",
    path: "/companies/new",
  },
  {
    name: "Nervous System Collective",
    mission: "Focus on communication psychology for team leads.",
    metrics: ["4 cities", "70+ group sessions"],
    entrypoint: "Open dashboard",
    path: "/admin",
  },
  {
    name: "Baltic Civic Lab",
    mission: "Run civic festivals for activists and local officials.",
    metrics: ["3 fests per year", "Student promo bundles"],
    entrypoint: "Create event",
    path: "/events/new",
  },
];

export function HomePage() {
  const [events, setEvents] = useState<EventDto[]>([]);

  const getEvents = async (query: EventQueryParams | undefined) => {
    const events = await EventService.getAll(query);
    setEvents(
      events.data.map((event) => {
        return {
          id: event.id,
          ...event.attributes,
        };
      }),
    );
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <main className="landing">
      <FilterPanel formatFilters={formatFilters} sortOptions={sortOptions} onSubmit={getEvents} />

      <EventGrid events={events} />
      <div className="pagination-container">
        <Pagination count={20} onChange={(e) => console.log("page changed")} />
      </div>
      <OrganizerShowcase spotlights={organizerSpotlights} />
    </main>
  );
}
