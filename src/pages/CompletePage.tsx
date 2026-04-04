import { stripePromise } from "@/lib/stripeClient";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { Ban, Check, Info } from "lucide-react";
import { useEffect, useState } from "react";

const STATUS_CONTENT_MAP = {
  succeeded: {
    text: "Payment succeeded",
    iconColor: "#30B130",
    icon: Check,
  },
  processing: {
    text: "Your payment is processing.",
    iconColor: "#6D6E78",
    icon: Info,
  },
  requires_payment_method: {
    text: "Your payment was not successful, please try again.",
    iconColor: "#DF1B41",
    icon: Ban,
  },
  default: {
    text: "Something went wrong, please try again.",
    iconColor: "#DF1B41",
    icon: Ban,
  },
};
type PaymentStatus = keyof typeof STATUS_CONTENT_MAP;

export const CompletePageWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <CompletePage />
    </Elements>
  );
};

export function CompletePage() {
  const stripe = useStripe();

  const [status, setStatus] = useState<PaymentStatus>("processing");
  const [intentId, setIntentId] = useState<string | null>(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return;
      }

      setStatus(paymentIntent.status as PaymentStatus);
      setIntentId(paymentIntent.id);
    });
  }, [stripe]);

  const renderIcon = (status: PaymentStatus) => {
    const Icon = STATUS_CONTENT_MAP[status].icon;
    return <Icon width={16} height={16} fill="none" color="white" />;
  };

  return (
    <main className="profile-layout">
      <div className="profile-card">
        <div id="payment-status">
          <div id="status-icon" style={{ backgroundColor: STATUS_CONTENT_MAP[status].iconColor }}>
            {renderIcon(status)}
          </div>
          <h2 id="status-text">{STATUS_CONTENT_MAP[status].text}</h2>
          {intentId && (
            <div id="details-table">
              <table>
                <tbody>
                  <tr>
                    <td className="TableLabel">id</td>
                    <td id="intent-id" className="TableContent">
                      {intentId}
                    </td>
                  </tr>
                  <tr>
                    <td className="TableLabel">status</td>
                    <td id="intent-status" className="TableContent">
                      {status}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {intentId && (
            <a
              href={`https://dashboard.stripe.com/payments/${intentId}`}
              id="view-details"
              rel="noopener noreferrer"
              target="_blank"
            >
              View details
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
