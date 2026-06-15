import { useEffect } from "react";

export default function BookModal({ onSelect, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Choose a service">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <p className="modal-eyebrow">What do you need?</p>
        <h2 className="modal-title">Choose a service</h2>

        <div className="modal-options">
          <button className="modal-option" onClick={() => onSelect("book-taxi")}>
            <div className="modal-option-icon">
              <TaxiIcon />
            </div>
            <div className="modal-option-body">
              <span className="modal-option-name">Taxi</span>
              <span className="modal-option-desc">City rides, airport transfers, international trips</span>
            </div>
            <span className="modal-option-arrow">→</span>
          </button>

          <button className="modal-option" onClick={() => onSelect("book-parcel")}>
            <div className="modal-option-icon">
              <ParcelIcon />
            </div>
            <div className="modal-option-body">
              <span className="modal-option-name">Parcel</span>
              <span className="modal-option-desc">Same-day delivery across Belgium and Europe</span>
            </div>
            <span className="modal-option-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const ico = {
  width: 22, height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function TaxiIcon() {
  return <svg {...ico}><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11"/><path d="M4 11h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1m-14 0H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>;
}

function ParcelIcon() {
  return <svg {...ico}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>;
}