import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { COMPANY } from "../config.js";
import { WhatsAppIcon } from "./Hero.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// ── Main PaymentStep ─────────────────────────────────────────
export default function PaymentStep({ fare, bookingData, onSuccess, onBack }) {
  const [choice, setChoice] = useState(null); // "online" | "arrival"
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initStripe = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: fare.total,
          currency: "eur",
          metadata: {
            name: bookingData.name,
            phone: bookingData.phone,
            from: bookingData.pickup,
            to: bookingData.destination,
          },
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setClientSecret(data.clientSecret);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const selectOnline = () => {
    setChoice("online");
    initStripe();
  };

  const selectArrival = () => setChoice("arrival");

  return (
    <div className="payment-step">
      {/* Fare summary */}
      <div className="fare-summary">
        <div className="fare-summary-head">
          <span>Your fare</span>
          <span className="fare-total">€{fare.total.toFixed(2)}</span>
        </div>
        <div className="fare-breakdown">
          <div className="fare-row">
            <span>Distance</span>
            <span>{bookingData.km} km</span>
          </div>
          {fare.returnTrip && (
            <div className="fare-row fare-row-highlight">
              <span>Return trip</span>
              <span>included</span>
            </div>
          )}
        </div>
        <p className="fare-note">✓ This is your fixed price. No extra charges on arrival unless you add stops or change the route.</p>
      </div>

      {/* Payment choice */}
      {!choice && (
        <>
          <h3 className="payment-title">How would you like to pay?</h3>
          <div className="payment-options">
            <button className="payment-option" onClick={selectOnline}>
              <div className="po-icon"><CardIcon /></div>
              <div className="po-body">
                <span className="po-name">Pay now online</span>
                <span className="po-desc">Secure payment via Stripe — card, Apple Pay, Google Pay</span>
              </div>
              <span className="po-arrow">→</span>
            </button>
            <button className="payment-option" onClick={selectArrival}>
              <div className="po-icon"><CashIcon /></div>
              <div className="po-body">
                <span className="po-name">Pay on arrival</span>
                <span className="po-desc">Cash or card — pay your driver directly</span>
              </div>
              <span className="po-arrow">→</span>
            </button>
          </div>
        </>
      )}

      {/* Pay on arrival — confirm via WhatsApp */}
      {choice === "arrival" && (
        <div className="payment-arrival">
          <div className="arrival-check">✓</div>
          <h3>Confirmed — pay on arrival</h3>
          <p>Complete your booking by sending us the details on WhatsApp or by phone.</p>
          <div className="confirm-btns">
            <a
              href={`https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(bookingData.whatsappText)}`}
              className="btn btn-whatsapp btn-lg"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onSuccess}
            >
              <WhatsAppIcon /> Confirm on WhatsApp
            </a>
            <a href={`tel:${COMPANY.phoneTel}`} className="btn btn-outline btn-lg">
              📞 Call us
            </a>
          </div>
          <button className="back-link" onClick={() => setChoice(null)}>← Change payment method</button>
        </div>
      )}

      {/* Pay online — Stripe */}
      {choice === "online" && (
        <div className="payment-stripe">
          <h3>Pay securely online</h3>
          {loading && <div className="stripe-loading"><Spinner /> Loading payment...</div>}
          {error && (
            <div className="stripe-error">
              <p>Payment unavailable: {error}</p>
              <p>Please pay on arrival or contact us directly.</p>
              <button className="back-link" onClick={() => setChoice(null)}>← Go back</button>
            </div>
          )}
          {clientSecret && !loading && (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: {
                theme: "flat",
                variables: {
                  colorPrimary: "#f2b705",
                  colorBackground: "#f4f6f9",
                  colorText: "#1d2a3a",
                  colorDanger: "#ef4444",
                  fontFamily: "Inter, system-ui, sans-serif",
                  borderRadius: "12px",
                  spacingUnit: "4px",
                },
                rules: {
                  ".Tab, .Input, .Block": { border: "1.5px solid #e3e8ef", boxShadow: "none" },
                  ".Tab:hover": { borderColor: "#f2b705" },
                  ".Tab--selected": { borderColor: "#0c1828", backgroundColor: "#ffffff" },
                  ".Input:focus": { borderColor: "#f2b705", boxShadow: "0 0 0 3px rgba(242,183,5,0.18)" },
                  ".Label": { fontWeight: "600", color: "#0c1828" },
                }
              } }}>
              <StripeForm fare={fare} bookingData={bookingData} onSuccess={onSuccess} onBack={() => setChoice(null)} />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
}

// ── Stripe checkout form ─────────────────────────────────────
function StripeForm({ fare, bookingData, onSuccess, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + "?paid=true" },
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    } else {
      onSuccess("paid");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <PaymentElement />
      {error && <p className="stripe-error-msg">{error}</p>}
      <div className="stripe-actions">
        <button type="submit" className="btn btn-gold btn-lg btn-block" disabled={!stripe || processing}>
          {processing ? "Processing..." : `Pay €${fare.total.toFixed(2)}`}
        </button>
        <button type="button" className="back-link" onClick={onBack}>← Change payment method</button>
      </div>
      <p className="stripe-secure"><LockIcon /> Secured by Stripe — we never store your card details</p>
    </form>
  );
}

// Icons
const si = { width:20, height:20, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:1.8, strokeLinecap:"round", strokeLinejoin:"round" };
function CardIcon() { return <svg {...si}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>; }
function CashIcon() { return <svg {...si}><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>; }
function LockIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>; }
function Spinner() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeOpacity="0.4"/></svg>; }