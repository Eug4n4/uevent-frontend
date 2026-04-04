import { PromoCodeSection } from "@/components/company/sections/PromoCodeSection";
import { EventService } from "@/lib/services/EventService";
import { TicketService } from "@/lib/services/TicketService";
import type { EventDto, EventQueryParams } from "@/lib/services/types/event.types";
import {
  ticketCreateAttributesSchema,
  type PromoCodeCreateAttributes,
  type TicketCreateAttributes,
} from "@/lib/services/types/ticket.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

type FeedbackState =
  | { status: "idle"; message?: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function CompanyTicketManagerPage() {
  const [events, setEvents] = useState<EventDto[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventDto | null>(null);
  const [promoCodes, setPromoCodes] = useState<PromoCodeCreateAttributes[]>([]);
  const params = useParams();
  const [feedback, setFeedback] = useState<FeedbackState>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TicketCreateAttributes>({
    resolver: zodResolver(ticketCreateAttributesSchema),
    mode: "all",
    defaultValues: {
      name: "",
      description: ".",
      price: 0,
      total: 0,
    },
  });

  useEffect(() => {
    const getEvents = async (query?: EventQueryParams) => {
      const events = await EventService.getAll(query);
      setEvents(events.data);
    };
    getEvents({ "page[limit]": 99, company_id: params.id as string });
  }, [params.id]);

  const onSubmit = async (data: TicketCreateAttributes) => {
    if (!selectedEvent) {
      return;
    }
    try {
      const ticket = await TicketService.create(data, selectedEvent.id);
      if (promoCodes.length > 0) {
        await Promise.all(promoCodes.map((promo) => TicketService.createPromocode(promo, ticket.data.id)));
      }
      reset();
    } catch (e) {
      let message = "";
      if (e instanceof AxiosError) {
        message = e.response?.data.errors[0].detail.message as string;
      } else {
        message += e;
      }
      setFeedback({ status: "error", message });
    } finally {
      setPromoCodes([]);
      setFeedback({ status: "success", message: "Successfully created new  ticket!" });
    }
  };

  const onPromoAdd = useCallback(
    (data: PromoCodeCreateAttributes) => {
      setPromoCodes((prev) => [...prev, data]);
    },
    [setPromoCodes],
  );

  return (
    <main className="create-layout">
      <section className="story-panel">
        <p className="eyebrow">Ticket & promo setup</p>
        <h2>Configure tickets for your events</h2>
        <ul className="profile-task-list">
          <li>Create at least one ticket tier before publishing</li>
          <li>Promo codes live independently from the public event</li>
        </ul>
      </section>
      <div className="create-form">
        {feedback && (
          <p className={`feedback ${feedback.status === "error" ? "error" : "success"}`}>{feedback.message}</p>
        )}
        <form className="create-form" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Select event</legend>
            <label>
              <span>Event</span>
              <Autocomplete
                options={events}
                getOptionLabel={(op) => op.title}
                onChange={(_, value) => setSelectedEvent(value)}
                renderInput={(params) => <TextField {...params} placeholder="Search..." />}
              />
            </label>
            <label>
              <span>Ticket name:</span>
              <input {...register("name")} placeholder="VIP" />
              {errors.name && <small>{errors.name.message}</small>}
            </label>
            <label>
              <span>Price for 1 ticket (€):</span>
              <input type="number" step={0.01} {...register("price", { valueAsNumber: true })} />
              {errors.price && <small>{errors.price.message}</small>}
            </label>
            <label>
              <span>Total tickets available</span>
              <input type="number" placeholder="120" {...register("total", { valueAsNumber: true })} />
              {errors.total && <small>{errors.total.message}</small>}
            </label>
          </fieldset>

          <div className="form-actions">
            <button type="submit" className="primary-btn" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : "Create"}
            </button>
          </div>
        </form>
        <form className="create-form">
          <PromoCodeSection promoCodes={promoCodes} onAdd={onPromoAdd} />
        </form>
      </div>
    </main>
  );
}
