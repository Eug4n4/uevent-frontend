const tickets = [
  { code: "#NIC-4821", event: "YabiYada Fintech Catchup", seat: "Free roam", status: "ready" },
  { code: "#NIC-4822", event: "Soft Skills Sandbox", seat: "Row B · 09", status: "emailed" },
];

const ProfileTickets = () => {
  return (
    <>
      <h3>Tickets</h3>
      <div className="ticket-table">
        {tickets.map((ticket) => (
          <article key={ticket.code}>
            <div>
              <strong>{ticket.code}</strong>
              <span>{ticket.event}</span>
            </div>
            <div>
              <span>{ticket.seat}</span>
              <span className="badge success">{ticket.status}</span>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default ProfileTickets;
