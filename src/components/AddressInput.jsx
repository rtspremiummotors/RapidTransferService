import { useRef } from "react";
import { usePlacesAutocomplete } from "../hooks/usePlacesAutocomplete.js";

// Reusable address input with Google Places autocomplete
export default function AddressInput({ value, onChange, placeholder, label, dotColor = "gold" }) {
  const inputRef = useRef(null);

  usePlacesAutocomplete(inputRef, (address) => {
    onChange(address);
  });

  return (
    <label className="field">
      {label && (
        <span className="field-label">
          <span className={`dot dot-${dotColor}`} /> {label}
        </span>
      )}
      <div className="address-input-wrap">
        <PinIcon />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
      </div>
    </label>
  );
}

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}