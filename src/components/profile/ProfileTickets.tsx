import { usePagePagination } from "@/hooks/pagination";
import { TicketService } from "@/lib/services/TicketService";
import type { EventDto } from "@/lib/services/types/event.types";
import type { TransactionAttributes } from "@/lib/services/types/ticket.types";
import type { IRootState } from "@/state/store";
import { toEuros } from "@/utils/format.currency";
import { toFullDateString } from "@/utils/format.date";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TICKETS_PER_PAGE = 5;

const ProfileTickets = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const { page, setPage, total, syncFromLinks, buildQuery } = usePagePagination(TICKETS_PER_PAGE);
  const [tickets, setTickets] = useState<
    {
      attributes: TransactionAttributes;
      event: EventDto;
    }[]
  >([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const getMy = async () => {
      const tickets = await TicketService.getUserTickets(buildQuery({ account_id: user!.id }));
      setTickets(tickets.data);
      syncFromLinks(tickets.links);
    };
    getMy();
  }, [buildQuery, syncFromLinks, user]);

  return (
    <>
      <h3>Tickets</h3>
      <div className="ticket-table">
        {tickets.map((ticket) => (
          <article key={ticket.attributes.created_at}>
            <div>
              <h3>{ticket.attributes.check.ticket_name}</h3>
              <p>Total: {toEuros(ticket.attributes.check.final_price / 100)}</p>
              <p>
                Promocode:{" "}
                {ticket.attributes.check.promo_code
                  ? `${ticket.attributes.check.promo_code} - ${ticket.attributes.check.discount_percent}%`
                  : "Promocode not used"}
              </p>
              <p>Quantity: {ticket.attributes.check.quantity}</p>
              <p>
                Event: <Link to={`/events/${ticket.event.id}`}>{ticket.event.title}</Link>{" "}
              </p>
              <p>Bought at: {toFullDateString(ticket.attributes.created_at)}</p>
            </div>
            <div>
              <span className="badge success">{ticket.attributes.status}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination page={page} count={total} onChange={(_, value) => setPage(value)} size="large" />
      </div>
    </>
  );
};

export default ProfileTickets;
