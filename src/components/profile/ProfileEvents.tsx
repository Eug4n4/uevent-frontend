import { usePagePagination } from "@/hooks/pagination";
import { CompanyService } from "@/lib/services/CompanyService";
import { EventService } from "@/lib/services/EventService";
import type { EventDto, EventQueryParams } from "@/lib/services/types/event.types";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { EventCard } from "../event/cards/EventCard";

const PAGE_LIMIT = 4;

const ProfileEvents = () => {
  const [events, setEvents] = useState<EventDto[]>();
  const { page, setPage, total, syncFromLinks, buildQuery } = usePagePagination(PAGE_LIMIT);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const getEvents = async (query?: EventQueryParams) => {
      const myCompanies = await CompanyService.getMy({ me: true });
      const companyIds = myCompanies.data.map((company) => company.id);
      const responses = await Promise.all(companyIds.map((id) => EventService.getMy({ ...query, company_id: id })));
      const newEvents: EventDto[] = [];
      const links = responses[0].links;
      for (const response of responses) {
        for (const event of response.data) {
          newEvents.push(event);
        }
      }
      setEvents(newEvents);
      syncFromLinks(links);
    };
    getEvents(buildQuery({ published: [true, false] }));
  }, [buildQuery, syncFromLinks]);

  const getMyEvents = () => {
    if (events === undefined || events.length === 0) {
      return <p>You don't have any events</p>;
    }
    return (
      <>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </>
    );
  };

  return (
    <>
      <h3>My events</h3>
      {getMyEvents()}
      <div className="pagination-container">
        <Pagination page={page} count={total} onChange={(_, value) => setPage(value)} size="large" />
      </div>
    </>
  );
};

export default ProfileEvents;
