import { TicketService } from "@/lib/services/TicketService";
import type { TicketDto } from "@/lib/services/types/ticket.types";
import { stripePromise } from "@/lib/stripeClient";
import { toEuros } from "@/utils/format.currency";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AxiosError } from "axios";
import { useMemo, useState, type SyntheticEvent } from "react";
import { useLocation } from "react-router-dom";

type FeedbackState =
  | { status: "idle"; message?: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type CheckoutProps = {
  eventId: string;
  ticketId: string;
};

const CheckoutForm = ({ eventId, ticketId }: CheckoutProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:5173/events/${eventId}/${ticketId}/checkout/complete`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "accordion" }} onReady={() => setIsFormReady(true)} />
      <button className="primary-btn" disabled={isLoading || !stripe || !elements || !isFormReady} id="submit">
        <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}</span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export function EventCheckoutPage() {
  const location = useLocation();
  const ticket = location.state as TicketDto;
  const [clientSecret, setClientSecret] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [promo, setPromo] = useState("");
  const [showNameOnLists, setShowNameOnLists] = useState(false);
  const [statusMessage, setStatusMessage] = useState<FeedbackState>();
  const [loading, setLoading] = useState(false);

  const total = useMemo(() => {
    return ticket.price * quantity;
  }, [quantity, ticket.price]);

  const adjustQty = (delta: number) => {
    if (quantity + delta > ticket.available) {
      return;
    }
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const purchase = await TicketService.purchase(ticket.id, quantity, showNameOnLists, promo);
      setClientSecret(purchase.data.attributes.client_secret);
    } catch (error) {
      setStatusMessage({
        status: "error",
        message:
          error instanceof AxiosError
            ? error.response?.data.errors[0].detail.message
            : "Unexpected error creating checkout session. " + error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="checkout-layout">
      <section className="checkout-card">
        <h3>Ticket summary</h3>
        <div className="checkout-summary">
          <article>
            <div>
              <strong>{ticket.name}</strong>
              <p>{toEuros(ticket.price)}</p>
            </div>
            <span className="muted">{ticket.available} still available</span>
          </article>
          <div className="qty-controls">
            <button type="button" onClick={() => adjustQty(-1)}>
              −
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={() => adjustQty(1)}>
              +
            </button>
          </div>
          <div className="promo-total">
            <span>Promo code</span>
            <div className="promo-row">
              <input type="text" placeholder="FROST20" value={promo} onChange={(e) => setPromo(e.target.value)} />
            </div>
            <div className="total-row">
              <span>Total:</span>
              <strong>€{total.toFixed(2)}</strong>
            </div>
          </div>
          <label className="privacy-toggle">
            <input type="checkbox" checked={showNameOnLists} onChange={() => setShowNameOnLists((value) => !value)} />
            <span>Display my name on visitors list</span>
          </label>
          {statusMessage && (
            <p className={`feedback ${statusMessage.status === "error" ? "error" : "success"}`}>
              {statusMessage.message}
            </p>
          )}
        </div>
        {clientSecret === "" && (
          <button type="button" className="primary-btn" onClick={handleCheckout} disabled={loading}>
            {loading ? "Preparing checkout..." : "Continue to Stripe"}
          </button>
        )}
        {clientSecret !== "" && (
          <div className="stripe-mock">
            <Elements stripe={stripePromise} options={{ clientSecret: clientSecret, appearance: { theme: "stripe" } }}>
              <CheckoutForm eventId={ticket.event_id} ticketId={ticket.id} />
            </Elements>
          </div>
        )}
      </section>
    </main>
  );
}
